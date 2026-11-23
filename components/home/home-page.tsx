import Image from "next/image";
import Link from "next/link";
import { Navigation, Phone } from "lucide-react";
import { HomeHero } from "@/components/home/hero";
import { ServiceIndex, type IndexService } from "@/components/home/service-index";
import { FaqSection, PageCTA, SectionHead, SpecList, Steps, type QA } from "@/components/inner/sections";
import { ActionLink, CallButton, DirectionsButton, WhatsAppButton } from "@/components/ui/action-link";
import { businessFacts, directionsHref, landlineTel, phoneTel, whatsappLink } from "@/lib/business-facts";
import { serviceCatalog, serviceImage } from "@/lib/service-catalog";

const explain = businessFacts.processConfirmed;
const wa = whatsappLink("Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …");

const services: IndexService[] = serviceCatalog.map((service) => ({
  id: service.id,
  title: service.title,
  meta: service.meta,
  description: service.description,
  href: service.href,
  image: serviceImage(service),
}));

const reasons: [string, string][] = [
  ["Many makes, one workshop", "Servicing, repairs, AC, alignment and tyre work for passenger cars of many brands. Call with your model and we’ll confirm."],
  ["Talk to the workshop directly", "Call before you visit, describe the problem and get practical advice on the next step."],
  ...(explain ? [["We explain before we work", "We inspect your car and talk you through what we find before any work begins."] as [string, string]] : []),
  ["Easy to find in Irinjalakuda", "On Kattoor Road, near the Government Rest House and Canara Bank."],
];

const steps = [
  { title: "Call and describe it", text: "Tell us the make, model and what you’ve noticed. We’ll suggest a time to bring the car in." },
  { title: "Bring the car in", text: "Mention anything you’ve noticed, however small. It helps us find the real cause." },
  ...(explain ? [{ title: "Inspect and explain", text: "We check the car and explain what needs attention now and what can wait." }] : []),
  { title: "Repair and return", text: "We carry out the agreed work and hand the car back with a clear explanation." },
];

const faqs: QA[] = [
  ["Which car brands do you work on?", "We service and repair passenger cars of many makes. Call us with your car’s make, model and year and we’ll confirm we can help."],
  ["Are you a dealership or an authorised brand service centre?", "No. Asian Automobiles is an independent multi-brand service centre. We don’t sell new or used cars; we look after the car you already own."],
  ["Do I need to call before I visit?", "We recommend it. A quick call lets us understand the problem and plan time for your car, so your visit is not wasted."],
  ["How much will my service or repair cost?", "It depends on your car, its condition and the parts needed. Call us with your vehicle details to discuss your requirements."],
  ["Can you help me find a spare part?", "Yes. Send a parts enquiry with your car details and the part you need, and we’ll check the options available."],
  ["What are your working hours?", `We are open ${businessFacts.hours}${businessFacts.sundayClosed ? " and closed on Sundays" : ""}. Please call ahead on public holidays.`],
];

const area = businessFacts.serviceArea;

