import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RelatedServices({ items }: { items: { slug: string; name: string; text: string; href: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="section-tight bg-warm-50" aria-labelledby="related-heading">
      <div className="container-x">
        <h2 id="related-heading" className="h3 mb-6">Related services</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {items.map((r) => (
            <li key={r.slug}>
              <Link href={r.href} className="group flex h-full items-center justify-between gap-4 rounded-md border border-line-200 bg-white p-5 transition-colors hover:border-amber-500">
                <span>
                  <span className="block font-display font-semibold">{r.name}</span>
                  <span className="muted mt-1 block text-sm">{r.text}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
