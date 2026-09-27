export const services = [
  {
    slug: "websites-apps",
    name: "Websites & Apps",
    family: "Build",
    intro: "A better first impression.",
    description:
      "Distinctive websites, booking experiences and customer portals.",
    steps: [
      "Plan the journey",
      "Design the screens",
      "Build and test",
      "Launch together",
    ],
    detail:
      "Websites and customer apps designed around your business, with clear content and responsive layouts.",
  },
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    family: "Communicate",
    intro: "A better first response. A clear next step.",
    description: "Answer calls, help customers and arrange appointments.",
    steps: [
      "Answer and identify",
      "Understand the request",
      "Check approved information",
      "Book or hand off",
    ],
    detail:
      "Designed around your opening hours, approved knowledge and escalation rules. When a request needs judgment, the conversation moves to your team with context.",
  },
  {
    slug: "ai-calling-agents",
    name: "AI Calling Agents",
    family: "Communicate",
    intro: "Follow up with purpose.",
    description: "Follow up with customers who have agreed to be contacted.",
    steps: [
      "Check eligibility",
      "Introduce the purpose",
      "Collect a response",
      "Respect opt-out and hand off",
    ],
    detail:
      "Consent, identification, opt-outs, calling restrictions and recording requirements must be established for the jurisdiction and use case before deployment. Human review remains part of the delivery process.",
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    family: "Automate",
    intro: "Less chasing. More forward motion.",
    description:
      "Move information between your tools and reduce repetitive admin.",
    steps: [
      "Receive a trigger",
      "Apply business rules",
      "Take the next action",
      "Update and monitor",
    ],
    detail:
      "We map the actual workflow first, including exceptions. Then we connect the repeatable steps, add visibility and make failure states actionable.",
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    family: "Build",
    intro: "The missing layer in your operation.",
    description:
      "Build a useful home for your team’s tasks and customer information.",
    steps: [
      "Map the users",
      "Design the interface",
      "Build the system",
      "Prove and operate",
    ],
    detail:
      "When existing tools leave a gap, we build a focused interface around your data and process. Permissions, maintainability and day-to-day operation are part of the design.",
  },
] as const;
export const examples = [
  {
    slug: "request-relay",
    name: "The request relay",
    type: "INTERACTIVE SYSTEM EXAMPLE",
    description: "A customer request moves from first contact to team handoff.",
    anchor: "workflow",
  },
  {
    slug: "workflow-explorer",
    name: "A route for the repeat work",
    type: "INTERACTIVE SYSTEM EXAMPLE",
    description:
      "Six operational problems, translated into understandable example workflows.",
    anchor: "playground",
  },
];
export const baseUrl = processEnvUrl();
function processEnvUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://reachorbital.tech";
}