export function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="aa-home">
      <HomeHero />

      {/* F3: the service desk. What a visitor needs before anything else. */}
      <section className="aa-desk surface-dark-2" aria-labelledby="desk-heading">
        <h2 id="desk-heading" className="aa-sr-only">Contact the workshop</h2>
        <dl className="wrap aa-desk__grid">
          <div>
            <dt className="aa-label">Open</dt>
            <dd>{businessFacts.hours}{businessFacts.sundayClosed ? ". Sundays closed." : "."}</dd>
          </div>
          <div>
            <dt className="aa-label">Mobile</dt>
            <dd><a href={phoneTel}>{businessFacts.phones.primaryDisplay}</a></dd>
          </div>
          <div>
            <dt className="aa-label">Landline</dt>
            <dd><a href={landlineTel}>{businessFacts.phones.landlineDisplay}</a></dd>
          </div>
          <div>
            <dt className="aa-label">Find us</dt>
            <dd><a href={directionsHref} target="_blank" rel="noopener noreferrer">V/526, Kattoor Rd <Navigation size={14} aria-hidden="true" /></a></dd>
          </div>
        </dl>
      </section>

      {/* Workshop introduction */}
      <section id="workshop" className="section surface-canvas aa-intro" aria-labelledby="intro-heading">
        <div className="wrap aa-intro__grid">
          <div className="aa-intro__copy">
            <h2 id="intro-heading">We don’t sell cars. We look after the one you already drive.</h2>
            <p className="aa-lead">
              Asian Automobiles is an independent service centre for the routine servicing, repairs and maintenance
              that keep everyday cars running well, and for help finding the spare parts they need.
            </p>
            <dl className="aa-intro__facts">
              <div><dt>Independent</dt><dd>Not a dealership or a brand’s authorised service centre.</dd></div>
              <div><dt>Multi-brand</dt><dd>Passenger cars of many makes.</dd></div>
              <div><dt>Local</dt><dd>Kattoor Road, near the Government Rest House.</dd></div>
            </dl>
            <div className="aa-intro__links">
              <Link href="/about/" className="aa-link">More about us</Link>
              <Link href="/spare-parts/" className="aa-link">Looking for a part?</Link>
            </div>
          </div>
          <figure className="aa-intro__figure aa-reveal">
            <Image src="/images/photos/mechanic-inspection.jpg" alt="" fill quality={74} sizes="(max-width: 899px) 100vw, 40vw" />
          </figure>
        </div>
      </section>

      {/* Services index */}
      <section id="services" className="section surface-dark aa-services" aria-labelledby="services-heading">
        <div className="wrap">
          <div className="aa-services__head">
            <h2 id="services-heading">Everything your car needs, from one workshop.</h2>
            <Link href="/services/" className="aa-link">All {services.length} services</Link>
          </div>
          <ServiceIndex services={services} />
          <div className="aa-services__help">
            <p>Not sure what your car needs? Call us and describe the problem.</p>
            {wa
              ? <WhatsAppButton label="Message on WhatsApp" tone="light" />
              : <CallButton label="Call the workshop" tone="light" />}
          </div>
        </div>
      </section>

      {/* Why: a full-bleed detail photograph with the reasons laid over its lower edge */}
      <section className="aa-why" aria-labelledby="why-heading">
        <div className="aa-why__photo aa-reveal">
          <Image src="/images/photos/engine-detail.jpg" alt="" fill quality={74} sizes="100vw" />
        </div>
        <div className="wrap">
          <div className="aa-why__panel">
            <h2 id="why-heading">Straightforward car care, close to home.</h2>
            <SpecList items={reasons} className="aa-spec--grid" />
          </div>
        </div>
      </section>

      {/* Enquiry process: a real sequence */}
      <section className="section surface-canvas aa-process" aria-labelledby="process-heading">
        <div className="wrap">
          <SectionHead
            id="process-heading"
            title="From the first call to handover."
            copy="An enquiry is the start of a conversation, not a confirmed booking. We agree a time with you on the phone."
          />
          <Steps items={steps} />
        </div>
      </section>

      {/* F10: spare parts */}
      <section className="section surface-alt aa-parts" aria-labelledby="parts-heading">
        <div className="wrap aa-parts__grid">
          <div>
            <h2 id="parts-heading">Looking for a part for your car?</h2>
            <p className="aa-lead">
              Tell us your car’s make, model and year and the part you need. We’ll check genuine (OEM) and
              aftermarket options and let you know about availability.
            </p>
            <div className="aa-actions">
              <ActionLink href="/spare-parts/" tone="dark">Send a parts enquiry</ActionLink>
              {wa && <WhatsAppButton label="Ask on WhatsApp" message="Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo." />}
            </div>
          </div>
          <div className="aa-jobcard">
            <h3 className="aa-jobcard__title">What to tell us</h3>
            <SpecList
              items={[
                ["Make and model", "Plus the variant: petrol or diesel, manual or automatic."],
                ["Year", "Shown on your registration certificate (RC)."],
                ["The part", "Its name, or the part number printed on the old part."],
                ["A photo", "Especially useful for clips, hoses, brackets and sensors."],
              ]}
            />
          </div>
        </div>
      </section>

      {/* F11 + location */}
      <section className="section surface-dark aa-visit" aria-labelledby="visit-heading">
        <div className="wrap aa-visit__grid">
          <div className="aa-visit__main">
            <h2 id="visit-heading">Kattoor Road, Irinjalakuda.</h2>
            <address className="aa-lead">Asian Automobiles, {businessFacts.address.full}.</address>
            <dl className="aa-visit__facts">
              <div><dt className="aa-label">Landmark</dt><dd>{businessFacts.address.landmark}</dd></div>
              <div><dt className="aa-label">Hours</dt><dd>{businessFacts.hours}{businessFacts.sundayClosed ? ". Closed on Sundays." : "."} A quick call before you visit helps us plan time for your car.</dd></div>
              <div><dt className="aa-label">Phone</dt><dd><a href={phoneTel}>{businessFacts.phones.primaryDisplay}</a> or <a href={landlineTel}>{businessFacts.phones.landlineDisplay}</a></dd></div>
            </dl>
            <div className="aa-actions">
              <DirectionsButton tone="light" />
              <ActionLink href={phoneTel} tone="ghost" icon={<Phone size={16} aria-hidden="true" />}>Call the workshop</ActionLink>
            </div>
            <Link href="/contact/" className="aa-link aa-visit__more">Contact the workshop</Link>
          </div>
          <div className="aa-visit__area">
            <h3>Serving Irinjalakuda and nearby areas</h3>
            <p>We welcome car owners from across the Mukundapuram area, including:</p>
            <ul className="aa-area">
              {area.map((place) => <li key={place}>{place}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection headingId="home-faq-heading" title="Common questions" items={faqs} />

      <PageCTA
        headingId="final-cta-heading"
        title="Need help with your car?"
        copy="Call the workshop and tell us what’s happening. We’ll help you decide the next step."
      >
        <CallButton label={"Call " + businessFacts.phones.primaryDisplay} />
        {wa && <WhatsAppButton label="WhatsApp us" />}
        <DirectionsButton />
      </PageCTA>
    </main>
  );
}
