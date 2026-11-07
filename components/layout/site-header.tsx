"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, MessageCircle, Navigation, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/content/services";

export interface NavService { slug: string; name: string; cardText: string; icon: IconName }
interface Props {
  services: NavService[];
  tel: string | null;
  phone: string | null;
  wa: string | null;
  maps: string;
  address: string;
  hours: string | null;
}

const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/spare-parts", label: "Spare Parts" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ services, tel, phone, wa, maps, address, hours }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mServices, setMServices] = useState(false);
  const ddRef = useRef<HTMLLIElement>(null);
  const ddBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Solid after 80px; on mobile hide on scroll down, reappear on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (window.innerWidth < 1024) setHidden(y > last && y > 120);
      else setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDropdown(false); setMenu(false); }, [pathname]);

  // Dropdown: close on Escape, outside click, focus leaving.
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setDropdown(false); ddBtn.current?.focus(); } };
    const onDown = (e: MouseEvent) => { if (!ddRef.current?.contains(e.target as Node)) setDropdown(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [dropdown]);

  // Mobile menu: scroll lock, focus trap, Escape, focus return; tells the contact bar to hide.
  useEffect(() => {
    document.documentElement.dataset.menu = menu ? "open" : "closed";
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(false); menuBtn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [menu]);

  const active = (href: string) => (href === "/services" ? pathname.startsWith("/services") : pathname === href);
  const transparent = isHome && !scrolled && !menu;

  const onPanelKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(ddRef.current?.querySelectorAll<HTMLElement>("[data-dd-item]") ?? []);
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white transition-[background-color,transform,box-shadow] duration-200 ${transparent ? "lg:bg-transparent" : ""} ${transparent ? "bg-graphite-900 lg:shadow-none" : "bg-graphite-900 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"} ${hidden && !menu ? "-translate-y-full" : ""}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-graphite-900">
        Skip to main content
      </a>
      <div className="container-x flex h-[60px] items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" aria-label="Asian Automobiles – home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {nav.map((n) =>
              n.dropdown ? (
                <li key={n.href} className="relative" ref={ddRef}
                  onMouseEnter={() => { hoverTimer.current = setTimeout(() => setDropdown(true), 150); }}
                  onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setDropdown(false), 150); }}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdown(false); }}
                  onKeyDown={onPanelKey}
                >
                  <span className="flex items-center">
                    <Link href={n.href} aria-current={pathname === "/services" ? "page" : undefined} className={`border-b-2 py-1 ${active(n.href) ? "border-amber-500" : "border-transparent hover:border-white/40"}`}>
                      {n.label}
                    </Link>
                    <button ref={ddBtn} type="button" aria-expanded={dropdown} aria-controls="services-menu" aria-label="Show services" onClick={() => setDropdown((v) => !v)} className="ml-1 inline-flex size-8 items-center justify-center rounded-sm hover:bg-white/10">
                      <ChevronDown className={`size-4 transition-transform duration-150 ${dropdown ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  </span>
                  <div id="services-menu" hidden={!dropdown} className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3">
                    <div className="rounded-md bg-white p-3 text-graphite-900 shadow-[0_12px_40px_rgba(17,24,32,0.18)]">
                      <ul>
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link data-dd-item href={`/services/${s.slug}`} aria-current={pathname === `/services/${s.slug}` ? "page" : undefined} className="flex gap-3 rounded-sm p-3 hover:bg-warm-50">
                              <Icon name={s.icon} className="mt-0.5 size-5 shrink-0 text-amber-700" />
                              <span>
                                <span className="block font-semibold">{s.name}</span>
                                <span className="block text-sm text-slate-600">{s.cardText}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 border-t border-line-200 pt-2">
                        <Link data-dd-item href="/services" className="block rounded-sm p-3 text-sm font-semibold text-amber-700 hover:bg-warm-50">View all services →</Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`border-b-2 py-1 ${active(n.href) ? "border-amber-500" : "border-transparent hover:border-white/40"}`}>
                    {n.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {tel && (
            <a href={tel} data-analytics="contact_click" data-analytics-channel="phone" data-analytics-position="header" aria-label={`Call the workshop on ${phone}`} className="hidden min-h-11 items-center gap-2 rounded-sm bg-amber-500 px-5 font-semibold text-graphite-900 transition-colors hover:bg-amber-700 hover:text-white lg:inline-flex">
              <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              <span className="xl:hidden">Call Us</span>
              <span className="hidden xl:inline">Call {phone}</span>
            </a>
          )}
          {tel && (
            <a href={tel} data-analytics="contact_click" data-analytics-channel="phone" data-analytics-position="header" aria-label={`Call the workshop on ${phone}`} className="inline-flex size-11 items-center justify-center rounded-sm bg-amber-500 text-graphite-900 lg:hidden">
              <Phone className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
          <button ref={menuBtn} type="button" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu((v) => !v)} className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-white/10 lg:hidden">
            {menu ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menu && (
        <div id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-x-0 bottom-0 top-[60px] overflow-y-auto bg-graphite-900 lg:hidden">
          <nav aria-label="Mobile" className="container-x py-6">
            <ul className="divide-y divide-charcoal-800 font-display text-2xl font-semibold">
              <li><Link href="/" className="block py-4">Home</Link></li>
              {nav.map((n) =>
                n.dropdown ? (
                  <li key={n.href}>
                    <div className="flex items-center justify-between">
                      <Link href={n.href} aria-current={active(n.href) ? "page" : undefined} className="block flex-1 py-4">{n.label}</Link>
                      <button type="button" aria-expanded={mServices} aria-controls="m-services" aria-label="Show services" onClick={() => setMServices((v) => !v)} className="inline-flex size-11 items-center justify-center">
                        <ChevronDown className={`size-5 transition-transform ${mServices ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </div>
                    <ul id="m-services" hidden={!mServices} className="pb-4 font-sans text-base font-medium text-grey-400">
                      {services.map((s) => (
                        <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-2.5 hover:text-white">{s.name}</Link></li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={n.href}><Link href={n.href} aria-current={active(n.href) ? "page" : undefined} className="block py-4">{n.label}</Link></li>
                ),
              )}
            </ul>
            <div className="mt-8 grid gap-3">
              {tel && <a href={tel} data-analytics="contact_click" data-analytics-channel="phone" data-analytics-position="mobile_menu" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-amber-500 font-semibold text-graphite-900"><Phone className="size-5" aria-hidden="true" /> Call {phone}</a>}
              {wa && <a href={wa} target="_blank" rel="noopener" data-analytics="contact_click" data-analytics-channel="whatsapp" data-analytics-position="mobile_menu" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm border border-white font-semibold"><MessageCircle className="size-5" aria-hidden="true" /> WhatsApp Us</a>}
              <a href={maps} target="_blank" rel="noopener" data-analytics="directions_click" data-analytics-position="mobile_menu" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm border border-charcoal-800 font-semibold"><Navigation className="size-5" aria-hidden="true" /> Get Directions</a>
            </div>
            <div className="mt-8 text-sm text-grey-400">
              <p>{address}</p>
              {hours && <p className="mt-1">{hours}</p>}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
