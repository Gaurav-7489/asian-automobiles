"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((module) => module.default);

/**
 * Framer Motion's DOM animation features (animate / exit / in-view / gestures — no layout or
 * drag) are fetched asynchronously after the page is interactive, keeping them out of the
 * critical JS bundle. Server-rendered initial states are visible immediately either way.
 * Every animation respects the visitor's reduced-motion setting, and `strict` turns an
 * accidental full `motion.*` import into an error.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
