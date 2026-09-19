"use client";

import { useEffect, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=420&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=420&q=80",
];

export function CursorTrail() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = root.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      if (now - last < 170) return;
      last = now;

      const card = document.createElement("span");
      card.className = "aa-cursor-card";
      card.style.left = event.clientX + "px";
      card.style.top = event.clientY + "px";
      const image = document.createElement("img");
      image.src = images[Math.floor(Math.random() * images.length)];
      image.alt = "";
      card.appendChild(image);
      layer.appendChild(card);
      requestAnimationFrame(() => card.classList.add("is-live"));
      window.setTimeout(() => card.remove(), 620);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={root} className="aa-cursor-layer" aria-hidden="true" />;
}
