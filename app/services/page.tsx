import Image from "next/image";
import { Package } from "lucide-react";
import { partsCard, services } from "@/content/services";
import { seo } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/ui/service-card";
import { ButtonLink, CallButton, WhatsappButton } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({ ...seo.services, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Our car services"
        sub="Servicing, repairs and maintenance for passenger cars of many makes, at our workshop in Irinjalakuda."
        actions={[<CallButton key="c" position="hero" />, <WhatsappButton key="w" label="Ask on WhatsApp" position="hero" />]}
      />

      <section className="section-tight">
        <div className="container-x">
          <p className="lead muted max-w-[720px]">
            Whether your car is due for a routine service or showing a problem you can’t explain, start here. Choose a service below, or call us and describe what you’re noticing — we’ll point you in the right direction.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard anchor card={{ slug: s.slug, name: s.name, text: s.cardText, href: `/services/${s.slug}`, icon: s.icon }} />
              </li>
            ))}
            <li>
              <ServiceCard card={{ slug: partsCard.slug, name: partsCard.name, text: partsCard.cardText, href: "/spare-parts", icon: partsCard.icon, linkLabel: partsCard.linkLabel }} />
            </li>
          </ul>
        </div>
      </section>

      {/* Service summaries – alternating rows */}
      <div className="border-t border-line-200">
        {services.map((s, i) => (
          <section key={s.slug} className="section-tight border-b border-line-200" aria-labelledby={s.slug}>
            <div className="container-x grid items-center gap-8 md:grid-cols-2 lg:gap-16">
              <div className={`relative aspect-video overflow-hidden rounded-md bg-warm-50 ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={s.hero.image.src} alt={s.hero.image.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <h2 id={s.slug} tabIndex={-1} className="h2 outline-none">{s.name}</h2>
                <p className="muted mt-4">{s.summary}</p>
                <p className="mt-6 text-sm font-semibold">Typical work includes</p>
                <p className="muted mt-1 text-[15px]">{s.typicalWork.join(" · ")}</p>
                <div className="mt-6"><ButtonLink href={`/services/${s.slug}`} variant="text">{`${s.name} details`}</ButtonLink></div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section-tight">
        <div className="container-x">
          <div className="flex flex-col gap-6 rounded-md bg-warm-50 p-6 sm:flex-row sm:items-center lg:p-10">
            <Package className="size-9 shrink-0 text-amber-700" strokeWidth={1.5} aria-hidden="true" />
            <div className="flex-1">
              <h2 className="h3">Need a spare part?</h2>
              <p className="muted mt-2">We also help customers find spare parts — genuine (OEM) and aftermarket — for their cars. Tell us the make, model, year and part, and we’ll check what’s available.</p>
            </div>
            <ButtonLink href="/spare-parts">Send a parts enquiry</ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand heading="Not sure which service you need?" text="Describe the problem on the phone or on WhatsApp. We’ll tell you what to do next and whether you should bring the car in." />
    </>
  );
}
