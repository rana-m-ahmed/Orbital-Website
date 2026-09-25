import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Terms",
    description: "The terms on which this website is provided.",
    path: "/terms",
  }),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="These terms were last reviewed before launch."
      sections={[
        {
          heading: "About this site",
          body: [
            `This website describes ORBITAL's services. Nothing on it is an offer, a quotation or a contract. Work is carried out under a separate written agreement covering scope, price, timing and responsibilities.`,
          ],
        },
        {
          heading: "The examples shown here",
          body: [
            `Projects labelled "Reference system" were built by ORBITAL to demonstrate how a problem is solved. They are not client deployments, and they are not presented as evidence of work delivered for a client.`,
            `Interface screenshots and reporting figures shown anywhere on this site use demonstration data unless explicitly stated otherwise.`,
          ],
        },
        {
          heading: "Accuracy",
          body: [
            `We keep this site accurate, but descriptions of what is possible depend heavily on the systems a particular business uses. Nothing here should be relied on as a guarantee of a specific outcome, capability or integration until it has been confirmed for your situation.`,
          ],
        },
        {
          heading: "Third-party names",
          body: [
            `Product and company names mentioned on this site belong to their respective owners. Their use here describes compatibility and does not imply endorsement, partnership or affiliation.`,
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The design, text and code of this site belong to ORBITAL unless stated otherwise. Work produced for a client is owned as set out in that client's agreement.`,
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms go to ${SITE.email}.`],
        },
      ]}
    />
  );
}
