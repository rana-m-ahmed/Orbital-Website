import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "ORBITAL — Less busywork. More room to grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/orbital-lockup.png")),
    readFile(join(process.cwd(), "src/fonts/general-sans-social.ttf")),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#07111d",
        color: "#f5f7fa",
        padding: "55px 70px",
        fontFamily: "General Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 260,
          height: 86,
          background: "#f5f7fa",
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={235}
          height={78}
          alt="ORBITAL"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 86,
          lineHeight: 1.08,
          letterSpacing: "-5px",
          marginTop: 50,
        }}
      >
        <span>Less busywork.</span>
        <span style={{ color: "#abbad1" }}>More room to grow.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 46,
          fontSize: 17,
          letterSpacing: "3px",
          color: "#abbad1",
        }}
      >
        AUTOMATION · SOFTWARE · SYSTEMS
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: 125,
          border: "1px solid #294368",
          right: -65,
          top: 15,
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: 75,
          height: 75,
          borderRadius: 40,
          background: "#2f5bff",
          right: 62,
          top: 188,
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: "General Sans", data: font, weight: 500, style: "normal" },
      ],
    },
  );
}
