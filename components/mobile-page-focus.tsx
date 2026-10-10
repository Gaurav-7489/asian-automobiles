"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { businessFacts, directionsHref } from "@/lib/business-facts";
import { bookingHref, serviceCatalog } from "@/lib/service-catalog";

/**
 * Phone-only editorial surface. Desktop/tablet retain the full experience.
 * Transactional pages keep their original forms and interactive functionality.
 */
const summaries: Record<string, { label: string; title: string; copy: string; action: string; href: string }> = {
  "/": { label: "YOUR LOCAL WORKSHOP", title: "Car care, made simple.", copy: "Multi-brand car servicing, repairs, wheel care and spare-parts support in Irinjalakuda.", action: "Explore services", href: "/services/" },
  "/about": { label: "ABOUT THE WORKSHOP", title: "Asian Automobiles.", copy: "An independent multi-brand service centre serving private car owners in Irinjalakuda, Kerala.", action: "Visit the workshop", href: "/contact/" },
  "/facilities": { label: "OUR WORKSHOP", title: "See where the work happens.", copy: "Explore the workshop and contact our team to confirm facilities available for your vehicle.", action: "Ask the workshop", href: "/contact/" },
  "/gallery": { label: "THE WORKSHOP", title: "A closer look.", copy: "Get to know Asian Automobiles and our automotive service offering.", action: "Enquire now", href: "/contact/" },
  "/reviews": { label: "CUSTOMER EXPERIENCE", title: "Service starts with a conversation.", copy: "Have a question about your car? Speak directly with the workshop before booking.", action: "Contact us", href: "/contact/" },
  "/insurance": { label: "ACCIDENT & INSURANCE", title: "Need help after an accident?", copy: businessFacts.insurance.publicNote, action: "Discuss your case", href: "/book-service/?intent=quote" },
  "/faq": { label: "QUICK ANSWERS", title: "Need a clear answer?", copy: "For availability, pricing, vehicle compatibility or workshop hours, speak directly with our team.", action: "Contact workshop", href: "/contact/" },
  "/services": { label: "SERVICES", title: "What does your car need?", copy: "Choose a service below. You can send the details directly to our workshop.", action: "Book a service", href: "/book-service/" },
};
function normalize(path: string) { return path === "/" ? "/" : path.replace(/\/$/, ""); }

export function MobilePageFocus() {
  const pathname = normalize(usePathname());
  // Never replace booking, quotes, enquiries or other transactional experiences.
  if (pathname === "/contact" || pathname.startsWith("/book-service") || pathname.startsWith("/quote") || pathname.startsWith("/enquiry")) return null;
  const service = serviceCatalog.find((item) => normalize(item.href) === pathname);
  const entry = service
    ? { label: service.meta, title: service.title, copy: service.description, action: "Enquire about this service", href: bookingHref(service.id) }
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
