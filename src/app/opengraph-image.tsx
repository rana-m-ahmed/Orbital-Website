import { ImageResponse } from "next/og";
export const alt = "ORBITAL - Websites, software and AI automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: "#101d30",
        color: "#f8f8f4",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        ORBITAL{" "}
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 50,
            background: "#4377ff",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          lineHeight: 1.05,
          letterSpacing: -3,
        }}
      >
        <span>Websites, software and</span>
        <span>AI automation for business.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#c5d1e2",
        }}
      >
        <span>Websites. Software. AI Automation.</span>
        <span>reachorbital.tech</span>
      </div>
    </div>,
    size,
  );
}
