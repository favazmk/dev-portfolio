import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the initials on ink, with the system's red registration mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#0e0e0e",
          color: "#ffffff",
          fontSize: 25,
          fontWeight: 600,
          letterSpacing: -1,
        }}
      >
        FM
        <div
          style={{
            position: "absolute",
            right: 9,
            top: 11,
            width: 7,
            height: 7,
            background: "#e8352b",
          }}
        />
      </div>
    ),
    size
  );
}
