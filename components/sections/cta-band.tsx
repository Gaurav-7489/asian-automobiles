import type { WhatsappKey } from "@/content/whatsappMessages";
import { CallButton, DirectionsLink, WhatsappButton } from "@/components/ui/button";
import { displayPhone } from "@/lib/links";

/** Closing band on every page. Actions derive from business data, so missing channels disappear. */
export function CtaBand({ heading, text, callLabel = "Call the Workshop", whatsappLabel = "WhatsApp Us", whatsappKey = "general", directions = false, showNumber = false, whatsapp = true }: { heading: string; text: string; callLabel?: string; whatsappLabel?: string; whatsappKey?: WhatsappKey; directions?: boolean; showNumber?: boolean; whatsapp?: boolean }) {
  return (
    <section className="on-dark bg-graphite-900 py-20 text-white lg:py-24" aria-labelledby="cta-heading">
      <div className="container-x text-center">
        <h2 id="cta-heading" className="h2 mx-auto max-w-[720px]">{heading}</h2>
        <p className="lead mx-auto mt-4 max-w-[620px] text-grey-400">{text}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <CallButton label={showNumber ? `Call ${displayPhone()}` : callLabel} position="cta_band" />
          {whatsapp && <WhatsappButton label={whatsappLabel} messageKey={whatsappKey} position="cta_band" />}
          {directions && <DirectionsLink position="cta_band" className="justify-center sm:ml-3" />}
        </div>
      </div>
    </section>
  );
}
