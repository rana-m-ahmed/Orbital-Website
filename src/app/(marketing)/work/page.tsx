import type { Metadata } from "next";
import { FinalCta } from "@/components/shell/FinalCta";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCase, SecondaryCase } from "@/components/work/WorkCard";
import { WORK, hasClientWork } from "@/content/work";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ORBITAL Work — Automation & Software Projects",
  description:
    "Automation and software projects built around real business problems, with the problem, the system and the operational change set out in full.",
  path: "/work",
});

export default function WorkPage() {
  const clientWork = WORK.filter((item) => item.type === "client");
  const referenceWork = WORK.filter((item) => item.type === "reference");
  const [featured, ...restReference] = referenceWork;

  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        eyebrow="Work"
        title="Work built around real business problems."
        body="Each project starts with something a business was losing time or money to. The system is the answer to that, not a showcase."
        primary={{ label: "Start a similar project", href: "/contact", event: "work-hero" }}
      />

      {/* §28 / §45 — client work and reference systems are kept separate. */}
      {hasClientWork ? (
        <Section tone="light" space="l">
          <SectionHeader
            eyebrow="Client work"
            title="Built and deployed."
            body="Projects delivered for clients. Metrics and quotes appear only where they have been verified and approved."
          />
          <Reveal large className="mt-14 grid gap-3 md:grid-cols-2">
            {clientWork.map((item) => (
              <SecondaryCase key={item.slug} item={item} />
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Reference systems"
          title="See what ORBITAL can build."
          body="These are reference systems built by ORBITAL to demonstrate how a problem is solved end to end. They are not client deployments, they carry no client logos, testimonials or production metrics, and nothing here is presented as one."
        />

        {featured ? (
          <Reveal large className="mt-14">
            <FeatureCase item={featured} />
          </Reveal>
        ) : null}

        <Reveal className="mt-3 grid gap-3 md:grid-cols-2">
          {restReference.map((item) => (
            <SecondaryCase key={item.slug} item={item} />
          ))}
        </Reveal>
      </Section>

      <Section tone="light" space="s">
        <CrossLinks
          title="Start from the problem instead"
          links={[
            {
              label: "Automation",
              href: "/automation",
              detail: "Calls, leads, support and admin.",
            },
            {
              label: "Custom software",
              href: "/software",
              detail: "When the process does not fit a tool.",
            },
            {
              label: "Websites & apps",
              href: "/websites-apps",
              detail: "Sites, portals and mobile products.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Have a similar problem?"
        body="Describe what your business is losing time to. We'll tell you which of these shapes it most resembles."
        eventLabel="work-final"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
    </>
  );
}
