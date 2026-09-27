import Link from "next/link";
import { Cta } from "@/components/Shell";
import {
  Arrow,
  StudioVisual,
  type VisualKind,
} from "@/components/Studio";
import {
  SoftwareExperience,
  WebsiteExperience,
} from "@/components/DigitalExperiences";

type ExperienceKind = "website" | "software" | VisualKind;

type ServicePageSpec = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  copy: string;
  experience: ExperienceKind;
  capabilities: [string, string][];
  exampleTitle: string;
  example: string;
  audience: string;
  nextStep: string;
  note?: string;
  useCases: [string, string][];
  process: [string, string][];
  questions: [string, string][];
  related: string[];
};

export const servicePageSpecs: Record<string, ServicePageSpec> = {
  "websites-apps": {
    slug: "websites-apps",
    name: "Websites & Apps",
    eyebrow: "Build / 01",
    title: "Make the first visit worth staying for.",
    copy:
      "From a distinctive business website to a useful customer portal, we design the places where people meet your business online.",
    experience: "website",
    capabilities: [
      [
        "Business websites",
        "Clear services, considered design and an easy route to enquire.",
      ],
      [
        "Customer web apps",
        "Bookings, accounts and project updates in a place your customers can use.",
      ],
      [
        "Ready for real screens",
        "Responsive layouts, keyboard access and a straightforward content handover.",
      ],
    ],
    exampleTitle: "A clearer route from interest to action.",
    example:
      "A customer can understand what you offer, choose the next step and use the same experience on a phone or desktop.",
    audience: "For businesses whose website needs to do more than look good.",
    nextStep: "Tell us what you want to build",
    useCases: [
      [
        "Service websites that need to convert",
        "Turn a vague brochure site into a clearer journey: explain the offer, answer the important questions and make enquiry or booking the obvious next step.",
      ],
      [
        "Booking and enquiry experiences",
        "Reduce friction between someone deciding to act and your team receiving the information needed to respond.",
      ],
      [
        "Customer portals and lightweight web apps",
        "Give customers a focused place to review requests, appointments, documents or project updates without forcing your team into another manual handoff.",
      ],
    ],
    process: [
      [
        "Map the customer journey",
        "We identify who is visiting, what they need to understand and the action the site should make easier.",
      ],
      [
        "Design the information and interface",
        "Page hierarchy, content, responsive behavior and interaction are shaped around the real journey rather than a generic template.",
      ],
      [
        "Build, test and hand over",
        "The implementation is checked across screen sizes and keyboard use, then documented so the site remains understandable after launch.",
      ],
    ],
    questions: [
      [
        "Do we need a full redesign or can you improve an existing site?",
        "Both are possible. The useful decision is whether the current structure can support the customer journey and technical quality you need, or whether rebuilding is simpler and safer.",
      ],
      [
        "Can the website connect to our booking or business tools?",
        "Yes when the tools expose a suitable integration path. We first define the data that needs to move, permissions, failure handling and what should happen when an integration is unavailable.",
      ],
      [
        "Will the site be usable on mobile?",
        "Responsive behavior is treated as part of the system, not a later resize pass. Navigation, content order, forms and interactive areas are designed for smaller screens from the start.",
      ],
      [
        "Can you build a portal or web app as well as the public website?",
        "Yes. A public website and an authenticated customer experience can be planned together when that creates a clearer journey and a maintainable system.",
      ],
    ],
    related: ["custom-software", "workflow-automation"],
  },
  "ai-receptionist": {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    eyebrow: "Communicate / 02",
    title: "Answer calls. Book appointments.",
    copy:
      "Help callers get answers, leave their details and find a time to visit, with a clear route to your team when judgment is needed.",
    experience: "call",
    capabilities: [
      [
        "Answer approved questions",
        "Give callers information you have approved, such as opening hours and services.",
      ],
      [
        "Arrange appointments",
        "Collect the details needed for a booking and check available times.",
      ],
      [
        "Bring in your team",
        "Pass on requests that need a person with a clear summary of the conversation.",
      ],
    ],
    exampleTitle: "From a call to a confirmed next step.",
    example:
      "A customer calls to arrange a visit. Their details, request and preferred time reach your team together.",
    audience:
      "For teams that lose time repeating the same answers or taking notes between calls.",
    nextStep: "Map your call flow",
    note:
      "Before deployment, we agree approved knowledge, escalation rules, consent language and the limits of what the system can do.",
    useCases: [
      [
        "After-hours and overflow calls",
        "Capture useful information when the team is unavailable or already busy, while making urgent or uncertain situations easy to hand off.",
      ],
      [
        "Appointment-led businesses",
        "Answer routine questions, collect the right booking details and move the caller toward an available appointment without forcing staff to repeat the same flow.",
      ],
      [
        "Front-desk qualification",
        "Identify why someone is calling, collect approved details and route the request to the right person instead of leaving an unstructured voicemail.",
      ],
    ],
    process: [
      [
        "Define the call boundary",
        "We list what the receptionist may answer, what it must never decide, which details it can collect and when a human should take over.",
      ],
      [
        "Connect approved knowledge and actions",
        "Business information, booking steps and permitted integrations are added with explicit handling for missing data or unavailable systems.",
      ],
      [
        "Test difficult conversations",
        "We test interruptions, unclear requests, edge cases and escalation paths before treating the flow as ready for customer use.",
      ],
    ],
    questions: [
      [
        "What can an AI receptionist actually handle?",
        "The safest scope is repeatable front-desk work: approved FAQs, basic qualification, contact capture, appointment steps and routing. Judgment-heavy or sensitive requests should have a clear human path.",
      ],
      [
        "Can it book appointments?",
        "It can when the booking system and business rules can be integrated reliably. Availability, required customer details, confirmation behavior and failure handling need to be defined explicitly.",
      ],
      [
        "What happens when the caller asks something it does not know?",
        "The system should not invent an answer. A production design needs an uncertainty path such as collecting the request, transferring the call or creating a task for the team.",
      ],
      [
        "Can it replace our receptionist completely?",
        "We design around tasks, not a blanket replacement claim. Many teams use automation for repetitive or overflow interactions while keeping people responsible for judgment, exceptions and relationship-heavy conversations.",
      ],
    ],
    related: ["workflow-automation", "ai-calling-agents"],
  },
  "ai-calling-agents": {
    slug: "ai-calling-agents",
    name: "AI Calling Agents",
    eyebrow: "Communicate / 03",
    title: "Follow up with purpose.",
    copy:
      "Build permission-based calling tools for reminders and customer follow-ups, with customer choices and human handoff built in.",
    experience: "followup",
    capabilities: [
      [
        "Send timely reminders",
        "Help customers remember an appointment or respond to an earlier enquiry.",
      ],
      [
        "Capture the response",
        "Keep the customer response with their record so your team knows what happens next.",
      ],
      [
        "Respect customer choices",
        "Build in identification, opt-outs and a clear route to a person.",
      ],
    ],
    exampleTitle: "A callback arranged at the right time.",
    example:
      "A customer has asked for a callback about their quote. Their response tells the team when to call.",
    audience:
      "For teams with agreed-to-contact customers and a repeatable follow-up process.",
    nextStep: "Discuss a permitted use case",
    note:
      "Consent, identification, opt-outs, calling restrictions and recording requirements must be established for the jurisdiction and use case before deployment.",
    useCases: [
      [
        "Appointment reminders",
        "Confirm, reschedule or capture a response from customers who have an existing relationship with the business.",
      ],
      [
        "Requested callbacks",
        "Follow up on customers who explicitly asked to be contacted and record the outcome for the team.",
      ],
      [
        "Operational notifications",
        "Deliver a defined update and capture a simple response where automated calling is permitted and appropriate for the use case.",
      ],
    ],
    process: [
      [
        "Confirm permission and purpose",
        "We start with who may be called, why they may be called, how the business identifies itself and what opt-out behavior is required.",
      ],
      [
        "Design the conversation and records",
        "The call flow is kept narrow, with explicit outcomes that update the right customer record or create a human follow-up.",
      ],
      [
        "Validate limits before scale",
        "Edge cases, failures, escalation and compliance requirements are checked before increasing call volume.",
      ],
    ],
    questions: [
      [
        "Is automated outbound calling legal?",
        "Rules vary by jurisdiction, purpose, consent, identification, recording and industry. The use case must be reviewed against the requirements that apply to the business before deployment.",
      ],
      [
        "Should an AI calling agent cold-call prospects?",
        "Our preferred scope is permission-based or relationship-based outreach such as requested callbacks and reminders. Broad unsolicited outreach creates additional legal, reputational and quality risks.",
      ],
      [
        "How are opt-outs handled?",
        "An opt-out needs to be recognized, stored and respected across the workflow. It should not depend on a person remembering to update a separate spreadsheet later.",
      ],
      [
        "What if the customer wants to speak to a person?",
        "The flow should make that route explicit. Depending on the use case, the system can transfer, schedule a callback or create a task with the conversation context.",
      ],
    ],
    related: ["ai-receptionist", "workflow-automation"],
  },
  "workflow-automation": {
    slug: "workflow-automation",
    name: "Workflow Automation",
    eyebrow: "Automate / 04",
    title: "Cut repetitive admin.",
    copy:
      "Move details between your tools so your team spends less time copying and chasing, while failures remain visible and actionable.",
    experience: "records",
    capabilities: [
      [
        "Collect details once",
        "Take information from an enquiry and put it where your team needs it.",
      ],
      [
        "Assign the next task",
        "Send a new request to the right person with the details attached.",
      ],
      [
        "Keep track of problems",
        "Flag missing information and failed updates for someone to review.",
      ],
    ],
    exampleTitle: "One enquiry. The right record. The next task.",
    example:
      "A new enquiry becomes a customer record and a follow-up task without copying the same details twice.",
    audience:
      "For teams repeating the same handoffs across inboxes, spreadsheets and business tools.",
    nextStep: "Map a repetitive workflow",
    useCases: [
      [
        "Lead and enquiry routing",
        "Turn a form, email or call outcome into a structured record, assign ownership and make the next action visible.",
      ],
      [
        "Customer onboarding",
        "Move approved information through repeatable setup steps while keeping missing details and exceptions visible to the team.",
      ],
      [
        "Internal operations",
        "Reduce copy-paste work across spreadsheets, inboxes and business tools when the same trigger and rules appear again and again.",
      ],
    ],
    process: [
      [
        "Map the current workflow",
        "We document triggers, decisions, owners, systems, exceptions and the manual work people use to recover when something goes wrong.",
      ],
      [
        "Automate the stable steps",
        "Only repeatable behavior is automated. Judgment calls and unclear exceptions remain visible instead of being hidden inside a brittle workflow.",
      ],
      [
        "Add monitoring and recovery",
        "A production workflow needs logs, failure states and a practical way for a person to retry or correct an action.",
      ],
    ],
    questions: [
      [
        "What business processes are good candidates for automation?",
        "Look for repetitive, rules-based work with clear inputs and outcomes: routing enquiries, creating records, assigning tasks, sending approved notifications and synchronizing information.",
      ],
      [
        "Do we have to replace our existing software?",
        "Usually not. Automation is often most useful when it connects tools the team already relies on. Replacement only makes sense when the existing system itself is the operational bottleneck.",
      ],
      [
        "What happens when an integration fails?",
        "Failures should become visible work, not silent data loss. We design for logging, retries and human review so the team can recover deliberately.",
      ],
      [
        "How do we choose what to automate first?",
        "Start with a workflow that happens frequently, consumes measurable staff time and has relatively stable rules. That produces a clearer implementation target than trying to automate an entire business at once.",
      ],
    ],
    related: ["custom-software", "ai-receptionist"],
  },
  "custom-software": {
    slug: "custom-software",
    name: "Custom Software",
    eyebrow: "Build / 05",
    title: "Give your team better tools.",
    copy:
      "Bring bookings, tasks and customer information into a tool built around the jobs your business actually needs to get done.",
    experience: "software",
    capabilities: [
      [
        "See the day’s work",
        "Give your team a shared view of appointments, outstanding tasks and customer requests.",
      ],
      [
        "Make updates simply",
        "Design the screens around the actions people take every day.",
      ],
      [
        "Set the right access",
        "Decide who can see information, change records and manage the tool.",
      ],
    ],
    exampleTitle: "One tool. The right details.",
    example:
      "A team opens one dashboard to see today’s visits, assign work and check what still needs attention.",
    audience:
      "For teams whose existing tools leave an important operational gap.",
    nextStep: "Start a software project",
    useCases: [
      [
        "Operational dashboards",
        "Bring the few records, statuses and actions a team needs every day into one focused interface instead of forcing work across disconnected tools.",
      ],
      [
        "Internal workflow systems",
        "Model a process that is too specific for generic SaaS without turning every exception into another spreadsheet or manual workaround.",
      ],
      [
        "Customer-facing tools",
        "Create portals, request flows or service experiences that need to share data with internal operations.",
      ],
    ],
    process: [
      [
        "Define the users and jobs",
        "We identify who uses the system, what decisions they make and which information has to be accurate at each step.",
      ],
      [
        "Prove the workflow before expanding",
        "The first version focuses on the smallest complete operational path so the team can evaluate the system before unnecessary features accumulate.",
      ],
      [
        "Design for ownership",
        "Permissions, maintainability, data handling, deployment and documentation are treated as product requirements rather than post-launch cleanup.",
      ],
    ],
    questions: [
      [
        "When is custom software better than buying another SaaS tool?",
        "Custom software makes sense when a high-value workflow remains awkward across available tools, the process is important enough to justify ownership and the requirements are stable enough to build deliberately.",
      ],
      [
        "Can custom software integrate with our existing systems?",
        "Yes when those systems expose reliable APIs or other supported integration methods. We assess the integration constraints before making the custom interface depend on them.",
      ],
      [
        "Should we build everything in the first version?",
        "Usually no. A smaller end-to-end workflow is easier to validate, operate and improve than a broad feature list that has never been tested by the people doing the work.",
      ],
      [
        "Who owns the software after launch?",
        "Ownership and handover should be explicit in the engagement. We design with readable documentation and operational clarity so the business is not dependent on undocumented knowledge.",
      ],
    ],
    related: ["workflow-automation", "websites-apps"],
  },
};

