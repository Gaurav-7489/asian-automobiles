"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import { composeMessage, CONSENT_VERSION, MIN_SUBMIT_MS, validate, validateField, type FormKind, type Values } from "@/lib/validation";
import { track } from "@/lib/analytics";

export interface Field {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "select" | "textarea" | "radio" | "file";
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  inputMode?: "tel" | "numeric" | "email" | "text";
  datalist?: string[];
  maxLength?: number;
  row?: string;
  hint?: string;
}

interface Props {
  kind: FormKind;
  fields: Field[];
  mode: "whatsapp" | "endpoint";
  waBase: string | null; // https://wa.me/<digits>
  phoneDisplay: string | null;
  tel: string | null;
  /** Uses {name} and {phone} placeholders. */
  successText: string;
  partsLinkOnTopic?: boolean;
}

type State = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ kind, fields, mode, waBase, phoneDisplay, tel, successText, partsLinkOnTopic }: Props) {
  const [values, setValues] = useState<Values>(() => Object.fromEntries(fields.map((f) => [f.name, f.type === "radio" ? f.options?.[0] ?? "" : ""])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [started, setStarted] = useState(false);
  const startedAt = useRef(Date.now());
  const summary = useRef<HTMLDivElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = (n: string) => `${kind}-${n}`;
  const visible = fields.filter((f) => !(f.type === "file" && mode === "whatsapp"));

  const set = (name: string, v: string) => {
    if (!started) { setStarted(true); track("form_start", { form: kind }); }
    setValues((s) => ({ ...s, [name]: v }));
  };
  const blur = (name: string) => {
    const e = validateField(kind, name, values);
    setErrors((s) => {
      const n = { ...s };
      if (e) n[name] = e; else delete n[name];
      return n;
    });
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const all: Values = { ...values, consent: fd.get("consent") ? "yes" : "" };
    const errs = validate(kind, all);
    const file = fd.get("photo");
    if (file instanceof File && file.size > 0) {
      if (file.size > 5 * 1024 * 1024 || !file.type.startsWith("image/")) errs.photo = "Please choose an image under 5 MB.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      Object.keys(errs).forEach((f) => track("form_error", { form: kind, field: f }));
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    // Honeypot or too-fast submission: silently drop.
    if (fd.get("company") || Date.now() - startedAt.current < MIN_SUBMIT_MS) {
      setState("success");
      return;
    }
    if (mode === "whatsapp" && waBase) {
      window.open(`${waBase}?text=${encodeURIComponent(composeMessage(kind, all))}`, "_blank", "noopener");
      track("form_submit_success", { form: kind, mode });
      setState("success");
      requestAnimationFrame(() => successHeading.current?.focus());
      return;
    }
    setState("submitting");
    try {
      fd.set("kind", kind);
      fd.set("consentVersion", CONSENT_VERSION);
      fd.set("page", location.href);
      fd.set("elapsed", String(Date.now() - startedAt.current));
      Object.entries(all).forEach(([k, v]) => fd.set(k, v));
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit_success", { form: kind, mode });
      setState("success");
      requestAnimationFrame(() => successHeading.current?.focus());
    } catch {
      track("form_submit_failure", { form: kind });
      setState("error");
    }
  }

  if (state === "success")
    return (
      <div role="status" className="rounded-md border border-success-600/40 bg-white p-6 lg:p-8">
        <CheckCircle2 className="size-8 text-success-600" strokeWidth={1.5} aria-hidden="true" />
        <h3 ref={successHeading} tabIndex={-1} className="h3 mt-4 outline-none">
          {mode === "whatsapp" ? "WhatsApp is opening with your enquiry" : successText.replace("{name}", values.name).replace("{phone}", values.phone)}
        </h3>
        {mode === "whatsapp" && <p className="muted mt-2">Please check the message and press send in WhatsApp{kind === "parts" ? ", and attach a photo of the part if you have one" : ""}.</p>}
        {tel && <a href={tel} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-amber-500 px-5 font-semibold text-graphite-900"><Phone className="size-[18px]" aria-hidden="true" /> Call {phoneDisplay}</a>}
      </div>
    );

  const errList = Object.entries(errors);
  const input = (f: Field) => {
    const err = errors[f.name];
    const common = {
      id: id(f.name),
      name: f.name,
      "aria-invalid": err ? true : undefined,
      "aria-required": f.required || undefined,
      "aria-describedby": [f.hint && `${id(f.name)}-hint`, err && `${id(f.name)}-err`].filter(Boolean).join(" ") || undefined,
      className: `w-full rounded-sm border bg-white px-3.5 text-base ${err ? "border-error-600" : "border-grey-400"} focus:border-graphite-900`,
    };
    if (f.type === "textarea")
      return <textarea {...common} rows={4} maxLength={f.maxLength} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} onBlur={() => blur(f.name)} className={`${common.className} py-3`} />;
    if (f.type === "select")
      return (
        <select {...common} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} onBlur={() => blur(f.name)} className={`${common.className} h-12`}>
          <option value="">Choose…</option>
          {f.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
    if (f.type === "file") return <input {...common} type="file" accept="image/*" className="block w-full text-sm" />;
    return (
      <>
        <input {...common} type={f.type} inputMode={f.inputMode} autoComplete={f.autoComplete} list={f.datalist ? `${id(f.name)}-list` : undefined} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} onBlur={() => blur(f.name)} className={`${common.className} h-12`} />
        {f.datalist && <datalist id={`${id(f.name)}-list`}>{f.datalist.map((d) => <option key={d} value={d} />)}</datalist>}
      </>
    );
  };

  const fieldBlock = (f: Field) => {
    const err = errors[f.name];
    if (f.type === "radio")
      return (
        <fieldset key={f.name}>
          <legend className="mb-2 font-medium">{f.label}</legend>
          <div className="flex flex-wrap gap-6">
            {f.options?.map((o) => (
              <label key={o} className="flex min-h-11 items-center gap-2">
                <input type="radio" name={f.name} value={o} checked={values[f.name] === o} onChange={() => set(f.name, o)} className="size-5 accent-amber-700" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      );
    return (
      <div key={f.name}>
        <label htmlFor={id(f.name)} className="mb-1.5 block font-medium">
          {f.label}
          {f.required && <><span aria-hidden="true" className="text-error-600"> *</span><span className="sr-only"> (required)</span></>}
        </label>
        {f.hint && <p id={`${id(f.name)}-hint`} className="muted mb-1.5 text-sm">{f.hint}</p>}
        {input(f)}
        {f.name === "details" && <p className="muted mt-1 text-right text-xs" aria-live="polite">{(values.details ?? "").length} / 1,000</p>}
        {err && <p id={`${id(f.name)}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error-600"><AlertCircle className="size-4" aria-hidden="true" />{err}</p>}
        {partsLinkOnTopic && f.name === "topic" && values.topic === "Spare parts" && (
          <p className="mt-2 text-sm">For parts, our <Link href="/spare-parts#parts-form" className="text-amber-700 underline">parts enquiry form</Link> asks for the details we need.</p>
        )}
      </div>
    );
  };

  // Group fields that share a row (make/model/year on one row of three on desktop).
  const rows: Field[][] = [];
  visible.forEach((f) => {
    const last = rows.at(-1);
    if (f.row && last?.[0]?.row === f.row) last.push(f);
    else rows.push([f]);
  });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-5">
      <p className="muted text-sm">Fields marked <span className="text-error-600">*</span> are required.</p>
      {errList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="rounded-md border border-error-600 bg-white p-4 outline-none">
          <p className="font-semibold text-error-600">Please check {errList.length === 1 ? "this field" : `these ${errList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errList.map(([f, m]) => <li key={f}><a href={`#${id(f)}`} className="underline">{m}</a></li>)}
          </ul>
        </div>
      )}
      {state === "error" && (
        <div role="alert" className="rounded-md border border-error-600 bg-white p-4 text-sm">
          Sorry, your enquiry couldn’t be sent. Please try again{phoneDisplay ? ` or call us on ${phoneDisplay}` : ""}.
        </div>
      )}
      {rows.map((r, i) => (r.length > 1 ? <div key={i} className="grid gap-5 lg:grid-cols-3">{r.map(fieldBlock)}</div> : fieldBlock(r[0])))}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company <input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label className="flex gap-3">
          <input type="checkbox" name="consent" id={id("consent")} aria-required="true" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${id("consent")}-err` : undefined} className="mt-1 size-5 shrink-0 accent-amber-700" />
          <span className="text-[15px]">
            I agree that Asian Automobiles may use these details to respond to my enquiry, as described in the <Link href="/privacy-policy" className="text-amber-700 underline">Privacy Policy</Link>.
            <span aria-hidden="true" className="text-error-600"> *</span>
          </span>
        </label>
        {errors.consent && <p id={`${id("consent")}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error-600"><AlertCircle className="size-4" aria-hidden="true" />{errors.consent}</p>}
      </div>

      {mode === "whatsapp" && <p className="muted text-sm">WhatsApp will open with your enquiry.{kind === "parts" ? " Please attach your photo in the chat before sending." : ""}</p>}
      <button type="submit" disabled={state === "submitting"} className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-amber-500 px-6 font-semibold text-graphite-900 transition-colors hover:bg-amber-700 hover:text-white disabled:opacity-60 sm:w-auto">
        {state === "submitting" ? <><Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…</> : mode === "whatsapp" ? "Send on WhatsApp" : "Send Enquiry"}
      </button>
    </form>
  );
}
