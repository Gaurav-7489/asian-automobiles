"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const lowPower =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4);

    if (reduced || coarse || nav.connection?.saveData || lowPower) {
      document.documentElement.classList.add("aa-native-motion");
      return () => document.documentElement.classList.remove("aa-native-motion");
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.125,
      smoothWheel: true,
      wheelMultiplier: 0.98,
      touchMultiplier: 1,
      syncTouch: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    const onVisibility = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.documentElement.classList.add("aa-lenis");

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("aa-lenis");
      lenis.destroy();
    };
  }, []);

  return null;
}
