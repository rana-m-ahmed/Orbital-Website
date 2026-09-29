import assert from "node:assert/strict";
import test from "node:test";
import { finalizeLeadSubmission } from "../../src/lib/lead-submission.ts";

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

test("returns success only after the provider accepts the message", async () => {
  const originalInfo = console.info;
  console.info = () => {};
  try {
    const state = await finalizeLeadSubmission(lead, async () => ({
      ok: true,
      messageId: "email-123",
      requestId: "request-123",
    }));

    assert.equal(state.success, true);
    assert.match(state.message, /has been sent/i);
  } finally {
    console.info = originalInfo;
  }
});

for (const failure of [
  { ok: false, reason: "not_configured", missing: ["RESEND_API_KEY"] },
  { ok: false, reason: "provider_rejected", status: 403 },
  { ok: false, reason: "malformed_response", status: 200 },
  { ok: false, reason: "network_error" },
  { ok: false, reason: "timeout" },
]) {
  test(`does not report success for ${failure.reason}`, async () => {
    const originalError = console.error;
    console.error = () => {};
    try {
      const state = await finalizeLeadSubmission(lead, async () => failure);
      assert.equal(state.success, false);
      assert.match(state.message, /operations@reachorbital\.tech/);
    } finally {
      console.error = originalError;
    }
  });
}
