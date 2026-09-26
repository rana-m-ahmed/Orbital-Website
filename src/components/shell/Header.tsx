"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
const groups = [
  {
    title: "01 / Automate",
    copy: "Less repetition. More possibility.",
    links: [
      ["Explore automation", "/automation"],
      ["AI receptionist", "/automation/ai-receptionist"],
      ["Lead follow-up", "/automation/lead-automation"],
      ["Customer support", "/automation/customer-support"],
      ["Operations & admin", "/automation/operations-automation"],
    ],
  },
  {
    title: "02 / Connect",
    copy: "Make your tools work together.",
    links: [["Integrations & systems", "/integrations"]],
  },
  {
    title: "03 / Build",
    copy: "The software your business needs.",
    links: [
      ["Custom software", "/software"],
      ["Websites & apps", "/websites-apps"],
    ],
  },
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [stuck, setStuck] = useState(false);
  const root = useRef<HTMLElement>(null);
  const services = useRef<HTMLButtonElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    setMobile(false);
  };
  useEffect(() => {
    const scroll = () => setStuck(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open && !mobile) return;
    const click = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        setMobile(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobile(false);
        (mobile ? toggle : services).current?.focus();
      }
    };
    document.addEventListener("pointerdown", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", click);
      document.removeEventListener("keydown", key);
    };
  }, [open, mobile]);
  return (
    <header
      ref={root}
      className={`floating-header ${stuck ? "is-scrolled" : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <div className="nav-bar">
        <Wordmark />
        <nav aria-label="Main" className="desktop-nav">
          <button
            ref={services}
            type="button"
            aria-expanded={open}
            aria-controls="service-menu"
            onClick={() => setOpen(!open)}
          >
            Services{" "}
            <span className={open ? "nav-plus open" : "nav-plus"}>+</span>
          </button>
          <Link
            href="/work"
            aria-current={pathname.startsWith("/work") ? "page" : undefined}
            onClick={close}
          >
            Work
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={close}
          >
            About
          </Link>
        </nav>
        <Link href="/contact" className="nav-cta" onClick={close}>
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="mobile-toggle"
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          aria-controls="mobile-navigation"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? "−" : "☰"}
        </button>
      </div>
      {open && (
        <div id="service-menu" className="service-menu">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow">{g.title}</p>
              <p className="menu-description">{g.copy}</p>
              {g.links.map(([label, href]) => (
                <Link key={href} href={href} onClick={close}>
                  {label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      {mobile && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="mobile-sheet"
        >
          <Link href="/work" onClick={close}>
            Work ↗
          </Link>
          <Link href="/about" onClick={close}>
            About ↗
          </Link>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow">{g.title}</p>
              {g.links.map(([label, href]) => (
                <Link key={href} href={href} onClick={close}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/contact" onClick={close}>
            Let’s talk ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
