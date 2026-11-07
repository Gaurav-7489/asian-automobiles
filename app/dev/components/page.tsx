import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { services } from "@/content/services";
import { ButtonLink, CallButton, DirectionsLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { ContactCard } from "@/components/ui/contact-card";
import { Callout } from "@/components/ui/callout";
import { Checklist } from "@/components/ui/checklist";
import { Stepper } from "@/components/ui/stepper";
import { DataTable } from "@/components/ui/data-table";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Wordmark } from "@/components/layout/wordmark";

/** Component preview (spec 20.4.6). Non-indexed; 404 unless ENABLE_DEV_ROUTES=1. */
export const metadata = { title: "Components – dev", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function DevComponents() {
  if (process.env.ENABLE_DEV_ROUTES !== "1") notFound();
  const s = services[0];
  return (
    <div className="container-x space-y-16 py-16">
      <h1 className="h1">Components</h1>
      <section className="space-y-4"><h2 className="h3">Wordmark</h2><div className="on-dark inline-block bg-graphite-900 p-6 text-white"><Wordmark /></div> <Wordmark /></section>
      <section className="space-y-4"><h2 className="h3">Buttons</h2>
        <div className="flex flex-wrap gap-3"><CallButton position="dev" /><ButtonLink href="/services" variant="secondary" size="lg">Secondary</ButtonLink><DirectionsLink position="dev" /></div>
        <div className="on-dark flex flex-wrap gap-3 bg-graphite-900 p-6"><CallButton position="dev" /><ButtonLink href="/services" variant="secondary" size="lg">Secondary</ButtonLink><DirectionsLink position="dev" /></div>
      </section>
      <section className="space-y-4"><h2 className="h3">Cards</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <ServiceCard card={{ slug: s.slug, name: s.name, text: s.cardText, href: `/services/${s.slug}`, icon: s.icon, image: s.hero.image }} />
          <ContactCard icon={<Phone className="size-6" />} title="Call us" value="+91 00000 00000" helper="Helper line." href="tel:+910000000000" action="Call now →" channel="phone" position="dev" copy="+91 00000 00000" />
          <ContactCard icon={<MapPin className="size-6" />} title="Visit" helper="Helper line." href="#" action="Directions →" channel="maps" position="dev" />
        </div>
      </section>
      <section className="space-y-4"><h2 className="h3">Callouts</h2><Callout title="Info" text="Info callout." /><Callout variant="caution" title="Caution" text="Caution callout." /></section>
      <section className="space-y-4"><h2 className="h3">Checklist</h2><Checklist columns={2} items={s.typicalWork.map((text) => ({ text }))} /></section>
      <section className="space-y-4"><h2 className="h3">Stepper</h2><Stepper items={[1, 2, 3, 4].map((n) => ({ title: `Step ${n}`, text: "Description." }))} /></section>
      <section className="space-y-4"><h2 className="h3">Symptom table</h2><DataTable caption="Example" columns={["What you notice", "Cause", "Area"]} rows={[["Noise", "Worn part", "Brakes"], ["Pull", "Alignment", { text: "Wheels", href: "/services/wheel-alignment-balancing" }]]} /></section>
      <section className="space-y-4"><h2 className="h3">FAQ</h2><FaqAccordion items={s.faqs.slice(0, 3)} /></section>
      <CtaBand heading="CTA band" text="Supporting copy." directions />
    </div>
  );
}
