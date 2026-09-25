import type { Metadata } from "next";
import { ResolveOrHandoff } from "@/components/primitives/ResolveOrHandoff";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { ServiceNav } from "@/components/shell/ServiceNav";
import { FinalCta } from "@/components/shell/FinalCta";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { Breadcrumb, PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Customer Support Automation",
  description:
    "Resolve the routine support questions automatically and escalate everything else to a person — with the conversation, order history and context carried forward.",
  path: "/automation/customer-support",
});

const AUTOMATE = [
  {
    title: "Status questions",
    detail: "Where is my order, when is my appointment, has my payment gone through.",
  },
  {
    title: "Policy questions",
    detail: "Returns, cancellations, coverage areas, opening hours, what is included.",
  },
  {
    title: "Small changes",
    detail: "Update an address, move an appointment, add a note to an existing job.",
  },
  {
    title: "Document requests",
    detail: "Send a copy of an invoice, a receipt, a report or a certificate.",
  },
  {
    title: "Triage",
    detail: "Work out what the customer actually needs before a person spends time on it.",
  },
  {
    title: "First response",
    detail: "Acknowledge properly, at any hour, with something useful rather than a ticket number.",
  },
];

const NEVER = [
  "Refunds, disputes and anything that changes what a customer pays",
  "Complaints, and any conversation where the customer is upset",
  "Safety, legal, medical or contractual questions",
  "Anything the customer asks a person to handle",
];

const CHANNELS = [
  ["Email", "Shared inboxes and support addresses."],
  ["Website chat", "On your own site, with your own tone."],
  ["WhatsApp", "Where most customers already message businesses."],
  ["Phone", "Handled by the AI receptionist, into the same history."],
];

const FAQS = [
  {
    q: "Will customers get stuck in a loop?",
    a: "No. There is a hard rule: if the automation cannot resolve something in a small number of exchanges, or the customer asks for a person, it hands over. Trapping customers is the failure mode we design against first.",
  },
  {
    q: "How does it know your policies?",
    a: "From your own documented policies and systems. Where an answer is not documented, it says it will check rather than inventing one.",
  },
  {
    q: "What does the person receive on escalation?",
    a: "The full conversation, the customer's record, what was already promised, and a short summary of what they want. Nobody has to ask the customer to start again.",
  },
  {
    q: "Can we see what it is doing?",
    a: "Yes. Every conversation, its outcome and its escalation reason are recorded and reportable. Demonstration figures in the reporting section are clearly labelled as such.",
  },
];

export default function CustomerSupportPage() {
  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Automation", href: "/automation" },
              { label: "Customer Support" },
            ]}
          />
        }
        eyebrow="Customer Support"
        title="Handle routine questions without making customers feel trapped."
        body="Resolve what has a known answer. Escalate everything else quickly, with the conversation already written down."
        primary={{
          label: "Start a project",
          href: "/contact",
          event: "customer-support-hero",
        }}
        secondary={{ label: "See resolve vs hand off", href: "#resolve-or-hand-off" }}
      />

      <ServiceNav
        parent={{ label: "Automation", href: "/automation" }}
        page="Customer Support"
        items={[
          { label: "What to automate", id: "what-to-automate" },
          { label: "Resolve or hand off", id: "resolve-or-hand-off" },
          { label: "Channels", id: "channels" },
          { label: "FAQ", id: "faq" },
        ]}
      />

      <Section id="what-to-automate" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Scope"
              title="What should be automated?"
              body="Support automation earns its place on the questions that have one correct answer — and nowhere else."
            />

            <Reveal className="mt-10 rounded-2xl border border-[#e0e5ea] bg-white p-6">
              <p className="mono-label text-text-secondary-light">
                Never automated
              </p>
              <ul className="mt-4 space-y-3">
                {NEVER.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.92rem] leading-snug">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-px w-3 shrink-0 bg-[#c3cbd4]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal large className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:col-span-7">
            {AUTOMATE.map((item) => (
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

      {/* §20 — signature interaction. */}
      <Section id="resolve-or-hand-off" tone="light" space="l">
        <SectionHeader
          eyebrow="The decision"
          title="Resolve, or hand off."
          body="Pick a message and see which way it goes — and, more importantly, why."
        />
        <Reveal large className="mt-12">
          <ResolveOrHandoff />
        </Reveal>
      </Section>

      <Section tone="dark" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              eyebrow="Context"
              title="Context carries forward."
              body="An escalation that loses the conversation is worse than no automation at all. What the customer already said travels with them."
            />
          </div>

          <Reveal className="lg:col-span-7">
            <div className="rounded-2xl border border-midnight-line bg-[#0c121c] p-7">
              <p className="mono-label text-slate">Summary handed to the agent</p>
              <dl className="mt-5 space-y-4 text-[0.93rem]">
                {[
                  ["Customer", "Existing account · 3 previous orders · no open complaints"],
                  ["Asking for", "A refund for a duplicate charge on order #4182"],
                  ["Already confirmed", "The duplicate charge exists and has not been reversed"],
                  ["Already said", "That a person would look at it within the hour"],
                  ["Tone", "Frustrated — third contact about the same issue"],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid gap-1 border-b border-midnight-line pb-4 last:border-0 last:pb-0 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="text-slate">{term}</dt>
                    <dd className="text-offwhite/88">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="channels" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Channels and rules"
              title="One set of rules, wherever the customer writes."
              body="A customer who emails on Monday and messages on Thursday is one customer with one history."
            />

            <Reveal className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2">
              {CHANNELS.map(([title, detail]) => (
                <div key={title} className="bg-white p-5">
                  <h3 className="text-[0.95rem] font-medium">{title}</h3>
                  <p className="mt-1.5 text-[0.86rem] leading-snug text-text-secondary-light">
                    {detail}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal large>
              <p className="mono-label mb-4 text-text-secondary-light">
                Reporting · demonstration data
              </p>
              <ProductFrame
                variant="dashboard"
                title="Support reporting with demonstration data"
              />
              <p className="mt-4 text-[0.86rem] text-text-secondary-light">
                Figures shown here are demonstration data, not results from a
                client deployment.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="faq" tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="What people worry about." />
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
              label: "AI Receptionist",
              href: "/automation/ai-receptionist",
              detail: "The same rules applied to the phone.",
            },
            {
              label: "Integrations",
              href: "/integrations",
              detail: "Where the order, account and billing data comes from.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us which questions fill your inbox.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Answer the routine. Escalate the rest."
        body="Tell us what your support inbox looks like on a normal week, and which questions repeat."
        eventLabel="customer-support-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "Customer Support", path: "/automation/customer-support" },
          ]),
          serviceSchema({
            name: "Customer support automation",
            description:
              "Automated handling of routine customer support questions across email, chat, messaging and phone, with escalation to a person and full context transfer.",
            path: "/automation/customer-support",
          }),
        ]}
      />
    </>
  );
}
