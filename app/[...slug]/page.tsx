import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  Clock3,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  Wind,
  CarFront,
  Palette,
  Disc3,
  PackageSearch,
  Camera,
  MessageCircle,
  ChevronRight,
  ClipboardCheck,
  Navigation,
  CircleAlert,
  Search,
  Settings2,
  Boxes,
  CalendarDays,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ServiceConnections } from "@/components/service-connections";
import { bookingHref, findService, serviceRouteAliases } from "@/lib/service-catalog";
import { notFound, permanentRedirect } from "next/navigation";
import { businessFacts, directionsHref, whatsappEnabled, whatsappLink } from "@/lib/business-facts";
import {
  BlueprintTimeline,
  HoverStatRail,
  MotionFaq,
  PageProgressRail,
  ScrollRevealSection,
} from "@/components/immersive/inner-page-experiences";
import { WhatsAppLeadForm } from "@/components/immersive/whatsapp-lead-form";
import {
  ClimateConsole,
  PartsFinder,
  ServiceScanner,
  TyreTreadLab,
  WheelGeometryLab,
} from "@/components/immersive/page-specific-experiences";
import { AboutTimeline, ServiceDecisionBoard } from "@/components/immersive/v13-page-experiences";

const img = {
  workshop: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=76",
  repair: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=76",
  car: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=76",
  road: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=76",
  detail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=76",
  interior: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=76",
  wheel: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=76",
};

const phone = businessFacts.phones.primaryHref;


function CTA({
  label = "Contact the workshop",
  href = "/contact/",
  tone = "primary",
}: {
  label?: string;
  href?: string;
  tone?: "primary" | "dark" | "ghost";
}) {
  return (
    <Link
      data-magnetic
      prefetch={false}
      className={"aa-v10-button aa-v10-button-" + tone}
      href={href}
    >
      <span>{label}</span>
      <ArrowUpRight size={15} />
    </Link>
  );
}

function WhatsAppAction({
  label = "WhatsApp us",
  message = "Hello Asian Automobiles, I would like help with my vehicle.",
}: {
  label?: string;
  message?: string;
}) {
  const href = whatsappLink(message);
  // WhatsApp number not confirmed yet (spec 2.4): offer directions beside the call button instead.
  if (!href) return <Directions />;
  return (
    <a
      data-magnetic
      className="aa-v10-button aa-v10-button-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={15} />
      <span>{label}</span>
      <ArrowUpRight size={14} />
    </a>
  );
}

function Call({ label = "Call workshop" }: { label?: string }) {
  return (
    <a data-magnetic className="aa-v10-button aa-v10-button-ghost" href={"tel:" + phone}>
      <Phone size={15} />
      <span>{label}</span>
    </a>
  );
}

function Directions() {
  return (
    <a
      data-magnetic
      className="aa-v10-button aa-v10-button-ghost"
      href={directionsHref}
      target="_blank"
      rel="noreferrer"
    >
      <Navigation size={15} />
      <span>Get directions</span>
    </a>
  );
}

function Back() {
  return (
    <Link data-magnetic prefetch={false} className="back" href="/">
      <ArrowLeft size={15} />
      Asian Automobiles / Home
    </Link>
  );
}

type PageTheme =
  | "about"
  | "services"
  | "service"
  | "mechanical"
  | "privacy"
  | "ac"
  | "accident"
  | "paint"
  | "wheel"
  | "tyre"
  | "parts"
  | "insurance"
  | "facilities"
  | "gallery"
  | "reviews"
  | "contact"
  | "faq"
  | "booking"
  | "quote";

