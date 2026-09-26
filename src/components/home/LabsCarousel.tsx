"use client";
import { useRef, useState, type ReactNode } from "react";
export function LabsCarousel({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  function move(next: number) {
    const node = rail.current;
    if (!node) return;
    const target = Math.max(0, Math.min(count - 1, next));
    const card = node.children[target] as HTMLElement;
    node.scrollTo({
      left: card.offsetLeft - node.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div
      className="labs-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="ORBITAL Labs projects"
    >
      <div className="carousel-controls">
        <span aria-live="polite">
          0{index + 1} <span className="counter-divider">/ 0{count}</span>
        </span>
        <div>
          <button
            aria-label="Previous project"
            disabled={index === 0}
            onClick={() => move(index - 1)}
          >
            ←
          </button>
          <button
            aria-label="Next project"
            disabled={index === count - 1}
            onClick={() => move(index + 1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="labs-rail"
        tabIndex={0}
        aria-label="Project slides. Use left and right arrows to browse."
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(index + (e.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={() => {
          const node = rail.current;
          if (!node) return;
          const children = Array.from(node.children) as HTMLElement[];
          const closest = children.reduce(
            (best, child, i) =>
              Math.abs(child.offsetLeft - node.offsetLeft - node.scrollLeft) <
              Math.abs(
                children[best].offsetLeft - node.offsetLeft - node.scrollLeft,
              )
                ? i
                : best,
            0,
          );
          setIndex(closest);
        }}
      >
        {children}
      </div>
    </div>
  );
}
