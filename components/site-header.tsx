"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["Services", "/services/"],
  ["Insurance", "/insurance/"],
  ["About", "/about/"],
  ["Facilities", "/facilities/"],
  ["Gallery", "/gallery/"],
  ["Contact", "/contact/"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`aa-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="aa-shell aa-header-inner">
        <Link href="/" className="aa-brand" aria-label="Asian Automobiles home">
          <span className="aa-brand-mark">AA</span>
          <span className="aa-brand-name">ASIAN<br />AUTOMOBILES</span>
        </Link>

        <nav className="aa-desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={active ? "is-active" : ""}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="aa-header-actions">
          <a href="tel:+919349002038" className="aa-header-phone">+91 93490 02038</a>
          <Link href="/book-service/" className="aa-header-cta">
            Book service <ArrowUpRight size={14} />
          </Link>
          <button
            className="aa-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className="aa-mobile-panel">
        <div className="aa-shell">
          {links.map(([label, href], index) => (
            <Link href={href} key={href}>
              <span>0{index + 1}</span>
              <b>{label}</b>
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <Link className="aa-mobile-book" href="/book-service/">
            Book a service <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
