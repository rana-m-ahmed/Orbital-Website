"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AUTOMATION_CHILDREN } from "@/lib/site";

/* §6 — one small contextual micrographic changes with the focused item. */
function Micrograph({ index }: { index: number }) {
  const shapes = [
    /* AI Receptionist — call answered */
    <g key="a">
      <path
        d="M10 26h6l4-9 5 18 4-11 3 6h12"
        stroke="var(--color-blue)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>,
    /* Lead Automation — capture then route */
    <g key="b">
      <path
        d="M10 26h12l7-9m-7 9 7 9h15"
        stroke="var(--color-blue)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="10" cy="26" r="2.6" fill="var(--color-blue)" />
    </g>,
    /* Customer Support — resolve or hand off */
    <g key="c">
      <rect
        x="9"
        y="16"
        width="17"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
        fill="none"
      />
      <path
        d="M26 22h9m0 0-3.5-3.5M35 22l-3.5 3.5"
        stroke="var(--color-blue)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="40" cy="22" r="3.2" fill="var(--color-blue)" opacity="0.9" />
    </g>,
    /* Operations — document route */
    <g key="d">
      <rect
        x="9"
        y="14"
        width="12"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.45"
        fill="none"
      />
      <path
        d="M21 22h10"
        stroke="var(--color-blue)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m33 22 3 3 6-7"
        stroke="var(--color-blue)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>,
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 50 44"
      className="h-11 w-[52px] text-slate"
    >
      {shapes[index] ?? shapes[0]}
    </svg>
  );
}

/**
 * §6 — Automation is a menu trigger, not a dual-purpose link.
 * Disclosure semantics: button + aria-expanded + aria-controls, Escape closes,
 * focus returns to the trigger, and the explicit route lives inside the panel.
 */
export function MegaMenu({ tone }: { tone: "light" | "dark" }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  /* Hover with intent: ~320ms to open, 300ms grace to close (§6). */
  const onPointerEnter = () => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), 320);
  };

  const onPointerLeave = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), 300);
  };

  const labelTone =
    tone === "dark"
      ? "text-offwhite/72 hover:text-offwhite"
      : "text-midnight/68 hover:text-midnight";

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => {
          clearTimers();
          setOpen((value) => !value);
        }}
        className={`relative inline-flex h-9 items-center gap-1.5 text-[0.92rem] font-medium transition-colors duration-150 ${labelTone} ${
          open ? (tone === "dark" ? "text-offwhite" : "text-midnight") : ""
        }`}
      >
        Automation
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`size-2.5 transition-transform duration-[170ms] ease-[var(--ease-orbital)] ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m1 1.5 4 3.5 4-3.5" />
        </svg>
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-1/2 h-px w-[26px] -translate-x-1/2 bg-blue transition-opacity duration-[160ms] ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>

      {/* Pointer corridor: the panel sits inside the hover container. */}
      <div
        id={panelId}
        hidden={!open}
        className="on-dark absolute left-1/2 top-full z-50 w-[748px] max-w-[92vw] -translate-x-1/2 pt-4"
      >
        <div
          className="overflow-hidden rounded-2xl border border-midnight-line bg-midnight/97 shadow-[0_24px_60px_-24px_rgba(4,8,16,0.75)] backdrop-blur-xl"
          style={{
            animation: open
              ? "orbital-rise 180ms var(--ease-orbital) both"
              : undefined,
          }}
        >
          <div className="flex items-start justify-between gap-6 border-b border-midnight-line px-7 pb-5 pt-6">
            <p className="eyebrow text-slate">Automation</p>
            <Micrograph index={focusedItem} />
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 px-4 py-4">
            {AUTOMATION_CHILDREN.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onFocus={() => setFocusedItem(index)}
                  onPointerEnter={() => setFocusedItem(index)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-[#151d2b] focus-visible:bg-[#151d2b]"
                >
                  <span className="block text-[0.94rem] font-medium text-offwhite">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[0.84rem] text-slate">
                    {item.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-midnight-line px-7 py-4 text-[0.85rem]">
            <Link
              href="/automation"
              onClick={() => setOpen(false)}
              className="font-medium text-offwhite transition-colors hover:text-blue-soft"
            >
              View all automation →
            </Link>
            <Link
              href="/#see-automation-at-work"
              onClick={() => setOpen(false)}
              className="text-slate transition-colors hover:text-offwhite"
            >
              See automation at work →
            </Link>
            <Link
              href="/integrations"
              onClick={() => setOpen(false)}
              className="text-slate transition-colors hover:text-offwhite"
            >
              Integrations →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
