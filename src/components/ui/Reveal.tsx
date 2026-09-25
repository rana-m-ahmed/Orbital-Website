"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Larger graphics get the slower 400–520ms entrance (§11). */
  large?: boolean;
  /** Small offset in ms so a sibling pair can enter just after the header. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * §11 — whole content blocks enter together: opacity + 8px rise.
 * No per-paragraph stagger, no per-element stagger.
 *
 * Deliberately CSS-driven and observer-based rather than a Motion component:
 * reveals appear on nearly every section and must not cost a hydrated
 * animation runtime each time (§38).
 */
export function Reveal({
  children,
  large = false,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shown = seen || reduced;

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown ? "true" : "false"}
      data-large={large ? "true" : "false"}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Read as an external store rather than effect state: the value is then
 * correct on the first client render, so components can derive their resting
 * state from it instead of correcting themselves afterwards (§13).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** True while the element is in view — demos never run off-screen (§38). */
export function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}
