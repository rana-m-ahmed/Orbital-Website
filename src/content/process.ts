import type { Stage } from "@/components/primitives/ProcessRoute";

/** §9 — four stages, each with the trust cue that stays true inside it. */
export const PROCESS_STAGES: Stage[] = [
  {
    title: "Understand",
    detail: "Map the work, the tools and the bottlenecks as they actually are.",
    cue: "People stay involved where judgment matters.",
  },
  {
    title: "Design",
    detail:
      "Decide what should be automated, what should be connected and what has to be built.",
    cue: "Business rules stay explicit.",
  },
  {
    title: "Build & test",
    detail:
      "Implement it and test it against real scenarios, including the awkward ones.",
    cue: "Failures and edge cases are tested before launch.",
  },
  {
    title: "Launch & support",
    detail: "Deploy, monitor what runs, and improve it once it meets reality.",
    cue: "Important systems include logs, alerts and documentation.",
  },
];

/** §25 — the software build process, which is a different sequence. */
export const BUILD_STAGES: Stage[] = [
  { title: "Discover", detail: "Understand the work the software has to carry." },
  { title: "Define", detail: "Agree scope, rules, roles and what success looks like." },
  { title: "Prototype", detail: "Put a working interface in front of real users early." },
  { title: "Build", detail: "Implement it properly, with tests and review." },
  { title: "Validate", detail: "Check it against real data and real edge cases." },
  { title: "Launch", detail: "Deploy with monitoring, documentation and support." },
];
