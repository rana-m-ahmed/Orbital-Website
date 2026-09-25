import type { Metadata } from "next";
import { ProcessRoute } from "@/components/primitives/ProcessRoute";
import { ProductShowcase } from "@/components/primitives/ProductShowcase";
import { ScatterToProduct } from "@/components/primitives/ScatterToProduct";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { CrossLinks } from "@/components/ui/CrossLinks";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SecondaryCase } from "@/components/work/WorkCard";
import { BUILD_STAGES } from "@/content/process";
import { WORK } from "@/content/work";
import { JsonLd, breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Custom Business Software",
  description:
    "Internal tools, dashboards, customer portals, web applications and APIs — built only where automation and existing tools genuinely cannot do the job.",
  path: "/software",
});

const DECISION = [
  {
    step: "Automate?",
    question: "Can the work simply stop being done by hand?",
    verdict: "If yes, we automate it and you buy nothing.",
  },
  {
    step: "Integrate?",
    question: "Do the tools you already pay for cover it between them?",
    verdict: "If yes, we connect them and you buy nothing new.",
  },
  {
    step: "Build.",
    question: "Is there genuinely nothing that fits the way you work?",
    verdict: "Then building is the cheaper answer, and we say so plainly.",
  },
];

const WE_BUILD = [
  ["Internal tools", "The screen your team lives in all day, designed around their actual job."],
  ["Dashboards", "The numbers that decide something, updated without anyone rebuilding them."],
  ["Customer portals", "Where your customers see their own requests, documents and invoices."],
  ["Web applications", "Products with real users, real permissions and real data."],
  ["APIs & backends", "The quiet layer that lets everything else talk to everything else."],
  ["Software suites", "Several of the above, designed as one system rather than four projects."],
];

const RELIABILITY = [
  ["Permissions", "Who can see and change what, defined before launch rather than after an incident."],
  ["Errors", "Failures are caught, logged and surfaced — not swallowed silently."],
  ["Visibility", "You can see what ran, what failed and what is queued without asking us."],
  ["Documentation", "How it works, written down, so you are never locked into one supplier."],
];

const FAQS = [
  {
    q: "Why would we build rather than buy?",
    a: "Usually you should not. Building is right when the process is genuinely specific to your business and forcing it into an off-the-shelf product costs more in workarounds than it saves in licence fees.",
  },
  {
    q: "Who owns the code?",
    a: "You do, along with the documentation. A system you cannot hand to another developer is not an asset.",
  },
  {
    q: "Can it integrate with the software we keep?",
    a: "That is usually the point. Custom software fills the gap between the tools you keep, rather than replacing all of them.",
  },
  {
    q: "What technology do you use?",
    a: "Boring, well-supported technology chosen for the job and for whoever maintains it later. We are happy to discuss specifics, but the stack is an implementation detail, not a selling point.",
  },
  {
    q: "What happens after launch?",
    a: "Monitoring, support and iteration. Software that nobody looks after degrades, and we would rather stay involved than hand over something that quietly rots.",
  },
];

export default function SoftwarePage() {
  const cases = WORK.filter((item) => item.frame !== "workflow").slice(0, 2);

  return (
    <>
      <PageHero
        tone="dark"
        layout="stacked"
        eyebrow="Custom software"
        title="Software built around your business."
        body="Not a platform you bend your process to fit. A system designed around the way your company actually works — built only when that is genuinely the right answer."
        primary={{ label: "Start a project", href: "/contact", event: "software-hero" }}
        secondary={{ label: "See the transformation", href: "#transformation" }}
      />

      <Section tone="light" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Build vs buy"
              title="We do not build custom software when a simpler solution will work."
              body="Most agencies are paid to build. That is a bad incentive, so we make the decision path explicit and go through it with you before anyone writes code."
            />
          </div>

          <Reveal large className="lg:col-span-7">
            <ol className="divide-y divide-[#e0e5ea] overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white">
              {DECISION.map((item, index) => (
                <li key={item.step} className="grid gap-3 p-7 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8">
                  <div>
                    <p className="mono-label text-text-secondary-light">
                      0{index + 1}
                    </p>
                    <p className="mt-2 display-4">{item.step}</p>
                  </div>
                  <div>
                    <p className="text-[0.98rem] font-medium">{item.question}</p>
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-text-secondary-light">
                      {item.verdict}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* §25 — the major visual moment. */}
      <Section id="transformation" tone="dark" space="xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              tone="dark"
              eyebrow="From scattered work to one product"
              title="Five places become one."
              body="Most operations problems are not missing software. They are the same job spread across a spreadsheet, an inbox, a CRM, a notes app and a dashboard nobody trusts."
            />
          </div>
          <div className="lg:col-span-8">
            <ScatterToProduct />
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="What we build"
          title="Six kinds of system."
          body="Most projects are one of these. Some are two of them, designed together."
        />

        <Reveal large className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] sm:grid-cols-2 lg:grid-cols-3">
          {WE_BUILD.map(([title, detail]) => (
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Interface"
              title="The surface is the product."
              body="A powerful system with an interface nobody wants to open is a failed project."
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal large>
              <ProductShowcase
                demoName="software"
                ariaLabel="Software interfaces"
                tone="light"
                items={[
                  {
                    id: "dashboard",
                    label: "Dashboard",
                    caption:
                      "The numbers that decide something, in the order the team asks for them.",
                  },
                  {
                    id: "workflow",
                    label: "Workflow",
                    caption:
                      "Every step of a process, who handles it, and where a person is required.",
                  },
                  {
                    id: "portal",
                    label: "Portal",
                    caption:
                      "What your customer sees: their requests, visits, documents and invoices.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="How we build"
          title="Six stages, in this order."
          body="A prototype in front of real users beats a specification everyone agreed to and nobody read."
        />
        <ProcessRoute stages={BUILD_STAGES} />
      </Section>

      <Section tone="dark" space="l">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              eyebrow="Reliability"
              title="The part nobody demos."
              body="Software becomes load-bearing faster than anyone expects. These four things decide whether that is comfortable or frightening."
            />
          </div>

          <Reveal className="lg:col-span-7">
            <dl className="divide-y divide-midnight-line border-y border-midnight-line">
              {RELIABILITY.map(([title, detail]) => (
                <div key={title} className="grid gap-2 py-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
                  <dt className="display-4">{title}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-slate">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" space="l">
        <SectionHeader
          eyebrow="Work"
          title="Systems of this shape."
          body="Reference systems built by ORBITAL. Neither is a client deployment."
          after={<TextLink href="/work">See all work</TextLink>}
        />
        <Reveal large className="mt-12 grid gap-3 md:grid-cols-2">
          {cases.map((item) => (
            <SecondaryCase key={item.slug} item={item} />
          ))}
        </Reveal>
      </Section>

      <Section tone="light" space="m">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Before you commission anything." />
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
              detail: "The systems, the problems behind them and what changed.",
            },
            {
              label: "Integrations",
              href: "/integrations",
              detail: "How custom software joins the tools you keep.",
            },
            {
              label: "Start a project",
              href: "/contact",
              detail: "Describe the process that does not fit anything.",
            },
          ]}
        />
      </Section>

      <FinalCta
        headline="If your workflow does not fit the software, stop forcing it."
        body="Tell us what your team works around every day. We'll tell you whether it needs building."
        eventLabel="software-final"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Software", path: "/software" },
          ]),
          serviceSchema({
            name: "Custom business software",
            description:
              "Design and development of internal tools, dashboards, customer portals, web applications and APIs for business operations.",
            path: "/software",
          }),
        ]}
      />
    </>
  );
}
