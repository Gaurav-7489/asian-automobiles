import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { businessFacts, directionsHref } from "@/lib/business-facts";

export function SiteFooter() {
  return (
    <footer className="aa-footer">
      <div className="aa-shell">
        <div className="aa-footer-top">
          <div>
            <Link href="/" className="aa-brand aa-footer-brand">
              <span className="aa-brand-mark">AA</span>
              <span className="aa-brand-name">ASIAN<br />AUTOMOBILES</span>
            </Link>
            <p>{businessFacts.description}</p>
          </div>

          <div className="aa-footer-nav">
            <span>EXPLORE</span>
            <Link href="/">Home <ArrowUpRight size={13} /></Link>
            <Link href="/about/">About <ArrowUpRight size={13} /></Link>
            <Link href="/services/">Services <ArrowUpRight size={13} /></Link>
            <Link href="/spare-parts/">Spare Parts <ArrowUpRight size={13} /></Link>
            <Link href="/contact/">Contact <ArrowUpRight size={13} /></Link>
          </div>

          <div className="aa-footer-contact">
            <span>WORKSHOP</span>
            <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={14} /> {businessFacts.phones.primaryDisplay}</a>
            <a href={"tel:" + businessFacts.phones.landlineHref}><Phone size={14} /> {businessFacts.phones.landlineDisplay}</a>
            <a href={"mailto:" + businessFacts.email}>{businessFacts.email}</a>
            <p><MapPin size={14} /> {businessFacts.address.street}, {businessFacts.address.landmark.toLowerCase()}, {businessFacts.address.locality}</p>
            <p>{businessFacts.hours}</p>
            <a href={directionsHref} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a>
          </div>
        </div>

        <div className="aa-footer-wordmark">ASIAN AUTOMOBILES</div>

        <div className="aa-footer-bottom">
          <span>© {new Date().getFullYear()} Asian Automobiles</span>
          <span>{businessFacts.address.locality.toUpperCase()} / {businessFacts.address.region.toUpperCase()} / INDIA</span>
          <Link href="/privacy-policy/">Privacy Policy <ArrowUpRight size={12} /></Link>
        </div>
      </div>
    </footer>
  );
}
