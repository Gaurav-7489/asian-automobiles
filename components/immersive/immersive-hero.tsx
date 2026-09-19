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
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  const mediaScale = useTransform(smoothProgress, [0, 0.88], [1.035, 0.86]);
  const mediaY = useTransform(smoothProgress, [0, 1], ["0%", "9%"]);
  const mediaRadius = useTransform(smoothProgress, [0.08, 0.7], ["0px", "32px"]);
  const copyY = useTransform(smoothProgress, [0, 0.72], ["0%", "-18%"]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.72], [1, 0.18]);
  const indexWidth = useTransform(smoothProgress, [0, 0.82], ["7%", "100%"]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--hero-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--hero-y", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      className="aa-hero2"
      onPointerMove={handlePointerMove}
    >
      <div className="aa-hero2-sticky">
        <motion.div
          className="aa-hero2-media"
          style={
            reduceMotion
              ? undefined
              : { scale: mediaScale, y: mediaY, borderRadius: mediaRadius }
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80"
            alt="Performance car driving on an open road"
            fill
            priority
            quality={78}
            sizes="100vw"
          />
          <div className="aa-hero2-shade" />
          <div className="aa-hero2-cursor-light" />
          <div className="aa-hero2-scan" />
        </motion.div>

        <div className="aa-hero2-grid" aria-hidden="true" />

        <div className="aa-shell aa-hero2-shell">
          <div className="aa-hero2-top">
            <span>ASIAN AUTOMOBILES / IRINJALAKUDA</span>
            <span className="aa-hero2-status"><i /> WORKSHOP / ONLINE</span>
            <span>SERVICE · REPAIR · PARTS</span>
          </div>

          <motion.div
            className="aa-hero2-copy"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <div className="aa-hero2-eyebrow">
              <span>01</span>
              <span>BUILT AROUND THE DRIVE</span>
            </div>

            <h1>
              <span className="aa-hero2-line"><motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>Every mile</motion.i></span>
              <span className="aa-hero2-line aa-hero2-line-outline"><motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }}>deserves care.</motion.i></span>
            </h1>

            <div className="aa-hero2-bottom">
              <p>
                A workshop experience rebuilt for the screen — direct, technical and
                designed to make the next move feel obvious.
              </p>

              <div className="aa-hero2-actions">
                <Link data-magnetic href="/book-service/" className="aa-hero2-primary">
                  Book service <ArrowUpRight size={15} />
                </Link>
                <Link data-magnetic href="#services" className="aa-hero2-circle" aria-label="Explore services">
                  <ArrowDownRight size={19} />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="aa-hero2-console">
            <div>
              <Gauge size={15} />
              <span>PRECISION</span>
              <b>01</b>
            </div>
            <div>
              <Wrench size={15} />
              <span>WORKSHOP</span>
              <b>02</b>
            </div>
            <div className="aa-hero2-scroll">
              <span>SCROLL / ENTER WORKSHOP</span>
              <i><motion.b style={reduceMotion ? { width: "38%" } : { width: indexWidth }} /></i>
            </div>
          </div>
        </div>

        <div className="aa-hero2-corner aa-hero2-corner-a" />
        <div className="aa-hero2-corner aa-hero2-corner-b" />
      </div>
    </section>
  );
}
