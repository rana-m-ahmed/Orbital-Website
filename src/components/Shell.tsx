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
    <footer>
      <div className="footer-brand">
        ORBITAL
        <span className="node" />
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ORBITAL</span>
        <a href="mailto:operations@reachorbital.tech">
          operations@reachorbital.tech
        </a>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
export function Cta({ centered = false }: { centered?: boolean }) {
  if (centered)
    return (
      <section className="home-project-cta" aria-labelledby="project-cta-title">
        <div className="project-cta-panel">
          <div className="project-cta-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="project-cta-content">
            <h2 id="project-cta-title">
              What would you like to <span>make easier?</span>
            </h2>
            <p>
              A new website, a useful app, or less admin. Tell us what you need.
            </p>
            <Link href="/start-project" className="button project-cta-button">
              Start a project <span aria-hidden="true">&#8599;</span>
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
  return (
    <section className="cta section">
      <div>
        <h2>
          What would you
          <br />
          like to make easier?
        </h2>
        <a href="mailto:operations@reachorbital.tech">
          operations@reachorbital.tech
        </a>
      </div>
      <Link href="/start-project" className="button">
        Start a project <span aria-hidden="true">&#8599;</span>
      </Link>
    </section>
  );
}
