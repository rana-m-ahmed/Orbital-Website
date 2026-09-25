import type { Metadata } from "next";
import { SignalFlow } from "@/components/primitives/SignalFlow";
import { ServiceNav } from "@/components/shell/ServiceNav";
import { FinalCta } from "@/components/shell/FinalCta";
import { PrimaryButton } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { Breadcrumb, PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SecondaryCase } from "@/components/work/WorkCard";
import { workBySlug } from "@/content/work";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Operations Automation",
  description:
    "Automate the repetitive admin inside a business: documents, approvals, reminders, data updates and recurring reports — with people kept in control of the exceptions.",
  path: "/automation/operations-automation",
});

const REPETITIVE = [
  {
    title: "Documents",
    detail:
      "Invoices, purchase orders, timesheets, delivery notes and forms that arrive as email attachments and leave as manual data entry.",
  },
  {
    title: "Approvals",
    detail:
      "The chase. Who signed off what, when, and where that decision is now recorded.",
  },
  {
    title: "Reminders",
    detail:
      "Renewals, expiries, follow-ups and check-ins that currently live in somebody's head or calendar.",
  },
  {
    title: "Data updates",
    detail:
      "The same record typed into two systems because nothing connects them.",
  },
  {
    title: "Reports",
    detail:
      "The weekly numbers, rebuilt from the same sources every week by the same person.",
  },
];

const CONTROLS = [
  {
    title: "Thresholds",
    detail: "Below your limit it proceeds. Above it, a named person approves.",
  },
  {
    title: "Exceptions",
    detail:
      "Anything that does not match is flagged and queued, never quietly processed.",
  },
  {
    title: "Audit trail",
    detail: "Every step records what happened, when, and on whose authority.",
  },
  {
    title: "Reversal",
    detail: "A wrong decision can be undone, and the correction is recorded too.",
  },
];

const RECURRING = [
  ["Daily", "Overnight imports, reconciliation checks, the morning summary."],
  ["Weekly", "Reporting, invoice runs, schedule preparation, follow-up sweeps."],
  ["Monthly", "Close-off, renewals, recurring billing, compliance checks."],
  ["On event", "Anything triggered by a payment, a signature or a delivery."],
];

const FAQS = [
  {
    q: "Our documents are not standardised. Does that break it?",
    a: "No, but it changes the design. Where formats vary, the system extracts what it can, checks it against a source of truth, and routes anything uncertain to a person rather than assuming.",
  },
  {
    q: "What happens when it gets something wrong?",
    a: "It is designed to fail loudly. Exceptions are queued and visible, and there is an audit trail for every automated decision so a mistake can be traced and reversed.",
  },
  {
    q: "Do we need custom software for this?",
    a: "Often not. Most operational automation runs on the tools you already have. We build software when the workflow genuinely does not fit anything available — and we say so before you spend money.",
  },
  {
    q: "Who owns the rules afterwards?",
    a: "You do. The rules are documented in plain language, and so is the system that runs them.",
  },
];

