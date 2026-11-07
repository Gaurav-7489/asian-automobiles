import { Landmark, Mail, MessageCircle, Phone } from "lucide-react";
import { addressLines, addressOneLine, business, confirmedOnly, formatTime, publishable, serviceArea } from "@/content/business";
import { seo } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { displayPhone, mailHref, telHref, waHref } from "@/lib/links";
import { PageHero } from "@/components/sections/page-hero";
import { ContactCard } from "@/components/ui/contact-card";
import { CopyButton } from "@/components/ui/copy-button";
import { DirectionsLink } from "@/components/ui/button";
import { MapLoader } from "@/components/sections/map-loader";
import { OpenNow } from "@/components/sections/open-now";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { contactFields, formMode, waBase } from "@/components/forms/config";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({ ...seo.contact, path: "/contact" });

export default function ContactPage() {
  const mode = formMode();
  const hours = publishable(business.hours);
  const confirmedHours = confirmedOnly(business.hours);
  const sunday = confirmedOnly(business.sundayClosed);
  const embed = publishable(business.mapsEmbed);
  const email = publishable(business.email);
  const cards = [telHref(), telHref(business.phoneLandline), waHref("contact"), mailHref()].filter(Boolean).length;
  return (
    <>
      <PageHero crumbs={[{ name: "Contact", href: "/contact" }]} eyebrow="Contact" title="Contact and location" sub="Call, message or visit our workshop on Kattoor Road, Irinjalakuda." />

      <section className="pb-6 pt-10 lg:pt-14" aria-label="Ways to reach us">
        <div className={`container-x grid gap-4 sm:grid-cols-2 ${cards >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          <ContactCard icon={<Phone className="size-6" strokeWidth={1.5} />} title="Call the workshop" value={displayPhone()} helper="Fastest way to reach us during working hours." href={telHref()} action="Call now →" channel="phone" position="contact_page" copy={displayPhone() ?? undefined} />
          <ContactCard icon={<Landmark className="size-6" strokeWidth={1.5} />} title="Landline" value={displayPhone(business.phoneLandline)} helper="Workshop landline." href={telHref(business.phoneLandline)} action="Call →" channel="landline" position="contact_page" copy={displayPhone(business.phoneLandline) ?? undefined} />
          <ContactCard icon={<MessageCircle className="size-6" strokeWidth={1.5} />} title="WhatsApp" value={publishable(business.whatsapp)} helper="Send a message, photo or video of the problem." href={waHref("contact")} action="Open WhatsApp →" channel="whatsapp" position="contact_page" external />
          <ContactCard icon={<Mail className="size-6" strokeWidth={1.5} />} title="Email" value={email} helper="For non-urgent questions. For anything urgent, please call." href={mailHref()} action="Send email →" channel="email" position="contact_page" copy={email ?? undefined} />
        </div>
      </section>

      <section className="section-tight" aria-labelledby="address-heading">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            <div>
              <h2 id="address-heading" className="h2">Our address</h2>
              <div className="mt-5 flex items-start justify-between gap-4">
                <address className="not-italic">
                  <p className="font-semibold">Asian Automobiles</p>
                  {addressLines.map((l) => <p key={l} className="muted">{l}</p>)}
                </address>
                <CopyButton value={`Asian Automobiles, ${addressOneLine}`} label="address" />
              </div>
              <p className="muted mt-5 text-[15px]">We’re on Kattoor Road in Irinjalakuda, near the Government Rest House and Canara Bank. If you’re unsure of the way, call us and we’ll guide you.</p>
              <div className="mt-6"><DirectionsLink position="contact_page" asButton /></div>
            </div>
            {hours && (
              <div>
                <h2 className="h2 flex items-center">
                  Working hours
                  {confirmedHours && <OpenNow days={[1, 2, 3, 4, 5, 6]} opens={confirmedHours[0].opens} closes={confirmedHours[0].closes} />}
                </h2>
                <table className="data-table mt-5">
                  <caption className="sr-only">Working hours</caption>
                  <tbody>
                    {hours.map((h) => (
                      <tr key={h.days}><th scope="row">{h.days}</th><td>{formatTime(h.opens)} – {formatTime(h.closes)}</td></tr>
                    ))}
                    {sunday !== null && <tr><th scope="row">Sunday</th><td>{sunday ? "Closed" : "Open"}</td></tr>}
                    <tr><th scope="row">Public holidays</th><td>Please call ahead.</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            {embed && (
              <div className="mb-10 h-[280px] overflow-hidden rounded-md border border-line-200 md:h-[360px] lg:h-[480px]">
                <MapLoader embed={embed} address={addressOneLine} />
              </div>
            )}
            <h2 className="h2">Coming from nearby</h2>
            <p className="muted mt-4">We welcome customers from across the Irinjalakuda area, including {serviceArea.slice(0, -1).join(", ")} and {serviceArea.at(-1)}.</p>
          </div>
        </div>
      </section>

      {mode && (
        <section className="section-tight bg-warm-50" aria-labelledby="message-heading">
          <div className="container-x max-w-[720px]">
            <h2 id="message-heading" className="h2">Send us a message</h2>
            <p className="muted mt-3">For non-urgent enquiries. For anything urgent, please call.</p>
            <div className="mt-6 rounded-md border border-line-200 bg-white p-5 lg:p-8">
              <EnquiryForm kind="contact" fields={contactFields(Boolean(waBase()))} mode={mode} waBase={waBase()} phoneDisplay={displayPhone()} tel={telHref()} successText="Thank you, {name}. We’ve received your message and will get back to you." partsLinkOnTopic />
            </div>
          </div>
        </section>
      )}

      <CtaBand heading="The quickest way to reach us is a call" text="Tell us about your car and we’ll help you plan the next step." showNumber directions whatsapp={false} />
    </>
  );
}
