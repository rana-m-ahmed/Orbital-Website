import { PrimaryButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

/**
 * §10 / §18 — the final CTA *is* the upper footer, not a duplicate section.
 * Each page supplies its own closing question; the composition is shared.
 * A single blue route enters the CTA and stops — it does not loop.
 */
export function FinalCta({
  headline,
  body,
  ctaLabel = SITE.primaryCta,
  eventLabel,
}: {
  headline: string;
  body: string;
  ctaLabel?: string;
  eventLabel: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-midnight pb-[112px] pt-[152px] text-offwhite">
      <RouteIn />
      <div className="shell relative">
        <Reveal className="max-w-[760px]">
          <h2 className="display-2">{headline}</h2>
          <p className="lede mt-6 max-w-[540px] text-slate">{body}</p>
          <div className="mt-10">
            <PrimaryButton
              href="/contact"
              tone="dark"
              event="service_cta"
              eventLabel={eventLabel}
            >
              {ctaLabel}
            </PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RouteIn() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-full w-[46%] max-w-[620px] opacity-70"
      viewBox="0 0 620 420"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
    >
      <path
        d="M620 92H420c-26 0-44 16-44 40v46c0 26-18 42-44 42H150"
        stroke="var(--color-blue)"
        strokeWidth="1.25"
        strokeDasharray="700"
        strokeDashoffset="700"
        style={{
          animation: "orbital-dash 1100ms var(--ease-orbital) 260ms forwards",
        }}
      />
      <path
        d="M620 300H470c-26 0-42-14-42-38"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.16"
      />
      <circle cx="150" cy="220" r="3.2" fill="var(--color-blue)" />
    </svg>
  );
}
