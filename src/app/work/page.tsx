import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  WebsiteExperience,
  SoftwareExperience,
} from "@/components/DigitalExperiences";
import { Cta } from "@/components/Shell";
export const metadata = pageMetadata(
  "Website, App & Automation Examples",
  "Explore interactive internal demos of business websites, customer apps, appointment booking and enquiry routing. See what ORBITAL can build.",
  "/work",
);
export default function Page() {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="category-label">Example systems</span>
        <h1>
          See what
          <br />
          we can build.
        </h1>
        <p>
          Explore a website concept, a working software preview and everyday
          automation examples. All are internal demos with fictional
          information.
        </p>
      </section>
      <WebsiteExperience />
      <SoftwareExperience />
      <section className="section">
        <div className="section-heading">
          <h2>Behind the scenes.</h2>
          <p>Two examples of how automation can connect everyday tasks.</p>
        </div>
        <div className="automation-links">
          <Link href="/work/request-relay">
            From a call to a booking <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link href="/work/workflow-explorer">
            From an enquiry to a follow-up{" "}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </section>
      <Cta />
    </main>
  );
}
