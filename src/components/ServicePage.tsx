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
};

export const servicePageSpecs: Record<string, ServicePageSpec> = {
  "websites-apps": {
    slug: "websites-apps",
    name: "Websites & Apps",
    eyebrow: "Build / 01",
    title: "Make the first visit worth staying for.",
    copy: "From a distinctive business website to a useful customer portal, we design the places where people meet your business online.",
    experience: "website",
    capabilities: [
      ["Business websites", "Clear services, considered design and an easy route to enquire."],
      ["Customer web apps", "Bookings, accounts and project updates in a place your customers can use."],
      ["Ready for real screens", "Responsive layouts, keyboard access and a straightforward content handover."],
    ],
    exampleTitle: "A clearer route from interest to action.",
    example: "A customer can understand what you offer, choose the next step and use the same experience on a phone or desktop.",
    audience: "For businesses whose website needs to do more than look good.",
    nextStep: "Tell us what you want to build",
  },
  "ai-receptionist": {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    eyebrow: "Communicate / 02",
    title: "Answer calls. Book appointments.",
    copy: "Help callers get answers, leave their details and find a time to visit, with a clear route to your team when judgment is needed.",
    experience: "call",
    capabilities: [
      ["Answer approved questions", "Give callers information you have approved, such as opening hours and services."],
      ["Arrange appointments", "Collect the details needed for a booking and check available times."],
      ["Bring in your team", "Pass on requests that need a person with a clear summary of the conversation."],
    ],
    exampleTitle: "From a call to a confirmed next step.",
    example: "A customer calls to arrange a visit. Their details, request and preferred time reach your team together.",
    audience: "For teams that lose time repeating the same answers or taking notes between calls.",
    nextStep: "Map your call flow",
    note: "Before deployment, we agree approved knowledge, escalation rules, consent language and the limits of what the system can do.",
  },
  "ai-calling-agents": {
    slug: "ai-calling-agents",
    name: "AI Calling Agents",
    eyebrow: "Communicate / 03",
    title: "Follow up with purpose.",
    copy: "Build permission-based calling tools for reminders and customer follow-ups, with customer choices and human handoff built in.",
    experience: "followup",
    capabilities: [
      ["Send timely reminders", "Help customers remember an appointment or respond to an earlier enquiry."],
      ["Capture the response", "Keep the customer response with their record so your team knows what happens next."],
      ["Respect customer choices", "Build in identification, opt-outs and a clear route to a person."],
    ],
    exampleTitle: "A callback arranged at the right time.",
    example: "A customer has asked for a callback about their quote. Their response tells the team when to call.",
    audience: "For teams with agreed-to-contact customers and a repeatable follow-up process.",
    nextStep: "Discuss a permitted use case",
    note: "Consent, identification, opt-outs, calling restrictions and recording requirements must be established for the jurisdiction and use case before deployment.",
  },
  "workflow-automation": {
    slug: "workflow-automation",
    name: "Workflow Automation",
    eyebrow: "Automate / 04",
    title: "Cut repetitive admin.",
    copy: "Move details between your tools so your team spends less time copying and chasing, while failures remain visible and actionable.",
    experience: "records",
    capabilities: [
      ["Collect details once", "Take information from an enquiry and put it where your team needs it."],
      ["Assign the next task", "Send a new request to the right person with the details attached."],
      ["Keep track of problems", "Flag missing information and failed updates for someone to review."],
    ],
    exampleTitle: "One enquiry. The right record. The next task.",
    example: "A new enquiry becomes a customer record and a follow-up task without copying the same details twice.",
    audience: "For teams repeating the same handoffs across inboxes, spreadsheets and business tools.",
    nextStep: "Map a repetitive workflow",
  },
  "custom-software": {
    slug: "custom-software",
    name: "Custom Software",
    eyebrow: "Build / 05",
    title: "Give your team better tools.",
    copy: "Bring bookings, tasks and customer information into a tool built around the jobs your business actually needs to get done.",
    experience: "software",
    capabilities: [
      ["See the day’s work", "Give your team a shared view of appointments, outstanding tasks and customer requests."],
      ["Make updates simply", "Design the screens around the actions people take every day."],
      ["Set the right access", "Decide who can see information, change records and manage the tool."],
    ],
    exampleTitle: "One tool. The right details.",
    example: "A team opens one dashboard to see today’s visits, assign work and check what still needs attention.",
    audience: "For teams whose existing tools leave an important operational gap.",
    nextStep: "Start a software project",
  },
};

function HeroVisual({ experience }: { experience: ExperienceKind }) {
  if (experience === "website" || experience === "software") {
    return (
      <div className={`service-system-visual service-system-${experience}`} aria-hidden="true">
        <div className="service-system-ring" />
        <div className="service-system-panel">
          <span className="window-bar"><i /><i /><i /></span>
          <strong>{experience === "website" ? "A better first impression." : "A clearer day at a glance."}</strong>
          <span>{experience === "website" ? "Website / customer journey" : "Workspace / team system"}</span>
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
      <section className="service-editorial-hero" aria-labelledby="service-title">
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

      <section className="service-clarity section" aria-labelledby="service-help-title">
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
        <section className="service-theatre" aria-label="Interactive service example">
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

      <section className="service-next section" aria-labelledby="service-next-title">
        <div>
          <span className="category-label">The useful next question / 04</span>
          <h2 id="service-next-title">What needs to become easier?</h2>
        </div>
        <p>Start with the moment that currently takes too many steps. We will help map the simplest useful version.</p>
      </section>

      <Cta centered />
    </main>
  );
}
