import { PrimaryButton, TextLink } from "@/components/ui/Button";
import { OrbitalExperience } from "./OrbitalExperience";

export function Hero() {
  return (
    <section className="architecture-hero on-dark">
      <div className="shell architecture-hero-grid">
        <div className="architecture-hero-copy">
          <p className="section-kicker">
            <span /> Automation for service businesses
          </p>
          <h1>
            Your business.
            <br />
            <em>Moving forward.</em>
          </h1>
          <p className="architecture-hero-lede">
            Answer more enquiries, follow up consistently, and take repetitive
            work off your team—with automation built around your business.
          </p>
          <div className="architecture-actions">
            <PrimaryButton href="/contact" event="hero_cta">
              Tell us your challenge
            </PrimaryButton>
            <TextLink href="#possibilities" event="hero_secondary">
              Explore the possibilities
            </TextLink>
          </div>
        </div>
        <div className="architecture-hero-art">
          <OrbitalExperience />
        </div>
      </div>
      <div
        className="shell architecture-capability-line"
        aria-label="Core capabilities"
      >
        <span>
          <b>01</b> Calls answered
        </span>
        <span>
          <b>02</b> Leads followed up
        </span>
        <span>
          <b>03</b> Operations connected
        </span>
      </div>
    </section>
  );
}
