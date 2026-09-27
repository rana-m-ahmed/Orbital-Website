export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  publishedAt: string;
  serviceHref: string;
  serviceLabel: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "ai-receptionist-for-service-businesses",
    title: "AI Receptionist for Service Businesses: What to Automate First",
    description:
      "A practical guide to scoping an AI receptionist for service businesses, including safe call boundaries, booking flows, escalation, testing and rollout.",
    eyebrow: "AI receptionist guide",
    intro:
      "An AI receptionist is most useful when it handles a narrow set of repeatable front-desk tasks reliably. The difficult part is not making a voice agent talk. It is deciding what the system may answer, what it should collect, what it must never decide and how a human takes over.",
    publishedAt: "2026-09-27",
    serviceHref: "/services/ai-receptionist",
    serviceLabel: "Explore AI receptionist systems",
    sections: [
      {
        heading: "Start with the call types your team already repeats",
        paragraphs: [
          "A useful first scope usually comes from existing call patterns: opening hours, service availability, appointment requests, basic qualification, directions, status questions or simple routing. These are easier to define than a general goal such as “answer every customer question.”",
          "Write down the most common caller intents and the information your staff already uses to resolve them. If an answer changes frequently, requires judgment or depends on sensitive context, that is a signal to keep a person in the loop.",
        ],
        bullets: [
          "Which questions can be answered from approved business information?",
          "Which details must be collected before a booking or callback?",
          "Which requests should immediately move to a person?",
          "Which outcomes need to update another business system?",
        ],
      },
      {
        heading: "Design the boundary before designing the personality",
        paragraphs: [
          "Tone matters, but a safe operating boundary matters more. The system should know the difference between an approved answer, a missing answer and a situation that requires escalation.",
          "A good flow does not try to sound confident when the information is uncertain. It captures the request, explains the next step and hands the conversation to the right person with enough context to continue.",
        ],
      },
      {
        heading: "Booking is a workflow, not just a calendar lookup",
        paragraphs: [
          "An appointment flow usually needs more than available time slots. The receptionist may need to identify the service, collect contact details, check eligibility rules, confirm location, handle rescheduling and communicate what happens next.",
          "Before connecting a calendar, define the complete booking state. A technically successful calendar write is not useful if the wrong service was selected or the team does not receive the customer context.",
        ],
      },
      {
        heading: "Test failure paths as seriously as the happy path",
        paragraphs: [
          "A production call flow should be tested with interruptions, vague requests, misheard names, unavailable booking systems, repeated questions and callers who change direction halfway through the conversation.",
          "The goal is not to prove that the AI can complete a scripted demo. The goal is to understand how the system behaves when the conversation stops looking like the script.",
        ],
        bullets: [
          "Unknown or unsupported questions",
          "No appointment availability",
          "Integration timeout or booking failure",
          "Caller requests a human",
          "Caller provides incomplete or contradictory details",
        ],
      },
      {
        heading: "Measure whether the receptionist reduces real work",
        paragraphs: [
          "The useful metric is not simply the number of calls handled. Look at whether the system produces complete bookings, useful summaries, fewer missed enquiries and less repetitive staff work.",
          "If staff still need to reopen every conversation and reconstruct the customer request, the automation has moved the work rather than removed it.",
        ],
      },
    ],
  },
  {
    slug: "workflow-automation-for-service-businesses",
    title: "Workflow Automation for Service Businesses: What to Automate First",
    description:
      "A practical framework for choosing the first workflow to automate, mapping exceptions, connecting business tools and designing recoverable automation.",
    eyebrow: "Workflow automation guide",
    intro:
      "The best first automation is usually not the most impressive process in the company. It is a repetitive workflow with clear inputs, stable rules, visible ownership and a measurable amount of manual work.",
    publishedAt: "2026-09-27",
    serviceHref: "/services/workflow-automation",
    serviceLabel: "Explore workflow automation",
    sections: [
      {
        heading: "Look for repetition before looking for AI",
        paragraphs: [
          "Start with work that happens frequently and follows roughly the same route each time: a lead arrives, a record is created, a task is assigned, a confirmation is sent and someone follows up.",
          "If the team already knows what should happen for most cases, automation can remove copying and coordination. If every case requires a different judgment, the workflow may need better process design before it needs software.",
        ],
      },
      {
        heading: "Map the trigger, decisions, systems and owner",
        paragraphs: [
          "A workflow is easier to automate when each step has an explicit input and outcome. Document where the work begins, which rules change the route, which systems are touched and who owns the next action.",
          "Do not omit the manual work people use to repair failures. Those unofficial recovery steps often reveal the most important production requirements.",
        ],
        bullets: [
          "Trigger: what starts the workflow?",
          "Data: what information must be present?",
          "Decision: which rules change the route?",
          "Action: what should the system create, update or send?",
          "Exception: what should happen when the expected path fails?",
          "Owner: who is responsible when automation stops?",
        ],
      },
      {
        heading: "Automate stable steps and expose unstable ones",
        paragraphs: [
          "Good automation does not hide ambiguity. Stable actions can run automatically, while unclear cases should become visible tasks for a person.",
          "This is especially important when external tools are involved. An API timeout, missing field or rejected update should not silently disappear. The system should leave evidence that the action failed and make recovery practical.",
        ],
      },
      {
        heading: "Avoid building a chain nobody can operate",
        paragraphs: [
          "A workflow can be technically clever and still be a poor business system if nobody understands where data moves or how to recover from a broken step.",
          "Logs, clear ownership, retry behavior and simple documentation are part of the automation itself. They should not be treated as optional engineering cleanup.",
        ],
      },
      {
        heading: "Choose a first workflow with a clear before-and-after",
        paragraphs: [
          "A good pilot has a baseline the team can describe: how long the process takes, how many handoffs it uses, where errors occur and how often people copy the same information.",
          "After launch, compare the same workflow. This gives the business a more useful answer than asking whether automation feels modern.",
        ],
      },
    ],
  },
  {
    slug: "custom-software-vs-saas",
    title: "Custom Software vs SaaS: A Practical Decision Framework",
    description:
      "A practical decision framework for choosing between custom software and an off-the-shelf SaaS product based on workflow fit, ownership, integration and operational value.",
    eyebrow: "Custom software guide",
    intro:
      "Custom software is not automatically better than buying an existing product. In many cases, a mature SaaS tool is faster, cheaper and safer. Custom development becomes interesting when an important workflow remains awkward despite reasonable configuration and integration options.",
    publishedAt: "2026-09-27",
    serviceHref: "/services/custom-software",
    serviceLabel: "Explore custom software",
    sections: [
      {
        heading: "Buy when the problem is common and the product already fits",
        paragraphs: [
          "If many businesses solve the same problem in roughly the same way, an established product may already provide the features, security work, support and integrations you need.",
          "Configuration is usually preferable to custom development when the workflow can adapt without creating major operational friction.",
        ],
      },
      {
        heading: "Consider custom software when the workflow is strategically specific",
        paragraphs: [
          "A stronger case for custom software appears when the business repeatedly works around the product: exporting data to spreadsheets, duplicating records, maintaining manual side processes or forcing staff through screens that do not match the job.",
          "The question is not whether custom software can reproduce the SaaS product. The question is whether owning a focused system removes enough recurring friction to justify the build and maintenance responsibility.",
        ],
        bullets: [
          "The workflow is important to daily operations",
          "Existing tools create repeated manual work",
          "The required behavior is unlikely to become a standard SaaS feature",
          "The business can define the users and decisions clearly",
          "Integration and data ownership requirements are understood",
        ],
      },
      {
        heading: "Do not confuse feature count with fit",
        paragraphs: [
          "A large SaaS platform can have hundreds of features while still making one critical workflow difficult. A custom tool can be valuable with far fewer features if the screens and data model match the actual work.",
          "The opposite is also true: rebuilding commodity features such as authentication, billing or generic CRM behavior without a strong reason increases cost and operational risk.",
        ],
      },
      {
        heading: "Design the smallest complete operational path",
        paragraphs: [
          "The first version should cover one end-to-end job rather than a collection of disconnected features. For example: receive a request, review the information, assign work, update status and close the loop with the customer.",
          "A complete narrow workflow is easier to test with real users and easier to operate than a broad platform whose critical path has never been proven.",
        ],
      },
      {
        heading: "Include ownership and maintenance in the decision",
        paragraphs: [
          "Custom software creates responsibility as well as control. Hosting, security updates, backups, integrations, monitoring and documentation need clear ownership.",
          "That does not make custom software a bad option. It means the decision should compare the full operational model, not just the initial build price.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
