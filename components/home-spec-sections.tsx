import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight, CarFront, CircleHelp, Clock3, MapPin, MessageCircle, Navigation, PackageSearch, Phone, ShieldCheck,
} from "lucide-react";
import { businessFacts, directionsHref, whatsappEnabled, whatsappLink } from "@/lib/business-facts";
import { MotionFaq } from "@/components/immersive/inner-page-experiences";

/**
 * Homepage sections from the specification (ch. 7, F3–F14), built from the template's
 * own inner-page blocks (aa-v10-*) so they share its layout, type and motion.
 */

const phoneHref = "tel:" + businessFacts.phones.primaryHref;
const wa = whatsappLink("Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …");
const waParts = whatsappLink("Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo.");

function Btn({ href, children, tone = "primary", external, icon }: { href: string; children: React.ReactNode; tone?: "primary" | "dark" | "ghost"; external?: boolean; icon?: React.ReactNode }) {
  const cls = "aa-v10-button aa-v10-button-" + tone;
  const inner = <>{icon}<span>{children}</span>{!icon && <ArrowUpRight size={15} />}</>;
  return href.startsWith("/") ? (
    <Link prefetch={false} className={cls} href={href}>{inner}</Link>
  ) : (
    <a className={cls} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{inner}</a>
  );
}

/** F3 – quick contact strip directly under the hero. */
export function HomeContactStrip() {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      <section className="aa-v10-section aa-v10-dark aa-home-strip" aria-labelledby="home-strip-heading">
        <div className="wrap">
          <h2 id="home-strip-heading" className="aa-sr-only">Contact the workshop</h2>
          <div className="aa-v10-contact-actions">
            <a href={phoneHref}><Phone size={21} /><span>CALL US · SPEAK DIRECTLY TO THE WORKSHOP</span><b>{businessFacts.phones.primaryDisplay}</b><ArrowUpRight size={18} /></a>
            {whatsappEnabled && wa && (
              <a href={wa} target="_blank" rel="noreferrer"><MessageCircle size={21} /><span>WHATSAPP · SEND A PHOTO OF THE PROBLEM</span><b>Message us</b><ArrowUpRight size={18} /></a>
            )}
            <a href={directionsHref} target="_blank" rel="noreferrer"><MapPin size={21} /><span>VISIT · GET DIRECTIONS</span><b>V/526, Kattoor Rd, Irinjalakuda</b><ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

/** F4 – low-pressure help band between the introduction and the services. */
export function HomeHelpBand() {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      <section className="aa-v10-section aa-v10-soft aa-home-band">
        <div className="wrap aa-home-band-row">
          <p>
            {whatsappEnabled
              ? "Not sure what your car needs? Send us a WhatsApp message with your car’s make, model and the problem you’re noticing."
              : "Not sure what your car needs? Call us and describe the problem."}
          </p>
          {whatsappEnabled && wa
            ? <Btn href={wa} external tone="dark" icon={<MessageCircle size={15} />}>Message on WhatsApp</Btn>
            : <Btn href={phoneHref} icon={<Phone size={15} />}>Call the workshop</Btn>}
        </div>
      </section>
    </div>
  );
}

