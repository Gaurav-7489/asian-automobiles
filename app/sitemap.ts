import type { MetadataRoute } from "next";
import { pageMeta } from "@/lib/page-meta";
import { siteUrl } from "@/lib/site";

/** Published pages only (spec 23.4), from the same list the router prerenders. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...Object.keys(pageMeta).map((key) => "/" + key + "/")];
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
