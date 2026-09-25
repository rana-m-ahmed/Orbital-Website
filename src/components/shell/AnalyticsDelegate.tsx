"use client";

import { useEffect } from "react";
import { track, type OrbitalEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole marketing shell (§38, §44).
 * Any server-rendered link or button can emit an event with
 * `data-track="service_cta" data-track-label="ai-receptionist"`.
 */
export function AnalyticsDelegate() {
  useEffect(() => {
    const onClick = (nativeEvent: MouseEvent) => {
      const target = nativeEvent.target as HTMLElement | null;
      const node = target?.closest<HTMLElement>("[data-track]");
      if (!node) return;

      const name = node.dataset.track as OrbitalEvent | undefined;
      if (!name) return;

      track(name, {
        label: node.dataset.trackLabel,
        href: node.getAttribute("href") ?? undefined,
      });
    };

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
