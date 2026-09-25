"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE, heroToneFor } from "@/lib/site";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/**
 * §5 — desktop header.
 * 76px at rest, 64px sticky. Transparent at the very top of a page, matching
 * the hero. Once sticky: one universal Midnight treatment site-wide — no
 * per-section theme switching, no contrast flicker.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [stuck, setStuck] = useState(false);
  const heroTone = heroToneFor(pathname);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone: "light" | "dark" = stuck ? "dark" : heroTone;

  const linkTone =
    tone === "dark"
      ? "text-offwhite/72 hover:text-offwhite"
      : "text-midnight/68 hover:text-midnight";

  return (
    <header
      data-tone={tone}
      className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,height] duration-200 ease-[var(--ease-orbital)] ${
        tone === "dark" ? "on-dark" : ""
      } ${
        stuck
          ? "border-b border-white/8 bg-midnight/88 backdrop-blur-[16px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-[height] duration-200 ease-[var(--ease-orbital)] ${
          stuck ? "h-16" : "h-[76px]"
        }`}
      >
        <Wordmark
          className={tone === "dark" ? "text-offwhite" : "text-midnight"}
        />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.menu) {
                return (
                  <li key={item.href} className="relative">
                    <MegaMenu tone={tone} />
                    {active ? <ActiveMarker /> : null}
                  </li>
                );
              }

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex h-9 items-center text-[0.92rem] font-medium transition-colors duration-150 ${linkTone} ${
                      active
                        ? tone === "dark"
                          ? "text-offwhite"
                          : "text-midnight"
                        : ""
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-1/2 h-px w-[26px] -translate-x-1/2 bg-blue opacity-0 transition-opacity duration-[160ms] group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </Link>
                  {active ? <ActiveMarker /> : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            data-track="service_cta"
            data-track-label="header"
            className={`hidden items-center gap-2 rounded-[13px] px-5 py-2.5 text-[0.9rem] font-medium transition-colors duration-150 lg:inline-flex ${
              tone === "dark"
                ? "bg-offwhite text-midnight hover:bg-white"
                : "bg-midnight text-offwhite hover:bg-[#141b27]"
            }`}
          >
            {SITE.primaryCta}
          </Link>
          <MobileNav tone={tone} />
        </div>
      </div>
    </header>
  );
}

/* §5 — a quiet 4px blue marker remains under the active route. */
function ActiveMarker() {
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-[5px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-blue"
    />
  );
}
