import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0e0e0e",
          color: "#ffffff",
        }}
      >
        {/* Head rule, capped in red */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 4, width: 150, background: "#e8352b" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 26,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8e8d87",
            }}
          >
            <div style={{ display: "flex" }}>{site.role}</div>
            <div style={{ display: "flex" }}>©{site.year}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: -5 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 31,
              lineHeight: 1.35,
              maxWidth: 880,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2e2e2e",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8e8d87",
          }}
        >
          <div style={{ display: "flex" }}>{site.location}</div>
          <div style={{ display: "flex" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size
  );
}
