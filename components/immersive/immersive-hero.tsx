"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
      orbRef.current.style.transform = `translate3d(${x - 180}px,${y - 180}px,0)`;
    });
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 34,
    mass: 0.26,
  });

  const mediaScale = useTransform(smoothProgress, [0, 0.9], [1.018, 0.94]);
  const mediaY = useTransform(smoothProgress, [0, 1], ["0%", "4.5%"]);
  const copyY = useTransform(smoothProgress, [0, 0.78], ["0%", "-10%"]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.82], [1, 0.18]);
  const progressScale = useTransform(smoothProgress, [0, 0.86], [0.06, 1]);

  return (
    <section ref={sectionRef} className="aa-hero2 aa-hero2-minimal" onPointerMove={handlePointerMove}>
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
        </motion.div>

        <div className="aa-shell aa-hero2-shell">
          <div className="aa-hero2-top aa-hero2-top-minimal">
            <span>CAR CARE / IRINJALAKUDA</span>
            <span className="aa-hero2-status"><i /> MULTI-BRAND SERVICE</span>
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
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.74, ease }}>
                  Keep the drive
                </motion.i>
              </span>
              <span className="aa-hero2-line aa-hero2-line-outline">
                <motion.i initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.74, delay: 0.06, ease }}>
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

          <div className="aa-hero2-scroll aa-hero2-scroll-minimal">
            <span>SCROLL / ENTER THE WORKSHOP</span>
            <i><motion.b style={reduceMotion ? { scaleX: 0.35 } : { scaleX: progressScale }} /></i>
          </div>
        </div>
      </div>
    </section>
  );
}
