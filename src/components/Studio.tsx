import Link from "next/link";

export type VisualKind =
  "call" | "followup" | "records" | "dashboard" | "booking";
export const offerings: {
  slug: string;
  name: string;
  title: string;
  copy: string;
  kind: VisualKind;
  capabilities: [string, string][];
  example: string;
}[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    title: "Answer calls. Book appointments.",
    copy: "Help callers get answers, leave their details and find a time to visit.",
    kind: "call",
    capabilities: [
      [
        "Answer common questions",
        "Give callers information you have approved, such as opening hours and services.",
      ],
      [
        "Arrange appointments",
        "Collect the details needed for a booking and check available times.",
      ],
      [
        "Bring in your team",
        "Pass on requests that need a person, with a clear summary of the conversation.",
      ],
    ],
    example:
      "A customer calls to arrange a visit. Their details and preferred time reach your team together.",
  },
  {
    slug: "ai-calling-agents",
    name: "AI Calling Agents",
    title: "Follow up with customers.",
    copy: "Build permission-based calling tools for reminders and customer follow-ups.",
    kind: "followup",
    capabilities: [
      [
        "Send timely reminders",
        "Help customers remember an appointment or respond to an earlier enquiry.",
      ],
      [
        "Capture the response",
        "Keep the customer’s answer with their record so your team knows what happens next.",
      ],
      [
        "Respect customer choices",
        "Build in identification, opt-outs and a clear route to a person.",
      ],
    ],
    example:
      "A customer has asked for a callback about their quote. Their response tells the team when to call.",
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    title: "Cut repetitive admin.",
    copy: "Move details between your tools so your team spends less time copying and chasing.",
    kind: "records",
    capabilities: [
      [
        "Collect details once",
        "Take information from an enquiry and put it where your team needs it.",
      ],
      [
        "Assign the next task",
        "Send a new request to the right person with the details attached.",
      ],
      [
        "Keep track of problems",
        "Flag missing information and failed updates for someone to review.",
      ],
    ],
    example:
      "A new enquiry becomes a customer record and a follow-up task, without copying the same details twice.",
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    title: "Give your team better tools.",
    copy: "Bring bookings, tasks and customer information into a tool built for your business.",
    kind: "dashboard",
    capabilities: [
      [
        "See the day’s work",
        "Give your team a shared view of appointments, outstanding tasks and customer requests.",
      ],
      [
        "Make updates simply",
        "Design the screens around the actions people take every day.",
      ],
      [
        "Set the right access",
        "Decide who can see information, change records and manage the tool.",
      ],
    ],
    example:
      "A team opens one dashboard to see today’s visits, assign work and check what still needs attention.",
  },
];

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Wave() {
  return (
    <div className="studio-wave" aria-hidden="true">
      {[14, 26, 40, 22, 56, 72, 38, 58, 28, 44, 64, 32, 18, 38, 24, 12].map(
        (h, i) => (
          <i key={i} style={{ height: h }} />
        ),
      )}
    </div>
  );
}
function Check() {
  return (
    <span className="check" aria-hidden="true">
      ✓
    </span>
  );
}

