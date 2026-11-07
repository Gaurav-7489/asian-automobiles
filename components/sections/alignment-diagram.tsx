const panels = [
  { title: "Toe", desc: "Whether the wheels point slightly inwards or outwards when viewed from above.", view: "top" },
  { title: "Camber", desc: "Whether the wheels lean inwards or outwards at the top when viewed from the front.", view: "front" },
  { title: "Caster", desc: "The angle of the steering pivot, which helps the steering return to centre.", view: "side" },
] as const;

function Drawing({ view }: { view: (typeof panels)[number]["view"] }) {
  const s = { stroke: "currentColor", strokeWidth: 2, fill: "none" } as const;
  if (view === "top")
    return (<>
      <line x1="30" y1="60" x2="130" y2="60" {...s} strokeDasharray="4 4" />
      <rect x="22" y="30" width="16" height="44" rx="3" {...s} transform="rotate(-8 30 52)" />
      <rect x="122" y="30" width="16" height="44" rx="3" {...s} transform="rotate(8 130 52)" />
    </>);
  if (view === "front")
    return (<>
      <line x1="20" y1="96" x2="140" y2="96" {...s} />
      <rect x="28" y="30" width="18" height="64" rx="4" {...s} transform="rotate(-7 37 94)" />
      <rect x="114" y="30" width="18" height="64" rx="4" {...s} transform="rotate(7 123 94)" />
    </>);
  return (<>
    <line x1="20" y1="96" x2="140" y2="96" {...s} />
    <circle cx="80" cy="66" r="28" {...s} />
    <line x1="68" y1="18" x2="92" y2="110" {...s} className="text-amber-700" stroke="currentColor" />
  </>);
}

/** Toe / camber / caster explainer (spec 13 F3). Inline SVG with title and desc. */
export function AlignmentDiagram() {
  return (
    <ul className="mt-10 grid gap-6 sm:grid-cols-3">
      {panels.map((p) => (
        <li key={p.title} className="rounded-md border border-line-200 p-5">
          <svg viewBox="0 0 160 120" role="img" aria-labelledby={`d-${p.view}-t d-${p.view}-d`} className="h-28 w-full text-graphite-900">
            <title id={`d-${p.view}-t`}>{p.title}</title>
            <desc id={`d-${p.view}-d`}>{p.desc}</desc>
            <Drawing view={p.view} />
          </svg>
          <h3 className="mt-4 font-display font-semibold">{p.title}</h3>
          <p className="muted mt-1 text-[15px]">{p.desc}</p>
        </li>
      ))}
    </ul>
  );
}
