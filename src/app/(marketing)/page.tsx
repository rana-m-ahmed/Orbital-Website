import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ScenarioTheatre } from "@/components/home/ScenarioTheatre";
import { ProductGallery } from "@/components/home/ProductGallery";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { LabsCarousel } from "@/components/home/LabsCarousel";
import {
  SystemInterface,
  type SystemVisual,
} from "@/components/home/SystemVisuals";
import { TextLink } from "@/components/ui/Button";
import { WORK } from "@/content/work";

export const metadata: Metadata = {
  title: "ORBITAL — Automation for service businesses",
  description:
    "Answer more enquiries, follow up consistently, and remove repetitive work with automation and software built around your business.",
  alternates: { canonical: "/" },
};

const labs: { title: string; line: string; visual: SystemVisual }[] = [
  {
    title: "From missed call to booked in.",
    line: "A proposed system that answers, qualifies, and prepares a booking.",
    visual: "calls",
  },
  {
    title: "Every enquiry has an owner.",
    line: "A clear route from first contact to the right person and next action.",
    visual: "leads",
  },
  {
    title: "One place to run the day.",
    line: "An operations workspace for jobs, approvals, and customer context.",
    visual: "operations",
  },
];

const faqs = [
  [
    "Do I need to know what technology I need?",
    "No. Describe the part of the business that is slow, repetitive, or unreliable. Working out the right technical approach is part of our job.",
  ],
  [
    "Can this work with the tools we already use?",
    "Often, yes. We first examine what your current tools can do and where information needs to move before proposing anything new.",
  ],
  [
    "Where does a person stay involved?",
    "Where judgement, sensitivity, or approval matters. Every workflow is designed with clear boundaries and a visible route to a person.",
  ],
  [
    "What happens after launch?",
    "We test, document, and hand over the system clearly. Any ongoing support is agreed as part of the scope rather than assumed.",
  ],
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="possibilities" className="dark-section scenario-section">
        <div className="shell">
          <header className="architecture-heading">
            <p className="section-kicker">
              <span />
              01 / RECOGNISE THE FRICTION
            </p>
            <div>
              <h2>Where does your day get stuck?</h2>
              <p>
                Choose a familiar problem. See how a clearer system could handle
                it while keeping your people in control.
              </p>
            </div>
          </header>
          <ScenarioTheatre />
        </div>
      </section>

      <section id="solutions" className="dark-section capabilities-section">
        <div className="shell">
          <header className="architecture-heading">
            <p className="section-kicker">
              <span />
              02 / CAPABILITY ARCHITECTURE
            </p>
            <div>
              <h2>The right system for the work.</h2>
              <p>
                Automation leads. Integrations, software, and digital
                experiences support the way your business actually operates.
              </p>
            </div>
          </header>
          <div className="capability-grid">
            <article className="capability-slab automation-slab">
              <div className="capability-copy">
                <span>01 / AUTOMATION</span>
                <h3>Take repetition out of the working day.</h3>
                <p>
                  Handle enquiries, follow-ups, and routine administration
                  consistently—without losing human oversight.
                </p>
                <TextLink href="/automation">Explore automation</TextLink>
              </div>
              <div className="route-visual" aria-hidden="true">
                <span>New enquiry</span>
                <i />
                <span>Qualify</span>
                <i />
                <span>Book or route</span>
                <b>HUMAN CHECKPOINT</b>
              </div>
            </article>
            <article className="capability-slab integrations-slab">
              <div className="capability-copy">
                <span>02 / INTEGRATIONS</span>
                <h3>Make your tools move as one.</h3>
                <p>
                  Connect the systems you already use so information arrives
                  where it is needed.
                </p>
                <TextLink href="/integrations">Explore integrations</TextLink>
              </div>
              <div className="integration-orbit" aria-hidden="true">
                <b>O</b>
                <span>CRM</span>
                <span>INBOX</span>
                <span>CALENDAR</span>
              </div>
            </article>
            <article className="capability-slab software-slab">
              <div className="capability-copy">
                <span>03 / CUSTOM SOFTWARE</span>
                <h3>Build around the decisions your team makes.</h3>
                <p>
                  Purposeful software for the work that spreadsheets and generic
                  platforms cannot carry well.
                </p>
                <TextLink href="/software">Explore software</TextLink>
              </div>
              <SystemInterface variant="operations" compact />
            </article>
            <article className="capability-slab websites-slab">
              <div className="capability-copy">
                <span>04 / WEBSITES & APPS</span>
                <h3>Turn attention into a useful next step.</h3>
                <p>
                  Digital experiences designed around how customers choose,
                  enquire, and return.
                </p>
                <TextLink href="/websites-apps">
                  Explore websites & apps
                </TextLink>
              </div>
              <div className="mobile-journey" aria-hidden="true">
                <small>NEW ENQUIRY</small>
                <strong>What do you need help with?</strong>
                <span>Installation</span>
                <span>Maintenance</span>
                <i>CONTINUE →</i>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="dark-section gallery-section">
        <div className="shell">
          <header className="architecture-heading">
            <p className="section-kicker">
              <span />
              03 / INTERFACE CRAFT
            </p>
            <div>
              <h2>See what better can look like.</h2>
              <p>
                Detailed concept interfaces showing how complex operations can
                become clear, useful, and easy to act on.
              </p>
            </div>
          </header>
          <ProductGallery />
        </div>
      </section>

      <section id="labs" className="dark-section labs-architecture">
        <div className="shell">
          <header className="architecture-heading">
            <p className="section-kicker">
              <span />
              04 / ORBITAL LABS
            </p>
            <div>
              <h2>Explore the system behind the screen.</h2>
              <p>
                Concept systems grounded in real problems faced by service
                businesses.
              </p>
            </div>
          </header>
          <LabsCarousel count={WORK.length}>
            {WORK.map((item, i) => (
              <article
                className="architecture-lab-slide"
                key={item.slug}
                aria-label={`${i + 1} of ${WORK.length}`}
              >
                <Link
                  className="architecture-lab-cover"
                  href={`/work/${item.slug}`}
                >
                  <div className="lab-system-label">
                    <span>ORBITAL / LAB 0{i + 1}</span>
                    <span>CONCEPT DEMONSTRATION</span>
                  </div>
                  <SystemInterface variant={labs[i].visual} />
                </Link>
                <div className="architecture-lab-caption">
                  <div>
                    <span>{item.service.label}</span>
                    <h3>
                      <Link href={`/work/${item.slug}`}>{labs[i].title}</Link>
                    </h3>
                    <p>{labs[i].line}</p>
                  </div>
                  <Link
                    href={`/work/${item.slug}`}
                    aria-label={`Explore ${labs[i].title}`}
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </LabsCarousel>
        </div>
      </section>

      <section id="process" className="dark-section process-architecture">
        <div className="shell">
          <header className="architecture-heading">
            <p className="section-kicker">
              <span />
              05 / WORKING TOGETHER
            </p>
            <div>
              <h2>Clear at every step.</h2>
              <p>
                A visible path from the first conversation to a system your team
                understands.
              </p>
            </div>
          </header>
          <ProcessTimeline />
          <div className="architecture-faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="enquiry-close">
        <div className="shell enquiry-close-grid">
          <div>
            <p className="section-kicker">
              <span />
              06 / START WITH THE PROBLEM
            </p>
            <h2>What’s slowing your business down?</h2>
            <p>
              You do not need a technical brief. Choose a starting point, or
              tell us what is happening in your own words.
            </p>
          </div>
          <div className="enquiry-starts">
            {[
              ["Calls", "calls"],
              ["Follow-ups", "leads"],
              ["Customer questions", "support"],
              ["Admin", "admin"],
              ["Something else", "other"],
            ].map(([label, id], i) => (
              <Link href={`/contact?service=${id}`} key={id}>
                <span>0{i + 1}</span>
                {label}
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
