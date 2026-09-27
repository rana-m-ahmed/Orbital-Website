"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
function useReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

// Original implementation of the researched container-reveal pattern.
// Native scrolling remains untouched; only the presentation plane rotates.
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = matchMedia(
      "(min-width:1024px) and (prefers-reduced-motion:no-preference)",
    );
    let frame = 0;
    let visible = false;
    const draw = () => {
      frame = 0;
      if (!media.matches) {
        el.style.transform = "none";
        return;
      }
      const top = el.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight - top) / (innerHeight * 0.85)),
      );
      el.style.transform = `perspective(1400px) rotateX(${(1 - progress) * 7}deg) scale(${0.96 + progress * 0.04})`;
    };
    const update = () => {
      if (visible && !frame) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", draw);
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, []);
  return ref;
}

function ArchitectureArt({ studio = false }: { studio?: boolean }) {
  if (studio)
    return (
      <svg
        className="architecture-art"
        viewBox="0 0 620 490"
        role="img"
        aria-label="Original illustration of a calm studio with an arched window, pendant light and oak desk"
      >
        <rect width="620" height="490" fill="#dedbcf" />
        <path d="M0 410h620v80H0Z" fill="#c1a286" />
        <path d="M74 410V172a100 100 0 0 1 200 0v238Z" fill="#53665c" />
        <path d="M91 405V174a83 83 0 0 1 166 0v231Z" fill="#adbfac" />
        <path
          d="M174 89v316M91 219h166M91 319h166"
          stroke="#53665c"
          strokeWidth="8"
        />
        <path d="m257 220 155 190H257Z" fill="#f2edd7" />
        <path d="M440 0v105" stroke="#465145" strokeWidth="3" />
        <path d="M385 151a55 55 0 0 1 110 0Z" fill="#bd774e" />
        <ellipse cx="440" cy="151" rx="55" ry="8" fill="#956044" />
        <rect x="322" y="254" width="193" height="13" fill="#a47c58" />
        <rect x="349" y="267" width="13" height="151" fill="#a47c58" />
        <rect x="483" y="267" width="13" height="151" fill="#a47c58" />
        <rect x="361" y="241" width="91" height="13" fill="#ede3cf" />
        <path d="M473 254v-54" stroke="#405340" strokeWidth="4" />
        <ellipse
          cx="457"
          cy="207"
          rx="12"
          ry="28"
          fill="#597253"
          transform="rotate(-40 457 207)"
        />
        <ellipse
          cx="490"
          cy="187"
          rx="12"
          ry="30"
          fill="#405340"
          transform="rotate(30 490 187)"
        />
        <path d="M459 232h30l-5 23h-20Z" fill="#b77650" />
        <ellipse cx="371" cy="399" rx="50" ry="18" fill="#384b40" />
        <path d="m336 399-8 64m76-64 8 64" stroke="#384b40" strokeWidth="9" />
      </svg>
    );
  return (
    <svg
      className="architecture-art"
      viewBox="0 0 620 490"
      role="img"
      aria-label="Original illustration of a sunlit courtyard with an arched doorway"
    >
      <defs>
        <linearGradient id="wall" x2="1" y2="1">
          <stop stopColor="#e8b993" />
          <stop offset="1" stopColor="#b87351" />
        </linearGradient>
        <linearGradient id="door" x2="0" y2="1">
          <stop stopColor="#283c32" />
          <stop offset="1" stopColor="#576855" />
        </linearGradient>
      </defs>
      <rect width="620" height="490" fill="#e9dfc9" />
      <circle cx="480" cy="98" r="59" fill="#f7edb9" />
      <path d="M0 175 350 75 620 144V490H0Z" fill="url(#wall)" />
      <path d="M350 75v415h270V144Z" fill="#ca8d66" />
      <path d="M88 440V242a92 92 0 0 1 184 0v198Z" fill="#efd2ad" />
      <path d="M108 440V246a72 72 0 0 1 144 0v194Z" fill="url(#door)" />
      <path
        d="M180 174v266M113 255h134M112 321h136M113 384h134"
        stroke="#a7aa80"
        strokeWidth="4"
      />
      <path d="m0 440 350-22 270 32v40H0Z" fill="#e5c5a0" />
      <path d="m252 247 176 193H252Z" fill="#734b36" opacity=".2" />
      <rect x="401" y="227" width="134" height="135" rx="66" fill="#deb086" />
      <rect x="419" y="244" width="98" height="100" rx="48" fill="#746e52" />
      <path
        d="M509 431c-9-90-17-149-10-257"
        fill="none"
        stroke="#304936"
        strokeWidth="7"
      />
      {[
        [499, 190, -35],
        [510, 233, 35],
        [492, 275, -40],
        [508, 315, 38],
        [488, 351, -35],
      ].map(([x, y, a], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="18"
          ry="48"
          transform={`rotate(${a} ${x} ${y})`}
          fill={i % 2 ? "#466046" : "#324e3b"}
        />
      ))}
      <path d="M461 400h83l-15 70h-53Z" fill="#8e523e" />
      <path d="M0 474h620" stroke="#ad805e" strokeWidth="2" />
    </svg>
  );
}

