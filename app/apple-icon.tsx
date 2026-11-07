import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: "#111820" }}>
        <div style={{ width: 14, height: 90, background: "#D58A3A" }} />
        <div style={{ color: "#fff", fontSize: 92, fontWeight: 800, lineHeight: 1 }}>A</div>
      </div>
    ),
    size,
  );
}
