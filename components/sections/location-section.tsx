import { addressLines, addressOneLine, business, hoursText, publishable } from "@/content/business";
import { displayPhone, telHref } from "@/lib/links";
import { CallButton, DirectionsLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { MapLoader } from "@/components/sections/map-loader";

export function LocationSection({ title = "Find the workshop", id = "location" }: { title?: string; id?: string }) {
  const hours = hoursText();
  const embed = publishable(business.mapsEmbed);
  const land = displayPhone(business.phoneLandline);
  return (
    <section className="section" aria-labelledby={id}>
      <div className="container-x">
        <SectionHeader title={title} id={id} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className={`rounded-md border border-line-200 p-6 lg:p-8 ${embed ? "lg:col-span-5" : "lg:col-span-12 md:grid md:grid-cols-2 md:gap-x-12"}`}>
            <address className="not-italic">
              <p className="font-display text-lg font-semibold">Asian Automobiles</p>
              {addressLines.map((l) => <p key={l} className="muted">{l}</p>)}
            </address>
            <dl className={`space-y-2 text-[15px] ${embed ? "mt-6" : "mt-6 md:mt-0"}`}>
              {hours && <div className="flex gap-2"><dt className="font-semibold">Hours</dt><dd className="muted">{hours}</dd></div>}
              {telHref() && <div className="flex gap-2"><dt className="font-semibold">Phone</dt><dd><a className="hover:underline" href={telHref()!}>{displayPhone()}</a></dd></div>}
              {land && <div className="flex gap-2"><dt className="font-semibold">Landline</dt><dd><a className="hover:underline" href={telHref(business.phoneLandline)!}>{land}</a></dd></div>}
            </dl>
            <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${embed ? "" : "md:col-span-2"}`}>
              <CallButton position="location" />
              <DirectionsLink position="location" className="sm:ml-3" />
            </div>
          </div>
          {embed && (
            <div className="h-[280px] overflow-hidden rounded-md border border-line-200 md:h-[360px] lg:col-span-7 lg:h-[420px]">
              <MapLoader embed={embed} address={addressOneLine} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
