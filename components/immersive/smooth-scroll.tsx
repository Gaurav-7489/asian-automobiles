"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    // Touch devices already have excellent native inertial scrolling.
    // Keep the animation layer off when motion or data should be conserved.
    if (reduced || coarse || connection?.saveData) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      syncTouch: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    document.documentElement.classList.add("aa-lenis");

    return () => {
      document.documentElement.classList.remove("aa-lenis");
      lenis.destroy();
    };
  }, []);

  return null;
}
