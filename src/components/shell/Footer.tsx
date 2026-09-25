import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/** §18 — lower footer. The oversized ghost wordmark settles once, then stops. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden border-t border-white/8 bg-midnight text-offwhite">
      <div className="shell relative pb-16 pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <Wordmark className="text-offwhite" />
            <p className="mt-5 font-[family-name:var(--font-display)] text-[1.05rem] text-offwhite/80">
              {SITE.tagline}
            </p>
            <p className="mt-4 max-w-[320px] text-[0.92rem] leading-relaxed text-slate">
              Automation, software and systems built around real business needs.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-block text-[0.92rem] text-slate transition-colors hover:text-offwhite"
            >
              {SITE.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7 lg:col-start-6 lg:col-end-13">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <h2 className="mono-label text-slate">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[0.92rem] text-offwhite/78 transition-colors hover:text-offwhite"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[0.92rem] text-offwhite/78 transition-colors hover:text-offwhite"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-7 text-[0.82rem] text-slate">
          <p>© {year} ORBITAL</p>
          <div className="flex items-center gap-7">
            <Link href="/privacy" className="transition-colors hover:text-offwhite">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-offwhite">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Signature ghost wordmark — settles once on entry, never loops (§18). */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[3.5vw] select-none overflow-hidden px-4"
      >
        <p className="whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[19vw] font-semibold leading-[0.78] tracking-[0.02em] text-offwhite/[0.06]">
          ORBITAL
        </p>
      </div>
    </footer>
  );
}
