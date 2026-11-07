import { getService, services } from "@/content/services";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Asian Automobiles service";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return ogImage(s?.hero.h1 ?? "Car services in Irinjalakuda", s?.hero.eyebrow);
}
