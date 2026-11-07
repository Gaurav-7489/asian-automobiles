import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, claim, confirmedOnly } from "@/content/business";
import { partsCard, services } from "@/content/services";
import { seo } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ImageGallery } from "@/components/sections/image-gallery";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink, DirectionsLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata = buildMetadata({ ...seo.about, path: "/about" });

export default function AboutPage() {
  const year = confirmedOnly(business.establishedYear);
  const steps = [
    { title: "Listen", text: "Tell us what you’ve noticed — a noise, a warning light, weak AC, a car that pulls to one side. Your description helps us look in the right place." },
    ...(claim("inspectAndExplain") ? [{ title: "Inspect and explain", text: "We check the car and explain what we find, what needs attention now and what can wait." }] : []),
    { title: "Repair and return", text: "We carry out the agreed work and hand the car back with a clear explanation of what was done." },
  ];
  const commitments = [
    { title: "Clear communication", text: "We explain things in plain language and answer your questions." },
    ...(claim("approvalFirst") ? [{ title: "Your approval first", text: "We discuss the work with you before we start." }] : []),
    { title: "Honest advice", text: "We tell you what needs attention now and what can safely wait." },
    { title: "Respect for your time", text: "Call ahead and we’ll plan for your car." },
  ];
  const capabilities = [...services.map((s) => ({ href: `/services/${s.slug}`, name: s.name, icon: s.icon })), { href: "/spare-parts", name: "Spare-parts enquiries", icon: partsCard.icon }];

  return (
    <>
      <PageHero crumbs={[{ name: "About", href: "/about" }]} eyebrow="About us" title="About Asian Automobiles" sub="An independent, multi-brand car service centre on Kattoor Road, Irinjalakuda." />

      <section className="section-tight">
        <div className="container-x *:max-w-[880px] space-y-16">
          <div>
            <h2 className="h2">A local workshop for the car you already drive</h2>
            <div className="lead muted mt-5 space-y-4">
              <p>Asian Automobiles is an independent automobile service centre in Irinjalakuda. We service, maintain and repair passenger cars of many makes, and we help customers source the spare parts their cars need.</p>
              <p>We are not a car dealership, a used-car showroom or a rental company. Everything we do is about keeping your existing car safe, reliable and comfortable to drive.</p>
            </div>
          </div>
          <div>
            <h2 className="h2">Part of Irinjalakuda’s motoring life</h2>
            <p className="lead muted mt-5">
              {year
                ? `Asian Automobiles has been looking after cars in Irinjalakuda since ${year}. Over that time, cars have changed a great deal, but the basics of good workshop service have not: listen to the customer, find the real problem and fix it properly.`
                : "Asian Automobiles is a familiar workshop on Kattoor Road, serving local car owners through workshop visits, direct enquiries and spare-parts requests. As cars have become more complex, our aim has stayed simple: listen to the customer, find the real problem and fix it properly."}
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight bg-warm-50" aria-labelledby="how-heading">
        <div className="container-x">
          <h2 id="how-heading" className="h2">How we work</h2>
          <p className="lead muted mt-4 max-w-[720px]">Good car care starts with understanding the problem, not guessing at it.</p>
          <ol className={`mt-10 grid gap-8 ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 md:block">
                <span className="font-display text-4xl font-bold leading-none text-amber-700">{i + 1}</span>
                <div className="md:mt-4">
                  <h3 className="h3">{s.title}</h3>
                  <p className="muted mt-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="cap-heading">
        <div className="container-x *:max-w-[880px]">
          <h2 id="cap-heading" className="h2">What we can help with</h2>
          <p className="muted mt-4">Our workshop handles the everyday needs of passenger cars:</p>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group flex items-center gap-3 border-b border-line-200 py-3.5 hover:text-amber-700">
                  <Icon name={c.icon} className="size-5 text-amber-700" />
                  <span className="flex-1 font-medium">{c.name}</span>
                  <ArrowRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="muted mt-6">Not sure whether we handle a particular job? Call us and ask.</p>
          <div className="mt-4"><ButtonLink href="/services" variant="text">View all services</ButtonLink></div>
        </div>
      </section>

      <ImageGallery title="Our workshop" intro="Our service centre on Kattoor Road is where the work happens." min={3} />

      <section className="section-tight bg-warm-50" aria-labelledby="expect-heading">
        <div className="container-x">
          <h2 id="expect-heading" className="h2">What you can expect from us</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {commitments.map((c) => (
              <li key={c.title} className="border-t border-line-200 pt-5">
                <h3 className="h3">{c.title}</h3>
                <p className="muted mt-2">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="local-heading">
        <div className="container-x *:max-w-[880px]">
          <h2 id="local-heading" className="h2">Based in Irinjalakuda</h2>
          <p className="lead muted mt-5">You’ll find us on Kattoor Road, near the Government Rest House and Canara Bank. We welcome customers from Irinjalakuda town and nearby areas including Kattoor, Karalam, Edathirinji, Porathissery, Pullur and Vellangallur.</p>
          <div className="mt-6 flex flex-wrap gap-8">
            <DirectionsLink position="about" />
            <ButtonLink href="/contact" variant="text">Contact and location</ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand heading="Talk to the workshop" text="Tell us about your car and what you need. We’re happy to help." />
    </>
  );
}
