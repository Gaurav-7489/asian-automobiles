"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const serviceLinks = [
  ["General service & repair", "/services/car-service/", "Maintenance / mechanical"],
  ["Car AC service", "/services/car-ac-repair/", "Cooling / airflow"],
  ["Accident repair", "/services/accident-repair/", "Restoration / body repair"],
  ["Denting & painting", "/services/denting-painting/", "Bodywork / paint"],
  ["Wheel alignment", "/services/wheel-alignment/", "Alignment / balancing"],
  ["Tyre services", "/services/tyre-services/", "Tyres / rim repair"],
  ["Spare parts", "/spare-parts/", "Parts enquiry"],
];

const navLinks = [
  ["Insurance", "/insurance/"],
  ["About", "/about/"],
  ["Facilities", "/facilities/"],
  ["Gallery", "/gallery/"],
  ["Reviews", "/reviews/"],
  ["Contact", "/contact/"],
];

const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=283%20V-526%20Govt%20Rest%20House%20Kattoor%20Road%20Irinjalakuda%20Thrissur%20680121%20Kerala";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const warm = (href: string) => router.prefetch(href);

  useEffect(() => {
    let previous = false;
    const onScroll = () => {
      const next = window.scrollY > 18;
      if (next !== previous) {
        previous = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const servicesActive =
    pathname.startsWith("/services") || pathname.startsWith("/spare-parts");

  return (
    <>
      <header
        className={`aa-header aa-header-v4 ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""} ${servicesOpen ? "is-services-open" : ""}`}
      >
        <div className="aa-nav-main">
          <div className="aa-shell aa-header-inner">
            <Link href="/" prefetch={false} className="aa-brand" aria-label="Asian Automobiles home">
              <span className="aa-brand-mark">AA</span>
              <span className="aa-brand-name">
                <b>ASIAN AUTOMOBILES</b>
                <small>IRINJALAKUDA · KERALA</small>
              </span>
            </Link>

            <nav className="aa-desktop-nav aa-desktop-nav-v4" aria-label="Primary navigation">
              <div
                className="aa-nav-services"
                onPointerEnter={() => setServicesOpen(true)}
                onPointerLeave={() => setServicesOpen(false)}
                onFocusCapture={() => setServicesOpen(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={servicesActive ? "is-active" : ""}
                  aria-expanded={servicesOpen}
                  aria-controls="aa-service-mega-menu"
                  onClick={() => setServicesOpen((value) => !value)}
                >
                  Services <ChevronDown size={13} />
                </button>

                <div className="aa-mega" id="aa-service-mega-menu">
                  <div className="aa-mega-top">
                    <div>
                      <span>SERVICE DIRECTORY</span>
                      <strong>Start with what the car needs.</strong>
                    </div>
                    <Link href="/services/" prefetch={false} onPointerEnter={() => warm("/services/")} onFocus={() => warm("/services/")}>
                      View all services <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  <div className="aa-mega-grid">
                    {serviceLinks.map(([label, href, meta], index) => (
                      <Link href={href} key={href} prefetch={false} onPointerEnter={() => warm(href)} onFocus={() => warm(href)} className="aa-mega-link">
                        <span>0{index + 1}</span>
                        <div>
                          <b>{label}</b>
                          <small>{meta}</small>
                        </div>
                        <ArrowUpRight size={15} />
                      </Link>
                    ))}
                    <Link href="/book-service/" prefetch={false} onPointerEnter={() => warm("/book-service/")} onFocus={() => warm("/book-service/")} className="aa-mega-book">
                      <CalendarDays size={18} />
                      <div>
                        <span>READY TO START?</span>
                        <b>Book a service</b>
                      </div>
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>

              {navLinks.map(([label, href]) => {
                const active = pathname === href || pathname.startsWith(href);
                return (
                  <Link key={href} href={href} prefetch={false} onPointerEnter={() => warm(href)} onFocus={() => warm(href)} className={active ? "is-active" : ""}>
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="aa-header-actions">
              <a data-magnetic href="tel:+919349002038" className="aa-header-phone">
                <Phone size={13} />
                <span>Call workshop</span>
              </a>
              <Link data-magnetic href="/book-service/" prefetch={false} onPointerEnter={() => warm("/book-service/")} onFocus={() => warm("/book-service/")} className="aa-header-cta">
                Book service <ArrowUpRight size={14} />
              </Link>
              <button
                className="aa-menu-button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        <div className="aa-mobile-panel">
          <div className="aa-mobile-panel-inner">
            <div className="aa-mobile-service-list">
              <span className="aa-mobile-label">SERVICES</span>
              {serviceLinks.map(([label, href], index) => (
                <Link href={href} key={href} prefetch={false} onPointerEnter={() => warm(href)} onFocus={() => warm(href)}>
                  <span>0{index + 1}</span>
                  <b>{label}</b>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>

            <div className="aa-mobile-primary-links">
              {navLinks.map(([label, href], index) => (
                <Link href={href} key={href} prefetch={false} onPointerEnter={() => warm(href)} onFocus={() => warm(href)}>
                  <span>0{index + 8}</span>
                  <b>{label}</b>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>

            <div className="aa-mobile-menu-actions">
              <a href="tel:+919349002038"><Phone size={15} /> Call workshop</a>
              <Link href="/book-service/" prefetch={false} onPointerEnter={() => warm("/book-service/")} onFocus={() => warm("/book-service/")}><CalendarDays size={15} /> Book a service</Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="aa-mobile-actions" aria-label="Quick actions">
        <a href="tel:+919349002038"><Phone size={15} /><span>Call</span></a>
        <Link href="/book-service/"><CalendarDays size={15} /><span>Book</span></Link>
        <a href={directionsHref} target="_blank" rel="noreferrer">
          <MapPin size={15} /><span>Directions</span>
        </a>
      </nav>
    </>
  );
}
