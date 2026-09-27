import { pageMetadata } from "@/lib/seo";
import ProjectForm from "@/components/ProjectForm";
export const metadata = pageMetadata(
  "Start a Website, Software or Automation Project",
  "Tell ORBITAL about your website, app, software or automation project. Share what your business needs and contact operations@reachorbital.tech.",
  "/start-project",
);
export default function Page() {
  return (
    <main id="main">
      <section className="page-intro contact-intro">
        <span className="category-label">Start a project</span>
        <h1>
          What would you like
          <br />
          to make easier?
        </h1>
        <p>
          Tell us a little about your business and what takes too much time. No
          technical brief needed.
        </p>
      </section>
      <section className="section form-layout">
        <aside className="form-aside">
          <span className="contact-mark" aria-hidden="true">
            &#8599;
          </span>
          <h2>
            Let’s start
            <br />
            with your idea.
          </h2>
          <p>
            We’ll review your request and get in touch to discuss what could
            help.
          </p>
          <a
            className="contact-email"
            href="mailto:operations@reachorbital.tech"
          >
            operations@reachorbital.tech
          </a>
          <p className="service-note">
            Your details are used to respond to your enquiry. You won’t be added
            to a marketing list.
          </p>
        </aside>
        <ProjectForm />
      </section>
    </main>
  );
}
