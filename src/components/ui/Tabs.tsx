"use client";

import { useId, useRef, useState, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  panel: ReactNode;
};

/**
 * §48 — workflow selectors / tabs.
 * Roving tabindex, arrow-key navigation, selected state exposed
 * programmatically, and changing a tab never steals focus from the person.
 */
export function Tabs({
  items,
  ariaLabel,
  tone = "light",
  onChange,
}: {
  items: TabItem[];
  ariaLabel: string;
  tone?: "light" | "dark";
  onChange?: (id: string, index: number) => void;
}) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dark = tone === "dark";

  const select = (index: number, moveFocus = false) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    onChange?.(items[next].id, next);
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-xl p-1 ${
          dark ? "bg-[#0e141f]" : "bg-[#eceff3]"
        }`}
      >
        {items.map((item, index) => {
          const selected = index === active;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  select(active + 1, true);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  select(active - 1, true);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  select(0, true);
                } else if (event.key === "End") {
                  event.preventDefault();
                  select(items.length - 1, true);
                }
              }}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-[0.86rem] font-medium transition-colors duration-150 ${
                selected
                  ? dark
                    ? "bg-midnight text-offwhite shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
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

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="mt-6 focus-visible:outline-none"
        >
          {index === active ? item.panel : null}
        </div>
      ))}
    </div>
  );
}
