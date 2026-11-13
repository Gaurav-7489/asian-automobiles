"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Instant feedback for every tap: a slim progress bar starts the moment an internal
 * link is pressed and completes when the new page is shown, so a tap never feels ignored.
 */
export function NavFeedback() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash jump
      if (timer.current) clearTimeout(timer.current);
      setState("loading");
      timer.current = setTimeout(() => setState("idle"), 8000); // never leave the bar stuck
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    setState("done");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 320);
  }, [pathname]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return <div className="aa-nav-progress" data-state={state} aria-hidden="true" />;
}
