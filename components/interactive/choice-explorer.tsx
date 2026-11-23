"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

export type ExplorerItem = {
  id: string;
  label: string;
  sub?: string;
  title: string;
  copy: string;
  chips?: string[];
  image?: string;
  href?: string;
  hrefLabel?: string;
};

/**
 * Pick an option, read about it. Buttons with aria-pressed drive one live panel; every
 * option's text is reachable by keyboard and touch, and nothing depends on hover.
 * Photos are stacked and cross-faded so switching never waits on a network request.
 */
export function ChoiceExplorer({
  items,
  label,
  tone = "light",
  note,
}: {
  items: ExplorerItem[];
  /** Accessible name for the group of choices. */
  label: string;
  tone?: "light" | "dark";
  note?: string;
}) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = items[active];
  const images = items.filter((item) => item.image);

  return (
    <div className={"aa-explorer aa-explorer--" + tone + (images.length ? " has-media" : "")}>
      <div className="aa-explorer__choices" role="group" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === active}
            aria-controls={panelId}
            onClick={() => setActive(index)}
          >
            <b>{item.label}</b>
            {item.sub && <small>{item.sub}</small>}
          </button>
        ))}
      </div>

      <div className="aa-explorer__panel" id={panelId} aria-live="polite">
        {images.length > 0 && (
          <div className="aa-explorer__media" aria-hidden="true">
            {items.map((item, index) =>
              item.image ? (
                <Image
                  key={item.id}
                  src={item.image}
                  alt=""
                  fill
                  quality={72}
                  sizes="(max-width: 899px) 100vw, 56vw"
                  className={index === active ? "is-active" : ""}
                />
              ) : null,
            )}
          </div>
        )}
        <div className="aa-explorer__copy" key={current.id}>
          <h3>{current.title}</h3>
          <p>{current.copy}</p>
          {current.chips && (
            <ul className="aa-chips">
              {current.chips.map((chip) => <li key={chip}>{chip}</li>)}
            </ul>
          )}
          {note && <p className="aa-explorer__note">{note}</p>}
          {current.href && (
            <Link className="aa-link" href={current.href}>{current.hrefLabel ?? "Ask about this"}</Link>
          )}
        </div>
      </div>
    </div>
  );
}
