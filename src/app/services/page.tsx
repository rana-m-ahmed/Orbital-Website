import { pageMetadata } from "@/lib/seo";
import {
  WebsiteExperience,
  SoftwareExperience,
} from "@/components/DigitalExperiences";
import AutomationFeature from "@/components/AutomationFeature";
import { Cta } from "@/components/Shell";
import Link from "next/link";
import { services } from "@/lib/content";
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
      <section className="section" aria-labelledby="service-directory-title">
        <div className="section-heading">
          <span className="category-label">Service directory / 02</span>
          <h2 id="service-directory-title">Choose the problem you need to solve.</h2>
          <p>
            Each service page explains the use cases, implementation path,
            operating limits and related systems in more detail.
          </p>
        </div>
        <div className="capability-grid">
          {services.map((service) => (
            <article key={service.slug}>
              <span className="category-label">{service.family}</span>
              <h3>
                <Link href={"/services/" + service.slug}>{service.name}</Link>
              </h3>
              <p>{service.description}</p>
              <Link className="text-link" href={"/services/" + service.slug}>
                Explore {service.name.toLowerCase()}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
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
