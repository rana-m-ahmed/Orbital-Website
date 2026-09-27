import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import RelayPoster from "@/components/RelayPoster";
import { ProcessSection, BookingStory, Arrow } from "@/components/Studio";
import {
  WebsiteExperience,
  SoftwareExperience,
} from "@/components/DigitalExperiences";
import AutomationFeature from "@/components/AutomationFeature";
import { Cta } from "@/components/Shell";

export const metadata = pageMetadata(
  "AI Automation, Custom Software & Websites",
  "ORBITAL builds AI automation, custom software, websites and customer apps for service businesses, including AI receptionists, workflows and booking experiences.",
  "/",
);

export default function Home() {
  return (
    <main id="main" className="landing-page">
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Digital systems.
            <br />
            Built to <span>move.</span>
          </h1>
          <p>
            Websites, custom software and AI automation for service businesses.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/start-project">
              Start a project <Arrow />
            </Link>
            <a className="text-link" href="#websites">
              See what we build <span aria-hidden="true">&#8595;</span>
            </a>
          </div>
        </div>
        <RelayPoster />
      </section>
      <AutomationFeature />
      <BookingStory />
      <WebsiteExperience />
      <SoftwareExperience />
      <ProcessSection />
      <Cta centered />
    </main>
  );
}
