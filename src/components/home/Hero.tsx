import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { OrbitalExperience } from "./OrbitalExperience";
export function Hero() {
  return (
    <section className="signature-hero on-dark">
      <div className="hero-coordinate" aria-hidden="true">
        O / 01 — SYSTEMS IN MOTION
      </div>
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span /> Automation · Software · Systems
          </p>
          <h1>
            Less busywork.
            <br />
            <span>More room</span>
            <br />
            to grow<span className="blue-dot">.</span>
          </h1>
          <p className="hero-description">
            We automate repetitive tasks, connect your business tools, and build
            software around the way you work.
          </p>
          <div className="hero-actions">
            <PrimaryButton href="/contact" tone="dark" event="hero_cta">
              Let’s talk
            </PrimaryButton>
            <SecondaryButton
              href="#in-action"
              tone="dark"
              event="hero_secondary"
            >
              See how it works
            </SecondaryButton>
          </div>
        </div>
        <OrbitalExperience />
      </div>
      <div className="shell hero-bottom">
        <span>Built for the way you do business.</span>
        <a href="#services">
          Explore what’s possible <span aria-hidden="true">↓</span>
        </a>
        <span className="hero-bottom-right">Less friction. More forward.</span>
      </div>
    </section>
  );
}
