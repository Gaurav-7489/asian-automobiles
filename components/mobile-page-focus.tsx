"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { businessFacts, directionsHref } from "@/lib/business-facts";
import { serviceCatalog } from "@/lib/service-catalog";

/**
 * Phone-only editorial surface. Desktop/tablet retain the full experience.
 * Transactional pages keep their original forms and interactive functionality.
 */
const summaries: Record<string, { label: string; title: string; copy: string; action: string; href: string }> = {
  "/": { label: "YOUR LOCAL WORKSHOP", title: "Precision for every drive.", copy: "Servicing, repairs, AC, wheel alignment, tyre care and spare parts for cars of many makes in Irinjalakuda.", action: "Explore services", href: "/services/" },
  "/about": { label: "ABOUT THE WORKSHOP", title: "Asian Automobiles.", copy: "An independent, multi-brand car service centre on Kattoor Road, Irinjalakuda. Not a dealership.", action: "Visit the workshop", href: "/contact/" },
  "/spare-parts": { label: "SPARE PARTS", title: "Looking for a part?", copy: "Tell us your car’s make, model and year and the part you need. We’ll check genuine (OEM) and aftermarket options.", action: "Call us", href: "tel:" + businessFacts.phones.primaryHref },
  "/services": { label: "SERVICES", title: "What does your car need?", copy: "Choose a service below, or call us and describe what you’re noticing.", action: "Call the workshop", href: "tel:" + businessFacts.phones.primaryHref },
};
function normalize(path: string) { return path === "/" ? "/" : path.replace(/\/$/, ""); }

export function MobilePageFocus() {
  const pathname = normalize(usePathname());
  // Never replace booking, quotes, enquiries or other transactional experiences.
  if (pathname === "/contact" || pathname === "/privacy-policy" || pathname.startsWith("/book-service") || pathname.startsWith("/quote") || pathname.startsWith("/enquiry")) return null;
  const service = serviceCatalog.find((item) => normalize(item.href) === pathname);
  const entry = service
    ? { label: service.meta, title: service.title, copy: service.description, action: "Call about this service", href: "tel:" + businessFacts.phones.primaryHref }
    : summaries[pathname];
  if (!entry) return null;
  return (
    <section className="aa-mobile-focus" aria-label="Mobile page essentials">
      <div className="aa-mobile-focus-inner">
        <span className="aa-mobile-focus-eyebrow">{entry.label}</span>
        <h1>{entry.title}</h1>
        <p>{entry.copy}</p>
        {pathname === "/services" && (
          <nav className="aa-mobile-focus-directory" aria-label="Choose a service">
            {serviceCatalog.map((item) => <Link key={item.id} href={item.href}>{item.title}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
          </nav>
        )}
        <div className="aa-mobile-focus-actions">
          <Link className="aa-mobile-focus-primary" href={entry.href}>{entry.action}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          <a className="aa-mobile-focus-secondary" href={"tel:" + businessFacts.phones.primaryHref}><Phone size={16} aria-hidden="true" /> Call workshop</a>
        </div>
        <a className="aa-mobile-focus-location" href={directionsHref} target="_blank" rel="noreferrer"><MapPin size={15} aria-hidden="true" /> {businessFacts.address.locality}, Kattoor Road · Directions</a>
      </div>
    </section>
  );
}
