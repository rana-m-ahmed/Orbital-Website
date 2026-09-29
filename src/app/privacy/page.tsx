import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
export const metadata = pageMetadata(
  "Privacy Notice",
  "Read how ORBITAL handles project enquiries and personal information, including email delivery, contact details and your privacy choices.",
  "/privacy",
);
export default function Page() {
  return (
    <main id="main">
      <section className="inner-hero section">
        <h1>Privacy notice</h1>
      </section>
      <article className="section prose">
        <p>
          Last updated: 29 September 2026. This notice describes the data
          handling implemented in this website.
        </p>
        <h2>Project enquiries</h2>
        <p>
          The project form collects your name, email, company, service interest
          and the message you provide. These details are used to review and
          respond to your request. Do not submit passwords, confidential
          customer records or other sensitive information.
        </p>
        <h2>Delivery and access</h2>
        <p>
          Submissions are sent through Resend to operations@reachorbital.tech
          and are not saved to the website server. Resend and the receiving
          mailbox may retain the message under their applicable policies. Access
          should be limited to the people responsible for enquiries. The
          responsible legal entity and retention period must be confirmed before
          public launch.
        </p>
        <h2>Analytics and cookies</h2>
        <p>
          This implementation does not include advertising tracking, session
          replay or analytics services. Framework functionality may use
          technical storage necessary to operate the site. Hosting providers may
          retain operational logs.
        </p>
        <h2>Your choices</h2>
        <p>
          To request access, correction or deletion, use the{" "}
          <Link href="/start-project">project enquiry form</Link> and state your
          request. You may also email operations@reachorbital.tech.
        </p>
        <h2>Changes</h2>
        <p>
          If data handling changes, this notice should be updated before new
          processing starts.
        </p>
      </article>
    </main>
  );
}
