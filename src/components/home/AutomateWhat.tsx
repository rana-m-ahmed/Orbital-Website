import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";

type Example = {
  title: string;
  statement: string;
  href: string;
  span: string;
  feature?: boolean;
};

const EXAMPLES: Example[] = [
  {
    title: "AI Receptionist",
    statement: "Answer every call. Book appointments. Route customers.",
    href: "/automation/ai-receptionist",
    span: "lg:col-span-7 lg:row-span-2",
    feature: true,
  },
  {
    title: "Lead Follow-up",
    statement: "Respond while the lead is still interested.",
    href: "/automation/lead-automation",
    span: "lg:col-span-5",
  },
  {
    title: "Customer Support",
    statement: "Handle routine questions. Escalate the rest.",
    href: "/automation/customer-support",
    span: "lg:col-span-5",
  },
  {
    title: "Admin Work",
    statement: "Move data, documents and approvals automatically.",
    href: "/automation/operations-automation",
    span: "lg:col-span-6",
  },
  {
    title: "Reporting",
    statement: "Keep your numbers updated without chasing spreadsheets.",
    href: "/automation/operations-automation",
    span: "lg:col-span-6",
  },
];

/**
 * §4 — 02 WHAT CAN ORBITAL AUTOMATE?
 * Editorial 2+3 composition, not five identical cards.
 * Only the hovered or focused item animates — no five simultaneous loops.
 */
export function AutomateWhat() {
  return (
    <Section id="what-can-orbital-automate" tone="light" space="l">
      <SectionHeader
        eyebrow="What we automate"
        title="What could your business stop doing manually?"
        body="Most companies lose more time to routine handling than to the work they actually sell. These are the five places it usually hides."
      />

      <Reveal large className="mt-14 grid gap-3 lg:grid-cols-12">
        {EXAMPLES.map((example) => (
          <Link
            key={example.title}
            href={example.href}
            data-track="automation_example_select"
            data-track-label={example.title}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white p-6 transition-[border-color,transform] duration-200 ease-[var(--ease-orbital)] hover:-translate-y-0.5 hover:border-[#c8d2de] focus-visible:-translate-y-0.5 md:p-7 ${example.span}`}
          >
            <div>
              <h3 className="display-4">{example.title}</h3>
              <p
                className={`mt-3 max-w-[420px] leading-snug text-text-secondary-light ${
                  example.feature ? "text-[1.05rem]" : "text-[0.95rem]"
                }`}
              >
                {example.statement}
              </p>
            </div>

            {example.feature ? <FeatureGraphic /> : <SignalLine />}

            <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-medium text-interactive-on-light">
              See how it works
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5 transition-transform duration-150 ease-[var(--ease-orbital)] group-hover:translate-x-[3px]"
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
        ))}
      </Reveal>
    </Section>
  );
}

/** Only animates while this one card is hovered or focused (§4). */
function SignalLine() {
  return (
    <span
      aria-hidden="true"
      className="relative mt-7 block h-px w-full bg-[#eceff3]"
    >
      <span className="absolute inset-y-0 left-0 w-0 bg-blue transition-[width] duration-[420ms] ease-[var(--ease-orbital)] group-hover:w-1/3 group-focus-visible:w-1/3 motion-reduce:transition-none" />
    </span>
  );
}

function FeatureGraphic() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-8 overflow-hidden rounded-xl border border-[#eceff3] bg-[#fafbfc] px-5 py-5"
    >
      <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.1em] text-text-secondary-light">
        <span>Incoming</span>
        <span>Booked</span>
      </div>

      <svg viewBox="0 0 420 64" className="mt-3 w-full" fill="none">
        <path d="M8 32h404" stroke="#dde3e9" strokeWidth="1.4" />
        <path
          d="M8 32h404"
          stroke="var(--color-blue)"
          strokeWidth="1.6"
          strokeDasharray="404"
          strokeDashoffset="404"
          className="transition-[stroke-dashoffset] duration-[760ms] ease-[var(--ease-orbital)] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0]"
        />
        {[8, 143, 278, 412].map((x) => (
          <g key={x}>
            <circle cx={x} cy="32" r="5" fill="#ffffff" stroke="#c3cbd4" strokeWidth="1.5" />
            <circle
              cx={x}
              cy="32"
              r="2.2"
              className="fill-[#c3cbd4] transition-colors duration-500 group-hover:fill-[var(--color-blue)] group-focus-visible:fill-[var(--color-blue)]"
            />
          </g>
        ))}
      </svg>

      <div className="mt-3 flex justify-between text-[0.74rem] text-text-secondary-light">
        <span>Answer</span>
        <span>Qualify</span>
        <span>Book</span>
        <span>Notify</span>
      </div>
    </div>
  );
}
