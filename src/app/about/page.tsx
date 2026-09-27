import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Shell";

export const metadata = pageMetadata(
  "About ORBITAL | Digital Systems Studio",
  "ORBITAL helps service businesses with websites, apps, custom software and automation. Learn about our practical approach to planning, testing and handover.",
  "/about",
);

const practices = [
  [
    "01",
    "Notice the friction",
    "We begin with the calls, tasks and customer moments that need to work better.",
  ],
  [
    "02",
    "Make the system visible",
    "You can see the screens, test the journeys and understand the moving parts before anything goes live.",
  ],
  [
    "03",
    "Leave the team ready",
    "We test together, explain the handoffs and leave clear documentation behind.",
  ],
];

export default function Page() {
  return (
    <main id="main" className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <div className="about-intro-inner">
          <div className="about-intro-copy">
            <span className="about-kicker">About ORBITAL / 01</span>
            <h1 id="about-title">
              Built for the work
              <br />
              behind the <span>work.</span>
            </h1>
            <p>
              A practical digital studio for websites, software and automation.
            </p>
            <Link href="/start-project" className="about-intro-link">
              Start a conversation <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
          <div className="about-mark" aria-hidden="true">
            <span className="about-mark-axis about-mark-axis-horizontal" />
            <span className="about-mark-axis about-mark-axis-vertical" />
            <span className="about-mark-orbit about-mark-orbit-one" />
            <span className="about-mark-orbit about-mark-orbit-two" />
            <span className="about-mark-orbit about-mark-orbit-three" />
            <Image
              src="/brand/orbital-symbol.webp"
              width={500}
              height={500}
              alt=""
              priority
            />
            <span className="about-mark-label">ORBITAL</span>
            <span className="about-mark-caption">
              A practical digital studio
            </span>
          </div>
        </div>
      </section>

      <section className="about-bridge section" aria-labelledby="bridge-title">
        <div className="about-bridge-heading">
          <span className="category-label">Built around real work / 02</span>
          <h2 id="bridge-title">One connected experience.</h2>
          <p>
            The best digital systems make the distance between a customer
            request and a team response feel almost invisible.
          </p>
        </div>
        <div className="about-sides about-sides-editorial">
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
          <div className="about-bridge-connector" aria-hidden="true">
            <span>ORBITAL</span>
            <i />
            <i />
            <i />
            <span>CONNECTED</span>
          </div>
        </div>
      </section>

      <section className="about-practice-band" aria-labelledby="practice-title">
        <div className="about-practice-inner section">
          <div className="about-practice-heading">
            <span className="about-kicker">How we work / 03</span>
            <h2 id="practice-title">Clarity is part of the build.</h2>
            <p>
              You don&apos;t need a list of technical requirements. Start with
              what needs to be easier, and we will map the route from there.
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

      <section
        className="about-manifesto section"
        aria-labelledby="manifesto-title"
      >
        <div className="about-manifesto-index">04 / A useful point of view</div>
        <div className="about-manifesto-copy">
          <h2 id="manifesto-title">
            Clear work. Better <span>outcomes.</span>
          </h2>
          <p>
            Not because the work was simple, but because the thinking was clear.
            We make the important path easier to see, use and own.
          </p>
        </div>
      </section>

      <Cta centered />
    </main>
  );
}
