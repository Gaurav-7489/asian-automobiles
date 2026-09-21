"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export type NeedItem = {
  no: string;
  title: string;
  meta: string;
  href: string;
  image: string;
};

export function NeedExplorer({ items }: { items: NeedItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 360, damping: 34, mass: 0.34 });
  const y = useSpring(targetY, { stiffness: 360, damping: 34, mass: 0.34 });

  function measure() {
    if (ref.current) rect.current = ref.current.getBoundingClientRect();
  }

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !matchMedia("(pointer:fine)").matches) return;
    if (!rect.current) measure();
    if (!rect.current) return;

    const previewWidth = 320;
    const previewHeight = 210;
    const left = Math.min(
      Math.max(event.clientX - rect.current.left + 38, 16),
      Math.max(16, rect.current.width - previewWidth - 16),
    );
    const top = Math.min(
      Math.max(event.clientY - rect.current.top - previewHeight / 2, 16),
      Math.max(16, rect.current.height - previewHeight - 16),
    );

    targetX.set(left);
    targetY.set(top);
  }

  return (
    <div
      ref={ref}
      className="aa-needs-list"
      onPointerEnter={measure}
      onPointerMove={move}
      onPointerLeave={() => {
        setActive(null);
        rect.current = null;
      }}
    >
      {items.map((item, index) => (
        <Link
          href={item.href}
          prefetch={false}
          className="aa-need-row"
          key={item.no}
          onPointerEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          onBlur={() => setActive(null)}
        >
          <span>{item.no}</span>
          <b>{item.title}</b>
          <small>{item.meta}</small>
          <ArrowUpRight size={18} />
        </Link>
      ))}

      <AnimatePresence>
        {active !== null && !reduceMotion && (
          <motion.figure
            className="aa-need-preview"
            aria-hidden="true"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={items[active].image}
              alt=""
              fill
              quality={66}
              sizes="320px"
            />
            <figcaption>{items[active].no} / {items[active].meta}</figcaption>
          </motion.figure>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BeforeAfterSlider({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [position, setPosition] = useState(54);
  const root = useRef<HTMLDivElement>(null);

  function update(clientX: number) {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }

  return (
    <div
      ref={root}
      className="aa-before-after"
      style={{ "--compare": `${position}%` } as React.CSSProperties}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        update(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event.clientX);
      }}
    >
      <Image src={after} alt="Automotive finish reference visual" fill quality={72} sizes="(max-width: 820px) 100vw, 68vw" />
      <div className="aa-before-layer">
        <Image src={before} alt="Automotive bodywork damage reference visual" fill quality={70} sizes="(max-width: 820px) 100vw, 68vw" />
      </div>
      <span className="aa-ba-label aa-ba-before">DAMAGE REFERENCE</span>
      <span className="aa-ba-label aa-ba-after">FINISH REFERENCE</span>
      <button
        type="button"
        className="aa-ba-handle"
        aria-label="Drag to compare damage and finish reference visuals"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setPosition((value) => Math.max(4, value - 4));
          if (event.key === "ArrowRight") setPosition((value) => Math.min(96, value + 4));
        }}
      >
        <ChevronLeft size={15} />
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

export type FacilityItem = {
  no: string;
  title: string;
  meta: string;
  description: string;
  image: string;
};

export function FacilityExplorer({ items }: { items: FacilityItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="aa-facility-explorer">
      <div className="aa-facility-menu">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.no}
            className={active === index ? "is-active" : ""}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span>{item.no}</span>
            <b>{item.title}</b>
            <small>{item.meta}</small>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>

      <div className="aa-facility-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={items[active].image}
            className="aa-facility-image"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={items[active].image}
              alt={items[active].title}
              fill
              quality={72}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="aa-facility-caption">
          <span>ZONE / {items[active].no}</span>
          <div>
            <b>{items[active].title}</b>
            <p>{items[active].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
