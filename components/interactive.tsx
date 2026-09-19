"use client";

import { useEffect, useRef } from "react";

export function InteractiveLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const lowPower =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4);

    if (reduced || coarse || nav.connection?.saveData || lowPower) return;

    let active: HTMLElement | null = null;
    let rect: DOMRect | null = null;
    let rectDirty = true;
    let raf = 0;
    let lastTime = performance.now();

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
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

    const refreshRect = () => {
      if (!active || !rectDirty) return;
      rect = active.getBoundingClientRect();
      rectDirty = false;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      // Frame-rate-independent cursor smoothing: same feel at 60/120/144 Hz.
      const cursorAlpha = 1 - Math.exp(-24 * dt);
      const scaleAlpha = 1 - Math.exp(-20 * dt);
      cursorX += (pointerX - cursorX) * cursorAlpha;
      cursorY += (pointerY - cursorY) * cursorAlpha;
      cursorScale += (cursorScaleTarget - cursorScale) * scaleAlpha;

      if (cursor) {
        cursor.style.transform =
          `translate3d(${cursorX.toFixed(2)}px,${cursorY.toFixed(2)}px,0) scale(${cursorScale.toFixed(4)})`;
      }

      if (active) {
        // Time-based damped spring for magnetic elements.
        const stiffness = 190;
        const damping = 22;
        vx += (targetX - x) * stiffness * dt;
        vy += (targetY - y) * stiffness * dt;
        const decay = Math.exp(-damping * dt);
        vx *= decay;
        vy *= decay;
        x += vx * dt;
        y += vy * dt;

        const scaleStiffness = 210;
        const scaleDamping = 24;
        scaleV += (targetScale - scale) * scaleStiffness * dt;
        scaleV *= Math.exp(-scaleDamping * dt);
        scale += scaleV * dt;

        active.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
        active.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
        active.style.setProperty("--mag-scale", scale.toFixed(4));
      }

      const cursorMoving =
        Math.abs(pointerX - cursorX) > 0.06 ||
        Math.abs(pointerY - cursorY) > 0.06 ||
        Math.abs(cursorScaleTarget - cursorScale) > 0.002;

      const magneticMoving =
        active &&
        (Math.abs(targetX - x) > 0.04 ||
          Math.abs(targetY - y) > 0.04 ||
          Math.abs(vx) > 0.03 ||
          Math.abs(vy) > 0.03 ||
          Math.abs(targetScale - scale) > 0.002 ||
          Math.abs(scaleV) > 0.002);

      if (cursorMoving || magneticMoving) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        if (active && targetX === 0 && targetY === 0 && targetScale === 1) {
          reset(active);
          active = null;
          rect = null;
          rectDirty = true;
          x = y = vx = vy = 0;
          scale = 1;
          scaleV = 0;
        }
      }
    };

    const start = () => {
      if (!raf) {
        lastTime = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const next = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (!next || next === active) return;

      reset(active);
      active = next;
      rect = next.getBoundingClientRect();
      rectDirty = false;
      x = y = vx = vy = 0;
      targetX = targetY = 0;
      scale = 1;
      scaleV = 0;
      targetScale = 1;
      cursorScaleTarget = 2.2;
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      refreshRect();
      if (active && rect) {
        targetX = Math.max(-13, Math.min(13, (event.clientX - (rect.left + rect.width / 2)) * 0.08));
        targetY = Math.max(-13, Math.min(13, (event.clientY - (rect.top + rect.height / 2)) * 0.08));
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
      targetScale = 0.975;
      start();
    };

    const onPointerUp = () => {
      if (!active) return;
      targetScale = 1;
      start();
    };

    const markRectDirty = () => {
      rectDirty = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", markRectDirty, { passive: true });
    window.addEventListener("resize", markRectDirty, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", markRectDirty);
      window.removeEventListener("resize", markRectDirty);
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
