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

const images = {
  service: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=78",
  detail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=78",
  blackCar: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=78",
  workshop: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1800&q=78",
  mechanic: "https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e3d?auto=format&fit=crop&w=1800&q=76",
  wheel: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=76",
  paint: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1800&q=76",
  road: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=76",
};

const services: StackService[] = [
  {
    no: "01",
    meta: "MAINTENANCE / REPAIR",
    title: "General service & mechanical repair",
    text: "Routine maintenance or mechanical trouble — start with what you notice and move straight to the right service.",
    href: "/services/car-service/",
    image: images.service,
  },
  {
    no: "02",
    meta: "COOLING / AIRFLOW",
    title: "Car AC service & repair",
    text: "When cooling or airflow stops feeling right, start with a focused AC service and repair enquiry.",
    href: "/services/car-ac-repair/",
    image: images.blackCar,
  },
  {
    no: "03",
    meta: "BODY / RESTORATION",
    title: "Accident repair, denting & painting",
    text: "Accident restoration, denting and painting with a clearer next step and insurance assistance close at hand.",
    href: "/services/accident-repair/",
    image: images.detail,
  },
  {
    no: "04",
    meta: "WHEELS / TYRES",
    title: "Alignment, balancing & tyre services",
    text: "Computerized wheel alignment, balancing, tyre repair and rim-repair enquiries without the guesswork.",
    href: "/services/wheel-alignment/",
    image: images.wheel,
  },
  {
    no: "05",
    meta: "PARTS / ENQUIRY",
    title: "Automobile spare parts",
    text: "Service and parts sit under the same business — start with the vehicle and the part requirement.",
    href: "/spare-parts/",
    image: images.blackCar,
  },
];

const needs: NeedItem[] = [
  { no: "01", title: "Something sounds or feels wrong", meta: "DIAGNOSIS / SERVICE", href: "/services/car-service/", image: images.mechanic },
  { no: "02", title: "The AC is not cooling properly", meta: "AC / AIRFLOW", href: "/services/car-ac-repair/", image: images.service },
  { no: "03", title: "Steering or tyres feel off", meta: "WHEELS / TYRES", href: "/services/wheel-alignment/", image: images.wheel },
  { no: "04", title: "The car has accident damage", meta: "BODY / RESTORATION", href: "/services/accident-repair/", image: images.detail },
  { no: "05", title: "I need denting or paint work", meta: "BODY / PAINT", href: "/services/denting-painting/", image: images.paint },
  { no: "06", title: "I need a spare part", meta: "PARTS / ENQUIRY", href: "/spare-parts/", image: images.blackCar },
];

const facilities: FacilityItem[] = [
  {
    no: "01",
    title: "Mechanical service",
    meta: "ROUTINE / REPAIR",
    description: "Multi-brand maintenance and mechanical repair with a direct path from symptom to workshop conversation.",
    image: images.mechanic,
  },
  {
    no: "02",
    title: "Wheel care",
    meta: "ALIGNMENT / BALANCING",
    description: "Alignment, balancing, tyre and rim-care enquiries presented as one focused wheel-care pathway.",
    image: images.wheel,
  },
  {
    no: "03",
    title: "Body repair",
    meta: "ACCIDENT / RESTORATION",
    description: "Accident repair and restoration support with a dedicated insurance assistance route when relevant.",
    image: images.detail,
  },
  {
    no: "04",
    title: "Denting & paint",
    meta: "BODYWORK / FINISH",
    description: "Body correction and paintwork for damage, dents and finish restoration.",
    image: images.paint,
  },
  {
    no: "05",
    title: "Parts support",
    meta: "SERVICE / SPARES",
    description: "Automobile parts support connected directly to the workshop rather than isolated from the service experience.",
    image: images.blackCar,
  },
];

const process: ProcessHoverItem[] = [
  {
    no: "01",
    title: "Choose the need",
    text: "Service, AC, accident repair, wheels and tyres, or parts.",
    href: "/services/",
    image: images.service,
    label: "Explore services",
  },
  {
    no: "02",
    title: "Share the vehicle",
    text: "Give the useful details: vehicle, concern and anything you have noticed.",
    href: "/request-quote/",
    image: images.detail,
    label: "Share details",
  },
  {
    no: "03",
    title: "Connect directly",
    text: "Prefer a conversation? Call the workshop and start with what you are noticing.",
    href: "tel:+919349002038",
    image: images.blackCar,
    label: "Call workshop",
    external: true,
  },
  {
    no: "04",
    title: "Plan the visit",
    text: "Use the verified address and directions when you are ready to come in.",
    href: "/contact/",
    image: images.workshop,
    label: "Get directions",
  },
];

