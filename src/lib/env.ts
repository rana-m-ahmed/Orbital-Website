/**
 * Central environment helpers for server-side configuration.
 *
 * Do not import server secrets into client components. Public values keep
 * NEXT_PUBLIC_* names; delivery credentials are read only inside server code.
 */

export const isProduction = process.env.NODE_ENV === "production";

export function siteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value || "https://reachorbital.tech";
}

export function publicContactEmail(): string {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return value || "orbitalteamhq@gmail.com";
}

export type ContactDeliveryConfig =
  | {
      mode: "resend";
      apiKey: string;
      inbox: string;
      from: string;
    }
  | {
      mode: "log";
      inbox: string;
      from: string;
    };

/**
 * Development may log enquiries when Resend is intentionally unconfigured.
 * Production must never report a successful enquiry unless a real delivery
 * provider is configured.
 */
export function contactDeliveryConfig(): ContactDeliveryConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const inbox =
    process.env.CONTACT_INBOX?.trim() || process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM?.trim();

  if (!apiKey) {
    if (isProduction) {
      throw new Error(
        "RESEND_API_KEY is required in production; contact delivery is not configured.",
      );
    }

    return {
      mode: "log",
      inbox: inbox || "dev-log-only",
      from: from || "ORBITAL <dev@localhost>",
    };
  }

  if (!inbox) {
    throw new Error(
      "CONTACT_INBOX or NEXT_PUBLIC_CONTACT_EMAIL is required when Resend delivery is enabled.",
    );
  }

  if (!from) {
    throw new Error(
      "CONTACT_FROM is required when Resend delivery is enabled.",
    );
  }

  return {
    mode: "resend",
    apiKey,
    inbox,
    from,
  };
}
