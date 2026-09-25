import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { Breadcrumb, PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WorkLabel } from "@/components/work/WorkCard";
import { WORK, workBySlug } from "@/content/work";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return WORK.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) return {};

  return pageMeta({
    title: item.title,
    description: item.summary,
    path: `/work/${item.slug}`,
  });
}

/**
 * §29 — case study template.
 * Project-specific: no forced animated interaction, and no client-only field
 * on a reference system (§45).
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) notFound();

  const next = WORK.find((candidate) => candidate.slug !== item.slug);

  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        breadcrumb={
          <Breadcrumb items={[{ label: "Work", href: "/work" }, { label: item.industry }]} />
        }
        eyebrow={item.industry}
        title={item.title}
        body={item.summary}
      />

      <Section tone="light" space="m">
        <Reveal large>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6">
              <dt className="mono-label text-text-secondary-light">Type</dt>
              <dd className="mt-3">
                <WorkLabel type={item.type} />
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className="mono-label text-text-secondary-light">Business</dt>
              <dd className="mt-3 text-[0.95rem]">{item.industry}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="mono-label text-text-secondary-light">Scope</dt>
              <dd className="mt-3 text-[0.95rem]">{item.scope.join(" · ")}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="mono-label text-text-secondary-light">Service</dt>
              <dd className="mt-3 text-[0.95rem]">
                <TextLink href={item.service.href}>{item.service.label}</TextLink>
              </dd>
            </div>
          </dl>

          {item.type === "reference" ? (
            <p className="mt-6 max-w-[640px] rounded-xl border border-[#dde3e9] bg-white px-5 py-4 text-[0.9rem] leading-relaxed text-text-secondary-light">
              This is a reference system built by ORBITAL to demonstrate how the
              problem is solved. It is not a client deployment, and it carries no
              client logo, testimonial or production metric.
            </p>
          ) : null}
        </Reveal>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Problem" title="What was going wrong." />
          </div>
          <Reveal className="lg:col-span-7">
            <p className="lede text-text-secondary-light">{item.problem}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <Reveal large>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] md:grid-cols-2">
            <div className="bg-white p-7">
              <p className="mono-label text-text-secondary-light">Before</p>
              <p className="mt-3 text-[1.02rem] leading-snug">{item.before}</p>
            </div>
            <div className="bg-white p-7">
              <p className="mono-label text-interactive-on-light">After</p>
              <p className="mt-3 text-[1.02rem] font-medium leading-snug">
                {item.after}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="dark" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              eyebrow="The system"
              title="What ORBITAL built."
            />
            <Reveal className="mt-8">
              <ul className="space-y-4">
                {item.built.map((line) => (
                  <li key={line} className="flex gap-3 text-[0.98rem] leading-relaxed text-offwhite/88">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal large>
              <ProductFrame variant={item.frame} title={item.title} />
              <p className="mt-4 text-[0.85rem] text-slate">
                Interface shown with demonstration data.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Delivery" title="What it connects to." />
            <Reveal className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {item.integrations.map((integration) => (
                  <li
                    key={integration}
                    className="rounded-lg border border-[#dde3e9] bg-white px-3 py-2 text-[0.86rem]"
                  >
                    {integration}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Outcome" title="What changed." />
            <Reveal className="mt-6">
              <p className="lede text-text-secondary-light">{item.outcome}</p>
              {!item.metricsVerified ? (
                <p className="mt-5 text-[0.86rem] text-text-secondary-light">
                  No performance figures are quoted here, because none have been
                  independently verified for this system.
                </p>
              ) : null}
            </Reveal>
          </div>
        </div>
      </Section>

      {item.testimonialApproved && item.testimonial ? (
        <Section tone="light" space="m">
          <Reveal large>
            <blockquote className="max-w-[760px]">
              <p className="display-3">“{item.testimonial.quote}”</p>
              <footer className="mt-6 text-[0.92rem] text-text-secondary-light">
                {item.testimonial.attribution}
              </footer>
            </blockquote>
          </Reveal>
        </Section>
      ) : null}

      {next ? (
        <Section tone="light" space="m">
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              data-track="work_case_open"
              data-track-label={next.slug}
              className="group flex flex-col gap-4 rounded-2xl border border-[#e0e5ea] bg-white p-8 transition-colors hover:border-[#c8d2de] md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="mono-label text-text-secondary-light">Next project</p>
                <p className="display-4 mt-2">{next.title}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-interactive-on-light">
                See the project
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
          </Reveal>
        </Section>
      ) : null}

      <FinalCta
        headline="Have a problem of this shape?"
        body={`If your business recognises itself in this, ${item.service.label.toLowerCase()} is usually where the conversation starts.`}
        eventLabel={`case-${item.slug}`}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: item.title, path: `/work/${item.slug}` },
        ])}
      />
    </>
  );
}
