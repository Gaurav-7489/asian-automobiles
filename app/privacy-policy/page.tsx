import Link from "next/link";
import { business, publishable } from "@/content/business";
import { seo } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { displayPhone } from "@/lib/links";
import { PageHero } from "@/components/sections/page-hero";
import { slugify } from "@/components/ui/faq-accordion";

export const metadata = buildMetadata({ ...seo.privacy, path: "/privacy-policy" });

const LAST_UPDATED = "7 November 2026";

export default function PrivacyPage() {
  const email = publishable(business.email);
  const phone = displayPhone();
  const reach = [email && `email ${email}`, phone && `call ${phone}`].filter(Boolean).join(" or ");
  const sections: { h: string; body: React.ReactNode }[] = [
    { h: "Who we are", body: <p>Asian Automobiles is an independent car service centre on Kattoor Road, Irinjalakuda, Thrissur, Kerala 680121. For any question about this policy or your information, {reach || "contact us at the workshop"}.</p> },
    { h: "What information we collect", body: <><p>When you send an enquiry through this website we collect the details you choose to give us: your name and phone number, your email address (optional), your car’s make, model, year and variant, the part or service you are asking about, your message, and — if you add one — a photo of a part. You may also choose to share your car’s chassis number.</p><p>We do not ask for payment details or identity documents on this website.</p></> },
    { h: "How we use it", body: <p>We use your information only to respond to your enquiry and to arrange the service or part you asked about. We do not send marketing messages unless you separately agree to receive them.</p> },
    { h: "Consent", body: <p>Our forms are sent only when you tick the consent box. You can withdraw your consent at any time by contacting us; we will then stop using your information for your enquiry.</p> },
    { h: "WhatsApp and third-party services", body: <p>If you contact us on WhatsApp, your messages are handled by WhatsApp under its own terms and privacy policy. Google Maps loads only when you choose to show the map, and Google’s privacy policy then applies. Our website is hosted by a third-party hosting provider, which keeps short technical logs (such as IP address and browser type) for security and operation.</p> },
    { h: "How long we keep it", body: <p>We keep enquiry details only for as long as we need them to respond to you and to handle any follow-up work. Photos of parts are deleted once the enquiry is closed.</p> },
    { h: "Who we share it with", body: <p>We never sell your information. We share it only with service providers needed to run this website or, where necessary, with a parts supplier — and then only the vehicle and part details needed to source the part — or where the law requires it.</p> },
    { h: "How we protect it", body: <p>This website uses HTTPS. Access to enquiries is limited to the people at Asian Automobiles who need them to help you, and we use providers that take reasonable security measures.</p> },
    { h: "Your rights", body: <p>You can ask us for a summary of the information we hold about you, ask us to correct or erase it, withdraw your consent, or raise a grievance. To make a request, {reach || "contact us at the workshop"}. We will respond as soon as we reasonably can.</p> },
    { h: "Grievances", body: <p>If you are unhappy with how we have handled your information, please {reach || "contact us at the workshop"} and we will look into it.</p> },
    { h: "Children", body: <p>This website is intended for adults. We do not knowingly collect information from children.</p> },
    { h: "Cookies", body: <p>This website does not set advertising or tracking cookies. If we use website analytics, we use a privacy-friendly, cookieless tool.</p> },
    { h: "Changes to this policy", body: <p>If we change this policy, we will update the date at the top of this page.</p> },
  ];
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]} eyebrow="Legal" title="Privacy Policy" sub="How Asian Automobiles collects, uses and protects the information you share through this website." />
      <section className="section-tight">
        <div className="container-x max-w-[720px]">
          <p className="muted text-sm">Last updated: {LAST_UPDATED}</p>
          <nav aria-label="On this page" className="mt-8 rounded-md bg-warm-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em]">On this page</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15px]">
              {sections.map((s) => <li key={s.h}><a className="text-amber-700 underline-offset-4 hover:underline" href={`#${slugify(s.h)}`}>{s.h}</a></li>)}
            </ol>
          </nav>
          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <section key={s.h} aria-labelledby={slugify(s.h)}>
                <h2 id={slugify(s.h)} className="h3">{i + 1}. {s.h}</h2>
                <div className="muted mt-3 space-y-3">{s.body}</div>
              </section>
            ))}
          </div>
          <p className="mt-12"><Link href="/contact" className="font-semibold text-amber-700 underline-offset-4 hover:underline">Contact us →</Link></p>
        </div>
      </section>
    </>
  );
}
