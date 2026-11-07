"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
        className="relative z-10 inline-flex size-11 items-center justify-center rounded-sm text-slate-600 hover:bg-warm-50 hover:text-graphite-900"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="size-[18px] text-success-600" aria-hidden="true" /> : <Copy className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </>
  );
}
