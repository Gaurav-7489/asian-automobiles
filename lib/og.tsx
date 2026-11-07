import { ImageResponse } from "next/og";

/** Branded 1200×630 social preview: page title on graphite with the amber bar (spec 23.5). */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogImage(title: string, eyebrow = "Kattoor Road, Irinjalakuda") {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111820", color: "#fff", padding: "72px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 6, height: 52, background: "#D58A3A" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 6 }}>ASIAN</div>
            <div style={{ fontSize: 16, letterSpacing: 6, opacity: 0.8 }}>AUTOMOBILES</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, color: "#D58A3A", letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#87919A" }}>Independent multi-brand car service centre</div>
      </div>
    ),
    ogSize,
  );
}
