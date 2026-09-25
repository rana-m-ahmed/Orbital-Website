import type { Metadata } from "next";
import Link from "next/link";
import { AutomationDemos } from "@/components/home/SeeAutomationAtWork";
import { ProcessRoute } from "@/components/primitives/ProcessRoute";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { INTEGRATION_HIGHLIGHTS } from "@/content/integrations";
import { PROCESS_STAGES } from "@/content/process";
import { AUTOMATION_CHILDREN } from "@/lib/site";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Business Automation Services",
  description:
    "ORBITAL automates the repetitive work inside a business: inbound calls, lead follow-up, customer support and operational admin — connected to the tools you already use.",
  path: "/automation",
});

const AREAS = [
  {
    ...AUTOMATION_CHILDREN[0],
    statement: "Answer every call. Book appointments. Route customers.",
    detail:
      "An AI receptionist that picks up on the first ring, qualifies the caller, books against live availability and transfers anything outside its scope to a person.",
  },
  {
    ...AUTOMATION_CHILDREN[1],
    statement: "Respond while the lead is still interested.",
    detail:
      "Capture from every channel, qualify against rules you can read, reply immediately and route to the right salesperson with the context attached.",
  },
  {
    ...AUTOMATION_CHILDREN[2],
    statement: "Handle routine questions. Escalate the rest.",
    detail:
      "Resolve the questions that have a known answer, carry the conversation forward when a person takes over, and never trap a customer in a loop.",
  },
  {
    ...AUTOMATION_CHILDREN[3],
    statement: "Move data, documents and approvals automatically.",
    detail:
      "Read what arrives, check it, route it for approval where judgement is needed, and record it — instead of re-keying it between systems.",
  },
];

const FAQS = [
  {
    q: "Where should a business start?",
    a: "With the single piece of handling that costs you the most: usually missed calls, slow lead response, or admin that eats a day a week. One well-chosen automation is worth more than a broad programme.",
  },
  {
    q: "Do we have to change the tools we use?",
    a: "No. Automation is built around your existing CRM, calendar, inbox and accounting tools wherever those tools work. Replacing them is a last resort, not a starting point.",
  },
  {
    q: "What stays with a person?",
    a: "Judgement, exceptions, money and anything involving an unhappy customer. Every workflow we build has an explicit escalation path rather than a best guess.",
  },
  {
    q: "How do we know it is working?",
    a: "Each automation reports what it handled, what it escalated and what failed. If you cannot see into it, you cannot trust it, so visibility is part of delivery rather than an extra.",
  },
];

export default function AutomationPage() {
  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        eyebrow="Automation"
        title="Take the repeating work off your team."
        body="Automation is where ORBITAL starts. Calls, enquiries, support and admin are the four places most businesses lose time — and the four places it is most reliably recoverable."
        primary={{ label: "Start a project", href: "/contact", event: "automation-hero" }}
        secondary={{ label: "See the demonstrations", href: "#workflow-selector" }}
      />

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Four areas"
          title="What ORBITAL automates."
          body="Each area is a separate discipline with its own rules, integrations and escalation points."
        />

        <Reveal large className="mt-14 grid gap-3 md:grid-cols-2">
          {AREAS.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              data-track="automation_example_select"
              data-track-label={area.label}
              className="group flex flex-col justify-between rounded-2xl border border-[#e0e5ea] bg-white p-7 transition-[border-color,transform] duration-200 ease-[var(--ease-orbital)] hover:-translate-y-0.5 hover:border-[#c8d2de] md:p-9"
            >
              <div>
                <h2 className="display-3">{area.label}</h2>
                <p className="mt-3 text-[1.05rem] font-medium">{area.statement}</p>
                <p className="mt-4 max-w-[460px] text-[0.95rem] leading-relaxed text-text-secondary-light">
                  {area.detail}
                </p>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 text-[0.9rem] font-medium text-interactive-on-light">
                See {area.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 transition-transform duration-150 group-hover:translate-x-[3px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* §20 — the Automation page's one signature interaction: the selector. */}
      <Section id="workflow-selector" tone="light" space="l">
        <SectionHeader
          eyebrow="Workflow selector"
          title="Pick a workflow and watch it run."
          body="Four real sequences, in plain English. Each plays once and stops where the work is finished."
        />
        <Reveal large className="mt-12">
          <AutomationDemos />
        </Reveal>
      </Section>

      <Section tone="dark" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              eyebrow="Compatibility"
              title="Automation sits on top of your stack."
              body="Nothing here asks you to abandon the systems your business already runs on. Where a native connector does not exist, we build one."
              after={
                <TextLink href="/integrations" tone="dark">
                  View integrations
                </TextLink>
              }
            />
          </div>
          <div className="lg:col-span-7">
            <LogoGrid items={INTEGRATION_HIGHLIGHTS} tone="dark" />
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="How we work"
          title="From problem to working system."
          body="The same four stages whichever area you start in."
        />
        <ProcessRoute stages={PROCESS_STAGES} />
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Before you start." />
          </div>
          <div className="lg:col-span-8">
            <Faq items={FAQS} />
          </div>
        </div>
      </Section>

      <Section tone="light" space="s">
        <CrossLinks
          links={[
            {
              label: "Integrations",
              href: "/integrations",
              detail: "See what ORBITAL connects, and what happens when there is no connector.",
            },
            {
              label: "Custom software",
              href: "/software",
              detail: "When the workflow does not fit anything on the market.",
            },
            {
              label: "Work",
              href: "/work",
              detail: "Reference systems showing each problem solved end to end.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Which part of the day would you automate first?"
        body="Describe the handling that costs your team the most. We'll tell you whether it should be automated, connected or built."
        eventLabel="automation-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
          ]),
          serviceSchema({
            name: "Business automation",
            description:
              "Automation of inbound calls, lead follow-up, customer support and operational admin for small and mid-sized businesses.",
            path: "/automation",
          }),
        ]}
      />
    </>
  );
}
