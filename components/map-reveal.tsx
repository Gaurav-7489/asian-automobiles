"use client";
import { useState, type ReactNode } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load map (spec 21.3 / 20.3.6): shows an illustration until the visitor asks for
 * the map, so no Google request is made on page load.
 */
export function MapReveal({ src, children }: { src: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <div className="aa-map is-live">
        <iframe src={src} title="Map showing Asian Automobiles location" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="aa-map">
      {children}
      <button type="button" className="aa-btn aa-btn--dark aa-map__button" onClick={() => setOpen(true)}>
        <MapPin size={16} aria-hidden="true" />
        <span>Show map</span>
        <small>Loads Google Maps</small>
      </button>
    </div>
  );
}