function HeroArt({ theme }: { theme: PageTheme }) {
  const labels: Record<PageTheme, [string, string]> = {
    about: ["KATTOOR ROAD", "INDEPENDENT / MULTI-BRAND"],
    mechanical: ["DIAGNOSE", "BRAKES / CLUTCH / STEERING"],
    privacy: ["PRIVACY", "YOUR INFORMATION"],
    services: ["SERVICE MAP", "CHOOSE BY NEED"],
    service: ["VEHICLE CHECK", "MAINTENANCE / DIAGNOSIS"],
    ac: ["COOLING", "CABIN CLIMATE"],
    accident: ["DAMAGE / 01", "PHOTOS FIRST"],
    paint: ["PANEL / FINISH", "BODY & PAINT"],
    wheel: ["0.00°", "WHEEL GEOMETRY"],
    tyre: ["TREAD / WEAR", "TYRE CONDITION"],
    parts: ["FITMENT", "MODEL / VARIANT / YEAR"],
    insurance: ["CASE / 01", "ASSESS / DOCUMENT"],
    facilities: ["WORKSHOP MAP", "SERVICE ZONES"],
    gallery: ["CONTACT SHEET", "WORK / EQUIPMENT / PEOPLE"],
    reviews: ["REAL FEEDBACK", "SOURCE / DATE / CONTEXT"],
    contact: ["KATTOOR ROAD", "IRINJALAKUDA"],
    faq: ["?", "ASK / FIND / GO"],
    booking: ["ENQUIRY", "VEHICLE / NEED"],
    quote: ["QUOTE", "VEHICLE / NEED / PHOTO"],
  };

  const photos: Record<PageTheme, [string, string, string]> = {
    about: [img.workshop, img.detail, img.car],
    mechanical: [img.repair, img.workshop, img.detail],
    privacy: [img.detail, img.workshop, img.road],
    services: [img.repair, img.workshop, img.wheel],
    service: [img.repair, img.detail, img.workshop],
    ac: [img.interior, img.detail, img.car],
    accident: [img.repair, img.car, img.detail],
    paint: [img.detail, img.car, img.repair],
    wheel: [img.wheel, img.car, img.road],
    tyre: [img.wheel, img.road, img.detail],
    parts: [img.workshop, img.detail, img.repair],
    insurance: [img.car, img.repair, img.road],
    facilities: [img.workshop, img.repair, img.wheel],
    gallery: [img.car, img.detail, img.workshop],
    reviews: [img.detail, img.workshop, img.car],
    contact: [img.road, img.workshop, img.car],
    faq: [img.detail, img.repair, img.workshop],
    booking: [img.car, img.workshop, img.detail],
    quote: [img.repair, img.car, img.detail],
  };

  const [primary, secondary] = labels[theme];
  const [mainPhoto, detailPhoto, contextPhoto] = photos[theme];

  return (
    <div className={"aa-v11-hero-art aa-v11-hero-" + theme + " aa-v15-photo-hero"} aria-hidden="true">
      <div className="aa-v15-hero-photo-main">
        <Image
          src={mainPhoto}
          alt=""
          fill
          quality={76}
          sizes="(max-width: 720px) 92vw, (max-width: 1100px) 58vw, 520px"
        />
      </div>
      <div className="aa-v15-hero-photo-stack">
        <span className="aa-v15-hero-thumb">
          <Image src={detailPhoto} alt="" fill quality={68} sizes="160px" />
        </span>
        <span className="aa-v15-hero-thumb">
          <Image src={contextPhoto} alt="" fill quality={68} sizes="160px" />
        </span>
      </div>
      <div className="aa-v15-hero-scrim" />
      <div className="aa-v11-theme-core aa-v15-theme-core"><i /><i /><i /><i /></div>
      <strong>{primary}</strong>
      <small>{secondary}</small>
      <span className="aa-v15-photo-index">PHOTO / {theme.toUpperCase()}</span>
    </div>
  );
}

