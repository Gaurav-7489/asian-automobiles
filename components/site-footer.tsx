import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

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
            <p>Automotive service, repair and parts in Irinjalakuda, Kerala.</p>
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
            <a href="tel:+919349002038"><Phone size={14} /> +91 93490 02038</a>
            <p><MapPin size={14} /> Kattoor Road, Irinjalakuda, Thrissur</p>
            <Link href="/book-service/">Book a service <ArrowUpRight size={13} /></Link>
          </div>
        </div>

        <div className="aa-footer-wordmark">ASIAN AUTOMOBILES</div>

        <div className="aa-footer-bottom">
          <span>© {new Date().getFullYear()} Asian Automobiles</span>
          <span>IRINJALAKUDA / KERALA / INDIA</span>
          <Link href="/book-service/">Book service <ArrowUpRight size={12} /></Link>
        </div>
      </div>
    </footer>
  );
}
