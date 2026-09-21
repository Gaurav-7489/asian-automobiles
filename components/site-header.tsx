"use client";

import Image from "next/image";
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
import { useEffect, useRef, useState } from "react";
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

const servicePreviewImages = [
  "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=72",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=72",
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
  const [servicePreview, setServicePreview] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const warm = (href: string) => router.prefetch(href);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const scheduleServicesClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 260);
  };

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
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const servicesActive =
    pathname.startsWith("/services") || pathname.startsWith("/spare-parts");

  return (
    <>
      <header
        className={`aa-header aa-header-v4 aa-header-v5 ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""} ${servicesOpen ? "is-services-open" : ""}`}
      >
        <div className="aa-nav-main">
          <div className="aa-shell aa-header-inner">
            <Link data-magnetic href="/" prefetch={false} className="aa-brand" aria-label="Asian Automobiles home">
              <span className="aa-brand-mark">AA</span>
              <span className="aa-brand-name">
                <b>ASIAN AUTOMOBILES</b>
                <small>IRINJALAKUDA · KERALA</small>
              </span>
            </Link>

            <nav className="aa-desktop-nav aa-desktop-nav-v4" aria-label="Primary navigation">
              <div
                className="aa-nav-services"
                onPointerEnter={openServices}
                onPointerLeave={scheduleServicesClose}
                onFocusCapture={openServices}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    scheduleServicesClose();
                  }
                }}
              >
                <button
                  data-magnetic
                  type="button"
                  className={servicesActive ? "is-active" : ""}
                  aria-expanded={servicesOpen}
                  aria-controls="aa-service-mega-menu"
                  onClick={() => {
                    if (servicesOpen) setServicesOpen(false);
                    else openServices();
                  }}
                >
                  <span>Services</span> <ChevronDown size={14} />
                </button>

                <div
                  className="aa-mega-bridge"
                  aria-hidden="true"
                  onPointerEnter={openServices}
                />

                <div
                  className="aa-mega"
                  id="aa-service-mega-menu"
                  onPointerEnter={openServices}
                  onPointerLeave={scheduleServicesClose}
                >
                  <div className="aa-mega-top">
                    <div>
                      <span>SERVICE DIRECTORY</span>
                      <strong>What does the car need?</strong>
                      <small>Pick the closest match. We’ll take it from there.</small>
                    </div>
                    <Link
                      data-magnetic
                      href="/services/"
                      prefetch={false}
                      onPointerEnter={() => warm("/services/")}
                      onFocus={() => warm("/services/")}
                    >
                      View all services <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  <div className="aa-mega-body">
                    <div className="aa-mega-grid">
                      {serviceLinks.map(([label, href, meta], index) => (
                        <Link
                          href={href}
                          key={href}
                          prefetch={false}
                          onPointerEnter={() => {
                            setServicePreview(index);
                            warm(href);
                          }}
                          onFocus={() => {
                            setServicePreview(index);
                            warm(href);
                          }}
                          className="aa-mega-link"
                        >
                          <span>0{index + 1}</span>
                          <div>
                            <b>{label}</b>
                            <small>{meta}</small>
                          </div>
                          <ArrowUpRight size={16} />
                        </Link>
                      ))}
                      <Link
                        data-magnetic
                        href="/book-service/"
                        prefetch={false}
                        onPointerEnter={() => warm("/book-service/")}
                        onFocus={() => warm("/book-service/")}
                        className="aa-mega-book"
                      >
                        <CalendarDays size={19} />
                        <div>
                          <span>READY TO START?</span>
                          <b>Book a service</b>
                        </div>
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                    <figure className="aa-mega-preview" aria-hidden="true">
                      <Image
                        key={servicePreviewImages[servicePreview]}
                        src={servicePreviewImages[servicePreview]}
                        alt=""
                        fill
                        quality={66}
                        sizes="340px"
                      />
                      <figcaption>
                        <span>0{servicePreview + 1}</span>
                        <b>{serviceLinks[servicePreview][0]}</b>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>

              {navLinks.map(([label, href]) => {
                const active = pathname === href || pathname.startsWith(href);
                return (
                  <Link
                    data-magnetic
                    key={href}
                    href={href}
                    prefetch={false}
                    onPointerEnter={() => warm(href)}
                    onFocus={() => warm(href)}
                    className={active ? "is-active" : ""}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="aa-header-actions">
              <a data-magnetic href="tel:+919349002038" className="aa-header-phone">
                <Phone size={14} />
                <span>Call workshop</span>
              </a>
              <Link
                data-magnetic
                href="/book-service/"
                prefetch={false}
                onPointerEnter={() => warm("/book-service/")}
                onFocus={() => warm("/book-service/")}
                className="aa-header-cta"
              >
                <span>Book service</span> <ArrowUpRight size={15} />
              </Link>
              <button
                data-magnetic
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
              <span className="aa-mobile-label">SERVICES / START WITH THE NEED</span>
              {serviceLinks.map(([label, href], index) => (
                <Link href={href} key={href} prefetch={false}>
                  <span>0{index + 1}</span>
                  <b>{label}</b>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>

            <div className="aa-mobile-primary-links">
              {navLinks.map(([label, href], index) => (
                <Link href={href} key={href} prefetch={false}>
                  <span>0{index + 8}</span>
                  <b>{label}</b>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>

            <div className="aa-mobile-menu-actions">
              <a href="tel:+919349002038"><Phone size={15} /> Call workshop</a>
              <Link href="/book-service/" prefetch={false}><CalendarDays size={15} /> Book a service</Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="aa-mobile-actions" aria-label="Quick actions">
        <a href="tel:+919349002038"><Phone size={15} /><span>Call</span></a>
        <Link href="/book-service/" prefetch={false}><CalendarDays size={15} /><span>Book</span></Link>
        <a href={directionsHref} target="_blank" rel="noreferrer">
          <MapPin size={15} /><span>Directions</span>
        </a>
      </nav>
    </>
  );
}