function Frame({
  eyebrow,
  title,
  intro,
  actions,
  theme,
  serviceId,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
  theme: PageTheme;
  serviceId?: string;
  children: ReactNode;
}) {
  return (
    <main className={"creative-page immersive-page immersive-page-v9 aa-inner-v10 aa-v11-page theme-" + theme}>
      <PageProgressRail />
      <section className="creative-head aa-v10-head">
        <div className="creative-head-grid" aria-hidden="true" />
        <div className="wrap creative-wrap aa-v10-hero-wrap">
          <Back />
          <div className="aa-v10-hero-layout">
            <div className="creative-heading aa-view-reveal">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              {intro && <p>{intro}</p>}
            </div>
            <div className="aa-v10-hero-side aa-v11-hero-side">
              <HeroArt theme={theme} />
              <div className="aa-v10-hero-actions">
                {actions ?? (
                  <>
                    <Call />
                    <Directions />
                  </>
                )}
              </div>
            </div>
          </div>
          <a data-magnetic href="#page-content" className="creative-compass">
            <span>SCROLL / SEE WHAT MATTERS</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <div id="page-content" className="creative-body aa-v10-body">
        {children}
        {serviceId && <ServiceConnections id={serviceId} />}
      </div>
    </main>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={"aa-v10-section-head " + (light ? "is-light" : "")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function FeatureCard({
  no,
  eyebrow,
  title,
  copy,
  icon,
  href,
}: {
  no: string;
  eyebrow: string;
  title: string;
  copy: string;
  icon?: ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="aa-v10-feature-meta">
        <span>{no}</span>
        <small>{eyebrow}</small>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {href && <ArrowUpRight className="aa-v10-feature-arrow" size={18} />}
    </>
  );

  return href ? (
    <Link href={href} prefetch={false} className="aa-v10-feature-card">
      {body}
    </Link>
  ) : (
    <article className="aa-v10-feature-card">{body}</article>
  );
}

function PageCTA({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: ReactNode;
}) {
  return (
    <section className="aa-v10-section aa-v10-endcap">
      <div className="wrap aa-v10-endcap-grid">
        <div>
          <span className="eyebrow light">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{copy}</p>
          <div className="aa-v10-inline-actions">{children}</div>
        </div>
      </div>
    </section>
  );
}

type QA = [string, string];

/** FAQ block: existing motion accordion + FAQPage JSON-LD for the visible questions. */
function Faqs({ eyebrow = "QUESTIONS", title, items }: { eyebrow?: string; title: string; items: QA[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <section className="aa-v10-section aa-v10-paper">
      <div className="wrap aa-v10-faq-layout">
        <div className="aa-v10-faq-aside">
          <CircleHelp size={28} />
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>Can’t see your question? Call the workshop with your car’s make, model and year.</p>
          <Call />
        </div>
        <MotionFaq items={items.map(([question, answer]) => ({ question, answer }))} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

function StackList({ items }: { items: [string, string, string][] }) {
  return (
    <div className="aa-v10-stack-list">
      {items.map(([no, title, copy]) => (
        <div key={no}>
          <span>{no}</span>
          <div><b>{title}</b><p>{copy}</p></div>
          <ChevronRight size={17} />
        </div>
      ))}
    </div>
  );
}

const explain = businessFacts.processConfirmed;

/* ------------------------------------------------------------------ About */

function About() {
  return (
    <Frame
      theme="about"
      eyebrow="About us"
      title="About Asian Automobiles"
      intro="An independent, multi-brand car service centre on Kattoor Road, Irinjalakuda."
      actions={<><Call /><Directions /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-story-grid">
          <div className="aa-v10-year-card">
            <span>{businessFacts.establishedConfirmed ? "ESTABLISHED" : "INDEPENDENT"}</span>
            <strong>{businessFacts.establishedConfirmed ? businessFacts.establishedYear : "MULTI-BRAND"}</strong>
            <small>IRINJALAKUDA / KERALA</small>
          </div>
          <ScrollRevealSection>
            <SectionHead
              eyebrow="A LOCAL WORKSHOP"
              title="A local workshop for the car you already drive."
              copy="Asian Automobiles is an independent automobile service centre in Irinjalakuda. We service, maintain and repair passenger cars of many makes, and we help customers source the spare parts their cars need. We are not a car dealership, a used-car showroom or a rental company."
            />
            <p className="aa-v10-reference-note">
              {businessFacts.establishedConfirmed
                ? `Asian Automobiles has been looking after cars in Irinjalakuda since ${businessFacts.establishedYear}. Cars have changed a great deal, but the basics have not: listen to the customer, find the real problem and fix it properly.`
                : "A familiar workshop on Kattoor Road, serving local car owners through workshop visits, direct enquiries and spare-parts requests. Our aim has stayed simple: listen to the customer, find the real problem and fix it properly."}
            </p>
          </ScrollRevealSection>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft aa-v13-about-section">
        <div className="wrap">
          <SectionHead eyebrow="WHAT WE CAN HELP WITH" title="The everyday needs of passenger cars." copy="Not sure whether we handle a particular job? Call us and ask." />
          <AboutTimeline />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead light eyebrow="HOW WE WORK" title="Good car care starts with understanding the problem, not guessing at it." />
          <HoverStatRail
            items={[
              { no: "01", label: "Listen", text: "Tell us what you’ve noticed — a noise, a warning light, weak AC, a car that pulls to one side." },
              ...(explain ? [{ no: "02", label: "Inspect and explain", text: "We check the car and explain what we find, what needs attention now and what can wait." }] : []),
              { no: explain ? "03" : "02", label: "Repair and return", text: "We carry out the agreed work and hand the car back with a clear explanation of what was done." },
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead eyebrow="WHAT YOU CAN EXPECT" title="Behaviours, not promises." />
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="COMMUNICATION" title="Clear communication" copy="We explain things in plain language and answer your questions." icon={<MessageCircle size={19} />} />
            {explain && <FeatureCard no="02" eyebrow="APPROVAL" title="Your approval first" copy="We discuss the work with you before we start." icon={<ClipboardCheck size={19} />} />}
            <FeatureCard no={explain ? "03" : "02"} eyebrow="ADVICE" title="Honest advice" copy="We tell you what needs attention now and what can safely wait." icon={<Search size={19} />} />
            <FeatureCard no={explain ? "04" : "03"} eyebrow="TIME" title="Respect for your time" copy="Call ahead and we’ll plan for your car." icon={<Clock3 size={19} />} />
          </div>
        </div>
      </section>

      <PageCTA eyebrow="BASED IN IRINJALAKUDA" title="Talk to the workshop." copy="You’ll find us on Kattoor Road, near the Government Rest House and Canara Bank. Tell us about your car and what you need.">
        <Call />
        <WhatsAppAction label="WhatsApp us" />
      </PageCTA>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Services hub */

function Services() {
  return (
    <Frame
      theme="services"
      eyebrow="Services"
      title="Our car services"
      intro="Servicing, repairs and maintenance for passenger cars of many makes, at our workshop in Irinjalakuda."
      actions={<><Call /><WhatsAppAction label="Ask on WhatsApp" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="START HERE" title="Choose a service, or tell us what you’re noticing." copy="Whether your car is due for a routine service or showing a problem you can’t explain, pick the closest match — or call us and we’ll point you in the right direction." />
          <ServiceDecisionBoard />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <div className="aa-v10-feature-grid aa-v10-feature-grid-wide">
            <FeatureCard no="01" eyebrow="SERVICING" title="Car service & maintenance" copy="Engine oil change · oil and air filters · fluid checks · general inspection." icon={<Wrench size={19} />} href="/services/car-service-maintenance/" />
            <FeatureCard no="02" eyebrow="REPAIRS" title="Mechanical repairs" copy="Brakes · clutch · suspension and steering · engine troubleshooting." icon={<Settings2 size={19} />} href="/services/mechanical-repairs/" />
            <FeatureCard no="03" eyebrow="AIR CONDITIONING" title="Car AC services" copy="Performance check · fault diagnosis · gas recharge · compressor-related repairs." icon={<Wind size={19} />} href="/services/car-ac-service/" />
            <FeatureCard no="04" eyebrow="WHEELS" title="Wheel alignment & balancing" copy="Wheel alignment · balancing · steering checks · tyre wear assessment." icon={<Gauge size={19} />} href="/services/wheel-alignment-balancing/" />
            <FeatureCard no="05" eyebrow="TYRES" title="Tyre care" copy="Tyre inspection · pressure checks · wear assessment · tyre-related advice." icon={<Disc3 size={19} />} href="/services/tyre-care/" />
            <FeatureCard no="06" eyebrow="PARTS" title="Spare parts enquiry" copy="Genuine (OEM) and aftermarket parts for your car — tell us the make, model, year and part." icon={<PackageSearch size={19} />} href="/spare-parts/" />
          </div>
        </div>
      </section>

      <PageCTA eyebrow="NOT SURE?" title="Not sure which service you need?" copy="Describe the problem on the phone. We’ll tell you what to do next and whether you should bring the car in.">
        <Call />
        <WhatsAppAction label="Describe the problem" />
      </PageCTA>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Service pages */

function CarService() {
  return (
    <Frame
      theme="service"
      serviceId="car-service-maintenance"
      eyebrow="Car service & maintenance"
      title="Car service and maintenance in Irinjalakuda"
      intro="Periodic servicing, oil and filter changes and thorough checks for cars of many makes — to keep your car reliable between journeys."
      actions={<><Call label="Call to book a service" /><WhatsAppAction label="WhatsApp us" message="Hello, I'd like to book a service. Car: [make/model/year]. Kilometres: [ ]" /></>}
    >
      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-two-col">
          <SectionHead
            eyebrow="WHAT A PERIODIC SERVICE IS"
            title="Planned maintenance at regular intervals."
            copy="A periodic service replaces parts that wear out with normal use, such as engine oil and filters, and checks the systems that keep you safe. Your owner’s manual lists the interval — bring it and we’ll use it as a guide."
          />
          <StackList
            items={[
              ["01", "Engine oil & filters", "Engine oil and oil filter replacement; air filter inspection or replacement."],
              ["02", "Checks", "Fluid levels, brake condition, tyre condition and pressure, battery and lights."],
              ["03", "Inspection", "General vehicle inspection and basic checks for leaks, noises and wear."],
              ["04", "Preventive care", "Maintenance as recommended for your car, its age and its schedule."],
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead light eyebrow="HOW A SERVICE WORKS WITH US" title="Call. Bring it in. Inspect. Service. Handover." />
          <BlueprintTimeline
            items={[
              { no: "01", label: "CALL", title: "Call or message us", text: "Tell us your car’s make, model, year and approximate kilometres. We’ll suggest a convenient time." },
              { no: "02", label: "VISIT", title: "Bring your car in", text: "Mention anything you’ve noticed, however small." },
              { no: "03", label: "INSPECT", title: explain ? "Inspect and explain" : "Inspection", text: explain ? "We check the car and agree the recommended work with you." : "We check the car against its service needs." },
              { no: "04", label: "SERVICE", title: "Service", text: "We carry out the agreed work." },
              { no: "05", label: "HANDOVER", title: "Handover", text: "We return the car and explain what was done." },
            ]}
          />
        </div>
      </section>

      <Faqs
        title="Car service questions"
        items={[
          ["How often should my car be serviced?", "Follow the interval in your owner’s manual, usually based on kilometres or months, whichever comes first. Heavy traffic, short trips and dusty roads can mean more frequent checks."],
          ["Can you service my car if it’s still under warranty?", "Warranty terms differ between manufacturers. Check your warranty booklet or ask your dealer whether servicing elsewhere affects your cover before booking."],
          ["How long does a service take?", "It depends on the car and the work needed. Call us and we’ll give you an idea when you book."],
          ["How much does a service cost?", "Cost depends on the car’s make, model, condition and the parts needed. Call with your vehicle details to discuss."],
        ]}
      />

      <PageCTA eyebrow="SERVICE DUE?" title="Is your car due for a service?" copy="Call us with your car’s make, model and kilometres and we’ll arrange a time.">
        <Call label="Call to book a service" />
        <Directions />
      </PageCTA>
    </Frame>
  );
}

function Mechanical() {
  return (
    <Frame
      theme="mechanical"
      serviceId="mechanical-repairs"
      eyebrow="Mechanical repairs"
      title="Mechanical repairs for your car"
      intro="Brake, clutch, suspension, steering and engine problems diagnosed and repaired at our Irinjalakuda workshop."
      actions={<><Call label="Describe the problem" /><WhatsAppAction label="Send a video on WhatsApp" message="Hello, my car has a problem. Car: [make/model/year]. What I'm noticing: [ ]" /></>}
    >
      <section className="aa-v10-section aa-v10-paper aa-v11-service-intake">
        <div className="wrap">
          <SectionHead eyebrow="SYMPTOMS WE CAN LOOK INTO" title="Start with what you notice — when braking, turning, starting or at speed." copy="These are a guide, not a diagnosis." />
          <ServiceScanner />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-two-col">
          <SectionHead eyebrow="REPAIR WORK WE HANDLE" title="Find the cause before fixing it." copy={explain ? "A noise or vibration can have several causes, so we inspect the car — and test-drive it where needed — then explain what needs repairing before going ahead." : "A noise or vibration can have several causes, so we inspect the car and, where needed, test-drive it to reproduce the problem."} />
          <StackList
            items={[
              ["01", "Brake system", "Pads, discs and related components when braking performance or noise changes."],
              ["02", "Clutch", "Slipping, judder or heavy operation, and clutch-related repairs."],
              ["03", "Suspension & steering", "Shock absorbers, springs, bushes and links; play, heaviness or vibration in the steering."],
              ["04", "Engine troubleshooting", "Warning lights, rough running, overheating and loss of power."],
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-insurance-bridge">
          <div className="aa-v10-icon-disc"><CircleAlert size={24} /></div>
          <div role="note">
            <span className="eyebrow">SAFETY FIRST</span>
            <h2>If it doesn’t feel safe, don’t drive it.</h2>
            <p>If your brakes feel unsafe, the steering is unusual or a red warning light is on, avoid driving the car. Call us first and we’ll advise on the next step.</p>
          </div>
          <Call />
        </div>
      </section>

      <Faqs
        title="Repair questions"
        items={[
          ["Can you tell me what’s wrong over the phone?", "We can often suggest likely causes from your description, but a proper diagnosis needs the car to be inspected."],
          ["Is it safe to drive my car to the workshop?", "If the brakes, steering or a red warning light are involved, it may not be. Call us first and describe the problem."],
          ["Do you repair all makes of car?", "We work on passenger cars of many makes. Call with your make, model and year to confirm."],
          ["How long will the repair take?", "It depends on the problem and parts availability. We’ll give you an idea once we’ve inspected the car."],
        ]}
      />

      <PageCTA eyebrow="NOTICED A PROBLEM?" title="Noticed a problem with your car?" copy="Call and tell us what’s happening.">
        <Call />
        <WhatsAppAction label="Send a video on WhatsApp" />
      </PageCTA>
    </Frame>
  );
}

function AC() {
  return (
    <Frame
      theme="ac"
      serviceId="car-ac-service"
      eyebrow="Car AC services"
      title="Car AC service and repair"
      intro="When your car’s AC stops cooling the way it should, we find out why — and fix the cause, not just the symptom."
      actions={<><Call label="Call about your AC" /><WhatsAppAction label="WhatsApp us" message="Hello, my car AC isn't working properly. Car: [make/model/year]. Problem: [ ]" /></>}
    >
      <section className="aa-v10-section aa-v10-paper aa-v11-ac-console-section">
        <div className="wrap">
          <SectionHead eyebrow="COMMON AC PROBLEMS" title="What is the AC doing inside the car?" copy="A gas top-up can restore cooling for a while, but if the system is leaking the problem returns. That is why we check the system first and explain what we find." />
          <ClimateConsole />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-two-col">
          <SectionHead eyebrow="WHAT OUR AC SERVICE CAN INCLUDE" title="Check first. Then fix the cause." copy="Call as soon as you notice cooling getting weaker — and before the hottest months or a long family trip." />
          <StackList
            items={[
              ["01", "Performance check & diagnosis", "How well the system cools, and why it isn’t cooling properly."],
              ["02", "Leak checks", "Checking for signs of leaks before a recharge."],
              ["03", "Gas recharge", "AC gas recharge where required."],
              ["04", "Compressor-related repairs", "And general AC system maintenance."],
            ]}
          />
        </div>
      </section>

      <Faqs
        title="Car AC questions"
        items={[
          ["Does my car AC need regular gas refilling?", "A car AC is a sealed system, so it shouldn’t need frequent top-ups. If cooling drops again soon after a recharge, there is probably a leak that needs finding."],
          ["Why does my AC smell?", "Moisture in the system can let mould and bacteria grow, especially in humid weather. A dirty cabin filter can make it worse."],
          ["Can you repair the AC compressor?", "We handle compressor-related repairs. The right fix depends on what has failed, which we confirm after inspection."],
          ["How much does AC repair cost?", "It depends on the cause. Gas recharge, a leak and a compressor fault are very different jobs. Call us to discuss."],
        ]}
      />

      <PageCTA eyebrow="AC SERVICE" title="AC not cooling like it used to?" copy="Tell us your car’s make, model and what the AC is doing. We’ll advise on the next step.">
        <Call label="Call about your AC" />
        <WhatsAppAction label="WhatsApp us" />
      </PageCTA>
    </Frame>
  );
}

function Wheel() {
  return (
    <Frame
      theme="wheel"
      serviceId="wheel-alignment-balancing"
      eyebrow="Wheel alignment & balancing"
      title="Wheel alignment and balancing"
      intro="Keep your car driving straight, your steering smooth and your tyres wearing evenly."
      actions={<><Call label="Call to check alignment" /><WhatsAppAction label="WhatsApp us" message="Hello, I'd like a wheel alignment/balancing check. Car: [make/model/year]. Problem: [ ]" /></>}
    >
      <section className="aa-v10-section aa-v10-paper aa-v11-wheel-lab-section">
        <div className="wrap">
          <SectionHead eyebrow="SMALL ANGLES, BIG DIFFERENCE" title="Signs your wheels need attention." copy="Potholes, speed breakers and kerbs gradually knock a car’s wheels out of their correct angles and balance — affecting steering, tyre life and comfort." />
          <WheelGeometryLab />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap aa-v10-wheel-compare">
          <SectionHead light eyebrow="ALIGNMENT VS BALANCING" title="Two different problems. Two different checks." />
          <div className="aa-v10-compare-grid">
            <div>
              <Image className="aa-production-compare-photo" src={img.wheel} alt="" fill quality={74} sizes="(max-width: 640px) 100vw, 50vw" />
              <span>ALIGNMENT / 01</span>
              <h3>Where the wheels point.</h3>
              <p>Corrects the angles at which the wheels meet the road. Often needed after a pothole or kerb impact, or suspension and steering work.</p>
              <small>Car pulls / off-centre steering / uneven tyre wear</small>
            </div>
            <div>
              <Image className="aa-production-compare-photo" src={img.car} alt="" fill quality={74} sizes="(max-width: 640px) 100vw, 50vw" />
              <span>BALANCING / 02</span>
              <h3>How the wheel rotates.</h3>
              <p>Spreads the weight of each wheel and tyre evenly using small weights. Often needed after new tyres, a tyre repair or wheel removal.</p>
              <small>Vibration at higher speeds</small>
            </div>
          </div>
        </div>
      </section>

      <Faqs
        title="Alignment and balancing questions"
        items={[
          ["What’s the difference between alignment and balancing?", "Alignment corrects the angles of the wheels; balancing corrects how weight is spread around each wheel. Pulling suggests alignment; vibration at speed usually suggests balancing."],
          ["Do I need alignment when I buy new tyres?", "It’s a good idea. New tyres are usually balanced when fitted, and checking alignment protects them from uneven wear."],
          ["Can bad alignment damage my tyres?", "Yes. Misalignment is one of the most common causes of uneven and early tyre wear."],
          ["How long does alignment take?", "It depends on the car and what adjustment is needed. Call us to plan your visit."],
        ]}
      />

      <PageCTA eyebrow="WHEEL SERVICE" title="Car pulling or steering shaking?" copy="Call us and describe what you’re feeling. We’ll check whether it’s alignment, balancing or something else.">
        <Call label="Call to check alignment" />
        <CTA label="Tyre care" href="/services/tyre-care/" tone="ghost" />
      </PageCTA>
    </Frame>
  );
}

function Tyres() {
  return (
    <Frame
      theme="tyre"
      serviceId="tyre-care"
      eyebrow="Tyre care"
      title="Tyre care for safer driving"
      intro="Tyre inspections, pressure checks and practical advice to keep your car gripping the road — in the dry and through the monsoon."
      actions={<><Call label="Call about your tyres" /><WhatsAppAction label="WhatsApp a photo of your tyre" message="Hello, I'd like advice on my tyres. Car: [make/model/year]. Tyre size: [ ]. Issue: [ ]" /></>}
    >
      <section className="aa-v10-section aa-v10-paper aa-v11-tyre-lab-section">
        <div className="wrap">
          <SectionHead eyebrow="YOUR CAR’S ONLY CONTACT WITH THE ROAD" title="Read the tyre before guessing the repair." copy="The wear pattern tells us a lot: edges worn suggest alignment or pressure; patchy wear suggests balancing or suspension." />
          <TyreTreadLab />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead eyebrow="WHAT WE LOOK AT" title="Tread, pressure, sidewalls and age." copy="Monsoon tip: before the rains, check tread and pressure on all four tyres and the spare." />
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="TREAD" title="Tread depth" copy="When the tread is level with the wear indicators in the grooves, it’s time to replace the tyre." />
            <FeatureCard no="02" eyebrow="PRESSURE" title="Pressure" copy="The correct pressure is usually on a sticker inside the driver’s door." />
            <FeatureCard no="03" eyebrow="SIDEWALL" title="Sidewall damage" copy="Cuts, cracks or bulges can mean internal damage — get them checked promptly." />
            <FeatureCard no="04" eyebrow="ALIGNMENT" title="Uneven wear?" copy="Edge wear often points to alignment. See wheel alignment and balancing." href="/services/wheel-alignment-balancing/" />
          </div>
        </div>
      </section>

      <Faqs
        title="Tyre questions"
        items={[
          ["How often should I check my tyre pressure?", "At least once a month and before long trips, when the tyres are cold."],
          ["How do I know when my tyres need replacing?", "When the tread is level with the wear indicators, or if there are cuts, bulges or cracks. We can check them for you."],
          ["Why are my tyres wearing unevenly?", "Usually alignment, incorrect pressure, balancing or worn suspension. The wear pattern tells us which."],
          ["Should I replace all four tyres at once?", "Not always. At least replace them in pairs on the same axle so grip stays even."],
        ]}
      />

      <PageCTA eyebrow="TYRE CARE" title="Worried about your tyres?" copy="Call us with your tyre size (printed on the sidewall, for example 185/65 R15) and we’ll tell you whether it needs attention.">
        <Call label="Call about your tyres" />
        <WhatsAppAction label="WhatsApp a photo" />
      </PageCTA>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Spare parts */

function Parts() {
  return (
    <Frame
      theme="parts"
      serviceId="spare-parts"
      eyebrow="Spare parts"
      title="Spare parts enquiry"
      intro="Tell us your car and the part you need. We’ll check genuine (OEM) and aftermarket options and get back to you about availability."
      actions={<><Call label="Call us" /><WhatsAppAction label="Ask on WhatsApp" message="Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo." /></>}
    >
      <section className="aa-v10-section aa-v10-paper aa-v11-parts-finder-section">
        <div className="wrap">
          <SectionHead eyebrow="FINDING THE RIGHT PART" title="The same part can differ between years, engines and variants." copy="Availability varies by part and model. We don’t hold every part in stock, but we’ll tell you what we can source." />
          <PartsFinder />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap aa-v10-two-col">
          <SectionHead light eyebrow="DETAILS THAT HELP" title="A few details get the right part first time." copy="Genuine (OEM) parts are made to the original specification; aftermarket parts are often lower cost and quality varies by brand. We’ll explain the options for your part." />
          <HoverStatRail
            items={[
              { no: "01", label: "Make & model", text: "Plus variant — petrol or diesel, manual or automatic." },
              { no: "02", label: "Year", text: "Shown on your registration certificate (RC)." },
              { no: "03", label: "Chassis no.", text: "Optional — the most reliable way to match parts." },
              { no: "04", label: "Part number", text: "If it’s printed on the old part." },
              { no: "05", label: "Photo", text: "Especially helpful for clips, hoses, brackets and sensors." },
            ]}
          />
        </div>
      </section>

      <Faqs
        title="Spare parts questions"
        items={[
          ["Do you have the part in stock?", "It depends on the part and the model. Send an enquiry and we’ll check availability and options for you."],
          ["Can you fit the part for me?", "If the part is for a job our workshop handles, we can discuss fitting it. Call us to plan."],
          ["Can you find parts for older cars?", "We’ll try. Parts for older or less common models can take longer to find or may have limited options."],
          ["What details do you need?", "At minimum your car’s make, model, year and the part name. The chassis number or a photo of the old part makes matching more accurate."],
        ]}
      />

      <PageCTA eyebrow="PREFER TO TALK?" title="Describe the part and we’ll check for you." copy="Or bring the old part to our workshop on Kattoor Road.">
        <Call label="Call us" />
        <Directions />
      </PageCTA>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Contact */

function Contact({ selectedService }: { selectedService?: string }) {
  return (
    <Frame
      theme="contact"
      eyebrow="Contact"
      title="Contact and location"
      intro="Call, message or visit our workshop on Kattoor Road, Irinjalakuda."
      actions={<><Call /><Directions /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="FASTEST ROUTE" title="The quickest way to reach us is a call." />
          <div className="aa-v10-contact-actions">
            <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={21} /><span>CALL</span><b>{businessFacts.phones.primaryDisplay}</b><ArrowUpRight size={18} /></a>
            <a href={"tel:" + businessFacts.phones.landlineHref}><Phone size={21} /><span>LANDLINE</span><b>{businessFacts.phones.landlineDisplay}</b><ArrowUpRight size={18} /></a>
            {whatsappEnabled ? (
              <a href={whatsappLink("Hello Asian Automobiles, ")!} target="_blank" rel="noreferrer"><MessageCircle size={21} /><span>WHATSAPP</span><b>{businessFacts.phones.whatsappDisplay}</b><ArrowUpRight size={18} /></a>
            ) : (
              <a href={"mailto:" + businessFacts.email + "?subject=" + encodeURIComponent("Enquiry from website")}><MessageCircle size={21} /><span>EMAIL · NON-URGENT</span><b>{businessFacts.email}</b><ArrowUpRight size={18} /></a>
            )}
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-location-grid">
          <div className="aa-v10-map-card">
            <div className="aa-v10-map-grid" aria-hidden="true" />
            <div className="aa-v10-map-pin"><MapPin size={26} /><b>ASIAN<br />AUTOMOBILES</b></div>
            <span className="aa-v10-map-road">KATTOOR ROAD</span>
          </div>
          <div className="aa-v10-address-card">
            <span className="eyebrow">OUR ADDRESS</span>
            <h2>Near Government Rest House, Irinjalakuda.</h2>
            <address style={{ fontStyle: "normal" }}><p>Asian Automobiles, {businessFacts.address.full}.</p></address>
            <div className="aa-v10-address-lines">
              <div><MapPin size={16} /><span><small>LANDMARK</small><b>{businessFacts.address.landmark}</b></span></div>
              <div><Phone size={16} /><span><small>PHONE</small><b>{businessFacts.phones.primaryDisplay}</b></span></div>
              <div><Clock3 size={16} /><span><small>WORKING HOURS</small><b>{businessFacts.hours} · Please call ahead on public holidays</b></span></div>
            </div>
            <p className="aa-v10-reference-note">Coming from nearby? We welcome customers from across the Irinjalakuda area, including {businessFacts.serviceArea.join(", ")}.</p>
            <Directions />
          </div>
        </div>
      </section>

      <section id="enquiry" className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          {whatsappEnabled ? (
            <WhatsAppLeadForm mode={findService(selectedService)?.mode ?? "service"} selectedService={selectedService} />
          ) : (
            <div className="aa-v10-insurance-bridge">
              <div className="aa-v10-icon-disc"><Phone size={24} /></div>
              <div>
                <span className="eyebrow">SEND US A MESSAGE</span>
                <h2>For service, repairs or parts, call the workshop.</h2>
                <p>Have your car’s make, model and year ready, and tell us what you need. For non-urgent questions, email {businessFacts.email}.</p>
              </div>
              <Call />
            </div>
          )}
        </div>
      </section>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Privacy */

function Privacy() {
  const sections: QA[] = [
    ["Who we are", `Asian Automobiles, ${businessFacts.address.full}. For any privacy question, email ${businessFacts.email} or call ${businessFacts.phones.primaryDisplay}.`],
    ["What information we collect", "Only what you choose to share when you contact us: your name and phone number, optional email, your car’s make, model, year and variant, the part or service you’re asking about, your message, and any photo you send. We do not ask for payment details or identity documents on this website."],
    ["How we use it", "Only to respond to your enquiry and arrange the service or part you asked about. No marketing messages unless you separately agree."],
    ["Consent", "Enquiries are sent only with your consent. You can withdraw consent at any time by contacting us."],
    ["WhatsApp and third-party services", "If you contact us on WhatsApp, WhatsApp’s own terms apply. Google Maps opens only when you choose directions. Our hosting provider keeps short technical logs for security."],
    ["How long we keep it", "Only as long as needed to respond to you and handle any follow-up work. Part photos are deleted once the enquiry is closed."],
    ["Who we share it with", "We never sell your information. We share it only with providers needed to run this website, with a parts supplier (vehicle and part details only) where needed to source a part, or where the law requires it."],
    ["Your rights", "You can ask for a summary of your information, ask us to correct or erase it, withdraw consent or raise a grievance by contacting us using the details above."],
    ["Children and cookies", "This website is intended for adults. It does not set advertising or tracking cookies."],
    ["Changes", "If we change this policy, we will update the date on this page. Last updated: 7 November 2026."],
  ];
  return (
    <Frame theme="privacy" eyebrow="Legal" title="Privacy Policy" intro="How Asian Automobiles collects, uses and protects the information you share through this website." actions={<Call />}>
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <MotionFaq items={sections.map(([question, answer]) => ({ question, answer }))} />
        </div>
      </section>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Routing & metadata */

const routeMeta: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Asian Automobiles – Independent Car Workshop, Irinjalakuda",
    description: "Asian Automobiles is an independent multi-brand car service centre on Kattoor Road, Irinjalakuda, for servicing, repairs and spare-parts help.",
  },
  services: {
    title: "Car Services in Irinjalakuda – Servicing, Repairs, AC, Alignment – Asian Automobiles",
    description: "Car servicing, mechanical repairs, AC service, wheel alignment and balancing, tyre care and spare-parts enquiries at Asian Automobiles, Irinjalakuda.",
  },
  "services/car-service-maintenance": {
    title: "Car Service and Maintenance in Irinjalakuda – Asian Automobiles",
    description: "Periodic car servicing, oil and filter changes and vehicle inspections for cars of many makes at Asian Automobiles, Kattoor Road, Irinjalakuda. Call to book.",
  },
  "services/mechanical-repairs": {
    title: "Car Mechanical Repairs in Irinjalakuda – Brakes, Clutch, Suspension – Asian Automobiles",
    description: "Diagnosis and repair of car brake, clutch, suspension, steering and engine problems at Asian Automobiles, Irinjalakuda. Describe the symptom and call the workshop.",
  },
  "services/car-ac-service": {
    title: "Car AC Service and Repair in Irinjalakuda – Asian Automobiles",
    description: "Car AC not cooling? Asian Automobiles in Irinjalakuda checks AC performance, finds faults and handles gas recharge and compressor-related repairs.",
  },
  "services/wheel-alignment-balancing": {
    title: "Wheel Alignment and Balancing in Irinjalakuda – Asian Automobiles",
    description: "Car pulling to one side or steering wheel shaking? Asian Automobiles in Irinjalakuda offers wheel alignment, wheel balancing and tyre wear checks.",
  },
  "services/tyre-care": {
    title: "Car Tyre Care and Checks in Irinjalakuda – Asian Automobiles",
    description: "Tyre inspection, pressure checks and wear assessment at Asian Automobiles, Irinjalakuda. Keep your car safe on Kerala roads, in every season.",
  },
  "spare-parts": {
    title: "Car Spare Parts Enquiry in Irinjalakuda – OEM and Aftermarket – Asian Automobiles",
    description: "Looking for a car part? Send Asian Automobiles your car’s make, model, year and the part you need. We’ll check genuine (OEM) and aftermarket options.",
  },
  contact: {
    title: "Contact Asian Automobiles – Kattoor Road, Irinjalakuda",
    description: "Call or visit Asian Automobiles on Kattoor Road, near Government Rest House, Irinjalakuda. Address, directions and working hours.",
  },
  "privacy-policy": {
    title: "Privacy Policy – Asian Automobiles",
    description: "How Asian Automobiles collects, uses and protects the information you share through this website.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const key = slug.join("/");
  const meta = routeMeta[key];
  if (!meta) return { robots: { index: false, follow: false } };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/" + key + "/" },
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: "en_IN", siteName: "Asian Automobiles" },
  };
}

export default async function Page({ params, searchParams }: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams]);
  const key = slug.join("/");
  if (serviceRouteAliases[key]) permanentRedirect(serviceRouteAliases[key]);
  const selected = Array.isArray(query.service) ? query.service[0] : query.service;
  const map: Record<string, () => ReactNode> = {
    about: About,
    services: Services,
    "services/car-service-maintenance": CarService,
    "services/mechanical-repairs": Mechanical,
    "services/car-ac-service": AC,
    "services/wheel-alignment-balancing": Wheel,
    "services/tyre-care": Tyres,
    "spare-parts": Parts,
    contact: () => <Contact selectedService={selected} />,
    "privacy-policy": Privacy,
  };
  const PageView = map[key];
  if (!PageView) notFound();
  return PageView();
}
