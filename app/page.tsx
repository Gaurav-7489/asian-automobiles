import Image from "next/image";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business, confirmedOnly, claim, hoursText, serviceArea } from "@/content/business";
import { images } from "@/content/images";
import { homeFaqs, seo } from "@/content/pages";
import { partsCard, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { displayPhone, hasWhatsapp, mapsHref, telHref, waHref } from "@/lib/links";
import { ButtonLink, CallButton, DirectionsLink, WhatsappButton } from "@/components/ui/button";
import { ContactCard } from "@/components/ui/contact-card";
import { ServiceCard, type CardData } from "@/components/ui/service-card";
import { Icon } from "@/components/ui/icon";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SectionHeader } from "@/components/sections/section-header";
import { LocationSection } from "@/components/sections/location-section";
import { ImageGallery } from "@/components/sections/image-gallery";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({ ...seo.home, path: "/" });

export default function Home() {
  const year = confirmedOnly(business.establishedYear);
  const hours = hoursText();
  const cards: CardData[] = [
    ...services.map((s) => ({ slug: s.slug, name: s.name, text: s.cardText, href: `/services/${s.slug}`, icon: s.icon, image: s.hero.image })),
    { slug: partsCard.slug, name: partsCard.name, text: partsCard.cardText, href: "/spare-parts", icon: partsCard.icon, image: partsCard.image, linkLabel: partsCard.linkLabel },
  ];
  const reasons = [
    { icon: "car" as const, title: "Many makes, one workshop", text: "Servicing, repairs, AC, alignment and tyre work for passenger cars of many brands. Call with your model and we’ll confirm." },
    { icon: "badge-check" as const, title: "Talk to the workshop directly", text: "Call before you visit, describe the problem and get practical advice on the next step." },
    ...(claim("inspectAndExplain") ? [{ icon: "shield" as const, title: "We explain before we work", text: "We inspect your car and talk you through what we find before any work begins." }] : []),
    { icon: "route" as const, title: "Easy to find in Irinjalakuda", text: "On Kattoor Road, near the Government Rest House and Canara Bank." },
    ...(year ? [{ icon: "timer" as const, title: `Established in ${year}`, text: "A long-standing local workshop." }] : []),
  ];

  return (
    <>
      {/* F2 Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-graphite-900 text-white lg:-mt-[72px] lg:flex lg:min-h-[560px] lg:items-center" style={{ maxHeight: "none" }}>
        <Image src={images.homeHero.src} alt={images.homeHero.alt} fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-graphite-900/80 lg:bg-gradient-to-r lg:from-graphite-900/90 lg:via-graphite-900/65 lg:to-graphite-900/20" />
        <div className="container-x py-16 lg:h-[88vh] lg:max-h-[860px] lg:py-0 lg:pt-[72px] lg:flex lg:items-center">
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">Multi-brand car service centre in Irinjalakuda</p>
            <h1 className="h-display">Reliable care for every journey.</h1>
            <p className="lead mt-6 text-white/80">
              Servicing, repairs, AC, wheel alignment, tyre care and spare parts for cars of many makes — from our workshop on Kattoor Road, Irinjalakuda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton position="hero" />
              <ButtonLink href="/services" variant="secondary" size="lg">Explore Our Services</ButtonLink>
            </div>
            <p className="mt-6 text-sm text-grey-400">
              {hours ? `Open ${hours} · ` : ""}Kattoor Road, near Government Rest House
            </p>
          </div>
        </div>
      </section>

      {/* F3 Quick contact strip */}
      <section className="on-dark border-t border-charcoal-800 bg-graphite-900 py-6 text-white lg:py-8" aria-labelledby="strip-heading">
        <h2 id="strip-heading" className="sr-only">Contact the workshop</h2>
        <div className={`container-x grid gap-3 ${hasWhatsapp() ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          <ContactCard dark icon={<Phone className="size-6" strokeWidth={1.5} />} title="Call us" value={displayPhone()} helper="Speak directly to the workshop." href={telHref()} action="Call now →" channel="phone" position="home_strip" />
          <ContactCard dark icon={<MessageCircle className="size-6" strokeWidth={1.5} />} title="WhatsApp" helper="Send a message or a photo of the problem." href={waHref("general")} action="Open WhatsApp →" channel="whatsapp" position="home_strip" external />
          <ContactCard dark icon={<MapPin className="size-6" strokeWidth={1.5} />} title="Visit" value="Kattoor Road, Irinjalakuda" helper="Near Government Rest House / Canara Bank." href={mapsHref()} action="Get directions →" channel="maps" position="home_strip" external />
        </div>
      </section>

      {/* F5 Business introduction */}
      <section className="section" aria-labelledby="intro-heading">
        <div className="container-x *:max-w-[880px]">
          <p className="eyebrow mb-3">About the workshop</p>
          <h2 id="intro-heading" className="h2">An independent service centre for cars of every make</h2>
          <div className="lead muted mt-6 space-y-4">
            <p>Asian Automobiles is an independent, multi-brand car service centre on Kattoor Road in Irinjalakuda. We look after the routine servicing, repairs and maintenance that keep everyday cars running well, and we help customers find the spare parts they need.</p>
            <p>We are not a dealership and we don’t sell cars. Our work is looking after the car you already drive — with clear advice, careful work and a workshop you can reach by phone.</p>
            {year && <p>Serving vehicle owners in Irinjalakuda since {year}.</p>}
          </div>
          <div className="mt-6"><ButtonLink href="/about" variant="text">More about us</ButtonLink></div>
        </div>
      </section>

      {/* F4 Secondary WhatsApp / call band */}
      <section className="bg-warm-50 py-8" aria-label="Not sure what your car needs?">
        <div className="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[640px] font-medium">
            {hasWhatsapp()
              ? "Not sure what your car needs? Send us a WhatsApp message with your car’s make, model and the problem you’re noticing."
              : "Not sure what your car needs? Call us and describe the problem."}
          </p>
          {hasWhatsapp() ? <WhatsappButton label="Message on WhatsApp" position="home_band" size="md" /> : <CallButton label="Call the Workshop" position="home_band" size="md" />}
        </div>
      </section>

      {/* F6 + F7 Services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-x">
          <SectionHeader
            id="services-heading"
            eyebrow="What we do"
            title="Everything your car needs, from one workshop"
            intro="From a routine oil change to a brake problem or an AC that has stopped cooling, bring your car to one place and speak to people who work on cars of many makes every day."
          />
          <ul className={`grid gap-4 sm:grid-cols-2 lg:gap-6 ${cards.length > 6 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {cards.map((c) => <li key={c.slug}><ServiceCard card={c} /></li>)}
          </ul>
          <div className="mt-10"><ButtonLink href="/services" variant="secondary">See all services</ButtonLink></div>
        </div>
      </section>

      {/* F8 Why choose */}
      <section className="on-dark section bg-graphite-900 text-white" aria-labelledby="why-heading">
        <div className="container-x">
          <SectionHeader id="why-heading" eyebrow="Why Asian Automobiles" title="Straightforward car care, close to home" />
          <ul className={`grid gap-8 sm:grid-cols-2 ${reasons.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {reasons.map((r) => (
              <li key={r.title} className="border-t border-charcoal-800 pt-6">
                <Icon name={r.icon} className="size-7 text-amber-500" />
                <h3 className="h3 mt-4">{r.title}</h3>
                <p className="mt-2 text-[15px] text-grey-400">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* F9 Workshop – genuine photos only */}
      <ImageGallery title="Inside our workshop" intro="A working service centre on Kattoor Road, set up for everyday servicing, mechanical repairs and wheel and tyre work. Take a look around before you visit." />

      {/* F10 Spare parts */}
      <section className="section-tight bg-warm-50" aria-labelledby="parts-heading">
        <div className="container-x grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image src={images.parts.src} alt={images.parts.alt} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow mb-3">Spare parts</p>
            <h2 id="parts-heading" className="h2">Looking for a part for your car?</h2>
            <p className="lead muted mt-4">Tell us your car’s make, model and year and the part you need. We’ll check options in genuine (OEM) and aftermarket parts and let you know about availability.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/spare-parts" size="lg">Send a parts enquiry</ButtonLink>
              <WhatsappButton label="Ask on WhatsApp" messageKey="parts" position="home_parts" />
            </div>
          </div>
        </div>
      </section>

      {/* F11 Service area */}
      <section className="section-tight" aria-labelledby="area-heading">
        <div className="container-x max-w-[880px] text-center">
          <h2 id="area-heading" className="h2">Serving Irinjalakuda and nearby areas</h2>
          <p className="lead muted mt-5">
            Our workshop is in Irinjalakuda town, and we welcome car owners from {serviceArea.slice(0, -1).join(", ")} and {serviceArea.at(-1)}, and across the Mukundapuram area.
          </p>
          <div className="mt-6"><DirectionsLink position="home_area" /></div>
        </div>
      </section>

      {/* F12 Location */}
      <div className="border-t border-line-200"><LocationSection /></div>

      {/* F13 FAQ */}
      <section className="section-tight bg-warm-50" aria-labelledby="faq-heading">
        <div className="container-x *:max-w-[800px]">
          <h2 id="faq-heading" className="h2 mb-8">Common questions</h2>
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>

      {/* F14 Final CTA */}
      <CtaBand heading="Need help with your car?" text="Call the workshop and tell us what’s happening. We’ll help you decide the next step." directions showNumber />
    </>
  );
}
