/**
 * Services from the specification (ch. 6). Header, homepage, related links, sitemap and the
 * enquiry form all read from here. Conditional services stay `published: false`
 * (404, hidden everywhere) until the owner confirms them.
 */
const allServices = [
  { id: "car-service-maintenance", title: "Car service & maintenance", meta: "PERIODIC / MAINTENANCE", description: "Periodic servicing, oil and filter changes and general inspections.", href: "/services/car-service-maintenance/", mode: "service", photo: "oil-service", related: ["mechanical-repairs", "car-ac-service", "tyre-care"], published: true },
  { id: "mechanical-repairs", title: "Mechanical repairs", meta: "BRAKES / CLUTCH / SUSPENSION", description: "Diagnosis and repair of brakes, clutch, suspension, steering and engine issues.", href: "/services/mechanical-repairs/", mode: "service", photo: "mechanical-repair", related: ["wheel-alignment-balancing", "car-service-maintenance", "spare-parts"], published: true },
  { id: "car-ac-service", title: "Car AC services", meta: "CABIN / CLIMATE", description: "Inspection, fault-finding and gas recharge for car air-conditioning.", href: "/services/car-ac-service/", mode: "service", photo: "engine-bay", related: ["car-service-maintenance", "mechanical-repairs", "spare-parts"], published: true },
  { id: "wheel-alignment-balancing", title: "Wheel alignment & balancing", meta: "STEERING / GEOMETRY", description: "Fix pulling, steering vibration and uneven tyre wear.", href: "/services/wheel-alignment-balancing/", mode: "service", photo: "wheel-alignment", related: ["tyre-care", "mechanical-repairs", "car-service-maintenance"], published: true },
  { id: "tyre-care", title: "Tyre care", meta: "TREAD / PRESSURE / WEAR", description: "Tyre checks, pressure and wear assessment, and tyre-related advice.", href: "/services/tyre-care/", mode: "service", photo: "tyre-care", related: ["wheel-alignment-balancing", "car-service-maintenance", "mechanical-repairs"], published: true },
  { id: "denting-painting", title: "Denting & painting", meta: "PANELS / PAINT", description: "Dent, scratch and paint repair for everyday damage.", href: "/services/denting-painting/", mode: "quote", photo: "body-care", related: ["car-service-maintenance"], published: false },
  { id: "spare-parts", title: "Spare parts enquiry", meta: "OEM / AFTERMARKET", description: "Ask about genuine (OEM) and aftermarket parts for your car.", href: "/spare-parts/", mode: "parts", photo: "spare-parts", related: ["mechanical-repairs", "car-service-maintenance"], published: true },
] as const;

export type Service = (typeof allServices)[number];

export const serviceCatalog = allServices.filter((service) => service.published);

/** Looks a service up by id; unknown or unpublished ids (e.g. from a URL) return undefined. */
export function findService(id?: string | null) {
  return serviceCatalog.find((service) => service.id === id);
}

/** Local, colour-graded photo for a service (stock for now — swap files in /public/images/photos/). */
export function serviceImage(service: Service) {
  return `/images/photos/${service.photo}.jpg`;
}

/** There is no booking system: every "book" action leads to the contact page enquiry. */
export function bookingHref(id?: string) {
  const service = findService(id);
  return "/contact/" + (service ? "?service=" + service.id : "") + "#enquiry";
}
