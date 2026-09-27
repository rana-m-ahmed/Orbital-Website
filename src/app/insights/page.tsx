import Link from "next/link";
import { insights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { Cta } from "@/components/Shell";

export const metadata = pageMetadata(
  "Guides to AI Automation, Software & Business Systems",
  "Practical ORBITAL guides for service businesses evaluating AI receptionists, workflow automation, custom software and better digital operations.",
  "/insights",
);

export default function InsightsPage() {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="category-label">Insights / Practical guides</span>
        <h1>Build with a clearer decision.</h1>
        <p>
          Practical guidance for service businesses evaluating automation,
          software and digital systems before they commit to a build.
        </p>
      </section>

      <section className="section" aria-labelledby="insight-library-title">
        <div className="section-heading">
          <h2 id="insight-library-title">Start with the decision you are making.</h2>
          <p>
            These guides focus on scope, workflow fit, operating boundaries and
            implementation choices rather than trend-driven feature lists.
          </p>
        </div>
        <div className="capability-grid">
          {insights.map((insight) => (
            <article key={insight.slug}>
              <span className="category-label">{insight.eyebrow}</span>
              <h3>
                <Link href={"/insights/" + insight.slug}>{insight.title}</Link>
              </h3>
              <p>{insight.description}</p>
              <Link className="text-link" href={"/insights/" + insight.slug}>
                Read the guide <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Cta centered />
    </main>
  );
}
