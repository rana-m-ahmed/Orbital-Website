import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/shell/FinalCta";
import { pageMeta } from "@/lib/seo";
export const metadata: Metadata = pageMeta({
  title: "About ORBITAL",
  description:
    "An automation-first technology company. We bring clarity to everyday work through thoughtful automation, connected systems and custom software.",
  path: "/about",
});
const principles = [
  [
    "Start with the real problem.",
    "We learn how your business works before recommending what it needs. Sometimes the best answer is a simpler process.",
  ],
  [
    "Make it understandable.",
    "You should be able to explain what your system does. Clear decisions, visible progress and plain language are part of the work.",
  ],
  [
    "Keep people in control.",
    "Automation handles the routine. Judgement, approvals and exceptions stay with the people who know the business.",
  ],
  [
    "Build for what comes after.",
    "Testing, documentation and a clear handover matter as much as the first demo. A useful system needs to stay useful.",
  ],
];
export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="light"
        layout="wide"
        eyebrow="ABOUT ORBITAL"
        title="Technology should make life simpler."
        body="We’re an automation-first technology company with a straightforward belief: your business tools should give you time back."
      />
      <section className="about-story section-pad">
        <div className="shell">
          <div className="about-brand-art">
            <Image
              src="/brand/orbital-symbol.png"
              alt="The original ORBITAL symbol"
              width={1254}
              height={1254}
              sizes="(max-width: 768px) 80vw, 450px"
            />
            <span className="eyebrow">AUTOMATION · SOFTWARE · SYSTEMS</span>
          </div>
          <div>
            <p className="eyebrow">WHY WE EXIST</p>
            <h2>
              More tools shouldn’t
              <br />
              mean more work.
            </h2>
            <p>
              A business grows. An inbox becomes a process. A spreadsheet
              becomes a system. Before long, your team spends more time moving
              information than using it.
            </p>
            <p>
              ORBITAL exists to bring those pieces together. We automate what
              repeats, connect what already works, and build what’s missing.
            </p>
            <p className="about-emphasis">
              The result we work towards is simple:
              <br />
              less handling, more headspace.
            </p>
          </div>
        </div>
      </section>
      <section className="about-principles section-pad">
        <div className="shell">
          <div className="editorial-heading">
            <p className="eyebrow">THE WAY WE WORK</p>
            <div>
              <h2>
                Thoughtful systems.
                <br />
                <span className="muted-heading">Straightforward people.</span>
              </h2>
              <p>
                Four principles that guide
                <br />
                every project.
              </p>
            </div>
          </div>
          {principles.map(([title, body], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-approach section-pad">
        <div className="shell">
          <p className="eyebrow">ONE TEAM, FROM IDEA TO EVERYDAY</p>
          <h2>
            A shared plan.
            <br />
            An open conversation.
          </h2>
          <div>
            <p>
              We work remotely, with discovery conversations, design reviews and
              working demonstrations that keep you involved throughout the
              project.
            </p>
            <p>
              You get a defined scope, visible progress, and documentation that
              makes the system understandable beyond the people who built it.
            </p>
          </div>
        </div>
      </section>
      <FinalCta
        headline="Have a problem worth simplifying?"
        body="You don’t need a technical brief. A conversation about what’s slowing you down is enough."
        eventLabel="about-final"
      />
    </>
  );
}
