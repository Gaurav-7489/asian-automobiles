import { notFound } from "next/navigation";
import { getService, relatedFor, services } from "@/content/services";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { hasWhatsapp } from "@/lib/links";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceSection } from "@/components/sections/service-sections";
import { CtaBand } from "@/components/sections/cta-band";
import { RelatedServices } from "@/components/sections/related-services";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CallButton, WhatsappButton } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return s ? buildMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const waFirst = s.hero.whatsappFirst && hasWhatsapp();
  const call = <CallButton key="c" label={s.hero.primaryLabel} mobileLabel={s.hero.primaryLabelMobile} position="hero" variant={waFirst ? "secondary" : "primary"} />;
  const wa = <WhatsappButton key="w" label={s.hero.secondaryLabel} messageKey={s.hero.whatsappKey} position="hero" variant={waFirst ? "primary" : "secondary"} />;
  const sections = s.sections.filter((x) => x.when !== false);
  const callout = sections.find((x) => x.type === "callout" && x.variant === "caution");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]}
        eyebrow={s.hero.eyebrow}
        title={s.hero.h1}
        sub={s.hero.sub}
        image={s.hero.image}
        actions={waFirst ? [wa, call] : [call, wa]}
      />
      <div className="py-4 lg:py-8">
        {sections.filter((x) => x !== callout).map((x, i) => <ServiceSection key={i} s={x} service={s} />)}
      </div>
      {/* Safety callout sits directly above the FAQs (spec 11 H). */}
      {callout && <ServiceSection s={callout} service={s} />}
      {s.faqs.some((f) => f.when !== false) && (
        <section className="section-tight" aria-labelledby="faq-heading">
          <div className="container-x"><div className="max-w-[880px]">
            <h2 id="faq-heading" className="h2 mb-8">{s.faqHeading ?? "Questions"}</h2>
            <FaqAccordion items={s.faqs} />
          </div></div>
        </section>
      )}
      <CtaBand heading={s.cta.heading} text={s.cta.text} callLabel={s.hero.primaryLabel} whatsappLabel={s.hero.secondaryLabel} whatsappKey={s.hero.whatsappKey} directions={s.slug === "car-service-maintenance"} />
      <RelatedServices items={relatedFor(s)} />
      <JsonLd data={serviceJsonLd(s)} />
    </>
  );
}
