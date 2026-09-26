import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
export function Footer() {
  return (
    <footer className="premium-footer on-dark">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow">
              A little less friction. A lot more possibility.
            </p>
            <h2>
              Make room for
              <br />
              better work<span className="blue-dot">.</span>
            </h2>
          </div>
          <Link
            className="footer-round-link"
            href="/contact"
            aria-label="Let’s talk about your business"
          >
            ↗
          </Link>
        </div>
        <div className="footer-links">
          <p>
            Automation. Software. Systems.
            <br />
            <span>Built around your business.</span>
          </p>
          <div>
            <Link href="/automation">Automation</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/software">Software</Link>
            <Link href="/websites-apps">Websites & apps</Link>
          </div>
          <div>
            <Link href="/work">Our work</Link>
            <Link href="/about">About ORBITAL</Link>
            <Link href="/contact">Let’s talk</Link>
            {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          </div>
        </div>
        <div className="footer-brand">
          <Image
            src="/brand/orbital-lockup.png"
            alt="ORBITAL — Automation, Software, Systems"
            width={2172}
            height={724}
            sizes="(max-width: 768px) 85vw, 950px"
          />
        </div>
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} ORBITAL</p>
          <span>Systems in motion.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
