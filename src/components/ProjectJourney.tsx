"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const stages = [
  {
    number: "01",
    title: "Understand the work",
    short: "We turn the everyday problem into a clear plan.",
    detail:
      "Show us the calls, enquiries or admin that slow things down. Together, we decide what needs to change and what a useful first version should do.",
    deliverable: "A clear project brief and a practical scope.",
    chips: ["Customer journey", "Priorities agreed", "Clear next step"],
    board: [
      "What happens today?",
      "Where does work get stuck?",
      "What should feel easier?",
    ],
  },
  {
    number: "02",
    title: "Build and test together",
    short: "You see the useful parts taking shape.",
    detail:
      "We design the screens, build the system and test the everyday moments with your team. Feedback has somewhere clear to go before launch.",
    deliverable: "A working system tested around real tasks.",
    chips: ["Screens to review", "Real tasks tested", "Feedback included"],
    board: [
      "Homepage ready for review",
      "Booking flow tested",
      "Team feedback captured",
    ],
  },
  {
    number: "03",
    title: "Launch with confidence",
    short: "Your team knows what happens next.",
    detail:
      "We prepare the handover, walk through the finished system and leave a simple guide. You know who handles the next request and how to get help.",
    deliverable: "A live system, documentation and a clear handover.",
    chips: ["Team walkthrough", "How-to guide", "Support agreed"],
    board: [
      "Ready for day one",
      "Team walkthrough booked",
      "Handover guide shared",
    ],
  },
];

function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default function ProjectJourney() {
  const hydrated = useHydrated();
  const [selected, setSelected] = useState(0);
  return (
    <section className="journey-section" aria-labelledby="journey-title">
      <div className="journey-inner wrap">
        <div className="journey-heading">
          <span className="about-kicker">The project journey</span>
          <h2 id="journey-title">
            A clear path. <span>A useful result.</span>
          </h2>
          <p>
            Three moments, with your team involved where the decisions matter.
          </p>
        </div>
        <div
          className="journey-tabs"
          role="tablist"
          aria-label="Project stages"
          tabIndex={0}
        >
          {stages.map((stage, index) => (
            <button
              type="button"
              key={stage.number}
              role="tab"
              id={`journey-tab-${index}`}
              aria-selected={hydrated ? selected === index : undefined}
              aria-controls={`journey-panel-${index}`}
              tabIndex={hydrated && selected !== index ? -1 : undefined}
              className={hydrated && selected === index ? "is-selected" : ""}
              onClick={() => setSelected(index)}
              disabled={!hydrated}
            >
              <span>{stage.number}</span>
              <strong>{stage.title}</strong>
            </button>
          ))}
        </div>
        <div className="journey-panels">
          {stages.map((stage, index) => (
            <article
              key={stage.number}
              id={`journey-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`journey-tab-${index}`}
              hidden={hydrated && selected !== index}
              className={`journey-panel journey-panel-${index + 1}`}
            >
              <div className="journey-copy">
                <span className="journey-number">{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
                <strong className="journey-deliverable">
                  {stage.deliverable}
                </strong>
              </div>
              <div
                className="journey-board"
                aria-label={`Interactive example: ${stage.title}`}
              >
                <div className="journey-board-top">
                  <span>ORBITAL / project</span>
                  <i>Interactive example</i>
                </div>
                <div className="journey-board-title">
                  <span>Project status</span>
                  <strong>{stage.short}</strong>
                </div>
                <ol>
                  {stage.board.map((item, itemIndex) => (
                    <li key={item}>
                      <span>{index === 0 ? "•" : index === 1 ? "✓" : "✓"}</span>
                      {item}
                      {itemIndex === 0 && <i>Now</i>}
                    </li>
                  ))}
                </ol>
                <div className="journey-chips">
                  {stage.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="journey-note">
          Illustrative example. Every project is shaped around the people and
          work involved.
        </p>
      </div>
    </section>
  );
}