/** F8 – why choose, F10 – spare parts, F11 – service area, F13 – FAQ, F14 – final CTA. */
export function HomeSpecSections({ part }: { part: "middle" | "end" }) {
  const explain = businessFacts.processConfirmed;
  const reasons = [
    { icon: <CarFront size={19} />, eyebrow: "MULTI-BRAND", title: "Many makes, one workshop", copy: "Servicing, repairs, AC, alignment and tyre work for passenger cars of many brands. Call with your model and we’ll confirm." },
    { icon: <Phone size={19} />, eyebrow: "DIRECT", title: "Talk to the workshop directly", copy: "Call before you visit, describe the problem and get practical advice on the next step." },
    ...(explain ? [{ icon: <ShieldCheck size={19} />, eyebrow: "CLEAR", title: "We explain before we work", copy: "We inspect your car and talk you through what we find before any work begins." }] : []),
    { icon: <MapPin size={19} />, eyebrow: "LOCAL", title: "Easy to find in Irinjalakuda", copy: "On Kattoor Road, near the Government Rest House and Canara Bank." },
    ...(businessFacts.establishedConfirmed ? [{ icon: <Clock3 size={19} />, eyebrow: "ESTABLISHED", title: `Established in ${businessFacts.establishedYear}`, copy: "A long-standing local workshop." }] : []),
  ];
  const faqs: [string, string][] = [
    ["Which car brands do you work on?", "We service and repair passenger cars of many makes. Call us with your car’s make, model and year and we’ll confirm we can help."],
    ["Are you a dealership or an authorised brand service centre?", "No. Asian Automobiles is an independent multi-brand service centre. We don’t sell new or used cars; we look after the car you already own."],
    ["Do I need to call before I visit?", "We recommend it. A quick call lets us understand the problem and plan time for your car, so your visit is not wasted."],
    ["How much will my service or repair cost?", "It depends on your car, its condition and the parts needed. Call us with your vehicle details to discuss your requirements."],
    ["Can you help me find a spare part?", "Yes. Send a parts enquiry with your car details and the part you need, and we’ll check the options available."],
    ["What are your working hours?", `We are open ${businessFacts.hours}${businessFacts.sundayClosed ? " and closed on Sundays" : ""}. Please call ahead on public holidays.`],
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  if (part === "end") return <HomeSpecEnd faqs={faqs} faqLd={faqLd} />;
  return (
    <div className="aa-inner-v10 aa-home-spec">
      {/* F8 Why choose */}
      <section className="aa-v10-section aa-v10-dark" aria-labelledby="why-heading">
        <div className="wrap">
          <div className="aa-v10-section-head is-light">
            <span className="eyebrow">WHY ASIAN AUTOMOBILES</span>
            <h2 id="why-heading">Straightforward car care, close to home.</h2>
          </div>
          <div className="aa-v10-feature-grid aa-v10-feature-grid-dark">
            {reasons.map((r, i) => (
              <article key={r.title} className="aa-v10-feature-card">
                <div className="aa-v10-feature-meta"><span>{String(i + 1).padStart(2, "0")}</span><small>{r.eyebrow}</small>{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* F10 Spare parts */}
      <section className="aa-v10-section aa-v10-soft" aria-labelledby="parts-heading">
        <div className="wrap aa-v10-photo-split">
          <div className="aa-v10-photo-frame">
            <Image src="/images/placeholders/inspection.svg" alt="" fill sizes="(max-width: 900px) 100vw, 54vw" />
          </div>
          <div className="aa-v10-photo-copy">
            <span className="eyebrow">SPARE PARTS</span>
            <h2 id="parts-heading">Looking for a part for your car?</h2>
            <p>Tell us your car’s make, model and year and the part you need. We’ll check options in genuine (OEM) and aftermarket parts and let you know about availability.</p>
            <div className="aa-v10-inline-actions">
              <Btn href="/spare-parts/" icon={<PackageSearch size={15} />}>Send a parts enquiry</Btn>
              {whatsappEnabled && waParts && <Btn href={waParts} external tone="ghost" icon={<MessageCircle size={15} />}>Ask on WhatsApp</Btn>}
            </div>
          </div>
        </div>
      </section>

      {/* F11 Service area */}
      <section className="aa-v10-section aa-v10-paper aa-home-area" aria-labelledby="area-heading">
        <div className="wrap aa-home-area-grid">
          <div className="aa-home-area-copy">
            <div className="aa-v10-section-head">
              <span className="eyebrow">SERVICE AREA</span>
              <h2 id="area-heading">Serving Irinjalakuda and nearby areas.</h2>
              <p>
                Our workshop is in Irinjalakuda town, and we welcome car owners from {businessFacts.serviceArea.slice(0, -1).join(", ")} and {businessFacts.serviceArea.at(-1)}, and across the Mukundapuram area.
              </p>
            </div>
            <div className="aa-v10-inline-actions">
              <Btn href={directionsHref} external tone="ghost" icon={<Navigation size={15} />}>Get directions</Btn>
            </div>
          </div>
          {/* Temporary illustration — swap for a real map or workshop photo. */}
          <figure className="aa-home-area-visual">
            <Image src="/images/placeholders/service-area.svg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </figure>
        </div>
      </section>

    </div>
  );
}

function HomeSpecEnd({ faqs, faqLd }: { faqs: [string, string][]; faqLd: object }) {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      {/* F13 FAQ */}
      <section className="aa-v10-section aa-v10-soft" aria-labelledby="home-faq-heading">
        <div className="wrap aa-v10-faq-layout">
          <div className="aa-v10-faq-aside">
            <CircleHelp size={28} />
            <span>QUESTIONS</span>
            <h2 id="home-faq-heading">Common questions</h2>
            <p>Can’t see your question? Call the workshop with your car’s make, model and year.</p>
            <Btn href={phoneHref} tone="ghost" icon={<Phone size={15} />}>Call workshop</Btn>
          </div>
          <MotionFaq items={faqs.map(([question, answer]) => ({ question, answer }))} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </section>

      {/* F14 Final CTA */}
      <section className="aa-v10-section aa-v10-endcap" aria-labelledby="final-cta-heading">
        <div className="wrap aa-v10-endcap-grid">
          <div>
            <span className="eyebrow light">NEED HELP?</span>
            <h2 id="final-cta-heading">Need help with your car?</h2>
          </div>
          <div>
            <p>Call the workshop and tell us what’s happening. We’ll help you decide the next step.</p>
            <div className="aa-v10-inline-actions">
              <Btn href={phoneHref} icon={<Phone size={15} />}>{"Call " + businessFacts.phones.primaryDisplay}</Btn>
              {whatsappEnabled && wa && <Btn href={wa} external tone="ghost" icon={<MessageCircle size={15} />}>WhatsApp us</Btn>}
              <Btn href={directionsHref} external tone="ghost" icon={<Navigation size={15} />}>Get directions</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
