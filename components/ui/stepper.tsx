/** Numbered steps: vertical on mobile, grid on tablet, horizontal row on desktop. Static HTML. */
export function Stepper({ items }: { items: { title: string; text: string }[] }) {
  const cols = items.length >= 5 ? "lg:grid-cols-6" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol className={`grid gap-8 sm:grid-cols-2 md:grid-cols-3 ${cols} lg:gap-6`}>
      {items.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 sm:block">
          <span className="font-display text-3xl font-bold leading-none text-amber-700 sm:mb-3 sm:block">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-display text-[17px] font-semibold">{s.title}</h3>
            <p className="muted mt-1 text-[15px]">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
