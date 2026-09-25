import type { Metadata } from "next";
import { ProcessRoute } from "@/components/primitives/ProcessRoute";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { ProductShowcase } from "@/components/primitives/ProductShowcase";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ScenarioTabs } from "@/components/ui/ScenarioTabs";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Business Websites & Apps",
  description:
    "Business websites, web applications and mobile apps designed to do a job — win the enquiry, deliver the service, or put the workflow in someone's hand.",
  path: "/websites-apps",
});

const OUTCOMES = [
  {
    id: "win",
    label: "Win business",
    headline: "The site has one job: get the enquiry.",
    body: "Most business websites are judged on how they look and fail on what they do. The measure here is whether the right visitor contacts you.",
    points: [
      "The offer is understandable in the first screen, without scrolling",
      "One primary action, repeated where a decision is actually being made",
      "Proof placed early, because trust decides whether anyone reads on",
      "A contact route with as little friction as the enquiry can bear",
    ],
  },
  {
    id: "deliver",
    label: "Deliver a service",
    headline: "Customers should be able to serve themselves.",
    body: "A portal removes the phone calls that exist only because someone cannot see their own information.",
    points: [
      "Customers see their requests, visits, documents and invoices",
      "Status is visible without anyone having to ask for it",
      "Actions customers can safely take themselves, they take themselves",
      "Everything else routes into the same support workflow as the phone",
    ],
  },
  {
    id: "hand",
    label: "Put the workflow in someone's hand",
    headline: "The work happens away from a desk.",
    body: "Field teams, drivers, technicians and inspectors need the day's work in their pocket, not in an email.",
    points: [
      "Today's jobs, in order, with everything needed to do them",
      "Capture on site: photos, signatures, readings, notes",
      "Works when the signal does not, and syncs when it returns",
      "Feeds the same records the office is already looking at",
    ],
  },
];

const CRAFT = [
  ["Typography", "A type system with a job for every size, not a font choice."],
  ["Responsive states", "Designed at every width you actually get, not just two."],
  ["Components", "One set of parts, so the tenth page costs less than the first."],
  ["Motion", "Used where it explains something, and absent everywhere else."],
  ["Accessibility", "Keyboard, contrast, focus and screen readers as requirements."],
  ["Performance", "Fast on a mid-range phone on a mediocre connection."],
];

const FAQS = [
  {
    q: "Do you work from our brand, or create one?",
    a: "Either. If you have a brand that works, we design within it. If you do not, we build the minimum that is genuinely needed rather than a brand book nobody opens.",
  },
  {
    q: "Can we edit the content ourselves?",
    a: "Yes. Content that needs to change regularly goes into a system your team can edit without a developer.",
  },
  {
    q: "Is a website separate from the automation work?",
    a: "It does not have to be. A site that captures an enquiry and hands it straight into lead automation is one system, and it is usually worth building it that way.",
  },
  {
    q: "Do we need a mobile app?",
    a: "Often not. A well-built web application works on a phone. An app earns its place when it needs the device itself — camera, offline, location, notifications.",
  },
];

const STAGES = [
  { title: "Frame", detail: "Agree what the experience has to achieve, in one sentence." },
  { title: "Structure", detail: "Content, routes and hierarchy before any visual design." },
  { title: "Design", detail: "Real content, real widths, real states." },
  { title: "Build & launch", detail: "Implemented, tested, measured and shipped." },
];

