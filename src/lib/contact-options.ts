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
