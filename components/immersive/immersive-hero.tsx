"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { businessFacts, phoneTel } from "@/lib/business-facts";

export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Only the scroll meter is scroll-linked. It is driven by a motion value, so
  // scrolling never re-renders React and the work stays on the compositor.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 38,
    mass: 0.24,
  });
  const progressScale = useTransform(smoothProgress, [0, 0.86], [0.06, 1]);

  return (
    <section ref={sectionRef} className="aa-hero2 aa-hero2-minimal aa-hero-v8">
      <div className="aa-hero2-sticky">
        <div className="aa-hero2-media">
          <Image
            src="/images/photos/hero-workshop.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
          />
          <div className="aa-hero2-orb" aria-hidden="true" />
          <div className="aa-hero2-shade" />
          <div className="aa-hero-v8-grid" aria-hidden="true" />
        </div>

        <div className="aa-shell aa-hero2-shell">
          <div className="aa-hero2-top aa-hero2-top-minimal">
            <span>{businessFacts.name.toUpperCase()} / {businessFacts.address.locality.toUpperCase()}</span>
            <span className="aa-hero2-status"><i /> INDEPENDENT MULTI-BRAND SERVICE</span>
          </div>

          <div className="aa-hero2-copy">
            <div className="aa-hero2-eyebrow">
              <span>01</span>
              <span>MULTI-BRAND CAR SERVICE CENTRE IN IRINJALAKUDA</span>
            </div>

            <h1>
              <span className="aa-hero2-line">
                <i>Precision</i>
              </span>
              <span className="aa-hero2-line">
                <i>for every</i>
              </span>
              <span className="aa-hero2-line aa-hero2-line-outline">
                <i>drive.</i>
              </span>
            </h1>

            <div className="aa-hero2-bottom">
              <p>
                Servicing, repairs, AC, wheel alignment, tyre care and spare parts for cars of many makes —
                from our workshop on Kattoor Road, {businessFacts.address.locality}.
              </p>

              <div className="aa-hero2-actions">
                <Link href="/contact/#enquiry" className="aa-hero2-primary">
                  Book service <ArrowUpRight size={15} />
                </Link>
                <a href={phoneTel} className="aa-hero2-circle" aria-label="Call Asian Automobiles">
                  <ArrowDownRight size={19} />
                </a>
              </div>
            </div>
          </div>

          <div className="aa-hero-v8-meta" aria-hidden="true">
            <span>{businessFacts.address.locality.toUpperCase()} / {businessFacts.address.district.toUpperCase()}</span>
            <span>WORKSHOP / KATTOOR ROAD</span>
            <span>{businessFacts.address.region.toUpperCase()} / INDIA</span>
          </div>

          <div className="aa-hero2-scroll aa-hero2-scroll-minimal">
            <span>SCROLL / ENTER THE WORKSHOP</span>
            <i><m.b style={reduceMotion ? { scaleX: 0.35 } : { scaleX: progressScale }} /></i>
          </div>
        </div>
      </div>
    </section>
  );
}
