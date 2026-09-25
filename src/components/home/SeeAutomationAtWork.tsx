"use client";

import { ConversationStage } from "@/components/primitives/ConversationStage";
import { SignalFlow } from "@/components/primitives/SignalFlow";
import { Tabs } from "@/components/ui/Tabs";
import { track } from "@/lib/analytics";

/**
 * §4 — 03 SEE AUTOMATION AT WORK.
 * Page-specific primitives, not one reused widget.
 * Switching a tab starts that demo; it plays once and holds.
 */
export function AutomationDemos() {
  return (
    <Tabs
      ariaLabel="Automation demonstrations"
      onChange={(id) => track("workflow_demo_select", { label: id })}
      items={[
        {
          id: "ai-receptionist",
          label: "AI Receptionist",
          panel: (
            <ConversationStage
              label="Inbound call · appointment booked"
              caller="Incoming — new customer"
              demoName="AI receptionist"
              tone="light"
              startDelay={350}
              turns={[
                {
                  from: "agent",
                  state: "Answer",
                  text: "Northfield Services, how can I help?",
                },
                {
                  from: "caller",
                  state: "Understand",
                  text: "I'd like a quote for a bathroom refit.",
                },
                {
                  from: "system",
                  state: "Qualify",
                  text: "Property type, location and preferred dates captured.",
                },
                {
                  from: "agent",
                  state: "Book",
                  text: "A surveyor can visit Tuesday at 10:00 — shall I hold that?",
                },
                {
                  from: "system",
                  state: "Record",
                  text: "Survey booked and the customer record created.",
                  done: true,
                },
              ]}
              footer="Anything outside the defined scope is transferred to a person instead of guessed at."
            />
          ),
        },
        {
          id: "lead-automation",
          label: "Lead Automation",
          panel: (
            <SignalFlow
              label="Website enquiry · routed in seconds"
              demoName="Lead automation"
              tone="light"
              startDelay={350}
              nodes={[
                {
                  label: "Enquiry",
                  detail: "A form is submitted at 21:40.",
                },
                {
                  label: "Qualify",
                  detail: "Budget, timeline and service matched to your rules.",
                },
                {
                  label: "Respond",
                  detail: "A personalised reply goes out immediately.",
                },
                {
                  label: "Route",
                  detail: "Assigned to the right salesperson with full context.",
                  handoff: true,
                },
              ]}
              footer="No unsupported claims: the point is simply that the reply happens now rather than tomorrow."
            />
          ),
        },
        {
          id: "customer-support",
          label: "Customer Support",
          panel: (
            <ConversationStage
              label="Support request · resolved or handed off"
              caller="Existing customer — order #4182"
              demoName="Customer support"
              tone="light"
              startDelay={350}
              turns={[
                {
                  from: "caller",
                  state: "Question",
                  text: "Where is my order, and can I change the delivery address?",
                },
                {
                  from: "agent",
                  state: "Resolve",
                  text: "It ships tomorrow. I can update the address now.",
                },
                {
                  from: "caller",
                  state: "Escalate",
                  text: "Also, I was charged twice last month.",
                },
                {
                  from: "system",
                  state: "Hand off",
                  text: "Billing issue — outside automated scope.",
                },
                {
                  from: "person",
                  state: "Person takes over",
                  text: "Passed to billing with the conversation and order history attached.",
                  done: true,
                },
              ]}
              footer="Routine questions are resolved. Anything involving money, judgement or an unhappy customer reaches a person."
            />
          ),
        },
        {
          id: "internal-operations",
          label: "Internal Operations",
          panel: (
            <SignalFlow
              label="Supplier invoice · checked and filed"
              demoName="Internal operations"
              tone="light"
              startDelay={350}
              nodes={[
                { label: "Receive", detail: "An invoice arrives by email." },
                { label: "Read", detail: "Supplier, amount and reference extracted." },
                {
                  label: "Check",
                  detail: "Matched against the purchase order.",
                },
                {
                  label: "Approve",
                  detail: "Anything over the threshold goes to a manager.",
                  handoff: true,
                },
                { label: "Record", detail: "Filed, logged and visible." },
              ]}
              footer="Exceptions are surfaced, not silently processed."
            />
          ),
        },
      ]}
    />
  );
}
