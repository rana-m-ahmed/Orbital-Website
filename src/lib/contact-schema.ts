import { z } from "zod";

// Keep validation compatible with a strict production CSP (no runtime eval).
z.config({ jitless: true });

import { HELP_TYPES } from "./contact-options";
export { HELP_TYPES, HELPER_TEXT } from "./contact-options";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),
  /* §51 — the field is "Email", not "Work email": a general address is fine. */
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address so we can reply.")
    .max(200, "That email address is too long.")
    .email("That does not look like an email address."),
  company: z
    .string()
    .trim()
    .max(160, "That is too long.")
    .optional()
    .or(z.literal("")),
  helpType: z
    .enum(HELP_TYPES, {
      message: "Please choose the closest match.",
    })
    .default("Not sure yet"),
  message: z
    .string()
    .trim()
    .min(12, "A sentence or two is enough — tell us what is happening today.")
    .max(4000, "Please keep this under 4000 characters."),
  website: z
    .string()
    .trim()
    .max(200, "That is too long.")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot: real people leave this empty (§40).
   * It is accepted by the schema and handled in the route, so a bot gets an
   * ordinary success response and learns nothing about why it was ignored.
   */
  company_website: z.string().max(200).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; kind: "validation"; errors: Record<string, string> }
  | { ok: false; kind: "rate_limit" | "server" };
