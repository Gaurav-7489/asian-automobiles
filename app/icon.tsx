import { ImageResponse } from "next/og";

/** Favicon set generated from the wordmark bar (32, 192 and 512 px). */
export function generateImageMetadata() {
  return [32, 192, 512].map((n) => ({ id: String(n), size: { width: n, height: n }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string> | string }) {
  const n = Number(await id);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: n * 0.06, background: "#111820", borderRadius: n * 0.125 }}>
        <div style={{ width: n * 0.08, height: n * 0.5, background: "#D58A3A" }} />
        <div style={{ color: "#fff", fontSize: n * 0.5, fontWeight: 800, lineHeight: 1 }}>A</div>
      </div>
    ),
    { width: n, height: n },
  );
}
