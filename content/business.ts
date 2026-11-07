/**
 * Single source of truth for every business fact shown on the site (spec ch. 22.3).
 *
 * Each fact carries a verification status:
 *   confirmed   – stated as fact by the owner; always published
 *   provisional – reported but not yet signed off; shown in preview builds only
 *   unknown     – no reliable value; never published
 *
 * Set NEXT_PUBLIC_FACT_MODE=strict for the launch build: only confirmed facts render.
 * When the owner confirms a value, change its status and add a source note,
 * e.g. source: "Owner, phone call, 12 Nov 2026".
 */

export type Status = "confirmed" | "provisional" | "unknown";
export interface Fact<T> {
  value: T | null;
  status: Status;
  source?: string;
}

export interface Hours {
  days: string; // human label
  dayOfWeek: string[]; // schema.org day names
  opens: string; // 24h "09:00"
  closes: string;
}

export const business = {
  name: { value: "Asian Automobiles", status: "confirmed" } as Fact<string>,
  description:
    "An independent, multi-brand car service centre in Irinjalakuda for servicing, repairs and spare-parts enquiries.",
  phonePrimary: { value: "+919349002038", status: "provisional", source: "Client brief" } as Fact<string>,
  phoneLandline: { value: "+914802828167", status: "provisional", source: "Client brief" } as Fact<string>,
  /** Must NOT default to the mobile number. WhatsApp buttons and the forms stay hidden until set. */
  whatsapp: { value: null, status: "unknown" } as Fact<string>,
  email: { value: "asianautogarage@gmail.com", status: "provisional", source: "Client brief" } as Fact<string>,
  address: {
    street: "Kattoor Road",
    landmark: "near Government Rest House / Canara Bank",
    locality: "Irinjalakuda",
    district: "Thrissur",
    region: "Kerala",
    postalCode: "680121",
    country: "IN",
    buildingNumber: null as string | null, // unknown – conflicting sources, never publish
  },
  hours: {
    value: [
      {
        days: "Monday – Saturday",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    status: "provisional",
    source: "Client brief",
  } as Fact<Hours[]>,
  /** Sunday status unknown – show "Closed" only once confirmed. */
  sundayClosed: { value: null, status: "unknown" } as Fact<boolean>,
  /** Claim, not a contact detail: shown only when confirmed, in every mode. */
  establishedYear: { value: 1996, status: "provisional", source: "Background material" } as Fact<number>,
  mapsUrl: { value: null, status: "unknown" } as Fact<string>,
  mapsEmbed: { value: null, status: "unknown" } as Fact<string>,
  /** Owner-supplied profiles only (Google Business Profile, social). */
  sameAs: [] as string[],
};

/** Owner-confirmed process and capability flags used in copy (spec ch. 27, M12/M18). */
export const claims = {
  inspectAndExplain: { value: true, status: "provisional" } as Fact<boolean>,
  approvalFirst: { value: true, status: "provisional" } as Fact<boolean>,
  genuineAndAftermarket: { value: true, status: "provisional" } as Fact<boolean>,
  electricalEnquiries: { value: true, status: "provisional" } as Fact<boolean>,
  oilToSpec: { value: true, status: "provisional" } as Fact<boolean>,
  cabinFilterCheck: { value: true, status: "provisional" } as Fact<boolean>,
};

export const serviceArea = [
  "Kattoor",
  "Edathirinji",
  "Karalam",
  "Porathissery",
  "Madayikonam",
  "Nadavaramba",
  "Chelur",
  "Kizhuthani",
  "Thanissery",
  "Pullur",
  "Karuvannur",
  "Vellangallur",
];

const strict = process.env.NEXT_PUBLIC_FACT_MODE === "strict";

/** Returns a fact's value only when it may be shown in the current build. */
export function publishable<T>(fact: Fact<T>): T | null {
  if (fact.value === null || fact.status === "unknown") return null;
  if (fact.status === "confirmed") return fact.value;
  return strict ? null : fact.value;
}

/** Claims about the business history or process – confirmed only, in every build. */
export function confirmedOnly<T>(fact: Fact<T>): T | null {
  return fact.status === "confirmed" ? fact.value : null;
}

/** Process wording (“we explain before we work”) – preview shows it, strict needs confirmation. */
export const claim = (key: keyof typeof claims) => Boolean(publishable(claims[key]));

export const addressLines = [
  "Kattoor Road, near Government Rest House / Canara Bank",
  "Irinjalakuda, Thrissur District",
  "Kerala 680121, India",
];
export const addressOneLine =
  "Kattoor Road, near Government Rest House / Canara Bank, Irinjalakuda, Thrissur, Kerala 680121";

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** “Monday – Saturday, 9:00 AM – 7:00 PM” or null when not publishable. */
export function hoursText(): string | null {
  const hours = publishable(business.hours);
  if (!hours) return null;
  return hours.map((h) => `${h.days}, ${formatTime(h.opens)} – ${formatTime(h.closes)}`).join("; ");
}
