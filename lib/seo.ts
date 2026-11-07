import type { Metadata } from "next";
import { business, serviceArea } from "@/content/business";
import type { Faq, Service } from "@/content/services";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://asian-automobiles.vercel.app").replace(/\/$/, "");
export const absolute = (path: string) => `${siteUrl}${path === "/" ? "/" : path}`;

export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absolute(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_IN",
      siteName: "Asian Automobiles",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** AutoRepair entity – verified values only; provisional/unknown properties are omitted. */
export function businessJsonLd() {
  const strictOnly = <T,>(f: { value: T | null; status: string }) => (f.status === "confirmed" ? f.value : null);
  const hours = strictOnly(business.hours);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#business`,
    name: business.name.value,
    url: `${siteUrl}/`,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kattoor Road, near Government Rest House",
      addressLocality: "Irinjalakuda",
      addressRegion: "Kerala",
      postalCode: "680121",
      addressCountry: "IN",
    },
    areaServed: ["Irinjalakuda", ...serviceArea.slice(0, 6)],
  };
  const tel = strictOnly(business.phonePrimary);
  if (tel) data.telephone = tel;
  const email = strictOnly(business.email);
  if (email) data.email = email;
  if (hours)
    data.openingHoursSpecification = hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  const map = strictOnly(business.mapsUrl);
  if (map) data.hasMap = map;
  if (business.sameAs.length) data.sameAs = business.sameAs;
  return data;
}

export function serviceJsonLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.name,
    name: s.hero.h1,
    description: s.seo.description,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: "Irinjalakuda",
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absolute(it.href) })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

