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
          Let&apos;s build what
          <br />
          moves you <span>forward.</span>
        </h1>
        <p>Websites, software or automation. Start with the problem.</p>
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

      <section className="section" aria-labelledby="project-prep-title">
        <div className="section-heading">
          <span className="category-label">Before we talk</span>
          <h2 id="project-prep-title">You do not need a finished specification.</h2>
          <p>
            A useful first conversation starts with the business problem, the
            people affected by it and what currently makes the work slower or
            harder than it should be.
          </p>
        </div>
        <div className="capability-grid">
          <article>
            <h3>Describe the current process</h3>
            <p>
              Tell us what happens today, which tools are involved and where
              customers or staff lose time.
            </p>
          </article>
          <article>
            <h3>Share the outcome you need</h3>
            <p>
              A clearer booking journey, fewer manual handoffs, better internal
              visibility or a new customer experience is enough to start.
            </p>
          </article>
          <article>
            <h3>We map the practical next step</h3>
            <p>
              We will review the workflow, identify important constraints and
              discuss the smallest useful version before proposing a larger
              build.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
