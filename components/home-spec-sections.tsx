import Image from "next/image";
import { ArrowUpRight, CarFront, Clock3, MapPin, MessageCircle, PackageSearch, Phone, ShieldCheck } from "lucide-react";
import { businessFacts, directionsHref, phoneTel, whatsappEnabled, whatsappLink } from "@/lib/business-facts";
import { ActionLink, DirectionsButton } from "@/components/ui/action-link";
import { FaqSection, PageCTA, SectionHead, type QA } from "@/components/inner/sections";

/**
 * Homepage sections from the specification (ch. 7, F3–F14), built from the template's
 * own inner-page blocks (aa-v10-*) so they share its layout, type and motion.
 */

const wa = whatsappLink("Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …");
const waParts = whatsappLink("Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo.");

/** F3 – quick contact strip directly under the hero. */
export function HomeContactStrip() {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      <section className="aa-v10-section aa-v10-dark aa-home-strip" aria-labelledby="home-strip-heading">
        <div className="wrap">
          <h2 id="home-strip-heading" className="aa-sr-only">Contact the workshop</h2>
          <div className="aa-v10-contact-actions">
            <a href={phoneTel}><Phone size={21} /><span>CALL US · SPEAK DIRECTLY TO THE WORKSHOP</span><b>{businessFacts.phones.primaryDisplay}</b><ArrowUpRight size={18} /></a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={21} /><span>WHATSAPP · SEND A PHOTO OF THE PROBLEM</span><b>Message us</b><ArrowUpRight size={18} /></a>
            )}
            <a href={directionsHref} target="_blank" rel="noopener noreferrer"><MapPin size={21} /><span>VISIT · GET DIRECTIONS</span><b>V/526, Kattoor Rd, Irinjalakuda</b><ArrowUpRight size={18} /></a>
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
          {wa
            ? <ActionLink href={wa} external tone="dark" icon={<MessageCircle size={15} />}>Message on WhatsApp</ActionLink>
            : <ActionLink href={phoneTel} icon={<Phone size={15} />}>Call the workshop</ActionLink>}
        </div>
      </section>
    </div>
  );
}

const explain = businessFacts.processConfirmed;

const reasons = [
  { icon: <CarFront size={19} />, eyebrow: "MULTI-BRAND", title: "Many makes, one workshop", copy: "Servicing, repairs, AC, alignment and tyre work for passenger cars of many brands. Call with your model and we’ll confirm." },
  { icon: <Phone size={19} />, eyebrow: "DIRECT", title: "Talk to the workshop directly", copy: "Call before you visit, describe the problem and get practical advice on the next step." },
  ...(explain ? [{ icon: <ShieldCheck size={19} />, eyebrow: "CLEAR", title: "We explain before we work", copy: "We inspect your car and talk you through what we find before any work begins." }] : []),
  { icon: <MapPin size={19} />, eyebrow: "LOCAL", title: "Easy to find in Irinjalakuda", copy: "On Kattoor Road, near the Government Rest House and Canara Bank." },
  ...(businessFacts.establishedConfirmed ? [{ icon: <Clock3 size={19} />, eyebrow: "ESTABLISHED", title: `Established in ${businessFacts.establishedYear}`, copy: "A long-standing local workshop." }] : []),
];

const faqs: QA[] = [
  ["Which car brands do you work on?", "We service and repair passenger cars of many makes. Call us with your car’s make, model and year and we’ll confirm we can help."],
  ["Are you a dealership or an authorised brand service centre?", "No. Asian Automobiles is an independent multi-brand service centre. We don’t sell new or used cars; we look after the car you already own."],
  ["Do I need to call before I visit?", "We recommend it. A quick call lets us understand the problem and plan time for your car, so your visit is not wasted."],
  ["How much will my service or repair cost?", "It depends on your car, its condition and the parts needed. Call us with your vehicle details to discuss your requirements."],
  ["Can you help me find a spare part?", "Yes. Send a parts enquiry with your car details and the part you need, and we’ll check the options available."],
  ["What are your working hours?", `We are open ${businessFacts.hours}${businessFacts.sundayClosed ? " and closed on Sundays" : ""}. Please call ahead on public holidays.`],
];

/** F8 – why choose, F10 – spare parts, F11 – service area. */
export function HomeMiddleSections() {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      {/* F8 Why choose */}
      <section className="aa-v10-section aa-v10-dark" aria-labelledby="why-heading">
        <div className="wrap">
          <SectionHead light id="why-heading" eyebrow="WHY ASIAN AUTOMOBILES" title="Straightforward car care, close to home." />
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
            <Image src="/images/photos/spare-parts.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 54vw" />
          </div>
          <div className="aa-v10-photo-copy">
            <span className="eyebrow">SPARE PARTS</span>
            <h2 id="parts-heading">Looking for a part for your car?</h2>
            <p>Tell us your car’s make, model and year and the part you need. We’ll check options in genuine (OEM) and aftermarket parts and let you know about availability.</p>
            <div className="aa-v10-inline-actions">
              <ActionLink href="/spare-parts/" icon={<PackageSearch size={15} />}>Send a parts enquiry</ActionLink>
              {waParts && <ActionLink href={waParts} external tone="ghost" icon={<MessageCircle size={15} />}>Ask on WhatsApp</ActionLink>}
            </div>
          </div>
        </div>
      </section>

      {/* F11 Service area */}
      <section className="aa-v10-section aa-v10-paper aa-home-area" aria-labelledby="area-heading">
        <div className="wrap aa-home-area-grid">
          <div className="aa-home-area-copy">
            <SectionHead
              id="area-heading"
              eyebrow="SERVICE AREA"
              title="Serving Irinjalakuda and nearby areas."
              copy={`Our workshop is in Irinjalakuda town, and we welcome car owners from ${businessFacts.serviceArea.slice(0, -1).join(", ")} and ${businessFacts.serviceArea.at(-1)}, and across the Mukundapuram area.`}
            />
            <div className="aa-v10-inline-actions">
              <DirectionsButton />
            </div>
          </div>
          {/* Temporary illustration — swap for a real map or workshop photo. */}
          <figure className="aa-home-area-visual">
            <Image src="/images/photos/service-area.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </figure>
        </div>
      </section>
    </div>
  );
}

/** F13 – FAQ, F14 – final CTA. */
export function HomeEndSections() {
  return (
    <div className="aa-inner-v10 aa-home-spec">
      <FaqSection surface="soft" headingId="home-faq-heading" title="Common questions" items={faqs} callTone="ghost" />
      <PageCTA
        headingId="final-cta-heading"
        eyebrow="NEED HELP?"
        title="Need help with your car?"
        copy="Call the workshop and tell us what’s happening. We’ll help you decide the next step."
      >
        <ActionLink href={phoneTel} icon={<Phone size={15} />}>{"Call " + businessFacts.phones.primaryDisplay}</ActionLink>
        {wa && <ActionLink href={wa} external tone="ghost" icon={<MessageCircle size={15} />}>WhatsApp us</ActionLink>}
        <DirectionsButton />
      </PageCTA>
    </div>
  );
}
