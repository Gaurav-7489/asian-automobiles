import { NextResponse } from "next/server";
import { composeMessage, MIN_SUBMIT_MS, subjectFor, validate, type FormKind } from "@/lib/validation";

/** Mode B form endpoint (spec 21.4): re-validates, drops spam, emails the enquiry via Resend. */
export async function POST(req: Request) {
  const to = process.env.ENQUIRY_TO_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (process.env.FORM_MODE !== "endpoint" || !to || !key) return NextResponse.json({ ok: false }, { status: 503 });

  const fd = await req.formData();
  const kind = fd.get("kind") === "parts" ? "parts" : ("contact" as FormKind);
  const v = Object.fromEntries([...fd.entries()].filter(([, x]) => typeof x === "string")) as Record<string, string>;
  if (v.company || Number(v.elapsed) < MIN_SUBMIT_MS) return NextResponse.json({ ok: true }); // silently dropped
  if (Object.keys(validate(kind, v)).length) return NextResponse.json({ ok: false }, { status: 422 });

  const attachments: { filename: string; content: string }[] = [];
  const photo = fd.get("photo");
  if (kind === "parts" && photo instanceof File && photo.size > 0) {
    if (photo.size > 5 * 1024 * 1024 || !photo.type.startsWith("image/")) return NextResponse.json({ ok: false }, { status: 422 });
    attachments.push({ filename: photo.name || "part-photo.jpg", content: Buffer.from(await photo.arrayBuffer()).toString("base64") });
  }

  const ist = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const text = `${composeMessage(kind, v)}\n\nPage: ${v.page}\nReceived: ${ist} IST\nConsent version: ${v.consentVersion}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to: [to],
      subject: subjectFor(kind, v),
      text,
      reply_to: v.email || undefined,
      attachments: attachments.length ? attachments : undefined,
    }),
  });
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false }, { status: 502 });
}
