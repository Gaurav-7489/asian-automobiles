"use client";

import { ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { businessFacts } from "@/lib/business-facts";

import { findService, serviceCatalog, type LeadMode } from "@/lib/service-catalog";

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
  accident: {
    eyebrow: "ACCIDENT ASSISTANCE",
    title: "Start with the vehicle and visible damage.",
    helper: "Keep it simple. Tell us what happened, then attach damage photos in WhatsApp.",
    button: "Start accident enquiry",
  },
  parts: {
    eyebrow: "PARTS ENQUIRY",
    title: "The right part starts with the right vehicle details.",
    helper: "Model, variant and year help avoid fitment guesswork.",
    button: "Check part availability",
  },
};

export function WhatsAppLeadForm({ mode: initialMode = "service", selectedService, detail = "", quote = false }: { mode?: LeadMode; selectedService?: string; detail?: string; quote?: boolean }) {
  const [serviceId, setServiceId] = useState(selectedService ?? "");
  const [intent, setIntent] = useState(quote || initialMode === "quote" ? "quote" : "service");
  const service = findService(serviceId);
  const mode: LeadMode = service?.mode === "parts" || service?.mode === "accident"
    ? service.mode : intent === "quote" ? "quote" : service?.mode ?? "service";
  const copy = modeCopy[mode];
  const [opened, setOpened] = useState(false);
  const intro = mode === "parts"
    ? "Hello Asian Automobiles, I would like to check the availability of a spare part."
    : mode === "accident"
      ? "Hello Asian Automobiles, I would like help with an accident / body-repair enquiry."
      : mode === "quote"
        ? "Hello Asian Automobiles, I would like to request a repair quote."
        : "Hello Asian Automobiles, I would like to book a vehicle service.";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      intro,
      "",
      `Name: ${data.get("name") || "-"}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Vehicle: ${data.get("vehicle") || "-"}`,
      `Service: ${service?.title ?? "Not sure yet"}`,
      `Request: ${intent === "quote" ? "Quote" : "Service / availability enquiry"}`,
      `Requirement: ${data.get("requirement") || service?.title || "Please guide me"}`,
    ];

    const preferred = data.get("preferred");
    const extra = data.get("extra");
    const insurer = data.get("insurer");
    const quantity = data.get("quantity");

    if (preferred) lines.push(`Preferred date / time: ${preferred}`);
    if (insurer) lines.push(`Insurer (if applicable): ${insurer}`);
    if (quantity) lines.push(`Quantity: ${quantity}`);
    if (extra) lines.push(`More detail: ${extra}`);

    if (mode === "quote" || mode === "accident") {
      lines.push("", "I can attach reference / damage photos in WhatsApp.");
    }

    const href = `https://wa.me/${businessFacts.phones.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
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
        <a href={"tel:" + businessFacts.phones.primaryHref} className="aa-v10-text-action">
          <Phone size={15} /> Prefer a call? Talk to the workshop.
        </a>
      </div>

      <form className="aa-v10-lead-form" onSubmit={submit}>
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" placeholder="What should we call you?" required />
        </label>

        <label>
          <span>Phone</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="A number we can reach" required />
        </label>

        <label>
          <span>Vehicle</span>
          <input name="vehicle" placeholder="Make + model, e.g. Hyundai i20" required />
        </label>

        <label>
          <span>What do you need?</span>
          <select name="service" value={serviceId} onChange={(event) => { setServiceId(event.target.value); if (findService(event.target.value)?.mode === "quote") setIntent("quote"); setOpened(false); }} required>
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
            <input name="requirement" defaultValue={selectedService === "spare-parts" ? detail : ""} placeholder="Part name or description" required />
          </label>
        )}

        {mode === "accident" && (
          <label>
            <span>Insurer (optional)</span>
            <input name="insurer" placeholder="Only if this is an insurance case" />
          </label>
        )}

        {mode === "parts" && (
          <label>
            <span>Quantity (optional)</span>
            <input name="quantity" inputMode="numeric" placeholder="e.g. 1" />
          </label>
        )}

        {mode === "service" && (
          <label>
            <span>Preferred date / time</span>
            <input name="preferred" placeholder="Your preferred slot" />
          </label>
        )}

        <label className="aa-v10-form-wide">
          <span>{mode === "parts" ? "Vehicle / part details" : "Tell us what is happening"}</span>
          <textarea
            name="extra"
            defaultValue={selectedService !== "spare-parts" ? detail : ""}
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
