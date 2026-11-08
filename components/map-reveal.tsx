"use client";
import { useState, type ReactNode } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load map (spec 21.3 / 20.3.6): shows the template's illustrated map card until the
 * visitor asks for the map, so no Google request is made on page load.
 */
export function MapReveal({ src, children }: { src: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <div className="aa-v10-map-card aa-map-live">
        <iframe src={src} title="Map showing Asian Automobiles location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="aa-v10-map-card">
      {children}
      <button type="button" className="aa-map-reveal" onClick={() => setOpen(true)}>
        <MapPin size={16} /> Show map <small>Loads Google Maps</small>
      </button>
    </div>
  );
}
