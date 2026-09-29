import "server-only";
import type { z } from "zod";
import type { leadSchema } from "./lead-schema";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const DEFAULT_TIMEOUT_MS = 8_000;
const REQUIRED_ENVIRONMENT_VARIABLES = [
  "RESEND_API_KEY",
  "LEAD_EMAIL_FROM",
  "LEAD_EMAIL_TO",
] as const;

export type SavedLead = z.infer<typeof leadSchema> & {
  id: string;
  createdAt: string;
};

export type DeliveryResult =
  | { ok: true; messageId: string; requestId?: string }
  | {
      ok: false;
      reason:
        | "not_configured"
        | "provider_rejected"
        | "malformed_response"
        | "timeout"
        | "network_error";
      status?: number;
      requestId?: string;
      providerCode?: string;
      missing?: string[];
    };

type DeliveryOptions = {
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
};

async function getProviderCode(response: Response) {
  try {
    const body: unknown = await response.json();
    if (
      body &&
      typeof body === "object" &&
      "name" in body &&
      typeof body.name === "string"
    )
      return body.name;
  } catch {
    // The HTTP status is enough to classify a non-JSON provider response.
  }
  return undefined;
}

export async function deliverLead(
  lead: SavedLead,
  options: DeliveryOptions = {},
): Promise<DeliveryResult> {
  const env = options.env || process.env;
  const missing = REQUIRED_ENVIRONMENT_VARIABLES.filter(
    (name) => !env[name]?.trim(),
  );
  if (missing.length)
    return { ok: false, reason: "not_configured", missing: [...missing] };

  const fetchImpl = options.fetchImpl || fetch;
  try {
    const response = await fetchImpl(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `orbital-lead-${lead.id}`,
      },
      body: JSON.stringify({
        from: env.LEAD_EMAIL_FROM,
        to: [env.LEAD_EMAIL_TO],
        reply_to: lead.email,
        subject: "ORBITAL project request",
        text: `Project request ${lead.id}\nReceived: ${lead.createdAt}\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\nService: ${lead.service}\n\n${lead.message}`,
      }),
      signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
    const requestId = response.headers.get("x-request-id") || undefined;

    if (!response.ok)
      return {
        ok: false,
        reason: "provider_rejected",
        status: response.status,
        requestId,
        providerCode: await getProviderCode(response),
      };

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return {
        ok: false,
        reason: "malformed_response",
        status: response.status,
        requestId,
      };
    }

    if (
      !body ||
      typeof body !== "object" ||
      !("id" in body) ||
      typeof body.id !== "string" ||
      !body.id
    )
      return {
        ok: false,
        reason: "malformed_response",
        status: response.status,
        requestId,
      };

    return { ok: true, messageId: body.id, requestId };
  } catch (error) {
    const name =
      error && typeof error === "object" && "name" in error
        ? String(error.name)
        : "";
    return {
      ok: false,
      reason:
        name === "TimeoutError" || name === "AbortError"
          ? "timeout"
          : "network_error",
    };
  }
}
