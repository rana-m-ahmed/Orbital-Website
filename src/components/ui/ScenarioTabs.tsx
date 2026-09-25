"use client";

import { Tabs } from "./Tabs";
import { track } from "@/lib/analytics";

export type Scenario = {
  id: string;
  label: string;
  headline: string;
  body: string;
  points: string[];
};

/**
 * Scenario selector used on service pages (§21, §26).
 * Text-led rather than animated: the page's one signature interaction is
 * elsewhere, so this stays still (§10 — max one dominant animation).
 */
export function ScenarioTabs({
  scenarios,
  ariaLabel,
  tone = "light",
}: {
  scenarios: Scenario[];
  ariaLabel: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <Tabs
      ariaLabel={ariaLabel}
      tone={tone}
      onChange={(id) => track("automation_example_select", { label: id })}
      items={scenarios.map((scenario) => ({
        id: scenario.id,
        label: scenario.label,
        panel: (
          <div
            className={`grid gap-10 rounded-2xl border p-7 md:grid-cols-12 md:p-10 ${
              dark
                ? "border-midnight-line bg-[#0c121c]"
                : "border-[#e0e5ea] bg-white"
            }`}
          >
            <div className="md:col-span-5">
              <h3 className="display-3">{scenario.headline}</h3>
              <p
                className={`mt-4 text-[0.98rem] leading-relaxed ${
                  dark ? "text-slate" : "text-text-secondary-light"
                }`}
              >
                {scenario.body}
              </p>
            </div>

            <ul className="md:col-span-7 md:border-l md:pl-10 md:border-[#eceff3]">
              {scenario.points.map((point, index) => (
                <li
                  key={point}
                  className={`flex gap-4 py-3.5 ${
                    index > 0
                      ? dark
                        ? "border-t border-midnight-line"
                        : "border-t border-[#eceff3]"
                      : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-blue"
                  />
                  <span
                    className={`text-[0.95rem] leading-snug ${
                      dark ? "text-offwhite/85" : "text-text-primary-light"
                    }`}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ),
      }))}
    />
  );
}
