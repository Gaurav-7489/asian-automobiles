export type LeadMode = "service" | "quote" | "accident" | "parts";

/** Shared service identities for navigation, discovery and enquiry handoff. */
export const serviceCatalog = [
  { id: "car-service", theme: "service", title: "General service & repair", meta: "ROUTINE / MECHANICAL", description: "Routine maintenance, fluids, filters and general mechanical repairs.", href: "/services/car-service/", mode: "service", image: "photo-1486006920555-c77dcf18193c", related: ["spare-parts", "car-ac-repair"] },
  { id: "car-ac-repair", theme: "ac", title: "Car AC service & repair", meta: "CABIN / CLIMATE", description: "Help with weak cooling, low airflow and AC-system concerns.", href: "/services/car-ac-repair/", mode: "service", image: "photo-1487754180451-c456f719a1fc", related: ["car-service", "spare-parts"] },
  { id: "accident-repair", theme: "accident", title: "Accident repair", meta: "DAMAGE / RESTORATION", description: "Vehicle damage assessment and accident restoration enquiries.", href: "/services/accident-repair/", mode: "accident", image: "photo-1625047509248-ec889cbff17f", related: ["denting-painting", "spare-parts"] },
  { id: "denting-painting", theme: "paint", title: "Denting & painting", meta: "PANELS / PAINT", description: "Photo-led enquiries for dents, scratches and paint damage.", href: "/services/denting-painting/", mode: "quote", image: "photo-1486262715619-67b85e0b08d3", related: ["accident-repair", "spare-parts"] },
  { id: "wheel-alignment", theme: "wheel", title: "Wheel alignment", meta: "STEERING / GEOMETRY", description: "Computerized alignment for pulling and off-centre steering.", href: "/services/wheel-alignment/", mode: "service", image: "photo-1503736334956-4c8f8e92946d", related: ["tyre-services", "car-service"] },
  { id: "tyre-services", theme: "tyre", title: "Tyre & wheel care", meta: "TYRES / BALANCING / RIMS", description: "Tyre repair, wheel balancing and rim-related enquiries.", href: "/services/tyre-services/", mode: "service", image: "photo-1492144534655-ae79c964c9d7", related: ["wheel-alignment", "spare-parts"] },
  { id: "spare-parts", theme: "parts", title: "Automobile spare parts", meta: "PARTS / FITMENT", description: "Check availability and fitment using your vehicle and part details.", href: "/spare-parts/", mode: "parts", image: "photo-1511919884226-fd3cad34687c", related: ["car-service", "tyre-services"] },
] as const;

export type Service = (typeof serviceCatalog)[number];
export function findService(id?: string) {
  return serviceCatalog.find((service) => service.id === id);
}
export function serviceImage(service: Service, width = 1000) {
  return `https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=${width}&q=72`;
}
export function bookingHref(id?: string, intent?: "quote", detail?: string) {
  const service = findService(id);
  const query = new URLSearchParams();
  if (service) query.set("service", service.id);
  if (intent) query.set("intent", intent);
  if (detail) query.set("detail", detail.slice(0, 160));
  return "/book-service/" + (query.size ? "?" + query.toString() : "");
}

export const serviceRouteAliases: Record<string, string> = Object.fromEntries([
  ...serviceCatalog.filter((service) => service.id !== "spare-parts").map((service) => [service.id, service.href]),
  ["services/spare-parts", "/spare-parts/"],
]);
