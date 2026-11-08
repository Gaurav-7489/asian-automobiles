/**
 * Public business facts for Asian Automobiles.
 *
 * SOURCE OF TRUTH: Asian Automobiles – Website Development Specification v1.0 (Nov 2026).
 * Only the business name, category, street and "not a dealership" positioning are confirmed.
 * Everything else is provisional or unknown until the owner signs it off
 * (see docs/OWNER_CHECKLIST.md). Change a flag here and the whole site follows.
 */

export const businessFacts = {
  name: "Asian Automobiles",
  description:
    "An independent, multi-brand car service centre in Irinjalakuda for servicing, repairs and spare-parts enquiries.",
  address: {
    // Matches the verified Google Business Profile exactly (spec 23.6 – NAP consistency).
    // Source: Google Business Profile listing supplied by the owner, Nov 2026.
    buildingNumber: "V/526",
    street: "V/526, Irinjalakuda Kattoor Rd",
    landmark: "Near Government Rest House / Canara Bank",
    locality: "Irinjalakuda",
    district: "Thrissur",
    postalCode: "680121",
    region: "Kerala",
    country: "India",
    full: "V/526, Irinjalakuda Kattoor Rd, Irinjalakuda, Kerala 680121",
    plusCode: "9623+V8 Irinjalakuda, Kerala",
  },
  /** Reported as 1996 – shown only when the owner confirms it. */
  establishedYear: 1996,
  establishedConfirmed: false,
  phones: {
    primaryDisplay: "+91 93490 02038",
    primaryHref: "+919349002038",
    landlineDisplay: "0480 2828167",
    landlineHref: "+914802828167",
    /** WhatsApp number is unknown. It must not default to the mobile number. */
    whatsappDisplay: "",
    whatsappHref: "",
  },
  email: "asianautogarage@gmail.com",
  /** Opening time (9 AM) and Sunday closure match the Google Business Profile; closing time 7 PM is still as reported. */
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
  sundayClosed: true,
  /** Process wording ("we explain before we work") – owner to confirm (M18). */
  processConfirmed: true,
  positioning: {
    businessType: "Independent multi-brand car service centre",
    pillars: ["Service & repair", "Spare-parts enquiries"],
  },
  serviceArea: [
    "Kattoor", "Edathirinji", "Karalam", "Porathissery", "Madayikonam", "Nadavaramba",
    "Chelur", "Kizhuthani", "Thanissery", "Pullur", "Karuvannur", "Vellangallur",
  ],
} as const;

/** WhatsApp buttons and the enquiry form render only once a number is confirmed. */
export const whatsappEnabled = businessFacts.phones.whatsappHref.length > 0;

export function whatsappLink(message: string): string | null {
  if (!whatsappEnabled) return null;
  return "https://wa.me/" + businessFacts.phones.whatsappHref + "?text=" + encodeURIComponent(message);
}

const mapsQuery = "Asian Automobiles, V/526, Irinjalakuda Kattoor Rd, Irinjalakuda, Kerala 680121";

/** Opens the Business Profile location in Google Maps (app on mobile). */
export const directionsHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapsQuery);

/** Keyless embed of the same listing; loaded only after the visitor presses "Show map" (spec 21.3). */
export const mapsEmbedSrc = "https://www.google.com/maps?q=" + encodeURIComponent(mapsQuery) + "&output=embed";
