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
      <section
        className="about-intro service-index-intro"
        aria-labelledby="services-title"
      >
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <span className="about-kicker">Our services / 01</span>
            <h1 id="services-title">
              One team for your
              <br />
              digital <span>systems.</span>
            </h1>
            <p>Websites, customer apps, custom software and AI automation.</p>
            <a href="#service-preview" className="about-intro-link">
              Find your starting point <span aria-hidden="true">&#8595;</span>
            </a>
          </div>
          <div className="service-index-visual" aria-hidden="true">
            <div className="service-index-orbit service-index-orbit-one" />
            <div className="service-index-orbit service-index-orbit-two" />
            <div className="service-index-core">ORBITAL</div>
            <span className="service-index-node service-index-node-build">
              BUILD
            </span>
            <span className="service-index-node service-index-node-communicate">
              COMMUNICATE
            </span>
            <span className="service-index-node service-index-node-automate">
              AUTOMATE
            </span>
          </div>
        </div>
      </section>
      <div id="service-preview">
        <WebsiteExperience />
        <SoftwareExperience />
      </div>
      <AutomationFeature />
      <Cta />
    </main>
  );
}
