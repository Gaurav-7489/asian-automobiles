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

const images = {
  service: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1440&q=74",
  detail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1440&q=74",
  blackCar: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1440&q=74",
  workshop: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1440&q=74",
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
    image: images.workshop,
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

export function EditorialHome() {
  return (
    <main className="aa-home aa-home-v3">
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

      <section className="aa-intro aa-section">
        <div className="aa-shell aa-intro-grid">
          <div className="aa-section-rail">
            <span>01 / ASIAN AUTOMOBILES</span>
            <p>One place for service, repair and automobile parts — with a much clearer way to find what you need.</p>
          </div>

          <div className="aa-intro-main aa-view-reveal">
            <p className="aa-kicker">SERVICE + REPAIR + PARTS / IRINJALAKUDA</p>
            <h2>
              One place for the car.
              <br />
              <em>One clear next step.</em>
            </h2>
            <div className="aa-intro-foot">
              <p>
                Asian Automobiles combines an independent multi-brand service workshop with an automobile parts business.
                The advantage is simple: find what the car needs, understand the next step and contact the workshop fast.
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

      <section className="aa-proof-v3 aa-section-dark">
        <div className="aa-shell">
          <div className="aa-proof-v3-head">
            <span className="aa-kicker aa-kicker-light">03 / TECHNICAL DETAIL</span>
            <h2 className="aa-view-reveal">
              The work is detailed.
              <br />
              <em>The experience stays clear.</em>
            </h2>
            <p>
              Service decisions get easier when the information is direct: what the service covers, what to share and where to go next.
            </p>
          </div>

          <div className="aa-reveal-wall">
            <figure className="aa-reveal-shot aa-shot-a">
              <Image src={images.service} alt="Automotive service environment" fill quality={70} sizes="(max-width: 900px) 94vw, 62vw" />
              <figcaption><span>SERVICE / 01</span><b>Maintenance and mechanical repair.</b></figcaption>
            </figure>
            <figure className="aa-reveal-shot aa-shot-b">
              <Image src={images.detail} alt="Automotive repair detail" fill quality={68} sizes="(max-width: 900px) 88vw, 42vw" />
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
          <strong>ONE PLACE.</strong>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">04 / A CLEARER START</span>
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

      <section className="aa-split-media aa-section-dark">
        <div className="aa-shell aa-split-media-grid">
          <div className="aa-split-image aa-parallax-media">
            <Image src={images.blackCar} alt="Car body detail" fill quality={70} sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div className="aa-split-copy">
            <span className="aa-kicker aa-kicker-light">05 / ACCIDENT + INSURANCE</span>
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

      <section className="aa-contact aa-section">
        <div className="aa-shell">
          <div className="aa-contact-card">
            <div>
              <span className="aa-kicker">06 / VISIT OR CALL</span>
              <h2 className="aa-view-reveal">
                Need the workshop?
                <br />
                <em>You are one tap away.</em>
              </h2>
            </div>

            <div className="aa-contact-detail">
              <MapPin size={19} />
              <p>283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala.</p>
            </div>

            <div className="aa-contact-actions">
              <a data-magnetic href="tel:+919349002038" className="aa-primary-button">
                <Phone size={15} /> Call +91 93490 02038
              </a>
              <Link data-magnetic prefetch={false} href="/book-service/" className="aa-outline-button aa-outline-button-dark">
                Book a service <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-final aa-section-dark">
        <div className="aa-shell aa-final-grid">
          <span className="aa-kicker aa-kicker-light">ASIAN AUTOMOBILES / IRINJALAKUDA</span>
          <h2 className="aa-view-reveal">
            Keep the car moving.
            <br />
            <em>Make the first step easy.</em>
          </h2>
          <div>
            <p>Service, repair or parts — start with what the car needs.</p>
            <Link data-magnetic prefetch={false} href="/book-service/" className="aa-light-button">
              Start a service enquiry <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
