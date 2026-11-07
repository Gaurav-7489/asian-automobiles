import Link from "next/link";
import { addressLines, business, hoursText } from "@/content/business";
import { services } from "@/content/services";
import { displayPhone, mailHref, mapsHref, telHref } from "@/lib/links";
import { Wordmark } from "@/components/layout/wordmark";
import { WhatsappButton } from "@/components/ui/button";

export function SiteFooter() {
  const hours = hoursText();
  const email = mailHref();
  const land = telHref(business.phoneLandline);
  const head = "mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-white";
  const link = "text-grey-400 hover:text-white";
  return (
    <footer className="on-dark bg-graphite-900 pb-28 pt-16 text-[15px] text-white lg:pb-10">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-[280px] text-grey-400">{business.description}</p>
          <div className="mt-6"><WhatsappButton position="footer" size="md" /></div>
        </div>
        <nav aria-label="Quick links">
          <h2 className={head}>Quick links</h2>
          <ul className="space-y-2.5">
            {[["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/spare-parts", "Spare Parts"], ["/contact", "Contact"]].map(([h, l]) => (
              <li key={h}><Link className={link} href={h}>{l}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Services">
          <h2 className={head}>Services</h2>
          <ul className="space-y-2.5">
            {services.map((s) => <li key={s.slug}><Link className={link} href={`/services/${s.slug}`}>{s.name}</Link></li>)}
          </ul>
        </nav>
        <div id="footer-contact">
          <h2 className={head}>Contact</h2>
          <address className="not-italic text-grey-400">{addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <ul className="mt-4 space-y-2">
            {telHref() && <li><a className={link} href={telHref()!} data-analytics="contact_click" data-analytics-channel="phone" data-analytics-position="footer">{displayPhone()}</a></li>}
            {land && <li><a className={link} href={land} data-analytics="contact_click" data-analytics-channel="landline" data-analytics-position="footer">{displayPhone(business.phoneLandline)}</a></li>}
            {email && <li><a className={link} href={email}>{business.email.value}</a></li>}
            {hours && <li className="text-grey-400">{hours}</li>}
            <li><a className="font-semibold text-amber-500 hover:underline" href={mapsHref()} target="_blank" rel="noopener" data-analytics="directions_click" data-analytics-position="footer">Get Directions →<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-14 flex flex-col gap-2 border-t border-charcoal-800 pt-6 text-sm text-grey-400 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Asian Automobiles. All rights reserved.</p>
        <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
