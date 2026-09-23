"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const aaTimelineImages = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1700&q=78",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1700&q=78",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1700&q=78",
  "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1700&q=78",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1700&q=78",
];

export function PageProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.25,
  });

  return (
    <div className="aa-page-progress" aria-hidden="true">
      <span>PAGE</span>
      <i>
        <motion.b style={{ scaleY }} />
      </i>
      <span>END</span>
    </div>
  );
}

export type BlueprintTimelineItem = {
  no: string;
  label: string;
  title: string;
  text: string;
};

export function BlueprintTimeline({ items }: { items: BlueprintTimelineItem[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="aa-blueprint-timeline">
      <ol className="aa-blueprint-timeline-nav" aria-label="Service process steps">
        {items.map((item, index) => (
          <li key={item.no}>
            <button
              type="button"
              className={active === index ? "is-active" : ""}
              aria-pressed={active === index}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>{item.no}</span>
              <div>
                <small>{item.label}</small>
                <b>{item.title}</b>
              </div>
              <i />
            </button>
          </li>
        ))}
      </ol>

      <div className="aa-blueprint-timeline-stage" aria-live="polite">
        <div className="aa-v16-timeline-photo" aria-hidden="true">
          <Image key={active} src={aaTimelineImages[active % aaTimelineImages.length]} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 64vw" />
          <i />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={items[active].no}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease }}
          >
            <span>{items[active].no} / {items[active].label}</span>
            <h3>{items[active].title}</h3>
            <p>{items[active].text}</p>
          </motion.article>
        </AnimatePresence>

        <div className="aa-blueprint-timeline-meter" aria-hidden="true">
          <motion.i
            animate={{ scaleX: (active + 1) / items.length }}
            transition={{ duration: 0.42, ease }}
          />
        </div>
      </div>
    </div>
  );
}

export type ExpandGalleryItem = {
  label: string;
  eyebrow?: string;
  image: string;
  alt: string;
  href?: string;
};

export function ExpandGallery({ items }: { items: ExpandGalleryItem[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="aa-expand-gallery" onPointerLeave={() => setActive(0)}>
      {items.map((item, index) => {
        const body = (
          <>
            <motion.div
              className="aa-expand-gallery-image"
              animate={reduceMotion ? undefined : { scale: active === index ? 1.015 : 1 }}
              transition={{ duration: 0.5, ease }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                quality={70}
                sizes="(max-width: 820px) 92vw, 42vw"
              />
            </motion.div>
            <div className="aa-expand-gallery-shade" />
            <div className="aa-expand-gallery-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                {item.eyebrow && <small>{item.eyebrow}</small>}
                <b>{item.label}</b>
              </div>
              {item.href && <ArrowUpRight size={18} />}
            </div>
          </>
        );

        const className = active === index ? "aa-expand-gallery-card is-active" : "aa-expand-gallery-card";
        const handlers = {
          onPointerEnter: () => setActive(index),
          onFocus: () => setActive(index),
          onClick: () => setActive(index),
        };

        return item.href ? (
          <Link key={item.label} href={item.href} className={className} {...handlers}>
            {body}
          </Link>
        ) : (
          <button type="button" key={item.label} className={className} {...handlers}>
            {body}
          </button>
        );
      })}
    </div>
  );
}

export type MotionFaqItem = {
  question: string;
  answer: string;
};

export function MotionFaq({ items }: { items: MotionFaqItem[] }) {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="aa-motion-faq">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <article className={isOpen ? "is-open" : ""} key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.question}</b>
              <ChevronDown size={18} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="aa-motion-faq-answer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

export function HoverStatRail({
  items,
}: {
  items: Array<{ no: string; label: string; text: string }>;
}) {
  return (
    <div className="aa-hover-stat-rail">
      {items.map((item) => (
        <div key={item.no}>
          <span>{item.no}</span>
          <b>{item.label}</b>
          <p>{item.text}</p>
          <i />
        </div>
      ))}
    </div>
  );
}

export function ScrollRevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58, ease }}
    >
      {children}
    </motion.div>
  );
}
