import { pageMetadata } from "@/lib/seo";
import { Cta } from "@/components/Shell";
import ProjectJourney from "@/components/ProjectJourney";
import Link from "next/link";

export const metadata = pageMetadata(
  "How We Work - ORBITAL",
  "We design and build practical digital tools. Learn how we structure projects to understand your work and launch with confidence.",
  "/how-we-work",
);

export default function Page() {
  return (
    <main id="main">
      <section className="about-intro" aria-labelledby="how-we-work-title">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <span className="about-kicker category-label">Our Philosophy</span>
            <h1 id="how-we-work-title">We design around<br/><span>real work.</span></h1>
            <p>
              Software shouldn&apos;t be a black box. We build practical tools, 
              test them with your team, and leave you ready for day one.
            </p>
          </div>
          <div className="about-side">
            <p>
              We look at your current calls, admin, and bottlenecks. We don&apos;t just ask for a feature list; we find out what&apos;s slowing your team down so we can fix it properly.
            </p>
            <Link className="text-link" href="/start-project">Start a project <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="principles-section">
        <div className="wrap">
          <div className="principles-header">
            <h2>The "No Surprises" rule</h2>
            <p>We work in a way that keeps you and your team in the loop at every stage.</p>
          </div>
          <div className="principles-grid">
            <article className="principle-card">
              <div className="principle-icon" aria-hidden="true">1</div>
              <h3>Start with the day-to-day</h3>
              <p>We look at your current calls, admin, and bottlenecks. We don&apos;t just ask for a feature list; we find out what&apos;s slowing your team down.</p>
            </article>
            <article className="principle-card">
              <div className="principle-icon" aria-hidden="true">2</div>
              <h3>Visible progress</h3>
              <p>You see the screens and try the journeys before anything is finalized. No waiting months for a grand reveal.</p>
            </article>
            <article className="principle-card">
              <div className="principle-icon" aria-hidden="true">3</div>
              <h3>Built for the team</h3>
              <p>If your team can&apos;t use it, it doesn&apos;t work. We test the everyday moments with the people who actually use the system.</p>
            </article>
          </div>
        </div>
      </section>

      <ProjectJourney />

      <section className="handoff-section">
        <div className="wrap handoff-inner">
          <div className="handoff-content">
            <span className="category-label">Post-Launch</span>
            <h2>The Handoff Guarantee</h2>
            <p>
              We don&apos;t just flip a switch and disappear. 
              We prepare the handover, walk through the finished system with your team, 
              and leave a simple, readable guide behind.
            </p>
            <ul>
              <li><strong>Team walkthroughs:</strong> Live sessions to ensure everyone is confident.</li>
              <li><strong>Clear documentation:</strong> A simple guide for exactly how to use the system.</li>
              <li><strong>Support structure:</strong> You know who handles the next request and how to get help.</li>
            </ul>
          </div>
          <div className="handoff-visual" aria-hidden="true">
            <div className="handoff-card">
              <div className="handoff-card-top">
                <span>Operations Guide</span>
                <i>Updated today</i>
              </div>
              <strong>Ready for day one.</strong>
              <div className="handoff-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="handoff-badge">✓ Handover complete</div>
            </div>
          </div>
        </div>
      </section>

      <Cta centered />
    </main>
  );
}
