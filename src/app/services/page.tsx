import { pageMetadata } from "@/lib/seo";
import {
  WebsiteExperience,
  SoftwareExperience,
} from "@/components/DigitalExperiences";
import AutomationFeature from "@/components/AutomationFeature";
import { Cta } from "@/components/Shell";
export const metadata = pageMetadata(
  "Websites, Software & Automation Services",
  "Explore ORBITAL services: business websites, customer apps, custom software, AI receptionists, calling agents and workflow automation.",
  "/services",
);
export default function Page() {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="category-label">Our services</span>
        <h1>
          From your website
          <br />
          to the way you work.
        </h1>
        <p>
          Websites, customer apps, custom software and automation. One studio to
          design and build what your business needs.
        </p>
      </section>
      <WebsiteExperience />
      <SoftwareExperience />
      <AutomationFeature />
      <Cta />
    </main>
  );
}
