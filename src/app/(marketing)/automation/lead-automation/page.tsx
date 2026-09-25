import type { Metadata } from "next";
import { SignalFlow } from "@/components/primitives/SignalFlow";
import { ServiceNav } from "@/components/shell/ServiceNav";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { Breadcrumb, PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SecondaryCase } from "@/components/work/WorkCard";
import { workBySlug } from "@/content/work";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Lead Automation Services",
  description:
    "Capture, qualify, respond to and route every enquiry automatically — so leads get a first reply while they are still interested, and reach a named owner with context attached.",
  path: "/automation/lead-automation",
});

const GAP = [
  {
    time: "Minute 0",
    state: "The enquiry arrives",
    detail: "Someone has just decided you are worth contacting. This is the most interested they will ever be.",
  },
  {
    time: "Hour 1",
    state: "They are comparing",
    detail: "Most buyers contact more than one supplier. Whoever replies first sets the terms of the comparison.",
  },
  {
    time: "Day 1",
    state: "The context is gone",
    detail: "By the time someone gets to the inbox, the enquiry has to be reconstructed from two lines of text.",
  },
  {
    time: "Day 3",
    state: "It is a cold lead",
    detail: "The same enquiry now needs a reason to reopen the conversation instead of simply continuing it.",
  },
];

const RULES = [
  {
    rule: "If the enquiry mentions a service you do not offer",
    action: "Reply with a short, honest decline and do not create a pipeline record.",
  },
  {
    rule: "If the budget range is below your minimum",
    action: "Send the self-serve option instead of booking a salesperson's hour.",
  },
  {
    rule: "If the enquiry is from an existing customer",
    action: "Route to their account owner, not to new business.",
  },
  {
    rule: "If the enquiry arrives outside working hours",
    action: "Reply immediately, and schedule the human follow-up for the morning.",
  },
  {
    rule: "If nobody has responded within your own deadline",
    action: "Escalate it to the sales lead rather than letting it age quietly.",
  },
];

const FAQS = [
  {
    q: "Is this just an auto-responder?",
    a: "No. An auto-responder confirms receipt. This qualifies the enquiry against your rules, decides what should happen to it, replies with something relevant, and hands it to the right person with the reasoning visible.",
  },
  {
    q: "Will the replies sound automated?",
    a: "They are written in your voice and reference what the person actually asked. Where there is not enough information to say something useful, it asks a question instead of padding.",
  },
  {
    q: "Do we lose control of the pipeline?",
    a: "The opposite. The rules are written in plain language, you can read and change them, and every decision the system made is recorded against the lead.",
  },
  {
    q: "What about leads that come in by phone?",
    a: "Those are handled by the AI receptionist and land in the same pipeline, so a phone enquiry and a form submission are treated consistently.",
  },
  {
    q: "Can it work with our existing CRM?",
    a: "Yes. The pipeline stays where your team already works. We do not ask you to move CRM to automate follow-up.",
  },
];

