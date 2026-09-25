/**
 * Server-only contact delivery configuration.
 *
 * Keep this module out of Client Component dependency graphs. It reads
 * credentials that must never be exposed to the browser.
 */

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

export function contactDeliveryConfig(): ContactDeliveryConfig {
  const isProduction = process.env.NODE_ENV === "production";
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
