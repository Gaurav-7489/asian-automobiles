import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about/",
  "/services/",
  "/services/car-service/",
  "/services/car-ac-repair/",
  "/services/accident-repair/",
  "/services/denting-painting/",
  "/services/wheel-alignment/",
  "/services/tyre-services/",
  "/spare-parts/",
  "/insurance/",
  "/facilities/",
  "/gallery/",
  "/reviews/",
  "/book-service/",
  "/request-quote/",
  "/contact/",
  "/faq/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app";
  return routes.map((route) => ({
    url: new URL(route, base).toString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
