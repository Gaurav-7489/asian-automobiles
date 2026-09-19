"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Gauge,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const images = {
  hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=88",
  service: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=84",
  detail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=84",
  blackCar: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=84",
  workshop: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1800&q=84",
};

const services = [
  {
    no: "01",
    title: "Service & mechanical repair",
    text: "Routine maintenance, diagnosis and repair enquiries for everyday vehicles.",
    href: "/services/",
    image: images.service,
  },
  {
    no: "02",
    title: "AC service & repair",
    text: "A focused route for cooling, airflow and AC-related service enquiries.",
    href: "/car-ac-repair/",
    image: images.blackCar,
  },
  {
    no: "03",
    title: "Accident repair & paint",
    text: "Body repair, denting, painting and accident-repair assistance.",
    href: "/accident-repair/",
    image: images.detail,
  },
  {
    no: "04",
    title: "Wheel, tyre & alignment",
    text: "Alignment, balancing, tyre and rim-related service enquiries.",
    href: "/wheel-alignment/",
    image: images.workshop,
  },
  {
    no: "05",
    title: "Automobile spare parts",
    text: "An enquiry-first route when you know the vehicle but not the part number.",
    href: "/spare-parts/",
    image: images.blackCar,
  },
];

const process = [
  ["01", "Tell us", "Vehicle, concern and the useful details."],
  ["02", "Assess", "Inspect the problem and clarify the scope."],
  ["03", "Work", "Service or repair against the agreed requirement."],
  ["04", "Handover", "Leave knowing what was done and what comes next."],
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function EditorialHome() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], ["0%", "9%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1.04, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.45]);

  return (
    <main className="aa-home">
      <section className="aa-hero">
        <motion.div className="aa-hero-media" style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}>
          <Image src={images.hero} alt="Performance car on an open road" fill priority sizes="100vw" />
        </motion.div>
        <div className="aa-hero-vignette" />
        <div className="aa-hero-grid" />

        <div className="aa-shell aa-hero-shell">
          <div className="aa-hero-topline">
            <span>IRINJALAKUDA / THRISSUR</span>
            <span>AUTOMOTIVE SERVICE / REPAIR / PARTS</span>
          </div>

          <div className="aa-hero-copy">
            <motion.p
              className="aa-kicker aa-kicker-light"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              ASIAN AUTOMOBILES
            </motion.p>

            <h1>
              <motion.span
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Built for the
              </motion.span>
              <motion.span
                className="aa-outline"
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                miles between.
              </motion.span>
            </h1>

            <div className="aa-hero-bottom">
              <p>
                Service, repair and parts without the showroom theatre. A clearer digital front door for a real workshop.
              </p>
              <Link className="aa-round-link" href="#services" aria-label="Explore services">
                <ArrowDownRight size={20} />
              </Link>
            </div>
          </div>

          <div className="aa-hero-index">
            <span>01</span>
            <span>Scroll to explore</span>
            <i />
          </div>
        </div>
      </section>

      <section className="aa-marquee" aria-label="Core services">
        <div>
          <span>MECHANICAL SERVICE</span><i />
          <span>ACCIDENT REPAIR</span><i />
          <span>WHEEL ALIGNMENT</span><i />
          <span>TYRES</span><i />
          <span>SPARE PARTS</span><i />
          <span>AC SERVICE</span>
        </div>
      </section>

      <section className="aa-intro aa-section">
        <div className="aa-shell aa-intro-grid">
          <div className="aa-section-rail">
            <span>01 / THE WORKSHOP</span>
            <p>Less marketing noise. More useful information, visual proof and obvious next steps.</p>
          </div>

          <motion.div {...reveal} className="aa-intro-main">
            <p className="aa-kicker">A LOCAL WORKSHOP, PRESENTED PROPERLY</p>
            <h2>
              Clear communication
              <br />
              <em>is part of the service.</em>
            </h2>
            <div className="aa-intro-foot">
              <p>
                Asian Automobiles brings multiple automotive needs into one place. The website now behaves the same way:
                understand the service, see the workshop, then contact the team without digging through generic cards.
              </p>
              <Link href="/about/" className="aa-text-link">
                About the workshop <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="aa-services aa-section">
        <div className="aa-shell">
          <div className="aa-section-head">
            <div>
              <span className="aa-kicker">02 / WHAT WE DO</span>
              <motion.h2 {...reveal}>
                One workshop.
                <br />
                <em>Five clear routes.</em>
              </motion.h2>
            </div>
            <span className="aa-count">01—05</span>
          </div>

          <div className="aa-service-list">
            {services.map((service) => (
              <Link className="aa-service-row" href={service.href} key={service.no}>
                <span className="aa-service-no">{service.no}</span>
                <div className="aa-service-title">
                  <small>SERVICE / {service.no}</small>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.text}</p>
                <span className="aa-service-arrow"><ArrowUpRight size={18} /></span>
                <span className="aa-service-image">
                  <Image src={service.image} alt="" fill sizes="340px" />
                </span>
              </Link>
            ))}
          </div>

          <Link href="/services/" className="aa-outline-button">
            Explore all services <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="aa-feature aa-section-dark">
        <div className="aa-shell">
          <div className="aa-feature-head">
            <div>
              <span className="aa-kicker aa-kicker-light">03 / PROOF OF PLACE</span>
              <motion.h2 {...reveal}>
                Not a showroom.
                <br />
                <em>A working workshop.</em>
              </motion.h2>
            </div>
            <p>
              Final photography should use the actual facility, team and repairs. Until then, imagery is treated as structure,
              not fake proof.
            </p>
          </div>

          <div className="aa-feature-grid">
            <motion.figure {...reveal} className="aa-feature-photo aa-feature-photo-large">
              <Image src={images.service} alt="Automotive workshop environment" fill sizes="(max-width: 900px) 100vw, 65vw" />
              <figcaption>
                <span>WORKSHOP / 01</span>
                <b>Where the actual work happens.</b>
              </figcaption>
            </motion.figure>

            <div className="aa-feature-side">
              <motion.figure {...reveal} className="aa-feature-photo">
                <Image src={images.detail} alt="Close view of automotive repair work" fill sizes="(max-width: 900px) 100vw, 35vw" />
                <figcaption>
                  <span>DETAIL / 02</span>
                  <b>Technical, not theatrical.</b>
                </figcaption>
              </motion.figure>

              <div className="aa-proof-card">
                <Gauge size={22} />
                <span>DESIGN PRINCIPLE</span>
                <h3>Show enough to build confidence. Never invent proof.</h3>
                <Link href="/facilities/">View facilities <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">04 / THE SERVICE JOURNEY</span>
            <motion.h2 {...reveal}>
              Simple from
              <br />
              <em>first contact to handover.</em>
            </motion.h2>
            <p>
              The interface does not try to replace a mechanic. It makes the first conversation faster and easier to understand.
            </p>
          </div>

          <div className="aa-process-list">
            {process.map(([no, title, text]) => (
              <motion.div {...reveal} className="aa-process-row" key={no}>
                <span>{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Plus size={17} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-split-media aa-section-dark">
        <div className="aa-shell aa-split-media-grid">
          <motion.div {...reveal} className="aa-split-image">
            <Image src={images.blackCar} alt="Black performance car detail" fill sizes="(max-width: 900px) 100vw, 55vw" />
          </motion.div>
          <div className="aa-split-copy">
            <span className="aa-kicker aa-kicker-light">05 / REPAIR ASSISTANCE</span>
            <h2>
              When something goes wrong,
              <br />
              <em>the next step should be obvious.</em>
            </h2>
            <p>
              Accident repair and insurance assistance get a dedicated path for the useful details: vehicle, damage, photos and
              contact information.
            </p>
            <div className="aa-split-points">
              <span><ShieldCheck size={17} /> Accident repair enquiries</span>
              <span><Sparkles size={17} /> Denting & painting</span>
              <span><Wrench size={17} /> Repair scope discussion</span>
            </div>
            <Link href="/insurance/" className="aa-light-button">
              Insurance assistance <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="aa-contact aa-section">
        <div className="aa-shell">
          <div className="aa-contact-card">
            <div>
              <span className="aa-kicker">06 / CONTACT</span>
              <motion.h2 {...reveal}>
                Bring the car.
                <br />
                <em>Bring the question.</em>
              </motion.h2>
            </div>

            <div className="aa-contact-detail">
              <MapPin size={19} />
              <p>283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p>
            </div>

            <div className="aa-contact-actions">
              <a href="tel:+919349002038" className="aa-primary-button">
                <Phone size={15} /> Call +91 93490 02038
              </a>
              <Link href="/book-service/" className="aa-outline-button aa-outline-button-dark">
                Book a service <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-final aa-section-dark">
        <div className="aa-shell aa-final-grid">
          <span className="aa-kicker aa-kicker-light">ASIAN AUTOMOBILES / IRINJALAKUDA</span>
          <h2>
            Your car does not need
            <br />
            <em>another generic website.</em>
          </h2>
          <div>
            <p>It needs a clear way into the workshop.</p>
            <Link href="/book-service/" className="aa-light-button">
              Start a service enquiry <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
