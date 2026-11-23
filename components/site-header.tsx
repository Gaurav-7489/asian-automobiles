"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { serviceCatalog, serviceImage } from "@/lib/service-catalog";
import { businessFacts, directionsHref, phoneTel, whatsappEnabled, whatsappLink } from "@/lib/business-facts";

/** Width at which the full desktop navigation replaces the menu button (keep in sync with layout.css). */
const DESKTOP_MIN = 1100;

// Spec 6.2: About · Services ▾ · Spare Parts · Contact
const navLinks = [
  ["About", "/about/"],
  ["Spare parts", "/spare-parts/"],
  ["Contact", "/contact/"],
] as const;

/** Pages that open on a dark photograph: the header starts with light text there. */
function startsDark(pathname: string) {
  return pathname === "/" || pathname.startsWith("/services/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaSeen, setMegaSeen] = useState(false);
  const [preview, setPreview] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
    setMegaSeen(true);
  };
  const scheduleMegaClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 220);
  };

  // Solid bar once the page has scrolled. Only flips state when the threshold is crossed.
  useEffect(() => {
    let previous = false;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next !== previous) {
        previous = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A completed navigation closes every menu.
  useEffect(() => {
    setMenuOpen(false);
    setServicesExpanded(false);
    setMegaOpen(false);
  }, [pathname]);

  // Open mobile menu: lock page scroll, move focus in, trap Tab, close on desktop resize.
  useEffect(() => {
    if (!menuOpen) return;
    const { body, documentElement } = document;
    const previousBody = body.style.overflow;
    const previousHtml = documentElement.style.overflow;
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []).filter(
        (element) => !element.closest("[inert]") && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden",
      );
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
      if (window.innerWidth >= DESKTOP_MIN) setMenuOpen(false);
    };
    document.addEventListener("keydown", onTab);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onTab);
      window.removeEventListener("resize", onResize);
      body.style.overflow = previousBody;
      documentElement.style.overflow = previousHtml;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      setMegaOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const servicesActive = pathname.startsWith("/services");
  const tone = !scrolled && !menuOpen && startsDark(pathname) ? "on-dark" : "on-light";
  const whatsappHref = whatsappLink("Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …");

  return (
    <>
      <header
        ref={headerRef}
        data-tone={tone}
        className={"aa-header" + (scrolled ? " is-scrolled" : "") + (menuOpen ? " is-open" : "") + (megaOpen ? " is-services-open" : "")}
      >
        <div className="aa-header__bar wrap">
          <Link href="/" className="aa-brand">
            <span className="aa-brand__mark" aria-hidden="true">AA</span>
            <span className="aa-brand__name">Asian Automobiles</span>
          </Link>

          <nav className="aa-nav" aria-label="Primary navigation">
            <Link href="/about/" className={pathname.startsWith("/about") ? "is-active" : ""} aria-current={pathname === "/about/" ? "page" : undefined}>About</Link>

            <div
              className="aa-nav__services"
              onPointerEnter={(event) => event.pointerType === "mouse" && openMega()}
              onPointerLeave={(event) => event.pointerType === "mouse" && scheduleMegaClose()}
              onFocusCapture={openMega}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleMegaClose();
              }}
            >
              <button
                type="button"
                className={servicesActive ? "is-active" : ""}
                aria-expanded={megaOpen}
                aria-controls="aa-service-mega-menu"
                onClick={openMega}
              >
                Services <ChevronDown size={14} aria-hidden="true" />
              </button>

              <div className="aa-mega" id="aa-service-mega-menu">
                <div className="aa-mega__list">
                  <ul>
                    {serviceCatalog.map((service, index) => (
                      <li key={service.id}>
                        <Link
                          href={service.href}
                          className="aa-mega__link"
                          aria-current={pathname === service.href ? "page" : undefined}
                          onPointerEnter={() => setPreview(index)}
                          onFocus={() => setPreview(index)}
                        >
                          <b>{service.title}</b>
                          <small>{service.description}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/services/" className="aa-mega__all">View all services</Link>
                </div>
                <div className="aa-mega__preview" aria-hidden="true">
                  {megaSeen && serviceCatalog.map((service, index) => (
                    <Image
                      key={service.id}
                      src={serviceImage(service)}
                      alt=""
                      fill
                      quality={66}
                      sizes="320px"
                      className={index === preview ? "is-active" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map(([label, href]) => (
              <Link key={href} href={href} className={pathname.startsWith(href) ? "is-active" : ""} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="aa-header__actions">
            <a href={phoneTel} className="aa-header__phone">
              <Phone size={15} aria-hidden="true" />
              <span>{businessFacts.phones.primaryDisplay}</span>
            </a>
            <Link href="/contact/#enquiry" className="aa-btn aa-btn--primary aa-header__cta">Make an enquiry</Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="aa-menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="aa-mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span aria-hidden="true"><i /><i /></span>
            </button>
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
              setServicesExpanded(false);
            }
          }}
        >
          <div className="aa-mnav__inner wrap">
            <ul className="aa-mnav-list">
              <li style={{ "--i": 0 } as CSSProperties}>
                <Link href="/" className="aa-mnav-link" aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
              </li>
              <li style={{ "--i": 1 } as CSSProperties}>
                <Link href="/about/" className="aa-mnav-link" aria-current={pathname === "/about/" ? "page" : undefined}>About</Link>
              </li>
              <li style={{ "--i": 2 } as CSSProperties} className={"aa-mnav-group" + (servicesExpanded ? " is-expanded" : "")}>
                <button
                  type="button"
                  className="aa-mnav-link"
                  id="aa-menu-services-toggle"
                  aria-expanded={servicesExpanded}
                  aria-controls="aa-menu-services-links"
                  onClick={() => setServicesExpanded((value) => !value)}
                >
                  Services <ChevronDown size={22} aria-hidden="true" />
                </button>
                <div className="aa-mnav-sub" inert={!servicesExpanded}>
                  <div>
                    <ul id="aa-menu-services-links" aria-labelledby="aa-menu-services-toggle">
                      {serviceCatalog.map((service) => (
                        <li key={service.id}>
                          <Link href={service.href} aria-current={pathname === service.href ? "page" : undefined}>
                            <span>{service.title}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/services/" aria-current={pathname === "/services/" ? "page" : undefined}>
                          <span>All services</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {navLinks.slice(1).map(([label, href], index) => (
                <li key={href} style={{ "--i": index + 3 } as CSSProperties}>
                  <Link href={href} className="aa-mnav-link" aria-current={pathname === href ? "page" : undefined}>{label}</Link>
                </li>
              ))}
            </ul>

            <div className="aa-mnav__foot">
              <Link href="/contact/#enquiry" className="aa-btn aa-btn--primary aa-mnav__enquire">Make an enquiry</Link>
              <div className="aa-mnav__quick">
                <a href={phoneTel}><Phone size={16} aria-hidden="true" /><span>Call</span></a>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" /><span>Directions</span></a>
              </div>
              <p>{businessFacts.hours}{businessFacts.sundayClosed ? ". Closed on Sundays." : "."}</p>
            </div>
          </div>
        </nav>
      </header>

      {/* Phones: the three things people come for, always one tap away. */}
      <nav className="aa-mobile-actions" aria-label="Quick actions">
        <a href={phoneTel}><Phone size={17} aria-hidden="true" /><span>Call</span></a>
        {whatsappEnabled && whatsappHref
          ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /><span>WhatsApp</span></a>
          : <Link href="/contact/#enquiry"><MessageCircle size={17} aria-hidden="true" /><span>Enquire</span></Link>}
        <a href={directionsHref} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" /><span>Directions</span></a>
      </nav>
    </>
  );
}
