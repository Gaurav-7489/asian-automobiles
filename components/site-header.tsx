"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Services", "/services"], ["Insurance", "/insurance"], ["About", "/about"],
  ["Facilities", "/facilities"], ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`aa-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="aa-header-inner">
        <Link className="aa-brand" href="/" onClick={() => setOpen(false)} aria-label="Asian Automobiles home">
          <span className="aa-brand-mark">AA</span>
          <span className="aa-brand-copy"><strong>ASIAN</strong><small>AUTOMOBILES</small></span>
        </Link>
        <nav className="aa-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="aa-header-cta">
          <a href="tel:+919349002038">CALL</a>
          <Link href="/book-service" className="aa-book-link">BOOK <ArrowUpRight size={14} /></Link>
        </div>
        <button className="aa-menu-button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="aa-mobile-menu">
          <div className="aa-mobile-links">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>{label}</span><ArrowUpRight size={18} /></Link>)}
          </div>
          <div className="aa-mobile-meta"><span>IRINJALAKUDA / KERALA</span><Link href="/book-service" onClick={() => setOpen(false)}>BOOK SERVICE</Link></div>
        </div>
      )}
    </header>
  );
}
