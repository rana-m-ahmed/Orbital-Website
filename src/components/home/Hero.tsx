import { ConversationStage } from "@/components/primitives/ConversationStage";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { HeroMobileSequence } from "./HeroMobileSequence";

/**
 * §4 — 01 HERO. "A Call Becomes a Booking".
 * The signature interaction is a business story, not a space graphic.
 * Copy is readable immediately; the workflow starts ~900ms later, runs once
 * in ~5–6s, and holds on "Appointment booked ✓".
 */
export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-midnight pb-[92px] pt-[132px] text-offwhite md:pb-[120px] md:pt-[164px]">
      <HeroField />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p
              className="eyebrow text-slate"
              style={{ animation: "orbital-rise 420ms var(--ease-orbital) both" }}
            >
              Automation · Software · Systems
            </p>

            <h1
              className="display-1 mt-6"
              style={{
                animation: "orbital-rise 460ms var(--ease-orbital) 60ms both",
              }}
            >
              Automate the work slowing your business down.
            </h1>

            <p
              className="lede mt-7 max-w-[520px] text-slate"
              style={{
                animation: "orbital-rise 460ms var(--ease-orbital) 130ms both",
              }}
            >
              AI receptionists, lead follow-up, business workflows and custom
              software — built around the way your company works.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              style={{
                animation: "orbital-rise 460ms var(--ease-orbital) 200ms both",
              }}
            >
              <PrimaryButton href="/contact" tone="dark" event="hero_cta">
                Start a project
              </PrimaryButton>
              <SecondaryButton
                href="#what-can-orbital-automate"
                tone="dark"
                event="hero_secondary"
              >
                See what we automate
              </SecondaryButton>
            </div>

            <p
              className="mt-7 text-[0.85rem] text-slate/80"
              style={{
                animation: "orbital-rise 460ms var(--ease-orbital) 260ms both",
              }}
            >
              Automation first. Custom-built when needed.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Desktop / tablet: the full call → booking demonstration. */}
            <div className="hidden md:block">
              <ConversationStage
                label="A call becomes a booking"
                caller="Incoming — 0300 4471 220"
                demoName="Call to booking"
                tone="dark"
                hold={700}
                startDelay={900}
                turns={[
                  {
                    from: "system",
                    state: "Incoming call",
                    text: "Ringing — outside office hours.",
                  },
                  {
                    from: "agent",
                    state: "Answered",
                    text: "Good evening, Northfield Services. How can I help?",
                  },
                  {
                    from: "caller",
                    state: "Request",
                    text: "I need someone to look at a leak. Can I get an appointment this week?",
                  },
                  {
                    from: "system",
                    state: "Availability checked",
                    text: "Checking the engineering calendar — Thursday 09:00 and 14:30 are open.",
                  },
                  {
                    from: "agent",
                    state: "Booked",
                    text: "Thursday at 09:00 is booked, and you'll get a confirmation by text.",
                  },
                  {
                    from: "system",
                    state: "CRM updated",
                    text: "Customer record created with the call summary attached.",
                  },
                  {
                    from: "person",
                    state: "Team notified",
                    text: "Assigned to the on-call engineer with the address and notes.",
                  },
                  {
                    from: "system",
                    state: "Complete",
                    text: "Appointment booked",
                    done: true,
                  },
                ]}
              />
            </div>

            {/* §4 — mobile gets a simplified vertical sequence, not a shrunken UI. */}
            <div className="md:hidden">
              <HeroMobileSequence />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quiet field behind the hero: static geometry, no loop. */
function HeroField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-18%] size-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,120,255,0.13),transparent_62%)]" />
      <svg
        className="absolute inset-0 size-full opacity-[0.55]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 720"
        fill="none"
      >
        <path d="M0 210h1440M0 430h1440" stroke="#161e2b" strokeWidth="1" />
        <path d="M320 0v720M1120 0v720" stroke="#131a26" strokeWidth="1" />
      </svg>
    </div>
  );
}
