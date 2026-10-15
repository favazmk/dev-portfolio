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
          justifyContent: "center",
          padding: "80px",
          background: "#f5f3ec",
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(120,145,180,0.3) 47px, rgba(120,145,180,0.3) 48px)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "monospace",
            letterSpacing: 4,
            color: "#4b483c",
          }}
        >
          {site.role.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 132,
            fontWeight: 900,
            color: "#16150f",
            letterSpacing: -4,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 36,
            color: "#16150f",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            padding: "14px 28px",
            background: "#ffd23f",
            border: "3px solid #16150f",
            fontSize: 26,
            fontFamily: "monospace",
            alignSelf: "flex-start",
          }}
        >
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
