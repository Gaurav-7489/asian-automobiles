"use client";
import { useEffect, useState } from "react";

/** "Open now / Closed now" in Asia/Kolkata. Renders nothing without JS or confirmed hours. */
export function OpenNow({ days, opens, closes }: { days: number[]; opens: string; closes: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const now = `${get("hour")}:${get("minute")}`;
    setOpen(days.includes(day) && now >= opens && now < closes);
  }, [days, opens, closes]);
  if (open === null) return null;
  return <span className={`ml-3 rounded-sm px-2 py-0.5 text-xs font-semibold ${open ? "bg-success-600/10 text-success-600" : "bg-warm-50 text-slate-600"}`}>{open ? "Open now" : "Closed now"}</span>;
}
