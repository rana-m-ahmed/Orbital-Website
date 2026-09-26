import { NextResponse } from "next/server";
import { contactSchema, type ContactResponse } from "@/lib/contact-schema";
import { rateLimit, sweep } from "@/lib/rate-limit";
import { deliverEnquiry } from "@/lib/contact-delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Â§40 â€” contact form delivery.
 * Server-side validation, rate limiting, bot protection, sanitisation, and
 * server-only credentials. Delivery goes to one monitored inbox; a CRM intake
 * can be added later without making delivery depend on it.
 */
export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  sweep();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, kind: "rate_limit" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, kind: "server" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!errors[field]) errors[field] = issue.message;
    }
    return NextResponse.json(
      { ok: false, kind: "validation", errors },
      { status: 400 },
    );
  }

  /* Honeypot: silently accept so a bot learns nothing, but deliver nothing. */
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = {
    name: clean(parsed.data.name),
    email: clean(parsed.data.email),
    company: clean(parsed.data.company ?? ""),
    website: clean(parsed.data.website ?? ""),
    helpType: parsed.data.helpType,
    message: clean(parsed.data.message),
    receivedAt: new Date().toISOString(),
  };

  try {
    await deliverEnquiry(enquiry);
  } catch (error) {
    console.error(
      "[orbital:contact] delivery failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json({ ok: false, kind: "server" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

/** Strips control characters and header-injection attempts. */
function clean(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, (match) => (match.includes("\n") ? "\n" : " "))
    .trim();
}
