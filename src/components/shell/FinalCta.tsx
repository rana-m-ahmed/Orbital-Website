import { PrimaryButton } from "@/components/ui/Button";
export function FinalCta({
  headline,
  body,
  ctaLabel = "Let’s talk",
  eventLabel,
}: {
  headline: string;
  body: string;
  ctaLabel?: string;
  eventLabel: string;
}) {
  return (
    <section className="closing-invitation">
      <div className="shell">
        <span className="section-index">YOUR NEXT CHAPTER</span>
        <div>
          <h2>{headline}</h2>
          <p>{body}</p>
        </div>
        <PrimaryButton
          href="/contact"
          event="service_cta"
          eventLabel={eventLabel}
        >
          {ctaLabel}
        </PrimaryButton>
      </div>
    </section>
  );
}
