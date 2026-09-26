"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";

const automation = [
  ["Automation overview", "/automation"],
  ["AI receptionist", "/automation/ai-receptionist"],
  ["Lead follow-up", "/automation/lead-automation"],
  ["Customer support", "/automation/customer-support"],
  ["Operations automation", "/automation/operations-automation"],
];
const supporting = [
  ["Integrations", "/integrations"],
  ["Custom software", "/software"],
  ["Websites & apps", "/websites-apps"],
];

export function Header() {
  const path = usePathname();
  const [solutions, setSolutions] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const solutionsToggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const close = () => {
    setSolutions(false);
    setMobile(false);
  };
  useEffect(() => {
    if (!mobile) return;
    document.body.classList.add("nav-open");
    const previous = document.activeElement as HTMLElement;
    const focusables = () =>
      Array.from(
        sheet.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
      );
    requestAnimationFrame(() => focusables()[0]?.focus());
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = focusables();
        if (!nodes.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.classList.remove("nav-open");
      previous?.focus();
    };
  }, [mobile]);
  useEffect(() => {
    if (!solutions) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolutions(false);
        solutionsToggle.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [solutions]);
  return (
    <header ref={root} className="architectural-header">
      <div className="nav-dock">
        <Wordmark />
        <nav className="architectural-nav" aria-label="Main navigation">
          <button
            ref={solutionsToggle}
            aria-expanded={solutions}
            aria-controls="solutions-panel"
            onClick={() => setSolutions(!solutions)}
          >
            Solutions <span>{solutions ? "−" : "+"}</span>
          </button>
          <Link href="/#process">How it works</Link>
          <Link
            href="/work"
            aria-current={path.startsWith("/work") ? "page" : undefined}
          >
            Labs
          </Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="nav-enquiry" href="/contact">
          <span>Tell us your challenge</span>
          <b>↗</b>
        </Link>
        <button
          ref={toggle}
          className="nav-menu-toggle"
          aria-expanded={mobile}
          aria-label="Open navigation"
          onClick={() => setMobile(true)}
        >
          <i />
          <i />
        </button>
      </div>
      {solutions && (
        <div id="solutions-panel" className="solutions-panel">
          <div className="solutions-primary">
            <span>AUTOMATE / START HERE</span>
            {automation.map(([label, href], i) => (
              <Link href={href} onClick={close} key={href}>
                <b>0{i + 1}</b>
                <strong>{label}</strong>
                <i>↗</i>
              </Link>
            ))}
          </div>
          <div className="solutions-support">
            <span>CONNECT & BUILD</span>
            {supporting.map(([label, href]) => (
              <Link href={href} onClick={close} key={href}>
                {label}
                <i>↗</i>
              </Link>
            ))}
            <p>
              Start with the business problem. We’ll help determine what should
              be automated, connected, or built.
            </p>
          </div>
        </div>
      )}
      {mobile && (
        <div
          className="mobile-nav-backdrop"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) {
              setMobile(false);
              toggle.current?.focus();
            }
          }}
        >
          <div
            ref={sheet}
            className="mobile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="mobile-nav-head">
              <span>NAVIGATION</span>
              <button
                onClick={() => {
                  setMobile(false);
                  toggle.current?.focus();
                }}
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>
            <div className="mobile-nav-links">
              {[
                ["01", "Solutions", "/automation"],
                ["02", "How it works", "/#process"],
                ["03", "Labs", "/work"],
                ["04", "About", "/about"],
              ].map(([n, label, href]) => (
                <Link href={href} onClick={close} key={href}>
                  <span>{n}</span>
                  {label}
                  <i>↗</i>
                </Link>
              ))}
            </div>
            <div className="mobile-nav-services">
              {supporting.map(([label, href]) => (
                <Link href={href} onClick={close} key={href}>
                  {label}
                </Link>
              ))}
            </div>
            <Link className="mobile-enquiry" href="/contact" onClick={close}>
              Tell us your challenge <span>↗</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
