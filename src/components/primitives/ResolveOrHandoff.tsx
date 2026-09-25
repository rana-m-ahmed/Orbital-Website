"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";

type Case = {
  id: string;
  message: string;
  route: "resolve" | "handoff";
  result: string;
  reason: string;
};

const CASES: Case[] = [
  {
    id: "delivery",
    message: "Where is my order? It was supposed to arrive yesterday.",
    route: "resolve",
    result: "Tracked, explained and a new delivery date confirmed.",
    reason: "The answer exists in a system the automation can read.",
  },
  {
    id: "hours",
    message: "Are you open on Sunday, and do you cover Rawalpindi?",
    route: "resolve",
    result: "Answered immediately from your own published information.",
    reason: "A routine question with one correct answer.",
  },
  {
    id: "refund",
    message: "I've been charged twice and I want my money back today.",
    route: "handoff",
    result: "Passed to a person with the order and billing history attached.",
    reason: "Money is involved, and the customer is unhappy.",
  },
  {
    id: "complaint",
    message: "This is the third time I've had to chase this. I want to speak to someone.",
    route: "handoff",
    result: "Escalated to a named person, with the full history summarised.",
    reason: "A direct request for a human is always honoured.",
  },
];

/**
 * §23 — Customer Support's one signature interaction (§20).
 * A request enters, and the split shows which way it goes and why.
 * Interaction-driven, not autoplaying: the visitor chooses the case.
 */
export function ResolveOrHandoff() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState({ forCase: -1, stage: 0 });
  const reduced = usePrefersReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const current = CASES[active];
  const stage = reduced ? 2 : progress.forCase === active ? progress.stage : 0;

  useEffect(() => {
    if (reduced) return;

    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setProgress({ forCase: active, stage: 1 }), 420),
      setTimeout(() => setProgress({ forCase: active, stage: 2 }), 1080),
    ];

    return () => timers.current.forEach(clearTimeout);
  }, [active, reduced]);

  const resolving = current.route === "resolve";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white">
      <div className="border-b border-[#eceff3] p-5">
        <p className="mono-label text-text-secondary-light">
          Pick an incoming message
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {CASES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === active}
              onClick={() => {
                setActive(index);
                track("workflow_demo_select", { label: `support:${item.id}` });
              }}
              className={`max-w-full rounded-xl border px-3.5 py-2.5 text-left text-[0.86rem] leading-snug transition-colors duration-150 ${
                index === active
                  ? "border-[#3158d8]/40 bg-[#f4f7ff] text-text-primary-light"
                  : "border-[#e7ebf0] bg-white text-text-secondary-light hover:border-[#c8d2de]"
              }`}
            >
              {item.message}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-center gap-6 px-5 py-8 md:grid-cols-[minmax(0,1fr)_260px]">
        <svg
          aria-hidden="true"
          viewBox="0 0 640 150"
          className="hidden w-full md:block"
          fill="none"
        >
          {/* the request enters */}
          <path d="M20 75h180" stroke="#dde3e9" strokeWidth="1.4" />
          <path
            d="M20 75h180"
            stroke="var(--color-blue)"
            strokeWidth="1.6"
            strokeDasharray="180"
            strokeDashoffset={stage >= 1 ? 0 : 180}
            style={{ transition: "stroke-dashoffset 420ms var(--ease-orbital)" }}
          />

          {/* the split */}
          <path
            d="M200 75c60 0 60-52 120-52h300"
            stroke={stage >= 2 && resolving ? "var(--color-blue)" : "#dde3e9"}
            strokeWidth="1.5"
            style={{ transition: "stroke 420ms var(--ease-orbital)" }}
          />
          <path
            d="M200 75c60 0 60 52 120 52h300"
            stroke={stage >= 2 && !resolving ? "var(--color-blue)" : "#dde3e9"}
            strokeWidth="1.5"
            style={{ transition: "stroke 420ms var(--ease-orbital)" }}
          />

          <circle
            cx="200"
            cy="75"
            r="5.5"
            fill="#ffffff"
            stroke={stage >= 1 ? "var(--color-blue)" : "#c3cbd4"}
            strokeWidth="1.6"
            style={{ transition: "stroke 300ms" }}
          />

          <text x="196" y="46" fill="#5e6876" fontSize="11" textAnchor="middle">
            Decide
          </text>
        </svg>

        <div className="space-y-3">
          <Outcome
            title="Resolved"
            active={stage >= 2 && resolving}
            detail="Answered now, with the customer free to go."
          />
          <Outcome
            title="Handed to a person"
            active={stage >= 2 && !resolving}
            detail="Escalated with everything already said attached."
          />
        </div>
      </div>

      <div className="grid gap-px border-t border-[#eceff3] bg-[#eceff3] sm:grid-cols-2">
        <div className="bg-white p-5">
          <p className="mono-label text-text-secondary-light">What happens</p>
          <p
            className="mt-2 text-[0.95rem] text-text-primary-light"
            aria-live="polite"
          >
            {current.result}
          </p>
        </div>
        <div className="bg-white p-5">
          <p className="mono-label text-text-secondary-light">Why</p>
          <p className="mt-2 text-[0.95rem] text-text-secondary-light">
            {current.reason}
          </p>
        </div>
      </div>
    </div>
  );
}

function Outcome({
  title,
  detail,
  active,
}: {
  title: string;
  detail: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 transition-colors duration-[420ms] ${
        active
          ? "border-[#3158d8]/40 bg-[#f4f7ff]"
          : "border-[#e7ebf0] bg-white opacity-55"
      }`}
    >
      <p className="text-[0.9rem] font-medium">{title}</p>
      <p className="mt-1 text-[0.82rem] leading-snug text-text-secondary-light">
        {detail}
      </p>
    </div>
  );
}
