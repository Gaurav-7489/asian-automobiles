/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
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
