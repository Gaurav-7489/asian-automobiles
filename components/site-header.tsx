"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { serviceCatalog, serviceImage } from "@/lib/service-catalog";
import { businessFacts, directionsHref, whatsappEnabled, whatsappLink } from "@/lib/business-facts";

const serviceLinks = serviceCatalog.map((service) => [service.title, service.href, service.meta]);
const servicePreviewImages = serviceCatalog.map((service) => serviceImage(service));

// Spec 6.2: About · Services ▾ · Spare Parts · Contact
const navLinks = [
  ["About", "/about/"],
  ["Spare Parts", "/spare-parts/"],
  ["Contact", "/contact/"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
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
    setMobileGroup(null);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
        .filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1320) setMenuOpen(false);
    };
    document.addEventListener("keydown", onTab);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onTab);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [menuOpen]);

  const servicesActive =
    pathname.startsWith("/services") || pathname.startsWith("/spare-parts");
  const innerPage = pathname !== "/";
  const whatsappHref = whatsappLink("Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …");

  return (
    <>
      <header
        ref={headerRef}
        className={`aa-header aa-header-v4 aa-header-v5 ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""} ${servicesOpen ? "is-services-open" : ""}`}
      >
        <div className="aa-nav-main">
          <div className="aa-shell aa-header-inner">
            <Link data-magnetic href="/" prefetch={false} className="aa-brand" aria-label="Asian Automobiles home">
              <span className="aa-brand-mark">AA</span>
              <span className="aa-brand-name">
                <b>ASIAN AUTOMOBILES</b>
                <small>{businessFacts.address.locality.toUpperCase()} · {businessFacts.address.region.toUpperCase()}</small>
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
                  onClick={openServices}
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
                        href="/contact/#enquiry"
                        prefetch={false}
                        onPointerEnter={() => warm("/contact/")}
                        onFocus={() => warm("/contact/")}
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
              <a data-magnetic href={"tel:" + businessFacts.phones.primaryHref} className="aa-header-phone">
                <Phone size={14} />
                <span>Call workshop</span>
              </a>
              <Link
                data-magnetic
                href="/contact/#enquiry"
                prefetch={false}
                onPointerEnter={() => warm("/contact/")}
                onFocus={() => warm("/contact/")}
                className="aa-header-cta"
              >
                <span>Book service</span> <ArrowUpRight size={15} />
              </Link>
              <button
                data-magnetic
                ref={menuButtonRef}
                type="button"
                className="aa-menu-button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="aa-mobile-navigation"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span className="aa-menu-icon" aria-hidden="true"><i /><i /></span>
              </button>
            </div>
          </div>
        </div>

        <nav
          ref={panelRef}
          id="aa-mobile-navigation"
          className="aa-mnav"
          aria-label="Expanded navigation"
          inert={!menuOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMenuOpen(false);
              setMobileGroup(null);
            }
          }}
        >
          <div className="aa-mnav-inner">
            <ol className="aa-mnav-list">
              <li style={{ "--i": 0 } as React.CSSProperties}>
                <Link href="/" prefetch={false} className="aa-mnav-link" aria-current={pathname === "/" ? "page" : undefined}>
                  <i>01</i><span>Home</span><ArrowUpRight size={20} />
                </Link>
              </li>
              <li style={{ "--i": 1 } as React.CSSProperties} className={`aa-mnav-group ${mobileGroup === "services" ? "is-expanded" : ""}`}>
                <button
                  type="button"
                  className="aa-mnav-link"
                  id="aa-menu-services-toggle"
                  aria-expanded={mobileGroup === "services"}
                  aria-controls="aa-menu-services-links"
                  onClick={() => setMobileGroup(mobileGroup === "services" ? null : "services")}
                >
                  <i>02</i><span>Services</span><ChevronDown size={20} />
                </button>
                <div className="aa-mnav-sub" inert={mobileGroup !== "services"}>
                  <div>
                    <ul id="aa-menu-services-links" aria-labelledby="aa-menu-services-toggle">
                      {serviceLinks.map(([label, href], n) => (
                        <li key={href}>
                          <Link href={href} prefetch={false} aria-current={pathname === href ? "page" : undefined}>
                            <i>{String(n + 1).padStart(2, "0")}</i><span>{label}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/services/" prefetch={false} aria-current={pathname === "/services/" ? "page" : undefined}>
                          <i>—</i><span>All services</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {navLinks.map(([label, href], n) => (
                <li key={href} style={{ "--i": n + 2 } as React.CSSProperties}>
                  <Link href={href} prefetch={false} className="aa-mnav-link" aria-current={pathname === href ? "page" : undefined}>
                    <i>{String(n + 3).padStart(2, "0")}</i><span>{label}</span><ArrowUpRight size={20} />
                  </Link>
                </li>
              ))}
            </ol>
            <div className="aa-mnav-foot">
              <Link href="/contact/#enquiry" prefetch={false} className="aa-mnav-book">
                <span>Book a service</span><ArrowUpRight size={20} />
              </Link>
              <div className="aa-mnav-quick">
                <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={16} /><span>Call</span></a>
                <a href={directionsHref} target="_blank" rel="noreferrer"><MapPin size={16} /><span>Directions</span></a>
              </div>
              <p className="aa-mnav-meta">{businessFacts.hours} · {businessFacts.address.locality}</p>
            </div>
          </div>
        </nav>
      </header>

      {innerPage && whatsappEnabled && whatsappHref && (
        <a
          className="aa-v10-whatsapp-float"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Message Asian Automobiles on WhatsApp"
        >
          <MessageCircle size={17} />
          <span>WhatsApp</span>
        </a>
      )}

      <nav className="aa-mobile-actions" aria-label="Quick actions">
        <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={15} /><span>Call</span></a>
        {whatsappEnabled && whatsappHref
          ? <a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={15} /><span>WhatsApp</span></a>
          : <Link href="/contact/#enquiry" prefetch={false}><CalendarDays size={15} /><span>Book</span></Link>}
        <a href={directionsHref} target="_blank" rel="noreferrer"><MapPin size={15} /><span>Directions</span></a>
      </nav>
    </>
  );
}
