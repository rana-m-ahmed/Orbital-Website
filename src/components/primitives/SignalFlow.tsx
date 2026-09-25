"use client";

import { useRef } from "react";
import { DemoChrome } from "./DemoChrome";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";
import { useSequence } from "@/lib/use-sequence";

export type FlowNode = {
  /** Short plain-English state label, e.g. "Qualify". */
  label: string;
  /** One line of detail shown inside the node once it is active. */
  detail: string;
  /** Marks the point where automation hands context to a person (§10). */
  handoff?: boolean;
};

/**
 * Primitive A — SignalFlow (§19).
 * Trigger → Route → Action → Result.
 * Used for lead automation, operations, integrations and process.
 *
 * Server-rendered markup is already the complete, readable final state, so
 * the graphic stands up with no JavaScript at all (§37, §41).
 */
export function SignalFlow({
  label,
  nodes,
  demoName,
  tone = "light",
  hold = 760,
  startDelay = 850,
  footer,
}: {
  label: string;
  nodes: FlowNode[];
  demoName: string;
  tone?: "light" | "dark";
  hold?: number;
  startDelay?: number;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const seq = useSequence({
    steps: nodes.length,
    hold,
    startDelay,
    active: inView,
    reducedMotion: reduced,
  });

  const dark = tone === "dark";

  return (
    <div ref={ref}>
      <DemoChrome
        label={label}
        states={nodes.map((node) => node.label)}
        index={seq.index}
        complete={seq.complete}
        onReplay={seq.replay}
        demoName={demoName}
        tone={tone}
        footer={footer}
      >
        <ol className="flex flex-col gap-0 p-5 sm:p-7 md:flex-row md:items-stretch">
          {nodes.map((node, index) => {
            const active = index === seq.index;
            const passed = index < seq.index || seq.complete;
            const lit = active || passed;

            return (
              <li
                key={node.label}
                className="flex flex-1 flex-col md:flex-row md:items-center"
              >
                <div
                  className={`relative flex-1 rounded-xl border px-4 py-4 transition-[border-color,background-color,transform] duration-[420ms] ease-[var(--ease-orbital)] ${
                    lit
                      ? dark
                        ? "border-blue/45 bg-[#101a2b]"
                        : "border-[#3158d8]/35 bg-[#f4f7ff]"
                      : dark
                        ? "border-midnight-line bg-[#0e141f]"
                        : "border-[#e7ebf0] bg-[#fafbfc]"
                  } ${active ? "md:-translate-y-0.5" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`relative inline-flex size-2 shrink-0 rounded-full transition-colors duration-300 ${
                        lit
                          ? "bg-blue"
                          : dark
                            ? "bg-[#2c3646]"
                            : "bg-[#cfd6de]"
                      }`}
                    >
                      {active && !reduced ? (
                        <span
                          className="absolute inset-0 rounded-full bg-blue"
                          style={{
                            animation:
                              "orbital-pulse 900ms var(--ease-orbital) forwards",
                          }}
                        />
                      ) : null}
                    </span>

                    <span
                      className={`text-[0.88rem] font-medium ${
                        dark ? "text-offwhite" : "text-text-primary-light"
                      }`}
                    >
                      {node.label}
                    </span>

                    {node.handoff ? (
                      <span
                        className={`ml-auto rounded px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                          dark
                            ? "bg-[#1b2434] text-slate"
                            : "bg-[#eceff3] text-text-secondary-light"
                        }`}
                      >
                        Person
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={`mt-2 text-[0.82rem] leading-snug transition-opacity duration-300 ${
                      lit ? "opacity-100" : "opacity-55"
                    } ${dark ? "text-slate" : "text-text-secondary-light"}`}
                  >
                    {node.detail}
                  </p>
                </div>

                {index < nodes.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="relative my-1 ml-[18px] block h-5 w-px shrink-0 md:mx-2.5 md:my-0 md:h-px md:w-7"
                  >
                    <span
                      className={`absolute inset-0 ${
                        dark ? "bg-[#232d3d]" : "bg-[#dde3e9]"
                      }`}
                    />
                    <span
                      className="absolute inset-0 origin-top bg-blue transition-transform duration-[520ms] ease-[var(--ease-orbital)] md:origin-left"
                      style={{
                        transform:
                          index < seq.index || seq.complete
                            ? "scale3d(1, 1, 1)"
                            : "scale3d(0, 0, 1)",
                        transformOrigin: "top left",
                      }}
                    />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </DemoChrome>
    </div>
  );
}
