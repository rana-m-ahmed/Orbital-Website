"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import geometry from "./hero/brand-geometry.json";
const RelayCanvas = dynamic(() => import("./hero/RelayCanvas"), { ssr: false });
class CanvasBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
const paths = geometry.contours.map((points) => {
  // Match the beveled mesh's smooth contour in the immediate SVG baseline.
  const vertices = points
    .slice(0, -1)
    .map(([x, y]) => [350 + x * 77, 280 - y * 77]);
  const pair = (p: number[]) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  const midpoint = (a: number[], b: number[]) => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  return (
    `M${pair(midpoint(vertices.at(-1)!, vertices[0]))}` +
    vertices
      .map(
        (p, i) =>
          `Q${pair(p)} ${pair(midpoint(p, vertices[(i + 1) % vertices.length]))}`,
      )
      .join("") +
    "Z"
  );
});
export default function RelayPoster() {
  const root = useRef<HTMLDivElement>(null);
  const [enhance, setEnhance] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [stage, setStage] = useState(2);
  useEffect(() => {
    const media = matchMedia(
      "(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (!media.matches || connection?.saveData) return;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const frame = requestAnimationFrame(() => setEnhance(media.matches));
    const change = () => {
      if (!media.matches) {
        setEnhance(false);
        setReady(false);
        setStage(2);
      } else setEnhance(true);
    };
    media.addEventListener("change", change);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", change);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting && !document.hidden),
    );
    if (root.current) observer.observe(root.current);
    const visibility = () =>
      setActive(
        !document.hidden &&
          !!root.current &&
          root.current.getBoundingClientRect().bottom > 0 &&
          root.current.getBoundingClientRect().top < window.innerHeight,
      );
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const fail = () => {
    setEnhance(false);
    setReady(false);
    setStage(2);
  };
  return (
    <div
      className={"relay-engine refined-engine" + (ready ? " canvas-ready" : "")}
      ref={root}
      data-stage={stage}
    >
      <div className="relay-visual" aria-hidden="true">
        <div className="engine-ground" />
        <svg className="relay-poster" viewBox="0 0 700 590">
          <defs>
            <linearGradient id="precision-face" x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor="#526781" />
              <stop offset=".23" stopColor="#1d304b" />
              <stop offset=".58" stopColor="#0e1d31" />
              <stop offset="1" stopColor="#233851" />
            </linearGradient>
            <linearGradient id="precision-edge">
              <stop stopColor="#101b2b" />
              <stop offset=".55" stopColor="#344962" />
              <stop offset="1" stopColor="#081321" />
            </linearGradient>
            <radialGradient id="precision-node" cx=".32" cy=".23">
              <stop stopColor="#8eb1ff" />
              <stop offset=".35" stopColor="#4377ff" />
              <stop offset=".8" stopColor="#2354e9" />
              <stop offset="1" stopColor="#163bb2" />
            </radialGradient>
            <filter
              id="precision-shadow"
              x="-40%"
              y="-40%"
              width="180%"
              height="190%"
            >
              <feDropShadow
                dx="7"
                dy="24"
                stdDeviation="14"
                floodColor="#23334c"
                floodOpacity=".16"
              />
            </filter>
          </defs>
          <g
            className="poster-mark"
            transform="translate(350 280) rotate(-9) skewY(3) scale(.92 .96) translate(-350 -280)"
            filter="url(#precision-shadow)"
          >
            <g transform="translate(0 13)" fill="url(#precision-edge)">
              {paths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <g
              fill="url(#precision-face)"
              stroke="#72859b"
              strokeOpacity=".35"
              strokeWidth="1"
            >
              {paths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <circle
              cx={350 + geometry.node.center[0] * 77}
              cy={280 - geometry.node.center[1] * 77}
              r={geometry.node.radius * 77}
              fill="url(#precision-node)"
              stroke="#6387f2"
              strokeWidth="1"
            />
          </g>
        </svg>
        {enhance && (
          <CanvasBoundary onFailure={fail}>
            <RelayCanvas
              active={active}
              onReady={() => setReady(true)}
              onStage={setStage}
              onFailure={fail}
            />
          </CanvasBoundary>
        )}
      </div>
      <div
        className={
          "engine-module incoming" + (stage === 0 ? " module-active" : "")
        }
      >
        <span className="micro">
          <span className="module-dot" /> Incoming call
        </span>
        <strong>“I’d like to book a visit.”</strong>
        <div className="precision-wave" aria-hidden="true">
          {[8, 16, 11, 24, 19, 30, 13, 22, 16, 9, 20, 12].map((h, i) => (
            <i key={i} style={{ height: h }} />
          ))}
        </div>
        <small>Appointment enquiry</small>
      </div>
      <div
        className={
          "engine-module qualified" + (stage === 1 ? " module-active" : "")
        }
      >
        <span className="micro">
          <span className="module-dot" /> Customer record
        </span>
        <strong>Alex Khan</strong>
        <div className="module-tags">
          <span>Request captured</span>
          <i>✓</i>
        </div>
      </div>
      <div
        className={
          "engine-module booking" + (stage === 2 ? " module-active" : "")
        }
      >
        <span className="micro">
          <span className="module-dot" /> Booking confirmed
        </span>
        <strong>Tuesday · 2:30 PM</strong>
        <small>Customer team notified</small>
      </div>
      <p className="hero-demo-label">Internal demo · fictional customer</p>
    </div>
  );
}
