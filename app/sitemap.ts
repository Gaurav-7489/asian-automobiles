import type { MetadataRoute } from "next";
import { serviceCatalog } from "@/lib/service-catalog";

/** Published pages only (spec 23.4). Conditional services appear once switched on. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app";
  const routes = ["", "/about/", "/services/", ...serviceCatalog.map((s) => s.href), "/contact/", "/privacy-policy/"];
  return [...new Set(routes)].map((route) => ({
    url: new URL(route, base).toString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
