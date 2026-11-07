/** @type {import("next").NextConfig} */
const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
    deviceSizes: [360, 640, 828, 1080, 1280, 1920],
  },
  experimental: { optimizePackageImports: ["lucide-react"] },
  async redirects() {
    // Routes from the previous site, retired in the 13-page structure.
    const map = {
      "/services/car-service": "/services/car-service-maintenance",
      "/services/car-ac-repair": "/services/car-ac-service",
      "/services/wheel-alignment": "/services/wheel-alignment-balancing",
      "/services/tyre-services": "/services/tyre-care",
      "/services/accident-repair": "/services",
      "/services/spare-parts": "/spare-parts",
      "/book-service": "/contact",
      "/request-quote": "/contact",
      "/insurance": "/services",
      "/facilities": "/about",
      "/gallery": "/about",
      "/reviews": "/",
      "/faq": "/",
    };
    return Object.entries(map).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return isPreview ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }] : [];
  },
};

export default nextConfig;
