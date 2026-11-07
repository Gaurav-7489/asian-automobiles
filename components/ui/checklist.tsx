import Link from "next/link";
import { Check } from "lucide-react";

export function Checklist({ items, columns = 1 }: { items: { text: string; href?: string }[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((it) => (
        <li key={it.text} className="flex gap-3">
          <Check className="mt-1 size-5 shrink-0 text-amber-700" strokeWidth={2} aria-hidden="true" />
          {it.href ? (
            <Link href={it.href} className="underline decoration-line-200 underline-offset-4 hover:decoration-amber-700">{it.text}</Link>
          ) : (
            <span>{it.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function DotList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-amber-700" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
