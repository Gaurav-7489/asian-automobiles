import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
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
import { businessFacts, directionsHref } from "@/lib/business-facts";
import {
  BlueprintTimeline,
  ExpandGallery,
  HoverStatRail,
  MotionFaq,
  PageProgressRail,
  ScrollRevealSection,
} from "@/components/immersive/inner-page-experiences";
import { WhatsAppLeadForm } from "@/components/immersive/whatsapp-lead-form";

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

function whatsAppHref(message: string) {
  return "https://wa.me/" + businessFacts.phones.whatsappHref + "?text=" + encodeURIComponent(message);
}

function CTA({
  label = "Book a service",
  href = "/book-service/",
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
  return (
    <a
      data-magnetic
      className="aa-v10-button aa-v10-button-whatsapp"
      href={whatsAppHref(message)}
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

function Frame({
  eyebrow,
  title,
  intro,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="creative-page immersive-page immersive-page-v9 aa-inner-v10">
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
            <div className="aa-v10-hero-side">
              <div className="aa-v10-hero-proof">
                <span>IRINJALAKUDA</span>
                <b>Multi-brand vehicle care</b>
                <small>Service + wheel care + spare parts</small>
              </div>
              <div className="aa-v10-hero-actions">
                {actions ?? (
                  <>
                    <CTA />
                    <Call />
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

function SignalCard({
  no,
  title,
  copy,
  icon,
  href,
}: {
  no: string;
  title: string;
  copy: string;
  icon: ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="aa-v10-card-top">
        <span>{no}</span>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {href && <span className="aa-v10-card-arrow"><ArrowUpRight size={16} /></span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} className="aa-v10-signal-card">
        {body}
      </Link>
    );
  }

  return <div className="aa-v10-signal-card">{body}</div>;
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

function About() {
  return (
    <Frame
      eyebrow="About / Asian Automobiles"
      title="Built around cars. Built around Irinjalakuda."
      intro="Asian Automobiles combines multi-brand vehicle service, wheel care and spare-parts support from Kattoor Road."
      actions={<><CTA label="Book a service" /><Directions /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-story-grid">
          <div className="aa-v10-year-card">
            <span>ESTABLISHED</span>
            <strong>{businessFacts.establishedYear}</strong>
            <small>IRINJALAKUDA / KERALA</small>
          </div>
          <ScrollRevealSection>
            <SectionHead
              eyebrow="THREE DECADES / ONE LOCAL BUSINESS"
              title="Cars changed. The job stayed simple: understand the problem and do the work properly."
              copy="Since 1996, the business has grown alongside the vehicles driven in and around Irinjalakuda. Today, service, mechanical repair, precision wheel care and parts support come together at one location."
            />
            <div className="aa-v10-inline-actions">
              <CTA label="Visit the workshop" href="/contact/" tone="dark" />
              <Call />
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="WHAT DEFINES THE WORKSHOP"
            title="Useful experience, without the showroom theatre."
            copy="The website should make the business easy to understand: independent multi-brand support, practical diagnosis, local access and parts knowledge."
          />
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="EXPERIENCE" title="Decades around vehicles" copy="Practical exposure to common automotive problems, maintenance needs and replacement components." icon={<Gauge size={19} />} />
            <FeatureCard no="02" eyebrow="MULTI-BRAND" title="Different cars. Same clear process." copy="Tell the workshop your make, model and problem. Vehicle-specific availability can be confirmed before you visit." icon={<CarFront size={19} />} />
            <FeatureCard no="03" eyebrow="DIAGNOSIS" title="Start with the actual problem" copy="Good service begins by understanding the complaint before jumping straight to replacement parts." icon={<Search size={19} />} />
            <FeatureCard no="04" eyebrow="PARTS + SERVICE" title="Two sides of the same job" copy="Workshop support is connected to an established automotive spare-parts operation." icon={<PackageSearch size={19} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead
            light
            eyebrow="OUR APPROACH"
            title="Inspect carefully. Explain clearly. Keep the next step obvious."
            copy="A premium experience should reduce uncertainty, not add more jargon."
          />
          <HoverStatRail
            items={[
              { no: "01", label: "Understand", text: "Start with the symptom, service need or part requirement in plain language." },
              { no: "02", label: "Inspect", text: "Check the relevant vehicle area before deciding what the repair should be." },
              { no: "03", label: "Explain", text: "Keep the customer clear on what needs attention and what happens next." },
              { no: "04", label: "Proceed", text: "Move ahead with the agreed service, repair or parts enquiry." },
            ]}
          />
        </div>
      </section>

      <PageCTA
        eyebrow="READY WHEN YOU ARE"
        title="Need us to look at the car?"
        copy="Tell us the model and what you are noticing. You do not need to diagnose it yourself."
      >
        <CTA label="Book a service" />
        <WhatsAppAction label="Message the workshop" />
      </PageCTA>
    </Frame>
  );
}

function Services() {
  const problems = [
    ["01", "It is due for service", "Routine maintenance, fluids, filters and general checks.", "/services/car-service/", <CalendarDays size={20} />],
    ["02", "Something sounds or feels wrong", "Noise, vibration, steering, brakes or a mechanical concern.", "/services/car-service/", <Wrench size={20} />],
    ["03", "The AC is not cooling", "Weak cooling, poor airflow or an AC-system concern.", "/services/car-ac-repair/", <Wind size={20} />],
    ["04", "The car pulls or vibrates", "Alignment, balancing, tyre wear and wheel-related checks.", "/services/wheel-alignment/", <Disc3 size={20} />],
    ["05", "There is body damage", "Dents, scratches, panels, paint or accident-related damage.", "/services/accident-repair/", <CarFront size={20} />],
    ["06", "I need a part", "Start a fitment-first spare-parts enquiry.", "/spare-parts/", <PackageSearch size={20} />],
  ] as const;

  return (
    <Frame
      eyebrow="Services / start with what you notice"
      title="You do not need to know the workshop vocabulary."
      intro="Choose the closest problem. We’ll guide you to the right service from there."
      actions={<><WhatsAppAction label="Tell us the problem" /><Call /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="QUICK START" title="What brought you here today?" copy="One tap should get you close to the right next step." />
          <div className="aa-v10-signal-grid">
            {problems.map(([no, title, copy, href, icon]) => (
              <SignalCard key={no} no={no} title={title} copy={copy} href={href} icon={icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead eyebrow="SERVICE DIRECTORY" title="Everything your car needs. Organised so it is easy to scan." />
          <div className="aa-v10-feature-grid aa-v10-feature-grid-wide">
            <FeatureCard no="01" eyebrow="MAINTENANCE" title="Periodic vehicle maintenance" copy="Routine servicing, filters, fluids and preventive checks for everyday reliability." href="/services/car-service/" icon={<ClipboardCheck size={19} />} />
            <FeatureCard no="02" eyebrow="MECHANICAL" title="General mechanical repairs" copy="Diagnosis and repair for common braking, steering, suspension and mechanical concerns." href="/services/car-service/" icon={<Wrench size={19} />} />
            <FeatureCard no="03" eyebrow="WHEELS" title="Computerized wheel alignment" copy="For pulling, off-centre steering and irregular tyre wear." href="/services/wheel-alignment/" icon={<Gauge size={19} />} />
            <FeatureCard no="04" eyebrow="BALANCING" title="Wheel balancing & tyre care" copy="For steering vibration, wheel imbalance, tyre condition and rim-related enquiries." href="/services/tyre-services/" icon={<Disc3 size={19} />} />
            <FeatureCard no="05" eyebrow="CLIMATE" title="Car AC service" copy="For weak cooling, airflow problems and AC-system concerns." href="/services/car-ac-repair/" icon={<Wind size={19} />} />
            <FeatureCard no="06" eyebrow="BODY" title="Denting, painting & accident repair" copy="A direct path for body damage, accident restoration and photo-led enquiries." href="/services/accident-repair/" icon={<CarFront size={19} />} />
            <FeatureCard no="07" eyebrow="PARTS" title="Automobile spare parts" copy="Fitment-first parts support for maintenance, braking, suspension, electrical and more." href="/spare-parts/" icon={<PackageSearch size={19} />} />
            <FeatureCard no="08" eyebrow="NOT SURE" title="Describe the symptom instead" copy="Send the vehicle and the problem in your own words. The workshop can guide the next step." href="/request-quote/" icon={<MessageCircle size={19} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead light eyebrow="A SIMPLE SERVICE JOURNEY" title="Tell us. Inspect. Explain. Service. Check." />
          <BlueprintTimeline
            items={[
              { no: "01", label: "TELL US", title: "Start with the complaint", text: "Share the vehicle model, the symptom or the service you already know you need." },
              { no: "02", label: "INSPECT", title: "Look at the relevant system", text: "The useful next step is inspection, not guesswork." },
              { no: "03", label: "EXPLAIN", title: "Make the work clear", text: "Keep the repair requirement understandable before the job moves ahead." },
              { no: "04", label: "SERVICE", title: "Carry out the agreed work", text: "Proceed with the maintenance or repair scope that applies to the vehicle." },
              { no: "05", label: "CHECK", title: "Verify the affected area", text: "Finish by checking the area that was serviced before handover." },
            ]}
          />
        </div>
      </section>

      <PageCTA
        eyebrow="STILL NOT SURE?"
        title="Just tell us what the car is doing."
        copy="No mechanic-speak required. A short WhatsApp message is enough to start."
      >
        <WhatsAppAction label="Describe the problem" />
        <CTA label="Book service" />
      </PageCTA>
    </Frame>
  );
}

function CarService() {
  return (
    <Frame
      eyebrow="General car service & mechanical repair"
      title="Maintenance when it is due. Diagnosis when something feels wrong."
      intro="Routine servicing and common mechanical concerns, without making you choose the exact repair before the car is inspected."
      actions={<><CTA label="Book general service" /><WhatsAppAction label="Ask about a symptom" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="START WITH THE NEED" title="Which of these sounds closest?" />
          <div className="aa-v10-signal-grid">
            <SignalCard no="01" title="Service is due" copy="Routine maintenance, fluids, filters and preventive checks." icon={<CalendarDays size={20} />} />
            <SignalCard no="02" title="There is a noise or vibration" copy="A useful starting point for mechanical troubleshooting." icon={<Gauge size={20} />} />
            <SignalCard no="03" title="Brakes or steering feel different" copy="Changes in feel, stability or braking deserve inspection." icon={<CarFront size={20} />} />
            <SignalCard no="04" title="I just want the car checked" copy="Share the vehicle and concern. The workshop can confirm the sensible next step." icon={<Search size={20} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-two-col">
          <SectionHead
            eyebrow="SERVICE SCOPE"
            title="Routine care and common mechanical support."
            copy="The supplied content system groups maintenance, braking, suspension, steering and general mechanical troubleshooting under the workshop offer."
          />
          <div className="aa-v10-stack-list">
            {[
              ["01", "Periodic maintenance", "Oil, filters, fluids and preventive vehicle checks."],
              ["02", "Mechanical concerns", "Noise, vibration, cooling, clutch and general troubleshooting."],
              ["03", "Brakes", "Wear, noise and braking-component inspection or repair where required."],
              ["04", "Suspension & steering", "Ride, handling, worn components and stability-related complaints."],
            ].map(([no, title, copy]) => (
              <div key={no}>
                <span>{no}</span>
                <div><b>{title}</b><p>{copy}</p></div>
                <ChevronRight size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead light eyebrow="NO-GUESSWORK PROCESS" title="The vehicle decides the repair. Not the other way around." />
          <BlueprintTimeline
            items={[
              { no: "01", label: "DETAILS", title: "Tell us what you notice", text: "Vehicle model, symptoms and the service history you know are enough to begin." },
              { no: "02", label: "INSPECTION", title: "Check the relevant area", text: "The affected components and systems are inspected before a repair path is agreed." },
              { no: "03", label: "RECOMMENDATION", title: "Explain the useful work", text: "The repair or maintenance need should be clear before unnecessary parts are replaced." },
              { no: "04", label: "SERVICE", title: "Complete and verify", text: "Carry out the agreed work and check the affected system before handover." },
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-photo-split">
          <div className="aa-v10-photo-frame">
            <Image src={img.detail} alt="Automotive service reference visual" fill sizes="(max-width: 900px) 100vw, 54vw" />
          </div>
          <div className="aa-v10-photo-copy">
            <span className="eyebrow">EASY START</span>
            <h2>You do not need to know the diagnosis.</h2>
            <p>“There is a sound when I turn”, “the steering vibrates”, or “service is due” is enough to begin the conversation.</p>
            <div className="aa-v10-inline-actions">
              <CTA label="Book a service" tone="dark" />
              <WhatsAppAction label="Send the symptom" />
            </div>
          </div>
        </div>
      </section>
    </Frame>
  );
}

function AC() {
  return (
    <Frame
      eyebrow="Car AC service / Irinjalakuda"
      title="AC not cooling properly? Start with what you can feel."
      intro="Weak cooling, inconsistent airflow and unusual AC-system behaviour are enough to start an enquiry."
      actions={<><WhatsAppAction label="Request AC service" message="Hello Asian Automobiles, I would like help with my car AC." /><Call /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="COMMON STARTING POINTS" title="What is the cabin doing?" />
          <div className="aa-v10-signal-grid">
            <SignalCard no="01" title="Cooling feels weak" copy="The cabin takes too long to cool or never gets properly cold." icon={<Wind size={20} />} />
            <SignalCard no="02" title="Airflow feels low" copy="Air is coming through, but not with the airflow you expect." icon={<Gauge size={20} />} />
            <SignalCard no="03" title="Cooling is inconsistent" copy="Performance changes during the drive or between vents." icon={<Settings2 size={20} />} />
            <SignalCard no="04" title="There is an unusual AC sound" copy="Tell the workshop when the sound appears and what changes with it." icon={<CircleAlert size={20} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-two-col">
          <SectionHead
            eyebrow="AC SERVICE SCOPE"
            title="Cooling, airflow and component checks - explained without overcomplicating it."
            copy="Exact refrigerants, machine models and procedures should be confirmed for the vehicle rather than advertised as one-size-fits-all."
          />
          <div className="aa-v10-stack-list">
            <div><span>01</span><div><b>Cooling diagnosis</b><p>Start with the temperature complaint and system performance.</p></div><ChevronRight size={17} /></div>
            <div><span>02</span><div><b>Airflow checks</b><p>Look at weak or inconsistent cabin airflow and filter-related concerns.</p></div><ChevronRight size={17} /></div>
            <div><span>03</span><div><b>Component inspection</b><p>Check relevant AC components when the symptom points beyond normal operation.</p></div><ChevronRight size={17} /></div>
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="AC SERVICE"
        title="Tell us what the cabin feels like."
        copy="That is enough to start. The workshop can confirm the next step for your vehicle."
      >
        <WhatsAppAction label="Message AC issue" message="Hello Asian Automobiles, I need help with my car AC. The issue is: " />
        <Call />
      </PageCTA>
    </Frame>
  );
}

function Accident() {
  return (
    <Frame
      eyebrow="Accident & body repair / start here"
      title="Had an accident? Start with the damage, not the paperwork."
      intro="Send a few clear photos and a short description. We’ll help you work out the useful next step."
      actions={<><WhatsAppAction label="Send damage details" message="Hello Asian Automobiles, I need help with accident / body damage. I can send photos." /><Call label="Call for accident help" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-accident-start">
          <div>
            <SectionHead
              eyebrow="FIRST 3 THINGS"
              title="Keep the first message simple."
              copy="You do not need an estimate, insurance jargon or a perfect damage list before contacting the workshop."
            />
            <div className="aa-v10-inline-actions">
              <WhatsAppAction label="Open WhatsApp" message="Hello Asian Automobiles, I need help with accident / body damage. Vehicle: " />
              <CTA label="Request a quote" href="/request-quote/" tone="dark" />
            </div>
          </div>
          <div className="aa-v10-accident-steps">
            <div><span>01</span><Camera size={19} /><b>Take clear photos</b><p>Wide view + closer damage photos are useful.</p></div>
            <div><span>02</span><CarFront size={19} /><b>Tell us the vehicle</b><p>Make, model and what happened in a sentence or two.</p></div>
            <div><span>03</span><MessageCircle size={19} /><b>Send it over</b><p>The workshop can tell you what information is needed next.</p></div>
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="BODY DAMAGE"
            title="From everyday dents to accident-related bodywork."
            copy="The supplied content covers dent, panel, scratch, paint, bumper and accident-restoration enquiries."
          />
          <div className="aa-v10-feature-grid aa-v10-feature-grid-wide">
            <FeatureCard no="01" eyebrow="DENTS" title="Dent & panel damage" copy="Start with visible dents, creases or damaged body panels." icon={<CarFront size={19} />} />
            <FeatureCard no="02" eyebrow="PAINT" title="Scratches & paint damage" copy="Show the affected area clearly so the workshop can understand the scope." icon={<Palette size={19} />} />
            <FeatureCard no="03" eyebrow="BUMPER" title="Bumper / trim damage" copy="Share close-ups plus one wider photo showing the full affected area." icon={<Camera size={19} />} />
            <FeatureCard no="04" eyebrow="ACCIDENT" title="Accident restoration enquiry" copy="Body damage can be assessed together with any repair or documentation needs that apply." icon={<ShieldCheck size={19} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead
            light
            eyebrow="A CALMER REPAIR PATH"
            title="Assessment to final check, one clear step at a time."
            copy="This is an explanatory customer journey. Exact repair and insurance steps can vary by vehicle and case."
          />
          <BlueprintTimeline
            items={[
              { no: "01", label: "ASSESS", title: "Look at the visible damage", text: "Start with the damaged areas and identify what needs closer inspection." },
              { no: "02", label: "DOCUMENT", title: "Prepare useful photos and details", text: "Relevant photographs and repair details can be gathered where the case requires them." },
              { no: "03", label: "ESTIMATE", title: "Make the work understandable", text: "Clarify the repair scope and components involved before approved work begins." },
              { no: "04", label: "REPAIR", title: "Carry out the agreed bodywork", text: "Proceed with the approved repair scope for the vehicle." },
              { no: "05", label: "CHECK", title: "Inspect the repaired area", text: "The repaired areas are checked before the vehicle is handed back." },
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-insurance-bridge">
          <div className="aa-v10-icon-disc"><ShieldCheck size={24} /></div>
          <div>
            <span className="eyebrow">INSURANCE CASE?</span>
            <h2>We keep insurer-specific claims out of the guesswork.</h2>
            <p>Insurance assistance, insurer participation and approval steps can differ by case. Ask the workshop what currently applies before repair work begins.</p>
          </div>
          <CTA label="See insurance assistance" href="/insurance/" tone="dark" />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <WhatsAppLeadForm mode="accident" />
        </div>
      </section>
    </Frame>
  );
}

function Denting() {
  return (
    <Frame
      eyebrow="Denting & painting"
      title="Bodywork is easier to discuss when we can see it."
      intro="A clean photo-led path for dents, scratches, panel damage and paint-related enquiries."
      actions={<><WhatsAppAction label="Send body damage photos" message="Hello Asian Automobiles, I have dent / paint damage. I can send photos." /><CTA label="Request a quote" href="/request-quote/" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="SHOW THE MARK" title="Start with photos. The workshop can ask for the rest." />
          <div className="aa-v10-before-after">
            <figure>
              <Image src={img.car} alt="Reference visual for vehicle body damage" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <figcaption><span>01 / DAMAGE VIEW</span><b>Wide view + close-up</b></figcaption>
            </figure>
            <figure>
              <Image src={img.detail} alt="Reference visual for automotive finish detail" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <figcaption><span>02 / DETAIL VIEW</span><b>Show the panel clearly</b></figcaption>
            </figure>
          </div>
          <p className="aa-v10-reference-note">Reference visuals only. Final site photography should use approved Asian Automobiles workshop and repair images.</p>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="DENT" title="Dents & creases" copy="Show the affected panel and the damage from more than one angle." />
            <FeatureCard no="02" eyebrow="SCRATCH" title="Scratch / paint damage" copy="A close photo helps start the paint-related enquiry." />
            <FeatureCard no="03" eyebrow="PANEL" title="Panel / bumper damage" copy="Include one wider shot so the workshop can understand the full area." />
            <FeatureCard no="04" eyebrow="ACCIDENT" title="Accident-related bodywork" copy="Use the accident page when damage is part of a larger repair or insurance case." href="/services/accident-repair/" />
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="PHOTO-LED ENQUIRY"
        title="Show us the damage. We’ll start there."
        copy="No need to write an essay. Vehicle + photos + one short note is enough."
      >
        <WhatsAppAction label="Send damage photos" message="Hello Asian Automobiles, I have body damage and can send photos. Vehicle: " />
        <CTA label="Request quote" href="/request-quote/" />
      </PageCTA>
    </Frame>
  );
}

function Wheel() {
  return (
    <Frame
      eyebrow="Wheel alignment & balancing"
      title="Pulling, vibration or uneven tyre wear? Start with the wheels."
      intro="Computerized alignment is a key workshop capability, with balancing and tyre care around it."
      actions={<><CTA label="Book wheel service" /><WhatsAppAction label="Describe the wheel issue" message="Hello Asian Automobiles, I need help with wheel alignment / balancing. The symptom is: " /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="COMMON SIGNS" title="What are you noticing on the road?" />
          <div className="aa-v10-signal-grid">
            <SignalCard no="01" title="Car pulls left or right" copy="Straight-line stability can point to alignment-related issues." icon={<ArrowRight size={20} />} />
            <SignalCard no="02" title="Steering wheel is off-centre" copy="A useful reason to ask for an alignment check." icon={<Gauge size={20} />} />
            <SignalCard no="03" title="Steering vibrates at speed" copy="Wheel imbalance is a common starting point for investigation." icon={<Disc3 size={20} />} />
            <SignalCard no="04" title="Tyres are wearing unevenly" copy="Wheel geometry and tyre condition should be looked at together." icon={<Search size={20} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap aa-v10-wheel-compare">
          <SectionHead light eyebrow="ALIGNMENT VS BALANCING" title="Two different problems. Two different checks." />
          <div className="aa-v10-compare-grid">
            <div>
              <span>ALIGNMENT / 01</span>
              <h3>Where the wheels point.</h3>
              <p>Wheel geometry affects straight-line stability, steering position and tyre wear.</p>
              <small>Pulling / off-centre steering / uneven wear</small>
            </div>
            <div>
              <span>BALANCING / 02</span>
              <h3>How the wheel rotates.</h3>
              <p>Correct balancing helps reduce unwanted vibration and supports smoother vehicle behaviour.</p>
              <small>Steering vibration / wheel imbalance / smoothness</small>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead eyebrow="WHEEL CARE" title="Alignment, balancing, tyre checks and rim-related enquiries." />
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="ALIGNMENT" title="Computerized wheel alignment" copy="Check and correct wheel geometry where required." />
            <FeatureCard no="02" eyebrow="BALANCING" title="Wheel balancing" copy="Address wheel imbalance and vibration-related complaints." />
            <FeatureCard no="03" eyebrow="TYRES" title="Tyre condition & wear" copy="Look at tyre wear patterns, condition and rotation needs." href="/services/tyre-services/" />
            <FeatureCard no="04" eyebrow="RIMS" title="Rim-related enquiry" copy="Start with a visible issue or vibration and let the workshop confirm the next step." href="/services/tyre-services/" />
          </div>
        </div>
      </section>

      <PageCTA eyebrow="WHEEL SERVICE" title="If it does not feel straight or smooth, get it checked." copy="Tell us the symptom and when you notice it most.">
        <CTA label="Book wheel service" />
        <WhatsAppAction label="Message the symptom" />
      </PageCTA>
    </Frame>
  );
}

function Tyres() {
  return (
    <Frame
      eyebrow="Tyre & wheel care"
      title="Tyres tell you a lot about what the car is doing."
      intro="Tyre condition, balancing, wear patterns and rim concerns can all point to useful next checks."
      actions={<><WhatsAppAction label="Ask about tyre / wheel care" /><CTA label="Book wheel service" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="WHAT TO LOOK FOR" title="Three quick signs worth checking." />
          <div className="aa-v10-signal-grid">
            <SignalCard no="01" title="Uneven tyre wear" copy="Different wear across the tyre can be a reason to inspect wheel geometry." icon={<Search size={20} />} />
            <SignalCard no="02" title="Vibration at speed" copy="Balancing is one of the useful starting checks." icon={<Disc3 size={20} />} />
            <SignalCard no="03" title="Visible tyre or rim concern" copy="Send a clear photo and tell us what changed while driving." icon={<Camera size={20} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap aa-v10-tyre-stage">
          <div className="aa-v10-tyre-graphic" aria-hidden="true">
            <div className="aa-v10-tread-lines"><span /><span /><span /><span /><span /><span /></div>
            <b>WHEEL / TYRE</b>
          </div>
          <div>
            <SectionHead light eyebrow="WHEEL CARE SYSTEM" title="Keep the tyre, wheel and alignment story together." copy="The most useful diagnosis often comes from looking at how the tyre is wearing and how the vehicle behaves on the road." />
            <div className="aa-v10-inline-actions">
              <CTA label="Wheel alignment" href="/services/wheel-alignment/" />
              <WhatsAppAction label="Send a tyre photo" />
            </div>
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="BALANCE" title="Wheel balancing" copy="For imbalance and vibration-related complaints." />
            <FeatureCard no="02" eyebrow="TYRE" title="Tyre inspection" copy="Condition, wear and service-related tyre checks." />
            <FeatureCard no="03" eyebrow="PUNCTURE" title="Puncture support" copy="Start a tyre repair enquiry with the workshop." />
            <FeatureCard no="04" eyebrow="RIM" title="Rim inspection / repair enquiry" copy="Share the visible issue or driving symptom first." />
          </div>
        </div>
      </section>
    </Frame>
  );
}

function Parts() {
  return (
    <Frame
      eyebrow="Automobile spare parts"
      title="The right part starts with the right vehicle details."
      intro="Model, variant, year and part information reduce fitment guesswork before you travel."
      actions={<><WhatsAppAction label="Check part availability" message="Hello Asian Automobiles, I would like to check a spare part. Vehicle: " /><Call label="Call parts counter" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="PARTS CATEGORIES"
            title="Maintenance, braking, suspension, electrical and more."
            copy="Availability varies, so this page is enquiry-first rather than pretending to be a live inventory."
          />
          <div className="aa-v10-feature-grid aa-v10-feature-grid-wide">
            <FeatureCard no="01" eyebrow="ENGINE / MAINTENANCE" title="Filters, belts, mountings & service parts" copy="Commonly required maintenance and engine-supporting components." icon={<Settings2 size={19} />} />
            <FeatureCard no="02" eyebrow="BRAKES" title="Pads, shoes, discs & related parts" copy="Brake components and supporting hydraulic parts subject to availability." icon={<Disc3 size={19} />} />
            <FeatureCard no="03" eyebrow="SUSPENSION" title="Bushes, tie rods, ball joints & more" copy="Suspension and steering replacement-component enquiries." icon={<CarFront size={19} />} />
            <FeatureCard no="04" eyebrow="ELECTRICAL" title="Sensors, switches, relays & lighting" copy="Common electrical replacement parts and components." icon={<Sparkles size={19} />} />
            <FeatureCard no="05" eyebrow="FILTERS" title="Oil, air, fuel & cabin filters" copy="Routine service filters for the correct vehicle application." icon={<Boxes size={19} />} />
            <FeatureCard no="06" eyebrow="FLUIDS" title="Oils, coolant & maintenance fluids" copy="Vehicle-appropriate lubricants and fluids subject to availability." icon={<Gauge size={19} />} />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap aa-v10-two-col">
          <SectionHead
            light
            eyebrow="FITMENT CHECKLIST"
            title="Five details can save a lot of back-and-forth."
            copy="Send what you know. A photo of the old part can help when available."
          />
          <HoverStatRail
            items={[
              { no: "01", label: "Vehicle", text: "Manufacturer + model." },
              { no: "02", label: "Variant", text: "Engine / trim if known." },
              { no: "03", label: "Year", text: "Registration or model year." },
              { no: "04", label: "Part", text: "Name, description or part number if known." },
              { no: "05", label: "Photo", text: "Existing component or packaging if available." },
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <WhatsAppLeadForm mode="parts" />
        </div>
      </section>
    </Frame>
  );
}

function Insurance() {
  return (
    <Frame
      eyebrow="Insurance / accident repair assistance"
      title="Repair first. Insurance details where they actually apply."
      intro="Accident cases can involve repair assessment, documentation and insurer-specific approval steps. We keep those details case-by-case."
      actions={<><WhatsAppAction label="Ask about your case" message="Hello Asian Automobiles, I have an accident / insurance repair enquiry. Vehicle: " /><Call /></>}
    >
      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead
            light
            eyebrow="EXPLANATORY FLOW"
            title="A clear path from vehicle assessment to repair."
            copy="Exact insurer and approval steps can vary. The workshop should confirm what applies to your case."
          />
          <BlueprintTimeline
            items={[
              { no: "01", label: "ASSESS", title: "Vehicle assessment", text: "Visible damage and repair requirements are identified." },
              { no: "02", label: "DOCUMENT", title: "Photos and repair details", text: "Relevant documentation can be prepared where the case requires it." },
              { no: "03", label: "ESTIMATE", title: "Repair information", text: "Clarify the work and components involved before approved work moves ahead." },
              { no: "04", label: "APPROVAL", title: "Case-specific coordination", text: "Insurer, survey and approval steps depend on the current case and eligibility." },
              { no: "05", label: "REPAIR", title: "Repair and final check", text: "Approved repair work is completed and the repaired area is checked before handover." },
            ]}
          />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-insurance-grid">
          <div>
            <ShieldCheck size={28} />
            <span className="eyebrow">WHAT WE WILL NOT GUESS</span>
            <h2>No blanket claim-approval promises.</h2>
            <p>Current insurer participation, cashless eligibility and approval steps need to be confirmed for the actual case.</p>
          </div>
          <div className="aa-v10-stack-list">
            <div><span>01</span><div><b>Damage assessment</b><p>Start with the vehicle and visible damage.</p></div><ChevronRight size={17} /></div>
            <div><span>02</span><div><b>Documentation support</b><p>Prepare useful photos and repair information where applicable.</p></div><ChevronRight size={17} /></div>
            <div><span>03</span><div><b>Eligibility check</b><p>Confirm what insurer-specific route currently applies.</p></div><ChevronRight size={17} /></div>
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <WhatsAppLeadForm mode="accident" />
        </div>
      </section>
    </Frame>
  );
}

function Facilities() {
  const zones = [
    ["Workshop service area", img.workshop, "SERVICE AREA"],
    ["Wheel alignment area", img.road, "WHEEL CARE"],
    ["Wheel balancing equipment", img.wheel, "BALANCING"],
    ["Mechanical service activity", img.repair, "MECHANICAL"],
    ["Spare-parts support", img.detail, "PARTS"],
    ["Customer-facing areas", img.interior, "VISIT"],
  ];

  return (
    <Frame
      eyebrow="Our facilities"
      title="Tools matter. Experience matters more."
      intro="A visual look at the workshop areas that support maintenance, wheel care, mechanical work and spare-parts enquiries."
      actions={<><CTA label="View gallery" href="/gallery/" /><Directions /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="WORKSHOP EXPLORER" title="See the spaces that support the work." copy="Real Asian Automobiles photography should remain the final visual source of truth." />
          <ExpandGallery
            items={zones.map(([label, image, eyebrow]) => ({
              label,
              eyebrow,
              image,
              alt: "Automotive workshop reference visual for " + label.toLowerCase(),
            }))}
          />
          <p className="aa-v10-reference-note">Reference imagery is being used until approved Asian Automobiles workshop photography is supplied.</p>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap">
          <SectionHead eyebrow="CAPABILITY MAP" title="The page should show the workshop, not invent specifications." />
          <div className="aa-v10-feature-grid">
            <FeatureCard no="01" eyebrow="SERVICE" title="Workshop service area" copy="Working areas for routine maintenance and common mechanical repairs." />
            <FeatureCard no="02" eyebrow="ALIGNMENT" title="Wheel alignment area" copy="A dedicated computerized alignment setup is a key capability in the supplied content." />
            <FeatureCard no="03" eyebrow="BALANCING" title="Wheel balancing equipment" copy="Precision balancing supports vibration-related wheel-care work." />
            <FeatureCard no="04" eyebrow="PARTS" title="Parts support" copy="Replacement-component access connects diagnosis, sourcing and repair within the same business." />
          </div>
        </div>
      </section>

      <PageCTA eyebrow="VISIT THE WORKSHOP" title="Want to talk through a vehicle issue in person?" copy="Call before travelling if you need to confirm timing or a specific service.">
        <Directions />
        <Call />
      </PageCTA>
    </Frame>
  );
}

function Gallery() {
  const items = [
    [img.workshop, "Workshop", "WORKSHOP"],
    [img.repair, "Vehicle service", "SERVICE"],
    [img.road, "Wheel alignment", "WHEELS"],
    [img.wheel, "Wheel balancing", "BALANCING"],
    [img.detail, "Mechanical repairs", "REPAIRS"],
    [img.car, "Body repair", "BODY"],
  ];

  return (
    <Frame
      eyebrow="Gallery / workshop life"
      title="The work should speak for itself."
      intro="The final gallery is designed around real workshop, equipment, repair and vehicle photography."
      actions={<><CTA label="View facilities" href="/facilities/" /><CTA label="Book service" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="VISUAL PROOF" title="Workshop. Service. Wheels. Repairs. Parts." />
          <ExpandGallery
            items={items.map(([image, label, eyebrow]) => ({
              label,
              eyebrow,
              image,
              alt: "Automotive reference visual for " + label.toLowerCase(),
            }))}
          />
          <p className="aa-v10-reference-note">Reference visuals only. Replace with approved Asian Automobiles photography for production authenticity.</p>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-gallery-categories">
          {["Workshop", "Vehicle Service", "Wheel Alignment", "Wheel Balancing", "Mechanical Repairs", "Body Repair", "Spare Parts", "Before & After"].map((label, index) => (
            <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b></div>
          ))}
        </div>
      </section>
    </Frame>
  );
}

function Reviews() {
  return (
    <Frame
      eyebrow="Reviews & customer stories"
      title="Trust is earned one vehicle at a time."
      intro="This page is deliberately built around genuine customer feedback only - no invented quotes, no fake stars."
      actions={<><Call label="Talk to the workshop" /><CTA label="Book a service" /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-review-intro">
          <div>
            <SectionHead
              eyebrow="REAL FEEDBACK ONLY"
              title="Source, context and attribution matter."
              copy="Verified public reviews or customer-approved stories can be added without changing their meaning."
            />
          </div>
          <div className="aa-v10-review-principles">
            <div><span>01</span><b>Source</b><p>Keep where the review came from.</p></div>
            <div><span>02</span><b>Date</b><p>Keep useful timing and context.</p></div>
            <div><span>03</span><b>Work done</b><p>Connect feedback to the actual service where known.</p></div>
            <div><span>04</span><b>Permission</b><p>Use customer stories responsibly.</p></div>
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-dark">
        <div className="wrap">
          <SectionHead light eyebrow="REVIEW CATEGORIES" title="The useful themes are practical, not theatrical." />
          <div className="aa-v10-feature-grid aa-v10-feature-grid-dark">
            {[
              ["01", "General servicing"],
              ["02", "Wheel alignment"],
              ["03", "Mechanical repair"],
              ["04", "Spare-parts availability"],
              ["05", "Customer service"],
              ["06", "Repeat customers"],
            ].map(([no, title]) => (
              <FeatureCard key={no} no={no} eyebrow="CUSTOMER FEEDBACK" title={title} copy="Only publish genuine, attributable feedback in this category." />
            ))}
          </div>
        </div>
      </section>
    </Frame>
  );
}

function Contact() {
  return (
    <Frame
      eyebrow="Contact / Kattoor Road"
      title="Let’s get your vehicle sorted."
      intro="Call, WhatsApp or get directions to Asian Automobiles in Irinjalakuda."
      actions={<><WhatsAppAction label="WhatsApp workshop" /><Call /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <SectionHead eyebrow="FASTEST ROUTE" title="Pick the action you need." />
          <div className="aa-v10-contact-actions">
            <a href={"tel:" + businessFacts.phones.primaryHref}><Phone size={21} /><span>CALL</span><b>{businessFacts.phones.primaryDisplay}</b><ArrowUpRight size={18} /></a>
            <a href={whatsAppHref("Hello Asian Automobiles, I would like help with my vehicle.")} target="_blank" rel="noreferrer"><MessageCircle size={21} /><span>WHATSAPP</span><b>{businessFacts.phones.whatsappDisplay}</b><ArrowUpRight size={18} /></a>
            <a href={directionsHref} target="_blank" rel="noreferrer"><MapPin size={21} /><span>DIRECTIONS</span><b>Kattoor Road, Irinjalakuda</b><ArrowUpRight size={18} /></a>
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
            <span className="eyebrow">WORKSHOP</span>
            <h2>Near Government Rest House, Irinjalakuda.</h2>
            <p>{businessFacts.address.full}.</p>
            <div className="aa-v10-address-lines">
              <div><MapPin size={16} /><span><small>LANDMARK</small><b>Near Government Rest House</b></span></div>
              <div><Phone size={16} /><span><small>PRIMARY PHONE</small><b>{businessFacts.phones.primaryDisplay}</b></span></div>
              <div><Clock3 size={16} /><span><small>OPENING HOURS</small><b>Call to confirm before travelling</b></span></div>
            </div>
            <Directions />
          </div>
        </div>
      </section>

      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <WhatsAppLeadForm mode="service" />
        </div>
      </section>
    </Frame>
  );
}

function FAQ() {
  const qs = [
    ["What services are available?", "Asian Automobiles covers multi-brand vehicle maintenance, mechanical repair, wheel alignment and balancing, tyre and wheel care, car AC enquiries, body / accident repair enquiries and automobile spare parts."],
    ["I do not know what is wrong with my car. Can I still contact you?", "Yes. Tell the workshop the vehicle model and describe the noise, vibration, warning sign, cooling issue or change in behaviour in your own words."],
    ["Do you service every car brand?", "The business is positioned as an independent multi-brand workshop. For a specific make, model or job, contact the workshop first so current service availability can be confirmed."],
    ["Can I send accident or body-damage photos?", "Yes. WhatsApp is the easiest route for a photo-led body or accident enquiry. Send the vehicle details, a short description and clear photos."],
    ["Do you provide insurance assistance?", "Accident-repair and insurance-assistance enquiries are supported as a case-by-case route. Current insurer participation, eligibility and approval steps should be confirmed with the workshop."],
    ["How do I check a spare part?", "Send the vehicle manufacturer, model, variant, model year and the required part. A photo or part number is useful when available."],
    ["What are the opening hours?", "The supplied sources contain conflicting hours. Please call the workshop before travelling until the business confirms the final published schedule."],
    ["Where is Asian Automobiles?", "Kattoor Road, near Government Rest House, Irinjalakuda, Thrissur, Kerala - 680121."],
  ];

  return (
    <Frame
      eyebrow="FAQ / quick answers"
      title="The questions people ask before they drive over."
      intro="Short answers, clear next steps and no made-up workshop promises."
      actions={<><WhatsAppAction label="Ask a question" /><Call /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap aa-v10-faq-layout">
          <div className="aa-v10-faq-aside">
            <CircleHelp size={28} />
            <span>NO GUESSWORK</span>
            <h2>Can’t find your question?</h2>
            <p>Send the vehicle and the question directly. That is usually faster than searching through more copy.</p>
            <WhatsAppAction label="Ask on WhatsApp" />
          </div>
          <MotionFaq items={qs.map(([question, answer]) => ({ question, answer }))} />
        </div>
      </section>
    </Frame>
  );
}

function Booking({ quote = false }: { quote?: boolean }) {
  const title = quote ? "Tell us what needs attention." : "Tell us the basics. We’ll take it from there.";
  const intro = quote
    ? "A simple repair or parts quote starts with the vehicle, the requirement and a short description."
    : "Keep the useful details in one place, then continue the conversation on WhatsApp.";

  return (
    <Frame
      eyebrow={quote ? "Request a quote" : "Book a service"}
      title={title}
      intro={intro}
      actions={<><Call /><WhatsAppAction label={quote ? "Start on WhatsApp" : "WhatsApp booking"} /></>}
    >
      <section className="aa-v10-section aa-v10-paper">
        <div className="wrap">
          <WhatsAppLeadForm mode={quote ? "quote" : "service"} />
        </div>
      </section>

      <section className="aa-v10-section aa-v10-soft">
        <div className="wrap aa-v10-booking-help">
          <SectionHead eyebrow="WHAT HAPPENS NEXT" title="No account. No long booking maze." />
          <div className="aa-v10-booking-steps">
            <div><span>01</span><b>Fill the basics</b><p>Vehicle + requirement + contact details.</p></div>
            <div><span>02</span><b>Continue on WhatsApp</b><p>The prepared message opens with your details.</p></div>
            <div><span>03</span><b>Confirm with the workshop</b><p>Timing, service scope or parts availability can be agreed directly.</p></div>
          </div>
        </div>
      </section>
    </Frame>
  );
}

const routeMeta: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Asian Automobiles Irinjalakuda | Established 1996",
    description: "Learn about Asian Automobiles, a multi-brand automotive service, wheel-care and spare-parts business in Irinjalakuda.",
  },
  services: {
    title: "Car Service & Repairs in Irinjalakuda | Asian Automobiles",
    description: "Explore multi-brand car servicing, mechanical repair, wheel alignment, balancing, AC service and spare-parts support in Irinjalakuda.",
  },
  "services/car-service": {
    title: "General Car Service & Repair | Asian Automobiles Irinjalakuda",
    description: "Routine vehicle maintenance and common mechanical repair enquiries in Irinjalakuda, Kerala.",
  },
  "services/car-ac-repair": {
    title: "Car AC Service & Repair | Asian Automobiles Irinjalakuda",
    description: "Car AC cooling, airflow and repair enquiries in Irinjalakuda, Kerala.",
  },
  "services/accident-repair": {
    title: "Accident Repair in Irinjalakuda | Asian Automobiles",
    description: "Start an accident, body-repair or damage-photo enquiry with Asian Automobiles in Irinjalakuda.",
  },
  "services/denting-painting": {
    title: "Car Denting & Painting | Asian Automobiles Irinjalakuda",
    description: "Start a photo-led denting, painting and body-repair enquiry in Irinjalakuda.",
  },
  "services/wheel-alignment": {
    title: "Wheel Alignment & Balancing | Asian Automobiles Irinjalakuda",
    description: "Computerized wheel alignment, wheel balancing and wheel-care enquiries in Irinjalakuda.",
  },
  "services/tyre-services": {
    title: "Tyre & Wheel Care | Asian Automobiles Irinjalakuda",
    description: "Tyre-condition, balancing, rim and related wheel-care enquiries in Irinjalakuda.",
  },
  "spare-parts": {
    title: "Automobile Spare Parts in Irinjalakuda | Asian Automobiles",
    description: "Check automobile spare-parts availability for maintenance, braking, suspension, electrical and service components.",
  },
  insurance: {
    title: "Accident Repair & Insurance Assistance | Asian Automobiles",
    description: "Start an accident-repair and case-specific insurance-assistance enquiry with Asian Automobiles in Irinjalakuda.",
  },
  facilities: {
    title: "Automotive Workshop Facilities | Asian Automobiles Irinjalakuda",
    description: "Explore the workshop, wheel-care and service areas at Asian Automobiles on Kattoor Road, Irinjalakuda.",
  },
  gallery: {
    title: "Asian Automobiles Workshop Gallery | Irinjalakuda",
    description: "Explore the visual structure for workshop, wheel-care, repairs, parts and service photography.",
  },
  reviews: {
    title: "Asian Automobiles Reviews | Car Service in Irinjalakuda",
    description: "Customer feedback at Asian Automobiles is presented only from genuine, attributable review sources.",
  },
  contact: {
    title: "Contact Asian Automobiles Irinjalakuda | Car Service & Spare Parts",
    description: "Call, WhatsApp or get directions to Asian Automobiles on Kattoor Road, Irinjalakuda.",
  },
  faq: {
    title: "FAQ | Asian Automobiles Irinjalakuda",
    description: "Answers about services, accident repair, insurance assistance, parts, booking and workshop contact.",
  },
  "book-service": {
    title: "Book a Service | Asian Automobiles Irinjalakuda",
    description: "Prepare a simple service request and continue directly with Asian Automobiles on WhatsApp.",
  },
  "request-quote": {
    title: "Request a Repair or Parts Quote | Asian Automobiles",
    description: "Prepare a repair or parts quote request and continue directly with Asian Automobiles on WhatsApp.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const rawKey = slug.join("/");
  const key =
    rawKey.startsWith("services/") || rawKey === "services"
      ? rawKey
      : rawKey === "car-service" ||
          rawKey === "car-ac-repair" ||
          rawKey === "accident-repair" ||
          rawKey === "denting-painting" ||
          rawKey === "wheel-alignment" ||
          rawKey === "tyre-services"
        ? "services/" + rawKey
        : rawKey;
  const meta = routeMeta[key];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/" + key + "/" },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const key = slug.join("/");
  const map: Record<string, () => ReactNode> = {
    about: About,
    services: Services,
    "car-service": CarService,
    "services/car-service": CarService,
    "car-ac-repair": AC,
    "services/car-ac-repair": AC,
    "accident-repair": Accident,
    "services/accident-repair": Accident,
    "denting-painting": Denting,
    "services/denting-painting": Denting,
    "wheel-alignment": Wheel,
    "services/wheel-alignment": Wheel,
    "tyre-services": Tyres,
    "services/tyre-services": Tyres,
    "spare-parts": Parts,
    "services/spare-parts": Parts,
    insurance: Insurance,
    facilities: Facilities,
    gallery: Gallery,
    reviews: Reviews,
    contact: Contact,
    faq: FAQ,
    "book-service": () => <Booking />,
    "request-quote": () => <Booking quote />,
  };

  const PageView = map[key];

  if (!PageView) {
    return (
      <main className="creative-404">
        <div>
          <span>404 / WRONG TURN</span>
          <h1>Looks like we took the scenic route.</h1>
          <p>This page is not in the workshop.</p>
          <CTA label="Back to the workshop" href="/" />
        </div>
      </main>
    );
  }

  return PageView();
}
