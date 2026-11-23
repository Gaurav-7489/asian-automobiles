"use client";

import Link from "next/link";
import { useId, useState } from "react";

export type TyreMode = "toe" | "offset" | "camber" | "even" | "edge" | "patch";

export type TyreState = {
  id: string;
  label: string;
  sub: string;
  title: string;
  copy: string;
  readoutLabel: string;
  readout: string;
  mode: TyreMode;
};

/** Front view of a tyre tread with the selected alignment angle or wear pattern drawn on it. */
function TyreDrawing({ mode, label }: { mode: TyreMode; label: string }) {
  const uid = useId().replace(/:/g, "");
  const clip = "tyre-clip-" + uid;
  const rubber = "tyre-rubber-" + uid;
  return (
    <svg className={"aa-tyre aa-tyre--" + mode} viewBox="0 0 700 620" role="img" aria-label={label}>
      <defs>
        <linearGradient id={rubber} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14191e" />
          <stop offset=".2" stopColor="#27333b" />
          <stop offset=".8" stopColor="#27333b" />
          <stop offset="1" stopColor="#14191e" />
        </linearGradient>
        <clipPath id={clip}>
          <rect x="202" y="58" width="296" height="474" rx="122" />
        </clipPath>
      </defs>

      <ellipse className="aa-tyre__ground" cx="350" cy="548" rx="168" ry="22" />
      <rect x="202" y="58" width="296" height="474" rx="122" fill={`url(#${rubber})`} />
      <rect className="aa-tyre__face" x="222" y="70" width="256" height="450" rx="105" />

      <g clipPath={`url(#${clip})`}>
        {Array.from({ length: 10 }).map((_, row) => {
          const y = 82 + row * 44;
          return (
            <g key={row} className="aa-tyre__groove">
              <path d={`M208 ${y} L262 ${y + 18} L291 ${y + 8}`} />
              <path d={`M492 ${y} L438 ${y + 18} L409 ${y + 8}`} />
              <path d={`M276 ${y + 28} L322 ${y + 9} L350 ${y + 24} L378 ${y + 9} L424 ${y + 28}`} />
            </g>
          );
        })}
        <g className="aa-tyre__channel">
          <line x1="292" y1="58" x2="292" y2="532" />
          <line x1="350" y1="58" x2="350" y2="532" />
          <line x1="408" y1="58" x2="408" y2="532" />
        </g>
        {mode === "edge" && <rect className="aa-tyre__wear" x="222" y="70" width="56" height="450" />}
        {mode === "camber" && <rect className="aa-tyre__wear" x="222" y="70" width="44" height="450" />}
        {mode === "patch" && (
          <>
            <ellipse className="aa-tyre__wear" cx="294" cy="202" rx="54" ry="78" />
            <ellipse className="aa-tyre__wear" cx="405" cy="390" rx="48" ry="68" />
          </>
        )}
      </g>

      <line className="aa-tyre__ref" x1="350" y1="36" x2="350" y2="556" />
      <line className="aa-tyre__ref" x1="160" y1="298" x2="540" y2="298" />

      {mode === "toe" && <line className="aa-tyre__measure" x1="350" y1="70" x2="392" y2="520" />}
      {mode === "offset" && <line className="aa-tyre__measure" x1="350" y1="76" x2="370" y2="520" />}
      {mode === "camber" && <line className="aa-tyre__measure" x1="350" y1="72" x2="320" y2="522" />}
      {mode === "even" && <line className="aa-tyre__measure" x1="238" y1="298" x2="462" y2="298" />}
    </svg>
  );
}

/**
 * Wheel alignment and tyre wear guide: choose a symptom, see it drawn on the tread.
 * Illustrative only; the readouts are labelled as examples, not measurements.
 */
export function TyreGuide({
  states,
  label,
  href,
}: {
  states: TyreState[];
  label: string;
  href: string;
}) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = states[active];

  return (
    <div className="aa-tyre-guide">
      <figure className="aa-tyre-guide__stage">
        <TyreDrawing mode={current.mode} label={"Illustration: " + current.title} />
        <figcaption className="aa-tyre-guide__scale" aria-hidden="true">
          <span>Inner</span><span>Centre</span><span>Outer</span>
        </figcaption>
      </figure>

      <div className="aa-tyre-guide__side">
        <div className="aa-tyre-guide__choices" role="group" aria-label={label}>
          {states.map((state, index) => (
            <button key={state.id} type="button" aria-pressed={index === active} aria-controls={panelId} onClick={() => setActive(index)}>
              <b>{state.label}</b>
              <small>{state.sub}</small>
            </button>
          ))}
        </div>
        <div className="aa-tyre-guide__copy" id={panelId} aria-live="polite">
          <div key={current.id} className="aa-tyre-guide__swap">
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <dl className="aa-tyre-guide__readout">
              <dt>{current.readoutLabel}</dt>
              <dd>{current.readout}</dd>
            </dl>
          </div>
          <Link className="aa-link" href={href}>Ask about this</Link>
        </div>
      </div>
    </div>
  );
}
