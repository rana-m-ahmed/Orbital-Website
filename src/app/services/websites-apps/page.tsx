import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { WebsiteExperience } from "@/components/DigitalExperiences";
import { Cta } from "@/components/Shell";
export const metadata = pageMetadata(
  "Business Websites & Customer Apps",
  "Custom business websites, booking experiences and customer web apps. ORBITAL designs responsive interfaces around your customers and your business.",
  "/services/websites-apps",
);
export default function Page() {
  return (
    <main id="main">
      <section className="page-intro digital-service-intro">
        <span className="category-label">Websites & Apps</span>
        <h1>
          Make the first visit
          <br />
          worth staying for.
        </h1>
        <p>
          From a distinctive business website to a customer portal. We design
          and build the places where people meet your business online.
        </p>
        <Link href="/start-project" className="text-link">
          Tell us what you want to build <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <WebsiteExperience detail />
      <section className="section capabilities">
        <h2>Good-looking. Easy to use.</h2>
        <div className="capability-grid">
          {[
            [
              "Business websites",
              "Clear services, considered design and an easy route to enquire.",
            ],
            [
              "Customer web apps",
              "Bookings, accounts and project updates in a place your customers can use.",
            ],
            [
              "Ready for real screens",
              "Responsive layouts, keyboard access and a straightforward content handover.",
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
}
