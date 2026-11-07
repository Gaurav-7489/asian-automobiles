import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { ImmersiveHero } from "@/components/immersive/immersive-hero";
import { SkiperServiceStack, type StackService } from "@/components/immersive/skiper-service-stack";
import { serviceCatalog, serviceImage } from "@/lib/service-catalog";
import { businessFacts, directionsHref } from "@/lib/business-facts";

const services: StackService[] = serviceCatalog.map((service, index) => ({
  no: String(index + 1).padStart(2, "0"), meta: service.meta, title: service.title,
  text: service.description, href: service.href, image: serviceImage(service, 1800),
}));

export function EditorialHome() {
  return (
    <main className="aa-home aa-home-v3 aa-home-v8">
      <ImmersiveHero />

      <section id="services" className="aa-services-v3 aa-section" aria-label="Service directory">
        <div className="aa-shell">
          <div className="aa-section-head">
            <div>
              <span className="aa-kicker">01 / EXPLORE SERVICES</span>
              <h2 className="aa-view-reveal">Everything your car needs.<br /><em>From one workshop.</em></h2>
            </div>
            <span className="aa-count">{services.length} SERVICES</span>
          </div>
          <SkiperServiceStack services={services} />
        </div>
      </section>

      <section className="aa-proof-v3 aa-section-dark aa-workshop-story" aria-label="Workshop introduction">
        <div className="aa-shell aa-home-workshop-grid">
          <figure className="aa-home-workshop-photo">
            <Image
              src="https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e3d?auto=format&fit=crop&w=1800&q=76"
              alt="Mechanic working on a car"
              fill quality={72} sizes="(max-width: 800px) 94vw, 55vw"
            />
            <figcaption>Not a dealership. Cars of many makes.</figcaption>
          </figure>
          <div className="aa-home-workshop-copy">
            <span className="aa-kicker aa-kicker-light">02 / ABOUT THE WORKSHOP</span>
            <h2>An independent service centre.<br /><em>For cars of every make.</em></h2>
            <p>We look after the routine servicing, repairs and maintenance that keep everyday cars running well, and help customers find the spare parts they need. We don’t sell cars — we look after the one you already drive.</p>
            <Link data-magnetic prefetch={false} href="/about/" className="aa-light-button">More about us <ArrowUpRight size={15} /></Link>
            <Link data-magnetic prefetch={false} href="/spare-parts/" className="aa-text-link">Looking for a part? <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="aa-location aa-section-dark" aria-label="Workshop location">
        <div className="aa-shell aa-location-grid">
          <div className="aa-location-copy">
            <span className="aa-kicker aa-kicker-light">03 / PLAN YOUR VISIT</span>
            <h2>{businessFacts.address.locality}.<br /><em>Kattoor Road.</em></h2>
            <p>{businessFacts.address.full}.</p>
            <div className="aa-location-actions">
              <a data-magnetic href={directionsHref} target="_blank" rel="noreferrer" className="aa-light-button">Get directions <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="aa-home-arrival">
            <MapPin size={24} />
            <span className="aa-kicker aa-kicker-light">BEFORE YOU SET OFF</span>
            <h3>Near Government Rest House / Canara Bank.</h3>
            <p><Clock3 size={17} /> {businessFacts.hours}. A quick call before you visit helps us plan time for your car.</p>
            <Link data-magnetic prefetch={false} href="/contact/" className="aa-text-link">Contact the workshop <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
