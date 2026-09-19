"use client";

import { useEffect, useRef } from "react";

export function InteractiveLayer() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let scrollRaf = 0;
    let pointerRaf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--aa-progress", `${Math.min(1, window.scrollY / max) * 100}%`);
      scrollRaf = 0;
    };

    const animatePointer = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (ring) ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      if (dot) dot.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;

      if (Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1) {
        pointerRaf = requestAnimationFrame(animatePointer);
      } else {
        pointerRaf = 0;
      }
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(updateScroll);
    };

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--aa-mx", `${event.clientX}px`);
      root.style.setProperty("--aa-my", `${event.clientY}px`);

      if (coarse || reduced) return;

      targetX = event.clientX;
      targetY = event.clientY;
      if (!pointerRaf) pointerRaf = requestAnimationFrame(animatePointer);

      const target = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * 0.13;
        const y = (event.clientY - (rect.top + rect.height / 2)) * 0.13;
        target.style.setProperty("--mag-x", `${x}px`);
        target.style.setProperty("--mag-y", `${y}px`);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      if (coarse) return;
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest?.("a,button,[data-magnetic]");
      root.classList.toggle("aa-cursor-active", Boolean(interactive));
    };

    const onPointerOut = (event: PointerEvent) => {
      if (coarse) return;
      const leaving = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (leaving) {
        leaving.style.setProperty("--mag-x", "0px");
        leaving.style.setProperty("--mag-y", "0px");
      }
      const next = event.relatedTarget as HTMLElement | null;
      if (!next?.closest?.("a,button,[data-magnetic]")) root.classList.remove("aa-cursor-active");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(pointerRaf);
    };
  }, []);

  return (
    <>
      <div className="aa-progress" aria-hidden="true" />
      <div ref={ringRef} className="aa-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="aa-cursor-dot" aria-hidden="true" />
    </>
  );
}
