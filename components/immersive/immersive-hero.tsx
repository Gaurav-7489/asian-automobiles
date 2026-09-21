"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionRectRef = useRef<DOMRect | null>(null);
  const reduceMotion = useReducedMotion();

  const orbTargetX = useMotionValue(0);
  const orbTargetY = useMotionValue(0);
  const orbX = useSpring(orbTargetX, { stiffness: 180, damping: 30, mass: 0.3 });
  const orbY = useSpring(orbTargetY, { stiffness: 180, damping: 30, mass: 0.3 });

  const measureHero = () => {
    if (sectionRef.current) sectionRectRef.current = sectionRef.current.getBoundingClientRect();
  };

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || !matchMedia("(pointer:fine)").matches) return;
    if (!sectionRectRef.current) measureHero();
    const rect = sectionRectRef.current;
    if (!rect) return;
    orbTargetX.set(event.clientX - rect.left - 180);
    orbTargetY.set(event.clientY - rect.top - 180);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 38,
    mass: 0.24,
  });

  const mediaScale = useTransform(smoothProgress, [0, 0.9], [1.035, 0.965]);
  const mediaY = useTransform(smoothProgress, [0, 1], ["0%", "3%"]);
  const copyY = useTransform(smoothProgress, [0, 0.78], ["0%", "-6%"]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.84], [1, 0.28]);
  const progressScale = useTransform(smoothProgress, [0, 0.86], [0.06, 1]);

  return (
    <section
      ref={sectionRef}
      className="aa-hero2 aa-hero2-minimal aa-hero-v8"
      onPointerEnter={measureHero}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        orbTargetX.set(0);
        orbTargetY.set(0);
        sectionRectRef.current = null;
      }}
    >
      <div className="aa-hero2-sticky">
        <motion.div
          className="aa-hero2-media"
          style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=82"
            alt="Performance car on an open road"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
          />
          <motion.div
            className="aa-hero2-orb"
            aria-hidden="true"
            style={reduceMotion ? undefined : { x: orbX, y: orbY }}
          />
          <div className="aa-hero2-shade" />
          <div className="aa-hero-v8-grid" aria-hidden="true" />
        </motion.div>

        <div className="aa-shell aa-hero2-shell">
          <div className="aa-hero2-top aa-hero2-top-minimal">
            <span>ASIAN AUTOMOBILES / IRINJALAKUDA</span>
            <span className="aa-hero2-status"><i /> MULTI-BRAND AUTOMOTIVE CARE</span>
          </div>

          <motion.div
            className="aa-hero2-copy"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <div className="aa-hero2-eyebrow">
              <span>01</span>
              <span>SERVICE · REPAIR · PARTS</span>
            </div>

            <h1>
              <span className="aa-hero2-line">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.72, ease }}>
                  Precision
                </motion.i>
              </span>
              <span className="aa-hero2-line">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.72, delay: 0.045, ease }}>
                  for every
                </motion.i>
              </span>
              <span className="aa-hero2-line aa-hero2-line-outline">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.72, delay: 0.09, ease }}>
                  drive.
                </motion.i>
              </span>
            </h1>

            <div className="aa-hero2-bottom">
              <p>
                Multi-brand service, mechanical repair, accident restoration,
                wheel care and automobile parts support in Irinjalakuda.
              </p>

              <div className="aa-hero2-actions">
                <Link data-magnetic href="/book-service/" prefetch={false} className="aa-hero2-primary">
                  Book service <ArrowUpRight size={15} />
                </Link>
                <a data-magnetic href="tel:+919349002038" className="aa-hero2-circle" aria-label="Call Asian Automobiles">
                  <ArrowDownRight size={19} />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="aa-hero-v8-meta" aria-hidden="true">
            <span>10.53° N / 76.21° E</span>
            <span>WORKSHOP / KATTOOR ROAD</span>
            <span>KERALA / INDIA</span>
          </div>

          <div className="aa-hero2-scroll aa-hero2-scroll-minimal">
            <span>SCROLL / ENTER THE WORKSHOP</span>
            <i><motion.b style={reduceMotion ? { scaleX: 0.35 } : { scaleX: progressScale }} /></i>
          </div>
        </div>
      </div>
    </section>
  );
}
