import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  WebsiteExperience,
  SoftwareExperience,
} from "@/components/DigitalExperiences";
import { Cta } from "@/components/Shell";
export const metadata = pageMetadata(
  "Website, App & Automation Examples",
  "Explore interactive examples of business websites, customer apps, appointment booking and enquiry routing. See what ORBITAL can build.",
  "/work",
);
export default function Page() {
  return (
    <main id="main">
      <section className="about-intro work-intro" aria-labelledby="work-title">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <span className="about-kicker">Example systems / 01</span>
            <h1 id="work-title">
              See the systems
              <br />
              in <span>action.</span>
            </h1>
            <p>Interactive examples of websites, software and automation.</p>
            <Link href="#examples" className="about-intro-link">
              Explore the examples <span aria-hidden="true">&#8595;</span>
            </Link>
          </div>
          <div className="work-intro-visual" aria-hidden="true">
            <div className="work-intro-orbit" />
            <div className="work-intro-window">
              <span className="window-bar">
                <i />
                <i />
                <i />
              </span>
              <strong>From first click</strong>
              <span>to finished task.</span>
              <b>ORBITAL / INTERACTIVE EXAMPLE</b>
            </div>
            <div className="work-intro-route">
              <span>01</span>
              <i />
              <span>02</span>
              <i />
              <span>03</span>
            </div>
          </div>
        </div>
      </section>
      <div id="examples">
        <WebsiteExperience />
      </div>
      <SoftwareExperience />
      <section className="section">
        <div className="section-heading">
          <h2>Automation, in action.</h2>
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
