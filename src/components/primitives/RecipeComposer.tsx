"use client";

import { useEffect, useId, useState } from "react";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";
import { ACTIONS, FINALLYS, THENS, TRIGGERS } from "@/content/integrations";

/**
 * §27 — the Integrations page's one signature interaction (§20).
 * A recipe composer rather than a generic node map: a non-technical owner
 * reads it as a sentence, and the route below is the same sentence drawn.
 */
export function RecipeComposer() {
  const id = useId();
  const reduced = usePrefersReducedMotion();

  const [trigger, setTrigger] = useState<string>(TRIGGERS[0]);
  const [action, setAction] = useState<string>(ACTIONS[0]);
  const [then, setThen] = useState<string>(THENS[0]);
  const [last, setLast] = useState<string>(FINALLYS[0]);
  const steps = [trigger, action, then, last];
  const recipe = steps.join("|");

  /* Drawing is keyed to the recipe: changing a choice re-draws the route. */
  const [drawnRecipe, setDrawnRecipe] = useState<string | null>(null);
  const drawn = reduced || drawnRecipe === recipe;

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => setDrawnRecipe(recipe), 120);
    return () => clearTimeout(timer);
  }, [recipe, reduced]);

  const rows = [
    {
      label: "When this happens",
      value: trigger,
      options: TRIGGERS,
      set: setTrigger,
    },
    { label: "Do this", value: action, options: ACTIONS, set: setAction },
    { label: "Then", value: then, options: THENS, set: setThen },
    { label: "Finally", value: last, options: FINALLYS, set: setLast },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white">
      <div className="grid gap-px bg-[#eceff3] sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row, index) => (
          <div key={row.label} className="bg-white p-5">
            <label
              htmlFor={`${id}-${index}`}
              className="mono-label block text-text-secondary-light"
            >
              {row.label}
            </label>
            <div className="relative mt-3">
              <select
                id={`${id}-${index}`}
                value={row.value}
                onChange={(event) => {
                  row.set(event.target.value);
                  track("integration_recipe_change", {
                    label: row.label,
                    value: event.target.value,
                  });
                }}
                className="w-full appearance-none rounded-xl border border-[#dde3e9] bg-[#fafbfc] px-3.5 py-3 pr-9 text-[0.92rem] font-medium text-text-primary-light transition-colors hover:border-[#c8d2de]"
              >
                {row.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 12 8"
                className="pointer-events-none absolute right-3.5 top-1/2 size-3 -translate-y-1/2 text-text-secondary-light"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m1.5 2 4.5 4 4.5-4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#eceff3] bg-[#fafbfc] px-5 py-8">
        <p className="sr-only" aria-live="polite">
          {`When ${trigger.toLowerCase()}, ${action.toLowerCase()}, then ${then.toLowerCase()}, and finally ${last.toLowerCase()}.`}
        </p>

        <ol className="flex flex-col gap-0 md:flex-row md:items-stretch">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-1 flex-col md:flex-row md:items-center">
              <div
                className="flex-1 rounded-xl border border-[#3158d8]/30 bg-white px-4 py-3.5 transition-[opacity,transform] duration-[420ms] ease-[var(--ease-orbital)]"
                style={{
                  opacity: drawn ? 1 : 0.35,
                  transform: drawn ? "none" : "translateY(4px)",
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <p className="mono-label text-text-secondary-light">
                  {rows[index].label}
                </p>
                <p className="mt-1.5 text-[0.92rem] font-medium">{step}</p>
              </div>

              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="relative my-1 ml-[18px] block h-4 w-px shrink-0 md:mx-2.5 md:my-0 md:h-px md:w-6"
                >
                  <span className="absolute inset-0 bg-[#dde3e9]" />
                  <span
                    className="absolute inset-0 origin-top-left bg-blue transition-transform duration-[420ms] ease-[var(--ease-orbital)]"
                    style={{
                      transform: drawn ? "scale3d(1,1,1)" : "scale3d(0,0,1)",
                      transitionDelay: `${index * 90 + 60}ms`,
                    }}
                  />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
