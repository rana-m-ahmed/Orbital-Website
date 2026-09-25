import { NextResponse } from "next/server";
import { contactSchema, type ContactResponse } from "@/lib/contact-schema";
import { contactDeliveryConfig } from "@/lib/env";
import { rateLimit, sweep } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form delivery.
 *
 * The endpoint validates and sanitises on the server, rate-limits by IP, uses
 * a honeypot for low-cost bot filtering, and only reports success after the
 * configured delivery path succeeds. Development may deliberately log an
 * enquiry when Resend is absent; production may not.
 */
export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
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
    await deliver(enquiry);
  } catch (error) {
    console.error("[orbital:contact] delivery failed", error);
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

type Enquiry = {
  name: string;
  email: string;
  company: string;
  website: string;
  helpType: string;
  message: string;
  receivedAt: string;
};

async function deliver(enquiry: Enquiry): Promise<void> {
  const config = contactDeliveryConfig();

  const body = [
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    `Company: ${enquiry.company || "—"}`,
    `Website: ${enquiry.website || "—"}`,
    `Help:    ${enquiry.helpType}`,
    `When:    ${enquiry.receivedAt}`,
    "",
    enquiry.message,
  ].join("\n");

  if (config.mode === "log") {
    console.warn(
      "[orbital:contact] development log mode — enquiry was not emailed",
    );
    console.info(body);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.inbox],
      reply_to: enquiry.email,
      subject: `New enquiry — ${enquiry.helpType} — ${enquiry.name}`,
      text: body,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Email provider responded ${response.status}${responseText ? `: ${responseText.slice(0, 300)}` : ""}`,
    );
  }
}
