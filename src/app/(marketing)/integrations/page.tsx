import type { Metadata } from "next";
import { RecipeComposer } from "@/components/primitives/RecipeComposer";
import { FinalCta } from "@/components/shell/FinalCta";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { INTEGRATION_CATEGORIES, RECIPES } from "@/content/integrations";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Business Systems & App Integrations",
  description:
    "Connect your CRM, email, calendar, payments, databases and custom APIs so information stops being re-typed — with retries, duplicate prevention and alerts built in.",
  path: "/integrations",
});

const NO_CONNECTOR = [
  {
    title: "The API",
    detail:
      "Most business software has one. If it does, we build directly against it rather than through a middleman.",
  },
  {
    title: "Webhooks",
    detail:
      "Where the system can tell us something happened, we listen instead of polling.",
  },
  {
    title: "A custom adapter",
    detail:
      "Where there is no API, there is sometimes a file drop, an export or a database. Those can be worked with.",
  },
  {
    title: "The honest limit",
    detail:
      "Some systems genuinely cannot be integrated safely. We say so rather than building something fragile that breaks quietly.",
  },
];

const RELIABILITY = [
  ["Retries", "A failed call is retried with backoff rather than dropped."],
  ["Duplicate prevention", "The same event arriving twice does not create two records."],
  ["Alerts", "When something stays broken, a person is told."],
  ["Permissions", "Least-privilege credentials, scoped to what the integration needs."],
];

const FAQS = [
  {
    q: "Do you use Zapier and Make, or build directly?",
    a: "Both, depending on the job. A platform is right for simple, low-volume connections. Where reliability, volume or cost matter, building directly against the API is usually cheaper within a year.",
  },
  {
    q: "What happens when one system is down?",
    a: "The work queues and retries rather than disappearing. If it stays broken, you get an alert — silence is the failure mode we design against.",
  },
  {
    q: "Is our data safe?",
    a: "Integrations use least-privilege credentials scoped to exactly what they need, held server-side. We do not store more data than the workflow requires.",
  },
  {
    q: "What if we change CRM later?",
    a: "The workflow logic is kept separate from the connector wherever possible, so changing the system underneath is a replacement rather than a rebuild.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        tone="light"
        layout="stacked"
        eyebrow="Integrations"
        title="Make your tools work together."
        body="Most businesses do not need more software. They need the software they already pay for to stop being separate islands."
        primary={{ label: "Connect my stack", href: "/contact", event: "integrations-hero" }}
        secondary={{ label: "Build a recipe", href: "#recipe-composer" }}
      />

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Common recipes"
          title="What connecting things actually means."
          body="Four examples, in plain language, of what happens when two systems start talking."
        />

        <Reveal large className="mt-14 grid gap-3 md:grid-cols-2">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-2xl border border-[#e0e5ea] bg-white p-7"
            >
              <p className="mono-label text-text-secondary-light">When</p>
              <p className="mt-2 text-[1.02rem] font-medium">{recipe.when}</p>

              <ol className="mt-6 space-y-3 border-t border-[#eceff3] pt-5">
                {recipe.then.map((step, index) => (
                  <li key={step} className="flex gap-3 text-[0.93rem]">
                    <span className="mono-label mt-0.5 w-5 shrink-0 text-text-secondary-light">
                      0{index + 1}
                    </span>
                    <span className="text-text-secondary-light">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* §27 — signature interaction: the recipe composer. */}
      <Section id="recipe-composer" tone="light" space="l">
        <SectionHeader
          eyebrow="Recipe composer"
          title="Build one and see what it does."
          body="Choose a trigger and three actions. The route underneath is what we would actually build."
        />
        <Reveal large className="mt-12">
          <RecipeComposer />
        </Reveal>
      </Section>

      <Section tone="dark" space="l">
        <SectionHeader
          tone="dark"
          eyebrow="Categories"
          title="What ORBITAL connects."
          body="Official logos are used only where we have licensed assets, so these are listed by name."
        />

        <Reveal large className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {INTEGRATION_CATEGORIES.map((category) => (
            <div key={category.title}>
              <h3 className="display-4">{category.title}</h3>
              <ul className="mt-4 space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool} className="text-[0.93rem] text-slate">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div className="mt-14">
          <LogoGrid
            tone="dark"
            items={[
              "HubSpot",
              "Salesforce",
              "Google Workspace",
              "Microsoft 365",
              "Stripe",
              "Xero",
              "Slack",
              "Twilio",
            ]}
          />
        </div>
      </Section>

      <Section tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="No native connector"
              title="When there is no connector, there is usually still a way."
              body="And occasionally there is not — which is worth knowing before a project starts rather than halfway through it."
            />
          </div>

          <Reveal large className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:col-span-7">
            {NO_CONNECTOR.map((item) => (
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
              eyebrow="Reliability"
              title="Integrations fail quietly. These do not."
            />
          </div>
          <Reveal className="lg:col-span-8">
            <dl className="divide-y divide-[#e0e5ea] border-y border-[#e0e5ea]">
              {RELIABILITY.map(([title, detail]) => (
                <div key={title} className="grid gap-2 py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
                  <dt className="display-4">{title}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-text-secondary-light">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="How this works in practice." />
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
              label: "Automation",
              href: "/automation",
              detail: "What the connected tools are actually used for.",
            },
            {
              label: "Custom software",
              href: "/software",
              detail: "When connecting is not enough on its own.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Tell us which systems refuse to talk.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Which two systems should already be talking?"
        body="Tell us what gets re-typed between tools every week. That is usually the first connection worth making."
        ctaLabel="Connect my stack"
        eventLabel="integrations-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Integrations", path: "/integrations" },
          ]),
          serviceSchema({
            name: "Systems and app integration",
            description:
              "Integration of CRM, email, calendar, payment, database and custom API systems, with retries, duplicate prevention and alerting.",
            path: "/integrations",
          }),
        ]}
      />
    </>
  );
}
