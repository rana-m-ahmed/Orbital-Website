"use server";
import { headers } from "next/headers";
import { mkdir, open, rename } from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { leadSchema, type LeadState } from "@/lib/lead-schema";
import { deliverLead } from "@/lib/deliver-lead";
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
  if (process.env.NODE_ENV === "production" && !process.env.LEAD_STORAGE_DIR)
    return {
      success: false,
      message:
        "The project form is temporarily unavailable. Please try again later.",
    };
  try {
    const dir = path.resolve(
      /* turbopackIgnore: true */ process.env.LEAD_STORAGE_DIR || "data/leads",
    );
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const id = randomUUID();
    const lead = { id, createdAt: new Date().toISOString(), ...parsed.data };
    const temporaryPath = path.join(dir, id + ".tmp");
    const file = await open(temporaryPath, "wx", 0o600);
    try {
      await file.writeFile(JSON.stringify(lead, null, 2));
      await file.sync();
    } finally {
      await file.close();
    }
    await rename(temporaryPath, path.join(dir, id + ".json"));
    await deliverLead(lead, dir);
    return {
      success: true,
      message:
        "Your project request has been saved. Thank you for telling us about your business.",
    };
  } catch {
    return {
      success: false,
      message:
        "Your request could not be saved. Please try again. No success has been recorded.",
    };
  }
}
