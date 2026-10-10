import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  MapPin,
  Phone,
} from "lucide-react";
import { ImmersiveHero } from "@/components/immersive/immersive-hero";
import { SkiperServiceStack, type StackService } from "@/components/immersive/skiper-service-stack";
import { ProcessHover, type ProcessHoverItem } from "@/components/immersive/process-hover";
import { serviceCatalog, serviceImage } from "@/lib/service-catalog";
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

const services: StackService[] = serviceCatalog.map((service, index) => ({
  no: String(index + 1).padStart(2, "0"), meta: service.meta, title: service.title,
  text: service.description, href: service.href, image: serviceImage(service, 1800),
}));

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
    href: "/book-service/",
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

export function EditorialHome() {
  return (
    <main className="aa-home aa-home-v3 aa-home-v8">
      <ImmersiveHero />

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
                From routine maintenance to replacement parts, find the support your vehicle needs
                at our independent multi-brand workshop on Kattoor Road. Choose a service,
                share your vehicle details and agree the next step with our team.
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
              <span className="aa-kicker">02 / EXPLORE SERVICES</span>
              <h2 className="aa-view-reveal">
                Start with the need.
                <br />
                <em>Go to the right service.</em>
              </h2>
            </div>
            <span className="aa-count">7 SERVICES</span>
          </div>

          <SkiperServiceStack services={services} />
        </div>
      </section>

      <section className="aa-proof-v3 aa-section-dark aa-workshop-story">
        <div className="aa-shell">
          <div className="aa-proof-v3-head">
            <span className="aa-kicker aa-kicker-light">03 / WORKSHOP</span>
            <h2 className="aa-view-reveal">
              Explore the workshop.
              <br />
              <em>Know where to go.</em>
            </h2>
            <p>
              Explore our service areas, then find the right support for your car.
              Automotive reference imagery is shown until workshop photos are available.
            </p>
          </div>

          <div className="aa-reveal-wall">
            <figure className="aa-reveal-shot aa-shot-a">
              <Image src={images.service} alt="Temporary automotive service visual pending client workshop photography" fill quality={72} sizes="(max-width: 900px) 94vw, 62vw" />
              <figcaption><span>SERVICE / 01</span><b>Workshop and service activity.</b></figcaption>
            </figure>
            <figure className="aa-reveal-shot aa-shot-b">
              <Image src={images.detail} alt="Temporary automotive repair visual pending client workshop photography" fill quality={70} sizes="(max-width: 900px) 88vw, 42vw" />
              <figcaption><span>REPAIR / 02</span><b>Repair and technical detail.</b></figcaption>
            </figure>
            <aside className="aa-reveal-note">
              <Gauge size={22} />
              <span>SERVICE AREAS</span>
              <h3>Maintenance, wheel care and parts support in one place.</h3>
              <Link data-magnetic prefetch={false} href="/facilities/">Explore facilities <ArrowUpRight size={14} /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">04 / YOUR NEXT STEP</span>
            <h2 className="aa-view-reveal">
              Service, quote,
              <br />
              <em>call or directions.</em>
            </h2>
            <p>
              Choose your service, share the vehicle and continue on WhatsApp.
              The workshop will confirm the scope, availability and visit timing with you.
            </p>
          </div>

          <ProcessHover items={process} />
        </div>
      </section>

      <section className="aa-location aa-section-dark">
        <div className="aa-shell aa-location-grid">
          <div className="aa-location-copy">
            <span className="aa-kicker aa-kicker-light">05 / VISIT US</span>
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

    </main>
  );
}
