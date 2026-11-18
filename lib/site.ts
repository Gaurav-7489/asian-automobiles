/** Canonical origin for metadata, sitemap, robots and structured data (no trailing slash). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app").replace(/\/+$/, "");
