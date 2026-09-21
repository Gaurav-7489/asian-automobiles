import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { businessFacts } from "@/lib/business-facts";

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
            <p>{businessFacts.positioning.businessType} in {businessFacts.address.locality}, {businessFacts.address.region}.</p>
          </div>

          <div className="aa-footer-nav">
            <span>EXPLORE</span>
            <Link href="/services/">Services <ArrowUpRight size={13} /></Link>
            <Link href="/insurance/">Insurance <ArrowUpRight size={13} /></Link>
            <Link href="/facilities/">Facilities <ArrowUpRight size={13} /></Link>
            <Link href="/gallery/">Gallery <ArrowUpRight size={13} /></Link>
            <Link href="/about/">About <ArrowUpRight size={13} /></Link>
            <Link href="/contact/">Contact <ArrowUpRight size={13} /></Link>
          </div>

          <div className="aa-footer-contact">
            <span>WORKSHOP</span>
            <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={14} /> {businessFacts.phones.primaryDisplay}</a>
            <p><MapPin size={14} /> {businessFacts.address.street}, {businessFacts.address.locality}, {businessFacts.address.district}</p>
            <Link href="/book-service/">Book a service <ArrowUpRight size={13} /></Link>
          </div>
        </div>

        <div className="aa-footer-wordmark">ASIAN AUTOMOBILES</div>

        <div className="aa-footer-bottom">
          <span>© {new Date().getFullYear()} Asian Automobiles</span>
          <span>{businessFacts.address.locality.toUpperCase()} / {businessFacts.address.region.toUpperCase()} / INDIA</span>
          <Link href="/book-service/">Book service <ArrowUpRight size={12} /></Link>
        </div>
      </div>
    </footer>
  );
}
