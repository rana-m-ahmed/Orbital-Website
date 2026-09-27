import "server-only";
import { open, access } from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";
import type { leadSchema } from "./lead-schema";
export type SavedLead = z.infer<typeof leadSchema> & {
  id: string;
  createdAt: string;
};
export async function deliverLead(lead: SavedLead, dir: string) {
  if (!process.env.RESEND_API_KEY || !process.env.LEAD_EMAIL_FROM) return false;
  const marker = path.join(dir, lead.id + ".sent");
  try {
    await access(marker);
    return true;
  } catch {
    /* Not delivered yet. */
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
        "Idempotency-Key": "orbital-lead-" + lead.id,
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM,
        to: [process.env.LEAD_EMAIL_TO || "operations@reachorbital.tech"],
        reply_to: lead.email,
        subject: "ORBITAL project request",
        text: `Project request ${lead.id}\nReceived: ${lead.createdAt}\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\nService: ${lead.service}\n\n${lead.message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const file = await open(marker, "wx", 0o600);
    try {
      await file.writeFile(new Date().toISOString());
      await file.sync();
    } finally {
      await file.close();
    }
    return true;
  } catch {
    return false;
  }
}
