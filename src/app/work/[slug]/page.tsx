import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioVisual, BookingStory, Arrow } from "@/components/Studio";
import { Cta } from "@/components/Shell";
const examples = [
  {
    slug: "request-relay",
    title: "From a call to a booking.",
    copy: "A customer wants to arrange a visit. The team needs their details and a time that works.",
  },
  {
    slug: "workflow-explorer",
    title: "An enquiry in the right hands.",
    copy: "A new enquiry arrives through your website. It needs a customer record and someone to follow up.",
  },
];
export function generateStaticParams() {
  return examples.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = examples.find((p) => p.slug === slug);
  return pageMetadata(
    p?.title ?? "Not found",
    p?.copy ?? "Page not found.",
    "/work/" + slug,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = examples.find((p) => p.slug === slug);
  if (!p) notFound();
  const booking = slug === "request-relay";
  return (
    <main id="main">
      <section className="page-intro">
        <Link href="/work" className="category-label">
          Examples / Interactive example
        </Link>
        <h1>{p.title}</h1>
        <p>{p.copy}</p>
      </section>
      <section className="section demo-full" aria-label="Example interface">
        <StudioVisual kind={booking ? "booking" : "records"} large />
      </section>
      {booking ? (
        <BookingStory />
      ) : (
        <section className="section">
          <div className="section-heading">
            <h2>Ready for a follow-up.</h2>
            <p>
              The same information stays with the enquiry as it moves to your
              team.
            </p>
          </div>
          <div className="capability-grid">
            {[
              [
                "The enquiry arrives",
                "Sam asks about a home visit through a website form.",
              ],
              [
                "A record is created",
                "Sam's name and request are saved together.",
              ],
              [
                "Jordan gets the task",
                "The assigned team member can arrange a callback.",
              ],
            ].map(([t, c]) => (
              <article key={t}>
                <span className="capability-mark" aria-hidden="true">
                  &#8599;
                </span>
                <h3>{t}</h3>
                <p>{c}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="section demo-outcome">
        <h2>
          {booking
            ? "Your team knows who's coming."
            : "Your team knows who to call."}
        </h2>
        <div>
          <p>
            {booking
              ? "The appointment and customer details are ready to review. Requests that need a person can be passed to the team."
              : "The enquiry has an owner and a next step. Missing details can be flagged for review."}
          </p>
          <p className="service-note">
            This is an interactive example with fictional information. It does
            not place calls, create real bookings or connect to customer
            records.
          </p>
          <Link href="/work" className="text-link">
            All examples <Arrow />
          </Link>
        </div>
      </section>
      <Cta />
    </main>
  );
}