export default function WebsitesAppsPage() {
  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        eyebrow="Websites & Apps"
        title="Digital experiences that do their job."
        body="A website that wins the enquiry. A portal that answers the question. An app that carries the work. Designed to be judged on outcomes, not on impressions."
        primary={{ label: "Start a project", href: "/contact", event: "websites-hero" }}
        secondary={{ label: "See the work", href: "/work" }}
        visual={
          <Reveal large>
            <ProductFrame variant="website" title="A business website built to win the enquiry" />
          </Reveal>
        }
      />

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Outcome first"
          title="What should it achieve?"
          body="Three answers cover almost every project. Choosing one changes everything that follows."
        />
        <Reveal large className="mt-12">
          <ScenarioTabs scenarios={OUTCOMES} ariaLabel="Project outcomes" />
        </Reveal>
      </Section>

      {/* §26 — this page is allowed to break the regular service layout. */}
      <section className="relative bg-offwhite py-[112px] md:py-[152px]">
        <div className="shell">
          <SectionHeader
            eyebrow="Websites"
            title="A site that argues for you while you are busy."
            body="Editorial structure, real content, and a clear path to the one action that matters."
          />
        </div>

        <Reveal large className="shell-wide mt-14">
          <ProductFrame
            variant="website"
            title="Full-width business website composition"
          />
        </Reveal>

        <div className="shell mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["Understandable", "A visitor knows what you do and who you do it for before they scroll."],
            ["Persuasive", "Proof, process and price posture in the order a buyer needs them."],
            ["Measurable", "The enquiry path is instrumented, so improvement is not guesswork."],
          ].map(([title, detail]) => (
            <div key={title}>
              <h3 className="display-4">{title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-text-secondary-light">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Section tone="dark" space="xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              tone="dark"
              eyebrow="Web applications"
              title="Products with real users."
              body="Permissions, states, edge cases and the unglamorous screens that decide whether people keep using it."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal large>
              <ProductShowcase
                demoName="websites-apps"
                ariaLabel="Application surfaces"
                tone="dark"
                items={[
                  {
                    id: "dashboard",
                    label: "Dashboard",
                    caption: "The overview a manager opens first thing.",
                  },
                  {
                    id: "workflow",
                    label: "Workflow",
                    caption: "Each step, its owner, and where a person is required.",
                  },
                  {
                    id: "portal",
                    label: "Portal",
                    caption: "The customer's own view of their account.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal large className="order-2 lg:order-1 lg:col-span-5">
            <ProductFrame variant="mobile" title="A mobile app carrying the day's work" />
          </Reveal>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <SectionHeader
              eyebrow="Mobile apps"
              title="The work, in the hand of the person doing it."
              body="Mobile is not a smaller screen. It is a different situation: one hand, poor signal, bright sun, and someone who wants to finish the job and move on."
            />
            <Reveal className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["Offline first", "The job list works whether or not there is signal."],
                ["Capture on site", "Photos, signatures, readings and notes where the work is."],
                ["One-handed", "Large targets, short paths, nothing buried."],
                ["Synced", "The office sees it without anyone reporting in."],
              ].map(([title, detail]) => (
                <div key={title}>
                  <h3 className="text-[1rem] font-medium">{title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary-light">
                    {detail}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Design craft"
          title="The details that decide whether it feels expensive."
        />
        <Reveal large className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:grid-cols-3">
          {CRAFT.map(([title, detail]) => (
            <div key={title} className="bg-white p-7">
              <h3 className="display-4">{title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-text-secondary-light">
                {detail}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Process"
          title="Structure before surface."
          after={<TextLink href="/work">See selected work</TextLink>}
        />
        <ProcessRoute stages={STAGES} />
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Reasonable questions." />
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
              label: "Work",
              href: "/work",
              detail: "Interfaces, the problems behind them and what changed.",
            },
            {
              label: "Custom software",
              href: "/software",
              detail: "When the product is the system, not the site.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us what the experience has to achieve.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="What should the digital experience achieve?"
        body="Start with the outcome — the enquiry, the self-service, the job in someone's hand — and the rest follows."
        eventLabel="websites-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Websites & Apps", path: "/websites-apps" },
          ]),
          serviceSchema({
            name: "Websites and applications",
            description:
              "Design and development of business websites, customer portals, web applications and mobile apps.",
            path: "/websites-apps",
          }),
        ]}
      />
    </>
  );
}
