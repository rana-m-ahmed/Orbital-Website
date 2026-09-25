import type { ReactNode } from "react";

export type ProductVariant = "dashboard" | "workflow" | "portal" | "website" | "mobile";

/**
 * Primitive C — ProductFrame (§19).
 * A real interface surface, not an abstract gear/cloud illustration (§7).
 * Pure presentation: no hooks, no client boundary.
 */
export function ProductFrame({
  variant,
  title,
  className = "",
}: {
  variant: ProductVariant;
  title: string;
  className?: string;
}) {
  if (variant === "mobile") {
    return <MobileFrame title={title} className={className} />;
  }

  if (variant === "website") {
    return <BrowserFrame title={title} className={className} url="yourcompany.com" />;
  }

  return (
    <BrowserFrame
      title={title}
      className={className}
      url={variant === "portal" ? "portal.yourcompany.com" : "app.yourcompany.com"}
    >
      {variant === "dashboard" ? <DashboardBody /> : null}
      {variant === "workflow" ? <WorkflowBody /> : null}
      {variant === "portal" ? <PortalBody /> : null}
    </BrowserFrame>
  );
}

/* ---------------------------------------------------------------- chrome */

function BrowserFrame({
  title,
  url,
  children,
  className = "",
}: {
  title: string;
  url: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white text-text-primary-light shadow-[0_28px_70px_-40px_rgba(9,13,20,0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-[#eceff3] bg-[#fafbfc] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-[#dde3e9]" />
          <span className="size-2 rounded-full bg-[#dde3e9]" />
          <span className="size-2 rounded-full bg-[#dde3e9]" />
        </span>
        <span className="flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[0.7rem] text-text-secondary-light ring-1 ring-[#eceff3]">
          {url}
        </span>
      </div>
      {children ?? <WebsiteBody />}
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}

function MobileFrame({ title, className = "" }: { title: string; className?: string }) {
  return (
    <figure
      className={`mx-auto w-[248px] overflow-hidden rounded-[30px] border border-[#e0e5ea] bg-white p-2.5 text-text-primary-light shadow-[0_28px_70px_-40px_rgba(9,13,20,0.45)] ${className}`}
    >
      <div className="overflow-hidden rounded-[22px] bg-[#fafbfc]">
        <div className="flex items-center justify-between px-4 pb-2 pt-3 text-[0.62rem] font-medium text-text-secondary-light">
          <span>9:41</span>
          <span aria-hidden="true" className="h-1 w-10 rounded-full bg-[#dde3e9]" />
          <span>100%</span>
        </div>

        <div className="px-4 pb-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-secondary-light">
            Today
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[1.05rem] font-semibold">
            4 jobs scheduled
          </p>

          <ul className="mt-3 space-y-2">
            {[
              ["08:30", "Site survey", "Confirmed"],
              ["11:00", "Install — Unit 4", "En route"],
              ["14:15", "Callback", "New"],
            ].map(([time, job, status]) => (
              <li
                key={job}
                className="rounded-xl border border-[#eceff3] bg-white px-3 py-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] font-medium tabular-nums text-text-secondary-light">
                    {time}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] ${
                      status === "New"
                        ? "bg-[#3158d8]/10 text-interactive-on-light"
                        : "bg-[#f1f4f7] text-text-secondary-light"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <p className="mt-1 text-[0.8rem] font-medium">{job}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-midnight px-3 py-2.5 text-center text-[0.75rem] font-medium text-offwhite">
            Add job
          </div>
        </div>
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}

/* ----------------------------------------------------------------- bodies */

function AppShell({ nav, children }: { nav: string; children: ReactNode }) {
  const items = ["Overview", "Jobs", "Customers", "Invoices", "Reports"];

  return (
    <div className="grid min-h-[300px] grid-cols-[124px_minmax(0,1fr)] text-left sm:min-h-[340px]">
      <aside className="hidden border-r border-[#eceff3] bg-[#fafbfc] p-3.5 sm:block">
        <p className="mono-label px-1 text-text-secondary-light">{nav}</p>
        <ul className="mt-4 space-y-1">
          {items.map((item, index) => (
            <li
              key={item}
              className={`rounded-lg px-2 py-1.5 text-[0.74rem] ${
                index === 0
                  ? "bg-white font-medium text-text-primary-light ring-1 ring-[#eceff3]"
                  : "text-text-secondary-light"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
      <div className="col-span-2 p-4 sm:col-span-1 sm:p-5">{children}</div>
    </div>
  );
}

function DashboardBody() {
  const kpis = [
    ["Calls answered", "128", "+18"],
    ["Booked", "41", "+9"],
    ["Avg. response", "12s", "−41s"],
  ];

  return (
    <AppShell nav="Operations">
      <div className="flex items-baseline justify-between">
        <p className="font-[family-name:var(--font-display)] text-[1rem] font-semibold">
          This week
        </p>
        <span className="text-[0.7rem] text-text-secondary-light">
          Demonstration data
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {kpis.map(([label, value, delta]) => (
          <div
            key={label}
            className="rounded-xl border border-[#eceff3] bg-white px-3 py-2.5"
          >
            <p className="text-[0.64rem] uppercase tracking-[0.08em] text-text-secondary-light">
              {label}
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tabular-nums">
              {value}
            </p>
            <p className="text-[0.66rem] font-medium text-interactive-on-light">
              {delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-[#eceff3] bg-white p-3.5">
        <Chart />
      </div>
    </AppShell>
  );
}

function Chart() {
  const values = [34, 52, 41, 68, 59, 77, 86];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = 100;

  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.08em] text-text-secondary-light">
        Calls handled automatically
      </p>
      <div className="mt-3 flex h-[72px] items-end gap-2">
        {values.map((value, index) => (
          <span
            key={index}
            className={`flex-1 rounded-[3px] ${
              index === values.length - 1 ? "bg-blue" : "bg-[#dde3e9]"
            }`}
            style={{ height: `${Math.round((value / max) * 100)}%` }}
          />
        ))}
      </div>

      <div className="mt-1.5 flex gap-2">
        {days.map((day, index) => (
          <span
            key={index}
            className="flex-1 text-center text-[0.6rem] text-text-secondary-light"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

function WorkflowBody() {
  const rows = [
    ["New enquiry", "Capture", "Automatic"],
    ["Qualify answers", "Rules", "Automatic"],
    ["Book or route", "Calendar", "Automatic"],
    ["Complex request", "Sales", "Person"],
  ];

  return (
    <AppShell nav="Workflows">
      <div className="flex items-baseline justify-between">
        <p className="font-[family-name:var(--font-display)] text-[1rem] font-semibold">
          Enquiry handling
        </p>
        <span className="rounded bg-[#3158d8]/10 px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-interactive-on-light">
          Live
        </span>
      </div>

      <table className="mt-3 w-full border-separate border-spacing-y-1.5 text-left">
        <thead>
          <tr className="text-[0.62rem] uppercase tracking-[0.08em] text-text-secondary-light">
            <th className="font-medium">Step</th>
            <th className="font-medium">Handled by</th>
            <th className="font-medium">Mode</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([step, by, mode]) => (
            <tr key={step} className="text-[0.76rem]">
              <td className="rounded-l-lg border-y border-l border-[#eceff3] bg-white px-2.5 py-2 font-medium">
                {step}
              </td>
              <td className="border-y border-[#eceff3] bg-white px-2.5 py-2 text-text-secondary-light">
                {by}
              </td>
              <td className="rounded-r-lg border-y border-r border-[#eceff3] bg-white px-2.5 py-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] ${
                    mode === "Person"
                      ? "bg-[#f1f4f7] text-text-secondary-light"
                      : "bg-[#3158d8]/10 text-interactive-on-light"
                  }`}
                >
                  {mode}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}

function PortalBody() {
  return (
    <AppShell nav="Client portal">
      <p className="font-[family-name:var(--font-display)] text-[1rem] font-semibold">
        Welcome back, Adeel
      </p>
      <p className="mt-1 text-[0.76rem] text-text-secondary-light">
        Everything on your account in one place.
      </p>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {[
          ["Open request", "Roof survey", "In progress"],
          ["Next visit", "Tue 14 Oct", "Confirmed"],
          ["Documents", "3 files", "Available"],
          ["Invoice", "INV-2043", "Paid"],
        ].map(([label, value, status]) => (
          <div
            key={label}
            className="rounded-xl border border-[#eceff3] bg-white px-3 py-2.5"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.08em] text-text-secondary-light">
              {label}
            </p>
            <p className="mt-1 text-[0.85rem] font-medium">{value}</p>
            <p className="mt-1 text-[0.66rem] text-interactive-on-light">{status}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function WebsiteBody() {
  return (
    <div className="min-h-[300px] bg-white text-left sm:min-h-[340px]">
      <div className="flex items-center justify-between border-b border-[#eceff3] px-5 py-3">
        <span className="font-[family-name:var(--font-display)] text-[0.78rem] font-semibold tracking-[0.12em]">
          NORTHFIELD
        </span>
        <span className="hidden gap-4 text-[0.68rem] text-text-secondary-light sm:flex">
          <span>Services</span>
          <span>Projects</span>
          <span>About</span>
        </span>
        <span className="rounded-md bg-midnight px-2.5 py-1 text-[0.64rem] font-medium text-offwhite">
          Get a quote
        </span>
      </div>

      <div className="px-5 py-7">
        <p className="max-w-[300px] font-[family-name:var(--font-display)] text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.02em]">
          Commercial fit-outs, delivered on schedule.
        </p>
        <p className="mt-2 max-w-[280px] text-[0.74rem] text-text-secondary-light">
          Survey, design and installation from one team.
        </p>

        <div className="mt-4 flex gap-2">
          <span className="rounded-lg bg-midnight px-3 py-1.5 text-[0.68rem] font-medium text-offwhite">
            Request a survey
          </span>
          <span className="rounded-lg px-3 py-1.5 text-[0.68rem] font-medium text-text-secondary-light ring-1 ring-[#e0e5ea]">
            See projects
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {["Survey", "Design", "Install"].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#eceff3] bg-[#fafbfc] px-3 py-3"
            >
              <span
                aria-hidden="true"
                className="block size-1.5 rounded-full bg-blue"
              />
              <p className="mt-2 text-[0.72rem] font-medium">{item}</p>
              <p className="mt-1 text-[0.64rem] leading-snug text-text-secondary-light">
                Clear scope before work begins.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
