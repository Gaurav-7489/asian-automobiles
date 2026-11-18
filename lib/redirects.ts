/**
 * Retired URLs from the previous site structure → their canonical pages.
 * Single source of truth: consumed by next.config.ts as permanent (308) redirects.
 * Destinations are fixed internal paths, so no redirect can be pointed off-site.
 */
export const legacyRedirects: Readonly<Record<string, string>> = {
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
