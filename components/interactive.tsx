"use client";

import { useEffect } from "react";

export function InteractiveLayer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let active: HTMLElement | null = null;
    let rect: DOMRect | null = null;
    let raf = 0;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let targetX = 0;
    let targetY = 0;
    let scale = 1;
    let scaleV = 0;
    let targetScale = 1;

    const reset = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
      element.style.setProperty("--mag-scale", "1");
    };

    const frame = () => {
      if (!active) {
        raf = 0;
        return;
      }

      vx = (vx + (targetX - x) * 0.16) * 0.68;
      vy = (vy + (targetY - y) * 0.16) * 0.68;
      x += vx;
      y += vy;

      scaleV = (scaleV + (targetScale - scale) * 0.2) * 0.66;
      scale += scaleV;

      active.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
      active.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
      active.style.setProperty("--mag-scale", scale.toFixed(4));

      const moving =
        Math.abs(targetX - x) > 0.05 ||
        Math.abs(targetY - y) > 0.05 ||
        Math.abs(vx) > 0.02 ||
        Math.abs(vy) > 0.02 ||
        Math.abs(targetScale - scale) > 0.002 ||
        Math.abs(scaleV) > 0.001;

      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        if (targetX === 0 && targetY === 0 && targetScale === 1) {
          reset(active);
          active = null;
          rect = null;
          x = y = vx = vy = 0;
          scale = 1;
          scaleV = 0;
        }
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerOver = (event: PointerEvent) => {
      const next = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (!next || next === active) return;

      reset(active);
      active = next;
      rect = next.getBoundingClientRect();
      x = y = vx = vy = 0;
      targetX = targetY = 0;
      scale = 1;
      scaleV = 0;
      targetScale = 1;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!active || !rect) return;
      targetX = (event.clientX - (rect.left + rect.width / 2)) * 0.11;
      targetY = (event.clientY - (rect.top + rect.height / 2)) * 0.11;
      start();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!active) return;
      const related = event.relatedTarget as Node | null;
      if (related && active.contains(related)) return;
      const leaving = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]");
      if (leaving !== active) return;
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      start();
    };

    const onPointerDown = () => {
      if (!active) return;
      targetScale = 0.97;
      start();
    };

    const onPointerUp = () => {
      if (!active) return;
      targetScale = 1;
      start();
    };

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(raf);
      reset(active);
    };
  }, []);

  return <div className="aa-progress" aria-hidden="true" />;
}
