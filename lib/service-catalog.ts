export type LeadMode = "service" | "quote" | "parts";

/**
 * Services from the specification (ch. 6). Header, homepage, related links and the
 * enquiry form all read from here. Conditional services stay `published: false`
 * (404, hidden everywhere) until the owner confirms them.
 */
const allServices = [
  { id: "car-service-maintenance", theme: "service", title: "Car service & maintenance", meta: "PERIODIC / MAINTENANCE", description: "Periodic servicing, oil and filter changes and general inspections.", href: "/services/car-service-maintenance/", mode: "service", image: "photo-1486006920555-c77dcf18193c", related: ["mechanical-repairs", "car-ac-service", "tyre-care"], published: true },
  { id: "mechanical-repairs", theme: "mechanical", title: "Mechanical repairs", meta: "BRAKES / CLUTCH / SUSPENSION", description: "Diagnosis and repair of brakes, clutch, suspension, steering and engine issues.", href: "/services/mechanical-repairs/", mode: "service", image: "photo-1625047509248-ec889cbff17f", related: ["wheel-alignment-balancing", "car-service-maintenance", "spare-parts"], published: true },
  { id: "car-ac-service", theme: "ac", title: "Car AC services", meta: "CABIN / CLIMATE", description: "Inspection, fault-finding and gas recharge for car air-conditioning.", href: "/services/car-ac-service/", mode: "service", image: "photo-1487754180451-c456f719a1fc", related: ["car-service-maintenance", "mechanical-repairs", "spare-parts"], published: true },
  { id: "wheel-alignment-balancing", theme: "wheel", title: "Wheel alignment & balancing", meta: "STEERING / GEOMETRY", description: "Fix pulling, steering vibration and uneven tyre wear.", href: "/services/wheel-alignment-balancing/", mode: "service", image: "photo-1503736334956-4c8f8e92946d", related: ["tyre-care", "mechanical-repairs", "car-service-maintenance"], published: true },
  { id: "tyre-care", theme: "tyre", title: "Tyre care", meta: "TREAD / PRESSURE / WEAR", description: "Tyre checks, pressure and wear assessment, and tyre-related advice.", href: "/services/tyre-care/", mode: "service", image: "photo-1492144534655-ae79c964c9d7", related: ["wheel-alignment-balancing", "car-service-maintenance", "mechanical-repairs"], published: true },
  { id: "denting-painting", theme: "paint", title: "Denting & painting", meta: "PANELS / PAINT", description: "Dent, scratch and paint repair for everyday damage.", href: "/services/denting-painting/", mode: "quote", image: "photo-1486262715619-67b85e0b08d3", related: ["car-service-maintenance"], published: false },
  { id: "spare-parts", theme: "parts", title: "Spare parts enquiry", meta: "OEM / AFTERMARKET", description: "Ask about genuine (OEM) and aftermarket parts for your car.", href: "/spare-parts/", mode: "parts", image: "photo-1511919884226-fd3cad34687c", related: ["mechanical-repairs", "car-service-maintenance"], published: true },
] as const;

export const serviceCatalog = allServices.filter((service) => service.published);

export type Service = (typeof allServices)[number];
export function findService(id?: string) {
  return serviceCatalog.find((service) => service.id === id);
}
/**
 * Temporary local illustrations stand in for photos that were broken or did not match the
 * service (supercar stock shots). Replace the files in /public/images/placeholders/ — or
 * point a service at a real workshop photo — once the owner supplies photography.
 */
const placeholderByPhoto: Record<string, string> = {
  "photo-1503736334956-4c8f8e92946d": "/images/placeholders/wheel-alignment.svg",
  "photo-1492144534655-ae79c964c9d7": "/images/placeholders/tyre-care.svg",
  "photo-1511919884226-fd3cad34687c": "/images/placeholders/spare-parts.svg",
};
export function serviceImage(service: Service, width = 1000) {
  const placeholder = placeholderByPhoto[service.image];
  if (placeholder) return placeholder;
  return `https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=${width}&q=72`;
}
/** There is no booking system: every "book" action leads to the contact page enquiry. */
export function bookingHref(id?: string, _intent?: string, _detail?: string) {
  void _intent; void _detail;
  const service = findService(id);
  return "/contact/" + (service ? "?service=" + service.id : "") + "#enquiry";
}

/** Old URLs from the previous structure → their canonical pages (also in next.config.mjs). */
export const serviceRouteAliases: Record<string, string> = {
  "services/car-service": "/services/car-service-maintenance/",
  "services/car-ac-repair": "/services/car-ac-service/",
  "services/wheel-alignment": "/services/wheel-alignment-balancing/",
  "services/tyre-services": "/services/tyre-care/",
  "services/accident-repair": "/services/",
  "services/spare-parts": "/spare-parts/",
  "book-service": "/contact/",
  "request-quote": "/contact/",
  insurance: "/services/",
  facilities: "/about/",
  gallery: "/about/",
  reviews: "/",
  faq: "/",
};
