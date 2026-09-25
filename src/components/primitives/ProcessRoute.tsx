"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";

export type Stage = {
  title: string;
  detail: string;
  /** Trust cue — what stays true about how the work is done (§9). */
  cue?: string;
};

/**
 * §9 / §12 — one route fills progressively as the stages come into view.
 * No pinned scrollytelling, no scroll hijacking: each stage lights itself.
 */
export function ProcessRoute({
  stages,
  tone = "light",
}: {
  stages: Stage[];
  tone?: "light" | "dark";
}) {
  const [seen, setSeen] = useState(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const dark = tone === "dark";
  const reached = reduced ? stages.length - 1 : seen;

  useEffect(() => {
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setSeen((value) => Math.max(value, index));
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [reduced]);

  const progress = ((reached + 1) / stages.length) * 100;

  return (
    <ol
      className="route-grid relative mt-14 gap-10 lg:gap-7"
      style={{ "--route-cols": stages.length } as React.CSSProperties}
    >
      {/* The single route the stages sit on. */}
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-2 h-[calc(100%-16px)] w-px lg:left-0 lg:top-[7px] lg:h-px lg:w-full ${
          dark ? "bg-[#232d3d]" : "bg-[#dde3e9]"
        }`}
      >
        <span
          className="absolute left-0 top-0 block w-px bg-blue transition-[height] duration-[700ms] ease-[var(--ease-orbital)] lg:hidden"
          style={{ height: `${progress}%` }}
        />
        <span
          className="absolute left-0 top-0 hidden h-px bg-blue transition-[width] duration-[700ms] ease-[var(--ease-orbital)] lg:block"
          style={{ width: `${progress}%` }}
        />
      </span>

      {stages.map((stage, index) => {
        const lit = index <= reached;

        return (
          <li
            key={stage.title}
            data-index={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            className="relative pl-9 lg:pl-0 lg:pt-10"
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 size-3.5 rounded-full border-2 transition-colors duration-500 lg:top-0 ${
                lit
                  ? dark
                    ? "border-blue bg-midnight"
                    : "border-blue bg-offwhite"
                  : dark
                    ? "border-[#2c3646] bg-midnight"
                    : "border-[#c3cbd4] bg-offwhite"
              }`}
            />

            <p
              className={`mono-label ${
                dark ? "text-slate" : "text-text-secondary-light"
              }`}
            >
              0{index + 1}
            </p>
            <h3 className="display-4 mt-3">{stage.title}</h3>
            <p
              className={`mt-3 text-[0.95rem] leading-relaxed ${
                dark ? "text-slate" : "text-text-secondary-light"
              }`}
            >
              {stage.detail}
            </p>

            {stage.cue ? (
              <p
                className={`mt-5 border-l-2 pl-3 text-[0.86rem] leading-snug ${
                  dark
                    ? "border-blue/45 text-offwhite/80"
                    : "border-blue/45 text-text-primary-light"
                }`}
              >
                {stage.cue}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
