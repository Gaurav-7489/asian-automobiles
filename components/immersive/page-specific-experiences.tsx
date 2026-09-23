"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleAlert,
  Disc3,
  Fan,
  Gauge,
  PackageSearch,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const aaModuleImages = {
  service: [
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=78",
  ],
  wheel: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1700&q=78",
  tyre: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1700&q=78",
  parts: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=78",
  ],
  accident: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1500&q=78",
};

export function ServiceScanner() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const items = [
    { tag: "MAINTENANCE", title: "Service due", value: "01", note: "Fluids / filters / preventive checks", icon: Wrench },
    { tag: "SYMPTOM", title: "Noise or vibration", value: "02", note: "Describe when it happens", icon: Gauge },
    { tag: "HANDLING", title: "Steering / braking", value: "03", note: "Changes in feel deserve inspection", icon: Disc3 },
    { tag: "CHECK", title: "General inspection", value: "04", note: "Start broad when you are not sure", icon: Check },
  ];

  const current = items[active];
  const Icon = current.icon;

  return (
    <div className="aa-v11-service-scanner">
      <div className="aa-v11-scanner-screen">
        <div className="aa-v16-module-photo aa-v16-scanner-photo" aria-hidden="true">
          <Image key={active} src={aaModuleImages.service[active]} alt="" fill quality={74} sizes="(max-width: 900px) 100vw, 60vw" />
          <i />
        </div>
        <div className="aa-v11-scanner-grid" aria-hidden="true" />
        <div className="aa-v11-scanner-top">
          <span>VEHICLE / SERVICE INTAKE</span>
          <b>READY</b>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.value}
            className="aa-v11-scanner-focus"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: .3, ease }}
          >
            <Icon size={32} />
            <small>{current.tag}</small>
            <strong>{current.title}</strong>
            <p>{current.note}</p>
          </motion.div>
        </AnimatePresence>
        <div className="aa-v11-scanner-meter" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>

      <div className="aa-v11-scanner-menu">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.value}
            className={active === index ? "is-active" : ""}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span>{item.value}</span>
            <div><small>{item.tag}</small><b>{item.title}</b></div>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ClimateConsole() {
  const [mode, setMode] = useState(0);
  const reduce = useReducedMotion();
  const modes = [
    { label: "Weak cooling", temp: "24°", fan: 2, copy: "Cabin takes too long to cool." },
    { label: "Low airflow", temp: "20°", fan: 1, copy: "Air feels weak even with the fan up." },
    { label: "Normal target", temp: "18°", fan: 4, copy: "A reference state for the interface, not a service promise." },
  ];
  const current = modes[mode];

  return (
    <div className="aa-v11-climate-console">
      <div className="aa-v11-climate-main">
        <div className="aa-v11-climate-header">
          <span>CLIMATE CONTROL / DIAGNOSTIC VIEW</span>
          <Snowflake size={17} />
        </div>
        <div className="aa-v11-climate-display">
          <motion.strong
            key={current.temp}
            initial={reduce ? false : { opacity: 0, scale: .92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .32, ease }}
          >
            {current.temp}
          </motion.strong>
          <span>REFERENCE DISPLAY</span>
        </div>
        <div className="aa-v11-airflow" aria-hidden="true">
          {[1,2,3,4,5].map((n) => (
            <motion.i
              key={n}
              animate={reduce ? undefined : { scaleY: n <= current.fan ? 1 : .28, opacity: n <= current.fan ? 1 : .25 }}
              transition={{ duration: .3, delay: n * .025 }}
            />
          ))}
        </div>
        <div className="aa-v11-climate-note">
          <Fan size={17} />
          <p>{current.copy}</p>
        </div>
      </div>

      <div className="aa-v11-climate-modes">
        {modes.map((item, index) => (
          <button
            type="button"
            key={item.label}
            onPointerEnter={() => setMode(index)}
            onFocus={() => setMode(index)}
            onClick={() => setMode(index)}
            className={mode === index ? "is-active" : ""}
          >
            <span>0{index + 1}</span>
            <b>{item.label}</b>
            <ThermometerSnowflake size={17} />
          </button>
        ))}
      </div>
    </div>
  );
}

type TyreGraphicMode = "toe" | "offset" | "camber" | "even" | "edge" | "patch";

