import { business, publishable } from "@/content/business";
import { services } from "@/content/services";
import type { Field } from "@/components/forms/enquiry-form";

const thisYear = new Date().getFullYear();

export const partsFields: Field[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
  { name: "make", label: "Vehicle make", type: "text", required: true, row: "car", datalist: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota", "Honda", "Kia", "Renault", "Nissan", "Volkswagen", "Skoda", "Ford", "Chevrolet", "MG"] },
  { name: "model", label: "Vehicle model", type: "text", required: true, row: "car" },
  { name: "year", label: "Year of manufacture", type: "select", required: true, row: "car", options: Array.from({ length: 41 }, (_, i) => String(thisYear + 1 - i)) },
  { name: "variant", label: "Fuel / variant", type: "select", options: ["Petrol", "Diesel", "CNG", "Hybrid", "Electric", "Not sure"] },
  { name: "part", label: "Part name or description", type: "text", required: true },
  { name: "details", label: "Additional details", type: "textarea", maxLength: 1000, hint: "Part number, chassis number (optional), or anything else that helps." },
  { name: "photo", label: "Photo of the part", type: "file", hint: "Optional. One image, max 5 MB." },
];

export function contactFields(withWhatsapp: boolean): Field[] {
  return [
    { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
    { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
    { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
    { name: "topic", label: "What do you need help with?", type: "select", required: true, options: [...services.map((s) => s.name), "Spare parts", "Other"] },
    { name: "vehicle", label: "Car make and model", type: "text", maxLength: 80 },
    { name: "message", label: "Message", type: "textarea", required: true, maxLength: 1000 },
    { name: "preferred", label: "How should we contact you?", type: "radio", options: withWhatsapp ? ["Phone call", "WhatsApp"] : ["Phone call"] },
  ];
}

/**
 * Mode B (endpoint) only when explicitly configured with a working destination;
 * Mode A (WhatsApp handoff) when a WhatsApp number is confirmed; otherwise no form.
 */
export function formMode(): "endpoint" | "whatsapp" | null {
  if (process.env.FORM_MODE === "endpoint" && process.env.ENQUIRY_TO_EMAIL && process.env.RESEND_API_KEY) return "endpoint";
  return publishable(business.whatsapp) ? "whatsapp" : null;
}

export const waBase = () => {
  const v = publishable(business.whatsapp);
  return v ? `https://wa.me/${v.replace(/\D/g, "")}` : null;
};
