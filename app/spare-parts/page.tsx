import { MapPin, MessageCircle, Phone } from "lucide-react";
import { claim } from "@/content/business";
import { images } from "@/content/images";
import { partsFaqs, seo } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { displayPhone, mapsHref, telHref, waHref } from "@/lib/links";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, CallButton } from "@/components/ui/button";
import { ContactCard } from "@/components/ui/contact-card";
import { DataTable } from "@/components/ui/data-table";
import { Stepper } from "@/components/ui/stepper";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { DotList } from "@/components/ui/checklist";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { formMode, partsFields, waBase } from "@/components/forms/config";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({ ...seo.parts, path: "/spare-parts" });

const helpful = [
  "Make, model and variant — for example, petrol or diesel, manual or automatic",
  "Year of manufacture — shown on your registration certificate (RC)",
  "Chassis number (VIN) — also on the RC; the most reliable way to match parts. Optional; share it only if you are comfortable doing so.",
  "Part number — if it’s printed on the old part",
  "A photo of the old part — especially helpful for clips, hoses, brackets and sensors",
];

export default function SparePartsPage() {
  const mode = formMode();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Spare Parts", href: "/spare-parts" }]}
        eyebrow="Spare parts"
        title="Spare parts enquiry"
        sub="Tell us your car and the part you need. We’ll check genuine (OEM) and aftermarket options and get back to you about availability."
        image={images.parts}
        actions={[
          mode ? <ButtonLink key="s" href="#parts-form" size="lg">Start Your Enquiry</ButtonLink> : null,
          <CallButton key="c" label="Call Us" position="hero" variant={mode ? "secondary" : "primary"} />,
        ]}
      />

      <section className="section-tight">
        <div className="container-x *:max-w-[880px]">
          <h2 className="h2">Finding the right part for your car</h2>
          <p className="lead muted mt-5">The same part can differ between model years, engine types and variants of the same car. A few details from you help us identify the correct part the first time, so you don’t lose time with the wrong one. We’ll check what’s available and let you know your options.</p>
          <p className="mt-4 text-sm text-slate-600">Availability varies by part and model. We don’t hold every part in stock, but we’ll tell you what we can source.</p>
        </div>
      </section>

      <section className="section-tight bg-warm-50">
        <div className="container-x *:max-w-[880px]">
          <h2 className="h2">Genuine (OEM) or aftermarket?</h2>
          <div className="mt-8 rounded-md bg-white">
            <DataTable
              caption="Genuine (OEM) compared with aftermarket parts"
              stack={false}
              columns={["", "Genuine (OEM) parts", "Aftermarket parts"]}
              rows={[
                ["Made by", "The vehicle manufacturer or its approved supplier", "Independent manufacturers"],
                ["Fit", "Made to the original specification for your model", "Designed to fit; quality varies by brand"],
                ["Cost", "Usually higher", "Often lower"],
                ["Good for", "Owners who want the original specification", "Owners looking for a cost-effective alternative"],
              ]}
            />
          </div>
          {claim("genuineAndAftermarket") && <p className="muted mt-4">We’ll explain the options available for your part so you can choose.</p>}
        </div>
      </section>

      <section className="section-tight">
        <div className="container-x">
          <h2 className="h2 mb-10">How it works</h2>
          <Stepper
            items={[
              { title: "Send your enquiry", text: "Use the form, WhatsApp or a phone call." },
              { title: "We identify the part", text: "From your vehicle details and description." },
              { title: "We check availability", text: "And the options for your car." },
              { title: "We get back to you", text: "With what we can offer and next steps." },
            ]}
          />
        </div>
      </section>

      <section id="parts-form" className="section-tight bg-warm-50" aria-labelledby="form-heading">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="form-heading" className="h2">Send a parts enquiry</h2>
            {mode ? (
              <>
                <p className="muted mt-3">Fill in what you know.</p>
                <details className="mt-6 rounded-md border border-line-200 bg-white p-4 lg:hidden">
                  <summary className="cursor-pointer font-semibold">What details help?</summary>
                  <div className="mt-4 text-[15px]"><DotList items={helpful} /></div>
                </details>
                <div className="mt-6 rounded-md border border-line-200 bg-white p-5 lg:p-8">
                  <EnquiryForm kind="parts" fields={partsFields} mode={mode} waBase={waBase()} phoneDisplay={displayPhone()} tel={telHref()} successText="Thank you, {name}. We’ve received your enquiry and will contact you on {phone}." />
                </div>
              </>
            ) : (
              <div className="mt-6 rounded-md border border-line-200 bg-white p-6 lg:p-8">
                <p className="lead">To enquire about a part, call us{displayPhone() ? ` on ${displayPhone()}` : ""}.</p>
                <p className="muted mt-2">Have your car’s make, model, year and the part name ready.</p>
                <div className="mt-6"><CallButton label="Call Us" position="parts_form" /></div>
              </div>
            )}
          </div>
          <aside className="hidden lg:col-span-5 lg:block" aria-labelledby="help-heading">
            <div className="sticky top-28 rounded-md border border-line-200 bg-white p-8">
              <h3 id="help-heading" className="h3">Details that help us find the right part</h3>
              <ul className="mt-5 space-y-3 text-[15px]">{helpful.map((h) => <li key={h} className="muted">{h}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="talk-heading">
        <div className="container-x">
          <h2 id="talk-heading" className="h2 mb-8">Prefer to talk?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ContactCard icon={<Phone className="size-6" strokeWidth={1.5} />} title="Call us" value={displayPhone()} helper="Describe the part and we’ll check for you." href={telHref()} action="Call now →" channel="phone" position="parts_page" />
            <ContactCard icon={<MessageCircle className="size-6" strokeWidth={1.5} />} title="WhatsApp" helper="Send a photo of the old part and your car details." href={waHref("parts")} action="Open WhatsApp →" channel="whatsapp" position="parts_page" external />
            <ContactCard icon={<MapPin className="size-6" strokeWidth={1.5} />} title="Visit" helper="Bring the old part to our workshop on Kattoor Road." href={mapsHref()} action="Get directions →" channel="maps" position="parts_page" external />
          </div>
        </div>
      </section>

      <section className="section-tight bg-warm-50" aria-labelledby="faq-heading">
        <div className="container-x *:max-w-[880px]">
          <h2 id="faq-heading" className="h2 mb-8">Spare parts questions</h2>
          <FaqAccordion items={partsFaqs} />
        </div>
      </section>

      <CtaBand heading="Need a part for a repair?" text="If the part is for a job our workshop handles, call us to plan the fitting too." whatsappKey="parts" />
    </>
  );
}
