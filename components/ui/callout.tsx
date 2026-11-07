import { AlertTriangle, Info } from "lucide-react";

export function Callout({ title, text, variant = "info" }: { title?: string; text: string; variant?: "info" | "caution" }) {
  const Icon = variant === "caution" ? AlertTriangle : Info;
  return (
    <div role="note" className={`flex gap-4 rounded-md border-l-[3px] p-5 lg:p-6 ${variant === "caution" ? "border-amber-700 bg-warm-50" : "border-graphite-900 bg-warm-50"}`}>
      <Icon className={`mt-0.5 size-6 shrink-0 ${variant === "caution" ? "text-amber-700" : "text-graphite-900"}`} strokeWidth={1.5} aria-hidden="true" />
      <div className="prose-w">
        {title && <p className="font-semibold">{title}</p>}
        <p className={title ? "mt-1" : ""}>{text}</p>
      </div>
    </div>
  );
}
