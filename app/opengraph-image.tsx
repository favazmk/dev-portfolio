import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(139,92,246,0.35), transparent 50%), radial-gradient(circle at 10% 90%, rgba(34,211,238,0.25), transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#8b5cf6",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 12 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, color: "rgba(255,255,255,0.75)" }}>
          {site.role}
        </div>
      </div>
    ),
    size
  );
}
