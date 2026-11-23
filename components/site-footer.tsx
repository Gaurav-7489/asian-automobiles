import Link from "next/link";
import { businessFacts, directionsHref, landlineTel, phoneTel } from "@/lib/business-facts";
import { serviceCatalog } from "@/lib/service-catalog";

export function SiteFooter() {
  return (
    <footer className="aa-footer surface-dark-2">
      <div className="wrap">
        <div className="aa-footer__top">
          <div className="aa-footer__intro">
            <Link href="/" className="aa-brand aa-brand--footer">
              <span className="aa-brand__mark" aria-hidden="true">AA</span>
              <span className="aa-brand__name">Asian Automobiles</span>
            </Link>
            <p>{businessFacts.description}</p>
          </div>

          <nav className="aa-footer__col" aria-label="Footer: services">
            <h2 className="aa-label">Services</h2>
            <ul>
              {serviceCatalog.map((service) => (
                <li key={service.id}><Link href={service.href}>{service.title}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="aa-footer__col" aria-label="Footer: site">
            <h2 className="aa-label">Workshop</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/services/">All services</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/privacy-policy/">Privacy policy</Link></li>
            </ul>
          </nav>

          <div className="aa-footer__col aa-footer__contact">
            <h2 className="aa-label">Visit or call</h2>
            <address>
              {businessFacts.address.street}
              <br />
              {businessFacts.address.landmark}
              <br />
              {businessFacts.address.locality}, {businessFacts.address.region} {businessFacts.address.postalCode}
            </address>
            <ul>
              <li><a href={phoneTel}>{businessFacts.phones.primaryDisplay}</a></li>
              <li><a href={landlineTel}>{businessFacts.phones.landlineDisplay}</a></li>
              <li><a href={"mailto:" + businessFacts.email}>{businessFacts.email}</a></li>
              <li><a href={directionsHref} target="_blank" rel="noopener noreferrer">Get directions</a></li>
            </ul>
            <p>{businessFacts.hours}{businessFacts.sundayClosed ? ". Closed on Sundays." : "."}</p>
          </div>
        </div>

        <span className="aa-gauge aa-footer__gauge" aria-hidden="true" />

        <div className="aa-footer__bottom">
          <p className="aa-footer-wordmark" aria-hidden="true">Asian Automobiles</p>
          <p>© {new Date().getFullYear()} Asian Automobiles. Independent multi-brand car service, Irinjalakuda.</p>
        </div>
      </div>
    </footer>
  );
}
