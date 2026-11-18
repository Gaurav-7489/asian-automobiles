import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, CircleHelp } from "lucide-react";
import { MotionFaq } from "@/components/immersive/inner-page-experiences";
import { CallButton, type ActionTone } from "@/components/ui/action-link";
import { JsonLd } from "@/components/ui/json-ld";

/** Building blocks shared by the homepage and every inner page (`aa-v10-*` design language). */

export function SectionHead({
  eyebrow,
  title,
  copy,
  light = false,
  id,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
  id?: string;
}) {
  return (
    <div className={light ? "aa-v10-section-head is-light" : "aa-v10-section-head"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function FeatureCard({
  no,
  eyebrow,
  title,
  copy,
  icon,
  href,
}: {
  no: string;
  eyebrow: string;
  title: string;
  copy: string;
  icon?: ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="aa-v10-feature-meta">
        <span>{no}</span>
        <small>{eyebrow}</small>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {href && <ArrowUpRight className="aa-v10-feature-arrow" size={18} />}
    </>
  );

  return href ? (
    <Link href={href} className="aa-v10-feature-card">
      {body}
    </Link>
  ) : (
    <article className="aa-v10-feature-card">{body}</article>
  );
}

/** Closing call-to-action band at the end of a page. */
export function PageCTA({
  eyebrow,
  title,
  copy,
  headingId,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  headingId?: string;
  children: ReactNode;
}) {
  return (
    <section className="aa-v10-section aa-v10-endcap" aria-labelledby={headingId}>
      <div className="wrap aa-v10-endcap-grid">
        <div>
          <span className="eyebrow light">{eyebrow}</span>
          <h2 id={headingId}>{title}</h2>
        </div>
        <div>
          <p>{copy}</p>
          <div className="aa-v10-inline-actions">{children}</div>
        </div>
      </div>
    </section>
  );
}

export type QA = [question: string, answer: string];

/** FAQ accordion with FAQPage structured data for exactly the visible questions. */
export function FaqSection({
  title,
  items,
  eyebrow = "QUESTIONS",
  surface = "paper",
  headingId,
  callTone = "primary",
}: {
  title: string;
  items: QA[];
  eyebrow?: string;
  surface?: "paper" | "soft";
  headingId?: string;
  callTone?: ActionTone;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <section className={"aa-v10-section aa-v10-" + surface} aria-labelledby={headingId}>
      <div className="wrap aa-v10-faq-layout">
        <div className="aa-v10-faq-aside">
          <CircleHelp size={28} />
          <span>{eyebrow}</span>
          <h2 id={headingId}>{title}</h2>
          <p>Can’t see your question? Call the workshop with your car’s make, model and year.</p>
          <CallButton tone={callTone} />
        </div>
        <MotionFaq items={items.map(([question, answer]) => ({ question, answer }))} />
      </div>
      <JsonLd data={jsonLd} />
    </section>
  );
}

export function StackList({ items }: { items: [no: string, title: string, copy: string][] }) {
  return (
    <div className="aa-v10-stack-list">
      {items.map(([no, title, copy]) => (
        <div key={no}>
          <span>{no}</span>
          <div><b>{title}</b><p>{copy}</p></div>
          <ChevronRight size={17} />
        </div>
      ))}
    </div>
  );
}
