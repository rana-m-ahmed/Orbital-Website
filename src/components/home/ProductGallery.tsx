"use client";

import { useEffect, useRef, useState } from "react";
import { SystemInterface, type SystemVisual } from "./SystemVisuals";

const views: {
  id: SystemVisual;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    id: "operations",
    label: "Operations workspace",
    title: "One clear view of the day.",
    body: "Jobs, approvals, and customer context meet in a workspace designed around the decisions your team makes.",
  },
  {
    id: "portal",
    label: "Customer portal",
    title: "Give customers the answer before they ask.",
    body: "Appointments, requests, documents, and progress stay accessible without adding another call to the office.",
  },
  {
    id: "website",
    label: "Enquiry journey",
    title: "Turn attention into a useful next step.",
    body: "A focused website experience guides a potential customer from interest to a structured enquiry.",
  },
];

export function ProductGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const item = views[index];
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        opener.current?.focus();
      }
      if (e.key === "ArrowRight") setIndex((v) => (v + 1) % views.length);
      if (e.key === "ArrowLeft")
        setIndex((v) => (v + views.length - 1) % views.length);
      if (e.key === "Tab") {
        const nodes = Array.from(
          modal.current?.querySelectorAll<HTMLElement>("button, a") ?? [],
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
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
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", key);
      document.body.classList.remove("modal-open");
    };
  }, [open]);
  return (
    <div className="product-gallery">
      <div className="gallery-main">
        <div className="gallery-visual">
          <SystemInterface variant={item.id} />
          <button
            ref={opener}
            className="inspect-control"
            onClick={() => setOpen(true)}
          >
            Inspect preview <span>↗</span>
          </button>
        </div>
        <div className="gallery-copy">
          <span>0{index + 1} / 03</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <small>CONCEPT INTERFACE · DEMONSTRATION DATA</small>
        </div>
      </div>
      <div
        className="gallery-thumbs"
        role="tablist"
        aria-label="Interface gallery"
      >
        {views.map((view, i) => (
          <button
            key={view.id}
            role="tab"
            aria-selected={i === index}
            tabIndex={i === index ? 0 : -1}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                return;
              event.preventDefault();
              const next =
                (i + (event.key === "ArrowRight" ? 1 : -1) + views.length) %
                views.length;
              setIndex(next);
              (
                event.currentTarget.parentElement?.querySelectorAll(
                  '[role="tab"]',
                )[next] as HTMLElement
              )?.focus();
            }}
            onClick={() => setIndex(i)}
          >
            <span>0{i + 1}</span>
            <b>{view.label}</b>
            <i>↗</i>
          </button>
        ))}
      </div>
      {open && (
        <div
          ref={modal}
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.label} preview`}
        >
          <div className="gallery-modal-bar">
            <span>{item.label} · concept interface</span>
            <div>
              <button
                onClick={() =>
                  setIndex((v) => (v + views.length - 1) % views.length)
                }
                aria-label="Previous preview"
              >
                ←
              </button>
              <button
                onClick={() => setIndex((v) => (v + 1) % views.length)}
                aria-label="Next preview"
              >
                →
              </button>
              <button
                ref={closeRef}
                onClick={() => {
                  setOpen(false);
                  opener.current?.focus();
                }}
                aria-label="Close preview"
              >
                ×
              </button>
            </div>
          </div>
          <SystemInterface variant={item.id} />
        </div>
      )}
    </div>
  );
}