function HeroVisual({ experience }: { experience: ExperienceKind }) {
  if (experience === "website" || experience === "software") {
    return (
      <div
        className={`service-system-visual service-system-${experience}`}
        aria-hidden="true"
      >
        <div className="service-system-ring" />
        <div className="service-system-panel">
          <span className="window-bar">
            <i />
            <i />
            <i />
          </span>
          <strong>
            {experience === "website"
              ? "A better first impression."
              : "A clearer day at a glance."}
          </strong>
          <span>
            {experience === "website"
              ? "Website / customer journey"
              : "Workspace / team system"}
          </span>
        </div>
        <span className="service-system-label">ORBITAL / SYSTEM PREVIEW</span>
      </div>
    );
  }
  return <StudioVisual kind={experience} large />;
}

function Experience({ experience }: { experience: ExperienceKind }) {
  if (experience === "website") return <WebsiteExperience detail />;
  if (experience === "software") return <SoftwareExperience detail />;
  return <StudioVisual kind={experience} large />;
}

function ProofCopy({ spec }: { spec: ServicePageSpec }) {
  return (
    <div className="service-proof-copy">
      <span className="category-label">A real-world shape / 03</span>
      <h2 id="service-example-title">{spec.exampleTitle}</h2>
      <p>{spec.example}</p>
      {spec.note && <p className="service-note">{spec.note}</p>}
      <Link href="/work" className="text-link">
        See the example systems <Arrow />
      </Link>
    </div>
  );
}

