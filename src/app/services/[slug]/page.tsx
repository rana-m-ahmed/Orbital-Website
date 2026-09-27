import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { offerings, StudioVisual, Arrow } from "@/components/Studio";
import { SoftwareExperience } from "@/components/DigitalExperiences";
import { Cta } from "@/components/Shell";
export function generateStaticParams() {
  return offerings.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = offerings.find((s) => s.slug === slug);
  return pageMetadata(
    s?.name ?? "Not found",
    s?.copy ?? "Page not found.",
    "/services/" + slug,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = offerings.find((s) => s.slug === slug);
  if (!s) notFound();
  if (slug === "custom-software")
    return (
      <main id="main">
        <section className="page-intro digital-service-intro">
          <span className="category-label">Custom software & web apps</span>
          <h1>
            Software that fits.
            <br />
            Without the workarounds.
          </h1>
          <p>
            Team tools, customer portals and useful web apps. Built around the
            jobs people need to get done.
          </p>
          <Link href="/start-project" className="text-link">
            Start a software project <Arrow />
          </Link>
        </section>
        <SoftwareExperience detail />
        <section className="section capabilities">
          <h2>One tool. The right details.</h2>
          <div className="capability-grid">
            {[
              [
                "For your team",
                "Manage projects, assign work and find customer information without switching between spreadsheets.",
              ],
              [
                "For your customers",
                "Give people a place to check progress, share details and approve the next step.",
              ],
              [
                "For everyday use",
                "Clear permissions, tested workflows and documentation your team can follow.",
              ],
            ].map(([t, c]) => (
              <article key={t}>
                <h3>{t}</h3>
                <p>{c}</p>
              </article>
            ))}
          </div>
        </section>
        <Cta />
      </main>
    );

  return (
    <main id="main">
      <section className="service-hero section">
        <div>
          <Link href="/services" className="category-label">
            Services / {s.name}
          </Link>
          <h1>{s.title}</h1>
          <p>{s.copy}</p>
          <Link href="/start-project" className="button">
            Start a project <Arrow />
          </Link>
        </div>
        <StudioVisual kind={s.kind} />
      </section>
      <section className="section capabilities">
        <h2>What it can help with.</h2>
        <div className="capability-grid">
          {s.capabilities.map(([title, copy]) => (
            <article key={title}>
              <span className="capability-mark" aria-hidden="true">
                &#8599;
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="service-example section">
        <div>
          <span className="category-label">An everyday example</span>
          <h2>
            {s.kind === "call"
              ? "From a call to a visit."
              : s.kind === "followup"
                ? "A callback, at the right time."
                : s.kind === "records"
                  ? "One enquiry. Details in place."
                  : "Start the day with a clear view."}
          </h2>
          <p>{s.example}</p>
          {s.kind === "followup" && (
            <p className="service-note">
              Before launch, we agree the calling permissions, customer choices
              and requirements that apply to your use case.
            </p>
          )}
          <Link
            className="text-link"
            href={
              s.kind === "call"
                ? "/work/request-relay"
                : "/work/workflow-explorer"
            }
          >
            See an example system <Arrow />
          </Link>
        </div>
        <StudioVisual kind={s.kind === "call" ? "booking" : s.kind} />
      </section>
      <Cta />
    </main>
  );
}
