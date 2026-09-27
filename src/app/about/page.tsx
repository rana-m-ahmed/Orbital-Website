import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Shell";

export const metadata = pageMetadata(
  "About ORBITAL",
  "ORBITAL helps service businesses with websites, apps, custom software and automation. Learn about our practical approach to planning, testing and handover.",
  "/about",
);

const practices = [
  [
    "01",
    "Start with the day-to-day",
    "We begin with the calls, tasks and customer moments that need to work better.",
  ],
  [
    "02",
    "Make the important parts visible",
    "You can see the screens and try the key journeys before anything goes live.",
  ],
  [
    "03",
    "Leave your team ready",
    "We test together, explain the handoffs and leave clear documentation behind.",
  ],
];

export default function Page() {
  return (
    <main id="main" className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <span className="about-kicker">About ORBITAL</span>
            <h1 id="about-title">
              Your front door.
              <br />
              Your team&apos;s <span>best tools.</span>
            </h1>
            <p>
              ORBITAL builds the website customers meet and the systems your
              team uses after they get in touch.
            </p>
            <Link href="/start-project" className="about-intro-link">
              Start a project <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
          <div className="about-mark" aria-hidden="true">
            <span className="about-mark-orbit about-mark-orbit-one" />
            <span className="about-mark-orbit about-mark-orbit-two" />
            <Image
              src="/brand/orbital-symbol.webp"
              width={500}
              height={500}
              alt=""
              priority
            />
            <span className="about-mark-label">ORBITAL</span>
          </div>
        </div>
      </section>

      <section className="about-bridge section" aria-labelledby="bridge-title">
        <div className="about-bridge-heading">
          <span className="category-label">Built around real work</span>
          <h2 id="bridge-title">The experience outside. The work inside.</h2>
          <p>
            For service businesses, these two sides should feel like one
            connected experience.
          </p>
        </div>
        <div className="about-sides">
          <article className="about-side about-side-customer">
            <span className="about-side-label">For your customers</span>
            <div className="about-customer-window" aria-hidden="true">
              <span className="window-bar">
                <i />
                <i />
                <i />
              </span>
              <strong>Make a good first impression.</strong>
              <p>Clear information. A useful next step.</p>
              <span className="window-action">
                Arrange a visit <b>&rarr;</b>
              </span>
            </div>
            <h3>Easy to find. Easy to use.</h3>
            <p>
              Websites, booking journeys and customer apps that help people take
              the next step.
            </p>
            <Link href="/services/websites-apps" className="text-link">
              Explore websites &amp; apps{" "}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </article>
          <article className="about-side about-side-team">
            <span className="about-side-label">For your team</span>
            <div className="about-team-board" aria-hidden="true">
              <div className="team-board-top">
                <span>Today&apos;s work</span>
                <i>3</i>
              </div>
              <div>
                <b>New booking</b>
                <span>Alex Khan · Tuesday</span>
              </div>
              <div>
                <b>Follow-up due</b>
                <span>Quote request · 10:00</span>
              </div>
              <div>
                <b>Task assigned</b>
                <span>Website update · Jordan</span>
              </div>
            </div>
            <h3>Clear work. Fewer loose ends.</h3>
            <p>
              Software and automation that keep customer details, tasks and
              follow-ups together.
            </p>
            <Link href="/services" className="text-link">
              Explore software &amp; automation{" "}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="about-practice-band" aria-labelledby="practice-title">
        <div className="about-practice-inner section">
          <div className="about-practice-heading">
            <span className="about-kicker">How we work</span>
            <h2 id="practice-title">Clear from the first conversation.</h2>
            <p>
              You don&apos;t need a list of technical requirements. Start with
              what needs to be easier.
            </p>
          </div>
          <ol className="about-practice-list">
            {practices.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/how-we-work" className="about-practice-link">
            See how we work <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </section>

      <Cta centered />
    </main>
  );
}
