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
    let physicsRaf = 0;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let ringVX = 0;
    let ringVY = 0;

    let magnetic: HTMLElement | null = null;
    let magX = 0;
    let magY = 0;
    let magVX = 0;
    let magVY = 0;
    let magTargetX = 0;
    let magTargetY = 0;
    let magScale = 1;
    let magScaleTarget = 1;
    let magScaleV = 0;

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--aa-progress", `${Math.min(1, window.scrollY / max) * 100}%`);
      scrollRaf = 0;
    };

    const applyMagnetic = () => {
      if (!magnetic) return;
      magnetic.style.setProperty("--mag-x", `${magX.toFixed(2)}px`);
      magnetic.style.setProperty("--mag-y", `${magY.toFixed(2)}px`);
      magnetic.style.setProperty("--mag-scale", magScale.toFixed(4));
    };

    const resetMagneticElement = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
      element.style.setProperty("--mag-scale", "1");
    };

    const animatePhysics = () => {
      // Cursor spring: soft mass + velocity + damping, instead of linear easing.
      const cursorStiffness = 0.13;
      const cursorDamping = 0.72;
      ringVX = (ringVX + (targetX - ringX) * cursorStiffness) * cursorDamping;
      ringVY = (ringVY + (targetY - ringY) * cursorStiffness) * cursorDamping;
      ringX += ringVX;
      ringY += ringVY;

      if (ring) ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      if (dot) dot.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;

      // Magnetic element spring: gives CTA/button movement actual inertia.
      if (magnetic) {
        const stiffness = 0.17;
        const damping = 0.69;
        magVX = (magVX + (magTargetX - magX) * stiffness) * damping;
        magVY = (magVY + (magTargetY - magY) * stiffness) * damping;
        magX += magVX;
        magY += magVY;

        const scaleStiffness = 0.2;
        const scaleDamping = 0.68;
        magScaleV = (magScaleV + (magScaleTarget - magScale) * scaleStiffness) * scaleDamping;
        magScale += magScaleV;
        applyMagnetic();
      }

      const cursorMoving =
        Math.abs(targetX - ringX) > 0.08 ||
        Math.abs(targetY - ringY) > 0.08 ||
        Math.abs(ringVX) > 0.03 ||
        Math.abs(ringVY) > 0.03;

      const magnetMoving =
        magnetic &&
        (Math.abs(magTargetX - magX) > 0.05 ||
          Math.abs(magTargetY - magY) > 0.05 ||
          Math.abs(magVX) > 0.02 ||
          Math.abs(magVY) > 0.02 ||
          Math.abs(magScaleTarget - magScale) > 0.002 ||
          Math.abs(magScaleV) > 0.001);

      if (cursorMoving || magnetMoving) {
        physicsRaf = requestAnimationFrame(animatePhysics);
      } else {
        physicsRaf = 0;
        if (magnetic && magTargetX === 0 && magTargetY === 0 && magScaleTarget === 1) {
          resetMagneticElement(magnetic);
          magnetic = null;
          magX = magY = magVX = magVY = 0;
          magScale = 1;
          magScaleV = 0;
        }
      }
    };

    const ensurePhysics = () => {
      if (!physicsRaf) physicsRaf = requestAnimationFrame(animatePhysics);
    };

    const setMagneticTarget = (element: HTMLElement | null, event?: PointerEvent) => {
      if (element !== magnetic) {
        resetMagneticElement(magnetic);
        magnetic = element;
        magX = magY = magVX = magVY = 0;
        magScale = 1;
        magScaleV = 0;
      }

      if (!element || !event) {
        magTargetX = 0;
        magTargetY = 0;
        magScaleTarget = 1;
        ensurePhysics();
        return;
      }

      const rect = element.getBoundingClientRect();
      magTargetX = (event.clientX - (rect.left + rect.width / 2)) * 0.16;
      magTargetY = (event.clientY - (rect.top + rect.height / 2)) * 0.16;
      ensurePhysics();
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
      ensurePhysics();

      const target = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (target) setMagneticTarget(target, event);
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
      if (leaving && leaving === magnetic) setMagneticTarget(leaving);

      const next = event.relatedTarget as HTMLElement | null;
      if (!next?.closest?.("a,button,[data-magnetic]")) root.classList.remove("aa-cursor-active");
    };

    const onPointerDown = (event: PointerEvent) => {
      if (coarse || reduced) return;
      const target = (event.target as HTMLElement | null)?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (!target) return;
      if (target !== magnetic) setMagneticTarget(target, event);
      magScaleTarget = 0.955;
      ensurePhysics();
    };

    const onPointerUp = () => {
      magScaleTarget = 1;
      ensurePhysics();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(physicsRaf);
      resetMagneticElement(magnetic);
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
