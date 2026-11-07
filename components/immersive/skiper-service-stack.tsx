"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type StackService = {
  no: string;
  title: string;
  text: string;
  href: string;
  image: string;
  meta: string;
};

export function SkiperServiceStack({ services }: { services: StackService[] }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll<HTMLElement>(".aa-skip-card"));
    // Taller cards scroll fully into view before pinning. Measure only when
    // the layout changes, keeping native scrolling off the React render path.
    const updatePin = () => {
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      const headerGap = window.innerWidth > 1320 ? 92 : 82;
      const quickActionsHeight = document.querySelector(".aa-mobile-actions")?.getBoundingClientRect().height ?? 0;
      const bottomGap = quickActionsHeight > 0 ? quickActionsHeight + 16 : 24;
      stack.style.setProperty("--stack-pin", `${Math.min(headerGap, window.innerHeight - tallest - bottomGap - (cards.length - 1) * 5)}px`);
    };
    const observer = new ResizeObserver(updatePin);
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("resize", updatePin);
    updatePin();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePin);
    };
  }, []);

  return (
    <div ref={stackRef} className="aa-skip-stack">
      {services.map((service, index) => (
        <article
          className="aa-skip-card"
          key={service.no}
          style={{ "--stack-index": index } as React.CSSProperties}
        >
          <div className="aa-skip-card-copy">
            <div className="aa-skip-card-meta">
              <span>{service.no}</span>
              <span>{service.meta}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <Link data-magnetic href={service.href}>
              Explore service <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="aa-skip-card-media">
            <Image
              src={service.image}
              alt=""
              fill
              quality={72}
              sizes="(max-width: 560px) 92vw, (max-width: 1320px) 48vw, 52vw"
            />
            <div className="aa-skip-card-no">{service.no}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
