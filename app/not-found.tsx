import type { Metadata } from "next";
import Link from "next/link";
import { serviceCatalog } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: "Page Not Found | Asian Automobiles",
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="aa-404 surface-canvas">
      <div className="wrap">
        <p className="aa-404__code" aria-hidden="true">404</p>
        <h1>Page not found</h1>
        <p className="aa-lead">This address isn’t part of the site. It may have moved when the site was reorganised.</p>
        <div className="aa-actions">
          <Link href="/" className="aa-btn aa-btn--dark">Go to the homepage</Link>
          <Link href="/services/" className="aa-btn aa-btn--ghost">See all services</Link>
        </div>
        <ul className="aa-404__links" aria-label="Services">
          {serviceCatalog.map((service) => (
            <li key={service.id}><Link href={service.href} className="aa-link">{service.title}</Link></li>
          ))}
        </ul>
      </div>
    </main>
  );
}
