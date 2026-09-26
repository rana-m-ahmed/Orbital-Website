export type SystemVisual =
  "calls" | "leads" | "support" | "admin" | "operations" | "portal" | "website";

export function SystemInterface({
  variant,
  compact = false,
}: {
  variant: SystemVisual;
  compact?: boolean;
}) {
  if (variant === "calls") return <CallInterface compact={compact} />;
  if (variant === "leads") return <LeadInterface compact={compact} />;
  if (variant === "support") return <SupportInterface compact={compact} />;
  if (variant === "admin") return <AdminInterface compact={compact} />;
  if (variant === "portal") return <PortalInterface />;
  if (variant === "website") return <WebsiteInterface />;
  return <OperationsInterface />;
}

function Frame({
  label,
  children,
  compact = false,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`system-frame ${compact ? "is-compact" : ""}`}>
      <div className="system-frame-bar">
        <span>ORBITAL / DEMONSTRATION</span>
        <span>{label}</span>
        <i />
      </div>
      {children}
    </div>
  );
}

function CallInterface({ compact }: { compact: boolean }) {
  return (
    <Frame label="CALL DESK" compact={compact}>
      <div className="call-interface">
        <div className="call-live">
          <span className="live-ring">●</span>
          <small>INCOMING CALL · 00:42</small>
          <strong>New enquiry</strong>
          <p>“I need to book a service for Tuesday morning.”</p>
          <div className="waveform">
            {Array.from({ length: 28 }, (_, i) => (
              <i key={i} style={{ height: `${12 + ((i * 17) % 34)}px` }} />
            ))}
          </div>
        </div>
        <div className="call-route">
          <small>NEXT ACTION</small>
          <strong>Tuesday · 09:30</strong>
          <p>Appointment held while details are confirmed.</p>
          <div className="route-human">
            <span>↗</span>
            <div>
              <b>Human handoff ready</b>
              <small>Full context attached</small>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function LeadInterface({ compact }: { compact: boolean }) {
  return (
    <Frame label="LEAD ROUTING" compact={compact}>
      <div className="lead-interface">
        <div className="lead-inbox">
          <small>NEW ENQUIRY</small>
          <h4>Commercial maintenance</h4>
          <p>Website form · 10:14</p>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>North district</dd>
            </div>
            <div>
              <dt>Need</dt>
              <dd>Ongoing service</dd>
            </div>
          </dl>
        </div>
        <div className="lead-track">
          <div className="lead-step is-done">
            <i />
            Captured <span>10:14</span>
          </div>
          <div className="lead-step is-done">
            <i />
            Acknowledged <span>10:14</span>
          </div>
          <div className="lead-step is-active">
            <i />
            Assigned to Sam <span>10:15</span>
          </div>
          <div className="lead-step">
            <i />
            Follow-up due <span>Today</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SupportInterface({ compact }: { compact: boolean }) {
  return (
    <Frame label="CUSTOMER SUPPORT" compact={compact}>
      <div className="support-interface">
        <div className="support-thread">
          <div className="message customer">
            <small>CUSTOMER</small>
            <p>Can I move tomorrow’s appointment to the afternoon?</p>
          </div>
          <div className="message system">
            <small>ASSISTED RESPONSE</small>
            <p>Yes. Two afternoon times are available: 14:00 and 16:30.</p>
          </div>
        </div>
        <aside>
          <small>CONFIDENCE CHECK</small>
          <strong>Calendar verified</strong>
          <p>Policy matched · no charge</p>
          <div className="human-gate">
            <i />
            Send to a person if the customer asks for another date.
          </div>
        </aside>
      </div>
    </Frame>
  );
}

function AdminInterface({ compact }: { compact: boolean }) {
  return (
    <Frame label="DOCUMENT INTAKE" compact={compact}>
      <div className="admin-interface">
        <div className="document-sheet">
          <small>WORK ORDER / 2841</small>
          <span className="doc-line wide" />
          <span className="doc-line" />
          <span className="doc-line short" />
          <div className="doc-stamp">RECEIVED</div>
        </div>
        <div className="extract-list">
          <small>EXTRACTED FOR REVIEW</small>
          {[
            ["Customer", "Park & Co"],
            ["Job", "Annual service"],
            ["Date", "18 October"],
          ].map(([a, b]) => (
            <div key={a}>
              <span>{a}</span>
              <b>{b}</b>
              <i>✓</i>
            </div>
          ))}
          <button type="button">
            Approve & create job <span>→</span>
          </button>
        </div>
      </div>
    </Frame>
  );
}

function OperationsInterface() {
  return (
    <Frame label="OPERATIONS">
      <div className="operations-interface">
        <aside>
          <b>O / OPS</b>
          {["Today", "Jobs", "Customers", "Approvals", "Reports"].map(
            (x, i) => (
              <span className={i === 0 ? "active" : ""} key={x}>
                {x}
              </span>
            ),
          )}
        </aside>
        <main>
          <div className="ops-head">
            <div>
              <small>MONDAY / OVERVIEW</small>
              <h4>What needs attention.</h4>
            </div>
            <span>3 live jobs</span>
          </div>
          <div className="ops-metrics">
            <div>
              <small>New enquiries</small>
              <b>08</b>
            </div>
            <div>
              <small>Awaiting approval</small>
              <b>03</b>
            </div>
            <div>
              <small>Today’s visits</small>
              <b>12</b>
            </div>
          </div>
          <div className="ops-list">
            <div>
              <i className="blue" />
              <b>Riverside House</b>
              <span>Survey · 09:30</span>
              <em>Confirmed</em>
            </div>
            <div>
              <i />
              <b>Northfield Ltd</b>
              <span>Install · 11:00</span>
              <em>En route</em>
            </div>
            <div>
              <i />
              <b>Park & Co</b>
              <span>Approval needed</span>
              <em>Review</em>
            </div>
          </div>
        </main>
      </div>
    </Frame>
  );
}

function PortalInterface() {
  return (
    <Frame label="CUSTOMER PORTAL">
      <div className="portal-interface">
        <header>
          <b>FIELD / ONE</b>
          <span>My account</span>
        </header>
        <main>
          <small>GOOD MORNING, ADEEL</small>
          <h4>Everything in one place.</h4>
          <div className="portal-grid">
            <div>
              <small>NEXT VISIT</small>
              <b>Tue 18 · 14:00</b>
              <span>Confirmed</span>
            </div>
            <div>
              <small>OPEN REQUEST</small>
              <b>Roof survey</b>
              <span>In progress</span>
            </div>
            <div className="portal-wide">
              <small>ACTIVITY</small>
              <p>
                <i />
                Engineer assigned <span>Today · 09:12</span>
              </p>
              <p>
                <i />
                Quote approved <span>Friday · 15:40</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </Frame>
  );
}

function WebsiteInterface() {
  return (
    <Frame label="ENQUIRY JOURNEY">
      <div className="website-interface">
        <div className="website-desktop">
          <header>
            <b>NORTH / WORKS</b>
            <span>Services　Projects　About</span>
            <i>REQUEST A SURVEY</i>
          </header>
          <main>
            <small>COMMERCIAL SPACES / BUILT WELL</small>
            <h4>
              From first survey
              <br />
              to final handover.
            </h4>
            <p>
              One experienced team for design, fit-out and ongoing maintenance.
            </p>
            <b className="site-action">Start your project →</b>
          </main>
        </div>
        <div className="website-mobile">
          <span className="mobile-notch" />
          <small>REQUEST A SURVEY</small>
          <b>What do you need?</b>
          <span>Fit-out</span>
          <span>Maintenance</span>
          <i>Continue →</i>
        </div>
      </div>
    </Frame>
  );
}
