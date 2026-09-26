import { test } from "node:test";
import assert from "node:assert/strict";
import { deliverEnquiry } from "../src/lib/contact-delivery.ts";
const enquiry = {
  name: "Test",
  email: "test@example.com",
  company: "",
  website: "",
  helpType: "Automation",
  message: "Test enquiry",
  receivedAt: "2026-09-26",
};
const env = {
  RESEND_API_KEY: "test-only-key",
  CONTACT_INBOX: "inbox@example.com",
  CONTACT_FROM: "ORBITAL <sender@example.com>",
};
test("missing configuration cannot succeed", async () => {
  await assert.rejects(() => deliverEnquiry(enquiry, {}), /not configured/);
});
test("provider rejection propagates", async () => {
  await assert.rejects(
    () =>
      deliverEnquiry(
        enquiry,
        env,
        async () => new Response("", { status: 403 }),
      ),
    /403/,
  );
});
test("provider success needs an acceptance ID", async () => {
  await assert.rejects(
    () => deliverEnquiry(enquiry, env, async () => Response.json({})),
    /confirm acceptance/,
  );
});
test("valid provider response accepts delivery and uses reply-to", async () => {
  let sent;
  await deliverEnquiry(enquiry, env, async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent = JSON.parse(options.body);
    return Response.json({ id: "accepted-test" });
  });
  assert.equal(sent.reply_to, enquiry.email);
  assert.deepEqual(sent.to, ["inbox@example.com"]);
});
test("network failures propagate", async () => {
  await assert.rejects(
    () =>
      deliverEnquiry(enquiry, env, async () => {
        throw new Error("Network unavailable");
      }),
    /Network unavailable/,
  );
});
