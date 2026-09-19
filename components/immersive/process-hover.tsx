"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

export type ProcessHoverItem = {
  no: string;
  title: string;
  text: string;
  href: string;
  image: string;
  label: string;
  external?: boolean;
};

export function ProcessHover({ items }: { items: ProcessHoverItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 360, damping: 34, mass: 0.45 });
  const y = useSpring(my, { stiffness: 360, damping: 34, mass: 0.45 });

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const panelW = 258;
    const panelH = 174;
    const px = Math.min(
      Math.max(event.clientX - rect.left + 28, 12),
      Math.max(12, rect.width - panelW - 12),
    );
    const py = Math.min(
      Math.max(event.clientY - rect.top - panelH / 2, 12),
      Math.max(12, rect.height - panelH - 12),
    );
    mx.set(px);
    my.set(py);
  }

  return (
    <div
      ref={containerRef}
      className="aa-process-hover"
      onPointerMove={move}
      onPointerLeave={() => setActive(null)}
    >
      <div className="aa-process-list">
        {items.map((item, index) => {
          const content = (
            <>
              <span>{item.no}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="aa-process-row-action">
                <b>{item.label}</b>
                <ArrowUpRight size={16} />
              </span>
            </>
          );

          return item.external ? (
            <a
              data-magnetic
              className="aa-process-row aa-view-reveal"
              key={item.no}
              href={item.href}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              {content}
            </a>
          ) : (
            <Link
              data-magnetic
              prefetch={false}
              className="aa-process-row aa-view-reveal"
              key={item.no}
              href={item.href}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              {content}
            </Link>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && !reduceMotion && (
          <motion.div
            className="aa-process-preview"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.93, rotate: 2 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={items[active].image}
                className="aa-process-preview-media"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={items[active].image}
                  alt=""
                  fill
                  quality={66}
                  sizes="258px"
                />
                <span>{items[active].no} / {items[active].label}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