export function StudioVisual({
  kind,
  large = false,
}: {
  kind: VisualKind;
  large?: boolean;
}) {
  return (
    <div
      className={`studio-visual visual-${kind}${large ? " visual-large" : ""}`}
    >
      <span className="demo-label">Internal demo</span>
      <div className="art-orbit" aria-hidden="true" />
      {kind === "call" && (
        <div className="call-composition">
          <div className="call-disc" aria-hidden="true">
            ↗
          </div>
          <div className="mock-panel call-panel">
            <div className="mock-top">
              <span className="avatar">AK</span>
              <div>
                <strong>Alex Khan</strong>
                <span>Appointment enquiry</span>
              </div>
              <span className="call-icon" aria-hidden="true">
                ⌕
              </span>
            </div>
            <Wave />
            <div className="speech">“Can I book a visit for Tuesday?”</div>
            <div className="mock-answer">
              Of course. What time works for you?
            </div>
          </div>
          <div className="floating-ticket">
            <Check />
            <div>
              <strong>Tuesday, 2:30 pm</strong>
              <span>Appointment booked</span>
            </div>
          </div>
        </div>
      )}
      {kind === "followup" && (
        <div className="conversation">
          <div className="conversation-heading">
            <span className="avatar">JM</span>
            <div>
              <strong>Jamie Morgan</strong>
              <span>Requested a callback</span>
            </div>
          </div>
          <div className="message from-team">
            Hi Jamie, you asked us to follow up on your quote. Is now a good
            time?
          </div>
          <div className="message from-customer">
            Tomorrow morning would be great.
          </div>
          <div className="followup-result">
            <Check />
            <div>
              <strong>Callback arranged</strong>
              <span>Tomorrow · 10:00 am</span>
            </div>
          </div>
        </div>
      )}
      {kind === "records" && (
        <div className="records-composition">
          <div className="record-source">
            <span className="paper-icon" aria-hidden="true">
              ↙
            </span>
            <div>
              <strong>New website enquiry</strong>
              <span>Sam Lee · Home visit</span>
            </div>
          </div>
          <div className="record-connector" aria-hidden="true">
            <span>↓</span>
          </div>
          <div className="mock-panel record-panel">
            <div className="mock-top">
              <span className="avatar">SL</span>
              <div>
                <strong>Sam Lee</strong>
                <span>Customer record</span>
              </div>
              <Check />
            </div>
            <div className="record-field">
              <span>Interested in</span>
              <strong>Home visit</strong>
            </div>
            <div className="record-field">
              <span>Next step</span>
              <strong>Arrange a callback</strong>
            </div>
            <div className="assigned">
              <span className="avatar small-avatar">JT</span>
              <span>Assigned to Jordan</span>
            </div>
          </div>
        </div>
      )}
      {kind === "dashboard" && (
        <div className="mock-panel dashboard-panel">
          <div className="dashboard-top">
            <div>
              <span className="muted">Team overview</span>
              <strong>Today at a glance</strong>
            </div>
            <span className="avatar">JT</span>
          </div>
          <div className="dashboard-stats">
            <div>
              <strong>08</strong>
              <span>Appointments</span>
            </div>
            <div>
              <strong>03</strong>
              <span>To follow up</span>
            </div>
          </div>
          <div className="task-head">
            <strong>Today’s visits</strong>
            <span>Assigned to</span>
          </div>
          {[
            ["09:00", "Home consultation", "Jordan"],
            ["11:30", "Site visit", "Taylor"],
            ["14:30", "First appointment", "Jordan"],
          ].map(([time, name, person]) => (
            <div className="task-row" key={time}>
              <span>{time}</span>
              <strong>{name}</strong>
              <span>{person}</span>
            </div>
          ))}
          <div className="dashboard-note">
            <span className="node" /> One place to see what needs doing.
          </div>
        </div>
      )}
      {kind === "booking" && (
        <div className="booking-composition">
          <div className="mock-panel calendar-panel">
            <div className="calendar-top">
              <div>
                <span className="muted">Appointment calendar</span>
                <strong>A time that works.</strong>
              </div>
              <span className="calendar-symbol" aria-hidden="true">
                ▦
              </span>
            </div>
            <div className="week-strip">
              {[
                ["Mon", "14"],
                ["Tue", "15"],
                ["Wed", "16"],
                ["Thu", "17"],
                ["Fri", "18"],
              ].map(([day, date]) => (
                <div className={day === "Tue" ? "chosen" : ""} key={day}>
                  <span>{day}</span>
                  <strong>{date}</strong>
                </div>
              ))}
            </div>
            <div className="calendar-slot">
              <span>10:00</span>
              <div>Team availability</div>
            </div>
            <div className="calendar-slot selected-slot">
              <span>14:30</span>
              <div>
                <strong>Alex Khan</strong>
                <span>First appointment · 30 min</span>
              </div>
            </div>
            <div className="calendar-slot">
              <span>16:00</span>
              <div>Team availability</div>
            </div>
          </div>
          <div className="confirmation-panel">
            <span className="large-check" aria-hidden="true">
              ✓
            </span>
            <strong>You’re booked in.</strong>
            <p>
              Tuesday, 15 September
              <br />
              2:30–3:00 pm
            </p>
            <div className="confirmation-divider" />
            <span>Alex Khan</span>
            <span>First appointment</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ServiceGrid() {
  return (
    <div className="studio-services">
      {offerings.map((s) => (
        <article className="service-feature" key={s.slug}>
          <StudioVisual kind={s.kind} />
          <div className="service-caption">
            <span className="category-label">{s.name}</span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
            <Link className="text-link" href={`/services/${s.slug}`}>
              Explore {s.name.toLowerCase()} <Arrow />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BookingStory() {
  return (
    <section className="story-section" id="how-it-works">
      <div className="wrap">
        <div className="section-heading">
          <h2>
            One enquiry.
            <br />A confirmed booking.
          </h2>
          <p>
            A simple example of how a call can become an appointment, with the
            details ready for your team.
          </p>
        </div>
        <ol className="booking-story">
          <li>
            <div className="story-art">
              <span className="story-phone" aria-hidden="true">
                ↗
              </span>
              <Wave />
              <p>“I’d like to book a visit.”</p>
            </div>
            <h3>A customer calls</h3>
            <p>Their question gets an answer.</p>
          </li>
          <li>
            <div className="story-art">
              <span className="avatar">AK</span>
              <strong>Alex Khan</strong>
              <div className="story-detail">
                <span>Service</span>
                <span>First appointment</span>
              </div>
              <div className="story-detail">
                <span>Preferred day</span>
                <span>Tuesday</span>
              </div>
            </div>
            <h3>The details stay together</h3>
            <p>Your team gets the full request.</p>
          </li>
          <li>
            <div className="story-art story-booked">
              <span className="large-check" aria-hidden="true">
                ✓
              </span>
              <strong>Tuesday, 2:30 pm</strong>
              <span>Appointment confirmed</span>
            </div>
            <h3>The visit is booked</h3>
            <p>Everyone knows the next step.</p>
          </li>
        </ol>
        <p className="story-disclaimer">
          Internal demo · Fictional customer and appointment.
        </p>
      </div>
    </section>
  );
}

export function ExampleGallery({ workPage = false }: { workPage?: boolean }) {
  return (
    <div className="example-gallery">
      <article className="example-feature">
        <StudioVisual kind="booking" large />
        <div className="example-caption">
          <div>
            <h3>A call becomes a booking.</h3>
            <p>
              Customer details, a time to visit and a confirmation in one place.
            </p>
          </div>
          <Link href="/work/request-relay" className="text-link">
            See booking example <Arrow />
          </Link>
        </div>
      </article>
      <div className={workPage ? "work-single" : "example-pair"}>
        <article className="example-feature">
          <StudioVisual kind="records" />
          <div className="example-caption">
            <div>
              <h3>An enquiry reaches the right person.</h3>
              <p>A new customer record, ready for follow-up.</p>
            </div>
            <Link href="/work/workflow-explorer" className="text-link">
              See enquiry example <Arrow />
            </Link>
          </div>
        </article>
        {!workPage && (
          <article className="example-feature">
            <StudioVisual kind="dashboard" />
            <div className="example-caption">
              <div>
                <h3>The day’s work, all together.</h3>
                <p>A shared view of appointments and tasks.</p>
              </div>
              <Link href="/services/custom-software" className="text-link">
                Explore custom tools <Arrow />
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export const processSteps = [
  {
    title: "Understand your needs",
    copy: "Show us the work that takes too much time. We agree on what to build and what it should do.",
    deliverable: "A clear scope and a practical plan.",
    kind: "brief",
  },
  {
    title: "Build and test",
    copy: "Review the design as it takes shape. We test the everyday tasks and the moments when someone needs help.",
    deliverable: "A working tool, tested with your team.",
    kind: "prototype",
  },
  {
    title: "Launch and hand over",
    copy: "Your team gets a walkthrough and clear instructions. We agree who looks after the system next.",
    deliverable: "Documentation, training and agreed support.",
    kind: "handover",
  },
];
export function ProcessArt({ kind }: { kind: string }) {
  return (
    <div className={`process-art process-${kind}`} aria-hidden="true">
      <div className="process-paper">
        <span className="paper-dot" />
        {kind === "brief" ? (
          <>
            <strong>Your project</strong>
            <span>What needs to change?</span>
            <i />
            <i />
            <span className="paper-check">✓ Scope agreed</span>
          </>
        ) : kind === "prototype" ? (
          <>
            <strong>Made for your team</strong>
            <div className="prototype-blocks">
              <i />
              <i />
              <i />
            </div>
            <span className="paper-check">✓ Tested together</span>
          </>
        ) : (
          <>
            <strong>Ready for day one</strong>
            <span>✓ Team walkthrough</span>
            <span>✓ How-to guide</span>
            <span>✓ Support agreed</span>
          </>
        )}
      </div>
    </div>
  );
}
export function ProcessSection({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className="section process-section">
      <div className="section-heading">
        <h2>
          From an idea
          <br />
          to everyday use.
        </h2>
        {!expanded && (
          <Link href="/how-we-work" className="text-link">
            How we work <Arrow />
          </Link>
        )}
      </div>
      <ol className={`process-grid${expanded ? " expanded-process" : ""}`}>
        {processSteps.map((s) => (
          <li key={s.kind}>
            <ProcessArt kind={s.kind} />
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
            {expanded && (
              <strong className="deliverable">{s.deliverable}</strong>
            )}
          </li>
        ))}
      </ol>
      <p className="process-footnote">
        Clear instructions for your team. A person to turn to when a request
        needs help.
      </p>
    </section>
  );
}
