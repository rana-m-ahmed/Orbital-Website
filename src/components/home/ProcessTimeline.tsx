"use client";
import { useState } from "react";

const steps = [
  [
    "Understand",
    "We map how the work happens today and identify the problem worth fixing.",
    "PROCESS MAP",
  ],
  [
    "Define",
    "We agree the scope, responsibilities, safeguards, and what success means.",
    "SCOPE SHEET",
  ],
  [
    "Build",
    "You review working versions while the system takes shape around real use.",
    "INTERFACE REVIEW",
  ],
  [
    "Launch & support",
    "We test, document, hand over, and agree how support should work.",
    "HANDOVER CHECKLIST",
  ],
] as const;
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  return (
    <div className="process-timeline">
      <div className="process-steps">
        {steps.map(([title, body], i) => (
          <div className={active === i ? "active" : ""} key={title}>
            <button aria-expanded={active === i} onClick={() => setActive(i)}>
              <span>0{i + 1}</span>
              <b>{title}</b>
              <i>{active === i ? "−" : "+"}</i>
            </button>
            <p>{body}</p>
            {active === i && (
              <div className="mobile-process-preview">
                <Deliverable index={i} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="desktop-process-preview">
        <Deliverable index={active} />
      </div>
    </div>
  );
}
function Deliverable({ index }: { index: number }) {
  return (
    <div className={`deliverable deliverable-${index}`}>
      <div className="deliverable-head">
        <span>ORBITAL / SAMPLE DELIVERABLE</span>
        <b>{steps[index][2]}</b>
      </div>
      {index === 0 && (
        <div className="process-map">
          <span>Enquiry</span>
          <i>→</i>
          <span>Inbox</span>
          <i>→</i>
          <span>Owner</span>
          <i>→</i>
          <span>Follow-up</span>
          <b>Friction: manual handoff</b>
        </div>
      )}
      {index === 1 && (
        <div className="scope-sheet">
          {[
            "Problem and desired outcome",
            "Included workflows",
            "Human checkpoints",
            "Acceptance criteria",
          ].map((x, i) => (
            <p key={x}>
              <span>0{i + 1}</span>
              {x}
              <b>{i < 2 ? "DEFINED" : "TO AGREE"}</b>
            </p>
          ))}
        </div>
      )}
      {index === 2 && (
        <div className="interface-review">
          <div>
            <span>VERSION 03</span>
            <b>Enquiry routing</b>
          </div>
          <p>
            <i />
            New enquiry captured
          </p>
          <p>
            <i />
            Owner assigned
          </p>
          <p className="review-note">1 open review comment</p>
        </div>
      )}
      {index === 3 && (
        <div className="handover-list">
          {[
            "Production checks complete",
            "Team walkthrough",
            "System documentation",
            "Support route agreed",
          ].map((x, i) => (
            <p key={x}>
              <i>{i < 2 ? "✓" : ""}</i>
              {x}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