export default function OperationsAutomationPage() {
  const reference = workBySlug("operations-console");

  return (
    <>
      <PageHero
        tone="light"
        layout="stacked"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Automation", href: "/automation" },
              { label: "Operations Automation" },
            ]}
          />
        }
        eyebrow="Operations Automation"
        title="Take repetitive admin off your team's plate."
        body="Documents read, checked, routed and recorded. Approvals where judgement is needed, and nowhere else."
        primary={{
          label: "Start a project",
          href: "/contact",
          event: "operations-hero",
        }}
        secondary={{ label: "See a document route", href: "#document-route" }}
      />

      <ServiceNav
        parent={{ label: "Automation", href: "/automation" }}
        page="Operations Automation"
        items={[
          { label: "Repetitive work", id: "repetitive-work" },
          { label: "Document route", id: "document-route" },
          { label: "Controls", id: "controls" },
          { label: "FAQ", id: "faq" },
        ]}
      />

      <Section id="repetitive-work" tone="light" space="l">
        <SectionHeader
          eyebrow="Where the hours go"
          title="The work nobody was hired to do."
          body="None of this is difficult. That is exactly why it is expensive — it is skilled people doing unskilled handling."
        />

        <Reveal large className="mt-14 grid gap-3 md:grid-cols-6">
          {REPETITIVE.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-[#e0e5ea] bg-white p-7 ${
                index === 0 ? "md:col-span-3" : index === 1 ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <h3 className="display-4">{item.title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-text-secondary-light">
                {item.detail}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* §20 — signature interaction. */}
      <Section id="document-route" tone="dark" space="l">
        <SectionHeader
          tone="dark"
          eyebrow="Document route"
          title="Received, read, checked, recorded."
          body="A supplier invoice, from the moment it lands to the moment it is filed — with an approval in the middle because the amount crosses a threshold."
        />
        <Reveal large className="mt-12">
          <SignalFlow
            label="Supplier invoice · £4,180 · above approval threshold"
            demoName="Document route"
            tone="dark"
            hold={780}
            startDelay={500}
            nodes={[
              { label: "Receive", detail: "Arrives as an email attachment." },
              { label: "Read", detail: "Supplier, amount, dates and reference extracted." },
              { label: "Check", detail: "Matched against the purchase order and previous invoices." },
              { label: "Route", detail: "Sent to the approver for this cost centre.", handoff: true },
              { label: "Approve", detail: "Approved, with the decision recorded." },
              { label: "Record", detail: "Filed, posted and visible in reporting." },
            ]}
            footer="A duplicate, a mismatch or a missing purchase order stops here and is flagged, rather than being processed and corrected later."
          />
        </Reveal>
      </Section>

      <Section id="controls" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Controls"
              title="People stay in control of the decisions."
              body="Automation handles the handling. It does not quietly acquire the authority to approve, pay or write off."
            />
          </div>

          <Reveal large className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:col-span-7">
            {CONTROLS.map((item) => (
              <div key={item.title} className="bg-white p-6">
                <h3 className="display-4">{item.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary-light">
                  {item.detail}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Recurring operations"
              title="The work that comes back every week."
            />
          </div>

          <Reveal className="lg:col-span-8">
            <dl className="divide-y divide-[#e0e5ea] border-y border-[#e0e5ea]">
              {RECURRING.map(([when, what]) => (
                <div key={when} className="grid gap-2 py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
                  <dt className="display-4">{when}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-text-secondary-light">
                    {what}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <Reveal large>
          <div className="rounded-2xl border border-[#e0e5ea] bg-white p-9 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="display-3">
                  When the tools run out, the answer is software.
                </h2>
                <p className="mt-4 max-w-[560px] text-[0.98rem] leading-relaxed text-text-secondary-light">
                  Some operations do not fit a spreadsheet, a CRM or an automation
                  platform — usually because the business has a process nobody
                  else has. That is the point at which building something is the
                  cheaper answer, not the more ambitious one.
                </p>
              </div>
              <div className="md:col-span-4 md:justify-self-end">
                <PrimaryButton
                  href="/software"
                  event="service_cta"
                  eventLabel="operations-to-software"
                >
                  Explore custom software
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {reference ? (
        <Section tone="light" space="m">
          <SectionHeader
            eyebrow="Reference system"
            title="What this looks like when it is built."
            body="A reference system built by ORBITAL, not a client deployment."
          />
          <Reveal large className="mt-10 max-w-[620px]">
            <SecondaryCase item={reference} />
          </Reveal>
        </Section>
      ) : null}

      <Section id="faq" tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Practical questions." />
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
              label: "Custom software",
              href: "/software",
              detail: "For the operations that do not fit an existing tool.",
            },
            {
              label: "Integrations",
              href: "/integrations",
              detail: "How documents and records move between systems.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us which admin task repeats most.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Which admin task would you never miss?"
        body="Describe one process that eats a morning every week. That is usually the right first project."
        eventLabel="operations-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "Operations Automation", path: "/automation/operations-automation" },
          ]),
          serviceSchema({
            name: "Operations automation",
            description:
              "Automation of documents, approvals, reminders, data updates and recurring reporting, with human approval thresholds and an audit trail.",
            path: "/automation/operations-automation",
          }),
        ]}
      />
    </>
  );
}
