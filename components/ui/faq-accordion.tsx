import { Plus } from "lucide-react";
import type { Faq } from "@/content/services";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);

/** Native details/summary accordion; FAQPage JSON-LD for visible items only (spec 20.3.4). */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const visible = items.filter((f) => f.when !== false);
  if (!visible.length) return null;
  return (
    <>
      <div className="divide-y divide-line-200 border-y border-line-200">
        {visible.map((f) => (
          <details key={f.q} id={`faq-${slugify(f.q)}`} className="group" data-faq>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[17px] font-semibold lg:text-lg">{f.q}</h3>
              <Plus className="size-5 shrink-0 text-amber-700 transition-transform duration-200 group-open:rotate-45" strokeWidth={1.75} aria-hidden="true" />
            </summary>
            <p className="muted prose-w pb-5">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(visible)} />
    </>
  );
}
