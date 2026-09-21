import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { ImmersiveHero } from "@/components/immersive/immersive-hero";
import { SkiperServiceStack, type StackService } from "@/components/immersive/skiper-service-stack";
import { ProcessHover, type ProcessHoverItem } from "@/components/immersive/process-hover";
import {
  BeforeAfterSlider,
  FacilityExplorer,
  NeedExplorer,
  type FacilityItem,
  type NeedItem,
} from "@/components/immersive/workshop-experiences";
import { businessFacts, directionsHref } from "@/lib/business-facts";

const images = {
  service: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=78",
  detail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=78",
  blackCar: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=78",
  workshop: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1800&q=78",
  mechanic: "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e3d?auto=format&fit=crop&w=1800&q=76",
  wheel: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=76",
  paint: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=76",
};

const services: StackService[] = [
  {
    no: "01",
    meta: "ROUTINE / MECHANICAL",
    title: "General car service & repairs",
    text: "Routine maintenance and general mechanical repair enquiries for private cars.",
    href: "/services/car-service/",
    image: images.service,
  },
  {
    no: "02",
    meta: "AC / SERVICE",
    title: "Car AC service & repair",
    text: "A dedicated route for verified car AC service and repair enquiries.",
    href: "/services/car-ac-repair/",
    image: images.blackCar,
  },
  {
    no: "03",
    meta: "ACCIDENT / BODYWORK",
    title: "Denting, painting & accident repair",
    text: "Accident restoration, denting and painting, with a direct bridge to insurance assistance.",
    href: "/services/accident-repair/",
    image: images.detail,
  },
  {
    no: "04",
    meta: "WHEELS / TYRES",
    title: "Wheel alignment, balancing & tyre services",
    text: "Computerized wheel alignment, wheel balancing, tyre repair and rim-repair enquiries.",
    href: "/services/wheel-alignment/",
    image: images.wheel,
  },
  {
    no: "05",
    meta: "PARTS / ENQUIRY",
    title: "Automobile spare parts",
    text: "An enquiry-first route for the automobile-parts side of the business.",
    href: "/spare-parts/",
    image: images.blackCar,
  },
];

const needs: NeedItem[] = [
  { no: "01", title: "Routine service or mechanical repair", meta: "SERVICE / REPAIR", href: "/services/car-service/", image: images.mechanic },
  { no: "02", title: "Car AC service or repair", meta: "AC / SERVICE", href: "/services/car-ac-repair/", image: images.service },
  { no: "03", title: "Accident damage, denting or painting", meta: "ACCIDENT / BODYWORK", href: "/services/accident-repair/", image: images.detail },
  { no: "04", title: "Wheel, balancing, tyre or rim work", meta: "WHEELS / TYRES", href: "/services/wheel-alignment/", image: images.wheel },
  { no: "05", title: "Automobile spare-parts enquiry", meta: "PARTS / ENQUIRY", href: "/spare-parts/", image: images.blackCar },
];

const facilities: FacilityItem[] = [
  {
    no: "01",
    title: "Workshop floor",
    meta: "REAL PHOTOGRAPHY",
    description: "The final facility story should be shown with client-approved workshop photography rather than generic automotive imagery.",
    image: images.workshop,
  },
  {
    no: "02",
    title: "Service bays",
    meta: "WORKSHOP PROOF",
    description: "Service-bay photography can show the working environment without publishing unconfirmed bay, lift or equipment counts.",
    image: images.service,
  },
  {
    no: "03",
    title: "Alignment equipment",
    meta: "WHEEL SERVICE",
    description: "The blueprint specifically calls for real alignment-equipment photography; equipment brands remain confirmation-gated.",
    image: images.wheel,
  },
  {
    no: "04",
    title: "Repair activity",
    meta: "SERVICE / BODYWORK",
    description: "Real repair activity should be the primary visual proof for service, accident repair, denting and painting.",
    image: images.paint,
  },
  {
    no: "05",
    title: "Parts inventory",
    meta: "PARTS BUSINESS",
    description: "The automobile-parts business should receive equal visibility, supported by approved inventory and product photography.",
    image: images.blackCar,
  },
];

