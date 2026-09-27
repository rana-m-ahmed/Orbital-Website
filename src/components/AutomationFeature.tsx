import Link from "next/link";
import { StudioVisual, Arrow } from "./Studio";
export default function AutomationFeature() {
  return (
    <section className="section automation-feature" id="automation">
      <div>
        <span className="category-label">Automation & AI communication</span>
        <h2>
          Answer calls.
          <br />
          Take care of the admin.
        </h2>
        <p>
          Connect the everyday tasks that keep your business moving, from
          answering a call to following up with a customer.
        </p>
        <div className="automation-links">
          {[
            ["ai-receptionist", "Answer calls. Arrange visits."],
            ["ai-calling-agents", "Follow up with customers."],
            ["workflow-automation", "Connect your tools."],
          ].map(([slug, title]) => (
            <Link href={`/services/${slug}`} key={slug}>
              {title}
              <Arrow />
            </Link>
          ))}
        </div>
        <Link href="/work/request-relay" className="text-link">
          See booking example <Arrow />
        </Link>
      </div>
      <StudioVisual kind="call" />
      <div className="automation-showcases">
        <article>
          <StudioVisual kind="followup" />
          <div className="service-caption">
            <h3>A follow-up that moves things forward.</h3>
            <p>
              Remind customers about a visit, capture their reply and pass the
              next step to your team.
            </p>
            <Link className="text-link" href="/services/ai-calling-agents">
              Explore AI calling agents <Arrow />
            </Link>
          </div>
        </article>
        <article>
          <StudioVisual kind="records" />
          <div className="service-caption">
            <h3>One enquiry. Details where you need them.</h3>
            <p>
              Create the customer record, assign a task and keep your tools
              updated without copying everything twice.
            </p>
            <Link className="text-link" href="/services/workflow-automation">
              Explore workflow automation <Arrow />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