export function ServicePage({ spec }: { spec: ServicePageSpec }) {
  const theatreExperience =
    spec.experience === "website" || spec.experience === "software";

  return (
    <main id="main" className="service-page">
      <section
        className="service-editorial-hero"
        aria-labelledby="service-title"
      >
        <div className="service-editorial-hero-inner">
          <div className="service-editorial-copy">
            <Link href="/services" className="service-editorial-kicker">
              Services / {spec.eyebrow}
            </Link>
            <h1 id="service-title">{spec.title}</h1>
            <p>{spec.copy}</p>
            <Link href="/start-project" className="about-intro-link">
              {spec.nextStep} <Arrow />
            </Link>
          </div>
          <HeroVisual experience={spec.experience} />
        </div>
      </section>

      <section
        className="service-clarity section"
        aria-labelledby="service-help-title"
      >
        <div className="service-clarity-heading">
          <span className="category-label">How it helps / 02</span>
          <h2 id="service-help-title">{spec.audience}</h2>
        </div>
        <div className="service-capability-list">
          {spec.capabilities.map(([title, copy], index) => (
            <article key={title}>
              <span className="service-capability-number">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {theatreExperience ? (
        <section
          className="service-theatre"
          aria-label="Interactive service example"
        >
          <Experience experience={spec.experience} />
        </section>
      ) : (
        <section className="service-proof" aria-labelledby="service-example-title">
          <div className="service-proof-inner section">
            <ProofCopy spec={spec} />
            <div className="service-proof-visual">
              <Experience experience={spec.experience} />
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="service-use-cases">
        <div className="section-heading">
          <span className="category-label">Where it fits / 04</span>
          <h2 id="service-use-cases">Common use cases.</h2>
          <p>
            The best starting point is a specific customer or operational moment,
            not a vague instruction to “add AI” or “build software.”
          </p>
        </div>
        <div className="capability-grid">
          {spec.useCases.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="service-process">
        <div className="section-heading">
          <span className="category-label">Implementation / 05</span>
          <h2 id="service-process">How we turn the idea into a working system.</h2>
        </div>
        <div className="service-capability-list">
          {spec.process.map(([title, copy], index) => (
            <article key={title}>
              <span className="service-capability-number">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="service-note">
          Every project has different technical, legal and operational
          constraints. Scope is confirmed after reviewing the actual workflow
          and systems involved.
        </p>
      </section>

      <section className="section" aria-labelledby="service-questions">
        <div className="section-heading">
          <span className="category-label">Before you build / 06</span>
          <h2 id="service-questions">Questions businesses usually ask first.</h2>
        </div>
        <div className="service-capability-list">
          {spec.questions.map(([question, answer]) => (
            <article key={question}>
              <div>
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-next section" aria-labelledby="service-next-title">
        <div>
          <span className="category-label">Related systems / 07</span>
          <h2 id="service-next-title">The workflow rarely ends on one page.</h2>
        </div>
        <div>
          <p>
            Explore the connected services that often sit before or after this
            part of the customer journey.
          </p>
          {spec.related.map((slug) => {
            const related = servicePageSpecs[slug];
            return (
              <p key={slug}>
                <Link href={`/services/${slug}`} className="text-link">
                  {related.name} <Arrow />
                </Link>
              </p>
            );
          })}
          <p>
            <Link href="/insights" className="text-link">
              Read practical implementation guides <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <Cta centered />
    </main>
  );
}
