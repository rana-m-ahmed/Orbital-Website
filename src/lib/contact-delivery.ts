/** Server-only delivery boundary. No enquiry content is written to logs. */
export type Enquiry = {
  name: string;
  email: string;
  company: string;
  website: string;
  helpType: string;
  message: string;
  receivedAt: string;
};
export async function deliverEnquiry(
  enquiry: Enquiry,
  env: NodeJS.ProcessEnv = process.env,
  send: typeof fetch = fetch,
): Promise<void> {
  const { RESEND_API_KEY: apiKey, CONTACT_INBOX: to, CONTACT_FROM: from } = env;
  if (!apiKey || !to || !from)
    throw new Error("Contact delivery is not configured");
  const response = await send("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(10000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `New enquiry — ${enquiry.helpType} — ${enquiry.name}`,
      text: [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Company: ${enquiry.company || "Not provided"}`,
        `Website: ${enquiry.website || "Not provided"}`,
        `Help: ${enquiry.helpType}`,
        `Received: ${enquiry.receivedAt}`,
        "",
        enquiry.message,
      ].join("\n"),
    }),
  });
  if (!response.ok)
    throw new Error(`Email provider responded ${response.status}`);
  const result = (await response.json()) as { id?: unknown };
  if (typeof result.id !== "string" || !result.id)
    throw new Error("Email provider did not confirm acceptance");
}