function FrontTyreGraphic({
  mode,
  label,
}: {
  mode: TyreGraphicMode;
  label: string;
}) {
  const conditionMode = mode === "even" || mode === "edge" || mode === "patch";

  return (
    <svg
      className={"aa-v22-front-tyre mode-" + mode}
      viewBox="0 0 700 620"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="aa-v22-rubber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#25282a" />
          <stop offset=".46" stopColor="#111315" />
          <stop offset="1" stopColor="#080a0c" />
        </linearGradient>
        <linearGradient id="aa-v22-shoulder" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#08090b" />
          <stop offset=".18" stopColor="#1e2123" />
          <stop offset=".82" stopColor="#1e2123" />
          <stop offset="1" stopColor="#08090b" />
        </linearGradient>
        <filter id="aa-v22-shadow" x="-30%" y="-20%" width="160%" height="170%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#000" floodOpacity=".2" />
        </filter>
        <clipPath id="aa-v22-clip">
          <rect x="202" y="58" width="296" height="474" rx="122" />
        </clipPath>
      </defs>

      <ellipse className="aa-v22-ground" cx="350" cy="548" rx="168" ry="24" />

      <g filter="url(#aa-v22-shadow)" className="aa-v22-tyre-shell">
        <rect x="202" y="58" width="296" height="474" rx="122" fill="url(#aa-v22-shoulder)" />
        <rect x="222" y="70" width="256" height="450" rx="105" fill="url(#aa-v22-rubber)" />

        <g clipPath="url(#aa-v22-clip)">
          {Array.from({ length: 10 }).map((_, row) => {
            const y = 82 + row * 44;
            return (
              <g key={row}>
                <path className="aa-v22-groove outer" d={`M208 ${y} L262 ${y + 18} L291 ${y + 8}`} />
                <path className="aa-v22-groove outer" d={`M492 ${y} L438 ${y + 18} L409 ${y + 8}`} />
                <path className="aa-v22-groove inner" d={`M276 ${y + 28} L322 ${y + 9} L350 ${y + 24} L378 ${y + 9} L424 ${y + 28}`} />
              </g>
            );
          })}

          <line className="aa-v22-channel" x1="292" y1="58" x2="292" y2="532" />
          <line className="aa-v22-channel" x1="350" y1="58" x2="350" y2="532" />
          <line className="aa-v22-channel" x1="408" y1="58" x2="408" y2="532" />

          {mode === "edge" && <rect className="aa-v22-wear edge" x="222" y="70" width="56" height="450" />}
          {mode === "patch" && (
            <>
              <ellipse className="aa-v22-wear patch patch-a" cx="294" cy="202" rx="54" ry="78" />
              <ellipse className="aa-v22-wear patch patch-b" cx="405" cy="390" rx="48" ry="68" />
            </>
          )}
          {mode === "camber" && <rect className="aa-v22-wear camber" x="222" y="70" width="44" height="450" />}
          {mode === "even" && <line className="aa-v22-even-line" x1="238" y1="298" x2="462" y2="298" />}
        </g>
      </g>

      <line className="aa-v22-reference vertical" x1="350" y1="42" x2="350" y2="548" />
      <line className="aa-v22-reference horizontal" x1="166" y1="298" x2="534" y2="298" />

      {mode === "toe" && (
        <>
          <line className="aa-v22-measure-line" x1="350" y1="70" x2="392" y2="520" />
          <path className="aa-v22-arc" d="M350 104 A78 78 0 0 1 371 109" />
          <text className="aa-v22-label" x="416" y="126">TOE +2.3 mm</text>
        </>
      )}

      {mode === "offset" && (
        <>
          <line className="aa-v22-measure-line" x1="350" y1="76" x2="370" y2="520" />
          <path className="aa-v22-arc" d="M350 108 A66 66 0 0 1 362 111" />
          <text className="aa-v22-label" x="398" y="128">OFFSET 4°</text>
        </>
      )}

      {mode === "camber" && (
        <>
          <line className="aa-v22-measure-line" x1="350" y1="72" x2="320" y2="522" />
          <path className="aa-v22-arc" d="M350 108 A68 68 0 0 0 334 113" />
          <line className="aa-v22-pointer" x1="242" y1="286" x2="128" y2="286" />
          <text className="aa-v22-label" x="54" y="278">INNER EDGE</text>
          <text className="aa-v22-sub" x="54" y="300">CAMBER -1.6°</text>
        </>
      )}

      {conditionMode && mode === "even" && (
        <>
          <line className="aa-v22-pointer" x1="478" y1="298" x2="558" y2="298" />
          <text className="aa-v22-label" x="570" y="302">EVEN</text>
        </>
      )}

      {conditionMode && mode === "edge" && (
        <>
          <line className="aa-v22-pointer" x1="244" y1="252" x2="128" y2="252" />
          <text className="aa-v22-label" x="56" y="246">EDGE</text>
          <text className="aa-v22-sub" x="56" y="266">CHECK</text>
        </>
      )}

      {conditionMode && mode === "patch" && (
        <>
          <line className="aa-v22-pointer" x1="430" y1="392" x2="548" y2="392" />
          <text className="aa-v22-label" x="560" y="386">PATCH</text>
          <text className="aa-v22-sub" x="560" y="406">WEAR</text>
        </>
      )}
    </svg>
  );
}

