import Image from "next/image";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { CallButton, type ActionTone } from "@/components/ui/action-link";
import { JsonLd } from "@/components/ui/json-ld";

/** Building blocks shared by the homepage and every inner page. All server-rendered. */

export function SectionHead({
  title,
  copy,
  label,
  id,
  className = "",
}: {
  title: ReactNode;
  copy?: ReactNode;
  /** Optional technical label: only when it carries information the heading does not. */
  label?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={"aa-section-head " + className}>
      {label && <span className="aa-label">{label}</span>}
      <h2 id={id}>{title}</h2>
      {copy && <p className="aa-lead">{copy}</p>}
    </div>
  );
}

/**
 * The "job card": ruled rows of a heading and a description, like the workshop's own
 * paperwork. Not numbered, because the items are not a sequence.
 */
export function SpecList({ items, className = "" }: { items: [title: string, copy: string][]; className?: string }) {
  return (
    <dl className={"aa-spec " + className}>
      {items.map(([title, copy]) => (
        <div key={title}>
          <dt>{title}</dt>
          <dd>{copy}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A real sequence: numbered, joined by the calibration scale. */
export function Steps({ items, className = "" }: { items: { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={"aa-steps " + className} style={{ "--count": items.length } as React.CSSProperties}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="aa-steps__no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Closing call-to-action at the end of a page: a photograph with the next step over it. */
export function PageCTA({
  title,
  copy,
  headingId,
  image = "/images/photos/hero-workshop.jpg",
  children,
}: {
  title: string;
  copy: string;
  headingId?: string;
  image?: string;
  children: ReactNode;
}) {
  return (
    <section className="aa-cta is-inverse" aria-labelledby={headingId}>
      <Image className="aa-cta__photo" src={image} alt="" fill quality={68} sizes="100vw" />
      <div className="wrap aa-cta__inner">
        <h2 id={headingId}>{title}</h2>
        <div className="aa-cta__side">
          <p>{copy}</p>
          <div className="aa-actions">{children}</div>
        </div>
      </div>
    </section>
  );
}

export type QA = [question: string, answer: string];

/** Native disclosure list: no JavaScript, keyboard accessible, answers present in the HTML. */
export function Disclosures({ items, openFirst = true }: { items: QA[]; openFirst?: boolean }) {
  return (
    <div className="aa-faq">
      {items.map(([question, answer], index) => (
        <details key={question} open={openFirst && index === 0}>
          <summary>
            <span>{question}</span>
            <Plus size={20} aria-hidden="true" />
          </summary>
          <div className="aa-faq__answer"><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}

/** FAQ with FAQPage structured data for exactly the visible questions. */
export function FaqSection({
  title,
  items,
  surface = "canvas",
  headingId,
  callTone = "dark",
}: {
  title: string;
  items: QA[];
  surface?: "canvas" | "alt";
  headingId?: string;
  callTone?: ActionTone;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <section className={"section surface-" + surface} aria-labelledby={headingId}>
      <div className="wrap aa-faq-layout">
        <div className="aa-faq-layout__aside">
          <h2 id={headingId}>{title}</h2>
          <p>Can’t see your question? Call the workshop with your car’s make, model and year.</p>
          <CallButton tone={callTone} />
        </div>
        <Disclosures items={items} />
      </div>
      <JsonLd data={jsonLd} />
    </section>
  );
}

/** A boxed warning for safety-critical advice. */
export function Note({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="aa-note" role="note">
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      {action}
    </div>
  );
}
