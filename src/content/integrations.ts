export const INTEGRATION_CATEGORIES = [
  {
    title: "CRM",
    tools: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM"],
  },
  {
    title: "Email & messaging",
    tools: ["Gmail", "Outlook", "Slack", "WhatsApp Business"],
  },
  {
    title: "Calendars & scheduling",
    tools: ["Google Calendar", "Microsoft 365", "Calendly", "Cal.com"],
  },
  {
    title: "Payments & finance",
    tools: ["Stripe", "Xero", "QuickBooks", "PayPal"],
  },
  {
    title: "Data & storage",
    tools: ["PostgreSQL", "Airtable", "Google Sheets", "Google Drive"],
  },
  {
    title: "Automation platforms",
    tools: ["Zapier", "Make", "n8n", "Custom API"],
  },
] as const;

/** Flat list used by the homepage logo wall. */
export const INTEGRATION_HIGHLIGHTS = [
  "HubSpot",
  "Salesforce",
  "Google Workspace",
  "Microsoft 365",
  "Stripe",
  "Xero",
  "Slack",
  "Zapier",
  "Twilio",
  "PostgreSQL",
  "Airtable",
  "Custom API",
];

export const RECIPES = [
  {
    id: "lead",
    when: "A new lead arrives from the website",
    then: ["Create a CRM record", "Send a personalised follow-up", "Notify the salesperson"],
  },
  {
    id: "booking",
    when: "An appointment is booked by phone",
    then: ["Hold the calendar slot", "Send a confirmation message", "Add the job to the schedule"],
  },
  {
    id: "invoice",
    when: "An invoice lands in the inbox",
    then: ["Read the supplier and amount", "Match it to the purchase order", "File it and flag exceptions"],
  },
  {
    id: "payment",
    when: "A payment succeeds",
    then: ["Mark the invoice paid", "Send a receipt", "Update this month's numbers"],
  },
] as const;

/* Recipe composer options (§27). */
export const TRIGGERS = [
  "New lead",
  "Missed call",
  "Appointment booked",
  "Invoice received",
  "Payment received",
] as const;

export const ACTIONS = [
  "Create CRM record",
  "Create a job",
  "Update the calendar",
  "File the document",
] as const;

export const THENS = [
  "Send a follow-up",
  "Send a confirmation",
  "Request approval",
  "Post to the team channel",
] as const;

export const FINALLYS = [
  "Notify a salesperson",
  "Notify the on-call engineer",
  "Update the weekly report",
  "Do nothing else",
] as const;
