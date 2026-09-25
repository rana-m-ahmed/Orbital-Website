"use client";

import { useEffect, useRef, useState } from "react";
import { ProductFrame } from "./ProductFrame";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion, useInView } from "@/components/ui/Reveal";

const SCATTER = [
  { label: "bookings.xlsx", sub: "v7 — final (2)", x: -34, y: -26, r: -5 },
  { label: "Shared inbox", sub: "218 unread", x: 30, y: -34, r: 4 },
  { label: "CRM", sub: "half the customers", x: -28, y: 22, r: 3 },
  { label: "Notes app", sub: "someone's phone", x: 26, y: 26, r: -4 },
  { label: "Reporting", sub: "rebuilt every Monday", x: 0, y: 40, r: 2 },
];

/**
 * §25 — the Software page's one signature interaction (§20).
 * Scattered work resolves into one product. An actual UI transformation,
 * not an icon diagram — and only transform/opacity animate (§35).
 */
export function ScatterToProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [settled, setSettled] = useState(false);
  const resolved = settled || reduced;

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setTimeout(() => setSettled(true), 900);
    return () => clearTimeout(timer);
  }, [inView, reduced]);

  return (
    <div ref={ref}>
      <div className="relative min-h-[430px] sm:min-h-[480px]">
        {/* Scattered sources */}
        <div
          aria-hidden={resolved}
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-[460ms] ease-[var(--ease-orbital)]"
          style={{ opacity: resolved ? 0 : 1 }}
        >
          <div className="relative h-full w-full max-w-[560px]">
            {SCATTER.map((item, index) => (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2 w-[188px] rounded-xl border border-midnight-line bg-[#0e141f] px-4 py-3.5 transition-transform duration-[620ms] ease-[var(--ease-orbital)]"
                style={{
                  transform: resolved
                    ? "translate(-50%, -50%) scale(0.94)"
                    : `translate(calc(-50% + ${item.x}%), calc(-50% + ${item.y}%)) rotate(${item.r}deg)`,
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                <p className="text-[0.86rem] font-medium text-offwhite">
                  {item.label}
                </p>
                <p className="mt-1 text-[0.76rem] text-slate">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* One product */}
        <div
          className="absolute inset-0 flex items-center transition-[opacity,transform] duration-[520ms] ease-[var(--ease-orbital)]"
          style={{
            opacity: resolved ? 1 : 0,
            transform: resolved ? "none" : "translateY(10px)",
          }}
        >
          <ProductFrame
            variant="dashboard"
            title="One custom operations interface"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.92rem] text-slate" aria-live="polite">
          {resolved
            ? "One interface, one source of truth, one place to look."
            : "Five places the same job currently lives."}
        </p>

        <button
          type="button"
          onClick={() => {
            setSettled(false);
            track("workflow_replay", { label: "Scatter to product" });
            window.setTimeout(() => setSettled(true), 420);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.8rem] font-medium text-slate transition-colors hover:bg-[#151d2b] hover:text-offwhite"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 14 14"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.2 7a5.2 5.2 0 1 1-1.6-3.75M12.4 1.4v2.9H9.5" />
          </svg>
          Replay
        </button>
      </div>
    </div>
  );
}
