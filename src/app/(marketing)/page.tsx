import type { Metadata } from "next";
import { AutomateConnectBuild } from "@/components/home/AutomateConnectBuild";
import { AutomateWhat } from "@/components/home/AutomateWhat";
import { Hero } from "@/components/home/Hero";
import { LessBusywork } from "@/components/home/LessBusywork";
import { AutomationDemos } from "@/components/home/SeeAutomationAtWork";
import { ProcessRoute } from "@/components/primitives/ProcessRoute";
import { ProductShowcase } from "@/components/primitives/ProductShowcase";
import { FinalCta } from "@/components/shell/FinalCta";
import { FeatureCase, SecondaryCase } from "@/components/work/WorkCard";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { INTEGRATION_HIGHLIGHTS } from "@/content/integrations";
import { WORK, hasClientWork } from "@/content/work";
import { PROCESS_STAGES } from "@/content/process";

export const metadata: Metadata = {
  title: "ORBITAL — Business Automation, Software & Systems",
  description:
    "ORBITAL is an automation-first technology company. AI receptionists, lead follow-up, business workflows and custom software — built around the way your company works.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ORBITAL — Business Automation, Software & Systems",
    description:
      "Automate first. Connect what exists. Build what is missing. Automation, software and systems for real businesses.",
    url: "/",
  },
};

const FAQS = [
  {
    q: "What does ORBITAL actually do?",
    a: "We remove repetitive work from a business. That usually starts with automating something specific — calls, follow-up, scheduling, admin — then connecting the tools you already use, and building custom software only where nothing existing does the job.",
  },
  {
    q: "Do I need to know what should be automated?",
    a: "No. Most conversations start with a description of what is slowing the team down. Mapping that to the right mix of automation, integration or software is our job, not yours.",
  },
  {
    q: "Will this replace people on my team?",
    a: "The goal is to remove the routine handling, not the judgement. Automation answers, qualifies, files and routes; anything involving money, exceptions or an unhappy customer is handed to a person with the context attached.",
  },
  {
    q: "Do you replace the software we already pay for?",
    a: "Rarely. If your CRM, calendar and accounting tools work, we connect them. We build custom software when the workflow genuinely does not fit anything on the market.",
  },
  {
    q: "How long does a first project take?",
    a: "It depends on the scope, and we would rather scope honestly than quote a number here. A single well-defined automation is a short project; a custom operations system is not.",
  },
  {
    q: "What happens after launch?",
    a: "Important systems ship with logs, alerts and documentation, so you can see what ran and what failed. We stay involved to monitor and improve rather than handing over a black box.",
  },
];

const WHY = [
  {
    title: "We start with the business problem.",
    detail:
      "Not with a tool, a platform or a technology we happen to like. If the answer is a simpler process, we say so.",
  },
  {
    title: "We keep the tools that already work.",
    detail:
      "Your CRM, calendar and accounting stack stay where they are. Automation fits around them.",
  },
  {
    title: "Automation and software live under one roof.",
    detail:
      "The same team that automates the workflow can build the interface it needs. No hand-off between vendors.",
  },
  {
    title: "Delivery includes testing, visibility and documentation.",
    detail:
      "You get a system you can see into, not a set of hidden rules only we understand.",
  },
];

export default function HomePage() {
  const [feature, ...rest] = WORK;

  return (
    <>
      {/* CHAPTER I — Midnight */}
      <Hero />

      {/* CHAPTER II — Off White */}
      <AutomateWhat />

      <Section id="see-automation-at-work" tone="light" space="m">
        <SectionHeader
          eyebrow="Demonstration"
          title="See automation at work."
          body="Pick a workflow. Each one plays once, in plain English, and stops where the work is finished."
        />
        <Reveal large className="mt-12">
          <AutomationDemos />
        </Reveal>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow={hasClientWork ? "Selected work" : "Reference systems"}
          title={
            hasClientWork
              ? "Built for real business problems."
              : "See what ORBITAL can build."
          }
          body={
            hasClientWork
              ? "Three projects, the problem behind each one, and what changed operationally."
              : "These are reference systems built by ORBITAL to demonstrate how each problem is solved. They are not client deployments, and nothing here is presented as one."
          }
          after={<TextLink href="/work">See all work</TextLink>}
        />

        <Reveal large className="mt-14">
          <FeatureCase item={feature} />
        </Reveal>

        <Reveal className="mt-3 grid gap-3 md:grid-cols-2">
          {rest.map((item) => (
            <SecondaryCase key={item.slug} item={item} />
          ))}
        </Reveal>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="How the company fits together"
          title="Automation first. Technology when you need more."
          body="Automate what repeats. Connect what already exists. Build what is genuinely missing — in that order."
        />
        <AutomateConnectBuild />
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Before and after"
          title="Less busywork. More business."
          body="Choose the shape of your business and see what changes."
        />
        <Reveal large className="mt-12">
          <LessBusywork />
        </Reveal>
      </Section>

      {/* CHAPTER III — Midnight */}
      <Section tone="dark" space="xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              eyebrow="Software, websites & apps"
              title="When automation is not enough, we build what is missing."
              body="Internal tools, dashboards, customer portals, web applications, business websites and mobile apps — designed around how your company actually works."
              after={
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton
                    href="/software"
                    tone="dark"
                    event="service_cta"
                    eventLabel="home-software"
                  >
                    Explore custom software
                  </PrimaryButton>
                  <SecondaryButton href="/websites-apps" tone="dark">
                    Websites & apps
                  </SecondaryButton>
                </div>
              }
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal large>
              <ProductShowcase
                demoName="home-software"
                ariaLabel="Software surfaces"
                tone="dark"
                items={[
                  {
                    id: "dashboard",
                    label: "Dashboard",
                    caption:
                      "An operations dashboard that answers the questions your team asks every morning.",
                  },
                  {
                    id: "portal",
                    label: "Portal",
                    caption:
                      "A customer portal where requests, visits, documents and invoices live in one place.",
                  },
                  {
                    id: "website",
                    label: "Website",
                    caption:
                      "A business website built to win the enquiry, not to win a design award.",
                  },
                  {
                    id: "mobile",
                    label: "App",
                    caption:
                      "A mobile app that puts the day's work in the hand of the person doing it.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CHAPTER IV — Off White */}
      <Section tone="light" space="l">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Integrations"
              title="Works with the tools you already use."
              body="CRM, email, calendars, payments, databases, automation platforms and custom APIs. Where there is no native connector, we build one."
              after={<TextLink href="/integrations">View integrations</TextLink>}
            />
            <div className="mt-10">
              <LogoGrid items={INTEGRATION_HIGHLIGHTS} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-3">One team from problem to production.</h2>
              <ul className="mt-9 space-y-8">
                {WHY.map((item) => (
                  <li key={item.title} className="border-l-2 border-blue/45 pl-5">
                    <h3 className="text-[1.02rem] font-medium">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-text-secondary-light">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="How we work"
          title="From problem to working system."
          body="Four stages, and what stays true in each of them."
        />
        <ProcessRoute stages={PROCESS_STAGES} />
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Questions worth asking." />
          </div>
          <div className="lg:col-span-8">
            <Faq items={FAQS} />
          </div>
        </div>
      </Section>

      {/* CHAPTER V — Midnight: final CTA merges into the footer (§18) */}
      <FinalCta
        headline="What should your business stop doing manually?"
        body="Tell us what is slowing your team down. We'll help you identify what should be automated, connected or built."
        eventLabel="home-final"
      />
    </>
  );
}
