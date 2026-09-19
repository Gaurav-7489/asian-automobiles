import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { ImmersiveHero } from "@/components/immersive/immersive-hero";
import { SkiperServiceStack, type StackService } from "@/components/immersive/skiper-service-stack";

const images = {
  service: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=78",
  detail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
  blackCar: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=78",
  workshop: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1600&q=78",
};

const services: StackService[] = [
  {
    no: "01",
    meta: "MECHANICAL / SERVICE",
    title: "Service & mechanical repair",
    text: "Routine maintenance, diagnosis and repair enquiries without making you speak workshop jargon first.",
    href: "/services/car-service/",
    image: images.service,
  },
  {
    no: "02",
    meta: "CLIMATE / AC",
    title: "AC service & repair",
    text: "Cooling, airflow and cabin-comfort issues get their own focused route.",
    href: "/services/car-ac-repair/",
    image: images.blackCar,
  },
  {
    no: "03",
    meta: "BODY / RESTORATION",
    title: "Accident repair & paint",
    text: "Damage, denting and paintwork presented as a clear repair journey instead of a generic contact form.",
    href: "/services/accident-repair/",
    image: images.detail,
  },
  {
    no: "04",
    meta: "WHEEL / ROAD",
    title: "Wheel, tyre & alignment",
    text: "Alignment, balancing, tyre and rim concerns — built around what you actually feel on the road.",
    href: "/services/wheel-alignment/",
    image: images.workshop,
  },
  {
    no: "05",
    meta: "PARTS / ENQUIRY",
    title: "Automobile spare parts",
    text: "Start with the vehicle and what you need. The workshop can take it from there.",
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

export function EditorialHome() {
  return (
    <main className="aa-home aa-home-v3">
      <ImmersiveHero />

      <section className="aa-velocity" aria-label="Core services">
        <div className="aa-velocity-track">
          {[0, 1].map((copy) => (
            <div className="aa-velocity-set" key={copy} aria-hidden={copy === 1}>
              <span>MECHANICAL SERVICE</span><i />
              <span>ACCIDENT REPAIR</span><i />
              <span>WHEEL ALIGNMENT</span><i />
              <span>TYRES</span><i />
              <span>SPARE PARTS</span><i />
              <span>AC SERVICE</span><i />
            </div>
          ))}
        </div>
      </section>

      <section className="aa-intro aa-section aa-reveal-section">
        <div className="aa-shell aa-intro-grid">
          <div className="aa-section-rail">
            <span>01 / THE WORKSHOP</span>
            <p>Less interface. More feeling. Every interaction has a reason to exist.</p>
          </div>

          <div className="aa-intro-main aa-view-reveal">
            <p className="aa-kicker">A LOCAL WORKSHOP / BUILT LIKE A DIGITAL PRODUCT</p>
            <h2>
              Useful first.
              <br />
              <em>Unforgettable second.</em>
            </h2>
            <div className="aa-intro-foot">
              <p>
                The site now behaves like the workshop: direct, responsive and confident.
                Motion guides attention instead of blocking it, so the experience feels fast even when it gets cinematic.
              </p>
              <Link data-magnetic href="/about/" className="aa-text-link">
                About the workshop <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="aa-services-v3 aa-section">
        <div className="aa-shell">
          <div className="aa-section-head">
            <div>
              <span className="aa-kicker">02 / WHAT WE DO</span>
              <h2 className="aa-view-reveal">
                Choose the problem.
                <br />
                <em>Enter the route.</em>
              </h2>
            </div>
            <span className="aa-count">SKIPER STACK / 01—05</span>
          </div>

          <SkiperServiceStack services={services} />
        </div>
      </section>

      <section className="aa-proof-v3 aa-section-dark">
        <div className="aa-shell">
          <div className="aa-proof-v3-head">
            <span className="aa-kicker aa-kicker-light">03 / PROOF OF PLACE</span>
            <h2 className="aa-view-reveal">
              Scroll through
              <br />
              <em>the work itself.</em>
            </h2>
            <p>
              No fake dashboard theatre. The visual system is built around real workshop photography and physical details.
            </p>
          </div>

          <div className="aa-reveal-wall">
            <figure className="aa-reveal-shot aa-shot-a">
              <Image src={images.service} alt="Automotive workshop environment" fill quality={74} sizes="(max-width: 900px) 94vw, 62vw" />
              <figcaption><span>WORKSHOP / 01</span><b>Hands-on service environment.</b></figcaption>
            </figure>
            <figure className="aa-reveal-shot aa-shot-b">
              <Image src={images.detail} alt="Close view of automotive repair work" fill quality={72} sizes="(max-width: 900px) 88vw, 42vw" />
              <figcaption><span>DETAIL / 02</span><b>Technical work in frame.</b></figcaption>
            </figure>
            <aside className="aa-reveal-note">
              <Gauge size={22} />
              <span>SCROLL REVEAL / SKIPER DIRECTION</span>
              <h3>The deeper you scroll, the closer the workshop gets.</h3>
              <Link data-magnetic href="/facilities/">View facilities <ArrowUpRight size={14} /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="aa-type-stage">
        <div className="aa-type-perspective">
          <span>NO GENERIC</span>
          <strong>CAR WEBSITE.</strong>
          <span>NO DEAD</span>
          <strong>INTERACTIONS.</strong>
        </div>
      </section>

      <section className="aa-process aa-section">
        <div className="aa-shell aa-process-grid">
          <div className="aa-process-copy">
            <span className="aa-kicker">04 / THE SERVICE JOURNEY</span>
            <h2 className="aa-view-reveal">
              Smooth from
              <br />
              <em>first contact to handover.</em>
            </h2>
            <p>
              Small transitions, magnetic controls and responsive feedback make every click feel connected to the last one.
            </p>
          </div>

          <div className="aa-process-list">
            {process.map(([no, title, text]) => (
              <div className="aa-process-row aa-view-reveal" key={no}>
                <span>{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Plus size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-split-media aa-section-dark aa-cursor-zone">
        <div className="aa-shell aa-split-media-grid">
          <div className="aa-split-image aa-parallax-media">
            <Image src={images.blackCar} alt="Black performance car detail" fill quality={76} sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div className="aa-split-copy">
            <span className="aa-kicker aa-kicker-light">05 / REPAIR ASSISTANCE</span>
            <h2 className="aa-view-reveal">
              Something went wrong.
              <br />
              <em>The interface stays calm.</em>
            </h2>
            <p>
              Accident repair gets a clear visual path for damage, photos and next steps — with none of the usual form-page boredom.
            </p>
            <div className="aa-split-points">
              <span><ShieldCheck size={17} /> Accident repair enquiries</span>
              <span><Sparkles size={17} /> Denting & painting</span>
              <span><Wrench size={17} /> Repair scope discussion</span>
            </div>
            <Link data-magnetic href="/insurance/" className="aa-light-button">
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
              <h2 className="aa-view-reveal">
                Bring the car.
                <br />
                <em>Bring the question.</em>
              </h2>
            </div>

            <div className="aa-contact-detail">
              <MapPin size={19} />
              <p>283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p>
            </div>

            <div className="aa-contact-actions">
              <a data-magnetic href="tel:+919349002038" className="aa-primary-button">
                <Phone size={15} /> Call +91 93490 02038
              </a>
              <Link data-magnetic href="/book-service/" className="aa-outline-button aa-outline-button-dark">
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
            Make the first
            <br />
            <em>scroll count.</em>
          </h2>
          <div>
            <p>Fast enough to trust. Different enough to remember.</p>
            <Link data-magnetic href="/book-service/" className="aa-light-button">
              Start a service enquiry <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
