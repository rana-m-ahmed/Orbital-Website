"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { services } from "@/lib/content";
export function Header() {
  const path = usePathname();
  return (
    <header className={`header${path === "/" ? " home-shell" : ""}`}>
      <Link href="/" className="brand" aria-label="ORBITAL home">
        <Image
          className="brand-lockup"
          src="/brand/orbital-lockup.webp"
          width={1892}
          height={409}
          sizes="164px"
          alt="ORBITAL"
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <details className="service-menu">
          <summary>
            Services
            <svg
              className="nav-chevron"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="service-dropdown">
            <Link href="/services">Explore all services ↗</Link>
            {services.map((s) => (
              <Link key={s.slug} href={"/services/" + s.slug}>
                <strong>{s.name}</strong>
                <small>{s.description}</small>
              </Link>
            ))}
          </div>
        </details>
        {[
          ["/work", "Work"],
          ["/insights", "Insights"],
          ["/how-we-work", "How we work"],
          ["/about", "About"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link className="button small" href="/start-project">
        Start a project <span>↗</span>
      </Link>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">☰</summary>
        <nav aria-label="Mobile navigation">
          {[
            ["/services", "Services"],
            ["/work", "Work"],
            ["/insights", "Insights"],
            ["/how-we-work", "How we work"],
            ["/about", "About"],
            ["/start-project", "Start a project"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={(e) =>
                e.currentTarget.closest("details")?.removeAttribute("open")
              }
            >
              {label} ↗
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-editorial">
        <div className="footer-intro">
          <span className="footer-mark">
            ORBITAL <i aria-hidden="true" />
          </span>
          <p>Digital systems for service businesses.</p>
        </div>

        <div className="footer-directory">
          <nav className="footer-col" aria-label="Explore ORBITAL">
            <strong>Explore</strong>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/how-we-work">How we work</Link>
            <Link href="/about">About</Link>
          </nav>

          <nav className="footer-col" aria-label="ORBITAL services">
            <strong>Services</strong>
            <Link href="/services/websites-apps">Websites &amp; apps</Link>
            <Link href="/services/custom-software">Custom software</Link>
            <Link href="/services/ai-receptionist">AI receptionist</Link>
            <Link href="/services/workflow-automation">Automation</Link>
          </nav>

          <div className="footer-col footer-contact">
            <strong>Contact</strong>
            <a href="mailto:operations@reachorbital.tech">
              operations@reachorbital.tech
            </a>
            <Link href="/start-project">Start a project</Link>
            <div className="footer-social" aria-label="Social channels">
              <span>LinkedIn — coming soon</span>
              <span>Instagram — coming soon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-signature" aria-hidden="true">
        <div className="footer-signature-rule">
          <i />
        </div>
        <span>ORBITAL</span>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ORBITAL</span>
        <div className="footer-bottom-right">
          <Link href="/privacy">Privacy</Link>
          <span className="separator" aria-hidden="true" />
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
export function Cta({ centered = false }: { centered?: boolean }) {
  void centered;
  return (
    <section className="home-project-cta" aria-labelledby="project-cta-title">
      <div className="project-cta-panel">
        <div className="project-cta-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="project-cta-content">
          <span className="project-cta-eyebrow">
            Build what moves your business forward
          </span>
          <h2 id="project-cta-title">
            Ready for a better <span>way to work?</span>
          </h2>
          <p>
            From conversion-focused websites to custom software and AI
            automation, we build the systems that remove friction for your
            customers and team.
          </p>
          <Link href="/start-project" className="button project-cta-button">
            Start your project <span aria-hidden="true">&#8599;</span>
          </Link>
          <a
            className="project-cta-email"
            href="mailto:operations@reachorbital.tech"
          >
            operations@reachorbital.tech
          </a>
        </div>
      </div>
    </section>
  );
}
