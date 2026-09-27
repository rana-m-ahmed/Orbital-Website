import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
export const metadata = pageMetadata(
  "Website Terms",
  "Read the terms for using the ORBITAL website, including internal demonstrations, project enquiries and website content.",
  "/terms",
);
export default function Page() {
  return (
    <main id="main">
      <section className="inner-hero section">
        <h1>Website terms</h1>
      </section>
      <article className="section prose">
        <p>
          Last updated: 26 September 2026. These terms describe use of this
          website. The responsible legal entity and applicable jurisdiction must
          be confirmed before public launch.
        </p>
        <h2>Website information</h2>
        <p>
          Service descriptions explain the kinds of systems ORBITAL can discuss
          with you. They do not constitute a project proposal, a guarantee of
          results or a binding offer.
        </p>
        <h2>Demonstrations</h2>
        <p>
          Interactive examples use fictional data and predefined scenarios. They
          are educational demonstrations, not deployed client systems or
          evidence of financial results.
        </p>
        <h2>Project engagements</h2>
        <p>
          Scope, fees, timelines, ownership, confidentiality, support and
          acceptance criteria are agreed separately in a written project
          agreement.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site, interfere with its operation or submit
          material you do not have permission to share.
        </p>
        <h2>AI communication systems</h2>
        <p>
          Calling and communication workflows require appropriate permissions,
          identification, opt-out processes and jurisdiction-specific review.
          Website examples do not replace those requirements.
        </p>
        <h2>Enquiries</h2>
        <p>
          Use <Link href="/start-project">Start a project</Link> to discuss a
          system or ask about the information on this site.
        </p>
      </article>
    </main>
  );
}
