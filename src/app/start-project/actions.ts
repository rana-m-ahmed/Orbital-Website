"use server";
import { headers } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import { leadSchema, type LeadState } from "@/lib/lead-schema";
import { deliverLead } from "@/lib/deliver-lead";
import { finalizeLeadSubmission } from "@/lib/lead-submission";
const attempts = new Map<string, { count: number; reset: number }>();
export async function submitLead(
  _previous: LeadState,
  form: FormData,
): Promise<LeadState> {
  if (String(form.get("website") || ""))
    return { success: false, message: "Unable to submit this request." };
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  if (attempts.size > 10000)
    for (const [k, v] of attempts) if (v.reset < now) attempts.delete(k);
  const rate = attempts.get(key);
  if (rate && rate.reset > now && rate.count >= 5)
    return {
      success: false,
      message: "Too many attempts. Please try again in 15 minutes.",
    };
  attempts.set(key, {
    count: rate && rate.reset > now ? rate.count + 1 : 1,
    reset: rate && rate.reset > now ? rate.reset : now + 900000,
  });
  const parsed = leadSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  const id = randomUUID();
  const lead = { id, createdAt: new Date().toISOString(), ...parsed.data };
  try {
    return await finalizeLeadSubmission(lead, deliverLead);
  } catch {
    console.error("Project request delivery failed", {
      leadId: id,
      provider: "resend",
      reason: "unexpected_error",
    });
    return {
      success: false,
      message:
        "Your request could not be sent. Please try again or email operations@reachorbital.tech.",
    };
  }
}
