"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AUTOMATION_CHILDREN, NAV, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/**
 * §7 — full-height mobile menu.
 * Backdrop 140–160ms, body 180–220ms, first link group enters together,
 * secondary group +40ms. No waterfall. Scroll-locked, Escape closes,
 * focus returns to the trigger.
 */
export function MobileNav({ tone }: { tone: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [automationOpen, setAutomationOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() =>
      panelRef.current
        ?.querySelector<HTMLElement>("a[href], button")
        ?.focus({ preventScroll: true }),
    );

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const triggerTone = tone === "dark" ? "text-offwhite" : "text-midnight";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="orbital-mobile-nav"
        onClick={() => setOpen(true)}
        className={`inline-flex size-11 items-center justify-center rounded-xl lg:hidden ${triggerTone}`}
      >
        <span className="sr-only">Open menu</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 14"
          className="w-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M1 1.5h18M1 12.5h18M1 7h13" />
        </svg>
      </button>

      {open ? (
        <div
          id="orbital-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-dark fixed inset-0 z-[70] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-midnight/92 backdrop-blur-sm"
            style={{ animation: "orbital-rise 150ms var(--ease-orbital) both" }}
            onClick={() => setOpen(false)}
          />

          <div
            ref={panelRef}
            className="absolute inset-0 flex flex-col overflow-y-auto bg-midnight"
            style={{ animation: "orbital-rise 200ms var(--ease-orbital) both" }}
            onClick={(event) => {
              /* Following any link closes the menu. */
              if ((event.target as HTMLElement).closest("a[href]")) {
                setOpen(false);
              }
            }}
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between px-6 text-offwhite">
              <Wordmark />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="inline-flex size-11 items-center justify-center rounded-xl text-offwhite"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="w-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <path d="m2 2 12 12M14 2 2 14" />
                </svg>
              </button>
            </div>

            <nav
              className="flex-1 px-6 pb-10 pt-4"
              style={{ animation: "orbital-rise 200ms var(--ease-orbital) both" }}
            >
              <ul className="space-y-1">
                {NAV.map((item) =>
                  item.menu ? (
                    <li key={item.href}>
                      <button
                        type="button"
                        aria-expanded={automationOpen}
                        onClick={() => setAutomationOpen((value) => !value)}
                        className="flex w-full items-center justify-between py-3.5 font-[family-name:var(--font-display)] text-[1.6rem] font-medium tracking-[-0.02em] text-offwhite"
                      >
                        {item.label}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 12 8"
                          className={`size-3 text-slate transition-transform duration-200 ${
                            automationOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m1.5 2 4.5 4 4.5-4" />
                        </svg>
                      </button>

                      {automationOpen ? (
                        <ul
                          className="mb-2 space-y-0.5 border-l border-midnight-line pl-4"
                          style={{
                            animation:
                              "orbital-rise 200ms var(--ease-orbital) 40ms both",
                          }}
                        >
                          {[
                            ...AUTOMATION_CHILDREN,
                            {
                              label: "All automation",
                              href: "/automation",
                              blurb: "",
                            },
                            {
                              label: "Integrations",
                              href: "/integrations",
                              blurb: "",
                            },
                          ].map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block py-2.5 text-[1.02rem] text-slate transition-colors hover:text-offwhite"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-3.5 font-[family-name:var(--font-display)] text-[1.6rem] font-medium tracking-[-0.02em] text-offwhite"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div
              className="shrink-0 border-t border-midnight-line px-6 py-7"
              style={{
                animation: "orbital-rise 200ms var(--ease-orbital) 40ms both",
              }}
            >
              <Link
                href="/contact"
                data-track="service_cta"
                data-track-label="mobile-nav"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-offwhite px-6 py-4 text-[0.95rem] font-medium text-midnight"
              >
                {SITE.primaryCta}
              </Link>

              <div className="mt-6 flex items-center justify-between text-[0.85rem] text-slate">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-offwhite"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-offwhite"
                >
                  {SITE.email}
                </a>
              </div>

              <p className="mt-5 font-[family-name:var(--font-display)] text-[0.9rem] text-slate/70">
                {SITE.tagline}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
