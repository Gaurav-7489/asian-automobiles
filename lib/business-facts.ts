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
    // Building number has conflicting sources – never publish until the owner confirms one.
    street: "Kattoor Road",
    landmark: "Near Government Rest House / Canara Bank",
    locality: "Irinjalakuda",
    district: "Thrissur",
    postalCode: "680121",
    region: "Kerala",
    country: "India",
    full: "Kattoor Road, near Government Rest House / Canara Bank, Irinjalakuda, Thrissur, Kerala 680121",
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
  /** Reported hours (provisional). Sunday and public-holiday status unknown. */
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
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

/** Google Maps search for the business until the verified Business Profile link is supplied. */
export const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Asian Automobiles, Kattoor Road, Irinjalakuda, Kerala 680121");
