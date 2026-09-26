import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="architectural-footer">
      <div className="footer-orbit" aria-hidden="true">
        <i />
      </div>
      <div className="shell">
        <div className="footer-brand-lockup">
          <Image
            src="/brand/orbital-lockup.png"
            alt="ORBITAL — Automation, Software, Systems"
            width={2172}
            height={724}
            sizes="(max-width: 760px) 75vw, 520px"
          />
        </div>
        <div className="footer-directory">
          <div>
            <span>WHAT WE DO</span>
            <Link href="/automation">Automation</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/software">Custom software</Link>
            <Link href="/websites-apps">Websites & apps</Link>
          </div>
          <div>
            <span>EXPLORE</span>
            <Link href="/work">ORBITAL Labs</Link>
            <Link href="/about">About</Link>
            <Link href="/#process">How it works</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span>START A CONVERSATION</span>
            <Link className="footer-action" href="/contact">
              Tell us what should work better <b>↗</b>
            </Link>
            {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} ORBITAL</span>
          <span>COMPLEXITY, BROUGHT INTO ORDER.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