const process: ProcessHoverItem[] = [
  {
    no: "01",
    title: "Choose the need",
    text: "General service, AC, accident/bodywork, wheels and tyres, or spare parts.",
    href: "/services/",
    image: images.service,
    label: "Explore services",
  },
  {
    no: "02",
    title: "Share the vehicle",
    text: "Provide the vehicle, service or parts requirement, and any useful notes.",
    href: "/request-quote/",
    image: images.detail,
    label: "Share details",
  },
  {
    no: "03",
    title: "Call the workshop",
    text: "Use the verified primary number to speak directly with Asian Automobiles.",
    href: "tel:" + businessFacts.phones.primaryHref,
    image: images.blackCar,
    label: "Call workshop",
    external: true,
  },
  {
    no: "04",
    title: "Plan the visit",
    text: "Use the verified Kattoor Road address and directions before travelling.",
    href: "/contact/",
    image: images.workshop,
    label: "Get directions",
  },
];

const trust = [
  ["MULTI-BRAND", "Independent private-car service"],
  ["SERVICE + PARTS", "Two connected business pillars"],
  ["ACCIDENT REPAIR", "Restoration, denting & painting"],
  ["WHEEL SERVICES", "Alignment, balancing, tyre & rim repair"],
  ["IRINJALAKUDA", "Kattoor Road · Thrissur"],
];

const verifiedFoundation = [
  ["01", "Independent multi-brand service center for private cars.", "VEHICLE POSITIONING"],
  ["02", "Car repair and services plus automobile spare parts under one business.", "BUSINESS MODEL"],
  ["03", businessFacts.address.full + ".", "VERIFIED LOCATION"],
];

