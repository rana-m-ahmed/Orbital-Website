"use client";

import { useState } from "react";
import { ProductFrame, type ProductVariant } from "./ProductFrame";
import { track } from "@/lib/analytics";

export type ShowcaseItem = {
  id: ProductVariant;
  label: string;
  caption: string;
};

/**
 * §7 — one visual transitions between Dashboard / Portal / Website / App.
 * Only one major motion at a time: the outgoing frame fades, the incoming
 * frame rises 6px. Nothing else on the screen moves.
 */
export function ProductShowcase({
  items,
  ariaLabel,
  tone = "dark",
  demoName,
}: {
  items: ShowcaseItem[];
  ariaLabel: string;
  tone?: "light" | "dark";
  demoName: string;
}) {
  const [active, setActive] = useState(0);
  const dark = tone === "dark";
  const current = items[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-xl p-1 ${
          dark ? "bg-[#0e141f]" : "bg-[#eceff3]"
        }`}
      >
        {items.map((item, index) => {
          const selected = index === active;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next =
                    (active + (event.key === "ArrowRight" ? 1 : -1) + items.length) %
                    items.length;
                  setActive(next);
                  track("workflow_demo_select", { label: items[next].id });
                  (
                    event.currentTarget.parentElement?.children[next] as HTMLElement
                  )?.focus();
                }
              }}
              onClick={() => {
                setActive(index);
                track("workflow_demo_select", { label: `${demoName}:${item.id}` });
              }}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-[0.86rem] font-medium transition-colors duration-150 ${
                selected
                  ? dark
                    ? "bg-midnight text-offwhite"
                    : "bg-white text-text-primary-light shadow-[0_1px_2px_rgba(9,13,20,0.08)]"
                  : dark
                    ? "text-slate hover:text-offwhite"
                    : "text-text-secondary-light hover:text-text-primary-light"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <div
          key={current.id}
          style={{ animation: "orbital-rise 380ms var(--ease-orbital) both" }}
        >
          <ProductFrame variant={current.id} title={current.caption} />
        </div>

        <p
          aria-live="polite"
          className={`mt-5 max-w-[520px] text-[0.95rem] ${
            dark ? "text-slate" : "text-text-secondary-light"
          }`}
        >
          {current.caption}
        </p>
      </div>
    </div>
  );
}
