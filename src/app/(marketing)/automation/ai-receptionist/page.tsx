import type { Metadata } from "next";
import { ConversationStage } from "@/components/primitives/ConversationStage";
import { ProcessRoute } from "@/components/primitives/ProcessRoute";
import { ServiceNav } from "@/components/shell/ServiceNav";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { Breadcrumb, PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ScenarioTabs } from "@/components/ui/ScenarioTabs";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Receptionist for Business",
  description:
    "An AI receptionist that answers every call, qualifies the caller, books appointments against live availability and transfers anything outside its scope to a person.",
  path: "/automation/ai-receptionist",
});

const CAPABILITIES = [
  {
    title: "Answer",
    detail: "Picks up immediately, in and out of hours, without a queue.",
  },
  {
    title: "Qualify",
    detail: "Asks the questions you would ask, in the order you would ask them.",
  },
  {
    title: "Book & reschedule",
    detail: "Offers real availability from your calendar and confirms in the call.",
  },
  {
    title: "Answer common questions",
    detail: "Opening hours, service areas, pricing ranges, what to expect on a visit.",
  },
  {
    title: "Collect details",
    detail: "Name, address, job description, access notes — captured accurately.",
  },
  {
    title: "Route & transfer",
    detail: "Sends the call to the right person when that is the right answer.",
  },
  {
    title: "Update the CRM",
    detail: "Creates or updates the record with a summary attached.",
  },
  {
    title: "Confirm",
    detail: "Sends the caller a written confirmation so nothing depends on memory.",
  },
];

const SCENARIOS = [
  {
    id: "trades",
    label: "Trades & field service",
    headline: "Calls arrive while your team is on a job.",
    body: "Nobody is at a desk, so the choice is between interrupting work and losing the enquiry. The receptionist removes that choice.",
    points: [
      "Answers while engineers are on site, on the road or in a loft",
      "Captures the address, access notes and urgency in the caller's own words",
      "Books against the live engineering calendar rather than a guess",
      "Flags emergencies for immediate transfer instead of scheduling them",
    ],
  },
  {
    id: "clinics",
    label: "Clinics & appointments",
    headline: "Most callers want one of three things.",
    body: "Book, reschedule, or ask a routine question. All three can be handled properly without a person picking up.",
    points: [
      "Books, reschedules and cancels against real availability",
      "Answers routine questions about preparation, documents and timings",
      "Passes anything clinical or sensitive to a named member of staff",
      "Sends written confirmations so fewer appointments are missed",
    ],
  },
  {
    id: "professional",
    label: "Professional services",
    headline: "The first conversation decides whether you are shortlisted.",
    body: "A caller comparing three firms remembers which one answered and which one sent them to voicemail.",
    points: [
      "Takes a proper brief rather than just a name and number",
      "Qualifies against the work you actually want",
      "Books an introductory call in the same conversation",
      "Hands the file to the right partner with the context attached",
    ],
  },
  {
    id: "retail",
    label: "Retail & ecommerce",
    headline: "Order questions do not need a person.",
    body: "Where is my order, can I change it, what is your returns policy — answered instantly, with the exceptions escalated.",
    points: [
      "Resolves order, delivery and returns questions with live data",
      "Recognises when a customer is unhappy and escalates early",
      "Keeps a written record of what was promised",
      "Hands billing and refunds to a person, always",
    ],
  },
];

const SETUP = [
  { title: "Learn calls", detail: "We listen to how your calls actually go today." },
  { title: "Define rules", detail: "What it handles, what it never handles, who it transfers to." },
  { title: "Connect", detail: "Calendar, CRM and telephony joined to the workflow." },
  { title: "Test", detail: "Real scenarios, including the awkward and the rude ones." },
  { title: "Launch", detail: "Go live with logs, recordings and a clear off switch." },
];

const FAQS = [
  {
    q: "Will callers know it is not a person?",
    a: "We recommend being straightforward about it. In practice callers care far more about being answered and getting a booking than about who answered, and pretending otherwise damages trust the first time it slips.",
  },
  {
    q: "What happens with a call it cannot handle?",
    a: "It transfers, takes a message, or books a callback — whichever you define. There is always an explicit path out, and it is never left to improvise.",
  },
  {
    q: "Can it take bookings in our real calendar?",
    a: "Yes. It reads live availability and writes the appointment back, so there is no separate diary to reconcile afterwards.",
  },
  {
    q: "What about accents, background noise and bad lines?",
    a: "These are the normal conditions of a real phone line, and they are exactly what we test against before launch. Where the call is genuinely unclear, it asks again or transfers rather than guessing.",
  },
  {
    q: "Can we turn it off?",
    a: "Yes — entirely, or by time of day, or per number. You keep control of when it answers.",
  },
];