const trust = [
  ["MULTI-BRAND", "Independent car service"],
  ["SERVICE + PARTS", "Two connected business pillars"],
  ["ACCIDENT REPAIR", "Restoration, denting & painting"],
  ["WHEEL CARE", "Alignment, balancing & tyre repair"],
  ["IRINJALAKUDA", "Kattoor Road · Thrissur"],
];

const reviews = [
  ["01", "Clear communication matters as much as the repair itself.", "SERVICE EXPERIENCE"],
  ["02", "The website should make it obvious where to start, even when the problem is not obvious.", "WORKSHOP JOURNEY"],
  ["03", "Service, repair and parts should feel like one connected experience.", "ASIAN AUTOMOBILES"],
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

      <section className="aa-trust-rail" aria-label="Asian Automobiles capabilities">
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
            <p>One place for service, repair and automobile parts — with a clearer way to find what the car needs.</p>
          </div>

          <div className="aa-intro-main aa-view-reveal">
            <p className="aa-kicker">SERVICE + REPAIR + PARTS / IRINJALAKUDA</p>
            <h2>
              Not just a workshop.
              <br />
              <em>A complete automotive partner.</em>
            </h2>
            <div className="aa-intro-foot">
              <p>
                Asian Automobiles brings multi-brand service, mechanical repair, accident restoration,
                wheel care and automobile parts into one connected experience. The website now behaves
                the same way: find the need, see the right path and act without friction.
              </p>
              <Link data-magnetic prefetch={false} href="/about/" className="aa-text-link">
                Know Asian Automobiles <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="aa-services-v3 aa-section">
        <div className="aa-shell">
          <div className="aa-section-head">
            <div>
              <span className="aa-kicker">02 / SERVICES</span>
              <h2 className="aa-view-reveal">
                Hear it. Feel it. See it.
                <br />
                <em>Start in the right place.</em>
              </h2>
            </div>
            <span className="aa-count">5 WAYS WE CAN HELP</span>
          </div>

          <SkiperServiceStack services={services} />
        </div>
      </section>

      <section className="aa-needs aa-section-dark">
        <div className="aa-shell">
          <div className="aa-needs-head">
            <div>
              <span className="aa-kicker aa-kicker-light">03 / START WITH THE SYMPTOM</span>
              <h2 className="aa-view-reveal">What does<br /><em>the car need?</em></h2>
            </div>
            <p>You do not need to know the technical answer first. Start with what you notice and move to the closest service path.</p>
          </div>
          <NeedExplorer items={needs} />
        </div>
      </section>

      <section className="aa-proof-v3 aa-section-dark aa-workshop-story">
        <div className="aa-shell">
          <div className="aa-proof-v3-head">
            <span className="aa-kicker aa-kicker-light">04 / WORKSHOP DETAIL</span>
            <h2 className="aa-view-reveal">
              Built for the work.
              <br />
              <em>Designed around clarity.</em>
            </h2>
            <p>
              Large workshop imagery, close details and technical context create an editorial rhythm without hiding the actual service information.
            </p>
          </div>

          <div className="aa-reveal-wall">
            <figure className="aa-reveal-shot aa-shot-a">
              <Image src={images.service} alt="Automotive service environment" fill quality={72} sizes="(max-width: 900px) 94vw, 62vw" />
              <figcaption><span>SERVICE / 01</span><b>Maintenance and mechanical repair.</b></figcaption>
            </figure>
            <figure className="aa-reveal-shot aa-shot-b">
              <Image src={images.detail} alt="Automotive repair detail" fill quality={70} sizes="(max-width: 900px) 88vw, 42vw" />
              <figcaption><span>REPAIR / 02</span><b>Accident restoration, denting and painting.</b></figcaption>
            </figure>
            <aside className="aa-reveal-note">
              <Gauge size={22} />
              <span>PRECISION / WITHOUT THE NOISE</span>
              <h3>Useful information should feel as considered as the work itself.</h3>
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
          <strong>PRECISION.</strong>
        </div>
      </section>

      <section className="aa-restoration aa-section">
        <div className="aa-shell">
          <div className="aa-restoration-head">
            <div>
              <span className="aa-kicker">05 / ACCIDENT RESTORATION</span>
              <h2 className="aa-view-reveal">See the difference.<br /><em>Control the comparison.</em></h2>
            </div>
            <p>Drag the divider to compare the visual story. On touch devices the same interaction remains direct and native.</p>
          </div>
          <BeforeAfterSlider before={images.detail} after={images.blackCar} />
        </div>
      </section>

      <section className="aa-facilities aa-section-dark">
        <div className="aa-shell">
          <div className="aa-facilities-head">
            <span className="aa-kicker aa-kicker-light">06 / THE WORKSHOP</span>
            <h2 className="aa-view-reveal">Different needs.<br /><em>One connected workshop.</em></h2>
          </div>
          <FacilityExplorer items={facilities} />
          <div className="aa-facilities-link">
            <Link data-magnetic href="/facilities/" prefetch={false} className="aa-light-button">
              Explore all facilities <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">07 / A CLEARER START</span>
            <h2 className="aa-view-reveal">
              From “something feels off”
              <br />
              <em>to the right conversation.</em>
            </h2>
            <p>
              Every major need gets its own clear path, so a symptom or requirement can turn into the right workshop conversation without the usual guesswork.
            </p>
          </div>

          <ProcessHover items={process} />
        </div>
      </section>

      <section className="aa-split-media aa-section-dark aa-insurance-stage">
        <div className="aa-shell aa-split-media-grid">
          <div className="aa-split-image aa-parallax-media">
            <Image src={images.blackCar} alt="Car body detail" fill quality={72} sizes="(max-width: 900px) 100vw, 55vw" />
            <div className="aa-image-index">08 / ACCIDENT + INSURANCE</div>
          </div>
          <div className="aa-split-copy">
            <span className="aa-kicker aa-kicker-light">08 / ACCIDENT + INSURANCE</span>
            <h2 className="aa-view-reveal">
              Damage is stressful enough.
              <br />
              <em>The next step should not be.</em>
            </h2>
            <p>
              Start an accident-repair enquiry, share the useful vehicle and damage details, and use the dedicated insurance pathway for current eligibility questions.
            </p>
            <div className="aa-split-points">
              <span><ShieldCheck size={17} /> Insurance repair assistance</span>
              <span><Sparkles size={17} /> Denting & painting</span>
              <span><Wrench size={17} /> Accident restoration enquiries</span>
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
            <span className="aa-kicker">09 / THE EXPERIENCE</span>
            <h2 className="aa-view-reveal">Small details.<br /><em>One premium rhythm.</em></h2>
          </div>
          <div className="aa-review-rail">
            {reviews.map(([no, quote, meta]) => (
              <article className="aa-review-card" key={no}>
                <span>{no}</span>
                <blockquote>“{quote}”</blockquote>
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
            <span className="aa-kicker aa-kicker-light">10 / VISIT THE WORKSHOP</span>
            <h2 className="aa-view-reveal">Irinjalakuda.<br /><em>Kattoor Road.</em></h2>
            <p>283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala.</p>
            <div className="aa-location-actions">
              <a data-magnetic href="https://www.google.com/maps/search/?api=1&query=283%20V-526%20Govt%20Rest%20House%20Kattoor%20Road%20Irinjalakuda%20Thrissur%20680121%20Kerala" target="_blank" rel="noreferrer" className="aa-light-button">
                Get directions <ArrowUpRight size={15} />
              </a>
              <a data-magnetic href="tel:+919349002038" className="aa-location-phone"><Phone size={15} /> +91 93490 02038</a>
            </div>
          </div>
          <figure className="aa-location-media">
            <Image src={images.workshop} alt="Automotive workshop" fill quality={72} sizes="(max-width: 900px) 100vw, 55vw" />
            <figcaption><MapPin size={15} /> IRINJALAKUDA / THRISSUR / KERALA</figcaption>
          </figure>
        </div>
      </section>

      <section className="aa-final aa-section-dark aa-final-v8">
        <div className="aa-shell aa-final-grid">
          <span className="aa-kicker aa-kicker-light">ASIAN AUTOMOBILES / IRINJALAKUDA</span>
          <h2 className="aa-view-reveal">
            Your car needs attention?
            <br />
            <em>We are ready.</em>
          </h2>
          <div>
            <p>Service, repair or parts — start with what the car needs.</p>
            <Link data-magnetic prefetch={false} href="/book-service/" className="aa-light-button">
              Book a service <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
