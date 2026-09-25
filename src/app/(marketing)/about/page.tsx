import type { Metadata } from "next";
import { FinalCta } from "@/components/shell/FinalCta";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About ORBITAL",
  description:
    "ORBITAL is an automation-first technology company. We remove repetitive work, connect the tools businesses already use, and build software only where nothing existing fits.",
  path: "/about",
});

/**
 * §30 — About. Motion is minimal here by design.
 *
 * TEAM: add real people with real photography only. Placeholder faces, stock
 * portraits and invented names are not acceptable on this page (§51 — no fake
 * proof), so the section renders only once this array is populated.
 */
const TEAM: { name: string; role: string; photo: string }[] = [];

const PRINCIPLES = [
  {
    title: "Make it understandable.",
    detail:
      "If the person paying for a system cannot explain what it does, we have built the wrong thing or explained it badly.",
  },
  {
    title: "Build the simplest thing that solves the problem.",
    detail:
      "The impressive version and the correct version are rarely the same, and only one of them is still working in two years.",
  },
  {
    title: "Keep people in control.",
    detail:
      "Automation handles the handling. Judgement, money and exceptions stay with people, deliberately and visibly.",
  },
  {
    title: "Finish the job.",
    detail:
      "Delivered means tested, documented, monitored and handed over — not demoed.",
  },
];

const HOW = [
  ["Direct communication", "You talk to the people building it, not through an account layer."],
  ["Clear scope", "What is included, what is not, and what would change the price."],
  ["Visible progress", "You see working software early and often, not a status percentage."],
  ["Documentation", "Written down well enough that another developer could take over."],
  ["Support", "Someone is responsible for it after launch, and you know who."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="light"
        layout="stacked"
        eyebrow="About"
        title="Technology should make the business simpler."
        body="Most companies do not have a technology problem. They have a handling problem that technology has quietly made worse by adding one more system to check."
      />

      <Section tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Why ORBITAL exists" title="The pattern we kept seeing." />
          </div>

          <Reveal className="space-y-6 lg:col-span-8">
            <p className="lede text-text-secondary-light">
              A business grows. Each new need gets a new tool, and each tool is
              reasonable on its own. Nobody ever decides to run the company across
              nine systems and a spreadsheet — it simply happens, one sensible
              decision at a time.
            </p>
            <p className="lede text-text-secondary-light">
              What that costs is rarely visible on an invoice. It shows up as
              calls nobody answered, enquiries answered a day late, a morning
              spent rebuilding the same report, and a team that spends more time
              moving information than using it.
            </p>
            <p className="lede text-text-primary-light">
              ORBITAL exists to take that handling away — starting with
              automation, because it is usually the fastest thing to fix and the
              easiest thing to prove.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" space="l">
        <SectionHeader
          tone="dark"
          eyebrow="Philosophy"
          title="Remove. Connect. Build — in that order."
          body="The order matters more than any individual technique, because it is what keeps a project honest."
        />

        <Reveal large className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-midnight-line bg-midnight-line md:grid-cols-3">
          {[
            [
              "Remove",
              "Before automating a task, ask whether it should exist. The cheapest system is the one nobody needed.",
            ],
            [
              "Connect",
              "Then make what you already own work together. Most businesses have bought the capability twice already.",
            ],
            [
              "Build",
              "Only then build — and only what is genuinely missing, sized to the problem.",
            ],
          ].map(([title, detail]) => (
            <div key={title} className="bg-midnight p-8">
              <h3 className="display-3">{title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">
                {detail}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Principles" title="Four commitments." />
          </div>

          <Reveal className="lg:col-span-8">
            <dl className="divide-y divide-[#e0e5ea] border-y border-[#e0e5ea]">
              {PRINCIPLES.map((principle) => (
                <div key={principle.title} className="py-7">
                  <dt className="display-4">{principle.title}</dt>
                  <dd className="mt-3 max-w-[640px] text-[0.98rem] leading-relaxed text-text-secondary-light">
                    {principle.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {TEAM.length > 0 ? (
        <Section tone="light" space="l">
          <SectionHeader eyebrow="Team" title="The people who build it." />
          <Reveal large className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person) => (
              <figure key={person.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt=""
                  width={480}
                  height={600}
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-4">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-[0.9rem] text-text-secondary-light">
                    {person.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </Section>
      ) : null}

      <Section tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="How we work"
              title="What you should expect from us."
            />
          </div>

          <Reveal large className="lg:col-span-7">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2">
              {HOW.map(([title, detail]) => (
                <div key={title} className="bg-white p-6">
                  <dt className="text-[1rem] font-medium">{title}</dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary-light">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Where we work" title="Remote, and honest about it." />
          </div>
          <Reveal className="space-y-5 lg:col-span-8">
            <p className="lede text-text-secondary-light">
              ORBITAL works remotely with businesses wherever the time zones
              overlap enough to have a real conversation. Discovery, design
              reviews and handovers happen on calls; the work happens in the
              open, in a shared place you can look at whenever you want.
            </p>
            <p className="lede text-text-secondary-light">
              On-site time is possible where a project genuinely needs it — a
              process that has to be watched rather than described. We would
              rather say that plainly than imply an office presence that is not
              there.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="s">
        <CrossLinks
          links={[
            {
              label: "Automation",
              href: "/automation",
              detail: "Where most engagements begin.",
            },
            {
              label: "Work",
              href: "/work",
              detail: "Systems, and the problems behind them.",
            },
            {
              label: "Contact",
              href: "/contact",
              detail: "Tell us what should work better.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="Have a problem worth simplifying?"
        body="You do not need to know the technical answer. Describing what is slowing you down is enough to start."
        eventLabel="about-final"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