export function EditorialHome() {
  return (
    <main className="aa-home aa-home-v3 aa-home-v8">
      <ImmersiveHero />

      <section className="aa-velocity" aria-label="Core automotive services">
        <div className="aa-velocity-track">
          {[0, 1].map((copy) => (
            <div className="aa-velocity-set" key={copy} aria-hidden={copy === 1}>
              <span>GENERAL SERVICE</span><i />
              <span>AC REPAIR</span><i />
              <span>ACCIDENT RESTORATION</span><i />
              <span>WHEEL ALIGNMENT</span><i />
              <span>TYRE REPAIR</span><i />
              <span>SPARE PARTS</span><i />
            </div>
          ))}
        </div>
      </section>

      <section className="aa-trust-rail" aria-label="Asian Automobiles verified capabilities">
        <div className="aa-shell aa-trust-rail-grid">
          {trust.map(([title, text], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <b>{title}</b>
              <small>{text}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="aa-intro aa-section aa-editorial-intro">
        <div className="aa-shell aa-intro-grid">
          <div className="aa-section-rail">
            <span>01 / ASIAN AUTOMOBILES</span>
            <p>Independent multi-brand car service and automobile spare parts in Irinjalakuda.</p>
          </div>

          <div className="aa-intro-main aa-view-reveal">
            <p className="aa-kicker">SERVICE + REPAIR + PARTS / IRINJALAKUDA</p>
            <h2>
              Service & repair.
              <br />
              <em>Automobile spare parts.</em>
            </h2>
            <div className="aa-intro-foot">
              <p>
                Asian Automobiles combines two verified business pillars: car repair and services,
                and automobile spare parts. The service structure is built around the verified
                categories in the client blueprint, with direct routes for booking, quotes,
                insurance assistance and workshop contact.
              </p>
              <Link data-magnetic prefetch={false} href="/about/" className="aa-text-link">
                About Asian Automobiles <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="aa-services-v3 aa-section">
        <div className="aa-shell">
          <div className="aa-section-head">
            <div>
              <span className="aa-kicker">02 / VERIFIED SERVICE PILLARS</span>
              <h2 className="aa-view-reveal">
                Start with the need.
                <br />
                <em>Go to the right service.</em>
              </h2>
            </div>
            <span className="aa-count">5 CORE PATHS</span>
          </div>

          <SkiperServiceStack services={services} />
        </div>
      </section>

      <section className="aa-needs aa-section-dark">
        <div className="aa-shell">
          <div className="aa-needs-head">
            <div>
              <span className="aa-kicker aa-kicker-light">03 / PROBLEM-LED NAVIGATION</span>
              <h2 className="aa-view-reveal">What does<br /><em>the car need?</em></h2>
            </div>
            <p>Choose the closest verified service category. Vehicle-brand coverage and exact makes/models are kept off the site until the client confirms them.</p>
          </div>
          <NeedExplorer items={needs} />
        </div>
      </section>

      <section className="aa-proof-v3 aa-section-dark aa-workshop-story">
        <div className="aa-shell">
          <div className="aa-proof-v3-head">
            <span className="aa-kicker aa-kicker-light">04 / WORKSHOP PROOF</span>
            <h2 className="aa-view-reveal">
              Real work needs
              <br />
              <em>real visual proof.</em>
            </h2>
            <p>
              The blueprint calls for actual workshop photography — exterior, service bays, alignment equipment,
              repair activity, parts inventory and customer-facing areas — as the primary visual proof.
            </p>
          </div>

          <div className="aa-reveal-wall">
            <figure className="aa-reveal-shot aa-shot-a">
              <Image src={images.service} alt="Temporary automotive service visual pending client workshop photography" fill quality={72} sizes="(max-width: 900px) 94vw, 62vw" />
              <figcaption><span>PHOTO BRIEF / 01</span><b>Workshop and service activity.</b></figcaption>
            </figure>
            <figure className="aa-reveal-shot aa-shot-b">
              <Image src={images.detail} alt="Temporary automotive repair visual pending client workshop photography" fill quality={70} sizes="(max-width: 900px) 88vw, 42vw" />
              <figcaption><span>PHOTO BRIEF / 02</span><b>Repair and technical detail.</b></figcaption>
            </figure>
            <aside className="aa-reveal-note">
              <Gauge size={22} />
              <span>PHOTOGRAPHY / CLIENT APPROVAL</span>
              <h3>Final production imagery should be real, high-resolution and attributable to the workshop.</h3>
              <Link data-magnetic prefetch={false} href="/facilities/">Explore facilities <ArrowUpRight size={14} /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="aa-type-stage" aria-label="Asian Automobiles core offering">
        <div className="aa-type-perspective">
          <span>SERVICE.</span>
          <strong>REPAIR.</strong>
          <span>PARTS.</span>
          <strong>IRINJALAKUDA.</strong>
        </div>
      </section>

      <section className="aa-restoration aa-section">
        <div className="aa-shell">
          <div className="aa-restoration-head">
            <div>
              <span className="aa-kicker">05 / ACCIDENT RESTORATION</span>
              <h2 className="aa-view-reveal">Denting. Painting.<br /><em>Accident restoration.</em></h2>
            </div>
            <p>The blueprint supports these services. Final before/after case studies should use consented customer photography and must not imply a result from unrelated stock imagery.</p>
          </div>
          <BeforeAfterSlider before={images.detail} after={images.blackCar} />
        </div>
      </section>

      <section className="aa-facilities aa-section-dark">
        <div className="aa-shell">
          <div className="aa-facilities-head">
            <span className="aa-kicker aa-kicker-light">06 / FACILITIES</span>
            <h2 className="aa-view-reveal">Show the workshop.<br /><em>Keep the details verified.</em></h2>
          </div>
          <FacilityExplorer items={facilities} />
          <div className="aa-facilities-link">
            <Link data-magnetic href="/facilities/" prefetch={false} className="aa-light-button">
              Explore facilities <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">07 / CONVERSION PATH</span>
            <h2 className="aa-view-reveal">
              Service, quote,
              <br />
              <em>call or directions.</em>
            </h2>
            <p>
              The blueprint prioritizes direct high-intent actions: Book a Service, Call, Get Directions,
              Request a Quote and Insurance Assistance. WhatsApp remains off the live interface until the
              official business number is confirmed.
            </p>
          </div>

          <ProcessHover items={process} />
        </div>
      </section>

      <section className="aa-split-media aa-section-dark aa-insurance-stage">
        <div className="aa-shell aa-split-media-grid">
          <div className="aa-split-image aa-parallax-media">
            <Image src={images.blackCar} alt="Temporary accident-repair visual pending approved workshop photography" fill quality={72} sizes="(max-width: 900px) 100vw, 55vw" />
            <div className="aa-image-index">08 / CASHLESS INSURANCE REPAIRS</div>
          </div>
          <div className="aa-split-copy">
            <span className="aa-kicker aa-kicker-light">08 / INSURANCE ASSISTANCE</span>
            <h2 className="aa-view-reveal">
              Accident repair
              <br />
              <em>with a dedicated insurance path.</em>
            </h2>
            <p>
              The supplied research references cashless-network relationships with New India Assurance
              and United India Insurance. Current insurer participation and case eligibility should be
              confirmed with the workshop before repair work begins.
            </p>
            <div className="aa-split-points">
              <span><ShieldCheck size={17} /> Cashless repair references in supplied research</span>
              <span><Sparkles size={17} /> Denting & painting</span>
              <span><Wrench size={17} /> Accident restoration</span>
            </div>
            <Link data-magnetic prefetch={false} href="/insurance/" className="aa-light-button">
              Explore insurance assistance <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="aa-reviews aa-section">
        <div className="aa-shell">
          <div className="aa-reviews-head">
            <span className="aa-kicker">09 / VERIFIED FOUNDATION</span>
            <h2 className="aa-view-reveal">Only publish<br /><em>what is supported.</em></h2>
          </div>
          <div className="aa-review-rail">
            {verifiedFoundation.map(([no, statement, meta]) => (
              <article className="aa-review-card" key={no}>
                <span>{no}</span>
                <blockquote>{statement}</blockquote>
                <small>{meta}</small>
                <ArrowUpRight size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-location aa-section-dark">
        <div className="aa-shell aa-location-grid">
          <div className="aa-location-copy">
            <span className="aa-kicker aa-kicker-light">10 / CONTACT & DIRECTIONS</span>
            <h2 className="aa-view-reveal">{businessFacts.address.locality}.<br /><em>Kattoor Road.</em></h2>
            <p>{businessFacts.address.full}.</p>
            <div className="aa-location-actions">
              <a data-magnetic href={directionsHref} target="_blank" rel="noreferrer" className="aa-light-button">
                Get directions <ArrowUpRight size={15} />
              </a>
              <a data-magnetic href={"tel:" + businessFacts.phones.primaryHref} className="aa-location-phone">
                <Phone size={15} /> {businessFacts.phones.primaryDisplay}
              </a>
            </div>
          </div>
          <figure className="aa-location-media">
            <Image src={images.workshop} alt="Temporary workshop visual pending approved Asian Automobiles photography" fill quality={72} sizes="(max-width: 900px) 100vw, 55vw" />
            <figcaption><MapPin size={15} /> {businessFacts.address.locality.toUpperCase()} / {businessFacts.address.district.toUpperCase()} / {businessFacts.address.region.toUpperCase()}</figcaption>
          </figure>
        </div>
      </section>

      <section className="aa-final aa-section-dark aa-final-v8">
        <div className="aa-shell aa-final-grid">
          <span className="aa-kicker aa-kicker-light">ASIAN AUTOMOBILES / IRINJALAKUDA</span>
          <h2 className="aa-view-reveal">
            Need service, repair
            <br />
            <em>or a parts enquiry?</em>
          </h2>
          <div>
            <p>Start with the verified service path or call the workshop directly.</p>
            <Link data-magnetic prefetch={false} href="/book-service/" className="aa-light-button">
              Book a service <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
