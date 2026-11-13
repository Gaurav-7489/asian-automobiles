/** @type {import("next").NextConfig} */
// Security headers for every response (OWASP secure-headers baseline).
// Next.js injects small inline bootstrap scripts into statically generated pages, so script-src keeps
// 'unsafe-inline'; everything else is locked to this origin. No third-party scripts are loaded at all.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(process.env.NODE_ENV === "development" ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 604800,
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    // Pages retired by the specification's 13-page structure.
    const map = {
      "/services/car-service": "/services/car-service-maintenance/",
      "/services/car-ac-repair": "/services/car-ac-service/",
      "/services/wheel-alignment": "/services/wheel-alignment-balancing/",
      "/services/tyre-services": "/services/tyre-care/",
      "/services/accident-repair": "/services/",
      "/services/spare-parts": "/spare-parts/",
      "/book-service": "/contact/",
      "/request-quote": "/contact/",
      "/insurance": "/services/",
      "/facilities": "/about/",
      "/gallery": "/about/",
      "/reviews": "/",
      "/faq": "/",
    };
    return Object.entries(map).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: source + "/", destination, permanent: true },
    ]);
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