export function WheelGeometryLab() {
  const [active, setActive] = useState<"pull" | "center" | "wear">("pull");

  const states = {
    pull: {
      eyebrow: "PULLING",
      title: "Toe angle",
      copy: "The centre line helps show when the tyre points away from straight.",
      metric: "+2.3 mm",
      metricLabel: "TOE EXAMPLE",
      graphic: "toe" as const,
    },
    center: {
      eyebrow: "OFF-CENTRE",
      title: "Steering offset",
      copy: "The reference marker shows a small steering position offset.",
      metric: "4°",
      metricLabel: "OFFSET EXAMPLE",
      graphic: "offset" as const,
    },
    wear: {
      eyebrow: "UNEVEN WEAR",
      title: "Inner-edge wear",
      copy: "The highlighted tread edge shows where uneven tyre wear can appear.",
      metric: "-1.6°",
      metricLabel: "CAMBER EXAMPLE",
      graphic: "camber" as const,
    },
  } as const;

  const current = states[active];

  return (
    <div className="aa-v11-geometry-lab aa-v22-diagnostic-lab">
      <div className="aa-v22-visual-stage">
        <div className="aa-v22-stage-head">
          <span>WHEEL / ALIGNMENT VIEW</span>
          <b>FRONT TREAD</b>
        </div>

        <FrontTyreGraphic
          mode={current.graphic}
          label={"Front-facing tyre alignment illustration: " + current.title}
        />

        <div className="aa-v22-stage-scale" aria-hidden="true">
          <span>INNER</span><i /><span>CENTRE</span><i /><span>OUTER</span>
        </div>
      </div>

      <div className="aa-v22-copy-panel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .24, ease }}
          >
            <small>{current.eyebrow}</small>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>

            <div className="aa-v22-readout">
              <span>{current.metricLabel}</span>
              <b>{current.metric}</b>
              <small>ILLUSTRATIVE</small>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="aa-v22-tabs">
          <button type="button" aria-pressed={active === "pull"} onClick={() => setActive("pull")} className={active === "pull" ? "is-active" : ""}>
            <span>01</span><b>Pulling</b><small>Toe angle</small>
          </button>
          <button type="button" aria-pressed={active === "center"} onClick={() => setActive("center")} className={active === "center" ? "is-active" : ""}>
            <span>02</span><b>Off-centre</b><small>Steering offset</small>
          </button>
          <button type="button" aria-pressed={active === "wear"} onClick={() => setActive("wear")} className={active === "wear" ? "is-active" : ""}>
            <span>03</span><b>Uneven wear</b><small>Inner edge</small>
          </button>
        </div>
      </div>
    </div>
  );
}

