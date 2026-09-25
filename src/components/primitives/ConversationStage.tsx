"use client";

import { useRef } from "react";
import { DemoChrome } from "./DemoChrome";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";
import { useSequence } from "@/lib/use-sequence";

export type Turn = {
  /** Who is speaking or acting. */
  from: "caller" | "agent" | "system" | "person";
  /** Short plain-English state label shown in the state rail. */
  state: string;
  /** What is said, or what the system did. */
  text: string;
  /** Terminal state — renders the completion treatment and stops. */
  done?: boolean;
};

/**
 * Primitive B — ConversationStage (§19).
 * Waveform · transcript · action state · handoff state · completion state.
 * Used for the AI receptionist and customer support.
 *
 * Plays once, then holds on its completion state. It never loops (§4).
 */
export function ConversationStage({
  label,
  caller,
  turns,
  demoName,
  tone = "dark",
  hold = 760,
  startDelay = 900,
  footer,
}: {
  label: string;
  caller: string;
  turns: Turn[];
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
    steps: turns.length,
    hold,
    startDelay,
    active: inView,
    reducedMotion: reduced,
  });

  const dark = tone === "dark";
  const current = turns[seq.index];
  const speaking = current?.from === "caller" || current?.from === "agent";

  return (
    <div ref={ref}>
      <DemoChrome
        label={label}
        states={turns.map((turn) => turn.state)}
        index={seq.index}
        complete={seq.complete}
        onReplay={seq.replay}
        demoName={demoName}
        tone={tone}
        footer={footer}
      >
        <div className="grid gap-0 md:grid-cols-[minmax(0,224px)_minmax(0,1fr)]">
          {/* Call surface */}
          <div
            className={`flex flex-col justify-between gap-6 border-b p-5 md:border-b-0 md:border-r ${
              dark ? "border-midnight-line" : "border-[#eceff3]"
            }`}
          >
            <div>
              <p
                className={`mono-label ${
                  seq.complete
                    ? dark
                      ? "text-slate"
                      : "text-text-secondary-light"
                    : "text-blue"
                }`}
              >
                {seq.complete ? "Call ended" : "Live call"}
              </p>
              <p
                className={`mt-2 text-[0.95rem] font-medium ${
                  dark ? "text-offwhite" : "text-text-primary-light"
                }`}
              >
                {caller}
              </p>
              <p
                className={`mt-1 text-[0.8rem] ${
                  dark ? "text-slate" : "text-text-secondary-light"
                }`}
              >
                Answered by ORBITAL
              </p>

              <Waveform
                active={speaking && seq.playing && !reduced}
                dark={dark}
                className="mt-5"
              />
            </div>

            <dl
              className={`space-y-2.5 border-t pt-4 text-[0.8rem] ${
                dark ? "border-midnight-line" : "border-[#eceff3]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <dt className={dark ? "text-slate" : "text-text-secondary-light"}>
                  Handled by
                </dt>
                <dd
                  className={`font-medium ${
                    current?.from === "person"
                      ? dark
                        ? "text-offwhite"
                        : "text-text-primary-light"
                      : "text-blue"
                  }`}
                >
                  {current?.from === "person" ? "A person" : "Automation"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className={dark ? "text-slate" : "text-text-secondary-light"}>
                  Outcome
                </dt>
                <dd
                  className={`font-medium ${
                    seq.complete
                      ? "text-blue"
                      : dark
                        ? "text-slate/70"
                        : "text-text-secondary-light/70"
                  }`}
                >
                  {seq.complete ? "Resolved" : "In progress"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Transcript + action states */}
          <div className="min-h-[268px] space-y-2.5 p-5">
            {turns.slice(0, seq.index + 1).map((turn, index) => {
              const isLast = index === seq.index;

              return (
                /**
                 * CSS-driven rather than a hydrated animation component: the
                 * server already renders each turn at full opacity, so the
                 * transcript is complete and readable with no JavaScript
                 * at all (§37, §41).
                 */
                <div
                  key={turn.state}
                  className="flex gap-3 transition-opacity duration-300 ease-[var(--ease-orbital)]"
                  style={{
                    opacity: isLast ? 1 : 0.58,
                    animation: reduced
                      ? undefined
                      : "orbital-rise 280ms var(--ease-orbital) both",
                  }}
                >
                  <Speaker from={turn.from} dark={dark} />

                  <div
                    className={`max-w-[min(100%,540px)] flex-1 rounded-xl px-3.5 py-2.5 text-[0.86rem] leading-snug ${bubble(
                      turn,
                      dark,
                    )}`}
                  >
                    {turn.done ? (
                      <span className="inline-flex items-center gap-2 font-medium">
                        {turn.text}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 14 14"
                          className="size-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m2.5 7.5 3 3 6-7" />
                        </svg>
                      </span>
                    ) : (
                      turn.text
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DemoChrome>
    </div>
  );
}

function bubble(turn: Turn, dark: boolean) {
  if (turn.done) {
    return dark
      ? "bg-blue/14 text-blue-soft"
      : "bg-[#3158d8]/10 text-interactive-on-light";
  }
  if (turn.from === "system") {
    return dark
      ? "border border-midnight-line bg-[#0e1520] text-slate"
      : "border border-[#e7ebf0] bg-[#fafbfc] text-text-secondary-light";
  }
  if (turn.from === "person") {
    return dark
      ? "border border-[#2c3646] bg-[#141c29] text-offwhite/85"
      : "border border-[#dde3e9] bg-[#f1f4f7] text-text-primary-light";
  }
  return dark
    ? "bg-[#141c29] text-offwhite/92"
    : "bg-[#f4f6f8] text-text-primary-light";
}

function Speaker({ from, dark }: { from: Turn["from"]; dark: boolean }) {
  const map: Record<Turn["from"], string> = {
    caller: "Caller",
    agent: "ORBITAL",
    system: "System",
    person: "Team",
  };

  return (
    <span
      className={`mt-1 w-[52px] shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${
        from === "agent"
          ? "text-blue"
          : dark
            ? "text-slate/70"
            : "text-text-secondary-light/75"
      }`}
    >
      {map[from]}
    </span>
  );
}

function Waveform({
  active,
  dark,
  className = "",
}: {
  active: boolean;
  dark: boolean;
  className?: string;
}) {
  const bars = [10, 22, 34, 18, 28, 40, 24, 14, 30, 20, 36, 16];

  return (
    <div
      aria-hidden="true"
      className={`flex h-11 items-end gap-[3px] ${className}`}
      data-active={active}
    >
      {bars.map((height, index) => (
        <span
          key={index}
          className={`w-[3px] rounded-full transition-[height,opacity] duration-300 ease-[var(--ease-orbital)] ${
            active ? "bg-blue" : dark ? "bg-[#2c3646]" : "bg-[#d3dae1]"
          }`}
          style={{
            height: active ? `${height}px` : "4px",
            opacity: active ? 0.55 + (index % 4) * 0.15 : 1,
            transitionDelay: `${index * 22}ms`,
          }}
        />
      ))}
    </div>
  );
}
