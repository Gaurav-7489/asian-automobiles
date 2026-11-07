import type { Section, Service } from "@/content/services";
import { Icon } from "@/components/ui/icon";
import { Checklist, DotList } from "@/components/ui/checklist";
import { DataTable } from "@/components/ui/data-table";
import { Stepper } from "@/components/ui/stepper";
import { Callout } from "@/components/ui/callout";
import { ButtonLink, CallButton, WhatsappButton } from "@/components/ui/button";
import { AlignmentDiagram } from "@/components/sections/alignment-diagram";

function Wrap({ children, warm, narrow }: { children: React.ReactNode; warm?: boolean; narrow?: boolean }) {
  return (
    <section className={`section-tight ${warm ? "bg-warm-50" : ""}`}>
      <div className="container-x"><div className={narrow ? "max-w-[880px]" : ""}>{children}</div></div>
    </section>
  );
}

/** Renders a service page's typed section list (spec 22.4). */
export function ServiceSection({ s, service }: { s: Section; service: Service }) {
  switch (s.type) {
    case "prose":
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          <div className="lead muted mt-5 space-y-4">{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          {s.link && <div className="mt-5"><ButtonLink href={s.link.href} variant="text">{s.link.label}</ButtonLink></div>}
        </Wrap>
      );
    case "cards":
      return (
        <Wrap warm={s.tone === "warm"}>
          <h2 className="h2 max-w-[720px]">{s.heading}</h2>
          {s.intro && <p className="lead muted mt-4 max-w-[720px]">{s.intro}</p>}
          <ul className={`mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${s.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.items.map((it) => (
              <li key={it.title}>
                {it.icon && <Icon name={it.icon} className="size-7 text-amber-700" />}
                <h3 className="mt-3 font-display text-lg font-semibold">{it.title}</h3>
                <p className="muted mt-1.5 text-[15px]">{it.text}</p>
              </li>
            ))}
          </ul>
          {s.note && <p className="muted mt-10 text-[15px]">{s.note}</p>}
        </Wrap>
      );
    case "checklist":
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          {s.intro && <p className="muted mt-4">{s.intro}</p>}
          <div className="mt-8"><Checklist items={s.items} columns={s.columns} /></div>
          {s.footnote && <p className="muted mt-6 text-sm">{s.footnote}</p>}
        </Wrap>
      );
    case "list":
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          {s.intro && <p className="muted mt-4">{s.intro}</p>}
          <div className="mt-8"><DotList items={s.items} /></div>
          {s.link && <div className="mt-6"><ButtonLink href={s.link.href} variant="text">{s.link.label}</ButtonLink></div>}
        </Wrap>
      );
    case "table":
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          {s.intro && <p className="lead muted mt-4">{s.intro}</p>}
          <div className="mt-8"><DataTable caption={s.caption} columns={s.columns} rows={s.rows} stack={s.columns[0] !== ""} /></div>
          {s.note && <p className="muted mt-4 text-sm">{s.note}</p>}
        </Wrap>
      );
    case "steps":
      return (
        <Wrap warm>
          <h2 className="h2 mb-10">{s.heading}</h2>
          <Stepper items={s.items} />
        </Wrap>
      );
    case "callout":
      return (
        <section className="pb-4 pt-0">
          <div className="container-x"><div className="max-w-[880px]"><Callout title={s.title} text={s.text} variant={s.variant} /></div></div>
        </section>
      );
    case "diagram":
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          <p className="lead muted mt-5">{s.text}</p>
          <AlignmentDiagram />
        </Wrap>
      );
    case "inlineCta":
      return (
        <Wrap narrow>
          <div className="rounded-md border border-line-200 p-6 lg:p-10">
            <h2 className="h2">{s.heading}</h2>
            <p className="muted mt-4">{s.text}</p>
            <div className="mt-6"><CallButton label={s.label} position="inline_cta" className="w-full sm:w-auto" /></div>
          </div>
        </Wrap>
      );
    case "photoTips":
      return (
        <Wrap warm narrow>
          <h2 className="h2">{s.heading}</h2>
          <p className="lead muted mt-4">{s.text}</p>
          <ol className="mt-6 list-decimal space-y-2 pl-5">{s.items.map((t) => <li key={t}>{t}</li>)}</ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsappButton label="Send Photos on WhatsApp" messageKey={service.hero.whatsappKey} position="photo_tips" variant="primary" />
            <CallButton position="photo_tips" variant="secondary" />
          </div>
        </Wrap>
      );
    case "treatments": {
      const list = service.detailingTreatments ?? [];
      return (
        <Wrap narrow>
          <h2 className="h2">{s.heading}</h2>
          {list.length ? (
            <dl className="mt-6 divide-y divide-line-200 border-y border-line-200">
              {list.map((t) => (<div key={t.name} className="py-4"><dt className="font-semibold">{t.name}</dt><dd className="muted">{t.text}</dd></div>))}
            </dl>
          ) : (
            <p className="lead muted mt-4">Detailing options vary. Call us to ask what’s available for your car.</p>
          )}
        </Wrap>
      );
    }
  }
}