export function TyreTreadLab() {
  const [active, setActive] = useState(0);

  const states = [
    {
      label: "EVEN",
      title: "Even-looking wear",
      note: "The tread is wearing consistently across the tyre surface.",
      metric: "GOOD",
      metricLabel: "WEAR PATTERN",
      graphic: "even" as const,
    },
    {
      label: "EDGE",
      title: "Edge-heavy wear",
      note: "More wear near one edge can be a reason to check tyre condition and wheel geometry.",
      metric: "EDGE",
      metricLabel: "CHECK AREA",
      graphic: "edge" as const,
    },
    {
      label: "PATCH",
      title: "Irregular wear",
      note: "Patchy wear can point to an uneven contact pattern that is worth inspecting.",
      metric: "PATCH",
      metricLabel: "CHECK AREA",
      graphic: "patch" as const,
    },
  ] as const;

  const current = states[active];

  return (
    <div className="aa-v22-diagnostic-lab">
      <div className="aa-v22-visual-stage">
        <div className="aa-v22-stage-head">
          <span>TYRE / CONDITION VIEW</span>
          <b>FRONT TREAD</b>
        </div>

        <FrontTyreGraphic
          mode={current.graphic}
          label={"Front tyre tread condition: " + current.title}
        />

        <div className="aa-v22-stage-scale" aria-hidden="true">
          <span>INNER</span><i /><span>CENTRE</span><i /><span>OUTER</span>
        </div>
      </div>

      <div className="aa-v22-copy-panel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .24, ease }}
          >
            <small>{current.label}</small>
            <h3>{current.title}</h3>
            <p>{current.note}</p>

            <div className="aa-v22-readout">
              <span>{current.metricLabel}</span>
              <b>{current.metric}</b>
              <small>VISUAL GUIDE</small>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="aa-v22-tabs">
          {states.map((state, index) => (
            <button
              type="button"
              key={state.label}
              aria-pressed={active === index}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <b>{state.label}</b>
              <small>{index === 0 ? "Balanced wear" : index === 1 ? "Shoulder wear" : "Irregular wear"}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PartsFinder() {
  const [active, setActive] = useState(0);
  const groups = [
    { label: "Maintenance", items: ["Filters", "Belts", "Mountings", "Service parts"] },
    { label: "Brakes", items: ["Pads", "Shoes", "Discs", "Hydraulic parts"] },
    { label: "Suspension", items: ["Bushes", "Tie rods", "Ball joints", "Related components"] },
    { label: "Electrical", items: ["Sensors", "Switches", "Relays", "Lighting"] },
    { label: "Fluids", items: ["Engine oil", "Coolant", "Brake fluid", "Other maintenance fluids"] },
  ];

  return (
    <div className="aa-v11-parts-finder">
      <div className="aa-v11-parts-index">
        <span>PARTS / CATEGORY INDEX</span>
        {groups.map((group, index) => (
          <button
            type="button"
            key={group.label}
            className={active === index ? "is-active" : ""}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            <b>{group.label}</b>
            <ArrowDownRight size={16} />
          </button>
        ))}
      </div>
      <div className="aa-v11-parts-stage">
        <div className="aa-v16-module-photo aa-v16-parts-photo" aria-hidden="true">
          <Image key={active} src={aaModuleImages.parts[active]} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 62vw" />
          <i />
        </div>
        <div className="aa-v11-parts-orbit" aria-hidden="true">
          <PackageSearch size={44} />
          <i /><i /><i />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={groups[active].label}
            className="aa-v11-parts-details"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: .3, ease }}
          >
            <small>0{active + 1} / CATEGORY</small>
            <h3>{groups[active].label}</h3>
            <div>
              {groups[active].items.map((item) => <span key={item}>{item}</span>)}
            </div>
            <p>Availability and exact fitment should be confirmed for the vehicle before travel.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ClaimDeck() {
  const [active, setActive] = useState(0);
  const cards = [
    ["ASSESS", "Vehicle damage", "Start with visible damage and the areas needing inspection."],
    ["DOCUMENT", "Useful photos", "Prepare relevant photos and repair details where required."],
    ["ESTIMATE", "Repair scope", "Clarify what work and components are involved."],
    ["COORDINATE", "Case-specific steps", "Insurer or approval steps vary by the actual case."],
    ["REPAIR", "Approved work", "Complete the agreed repair and final check."],
  ];

  return (
    <div className="aa-v11-claim-deck">
      <div className="aa-v11-claim-stack" aria-live="polite">
        {cards.map(([tag, title, copy], index) => {
          const offset = index - active;
          return (
            <motion.article
              key={tag}
              className={offset === 0 ? "is-active" : ""}
              animate={{
                x: Math.max(0, offset) * 14,
                y: Math.max(0, offset) * 14,
                scale: offset < 0 ? .96 : 1 - Math.max(0, offset) * .035,
                opacity: offset < 0 ? 0 : 1 - Math.max(0, offset) * .14,
              }}
              transition={{ duration: .34, ease }}
              style={{ zIndex: cards.length - Math.max(0, offset) }}
            >
              <ShieldCheck size={21} />
              <small>0{index + 1} / {tag}</small>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          );
        })}
      </div>
      <div className="aa-v11-claim-controls">
        {cards.map(([tag], index) => (
          <button type="button" key={tag} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
            <span>0{index + 1}</span><b>{tag}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AccidentIntakeStrip() {
  const items = [
    ["01", "PHOTOS", "Wide view + close damage"],
    ["02", "VEHICLE", "Make + model"],
    ["03", "WHAT HAPPENED", "One or two sentences"],
    ["04", "SEND", "WhatsApp is enough to start"],
  ];

  return (
    <div className="aa-v11-accident-strip">
      <div className="aa-v11-accident-alert">
        <div className="aa-v16-accident-strip-photo" aria-hidden="true">
          <Image src={aaModuleImages.accident} alt="" fill quality={72} sizes="300px" />
          <i />
        </div>
        <CircleAlert size={22} /><span>ACCIDENT INTAKE</span>
      </div>
      {items.map(([no, title, copy]) => (
        <div key={no}>
          <span>{no}</span>
          <b>{title}</b>
          <small>{copy}</small>
        </div>
      ))}
    </div>
  );
}
