"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
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

const WheelAlignment3D = dynamic(
  () => import("./wheel-alignment-3d").then((mod) => mod.WheelAlignment3D),
  {
    ssr: false,
    loading: () => (
      <div className="aa-v17-wheel3d-loading" aria-hidden="true">
        <span />
        <b>Loading 3D wheel geometry</b>
      </div>
    ),
  },
);

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

export function WheelGeometryLab() {
  const [active, setActive] = useState<"pull" | "center" | "wear">("pull");

  const labels = {
    pull: ["PULLING", "Tyre points slightly away", "A simple toe-angle example."],
    center: ["OFF-CENTRE", "Tyre angle shifts", "A small steering offset shown visually."],
    wear: ["UNEVEN WEAR", "Tyre leans on one edge", "A simple camber example with the affected tread highlighted."],
  } as const;

  const current = labels[active];

  return (
    <div className="aa-v11-geometry-lab aa-v18-simple-tyre-lab">
      <div className="aa-v18-simple-tyre-stage">
        <WheelAlignment3D mode={active} />

        <div className="aa-v18-simple-tyre-label">
          <small>{current[0]}</small>
          <strong>{current[1]}</strong>
          <p>{current[2]}</p>
        </div>
      </div>

      <div className="aa-v18-simple-tyre-controls">
        <button
          type="button"
          aria-pressed={active === "pull"}
          onClick={() => setActive("pull")}
          className={active === "pull" ? "is-active" : ""}
        >
          <span>01</span>
          <b>Pulling</b>
        </button>

        <button
          type="button"
          aria-pressed={active === "center"}
          onClick={() => setActive("center")}
          className={active === "center" ? "is-active" : ""}
        >
          <span>02</span>
          <b>Off-centre</b>
        </button>

        <button
          type="button"
          aria-pressed={active === "wear"}
          onClick={() => setActive("wear")}
          className={active === "wear" ? "is-active" : ""}
        >
          <span>03</span>
          <b>Uneven wear</b>
        </button>
      </div>
    </div>
  );
}

export function TyreTreadLab() {
  const [active, setActive] = useState(0);
  const states = [
    { label: "EVEN", title: "Even-looking wear", note: "Keep monitoring tyre condition and pressure." },
    { label: "EDGE", title: "Edge-heavy wear", note: "A reason to have tyre condition and wheel geometry checked." },
    { label: "PATCH", title: "Irregular wear", note: "Share a tyre photo and the driving symptom with the workshop." },
  ];

  return (
    <div className="aa-v11-tyre-lab">
      <div className={"aa-v11-tread-visual tread-" + active} aria-hidden="true">
        <div className="aa-v16-module-photo aa-v16-tyre-photo">
          <Image src={aaModuleImages.tyre} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 52vw" />
          <i />
        </div>
        <div className="aa-v11-tread">
          {Array.from({ length: 16 }).map((_, index) => <i key={index} />)}
        </div>
        <div className="aa-v11-tread-scan" />
        <span>TYRE / CONDITION VIEW</span>
      </div>
      <div className="aa-v11-tread-copy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .28, ease }}
          >
            <small>{states[active].label}</small>
            <h3>{states[active].title}</h3>
            <p>{states[active].note}</p>
          </motion.div>
        </AnimatePresence>
        <div className="aa-v11-tread-tabs">
          {states.map((state, index) => (
            <button type="button" key={state.label} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
              <span>0{index + 1}</span>{state.label}
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
