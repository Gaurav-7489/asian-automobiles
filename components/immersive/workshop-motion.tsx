"use client";

import { useEffect } from "react";

export function WorkshopMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let context: { revert: () => void } | undefined;
    let revision = 0;

    const syncMotion = async () => {
      const request = ++revision;
      context?.revert();
      context = undefined;
      if (!preference.matches) return;

      const modules = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).catch(() => null);
      if (!modules || request !== revision) return;

      const [{ gsap }, { ScrollTrigger }] = modules;
      const home = document.querySelector(".aa-home");
      if (!home) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        if (window.scrollY < 150) {
          gsap.from(".aa-editorial-fan-card", {
            xPercent: (index) => [12, -12, 0][index],
            rotation: (index) => [8, -8, 3][index],
            y: 28, scale: 0.94, stagger: 0.08, duration: 0.72,
            ease: "power3.out", clearProps: "transform",
          });
        }
        gsap.fromTo(".aa-workshop-showcase-frame img", { yPercent: -3, scale: 1.16 }, {
          yPercent: 4, scale: 1.06, ease: "none",
          scrollTrigger: { trigger: ".aa-workshop-showcase-frame", start: "top bottom", end: "bottom top", scrub: true },
        });
      }, home);
    };

    void syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => {
      ++revision;
      preference.removeEventListener("change", syncMotion);
      context?.revert();
    };
  }, []);

  return null;
}
