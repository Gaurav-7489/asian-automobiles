import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { businessFacts } from "@/lib/business-facts";
import { WorkshopMotion } from "@/components/immersive/workshop-motion";
import { bookingHref } from "@/lib/service-catalog";

const cards = [
  { photo: "mechanic-inspection", position: "left" },
  { photo: "engine-detail", position: "right" },
  { photo: "car-profile", position: "front" },
] as const;

export function ImmersiveHero() {
  return (
    <section className="aa-editorial-hero" aria-labelledby="aa-editorial-title">
      <div className="aa-shell">
        <div className="aa-editorial-hero-grid">
          <div className="aa-editorial-hero-copy">
            <p className="aa-editorial-label">Independent multi-brand workshop</p>
            <h1 id="aa-editorial-title">Car care for <br />every drive.</h1>
            <p className="aa-editorial-intro">
              Servicing, repairs and spare-parts enquiries on Kattoor Road, {businessFacts.address.locality}.
            </p>
            <Link href={bookingHref()} className="aa-editorial-button">
              Book service <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="aa-editorial-fan" aria-hidden="true">
            {cards.map(({ photo, position }) => (
              <div key={photo} className={`aa-editorial-fan-slot aa-editorial-fan-slot-${position}`}>
                <div className="aa-editorial-fan-card">
                  <Image
                    src={`/images/photos/${photo}.jpg`}
                    alt=""
                    fill
                    priority={position === "front"}
                    quality={position === "front" ? 80 : 66}
                    sizes={position === "front" ? "(max-width: 720px) 63vw, 32vw" : "(max-width: 720px) 34vw, 22vw"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="aa-editorial-wordmark" aria-hidden="true">{businessFacts.name}</p>

        <div className="aa-editorial-hero-bottom">
          <span>{businessFacts.address.locality} · {businessFacts.address.region}</span>
          <a href="#services">Explore services <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <WorkshopMotion />
    </section>
  );
}
