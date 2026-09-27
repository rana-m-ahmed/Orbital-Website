import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/lib/insights";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { Cta } from "@/components/Shell";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) {
    return pageMetadata("Guide Not Found", "Guide not found.", "/insights/" + slug);
  }
  return pageMetadata(insight.seoTitle, insight.description, "/insights/" + slug);
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const url = absoluteUrl("/insights/" + insight.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": url + "#article",
        headline: insight.title,
        description: insight.description,
        image: [absoluteUrl("/opengraph-image")],
        datePublished: insight.publishedAt,
        dateModified: insight.publishedAt,
        mainEntityOfPage: url,
        author: { "@id": absoluteUrl("/") + "#organization" },
        publisher: { "@id": absoluteUrl("/") + "#organization" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": url + "#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: absoluteUrl("/insights"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: insight.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <main id="main">
        <article>
          <header className="page-intro">
            <Link href="/insights" className="category-label">
              Insights / {insight.eyebrow}
            </Link>
            <h1>{insight.title}</h1>
            <p>{insight.intro}</p>
            <p className="service-note">
              Published {insight.publishedAt}. Practical guidance from ORBITAL.
            </p>
          </header>

          {insight.sections.map((section, index) => (
            <section
              className="section"
              key={section.heading}
              aria-labelledby={"insight-section-" + index}
            >
              <div className="section-heading">
                <span className="category-label">
                  {String(index + 1).padStart(2, "0")} / Guide
                </span>
                <h2 id={"insight-section-" + index}>{section.heading}</h2>
              </div>
              <div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="service-next section" aria-labelledby="guide-next-step">
            <div>
              <span className="category-label">Related service</span>
              <h2 id="guide-next-step">Turn the decision into a scoped system.</h2>
            </div>
            <div>
              <p>
                If this guide describes a problem your team is actively trying to
                solve, the next useful step is to map the real workflow and its
                constraints.
              </p>
              <Link href={insight.serviceHref} className="text-link">
                {insight.serviceLabel} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>

          <section className="section" aria-labelledby="more-guides">
            <div className="section-heading">
              <span className="category-label">Continue researching</span>
              <h2 id="more-guides">Related ORBITAL guides.</h2>
            </div>
            <div className="capability-grid">
              {insights
                .filter((candidate) => candidate.slug !== insight.slug)
                .map((candidate) => (
                  <article key={candidate.slug}>
                    <h3>
                      <Link href={"/insights/" + candidate.slug}>
                        {candidate.title}
                      </Link>
                    </h3>
                    <p>{candidate.description}</p>
                  </article>
                ))}
            </div>
          </section>
        </article>

        <Cta centered />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
