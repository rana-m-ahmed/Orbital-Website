"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
const examples = [
  {
    id: "enquiries",
    label: "Enquiries",
    incoming: "A new enquiry comes in.",
    message:
      "“We’re looking for help with our customer bookings. Can we arrange a call?”",
    steps: [
      "Capture the details",
      "Match the right person",
      "Arrange the next step",
    ],
    result: "A conversation, ready to happen.",
    detail: "Your team gets the context. Your customer gets a response.",
    tag: "Follow-up arranged",
  },
  {
    id: "support",
    label: "Customer support",
    incoming: "A customer needs an answer.",
    message: "“Can you update the delivery address on my order?”",
    steps: [
      "Understand the request",
      "Check the business rules",
      "Route with full context",
    ],
    result: "The right help. Without the wait.",
    detail: "Routine questions get answers. Exceptions go to a person.",
    tag: "Handed to your team",
  },
  {
    id: "operations",
    label: "Operations",
    incoming: "Another invoice arrives.",
    message:
      "“Invoice attached for this month’s supplies. Please confirm receipt.”",
    steps: [
      "Read the document",
      "Match the purchase order",
      "Request human approval",
    ],
    result: "Ready for approval. Already organised.",
    detail: "The information is prepared. Your team stays in control.",
    tag: "Approval requested",
  },
];
export function BusinessDemo() {
  const [selected, setSelected] = useState(0);
  const [run, setRun] = useState(0);
  const demo = examples[selected];
  return (
    <div className="business-demo">
      <div
        role="tablist"
        aria-label="Automation examples"
        className="demo-tabs"
      >
        {examples.map((item, i) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={selected === i}
            aria-controls="business-demo-panel"
            tabIndex={selected === i ? 0 : -1}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (i + 1) % 3
                  : e.key === "ArrowLeft"
                    ? (i + 2) % 3
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : null;
              if (next !== null) {
                e.preventDefault();
                setSelected(next);
                document.getElementById(`tab-${examples[next].id}`)?.focus();
              }
            }}
            onClick={() => {
              setSelected(i);
              track("workflow_demo_select", { label: item.id });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="business-demo-panel"
        role="tabpanel"
        aria-labelledby={`tab-${demo.id}`}
        className="demo-stage"
        tabIndex={0}
      >
        <div className="demo-stage-top">
          <span>
            <span className="signal-dot" /> ORBITAL / WORKFLOW STUDIO
          </span>
          <span>Illustrative demonstration</span>
        </div>
        <div className="demo-columns" key={`${selected}-${run}`}>
          <div className="demo-input">
            <span className="demo-overline">01 / THE REQUEST</span>
            <h3>{demo.incoming}</h3>
            <div className="message-card">
              <span className="message-avatar">↙</span>
              <div>
                <span className="message-sender">Incoming message</span>
                <p>{demo.message}</p>
              </div>
            </div>
            <span className="demo-footnote">
              Your existing channels. Connected.
            </span>
          </div>
          <div className="demo-route">
            <span className="demo-overline">02 / THE SYSTEM</span>
            {demo.steps.map((step, i) => (
              <div
                className="demo-step"
                style={{ animationDelay: `${i * 150}ms` }}
                key={step}
              >
                <span>0{i + 1}</span>
                {step}
                <b aria-hidden="true">✓</b>
              </div>
            ))}
          </div>
          <div className="demo-output">
            <span className="demo-overline">03 / THE RESULT</span>
            <div className="result-check" aria-hidden="true">
              ↗
            </div>
            <h3>{demo.result}</h3>
            <p>{demo.detail}</p>
            <span className="result-tag">
              <span />
              {demo.tag}
            </span>
          </div>
        </div>
        <div className="demo-stage-bottom">
          <span>
            Automation handles the routine. People make the decisions.
          </span>
          <button
            onClick={() => {
              setRun(run + 1);
              track("workflow_replay", { label: demo.id });
            }}
          >
            Replay <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </div>
  );
}
