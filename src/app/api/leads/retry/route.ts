import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { timingSafeEqual } from "node:crypto";
import { deliverLead, type SavedLead } from "@/lib/deliver-lead";
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("authorization") || "";
  const expected = "Bearer " + secret;
  const suppliedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  if (
    !secret ||
    suppliedBytes.length !== expectedBytes.length ||
    !timingSafeEqual(suppliedBytes, expectedBytes)
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (
    !process.env.LEAD_STORAGE_DIR ||
    !process.env.RESEND_API_KEY ||
    !process.env.LEAD_EMAIL_FROM
  )
    return Response.json(
      { error: "Delivery is not configured" },
      { status: 503 },
    );
  const dir = path.resolve(
    /* turbopackIgnore: true */ process.env.LEAD_STORAGE_DIR,
  );
  try {
    const files = await readdir(dir);
    const pending = files
      .filter(
        (f) =>
          f.endsWith(".json") && !files.includes(f.replace(".json", ".sent")),
      )
      .slice(0, 25);
    let sent = 0;
    for (const file of pending) {
      const lead = JSON.parse(
        await readFile(path.join(dir, file), "utf8"),
      ) as SavedLead;
      if (await deliverLead(lead, dir)) sent++;
    }
    return Response.json({ attempted: pending.length, sent });
  } catch {
    return Response.json(
      { error: "Unable to access the lead queue" },
      { status: 503 },
    );
  }
}