export default function AiReceptionistPage() {
  return (
    <>
      <PageHero
        tone="dark"
        layout="split"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Automation", href: "/automation" },
              { label: "AI Receptionist" },
            ]}
          />
        }
        eyebrow="AI Receptionist"
        title="Never let a good call go unanswered."
        body="Every call answered, qualified and booked — in hours, out of hours, and while your team is busy doing the work you sell."
        primary={{
          label: "Build my receptionist",
          href: "/contact",
          event: "ai-receptionist-hero",
        }}
        secondary={{ label: "Hear how it handles a call", href: "#how-it-works" }}
      />

      <ServiceNav
        parent={{ label: "Automation", href: "/automation" }}
        page="AI Receptionist"
        items={[
          { label: "Overview", id: "how-it-works" },
          { label: "What it does", id: "capabilities" },
          { label: "Integrations", id: "integrations" },
          { label: "FAQ", id: "faq" },
        ]}
      />

      {/* §20 — this page's one signature interaction. */}
      <Section id="how-it-works" tone="light" space="l">
        <SectionHeader
          eyebrow="A real call"
          title="One call. Everything handled."
          body="A caller with a problem, a calendar with real availability, and a record that exists afterwards. Watch it once."
        />
        <Reveal large className="mt-12">
          <ConversationStage
            label="Inbound call · 19:42 · outside office hours"
            caller="New caller — no record found"
            demoName="AI receptionist call"
            tone="light"
            hold={820}
            startDelay={450}
            turns={[
              {
                from: "agent",
                state: "Answer",
                text: "Good evening, Northfield Services — how can I help?",
              },
              {
                from: "caller",
                state: "Listen",
                text: "There's water coming through the ceiling in our shop.",
              },
              {
                from: "system",
                state: "Assess",
                text: "Matched to the emergency rule set — urgency confirmed with the caller.",
              },
              {
                from: "agent",
                state: "Capture",
                text: "I have the address and access details. An engineer can be with you within two hours.",
              },
              {
                from: "system",
                state: "Book",
                text: "Emergency slot reserved and the on-call engineer paged.",
              },
              {
                from: "person",
                state: "Hand off",
                text: "Engineer confirms and calls the customer directly.",
              },
              {
                from: "system",
                state: "Record",
                text: "Job created, call summary and recording attached",
                done: true,
              },
            ]}
            footer="An emergency is escalated, not scheduled. The rules that decide this are yours, written in plain language."
          />
        </Reveal>
      </Section>

      <Section id="capabilities" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Capability"
              title="What it can do."
              body="Booking is not a separate product. It is part of the same conversation."
            />
          </div>

          <Reveal large className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:col-span-8">
            {CAPABILITIES.map((item) => (
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

      <Section tone="dark" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeader
              tone="dark"
              eyebrow="Human handoff"
              title="Automation when it helps. People when they matter."
              body="A receptionist that never hands over is not efficient — it is a wall. Every workflow has explicit points where a person takes the call, with everything said so far already written down."
            />
          </div>

          <Reveal className="lg:col-span-6">
            <ul className="space-y-px overflow-hidden rounded-2xl border border-midnight-line bg-midnight-line">
              {[
                ["Money", "Refunds, disputes and anything that changes what a customer pays."],
                ["Judgement", "Exceptions, unusual requests and situations with no defined rule."],
                ["Emotion", "A customer who is upset reaches a person quickly, not eventually."],
                ["Request", "If the caller asks for a human, they get one. No loop, no insistence."],
              ].map(([title, detail]) => (
                <li key={title} className="bg-midnight p-6">
                  <h3 className="text-[1rem] font-medium text-offwhite">{title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-slate">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Built around your business"
          title="The same system, shaped differently."
          body="The rules, the questions and the escalation points change with the business. The discipline does not."
        />
        <Reveal large className="mt-12">
          <ScenarioTabs scenarios={SCENARIOS} ariaLabel="Business types" />
        </Reveal>
      </Section>

      <Section id="integrations" tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Integrations"
              title="Connected to what you already run."
              body="Calendar, CRM, telephony and messaging. Where there is no native connector, we build against the API."
              after={<TextLink href="/integrations">View integrations</TextLink>}
            />
          </div>
          <div className="lg:col-span-7">
            <LogoGrid
              columns={3}
              items={[
                "Google Calendar",
                "Microsoft 365",
                "HubSpot",
                "Salesforce",
                "Twilio",
                "WhatsApp Business",
                "Slack",
                "Pipedrive",
                "Custom API",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Setup"
          title="Five steps to answering every call."
          body="Nothing goes live until it has been tested against the calls you actually get."
        />
        <ProcessRoute stages={SETUP} />
      </Section>

      <Section id="faq" tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="The questions people ask." />
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
              detail: "How the receptionist reaches your calendar and CRM.",
            },
            {
              label: "Lead Automation",
              href: "/automation/lead-automation",
              detail: "What happens to the enquiry after the call ends.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us how your calls are handled today.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Make every call count."
        body="Tell us what happens to your calls today — who answers, when, and what gets missed."
        ctaLabel="Build my receptionist"
        eventLabel="ai-receptionist-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "AI Receptionist", path: "/automation/ai-receptionist" },
          ]),
          serviceSchema({
            name: "AI receptionist",
            description:
              "An AI receptionist that answers, qualifies, books appointments and routes calls, integrated with a business's calendar and CRM.",
            path: "/automation/ai-receptionist",
          }),
        ]}
      />
    </>
  );
}
