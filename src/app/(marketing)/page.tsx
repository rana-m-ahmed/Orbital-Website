import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { BusinessDemo } from "@/components/home/BusinessDemo";
import { LabsCarousel } from "@/components/home/LabsCarousel";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { WORK } from "@/content/work";

export const metadata: Metadata = {
  title: "ORBITAL — Less busywork. More room to grow.",
  description:
    "We automate repetitive tasks, connect your business tools, and build software around the way you work. Automation, software and systems by ORBITAL.",
  alternates: { canonical: "/" },
};
const services = [
  {
    number: "01",
    title: "Automate",
    subtitle: "Give your time back.",
    body: "From the first enquiry to the everyday admin. Let the repetitive work take care of itself, so your people can focus on what matters.",
    tags: "Calls & enquiries / Follow-ups / Operations",
    href: "/automation",
    visual: "automate",
  },
  {
    number: "02",
    title: "Connect",
    subtitle: "Get everything working together.",
    body: "Your CRM, inbox, calendar and business tools, finally on the same page. Information moves where it needs to, without the copy and paste.",
    tags: "Integrations / Workflows / Business systems",
    href: "/integrations",
    visual: "connect",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Make room for what’s next.",
    body: "When the right tool doesn’t exist, we build it. Thoughtful software, websites and apps shaped around your business, not the other way around.",
    tags: "Custom software / Websites / Apps",
    href: "/software",
    visual: "build",
  },
];
const steps = [
  [
    "Understand",
    "First, we listen.",
    "We look at how work happens today and find the friction worth fixing.",
  ],
  [
    "Design",
    "A clear way forward.",
    "You get a practical plan, a defined scope, and a shared picture of success.",
  ],
  [
    "Build",
    "See it come together.",
    "Working versions, visible progress, and room for your feedback along the way.",
  ],
  [
    "Support",
    "Built to keep working.",
    "Testing, documentation, and a clear handover. You know how it works and who to call.",
  ],
];
const projectTitles = [
  "From missed call to booked in.",
  "Every enquiry. A next step.",
  "One place to run the day.",
];
export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="services" className="home-services section-pad">
        <div className="shell">
          <div className="editorial-heading">
            <p className="eyebrow">
              <span className="tiny-node" /> BUILT AROUND YOUR BUSINESS
            </p>
            <div>
              <h2>
                Good technology.
                <br />
                <span className="muted-heading">Less to think about.</span>
              </h2>
              <p>
                You know where the friction is.
                <br />
                We help you move past it.
              </p>
            </div>
          </div>
          <div className="service-rows">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="service-number">/{service.number}</span>
                <div className="service-title">
                  <h3>
                    {service.title}
                    <span className="blue-dot">.</span>
                  </h3>
                  <p>{service.tags}</p>
                </div>
                <div className="service-copy">
                  <h4>{service.subtitle}</h4>
                  <p>{service.body}</p>
                  <TextLink href={service.href}>
                    Explore{" "}
                    {service.visual === "automate"
                      ? "automation"
                      : service.visual === "connect"
                        ? "integrations"
                        : "software"}
                  </TextLink>
                </div>
                <div
                  className={`service-art art-${service.visual}`}
                  aria-hidden="true"
                >
                  {service.visual === "automate" ? (
                    <>
                      <span className="art-track" />
                      <i />
                      <b>↗</b>
                      <span className="art-track lower" />
                    </>
                  ) : service.visual === "connect" ? (
                    <>
                      <i>↗</i>
                      <i>O</i>
                      <i>✓</i>
                      <span />
                    </>
                  ) : (
                    <>
                      <span className="mini-browser">
                        <i />
                        <i />
                        <i />
                        <b />
                        <em />
                        <em />
                      </span>
                      <span className="mini-mobile" />
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="in-action" className="home-demo section-pad">
        <div className="shell">
          <div className="editorial-heading">
            <p className="eyebrow">
              <span className="tiny-node" /> FROM IDEA TO EVERYDAY
            </p>
            <div>
              <h2>
                A little automation.
                <br />
                <span className="muted-heading">A very different day.</span>
              </h2>
              <p>
                See what happens when the right things
                <br className="hidden md:block" /> start working together.
              </p>
            </div>
          </div>
          <BusinessDemo />
        </div>
      </section>
      <section className="home-labs section-pad">
        <div className="shell">
          <div className="editorial-heading">
            <p className="eyebrow">
              <span className="tiny-node" /> ORBITAL LABS
            </p>
            <div>
              <h2>
                Possibility,
                <br />
                <span className="muted-heading">made tangible.</span>
              </h2>
              <div>
                <p>
                  A closer look at what we can build.
                  <br />
                  Concept systems. Real business problems.
                </p>
                <TextLink href="/work">Explore the lab</TextLink>
              </div>
            </div>
          </div>
          <LabsCarousel count={WORK.length}>
            {WORK.map((item, i) => (
              <article
                className={`lab-slide lab-slide-${i}`}
                key={item.slug}
                aria-label={`${i + 1} of ${WORK.length}`}
              >
                <Link
                  className="lab-visual"
                  href={`/work/${item.slug}`}
                  data-track="work_case_open"
                  data-track-label={item.slug}
                  aria-label={projectTitles[i]}
                >
                  <div className="lab-preview-label">
                    <span>ORBITAL / LAB {String(i + 1).padStart(2, "0")}</span>
                    <span>↗</span>
                  </div>
                  <div className="lab-product">
                    <ProductFrame variant={item.frame} title={item.title} />
                  </div>
                  <span className="lab-watermark" aria-hidden="true">
                    {["Answer.", "Connect.", "Simplify."][i]}
                  </span>
                </Link>
                <div className="lab-caption">
                  <div>
                    <p className="eyebrow">
                      {item.service.label} · Concept demonstration
                    </p>
                    <h3>
                      <Link href={`/work/${item.slug}`}>
                        {projectTitles[i]}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    className="lab-arrow"
                    href={`/work/${item.slug}`}
                    aria-label={`Explore ${projectTitles[i]}`}
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </LabsCarousel>
        </div>
      </section>
      <section id="process" className="home-process section-pad">
        <div className="shell">
          <div className="editorial-heading">
            <p className="eyebrow">
              <span className="tiny-node" /> SMALL TEAM. SHARED AMBITION.
            </p>
            <div>
              <h2>
                From “what if”
                <br />
                <span className="muted-heading">to working.</span>
              </h2>
              <div>
                <p>
                  One team, from the first conversation
                  <br />
                  to the system you use every day.
                </p>
                <TextLink href="/about">Meet ORBITAL</TextLink>
              </div>
            </div>
          </div>
          <div className="process-grid">
            {steps.map(([title, lead, body], i) => (
              <article key={title}>
                <div className="process-marker">
                  <span>0{i + 1}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{title}</h3>
                <h4>{lead}</h4>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="process-assurance">
            <span>Clear scope.</span>
            <span>Visible progress.</span>
            <span>Thoughtful handover.</span>
          </div>
        </div>
      </section>
      <FinalCta
        headline="What would you like your business to do better?"
        body="Bring us the problem. We’ll work out the possibilities together."
        eventLabel="home-final"
      />
    </>
  );
}
