import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/redirects";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 * - Pages are prerendered static HTML, so per-request nonces are not available; Next's inline
 *   bootstrap scripts therefore need 'unsafe-inline'. No user input is ever rendered into HTML.
 * - Only the click-to-load Google Maps embed is framed; the site itself cannot be framed.
 * - 'unsafe-eval' is added in development only (React Refresh needs it).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    // Only the site's own photos can be optimised: no remote hosts, no arbitrary local files,
    // and a fixed set of qualities so the optimiser cannot be used to mint endless variants.
    localPatterns: [{ pathname: "/images/**", search: "" }],
    qualities: [66, 68, 72, 74, 75, 76, 80],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Pages retired by the specification's 13-page structure (with and without trailing slash).
    return Object.entries(legacyRedirects).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: source + "/", destination, permanent: true },
    ]);
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
