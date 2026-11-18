/**
 * Inner pages: URL key (path without slashes) → title and description.
 * Read by the catch-all route (metadata + static params) and the sitemap.
 */
export const pageMeta = {
  about: {
    title: "About Asian Automobiles – Independent Car Workshop, Irinjalakuda",
    description: "Asian Automobiles is an independent multi-brand car service centre on Kattoor Road, Irinjalakuda, for servicing, repairs and spare-parts help.",
  },
  services: {
    title: "Car Services in Irinjalakuda – Servicing, Repairs, AC, Alignment – Asian Automobiles",
    description: "Car servicing, mechanical repairs, AC service, wheel alignment and balancing, tyre care and spare-parts enquiries at Asian Automobiles, Irinjalakuda.",
  },
  "services/car-service-maintenance": {
    title: "Car Service and Maintenance in Irinjalakuda – Asian Automobiles",
    description: "Periodic car servicing, oil and filter changes and vehicle inspections for cars of many makes at Asian Automobiles, Kattoor Road, Irinjalakuda. Call to book.",
  },
  "services/mechanical-repairs": {
    title: "Car Mechanical Repairs in Irinjalakuda – Brakes, Clutch, Suspension – Asian Automobiles",
    description: "Diagnosis and repair of car brake, clutch, suspension, steering and engine problems at Asian Automobiles, Irinjalakuda. Describe the symptom and call the workshop.",
  },
  "services/car-ac-service": {
    title: "Car AC Service and Repair in Irinjalakuda – Asian Automobiles",
    description: "Car AC not cooling? Asian Automobiles in Irinjalakuda checks AC performance, finds faults and handles gas recharge and compressor-related repairs.",
  },
  "services/wheel-alignment-balancing": {
    title: "Wheel Alignment and Balancing in Irinjalakuda – Asian Automobiles",
    description: "Car pulling to one side or steering wheel shaking? Asian Automobiles in Irinjalakuda offers wheel alignment, wheel balancing and tyre wear checks.",
  },
  "services/tyre-care": {
    title: "Car Tyre Care and Checks in Irinjalakuda – Asian Automobiles",
    description: "Tyre inspection, pressure checks and wear assessment at Asian Automobiles, Irinjalakuda. Keep your car safe on Kerala roads, in every season.",
  },
  "spare-parts": {
    title: "Car Spare Parts Enquiry in Irinjalakuda – OEM and Aftermarket – Asian Automobiles",
    description: "Looking for a car part? Send Asian Automobiles your car’s make, model, year and the part you need. We’ll check genuine (OEM) and aftermarket options.",
  },
  contact: {
    title: "Contact Asian Automobiles – Kattoor Road, Irinjalakuda",
    description: "Call or visit Asian Automobiles at V/526, Irinjalakuda Kattoor Rd, near Government Rest House, Irinjalakuda. Address, directions and working hours.",
  },
  "privacy-policy": {
    title: "Privacy Policy – Asian Automobiles",
    description: "How Asian Automobiles collects, uses and protects the information you share through this website.",
  },
} as const satisfies Record<string, { title: string; description: string }>;

export type PageKey = keyof typeof pageMeta;
