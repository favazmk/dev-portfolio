import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the initials, boxed, in the site's marker yellow. */
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
          background: "#ffd23f",
          color: "#16150f",
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: -1,
          border: "4px solid #16150f",
        }}
      >
        FM
      </div>
    ),
    size
  );
}
