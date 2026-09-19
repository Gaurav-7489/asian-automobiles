"use client";

import { useEffect, useRef } from "react";

export function InteractiveLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let active: HTMLElement | null = null;
    let rect: DOMRect | null = null;
    let raf = 0;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let cursorVX = 0;
    let cursorVY = 0;
    let cursorScale = 1;
    let cursorScaleTarget = 1;

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
      cursorVX = (cursorVX + (pointerX - cursorX) * 0.14) * 0.7;
      cursorVY = (cursorVY + (pointerY - cursorY) * 0.14) * 0.7;
      cursorX += cursorVX;
      cursorY += cursorVY;
      cursorScale += (cursorScaleTarget - cursorScale) * 0.18;

      if (cursor) {
        cursor.style.transform =
          `translate3d(${cursorX}px,${cursorY}px,0) scale(${cursorScale})`;
      }

      if (active) {
        vx = (vx + (targetX - x) * 0.16) * 0.68;
        vy = (vy + (targetY - y) * 0.16) * 0.68;
        x += vx;
        y += vy;

        scaleV = (scaleV + (targetScale - scale) * 0.2) * 0.66;
        scale += scaleV;

        active.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
        active.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
        active.style.setProperty("--mag-scale", scale.toFixed(4));
      }

      const cursorMoving =
        Math.abs(pointerX - cursorX) > 0.08 ||
        Math.abs(pointerY - cursorY) > 0.08 ||
        Math.abs(cursorVX) > 0.02 ||
        Math.abs(cursorVY) > 0.02 ||
        Math.abs(cursorScaleTarget - cursorScale) > 0.002;

      const magneticMoving =
        active &&
        (Math.abs(targetX - x) > 0.05 ||
          Math.abs(targetY - y) > 0.05 ||
          Math.abs(vx) > 0.02 ||
          Math.abs(vy) > 0.02 ||
          Math.abs(targetScale - scale) > 0.002 ||
          Math.abs(scaleV) > 0.001);

      if (cursorMoving || magneticMoving) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        if (active && targetX === 0 && targetY === 0 && targetScale === 1) {
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

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      const next = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (next && next !== active) {
        reset(active);
        active = next;
        rect = next.getBoundingClientRect();
        x = y = vx = vy = 0;
        targetX = targetY = 0;
        scale = 1;
        scaleV = 0;
        targetScale = 1;
      }

      cursorScaleTarget = next ? 1.65 : 1;

      if (active && rect) {
        targetX = Math.max(-18, Math.min(18, (event.clientX - (rect.left + rect.width / 2)) * 0.11));
        targetY = Math.max(-18, Math.min(18, (event.clientY - (rect.top + rect.height / 2)) * 0.11));
      }

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
      cursorScaleTarget = 1;
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(raf);
      reset(active);
    };
  }, []);

  return (
    <>
      <div className="aa-progress" aria-hidden="true" />
      <div ref={cursorRef} className="aa-cursor-v4" aria-hidden="true" />
    </>
  );
}