export function WebsiteExperience({ detail = false }: { detail?: boolean }) {
  const [mobile, setMobile] = useState(false);
  const [room, setRoom] = useState<"courtyard" | "studio">("courtyard");
  const ready = useReady();
  const plane = useReveal();
  return (
    <section className="web-experience section" id="websites">
      <div className="digital-heading">
        <div>
          <span className="category-label">Websites & customer apps</span>
          <h2>
            A better first
            <br />
            <em>impression.</em>
          </h2>
        </div>
        <div>
          <p>
            A website that feels like your business. An app that makes booking,
            buying or getting in touch easy.
          </p>
          <Link
            href={detail ? "/start-project" : "/services/websites-apps"}
            className="text-link"
          >
            {detail ? "Plan your website or app" : "Explore websites & apps"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="website-theatre">
        <div className="preview-toolbar">
          <span>Illustrative example · Fictional design studio</span>
          <div
            className="device-switch"
            role="group"
            aria-label="Website preview size"
          >
            <button
              type="button"
              disabled={!ready}
              aria-pressed={!mobile}
              onClick={() => setMobile(false)}
            >
              Desktop
            </button>
            <button
              type="button"
              disabled={!ready}
              aria-pressed={mobile}
              onClick={() => setMobile(true)}
            >
              Mobile
            </button>
          </div>
        </div>
        <div className="browser-plane" ref={plane}>
          <div className={`browser-preview${mobile ? " device-mobile" : ""}`}>
            <div className="browser-chrome">
              <span className="browser-lights" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>form-and-field.example</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="sample-site">
              <div className="sample-nav">
                <strong>
                  form & field<span>INTERIOR DESIGN STUDIO</span>
                </strong>
                <span>Spaces for living.</span>
              </div>
              <div className={`sample-editorial scene-${room}`}>
                <div className="sample-copy">
                  <span className="sample-eyebrow">
                    Considered spaces. Everyday living.
                  </span>
                  <p className="sample-title">
                    Room for
                    <br />
                    <i>
                      {room === "courtyard" ? "a little calm." : "new ideas."}
                    </i>
                  </p>
                  <p className="sample-description">
                    Thoughtful interiors, natural materials and a place to feel
                    at home.
                  </p>
                  <button
                    type="button"
                    disabled={!ready}
                    onClick={() =>
                      setRoom(room === "courtyard" ? "studio" : "courtyard")
                    }
                    className="sample-action"
                  >
                    {room === "courtyard"
                      ? "View the studio concept"
                      : "View the courtyard concept"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <div className="sample-art">
                  <ArchitectureArt studio={room === "studio"} />
                  <span className="art-caption">
                    {room === "courtyard"
                      ? "The courtyard collection"
                      : "The studio collection"}{" "}
                    · Concept
                  </span>
                </div>
              </div>
              <div className="sample-bottom">
                <span>Make yourself at home.</span>
                <span>Residential / Commercial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="experience-footer">
        <p>Try the device switch. The layout changes, not just the size.</p>
        <span>Strategy · Design · Responsive layouts</span>
      </div>
      {detail && (
        <div className="digital-deliverables">
          <h3>From first visit to next step.</h3>
          <p>
            Clear service pages, easy enquiries and customer portals for
            bookings or project updates. We design the journey, build the
            screens and test them on real screen sizes.
          </p>
        </div>
      )}
    </section>
  );
}

export function SoftwareExperience({ detail = false }: { detail?: boolean }) {
  const [approved, setApproved] = useState(false);
  const ready = useReady();
  return (
    <section className="software-experience" id="software">
      <div className="wrap">
        <div className="digital-heading">
          <div>
            <span className="category-label">Custom software & web apps</span>
            <h2>
              Your way of working.
              <br />
              <em>Built in.</em>
            </h2>
          </div>
          <div>
            <p>
              Customer portals, team workspaces and business tools. Designed
              around what your people actually need to do.
            </p>
            <Link
              href={detail ? "/start-project" : "/services/custom-software"}
              className="text-link"
            >
              {detail
                ? "Plan your software project"
                : "Explore custom software"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="product-theatre">
          <div className="workspace-app">
            <div className="workspace-sidebar">
              <span className="workspace-logo">
                o<span>workspace</span>
              </span>
              <span className="workspace-location">North studio</span>
              <span className="workspace-current">◫ Projects</span>
              <span>↗ Messages</span>
              <span>▦ Calendar</span>
              <div className="workspace-person">
                <span className="avatar">JL</span>
                <span>Jordan Lee</span>
              </div>
            </div>
            <div className="workspace-main">
              <div className="workspace-top">
                <span>Projects / Website launch</span>
                <span className="internal-pill">Interactive example</span>
              </div>
              <div className="workspace-title">
                <div>
                  <span className="category-label">Customer project</span>
                  <h3>
                    A fresh start
                    <br />
                    for North.
                  </h3>
                </div>
                <span className="project-avatar" aria-hidden="true">
                  N.
                </span>
              </div>
              <div className="project-progress">
                <div>
                  <span>Project progress</span>
                  <strong>{approved ? "3 of 4" : "2 of 4"} milestones</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: approved ? "75%" : "50%" }} />
                </div>
              </div>
              <div className="task-table">
                <div>
                  <span className="task-check">✓</span>
                  <span>Project brief</span>
                  <span className="task-state">Complete</span>
                </div>
                <div>
                  <span className="task-check">✓</span>
                  <span>Design direction</span>
                  <span className="task-state">Complete</span>
                </div>
                <div className="approval-row">
                  <span
                    className={`task-check ${approved ? "" : "pending-check"}`}
                  >
                    {approved ? "✓" : "○"}
                  </span>
                  <span>Homepage design</span>
                  <span className="task-state">
                    {approved ? "Approved" : "Your review"}
                  </span>
                </div>
                <div>
                  <span className="task-check pending-check">○</span>
                  <span>Build & launch</span>
                  <span className="task-state">Up next</span>
                </div>
              </div>
              <div className="workspace-action">
                <p>
                  {approved
                    ? "Your team and customer see the same update."
                    : "Try it: approve the design and watch the app update."}
                </p>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => setApproved(!approved)}
                >
                  {approved ? "Reset example" : "Approve homepage"}
                  <span aria-hidden="true">{approved ? "↺" : "↗"}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="phone-app">
            <div className="phone-notch" aria-hidden="true" />
            <div className="phone-header">
              <span>North / Client app</span>
              <span className="avatar">AK</span>
            </div>
            <p className="phone-greeting">
              Hi, Alex.
              <br />
              Here’s the latest.
            </p>
            <div className={`phone-update${approved ? " approved" : ""}`}>
              <span className="phone-update-icon" aria-hidden="true">
                {approved ? "✓" : "◫"}
              </span>
              <strong>
                {approved ? "Design approved." : "Ready for a look."}
              </strong>
              <p>
                {approved
                  ? "Your homepage is approved. Next up: build & launch."
                  : "Your homepage design is ready to review."}
              </p>
              <span>{approved ? "Updated just now" : "Website launch"}</span>
            </div>
            <div className="phone-next">
              <span>Next milestone</span>
              <strong>{approved ? "Build & launch" : "Design approval"}</strong>
            </div>
            <div className="phone-bottom">
              <span>⌂ Home</span>
              <span>◫ Project</span>
              <span>↗ Messages</span>
            </div>
          </div>
        </div>
        <div className="software-foot">
          <p role="status" aria-live="polite">
            {approved
              ? "Example updated: homepage approved. Progress is now 3 of 4 milestones."
              : "Interactive example. Changes stay on this page."}
          </p>
          <span>One project. A view for everyone.</span>
        </div>
        {detail && (
          <div className="digital-deliverables">
            <h3>Useful on both sides.</h3>
            <p>
              Your team manages the work. Your customers see progress, share
              information and take the next step. Access, notifications and the
              handover are planned with you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
