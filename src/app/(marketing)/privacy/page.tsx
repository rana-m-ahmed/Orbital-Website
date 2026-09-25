import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Privacy",
    description:
      "How ORBITAL handles the information you share through this website.",
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="This policy was last reviewed before launch."
      sections={[
        {
          heading: "What this covers",
          body: [
            `This page explains what happens to information you send ORBITAL through this website. It is written to be read, not to be survived.`,
            `It is a starting point and must be reviewed by a qualified adviser against the laws that apply to your business and your customers before the site goes live.`,
          ],
        },
        {
          heading: "What we collect",
          body: [
            `When you use the contact form we receive the name, email address, company, website and message you choose to enter, together with the service category you selected and the time the message arrived.`,
            `Our server also records standard technical information such as the IP address a request came from, which is used to rate-limit the form and prevent abuse.`,
          ],
        },
        {
          heading: "Why we use it",
          body: [
            `To reply to your enquiry, to understand what you need, and to keep a record of the conversation. We do not sell it, and we do not share it with anyone who is not directly involved in replying to you.`,
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            `Enquiries are kept for as long as they are commercially useful and then deleted. If you would like your enquiry removed sooner, email ${SITE.email} and we will delete it.`,
          ],
        },
        {
          heading: "Analytics",
          body: [
            `This site records a small number of product events — which calls to action are used, which demonstrations are played, and whether the contact form succeeded or failed. These exist to improve the site. They do not track individuals across other websites.`,
          ],
        },
        {
          heading: "Your rights",
          body: [
            `You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Email ${SITE.email} and we will respond.`,
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about this policy go to ${SITE.email}.`],
        },
      ]}
    />
  );
}
