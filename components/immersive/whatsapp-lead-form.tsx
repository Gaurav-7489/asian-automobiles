"use client";

import { ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { businessFacts, phoneTel, whatsappLink, type LeadMode } from "@/lib/business-facts";
import { findService, serviceCatalog } from "@/lib/service-catalog";

/** Field limits, enforced by the inputs and again when the message is assembled. */
const limits = { name: 80, phone: 20, vehicle: 80, requirement: 120, quantity: 4, preferred: 60, extra: 1000 } as const;
type Field = keyof typeof limits;

/** Trim, drop control characters (keeping line breaks in the free-text field) and cap the length. */
function field(data: FormData, name: Field): string {
  const raw = data.get(name);
  if (typeof raw !== "string") return "";
  const cleaned = name === "extra" ? raw.replace(/[^\P{Cc}\n]/gu, "") : raw.replace(/\p{Cc}/gu, " ");
  return cleaned.trim().slice(0, limits[name]);
}

const modeCopy: Record<LeadMode, { eyebrow: string; title: string; helper: string; button: string }> = {
  service: {
    eyebrow: "SERVICE REQUEST",
    title: "Tell us the basics. We’ll take it from there.",
    helper: "You do not need workshop vocabulary. A simple description is enough.",
    button: "Continue on WhatsApp",
  },
  quote: {
    eyebrow: "QUOTE REQUEST",
    title: "Describe what needs attention.",
    helper: "For body damage, you can attach photos directly in WhatsApp after this message opens.",
    button: "Start quote on WhatsApp",
  },
  parts: {
    eyebrow: "PARTS ENQUIRY",
    title: "The right part starts with the right vehicle details.",
    helper: "Model, variant and year help avoid fitment guesswork.",
    button: "Check part availability",
  },
};

export function WhatsAppLeadForm({ mode: initialMode = "service", selectedService }: { mode?: LeadMode; selectedService?: string }) {
  const [serviceId, setServiceId] = useState(findService(selectedService)?.id ?? "");
  const [intent, setIntent] = useState(initialMode === "quote" ? "quote" : "service");
  const service = findService(serviceId);
  const mode: LeadMode = service?.mode === "parts"
    ? service.mode : intent === "quote" ? "quote" : service?.mode ?? "service";
  const copy = modeCopy[mode];
  const [opened, setOpened] = useState(false);
  const intro = mode === "parts"
    ? "Hello Asian Automobiles, I would like to check the availability of a spare part."
    : mode === "quote"
      ? "Hello Asian Automobiles, I'd like advice on a repair."
      : "Hello Asian Automobiles, I'd like to ask about my car.";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      intro,
      "",
      `Name: ${field(data, "name") || "-"}`,
      `Phone: ${field(data, "phone") || "-"}`,
      `Vehicle: ${field(data, "vehicle") || "-"}`,
      `Service: ${service?.title ?? "Not sure yet"}`,
      `Request: ${intent === "quote" ? "Quote" : "Service / availability enquiry"}`,
      `Requirement: ${field(data, "requirement") || service?.title || "Please guide me"}`,
    ];

    const preferred = field(data, "preferred");
    const quantity = field(data, "quantity");
    const extra = field(data, "extra");
    if (preferred) lines.push(`Preferred date / time: ${preferred}`);
    if (quantity) lines.push(`Quantity: ${quantity}`);
    if (extra) lines.push(`More detail: ${extra}`);
    if (mode === "quote") lines.push("", "I can attach reference / damage photos in WhatsApp.");

    const href = whatsappLink(lines.join("\n"));
    if (!href) return;
    setOpened(true);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="aa-v10-lead-shell">
      <div className="aa-v10-lead-copy">
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.helper}</p>
        <div className="aa-v10-lead-fallback">
          <MessageCircle size={17} />
          <span>WhatsApp: {businessFacts.phones.whatsappDisplay}</span>
        </div>
        <a href={phoneTel} className="aa-v10-text-action">
          <Phone size={15} /> Prefer a call? Talk to the workshop.
        </a>
      </div>

      <form className="aa-v10-lead-form" onSubmit={submit}>
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" placeholder="What should we call you?" maxLength={limits.name} required />
        </label>

        <label>
          <span>Phone</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="A number we can reach" maxLength={limits.phone} pattern="[\d\s+\(\)\-]{6,20}" title="Digits, spaces, +, - and brackets only" required />
        </label>

        <label>
          <span>Vehicle</span>
          <input name="vehicle" placeholder="Make + model, e.g. Hyundai i20" maxLength={limits.vehicle} required />
        </label>

        <label>
          <span>What do you need?</span>
          <select name="service" value={serviceId} onChange={(event) => { setServiceId(event.target.value); setOpened(false); }} required>
            <option value="" disabled>Choose the closest match</option>
            {serviceCatalog.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            <option value="unsure">Not sure yet</option>
          </select>
        </label>
        <label>
          <span>Request type</span>
          <select name="intent" value={intent} onChange={(event) => { setIntent(event.target.value); setOpened(false); }}>
            <option value="service">Service / availability enquiry</option>
            <option value="quote">Request a quote</option>
          </select>
        </label>
        {mode === "parts" && (
          <label>
            <span>Part needed</span>
            <input name="requirement" placeholder="Part name or description" maxLength={limits.requirement} required />
          </label>
        )}


        {mode === "parts" && (
          <label>
            <span>Quantity (optional)</span>
            <input name="quantity" inputMode="numeric" placeholder="e.g. 1" maxLength={limits.quantity} pattern="[0-9]{1,4}" />
          </label>
        )}

        {mode === "service" && (
          <label>
            <span>Preferred date / time</span>
            <input name="preferred" placeholder="Your preferred slot" maxLength={limits.preferred} />
          </label>
        )}

        <label className="aa-v10-form-wide">
          <span>{mode === "parts" ? "Vehicle / part details" : "Tell us what is happening"}</span>
          <textarea
            name="extra"
            maxLength={limits.extra}
            placeholder={
              mode === "parts"
                ? "Variant, model year, part number if known, or anything else useful."
                : "A short plain-language description is perfect."
            }
          />
        </label>

        <button type="submit" className="aa-v10-submit">
          <span>{opened ? "Open WhatsApp again" : copy.button}</span>
          {opened ? <Check size={17} /> : <ArrowUpRight size={17} />}
        </button>

        <small role="status">
          {opened && "WhatsApp handoff opened. "}This prepares your message and opens WhatsApp. Send the message in WhatsApp to complete your enquiry. The workshop must confirm any booking. No form data is stored on this website.
        </small>
      </form>
    </div>
  );
}
