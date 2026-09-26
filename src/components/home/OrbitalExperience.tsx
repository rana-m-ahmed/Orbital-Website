"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
const Scene = dynamic(() => import("./OrbitalScene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function OrbitalExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      if (!query.matches) {
        setEnabled(false);
        return;
      }
      timer = setTimeout(() => {
        try {
          const canvas = document.createElement("canvas");
          const gl = canvas.getContext("webgl2");
          if (gl) {
            gl.getExtension("WEBGL_lose_context")?.loseContext();
            setEnabled(true);
          }
        } catch {
          setEnabled(false);
        }
      }, 1400);
    };
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) observer.observe(root.current);
    return () => {
      clearTimeout(timer);
      query.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={root} className="orbital-experience" aria-hidden="true">
      <div className="orbital-halo" />
      <div className="orbital-guide guide-one" />
      <div className="orbital-guide guide-two" />
      <div className="sculpture-fallback">
        <div className="sculpture-band" />
        <div className="sculpture-inner" />
        <div className="sculpture-node" />
      </div>
      {enabled && (
        <SceneBoundary>
          <Scene visible={visible} />
        </SceneBoundary>
      )}
      <div className="scene-caption">
        <span className="signal-dot" />
        <span>Everything, working together.</span>
        <span>↗</span>
      </div>
      <span className="scene-label">THE ORBITAL EFFECT</span>
    </div>
  );
}
