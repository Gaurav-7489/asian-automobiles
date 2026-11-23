import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { businessFacts, phoneTel } from "@/lib/business-facts";

/**
 * Homepage hero. Server-rendered with no client JavaScript: the entrance (photo settling,
 * headline lines rising, gauge drawing) is CSS that starts at first paint, so the
 * headline never waits for hydration and reduced-motion visitors see the final state.
 */
export function HomeHero() {
  return (
    <section className="aa-hero is-inverse" aria-labelledby="hero-title">
      <div className="aa-hero__photo">
        <Image
          src="/images/photos/hero-workshop.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
        />
      </div>

      <div className="wrap aa-hero__grid">
        <p className="aa-hero__place">
          <span>Independent multi-brand car service centre</span>
          <span>Kattoor Road, {businessFacts.address.locality}, {businessFacts.address.region}</span>
        </p>

        <h1 id="hero-title" className="aa-hero__title">
          <span className="aa-hero__line" style={{ "--line": 0 } as React.CSSProperties}><span>Precision</span></span>{" "}
          <span className="aa-hero__line" style={{ "--line": 1 } as React.CSSProperties}><span>for every</span></span>{" "}
          <span className="aa-hero__line" style={{ "--line": 2 } as React.CSSProperties}><span>drive.</span></span>
        </h1>

        <span className="aa-gauge aa-hero__gauge" aria-hidden="true" />

        <div className="aa-hero__foot">
          <p>
            Servicing, repairs, AC, wheel alignment, tyre care and spare parts for cars of many makes, from
            our workshop on Kattoor Road, {businessFacts.address.locality}.
          </p>
          <div className="aa-actions">
            <Link href="/contact/#enquiry" className="aa-btn aa-btn--primary">Make an enquiry</Link>
            <a href={phoneTel} className="aa-btn aa-btn--ghost">
              <Phone size={16} aria-hidden="true" />
              <span>Call {businessFacts.phones.primaryDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <span className="aa-hero__scroll" aria-hidden="true"><i /></span>
    </section>
  );
}
