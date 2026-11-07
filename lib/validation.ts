/**
 * Shared field schemas for the parts and contact forms (spec ch. 17 F6, 18 F10, 21.4).
 * Used on the client (blur + submit) and re-run by the /api/enquiry route handler.
 */

export type FormKind = "parts" | "contact";
export type Values = Record<string, string>;

export const CONSENT_VERSION = "2026-11-v1";
export const MIN_SUBMIT_MS = 3000;
const thisYear = new Date().getFullYear();

/** Accepts 10 digits or +91 followed by 10 digits, after stripping spaces and dashes. */
export function normalisePhone(raw: string): string | null {
  const v = raw.replace(/[\s-]/g, "");
  if (/^\d{10}$/.test(v)) return v;
  if (/^(\+91|91)\d{10}$/.test(v)) return v.slice(-10);
  if (/^0\d{10}$/.test(v)) return v.slice(1);
  return null;
}

type Rule = (v: string, all: Values) => string | null;
const len = (min: number, max: number, msg: string): Rule => (v) => (v.trim().length < min || v.trim().length > max ? msg : null);
const optionalMax = (max: number, msg: string): Rule => (v) => (v.length > max ? msg : null);

const common: Record<string, Rule> = {
  name: len(2, 80, "Please enter your name."),
  phone: (v) => (normalisePhone(v) ? null : "Please enter a valid phone number, e.g. 98765 43210."),
  consent: (v) => (v === "yes" ? null : "Please agree so we can contact you about your enquiry."),
};

export const schemas: Record<FormKind, Record<string, Rule>> = {
  parts: {
    ...common,
    make: len(2, 40, "Please enter your car’s make, e.g. Maruti Suzuki."),
    model: len(1, 40, "Please enter the model, e.g. Swift."),
    year: (v) => {
      const n = Number(v);
      return /^\d{4}$/.test(v) && n >= 1980 && n <= thisYear + 1 ? null : "Please enter a valid year.";
    },
    part: len(3, 120, "Please tell us which part you need."),
    details: optionalMax(1000, "Please keep this under 1,000 characters."),
  },
  contact: {
    ...common,
    email: (v) => (!v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "Please enter a valid email address."),
    topic: (v) => (v ? null : "Please choose an option."),
    vehicle: optionalMax(80, "Please keep this under 80 characters."),
    message: len(10, 1000, "Please tell us a little more (at least 10 characters)."),
  },
};

export function validateField(kind: FormKind, field: string, values: Values): string | null {
  const rule = schemas[kind][field];
  return rule ? rule(values[field] ?? "", values) : null;
}

export function validate(kind: FormKind, values: Values): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of Object.keys(schemas[kind])) {
    const e = validateField(kind, field, values);
    if (e) errors[field] = e;
  }
  return errors;
}

/** Plain-text message used for the WhatsApp handoff (Mode A) and email body (Mode B). */
export function composeMessage(kind: FormKind, v: Values): string {
  if (kind === "parts") {
    return [
      "Parts enquiry —",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      `Car: ${[v.make, v.model, v.year, v.variant].filter(Boolean).join(" ")}`,
      `Part: ${v.part}`,
      v.details ? `Details: ${v.details}` : "",
    ].filter(Boolean).join("\n");
  }
  return [
    "Website enquiry —",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email ? `Email: ${v.email}` : "",
    `Topic: ${v.topic}`,
    v.vehicle ? `Car: ${v.vehicle}` : "",
    `Message: ${v.message}`,
    v.preferred ? `Contact me by: ${v.preferred}` : "",
  ].filter(Boolean).join("\n");
}

export function subjectFor(kind: FormKind, v: Values) {
  return kind === "parts" ? `Parts enquiry – ${v.make} ${v.model} – ${v.part}` : `Website enquiry – ${v.topic}`;
}
