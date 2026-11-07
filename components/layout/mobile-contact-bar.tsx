"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Navigation, Phone } from "lucide-react";

/**
 * Fixed bottom bar below 1024px (spec 20.3.9): Call · WhatsApp · Directions.
 * Hides while an input is focused, while the menu is open and over the footer contact column.
 * On /contact only Call is shown (the cards already serve the purpose).
 */
export function MobileContactBar({ tel, wa, maps }: { tel: string | null; wa: string | null; maps: string }) {
  const pathname = usePathname();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let typing = false, overFooter = false, menu = false;
    const update = () => setHide(typing || overFooter || menu);
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input,textarea,select");
    const onIn = (e: FocusEvent) => { typing = isField(e.target); update(); };
    const onOut = () => { typing = false; update(); };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    const mo = new MutationObserver(() => { menu = document.documentElement.dataset.menu === "open"; update(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-menu"] });
    const target = document.getElementById("footer-contact");
    const io = target ? new IntersectionObserver(([e]) => { overFooter = e.isIntersecting; update(); }) : null;
    if (target) io!.observe(target);
    return () => { document.removeEventListener("focusin", onIn); document.removeEventListener("focusout", onOut); mo.disconnect(); io?.disconnect(); };
  }, [pathname]);

  const contactPage = pathname === "/contact";
  const btn = "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-sm text-[15px] font-semibold";
  return (
    <div aria-label="Quick contact" role="region" className={`fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-800 bg-graphite-900 px-3 pt-2 transition-transform duration-200 lg:hidden ${hide ? "translate-y-full" : ""}`} style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2">
        {tel && <a href={tel} data-analytics="contact_click" data-analytics-channel="phone" data-analytics-position="mobile_bar" className={`${btn} flex-[1.6] bg-amber-500 text-graphite-900`}><Phone className="size-5" aria-hidden="true" /> Call</a>}
        {!contactPage && wa && <a href={wa} target="_blank" rel="noopener" data-analytics="contact_click" data-analytics-channel="whatsapp" data-analytics-position="mobile_bar" className={`${btn} border border-white/70 text-white`}><MessageCircle className="size-5" aria-hidden="true" /> WhatsApp</a>}
        {!contactPage && <a href={maps} target="_blank" rel="noopener" data-analytics="directions_click" data-analytics-position="mobile_bar" className={`${btn} border border-charcoal-800 text-white`}><Navigation className="size-5" aria-hidden="true" /> Directions</a>}
      </div>
    </div>
  );
}
