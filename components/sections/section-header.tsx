import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, intro, align = "left", id }: { eyebrow?: string; title: string; intro?: ReactNode; align?: "left" | "center"; id?: string }) {
  return (
    <div className={`mb-10 lg:mb-12 ${align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[720px]"}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="h2">{title}</h2>
      {intro && <div className="lead muted mt-4">{intro}</div>}
    </div>
  );
}
