"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Gauge, Wrench } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbRaf = useRef(0);
  const reduceMotion = useReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || !orbRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cancelAnimationFrame(orbRaf.current);
    orbRaf.current = requestAnimationFrame(() => {
      if (!orbRef.current) return;
      orbRef.current.style.transform = `translate3d(${x - 210}px,${y - 210}px,0)`;
    });
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 32,
    mass: 0.28,
  });

  const mediaScale = useTransform(smoothProgress, [0, 0.9], [1.025, 0.92]);
  const mediaY = useTransform(smoothProgress, [0, 1], ["0%", "6%"]);
  const copyY = useTransform(smoothProgress, [0, 0.74], ["0%", "-13%"]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.78], [1, 0.22]);
  const indexScale = useTransform(smoothProgress, [0, 0.82], [0.07, 1]);

  return (
    <section ref={sectionRef} className="aa-hero2" onPointerMove={handlePointerMove}>
      <div className="aa-hero2-sticky">
        <motion.div
          className="aa-hero2-media"
          style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=78"
            alt="Car on an open road"
            fill
            priority
            fetchPriority="high"
            quality={76}
            sizes="100vw"
          />
          <div ref={orbRef} className="aa-hero2-orb" aria-hidden="true" />
          <div className="aa-hero2-shade" />
          <div className="aa-hero2-scan" />
        </motion.div>

        <div className="aa-hero2-grid" aria-hidden="true" />

        <div className="aa-shell aa-hero2-shell">
          <div className="aa-hero2-top">
            <span>ASIAN AUTOMOBILES / IRINJALAKUDA</span>
            <span className="aa-hero2-status"><i /> MULTI-BRAND SERVICE</span>
            <span>SERVICE · REPAIR · PARTS</span>
          </div>

          <motion.div
            className="aa-hero2-copy"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <div className="aa-hero2-eyebrow">
              <span>01</span>
              <span>CAR CARE / IRINJALAKUDA</span>
            </div>

            <h1>
              <span className="aa-hero2-line">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.78, ease }}>
                  Keep the drive
                </motion.i>
              </span>
              <span className="aa-hero2-line aa-hero2-line-outline">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.78, delay: 0.07, ease }}>
                  feeling right.
                </motion.i>
              </span>
            </h1>

            <div className="aa-hero2-bottom">
              <p>
                Independent multi-brand service, repair, accident restoration,
                wheel care and automobile parts support in Irinjalakuda.
              </p>

              <div className="aa-hero2-actions">
                <Link data-magnetic href="/book-service/" prefetch={false} className="aa-hero2-primary">
                  Book a service <ArrowUpRight size={15} />
                </Link>
                <a data-magnetic href="tel:+919349002038" className="aa-hero2-circle" aria-label="Call Asian Automobiles">
                  <ArrowDownRight size={19} />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="aa-hero2-console">
            <div>
              <Gauge size={15} />
              <span>MULTI-BRAND</span>
              <b>01</b>
            </div>
            <div>
              <Wrench size={15} />
              <span>SERVICE + PARTS</span>
              <b>02</b>
            </div>
            <div className="aa-hero2-scroll">
              <span>SCROLL / EXPLORE SERVICES</span>
              <i><motion.b style={reduceMotion ? { scaleX: 0.38 } : { scaleX: indexScale }} /></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
