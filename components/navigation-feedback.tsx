"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Immediate feedback for internal navigation without delaying it.
 *
 * One capture-phase click listener marks <html data-navigating> when a same-origin page link
 * is followed; the route change clears it. CSS reveals a thin progress bar only after a short
 * delay, so prefetched (instant) navigations never flash and nothing re-renders or remounts.
 */
function isPageNavigation(event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  const url = new URL(anchor.href, location.href);
  if (url.origin !== location.origin) return false;
  // Same page (or only the #hash differs): nothing to load.
  return url.pathname !== location.pathname || url.search !== location.search;
}

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    const root = document.documentElement;
    let failsafe: ReturnType<typeof setTimeout> | undefined;
    const onClick = (event: MouseEvent) => {
      if (!isPageNavigation(event)) return;
      root.dataset.navigating = "";
      clearTimeout(failsafe);
      failsafe = setTimeout(() => delete root.dataset.navigating, 8000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    delete document.documentElement.dataset.navigating;
  }, [pathname, search]);

  return null;
}

export function NavigationFeedback() {
  return (
    <>
      <div className="aa-nav-progress" aria-hidden="true" />
      <Suspense fallback={null}>
        <Tracker />
      </Suspense>
    </>
  );
}
