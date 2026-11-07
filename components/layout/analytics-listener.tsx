"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/** One delegated listener for every element carrying data-analytics (spec 21.7). */
export function AnalyticsListener() {
  const page = usePathname();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-analytics]");
      if (el) track(el.dataset.analytics!, { channel: el.dataset.analyticsChannel, position: el.dataset.analyticsPosition, page });
    };
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.matches?.("[data-faq]") && d.open) track("faq_open", { question: d.id, page });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    // Deep link /page#faq-<slug> opens that item.
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith("faq-")) { const d = document.getElementById(hash); if (d instanceof HTMLDetailsElement) d.open = true; }
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("toggle", onToggle, true); };
  }, [page]);
  return null;
}
