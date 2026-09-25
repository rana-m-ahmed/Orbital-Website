"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

/**
 * Shared frame for every demonstration (§19).
 * Same typography, palette, blue signal and geometry across primitives —
 * only the interaction language differs per problem.
 */
export function DemoChrome({
  label,
  states,
  index,
  complete,
  onReplay,
  replayLabel = "Replay",
  demoName,
  children,
  tone = "light",
  footer,
}: {
  label: string;
  states: string[];
  index: number;
  complete: boolean;
  onReplay: () => void;
  replayLabel?: string;
  demoName: string;
  children: ReactNode;
  tone?: "light" | "dark";
  footer?: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        dark
          ? "border-midnight-line bg-[#0c121c]"
          : "border-[#e0e5ea] bg-white shadow-[0_20px_50px_-32px_rgba(9,13,20,0.35)]"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 border-b px-5 py-3.5 ${
          dark ? "border-midnight-line" : "border-[#eceff3]"
        }`}
      >
        <p className={`mono-label ${dark ? "text-slate" : "text-text-secondary-light"}`}>
          {label}
        </p>

        <button
          type="button"
          onClick={() => {
            onReplay();
            track("workflow_replay", { label: demoName });
          }}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.78rem] font-medium transition-colors ${
            dark
              ? "text-slate hover:bg-[#151d2b] hover:text-offwhite"
              : "text-text-secondary-light hover:bg-[#f1f4f7] hover:text-midnight"
          }`}
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
          {replayLabel}
        </button>
      </div>

      <div className="relative">{children}</div>

      {/* Plain-English state equivalent — never hidden behind the SVG (§48). */}
      <div
        className={`flex flex-wrap items-center gap-x-2 gap-y-2 border-t px-5 py-4 ${
          dark ? "border-midnight-line" : "border-[#eceff3]"
        }`}
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {states.map((state, stateIndex) => {
            const done = stateIndex < index || (complete && stateIndex === index);
            const current = stateIndex === index;

            return (
              <li key={state} className="flex items-center gap-2">
                <span
                  aria-current={current ? "step" : undefined}
                  className={`rounded-md px-2 py-1 text-[0.76rem] font-medium transition-colors duration-200 ${
                    current
                      ? dark
                        ? "bg-blue/16 text-blue-soft"
                        : "bg-[#3158d8]/10 text-interactive-on-light"
                      : done
                        ? dark
                          ? "text-offwhite/70"
                          : "text-text-primary-light"
                        : dark
                          ? "text-slate/55"
                          : "text-text-secondary-light/60"
                  }`}
                >
                  {state}
                </span>
                {stateIndex < states.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={dark ? "text-slate/40" : "text-[#c3cbd4]"}
                  >
                    ›
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      {footer ? (
        <div
          className={`border-t px-5 py-4 text-[0.85rem] ${
            dark
              ? "border-midnight-line text-slate"
              : "border-[#eceff3] text-text-secondary-light"
          }`}
        >
          {footer}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {`${demoName}: ${states[index]}`}
      </p>
    </div>
  );
}
