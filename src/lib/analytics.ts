/**
 * Analytics event layer — §44.
 * Track decisions, not decoration. No hover events, no scroll increments.
 *
 * The layer is provider-agnostic: it pushes to window.dataLayer and calls
 * window.plausible / window.gtag when present, and is a no-op otherwise, so
 * no analytics vendor is baked into the component tree.
 */

export type OrbitalEvent =
  | "hero_cta"
  | "hero_secondary"
  | "automation_example_select"
  | "workflow_demo_select"
  | "workflow_replay"
  | "work_case_open"
  | "integration_recipe_change"
  | "service_cta"
  | "contact_start"
  | "contact_submit_success"
  | "contact_submit_error"
  | "booking_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (command: string, event: string, params?: Props) => void;
  }
}

export function track(event: OrbitalEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...props });
    window.plausible?.(event, { props });
    window.gtag?.("event", event, props);

    if (process.env.NODE_ENV === "development") {
      console.debug("[orbital:analytics]", event, props);
    }
  } catch {
    /* analytics must never break the page */
  }
}