export default function LeadAutomationPage() {
  const reference = workBySlug("lead-response-system");

  return (
    <>
      <PageHero
        tone="light"
        layout="stacked"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Automation", href: "/automation" },
              { label: "Lead Automation" },
            ]}
          />
        }
        eyebrow="Lead Automation"
        title="Follow up while the lead is still interested."
        body="Every enquiry captured, qualified, answered and routed to a named owner — in the minutes that matter rather than the next working day."
        primary={{
          label: "Start a project",
          href: "/contact",
          event: "lead-automation-hero",
        }}
        secondary={{ label: "See the lifecycle", href: "#lifecycle" }}
      />

      <ServiceNav
        parent={{ label: "Automation", href: "/automation" }}
        page="Lead Automation"
        items={[
          { label: "The gap", id: "the-gap" },
          { label: "Lifecycle", id: "lifecycle" },
          { label: "Rules", id: "rules" },
          { label: "FAQ", id: "faq" },
        ]}
      />

      <Section id="the-gap" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="The gap"
              title="Nothing goes wrong. It just gets later."
              body="No numbers here, because the honest ones depend on your market. The shape of the problem is the same everywhere."
            />
          </div>

          <Reveal large className="lg:col-span-8">
            <ol className="relative border-l border-[#dde3e9] pl-8">
              {GAP.map((item, index) => (
                <li key={item.time} className={index > 0 ? "mt-10" : ""}>
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[5px] size-2.5 rounded-full ${
                      index === 0 ? "bg-blue" : "bg-[#c3cbd4]"
                    }`}
                  />
                  <p className="mono-label text-text-secondary-light">{item.time}</p>
                  <h3 className="display-4 mt-2">{item.state}</h3>
                  <p className="mt-2 max-w-[520px] text-[0.95rem] leading-relaxed text-text-secondary-light">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* §20 — signature interaction for this page. */}
      <Section id="lifecycle" tone="dark" space="l">
        <SectionHeader
          tone="dark"
          eyebrow="Lead lifecycle"
          title="From enquiry to owned opportunity."
          body="Seven states, each one visible. The lead never sits in a place where nobody is responsible for it."
        />
        <Reveal large className="mt-12">
          <SignalFlow
            label="Website enquiry · 21:40"
            demoName="Lead lifecycle"
            tone="dark"
            hold={720}
            startDelay={500}
            nodes={[
              { label: "Inquiry", detail: "A form, a call or an email arrives." },
              { label: "Capture", detail: "Recorded once, in a single pipeline." },
              { label: "Qualify", detail: "Checked against your rules, not a guess." },
              { label: "Respond", detail: "A relevant first reply goes out now." },
              {
                label: "Route",
                detail: "Assigned to the right owner.",
                handoff: true,
              },
              { label: "CRM", detail: "Written to the system your team works in." },
              { label: "Follow-up", detail: "Sequenced until it is answered or closed." },
            ]}
            footer="Every state is recorded against the lead, so the reason it was treated this way is visible later."
          />
        </Reveal>
      </Section>

      <Section id="rules" tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Rules and personalisation"
              title="Rules you can read out loud."
              body="If a rule cannot be explained to a new salesperson in one sentence, it is too complicated to trust."
            />
          </div>

          <Reveal large className="lg:col-span-7">
            <dl className="divide-y divide-[#e0e5ea] overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white">
              {RULES.map((item) => (
                <div key={item.rule} className="grid gap-2 p-6 sm:grid-cols-2 sm:gap-8">
                  <dt className="text-[0.95rem] font-medium">{item.rule}</dt>
                  <dd className="text-[0.92rem] leading-relaxed text-text-secondary-light">
                    {item.action}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Human sales handoff"
              title="The salesperson starts where the conversation left off."
              body="What gets handed over is not a notification. It is the enquiry, the answers, the reasoning and the replies already sent."
            />
          </div>

          <Reveal className="lg:col-span-6">
            <div className="rounded-2xl border border-[#e0e5ea] bg-white p-7">
              <p className="mono-label text-text-secondary-light">
                Handed to the owner
              </p>
              <ul className="mt-5 space-y-3.5">
                {[
                  "What they asked for, in their own words",
                  "How they answered the qualifying questions",
                  "Which rule routed it here, and why",
                  "Every message already sent on your behalf",
                  "What the system expects to happen next",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem]">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-blue"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Integrations"
              title="Your pipeline stays where it is."
              after={<TextLink href="/integrations">View integrations</TextLink>}
            />
          </div>
          <div className="lg:col-span-7">
            <LogoGrid
              columns={3}
              items={[
                "HubSpot",
                "Salesforce",
                "Pipedrive",
                "Gmail",
                "Outlook",
                "Webforms",
                "Slack",
                "Google Calendar",
                "Custom API",
              ]}
            />
          </div>
        </div>
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
            <SectionHeader eyebrow="FAQ" title="Fair questions." />
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
              detail: "Phone enquiries handled the same way as form enquiries.",
            },
            {
              label: "Integrations",
              href: "/integrations",
              detail: "How leads reach your CRM, inbox and calendar.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us what happens to an enquiry today.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Stop letting good leads cool down."
        body="Tell us how an enquiry reaches your team today, and where it usually stalls."
        eventLabel="lead-automation-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "Lead Automation", path: "/automation/lead-automation" },
          ]),
          serviceSchema({
            name: "Lead automation",
            description:
              "Automated lead capture, qualification, first response, routing and follow-up integrated with a business's CRM.",
            path: "/automation/lead-automation",
          }),
        ]}
      />
    </>
  );
}
