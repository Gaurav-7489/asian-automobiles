"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { track } from "@/lib/analytics";

/** Click-to-load map: no Google requests until the visitor asks (spec 21.3). */
export function MapLoader({ embed, address }: { embed: string | null; address: string }) {
  const [on, setOn] = useState(false);
  if (on && embed)
    return <iframe src={embed} title="Map showing Asian Automobiles location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-warm-50 p-6 text-center">
      <MapPin className="size-8 text-amber-700" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-[320px] text-[15px]">{address}</p>
      {embed && (
        <>
          <button type="button" onClick={() => { setOn(true); track("map_load", {}); }} className="min-h-11 rounded-sm border border-graphite-900 px-5 font-semibold hover:bg-graphite-900 hover:text-white">
            Show map
          </button>
          <p className="text-xs text-slate-600">Loads Google Maps.</p>
        </>
      )}
    </div>
  );
}
