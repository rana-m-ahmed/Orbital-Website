"use client";

import { useRef } from "react";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";
import { useSequence } from "@/lib/use-sequence";

const STEPS = [
  { label: "Call", detail: "An enquiry arrives after hours." },
  { label: "Answer", detail: "It is answered and understood." },
  { label: "Book", detail: "An appointment is taken against real availability." },
  { label: "Update", detail: "The record is created and the team is notified." },
];

/**
 * §4 — mobile hero: a simplified vertical sequence.
 * CALL → ANSWER → BOOK → UPDATE. No desktop interface miniatures.
 */
export function HeroMobileSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const seq = useSequence({
    steps: STEPS.length,
    hold: 900,
    startDelay: 900,
    active: inView,
    reducedMotion: reduced,
  });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-midnight-line bg-[#0c121c] p-5"
    >
      <div className="flex items-center justify-between">
        <p className="mono-label text-slate">A call becomes a booking</p>
        <button
          type="button"
          onClick={() => {
            seq.replay();
            track("workflow_replay", { label: "Hero mobile" });
          }}
          className="rounded-lg px-2 py-1 text-[0.76rem] font-medium text-slate"
        >
          Replay
        </button>
      </div>

      <ol className="mt-5 space-y-0">
        {STEPS.map((step, index) => {
          const lit = index <= seq.index;

          return (
            <li key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 size-2.5 shrink-0 rounded-full transition-colors duration-300 ${
                    lit ? "bg-blue" : "bg-[#2c3646]"
                  }`}
                />
                {index < STEPS.length - 1 ? (
                  <span className="relative my-1 w-px flex-1 bg-[#232d3d]">
                    <span
                      className="absolute inset-x-0 top-0 origin-top bg-blue transition-transform duration-[520ms] ease-[var(--ease-orbital)]"
                      style={{
                        bottom: 0,
                        transform:
                          index < seq.index ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />
                  </span>
                ) : null}
              </div>

              <div className={`pb-6 transition-opacity duration-300 ${lit ? "opacity-100" : "opacity-45"}`}>
                <p className="text-[0.92rem] font-medium text-offwhite">
                  {step.label}
                </p>
                <p className="mt-1 text-[0.84rem] leading-snug text-slate">
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p
        className={`rounded-xl px-3 py-2.5 text-[0.85rem] font-medium transition-colors duration-300 ${
          seq.complete ? "bg-blue/14 text-blue-soft" : "bg-[#0e141f] text-slate/60"
        }`}
      >
        Appointment booked ✓
      </p>

      <p aria-live="polite" className="sr-only">
        {STEPS[seq.index].label}
      </p>
    </div>
  );
}
