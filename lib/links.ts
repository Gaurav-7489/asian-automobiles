import { addressOneLine, business, publishable } from "@/content/business";
import { whatsappMessages, type WhatsappKey } from "@/content/whatsappMessages";

/** tel: link in E.164 form, or null when the number may not be shown. */
export function telHref(fact = business.phonePrimary): string | null {
  const v = publishable(fact);
  return v ? `tel:${v.replace(/[^\d+]/g, "")}` : null;
}

/** Readable form: "+91 93490 02038" for mobiles, "0480 2828167" for the Irinjalakuda landline. */
export function displayPhone(fact = business.phonePrimary): string | null {
  const v = publishable(fact);
  if (!v) return null;
  const digits = v.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    const n = digits.slice(2);
    if (/^[6-9]/.test(n)) return `+91 ${n.slice(0, 5)} ${n.slice(5)}`;
    return `0${n.slice(0, 3)} ${n.slice(3)}`;
  }
  return v;
}

/** WhatsApp link with prefilled text. Never falls back to the phone number. */
export function waHref(key: WhatsappKey = "general", text?: string): string | null {
  const v = publishable(business.whatsapp);
  if (!v) return null;
  const message = text ?? whatsappMessages[key];
  return `https://wa.me/${v.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Verified Google Business Profile link, else a Maps search for the name and address. */
export function mapsHref(): string {
  return (
    publishable(business.mapsUrl) ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Asian Automobiles, ${addressOneLine}`)}`
  );
}

export function mailHref(subject = "Enquiry from website"): string | null {
  const v = publishable(business.email);
  return v ? `mailto:${v}?subject=${encodeURIComponent(subject)}` : null;
}

export const hasWhatsapp = () => publishable(business.whatsapp) !== null;
