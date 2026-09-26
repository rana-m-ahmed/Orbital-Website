"use client";

import { useState } from "react";
import { SystemInterface, type SystemVisual } from "./SystemVisuals";

const scenarios: {
  id: SystemVisual;
  title: string;
  problem: string;
  result: string;
}[] = [
  {
    id: "calls",
    title: "Missed calls",
    problem: "Calls reach voicemail while your team is working.",
    result: "Every caller gets an answer, a next step, or a person.",
  },
  {
    id: "leads",
    title: "Slow follow-up",
    problem: "New enquiries wait in a shared inbox for somebody to notice.",
    result: "Each lead is acknowledged, qualified, and given an owner.",
  },
  {
    id: "support",
    title: "Repeated questions",
    problem: "Your team answers the same straightforward questions every day.",
    result: "Routine answers are immediate; judgement stays with your people.",
  },
  {
    id: "admin",
    title: "Repetitive admin",
    problem: "Details are copied from documents into multiple systems by hand.",
    result:
      "Information is prepared automatically and reviewed before it moves.",
  },
];

export function ScenarioTheatre() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"today" | "orbital">("orbital");
  const [playing, setPlaying] = useState(false);
  const item = scenarios[active];
  return (
    <div className="scenario-theatre">
      <div
        className="scenario-selector"
        role="tablist"
        aria-label="Business problems"
      >
        {scenarios.map((scenario, index) => (
          <button
            key={scenario.id}
            role="tab"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                return;
              event.preventDefault();
              const next =
                (index +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  scenarios.length) %
                scenarios.length;
              setActive(next);
              (
                event.currentTarget.parentElement?.querySelectorAll(
                  '[role="tab"]',
                )[next] as HTMLElement
              )?.focus();
            }}
            onClick={() => {
              setActive(index);
              setPlaying(false);
            }}
          >
            <span>0{index + 1}</span>
            {scenario.title}
            <i>→</i>
          </button>
        ))}
      </div>
      <div className="scenario-stage">
        <div className="scenario-toolbar">
          <div className="comparison-switch" aria-label="Compare workflow">
            <button
              className={mode === "today" ? "active" : ""}
              onClick={() => setMode("today")}
            >
              Today
            </button>
            <button
              className={mode === "orbital" ? "active" : ""}
              onClick={() => setMode("orbital")}
            >
              With ORBITAL
            </button>
          </div>
          <button
            className="play-example"
            onClick={() => setPlaying(!playing)}
            aria-pressed={playing}
          >
            <span>{playing ? "Ⅱ" : "▶"}</span>
            {playing ? "Pause example" : "Play example"}
          </button>
        </div>
        {mode === "today" ? (
          <div className="today-state">
            <span className="today-noise">
              01
              <br />
              03
              <br />
              07
              <br />
              11
            </span>
            <div>
              <small>CURRENT PROCESS</small>
              <h3>{item.problem}</h3>
              <p>
                Work depends on somebody seeing, remembering, copying, and
                following up.
              </p>
            </div>
          </div>
        ) : (
          <div className={playing ? "is-playing" : ""}>
            <SystemInterface variant={item.id} />
          </div>
        )}
        <div className="scenario-outcome">
          <span>PROPOSED CHANGE</span>
          <p>{item.result}</p>
          <a href={`/contact?service=${item.id}`}>
            Talk about this workflow <b>↗</b>
          </a>
        </div>
      </div>
    </div>
  );
}
