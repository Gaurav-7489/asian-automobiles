/** Prefilled WhatsApp messages per context (spec ch. 21.2). */
export const whatsappMessages = {
  general: "Hello Asian Automobiles, I'd like to ask about my car. Make/model: … Problem: …",
  "car-service-maintenance": "Hello, I'd like to book a service. Car: [make/model/year]. Kilometres: [ ]",
  "mechanical-repairs": "Hello, my car has a problem. Car: [make/model/year]. What I'm noticing: [ ]",
  "car-ac-service": "Hello, my car AC isn't working properly. Car: [make/model/year]. Problem: [ ]",
  "wheel-alignment-balancing": "Hello, I'd like a wheel alignment/balancing check. Car: [make/model/year]. Problem: [ ]",
  "tyre-care": "Hello, I'd like advice on my tyres. Car: [make/model/year]. Tyre size: [ ]. Issue: [ ]",
  "denting-painting": "Hello, I'd like advice on body damage. Car: [make/model/year/colour]. Damage: [ ]. I'll attach photos.",
  "car-detailing": "Hello, I'd like to ask about cleaning/detailing. Car: [make/model]. Interested in: [ ]",
  parts: "Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo.",
  contact: "Hello Asian Automobiles, ",
} as const;

export type WhatsappKey = keyof typeof whatsappMessages;
