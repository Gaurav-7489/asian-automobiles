import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absolute } from "@/lib/seo";

/** Static routes plus published services only – conditional pages appear once switched on. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/services", ...services.map((s) => `/services/${s.slug}`), "/spare-parts", "/contact", "/privacy-policy"];
  return routes.map((r) => ({ url: absolute(r), changeFrequency: r === "/" ? "weekly" : "monthly", priority: r === "/" ? 1 : r.startsWith("/services") ? 0.9 : 0.6 }));
}
