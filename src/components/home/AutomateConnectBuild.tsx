"use client";

import { useRef } from "react";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";

const LAYERS = [
  {
    key: "automate",
    title: "Automate",
    statement: "Let routine work run itself.",
    detail:
      "Calls, follow-up, scheduling, support, admin and reporting — the work that repeats.",
  },
  {
    key: "connect",
    title: "Connect",
    statement: "Make your tools work together.",
    detail:
      "CRM, email, calendars, payments, databases and APIs, joined so information stops being re-typed.",
  },
  {
    key: "build",
    title: "Build",
    statement: "Get software designed around your business.",
    detail:
      "Internal tools, dashboards, portals and apps — only where nothing existing will do the job.",
  },
];

/**
 * §4 — 05 AUTOMATE → CONNECT → BUILD.
 * One continuous composition. One signal moves through three layers once as
 * the section enters. Not three animated cards.
 */
export function AutomateConnectBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const run = inView || reduced;

  return (
    <div ref={ref} className="relative mt-16">
      {/* The single continuous route behind all three layers. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full md:block"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 120h1200" stroke="#dde3e9" strokeWidth="1.4" />
        <path
          d="M0 120h1200"
          stroke="var(--color-blue)"
          strokeWidth="1.6"
          strokeDasharray="1200"
          strokeDashoffset={run ? 0 : 1200}
          style={{
            transition: reduced
              ? "none"
              : "stroke-dashoffset 1400ms var(--ease-orbital) 180ms",
          }}
        />
      </svg>

      <ol className="relative grid gap-px overflow-hidden rounded-2xl border border-[#e0e5ea] bg-[#e0e5ea] md:grid-cols-3">
        {LAYERS.map((layer, index) => (
          <li
            key={layer.key}
            className="relative flex flex-col bg-white px-7 py-9 md:px-8 md:py-11"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full transition-colors duration-500 ${
                  run ? "bg-blue" : "bg-[#dde3e9]"
                }`}
                style={{ transitionDelay: `${300 + index * 420}ms` }}
              />
              <span className="mono-label text-text-secondary-light">
                0{index + 1}
              </span>
            </div>

            <h3 className="display-3 mt-6">{layer.title}</h3>
            <p className="mt-3 text-[1.05rem] font-medium text-text-primary-light">
              {layer.statement}
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-text-secondary-light">
              {layer.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
