import assert from "node:assert/strict";
import test from "node:test";
import { deliverLead } from "../../src/lib/deliver-lead.ts";

const lead = {
  id: "lead-123",
  createdAt: "2026-09-29T12:00:00.000Z",
  name: "QA Test",
  email: "qa@example.com",
  company: "ORBITAL QA",
  service: "Workflow Automation",
  message: "This is a sufficiently detailed project request for testing.",
  consent: "on",
};

const env = {
  RESEND_API_KEY: "re_test_key",
  LEAD_EMAIL_FROM: "ORBITAL <website@reachorbital.tech>",
  LEAD_EMAIL_TO: "operations@reachorbital.tech",
};

test("sends the expected Resend request and returns its message id", async () => {
  let capturedUrl;
  let capturedInit;
  const result = await deliverLead(lead, {
    env,
    fetchImpl: async (url, init) => {
      capturedUrl = url;
      capturedInit = init;
      return Response.json(
        { id: "email-123" },
        { headers: { "x-request-id": "request-123" } },
      );
    },
  });

  assert.deepEqual(result, {
    ok: true,
    messageId: "email-123",
    requestId: "request-123",
  });
  assert.equal(capturedUrl, "https://api.resend.com/emails");
  assert.equal(capturedInit.method, "POST");
  assert.equal(capturedInit.headers.Authorization, "Bearer re_test_key");
  assert.equal(capturedInit.headers["Content-Type"], "application/json");
  assert.equal(
    capturedInit.headers["Idempotency-Key"],
    "orbital-lead-lead-123",
  );
  assert.ok(capturedInit.signal instanceof AbortSignal);

  const body = JSON.parse(capturedInit.body);
  assert.equal(body.from, env.LEAD_EMAIL_FROM);
  assert.deepEqual(body.to, [env.LEAD_EMAIL_TO]);
  assert.equal(body.reply_to, lead.email);
  assert.equal(body.subject, "ORBITAL project request");
  assert.match(body.text, /QA Test/);
  assert.match(body.text, /Workflow Automation/);
});

test("uses a different idempotency key for each lead", async () => {
  const keys = [];
  const fetchImpl = async (_url, init) => {
    keys.push(init.headers["Idempotency-Key"]);
    return Response.json({ id: `email-${keys.length}` });
  };

  await deliverLead(lead, { env, fetchImpl });
  await deliverLead({ ...lead, id: "lead-456" }, { env, fetchImpl });

  assert.deepEqual(keys, ["orbital-lead-lead-123", "orbital-lead-lead-456"]);
});

test("fails closed and identifies only missing configuration names", async () => {
  let called = false;
  const result = await deliverLead(lead, {
    env: { RESEND_API_KEY: "re_test_key" },
    fetchImpl: async () => {
      called = true;
      return Response.json({ id: "unexpected" });
    },
  });

  assert.equal(called, false);
  assert.deepEqual(result, {
    ok: false,
    reason: "not_configured",
    missing: ["LEAD_EMAIL_FROM", "LEAD_EMAIL_TO"],
  });
});

test("reports provider rejection without exposing the provider message", async () => {
  const result = await deliverLead(lead, {
    env,
    fetchImpl: async () =>
      Response.json(
        { name: "validation_error", message: "sensitive provider detail" },
        {
          status: 422,
          headers: { "x-request-id": "request-422" },
        },
      ),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: "provider_rejected",
    status: 422,
    requestId: "request-422",
    providerCode: "validation_error",
  });
});

test("rejects successful responses that do not contain an email id", async () => {
  const result = await deliverLead(lead, {
    env,
    fetchImpl: async () => Response.json({}),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: "malformed_response",
    status: 200,
    requestId: undefined,
  });
});

test("classifies network failures", async () => {
  const result = await deliverLead(lead, {
    env,
    fetchImpl: async () => {
      throw new TypeError("connection failed");
    },
  });

  assert.deepEqual(result, { ok: false, reason: "network_error" });
});

test("classifies request timeouts", async () => {
  const result = await deliverLead(lead, {
    env,
    fetchImpl: async () => {
      const error = new Error("timed out");
      error.name = "TimeoutError";
      throw error;
    },
  });

  assert.deepEqual(result, { ok: false, reason: "timeout" });
});
