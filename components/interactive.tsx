"use client";

import { useEffect } from "react";

export function InteractiveLayer() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--aa-progress", `${Math.min(1, window.scrollY / max) * 100}%`);
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--aa-mx", `${event.clientX}px`);
      root.style.setProperty("--aa-my", `${event.clientY}px`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="aa-progress" aria-hidden="true" />;
}
