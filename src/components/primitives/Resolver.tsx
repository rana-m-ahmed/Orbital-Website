"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";

/**
 * Primitive D — Resolver (§19).
 * Manual, fragmented work reorganises into one automated route.
 * Used for before/after and fragmented → unified.
 *
 * Two layers cross-fade rather than morphing paths: it degrades cleanly, it
 * animates only transform and opacity (§35), and the resolved route is the
 * state the graphic rests in.
 */
export function Resolver({
  before,
  after,
  outcome,
  steps,
  demoName,
}: {
  before: string;
  after: string;
  outcome: string;
  /** The automated route, in plain language. */
  steps: string[];
  demoName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [settled, setSettled] = useState(false);
  const resolved = settled || reduced;

  /* The selector unmounts the inactive panel, so state resets with it. */
  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(timer);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white shadow-[0_20px_50px_-32px_rgba(9,13,20,0.35)]"
    >
      <div className="grid gap-px bg-[#eceff3] md:grid-cols-2">
        <div className="bg-white px-5 py-5">
          <p className="mono-label text-text-secondary-light">Today</p>
          <p className="mt-2.5 text-[0.95rem] leading-snug text-text-primary-light">
            {before}
          </p>
        </div>
        <div className="bg-white px-5 py-5">
          <p className="mono-label text-interactive-on-light">With ORBITAL</p>
          <p className="mt-2.5 text-[0.95rem] leading-snug text-text-primary-light">
            {after}
          </p>
        </div>
      </div>

      <div className="relative border-y border-[#eceff3] bg-[#fafbfc] px-5 py-7">
        <div className="relative mx-auto h-[126px] w-full max-w-[640px]">
          {/* Manual: fragmented, doubling back, one route that stops. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 640 126"
            className="absolute inset-0 size-full transition-opacity duration-[420ms] ease-[var(--ease-orbital)]"
            style={{ opacity: resolved ? 0 : 1 }}
            fill="none"
          >
            <path
              d="M32 26c78 0 96 34 160 34s86-30 150-30 96 26 160 26"
              stroke="#c3cbd4"
              strokeWidth="1.4"
              strokeDasharray="5 5"
            />
            <path
              d="M32 63c60 0 74 36 132 36s78-56 142-56 84 40 148 40"
              stroke="#c3cbd4"
              strokeWidth="1.4"
              strokeDasharray="5 5"
            />
            <path
              d="M32 100c54 0 84-22 138-22s70 22 118 22"
              stroke="#c3cbd4"
              strokeWidth="1.4"
              strokeDasharray="5 5"
            />
            {[
              [32, 26],
              [192, 60],
              [342, 30],
              [164, 99],
              [306, 43],
              [288, 100],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.4" fill="#c3cbd4" />
            ))}
            <g transform="translate(288 100)">
              <path
                d="M-5-5 5 5M5-5-5 5"
                stroke="#9aa0a6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* Automated: one route, resolved, then still. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 640 126"
            className="absolute inset-0 size-full transition-opacity duration-[460ms] ease-[var(--ease-orbital)]"
            style={{ opacity: resolved ? 1 : 0 }}
            fill="none"
          >
            <path
              d="M32 63h576"
              stroke="#dde3e9"
              strokeWidth="1.4"
            />
            <path
              d="M32 63h576"
              stroke="var(--color-blue)"
              strokeWidth="1.6"
              strokeDasharray="576"
              strokeDashoffset={resolved ? 0 : 576}
              style={{
                transition:
                  "stroke-dashoffset 760ms var(--ease-orbital) 120ms",
              }}
            />
            {steps.map((step, index) => {
              const x = 32 + (576 / Math.max(steps.length - 1, 1)) * index;
              return (
                <g key={step}>
                  <circle
                    cx={x}
                    cy={63}
                    r="5"
                    fill="#ffffff"
                    stroke="var(--color-blue)"
                    strokeWidth="1.6"
                  />
                  <circle cx={x} cy={63} r="2" fill="var(--color-blue)" />
                </g>
              );
            })}
          </svg>
        </div>

        <ol className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`rounded-md px-2 py-1 text-[0.78rem] font-medium transition-colors duration-300 ${
                  resolved
                    ? "bg-[#3158d8]/10 text-interactive-on-light"
                    : "text-text-secondary-light/70"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="text-[#c3cbd4]">
                  ›
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => {
            setSettled(false);
            track("workflow_replay", { label: demoName });
            window.setTimeout(() => setSettled(true), 260);
          }}
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.76rem] font-medium text-text-secondary-light transition-colors hover:bg-white hover:text-midnight"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 14 14"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.2 7a5.2 5.2 0 1 1-1.6-3.75M12.4 1.4v2.9H9.5" />
          </svg>
          Replay
        </button>
      </div>

      <div className="px-5 py-5">
        <p className="mono-label text-text-secondary-light">Outcome</p>
        <p className="mt-2 text-[0.95rem] text-text-primary-light">{outcome}</p>
      </div>
    </div>
  );
}
