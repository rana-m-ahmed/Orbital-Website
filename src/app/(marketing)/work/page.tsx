import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/shell/FinalCta";
import { TextLink } from "@/components/ui/Button";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { WORK, WORK_LABEL } from "@/content/work";
import { pageMeta } from "@/lib/seo";
export const metadata: Metadata = pageMeta({
  title: "ORBITAL Labs & Work",
  description:
    "Explore concept systems for automation, connected workflows and custom software. Practical answers to familiar business problems.",
  path: "/work",
});
export default function WorkPage() {
  return (
    <>
      <PageHero
        tone="dark"
        layout="wide"
        eyebrow="ORBITAL LABS & WORK"
        title="Possibility, made tangible."
        body="A closer look at how we turn everyday business friction into thoughtful, working systems."
        primary={{ label: "Let’s talk", href: "/contact", event: "work-hero" }}
      />
      <section className="work-gallery section-pad">
        <div className="shell">
          <div className="work-intro">
            <p className="eyebrow">THE LAB COLLECTION / 01—03</p>
            <p>
              Concept demonstrations exploring real business problems. These are
              not client deployments.
            </p>
          </div>
          {WORK.map((item, i) => (
            <article
              key={item.slug}
              className={`work-editorial work-editorial-${i}`}
            >
              <div className="work-editorial-visual">
                <span className="eyebrow">ORBITAL / LAB 0{i + 1}</span>
                <ProductFrame variant={item.frame} title={item.title} />
                <span className="work-visual-number" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <div className="work-editorial-copy">
                <p className="eyebrow">
                  {WORK_LABEL[item.type]} / {item.service.label}
                </p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <div className="work-before-after">
                  <p>
                    <span>Before</span>
                    {item.before}
                  </p>
                  <p>
                    <span>After</span>
                    {item.after}
                  </p>
                </div>
                <TextLink
                  href={`/work/${item.slug}`}
                  event="work_case_open"
                  eventLabel={item.slug}
                >
                  Explore the system
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalCta
        headline="Your next chapter could start here."
        body="Tell us what you want to work better. We’ll help you find the right approach."
        eventLabel="work-final"
      />
    </>
  );
}
