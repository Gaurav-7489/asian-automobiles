import { claim, hoursText } from "@/content/business";
import type { Faq } from "@/content/services";

/** Per-page SEO (spec ch. 7–19, 23). Titles are written in full. */
export const seo = {
  home: {
    title: "Asian Automobiles – Multi-Brand Car Service Centre in Irinjalakuda",
    description:
      "Independent car servicing, mechanical repairs, AC service, wheel alignment, tyre care and spare-parts enquiries on Kattoor Road, Irinjalakuda. Call or visit the workshop.",
  },
  about: {
    title: "About Asian Automobiles – Independent Car Workshop, Irinjalakuda",
    description:
      "Asian Automobiles is an independent multi-brand car service centre on Kattoor Road, Irinjalakuda, for servicing, repairs and spare-parts help.",
  },
  services: {
    title: "Car Services in Irinjalakuda – Servicing, Repairs, AC, Alignment – Asian Automobiles",
    description:
      "Car servicing, mechanical repairs, AC service, wheel alignment and balancing, tyre care and spare-parts enquiries at Asian Automobiles, Irinjalakuda.",
  },
  parts: {
    title: "Car Spare Parts Enquiry in Irinjalakuda – OEM and Aftermarket – Asian Automobiles",
    description:
      "Looking for a car part? Send Asian Automobiles your car’s make, model, year and the part you need. We’ll check genuine (OEM) and aftermarket options.",
  },
  contact: {
    title: "Contact Asian Automobiles – Kattoor Road, Irinjalakuda",
    description:
      "Call, WhatsApp or visit Asian Automobiles on Kattoor Road, near Government Rest House, Irinjalakuda. Address, map, directions and working hours.",
  },
  privacy: {
    title: "Privacy Policy – Asian Automobiles",
    description: "How Asian Automobiles collects, uses and protects the information you share through this website.",
  },
};

const hours = hoursText();

export const homeFaqs: Faq[] = [
  { q: "Which car brands do you work on?", a: "We service and repair passenger cars of many makes. Call us with your car’s make, model and year and we’ll confirm we can help." },
  { q: "Are you a dealership or an authorised brand service centre?", a: "No. Asian Automobiles is an independent multi-brand service centre. We don’t sell new or used cars; we look after the car you already own." },
  { q: "Do I need to call before I visit?", a: "We recommend it. A quick call lets us understand the problem and plan time for your car, so your visit is not wasted." },
  { q: "How much will my service or repair cost?", a: "It depends on your car, its condition and the parts needed. Call us with your vehicle details to discuss your requirements." },
  { q: "Can you help me find a spare part?", a: "Yes. Send a parts enquiry with your car details and the part you need, and we’ll check the options available." },
  { q: "What are your working hours?", a: `We are open ${hours}. Please call ahead on public holidays.`, when: Boolean(hours) },
];

export const partsFaqs: Faq[] = [
  { q: "Do you have the part in stock?", a: "It depends on the part and the model. Send an enquiry and we’ll check availability and options for you." },
  { q: "Do you sell genuine parts?", a: "We can enquire about both genuine (OEM) and aftermarket parts and explain the difference for your part.", when: claim("genuineAndAftermarket") },
  { q: "Can you fit the part for me?", a: "If the part is for a job our workshop handles, we can discuss fitting it. Call us to plan." },
  { q: "Can you find parts for older cars?", a: "We’ll try. Parts for older or less common models can take longer to find or may have limited options." },
  { q: "What details do you need?", a: "At minimum your car’s make, model, year and the part name. The chassis number or a photo of the old part makes matching more accurate." },
];
