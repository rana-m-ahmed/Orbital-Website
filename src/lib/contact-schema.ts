import { z } from "zod";

export const HELP_TYPES = [
  "Automation",
  "AI receptionist",
  "Lead follow-up",
  "Customer support",
  "Operations & admin",
  "Custom software",
  "Website or app",
  "Integrations",
  "Not sure yet",
] as const;

/** Helper text that changes with the selected service (§31). */
export const HELPER_TEXT: Record<string, string> = {
  Automation:
    "Tell us which part of the day repeats most — the calls, the enquiries, the admin, or the reporting.",
  "AI receptionist":
    "How are calls answered today, who answers them, and what happens to the ones that are missed?",
  "Lead follow-up":
    "Where do enquiries arrive, who picks them up, and how long does a first reply usually take?",
  "Customer support":
    "Which questions come up again and again, and which ones genuinely need a person?",
  "Operations & admin":
    "Describe one process that eats a morning every week, and which systems it touches.",
  "Custom software":
    "What does your team work around today — the spreadsheet, the workaround, the thing that does not fit?",
  "Website or app":
    "What should the site or app achieve: win the enquiry, deliver the service, or carry the work?",
  Integrations:
    "Which two systems should already be talking to each other, and what gets re-typed between them?",
  "Not sure yet":
    "Describe what is slowing your team down. Working out whether it should be automated, connected or built is our job.",
};

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
  company: z.string().trim().max(160, "That is too long.").optional().or(z.literal("")),
  helpType: z.enum(HELP_TYPES, {
    message: "Please choose the closest match.",
  }),
  message: z
    .string()
    .trim()
    .min(12, "A sentence or two is enough — tell us what is happening today.")
    .max(4000, "Please keep this under 4000 characters."),
  website: z.string().trim().max(200, "That is too long.").optional().or(z.literal("")),
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
