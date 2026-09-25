"use client";

import { Resolver } from "@/components/primitives/Resolver";
import { Tabs } from "@/components/ui/Tabs";
import { track } from "@/lib/analytics";

const SCENARIOS = [
  {
    id: "service",
    label: "Service business",
    before: "Missed call → voicemail → manual callback",
    after: "Answer → qualify → book → notify",
    steps: ["Answer", "Qualify", "Book", "Notify"],
    outcome: "Fewer opportunities disappear into voicemail.",
  },
  {
    id: "professional",
    label: "Professional services",
    before: "Enquiry sits in a shared inbox until someone has a gap",
    after: "Captured, qualified and assigned to a named owner",
    steps: ["Capture", "Qualify", "Assign", "Follow up"],
    outcome: "Every enquiry has an owner on the day it arrives.",
  },
  {
    id: "appointment",
    label: "Appointment-led business",
    before: "Back-and-forth messages to find a time, then manual reminders",
    after: "Live availability offered, booked and confirmed in one exchange",
    steps: ["Offer times", "Book", "Confirm", "Remind"],
    outcome: "Fewer empty slots and fewer no-shows to chase.",
  },
  {
    id: "sales",
    label: "Sales team",
    before: "Leads are worked in whatever order they are noticed",
    after: "Scored, routed and followed up on a defined schedule",
    steps: ["Score", "Route", "Respond", "Nurture"],
    outcome: "Salespeople spend their time on the conversations worth having.",
  },
  {
    id: "operations",
    label: "Operations-heavy business",
    before: "Documents re-keyed between systems, approvals chased by hand",
    after: "Read, checked, approved where needed and recorded automatically",
    steps: ["Receive", "Check", "Approve", "Record"],
    outcome: "Admin stops consuming the hours meant for delivery.",
  },
];

/**
 * §4 — 06 LESS BUSYWORK. MORE BUSINESS.
 * Before / ORBITAL flow / After, driven by the Resolver primitive (§19).
 */
export function LessBusywork() {
  return (
    <Tabs
      ariaLabel="Business scenarios"
      onChange={(id) => track("automation_example_select", { label: id })}
      items={SCENARIOS.map((scenario) => ({
        id: scenario.id,
        label: scenario.label,
        panel: (
          <Resolver
            demoName={scenario.label}
            before={scenario.before}
            after={scenario.after}
            steps={scenario.steps}
            outcome={scenario.outcome}
          />
        ),
      }))}
    />
  );
}
