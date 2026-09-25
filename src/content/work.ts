import type { ProductVariant } from "@/components/primitives/ProductFrame";

/**
 * §45 — case-study content model.
 *
 * `type` is the single source of truth for how a project is presented.
 * A reference system may never inherit client-only fields (logo, testimonial,
 * production metric) and is labelled everywhere it appears (§4).
 */
export type WorkItem = {
  slug: string;
  type: "client" | "reference";
  title: string;
  /** Business / industry type, never a named client unless approved. */
  industry: string;
  summary: string;
  problem: string;
  scope: string[];
  built: string[];
  integrations: string[];
  /** Operational change. Numbers only where `metricsVerified` is true. */
  outcome: string;
  before: string;
  after: string;
  metricsVerified: boolean;
  testimonialApproved: boolean;
  testimonial?: { quote: string; attribution: string };
  service: { label: string; href: string };
  frame: ProductVariant;
  featured?: boolean;
};

export const WORK: WorkItem[] = [
  {
    slug: "missed-call-recovery",
    type: "reference",
    title: "Missed-call recovery for an appointment-led service business",
    industry: "Multi-branch service business",
    summary:
      "Every inbound call is answered, qualified and booked — including the ones that arrive after hours.",
    problem:
      "Calls arrive while technicians are on site. Voicemail collects enquiries nobody returns until the next day, by which point the caller has usually phoned somebody else.",
    scope: [
      "Inbound call handling",
      "Appointment booking",
      "CRM record creation",
      "Out-of-hours coverage",
    ],
    built: [
      "An AI receptionist that answers, qualifies and books against live calendar availability",
      "Escalation rules that transfer anything outside the defined scope to a named person",
      "A shared operations view showing every call, its outcome and its recording",
    ],
    integrations: ["Calendar", "CRM", "Telephony", "Team messaging"],
    outcome:
      "Enquiries are captured and booked at the moment they arrive instead of queueing in voicemail, and the team starts each day with a scheduled list rather than a callback backlog.",
    before: "Missed call → voicemail → manual callback the next morning",
    after: "Answer → qualify → book → notify the team",
    metricsVerified: false,
    testimonialApproved: false,
    service: { label: "AI Receptionist", href: "/automation/ai-receptionist" },
    frame: "dashboard",
    featured: true,
  },
  {
    slug: "lead-response-system",
    type: "reference",
    title: "Same-minute lead response for a small sales team",
    industry: "Professional services",
    summary:
      "Enquiries are answered, qualified and routed to the right salesperson before they cool down.",
    problem:
      "Enquiries landed in a shared inbox and were picked up whenever somebody had a gap. Follow-up quality depended entirely on who happened to be free.",
    scope: ["Lead capture", "Qualification", "Routing", "Follow-up sequences"],
    built: [
      "Capture from the website form, inbox and phone into one qualified pipeline",
      "Plain-language qualification rules the sales lead can read and change",
      "Automatic routing with full context handed to the salesperson who takes over",
    ],
    integrations: ["CRM", "Email", "Forms", "Calendar"],
    outcome:
      "Every enquiry gets a first response immediately and reaches a named owner with the context already attached, so nothing sits unclaimed in a shared inbox.",
    before: "Enquiry → shared inbox → whoever is free replies eventually",
    after: "Capture → qualify → respond → route → follow up",
    metricsVerified: false,
    testimonialApproved: false,
    service: { label: "Lead Automation", href: "/automation/lead-automation" },
    frame: "workflow",
  },
  {
    slug: "operations-console",
    type: "reference",
    title: "One operations console to replace five spreadsheets",
    industry: "Operations-heavy business",
    summary:
      "Records, approvals and reporting moved out of scattered files into a single custom interface.",
    problem:
      "Day-to-day work ran across a booking sheet, two trackers, an inbox and a folder of documents. Nobody could answer simple status questions without opening all of them.",
    scope: ["Internal tooling", "Reporting", "Approvals", "Document handling"],
    built: [
      "A custom operations console with roles, permissions and an audit trail",
      "Automated document intake that reads, checks and files what arrives",
      "Reporting that updates itself instead of being rebuilt every week",
    ],
    integrations: ["Database", "Email", "Storage", "Payments"],
    outcome:
      "Status is answerable from one screen, approvals leave a trail, and the weekly report is produced rather than assembled by hand.",
    before: "Five files, two inboxes and a folder nobody trusts",
    after: "One console → automated intake → live reporting",
    metricsVerified: false,
    testimonialApproved: false,
    service: { label: "Custom Software", href: "/software" },
    frame: "portal",
  },
];

export const hasClientWork = WORK.some((item) => item.type === "client");

export function workBySlug(slug: string): WorkItem | undefined {
  return WORK.find((item) => item.slug === slug);
}

export const WORK_LABEL: Record<WorkItem["type"], string> = {
  client: "Client work",
  reference: "Reference system",
};
