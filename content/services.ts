import { claim } from "@/content/business";
import { images, type ImageRef } from "@/content/images";
import type { WhatsappKey } from "@/content/whatsappMessages";

/**
 * All service content and flags (spec ch. 22.4). Header dropdown, footer, cards,
 * summaries, sitemap, breadcrumbs and related links all read from this file.
 * Flip `published` to true once the owner confirms a [COND] service – nothing else changes.
 */

export const flags = {
  tyrePuncture: false, // M15 – puncture repair offered?
  tyreReplacement: false, // M15 – tyre sales / replacement offered?
  insuranceSupport: false, // O10 – never mention until confirmed
  majorAccidentRepair: false, // M13
  detailingListsConfirmed: false, // M14 – owner confirms each exterior/interior item
};

export type IconName =
  | "wrench" | "cog" | "snowflake" | "crosshair" | "circle-dot" | "paintbrush" | "sparkles" | "package"
  | "shield" | "piggy-bank" | "car" | "badge-check" | "alert" | "timer" | "gauge" | "droplets" | "wind" | "route";

export interface Item { title: string; text: string; icon?: IconName }
export interface Faq { q: string; a: string; when?: boolean }
type Cell = string | { text: string; href: string };

export type Section =
  | { type: "prose"; heading: string; paragraphs: string[]; link?: { label: string; href: string }; /** show link only when this service slug is published */ linkWhen?: string }
  | { type: "cards"; heading: string; intro?: string; items: Item[]; note?: string; tone?: "warm" }
  | { type: "checklist"; heading: string; intro?: string; items: { text: string; href?: string }[]; footnote?: string; columns?: 1 | 2 }
  | { type: "list"; heading: string; intro?: string; items: string[]; link?: { label: string; href: string } }
  | { type: "table"; heading: string; intro?: string; caption: string; columns: string[]; rows: Cell[][]; note?: string }
  | { type: "steps"; heading: string; items: Item[] }
  | { type: "callout"; title?: string; text: string; variant: "info" | "caution" }
  | { type: "diagram"; heading: string; text: string }
  | { type: "inlineCta"; heading: string; text: string; label: string }
  | { type: "photoTips"; heading: string; text: string; items: string[] }
  | { type: "treatments"; heading: string };

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  cardText: string;
  summary: string;
  typicalWork: string[];
  published: boolean;
  seo: { title: string; description: string; primaryKeyword: string };
  hero: { eyebrow: string; h1: string; sub: string; image: ImageRef; primaryLabel: string; primaryLabelMobile?: string; secondaryLabel: string; whatsappKey: WhatsappKey; whatsappFirst?: boolean };
  sections: (Section & { when?: boolean })[];
  faqHeading?: string;
  faqs: Faq[];
  cta: { heading: string; text: string };
  related: string[];
  detailingTreatments?: { name: string; text: string }[];
}

const servicing: Service = {
  slug: "car-service-maintenance",
  name: "Car Service & Maintenance",
  shortName: "Car service",
  icon: "wrench",
  cardText: "Periodic servicing, oil and filter changes and general inspections.",
  summary:
    "Regular servicing keeps your car dependable and helps catch small problems before they become expensive. We carry out periodic maintenance for cars of many makes.",
  typicalWork: ["Engine oil change", "Oil and air filter replacement", "Fluid level checks", "General vehicle inspection"],
  published: true,
  seo: {
    title: "Car Service and Maintenance in Irinjalakuda – Asian Automobiles",
    description:
      "Periodic car servicing, oil and filter changes and vehicle inspections for cars of many makes at Asian Automobiles, Kattoor Road, Irinjalakuda. Call to book.",
    primaryKeyword: "car service in Irinjalakuda",
  },
  hero: {
    eyebrow: "Car service & maintenance",
    h1: "Car service and maintenance in Irinjalakuda",
    sub: "Periodic servicing, oil and filter changes and thorough checks for cars of many makes — to keep your car reliable between journeys.",
    image: images.carService,
    primaryLabel: "Call to Book a Service",
    secondaryLabel: "WhatsApp Us",
    whatsappKey: "car-service-maintenance",
  },
  sections: [
    {
      type: "prose",
      heading: "What a periodic service is",
      paragraphs: [
        "A periodic service is planned maintenance carried out at regular intervals, usually based on distance driven or time since the last service. It replaces parts that wear out with normal use, such as engine oil and filters, and checks the systems that keep you safe on the road.",
        "Your car’s owner’s manual or service booklet lists the recommended interval and what each service should include. Bring it with you and we’ll use it as a guide.",
      ],
    },
    {
      type: "cards",
      heading: "Why regular servicing matters",
      tone: "warm",
      items: [
        { icon: "alert", title: "Fewer surprises", text: "Worn parts are found during a check rather than at the side of the road." },
        { icon: "piggy-bank", title: "Lower long-term costs", text: "Fresh oil and clean filters reduce engine wear; small fixes cost less than major repairs." },
        { icon: "shield", title: "Safer driving", text: "Brakes, tyres, lights and steering are checked as part of a proper inspection." },
        { icon: "badge-check", title: "Better resale value", text: "A record of regular servicing reassures the next buyer." },
      ],
    },
    {
      type: "checklist",
      heading: "What a service can include",
      intro: "The exact work depends on your car, its age and its service schedule. Typical maintenance work includes:",
      columns: 2,
      items: [
        "Engine oil replacement",
        "Oil filter replacement",
        "Air filter inspection or replacement",
        "General vehicle inspection",
        "Fluid level checks",
        "Brake condition check",
        "Tyre condition and pressure check",
        "Battery and lights check",
        "Basic checks for leaks, noises and wear",
        "Preventive maintenance as recommended for your car",
      ].map((text) => ({ text })),
      footnote: claim("inspectAndExplain") ? "We’ll tell you what your car needs before starting work." : undefined,
    },
    {
      type: "list",
      heading: "When to bring your car in",
      items: [
        "Your service is due by kilometres or by date",
        "The service reminder or oil light has come on",
        "You’ve bought a used car and don’t know its service history",
        "You’re planning a long trip",
        "Your car feels different — rougher, noisier or less responsive",
        "The car has been standing unused for a long time",
      ],
      link: { label: "Noticed a specific problem? See Mechanical Repairs", href: "/services/mechanical-repairs" },
    },
    {
      type: "steps",
      heading: "How a service works with us",
      items: [
        { title: "Call or message us", text: "Tell us your car’s make, model, year and approximate kilometres. We’ll suggest a convenient time." },
        { title: "Bring your car in", text: "Mention anything you’ve noticed, however small." },
        { title: "Inspection", text: "We check the car against its service needs." },
        ...(claim("inspectAndExplain") ? [{ title: "We explain", text: "We tell you what we recommend and agree the work with you." }] : []),
        { title: "Service", text: "We carry out the agreed work." },
        { title: "Handover", text: "We return the car and explain what was done." },
      ],
    },
    {
      type: "checklist",
      heading: "What to bring and prepare",
      columns: 1,
      items: [
        "Your service booklet or owner’s manual, if you have it",
        "Previous service bills, if available",
        "A note of any warning lights, noises or issues (a phone photo of the dashboard helps)",
        "The locking wheel-nut key, if your car has one",
        "Remove valuables from the car",
      ].map((text) => ({ text })),
    },
  ],
  faqHeading: "Car service questions",
  faqs: [
    { q: "How often should my car be serviced?", a: "Follow the interval in your owner’s manual, which is usually based on kilometres or months, whichever comes first. Heavy traffic, short trips and dusty roads can mean more frequent checks. If you’re unsure, call us with your car details." },
    { q: "Can you service my car if it’s still under manufacturer warranty?", a: "Warranty terms differ between manufacturers. Check your warranty booklet or ask your dealer whether servicing elsewhere affects your cover before booking." },
    { q: "Do you use genuine parts?", a: "We can discuss genuine (OEM) and quality aftermarket options for your car and explain the difference before fitting anything.", when: claim("genuineAndAftermarket") },
    { q: "How long does a service take?", a: "It depends on the car and the work needed. Call us and we’ll give you an idea when you book." },
    { q: "How much does a service cost?", a: "Cost depends on the car’s make, model, condition and the parts needed. Call with your vehicle details to discuss." },
    { q: "Which oil do you use?", a: "We use oil that meets the specification recommended for your car.", when: claim("oilToSpec") },
  ],
  cta: { heading: "Is your car due for a service?", text: "Call us with your car’s make, model and kilometres and we’ll arrange a time." },
  related: ["mechanical-repairs", "car-ac-service", "tyre-care"],
};

const mechanical: Service = {
  slug: "mechanical-repairs",
  name: "Mechanical Repairs",
  shortName: "Repairs",
  icon: "cog",
  cardText: "Diagnosis and repair of brakes, clutch, suspension, steering and engine issues.",
  summary:
    "Noises, vibrations, a soft brake pedal or a slipping clutch are signs something needs attention. We diagnose the cause and carry out the repair.",
  typicalWork: ["Brake inspection and repair", "Clutch problems", "Suspension and steering checks", "Engine-related troubleshooting"],
  published: true,
  seo: {
    title: "Car Mechanical Repairs in Irinjalakuda – Brakes, Clutch, Suspension – Asian Automobiles",
    description:
      "Diagnosis and repair of car brake, clutch, suspension, steering and engine problems at Asian Automobiles, Irinjalakuda. Describe the symptom and call the workshop.",
    primaryKeyword: "car repair Irinjalakuda",
  },
  hero: {
    eyebrow: "Mechanical repairs",
    h1: "Mechanical repairs for your car",
    sub: "Brake, clutch, suspension, steering and engine problems diagnosed and repaired at our Irinjalakuda workshop.",
    image: images.mechanical,
    primaryLabel: "Describe the Problem",
    primaryLabelMobile: "Call & Describe the Problem",
    secondaryLabel: "Send a Video on WhatsApp",
    whatsappKey: "mechanical-repairs",
  },
  sections: [
    {
      type: "prose",
      heading: "When something doesn’t feel right",
      paragraphs: [
        "Most mechanical problems announce themselves early: a new noise, a vibration, a pedal that feels different or a car that pulls to one side. Getting the cause checked at this stage usually means a simpler repair.",
        "Tell us what you’re noticing and when it happens — when braking, turning, starting or at a particular speed. That information helps us find the cause faster.",
      ],
    },
    {
      type: "table",
      heading: "Symptoms we can look into",
      intro: "Common signs that a car needs mechanical attention. They are a guide, not a diagnosis.",
      caption: "Common symptoms and what they can point to",
      columns: ["What you notice", "What it can point to", "Area"],
      rows: [
        ["Squealing or grinding when braking", "Worn brake pads or discs", "Brakes"],
        ["Brake pedal feels soft or goes low", "Brake fluid or hydraulic issue — get it checked promptly", "Brakes"],
        ["Engine revs rise but the car doesn’t speed up", "Clutch slipping", "Clutch"],
        ["Hard to change gear, or a burning smell", "Clutch wear or adjustment", "Clutch"],
        ["Knocking over bumps, car feels bouncy", "Worn shock absorbers, bushes or links", "Suspension"],
        ["Steering feels heavy, loose or vibrates", "Steering components, alignment or wheel balance", "Steering"],
        ["Car pulls to one side", "Alignment, brakes or tyre pressure", { text: "Steering / wheels", href: "/services/wheel-alignment-balancing" }],
        ["Engine warning light, rough idle or loss of power", "Engine-related fault needing diagnosis", "Engine"],
        ...(claim("electricalEnquiries") ? [["Car struggles to start", "Battery, starter or electrical issue", "Electrical"]] : []),
        ["Oil or fluid spots under the car", "A leak from engine, gearbox or another system", "General"],
      ],
    },
    {
      type: "cards",
      heading: "Repair work we handle",
      items: [
        { icon: "gauge", title: "Brake system", text: "Inspection and repair of brake pads, discs and related components when braking performance or noise changes." },
        { icon: "cog", title: "Clutch", text: "Diagnosis of slipping, judder or heavy operation, and clutch-related repairs." },
        { icon: "car", title: "Suspension", text: "Inspection of shock absorbers, springs, bushes and links when the ride becomes noisy or unsettled." },
        { icon: "crosshair", title: "Steering", text: "Checks for play, heaviness or vibration in the steering, and related repairs." },
        { icon: "alert", title: "Engine troubleshooting", text: "Investigating warning lights, rough running, overheating and loss of power." },
        { icon: "wrench", title: "General repairs", text: "Everyday mechanical faults and wear-and-tear repairs found during inspection." },
      ],
      note: claim("electricalEnquiries")
        ? "Electrical problems such as starting issues or faulty lights? Call us to check whether we can help with your specific issue."
        : undefined,
    },
    {
      type: "prose",
      heading: "Finding the cause before fixing it",
      paragraphs: [
        claim("inspectAndExplain")
          ? "A noise or vibration can have several causes, so we start by inspecting the car and, where needed, test-driving it to reproduce the problem. Once we know the cause, we explain what needs repairing and what it involves before going ahead."
          : "A noise or vibration can have several causes, so we start by inspecting the car and, where needed, test-driving it to reproduce the problem.",
        "This avoids replacing parts that don’t need replacing.",
      ],
    },
    {
      type: "cards",
      heading: "Why it pays to act early",
      tone: "warm",
      items: [
        { icon: "shield", title: "Safety", text: "Brakes, steering and suspension directly affect how well the car stops and steers." },
        { icon: "piggy-bank", title: "Cost", text: "A worn brake pad left too long can damage the disc; a small leak can become a larger failure." },
        { icon: "route", title: "Reliability", text: "Problems found early are less likely to leave you stranded." },
      ],
    },
    {
      type: "callout",
      variant: "caution",
      title: "Safety first",
      text: "If your brakes feel unsafe, the steering is unusual or a red warning light is on, avoid driving the car. Call us first and we’ll advise on the next step.",
    },
  ],
  faqHeading: "Repair questions",
  faqs: [
    { q: "Can you tell me what’s wrong over the phone?", a: "We can often suggest likely causes from your description, but a proper diagnosis needs the car to be inspected." },
    { q: "Is it safe to drive my car to the workshop?", a: "If the brakes, steering or a red warning light are involved, it may not be. Call us first and describe the problem." },
    { q: "Do you repair all makes of car?", a: "We work on passenger cars of many makes. Call with your make, model and year to confirm." },
    { q: "Will you fit genuine parts?", a: "We can discuss genuine (OEM) and aftermarket options for the repair and explain the choices.", when: claim("genuineAndAftermarket") },
    { q: "How long will the repair take?", a: "It depends on the problem and parts availability. We’ll give you an idea once we’ve inspected the car." },
  ],
  cta: { heading: "Noticed a problem with your car?", text: "Call and tell us what’s happening, or send a short video of the noise on WhatsApp." },
  related: ["wheel-alignment-balancing", "car-service-maintenance", "spare-parts"],
};

const ac: Service = {
  slug: "car-ac-service",
  name: "Car AC Services",
  shortName: "Car AC",
  icon: "snowflake",
  cardText: "Inspection, fault-finding and gas recharge for car air-conditioning.",
  summary:
    "In Kerala’s heat and humidity, a weak AC is more than an inconvenience. We check why your AC isn’t cooling properly and recommend the right fix.",
  typicalWork: ["AC performance check", "Fault diagnosis", "Gas recharge", "Compressor-related repairs"],
  published: true,
  seo: {
    title: "Car AC Service and Repair in Irinjalakuda – Asian Automobiles",
    description:
      "Car AC not cooling? Asian Automobiles in Irinjalakuda checks AC performance, finds faults and handles gas recharge and compressor-related repairs.",
    primaryKeyword: "car AC service Irinjalakuda",
  },
  hero: {
    eyebrow: "Car AC services",
    h1: "Car AC service and repair",
    sub: "When your car’s AC stops cooling the way it should, we find out why — and fix the cause, not just the symptom.",
    image: images.ac,
    primaryLabel: "Call About Your AC",
    secondaryLabel: "WhatsApp Us",
    whatsappKey: "car-ac-service",
  },
  sections: [
    {
      type: "prose",
      heading: "Comfortable driving in Kerala’s heat",
      paragraphs: [
        "A car’s air-conditioning works hard in Kerala’s heat and humidity. Over time, cooling can weaken because of low refrigerant, leaks, a clogged filter or a failing component.",
        "A gas top-up can restore cooling for a while, but if the system is leaking, the problem returns. That is why we check the system first and explain what we find.",
      ],
    },
    {
      type: "table",
      heading: "Common car AC problems",
      caption: "Common AC problems and possible causes",
      columns: ["Problem", "Possible causes"],
      rows: [
        ["AC blows air but it isn’t cold", "Low refrigerant, a leak, compressor or clutch issue"],
        ["Cooling is weak or slow", "Low gas, dirty condenser, clogged cabin filter, fan issue"],
        ["Cooling comes and goes", "Electrical fault, compressor cycling issue, sensor problem"],
        ["Bad smell from the vents", "Moisture and bacteria build-up, dirty cabin filter"],
        ["Noise when the AC is switched on", "Compressor, belt or bearing wear"],
        ["Weak airflow from vents", "Blower motor or blocked cabin filter"],
        ["Water inside the cabin", "Blocked AC drain"],
      ],
      note: "These are possible causes, not a diagnosis. An inspection confirms the actual problem.",
    },
    {
      type: "checklist",
      heading: "What our AC service can include",
      columns: 2,
      items: [
        "AC performance check (how well the system cools)",
        "Fault diagnosis for poor or no cooling",
        "Checking for signs of leaks",
        "AC gas recharge where required",
        "Compressor-related repairs",
        ...(claim("cabinFilterCheck") ? ["Cabin filter and airflow check"] : []),
        "General AC system maintenance",
      ].map((text) => ({ text })),
    },
    {
      type: "list",
      heading: "Signs your AC needs attention",
      items: [
        "The cabin takes much longer than it used to cool down",
        "Air feels cool at idle but warm while driving, or the reverse",
        "You hear a click, rattle or squeal when the AC is turned on",
        "A musty or damp smell when the AC starts",
        "You needed a gas top-up recently and cooling is weak again",
        "The windscreen fogs up and is slow to clear",
      ],
    },
    {
      type: "inlineCta",
      heading: "When to call us",
      text: "Call as soon as you notice cooling getting weaker, rather than waiting for the AC to stop completely. A small leak or worn part found early is usually simpler to deal with. It’s also worth a check before the hottest months or a long family trip.",
      label: "Call About Your AC",
    },
  ],
  faqHeading: "Car AC questions",
  faqs: [
    { q: "Does my car AC need regular gas refilling?", a: "A car AC is a sealed system, so it shouldn’t need frequent top-ups. If cooling drops again soon after a recharge, there is probably a leak that needs finding." },
    { q: "Why does my AC smell?", a: "Moisture in the system can let mould and bacteria grow, especially in humid weather. A dirty cabin filter can make it worse." },
    { q: "Does using the AC increase fuel consumption?", a: "Yes, the compressor draws power from the engine, so fuel use rises slightly. A system in good condition works more efficiently." },
    { q: "Can you repair the AC compressor?", a: "We handle compressor-related repairs. The right fix depends on what has failed, which we confirm after inspection." },
    { q: "How much does AC repair cost?", a: "It depends on the cause. Gas recharge, a leak and a compressor fault are very different jobs. Call us to discuss." },
  ],
  cta: { heading: "AC not cooling like it used to?", text: "Tell us your car’s make, model and what the AC is doing. We’ll advise on the next step." },
  related: ["car-service-maintenance", "mechanical-repairs", "spare-parts"],
};

const alignment: Service = {
  slug: "wheel-alignment-balancing",
  name: "Wheel Alignment & Balancing",
  shortName: "Alignment",
  icon: "crosshair",
  cardText: "Fix pulling, steering vibration and uneven tyre wear.",
  summary:
    "If your car pulls to one side or the steering wheel shakes at speed, your wheels may need aligning or balancing. Correcting it protects your tyres and improves handling.",
  typicalWork: ["Wheel alignment", "Wheel balancing", "Steering checks", "Tyre wear assessment"],
  published: true,
  seo: {
    title: "Wheel Alignment and Balancing in Irinjalakuda – Asian Automobiles",
    description:
      "Car pulling to one side or steering wheel shaking? Asian Automobiles in Irinjalakuda offers wheel alignment, wheel balancing and tyre wear checks.",
    primaryKeyword: "wheel alignment Irinjalakuda",
  },
  hero: {
    eyebrow: "Wheel alignment & balancing",
    h1: "Wheel alignment and balancing",
    sub: "Keep your car driving straight, your steering smooth and your tyres wearing evenly.",
    image: images.alignment,
    primaryLabel: "Call to Check Alignment",
    secondaryLabel: "WhatsApp Us",
    whatsappKey: "wheel-alignment-balancing",
  },
  sections: [
    {
      type: "prose",
      heading: "Small angles, big difference",
      paragraphs: [
        "Everyday driving — potholes, speed breakers, rough roads and kerbs — gradually knocks a car’s wheels out of their correct angles and balance. The changes are small, but they affect how the car steers, how long your tyres last and how comfortable the drive feels.",
      ],
    },
    {
      type: "diagram",
      heading: "What is wheel alignment?",
      text: "Wheel alignment is the adjustment of the angles at which your wheels meet the road, so they point straight and sit correctly relative to each other and to the car. When the angles are out, the car can pull to one side, the steering wheel can sit off-centre and tyres wear unevenly.",
    },
    {
      type: "table",
      heading: "What is wheel balancing?",
      intro:
        "Wheel balancing makes sure the weight of each wheel and tyre is spread evenly around it. Even a small imbalance can make the car vibrate as speed increases, usually felt through the steering wheel or the seat. Balancing corrects this by adding small weights at the right points on the wheel.",
      caption: "Alignment compared with balancing",
      columns: ["", "Alignment", "Balancing"],
      rows: [
        ["What it corrects", "Wheel angles", "Weight distribution of wheel and tyre"],
        ["Typical symptom", "Car pulls, off-centre steering, uneven tyre wear", "Vibration at higher speeds"],
        ["Often needed after", "Pothole or kerb impact, suspension or steering work", "New tyres, tyre repair, wheel removal"],
      ],
    },
    {
      type: "list",
      heading: "Signs your wheels need attention",
      items: [
        "The car drifts or pulls to one side on a straight road",
        "The steering wheel is off-centre when driving straight",
        "The steering wheel or seat vibrates at higher speeds",
        "Tyres are wearing faster on the inside or outside edge",
        "Tyres squeal on gentle turns",
        "Steering feels less precise than it used to",
      ],
    },
    {
      type: "cards",
      heading: "Why it’s worth getting right",
      tone: "warm",
      items: [
        { icon: "circle-dot", title: "Longer tyre life", text: "Correct alignment helps tyres wear evenly across the tread." },
        { icon: "shield", title: "Safer handling", text: "The car tracks straight and responds predictably." },
        { icon: "route", title: "Less effort, less wear", text: "Steering and suspension parts aren’t fighting a misaligned wheel, and a car that rolls straight can use slightly less fuel." },
      ],
    },
    {
      type: "list",
      heading: "When to get your wheels checked",
      items: [
        "After fitting new tyres",
        "After a hard hit on a pothole, speed breaker or kerb",
        "After suspension or steering repairs",
        "When you notice any of the signs above",
        "At the interval in your owner’s manual or as part of routine servicing",
      ],
    },
  ],
  faqHeading: "Alignment and balancing questions",
  faqs: [
    { q: "What’s the difference between alignment and balancing?", a: "Alignment corrects the angles of the wheels; balancing corrects how weight is spread around each wheel. Pulling suggests alignment; vibration at speed usually suggests balancing." },
    { q: "Do I need alignment when I buy new tyres?", a: "It’s a good idea. New tyres are usually balanced when fitted, and checking alignment protects them from uneven wear." },
    { q: "Can bad alignment damage my tyres?", a: "Yes. Misalignment is one of the most common causes of uneven and early tyre wear." },
    { q: "My steering wheel shakes only at certain speeds. Why?", a: "That is a typical sign of wheel imbalance, though worn suspension or tyre damage can cause it too. We can check it." },
    { q: "How long does alignment take?", a: "It depends on the car and what adjustment is needed. Call us to plan your visit." },
  ],
  cta: { heading: "Car pulling or steering shaking?", text: "Call us and describe what you’re feeling. We’ll check whether it’s alignment, balancing or something else." },
  related: ["tyre-care", "mechanical-repairs", "car-service-maintenance"],
};

const tyres: Service = {
  slug: "tyre-care",
  name: "Tyre Care",
  shortName: "Tyres",
  icon: "circle-dot",
  cardText: "Tyre checks, pressure and wear assessment, and tyre-related advice.",
  summary:
    "Tyres are your car’s only contact with the road. We check their condition, pressure and wear and advise when they need attention.",
  typicalWork: [
    "Tyre inspection",
    "Pressure checks",
    "Wear assessment",
    flags.tyrePuncture ? "Puncture help" : flags.tyreReplacement ? "Tyre replacement" : "Tyre-related advice",
  ],
  published: true,
  seo: {
    title: "Car Tyre Care and Checks in Irinjalakuda – Asian Automobiles",
    description:
      "Tyre inspection, pressure checks and wear assessment at Asian Automobiles, Irinjalakuda. Keep your car safe on Kerala roads, in every season.",
    primaryKeyword: "car tyre service Irinjalakuda",
  },
  hero: {
    eyebrow: "Tyre care",
    h1: "Tyre care for safer driving",
    sub: "Tyre inspections, pressure checks and practical advice to keep your car gripping the road — in the dry and through the monsoon.",
    image: images.tyres,
    primaryLabel: "Call About Your Tyres",
    secondaryLabel: "WhatsApp a Photo of Your Tyre",
    whatsappKey: "tyre-care",
  },
  sections: [
    {
      type: "prose",
      heading: "Your car’s only contact with the road",
      paragraphs: [
        "Four patches of rubber, each roughly the size of your palm, are all that connect your car to the road. Their condition affects braking distance, grip in the rain, steering feel and comfort. A regular tyre check is one of the simplest things you can do for your safety.",
      ],
    },
    {
      type: "cards",
      heading: "What we look at",
      tone: "warm",
      items: [
        { icon: "circle-dot", title: "Tread depth", text: "Worn tread reduces grip, especially on wet roads. When the tread is level with the small wear indicators in the grooves, it’s time to replace the tyre." },
        { icon: "gauge", title: "Pressure", text: "Under-inflated tyres wear faster and heat up; over-inflation reduces grip. The correct pressure is usually on a sticker inside the driver’s door." },
        { icon: "alert", title: "Sidewall damage", text: "Cuts, cracks or bulges on the side of a tyre can mean internal damage and should be checked promptly." },
        { icon: "timer", title: "Age", text: "Rubber hardens over time, even with good tread. The manufacturing date is printed on the sidewall." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Monsoon tip",
      text: "Before the monsoon, check tread and pressure on all four tyres and the spare. Worn tyres are much more likely to lose grip on wet roads.",
    },
    {
      type: "table",
      heading: "Common tyre problems",
      caption: "Tyre wear patterns and what they usually mean",
      columns: ["What you see or feel", "Likely reason", "Related service"],
      rows: [
        ["Inner or outer edge worn more than the centre", "Alignment issue", { text: "Wheel alignment", href: "/services/wheel-alignment-balancing" }],
        ["Centre of tread worn more than the edges", "Over-inflation", "Pressure check"],
        ["Both edges worn", "Under-inflation", "Pressure check"],
        ["Patchy or scalloped wear", "Balancing or suspension issue", { text: "Balancing, mechanical repairs", href: "/services/mechanical-repairs" }],
        ["Vibration at speed", "Wheel imbalance or tyre damage", { text: "Balancing", href: "/services/wheel-alignment-balancing" }],
        ["Tyre keeps losing pressure", "Slow puncture, valve or rim problem", "Tyre inspection"],
        ["Bulge on the sidewall", "Internal damage from an impact", "Replace — avoid driving at speed"],
      ],
    },
    {
      type: "checklist",
      heading: "Tyre inspection and maintenance",
      columns: 2,
      items: [
        { text: "Visual inspection of all tyres, including the spare" },
        { text: "Tread and wear-pattern assessment" },
        { text: "Tyre pressure check and adjustment" },
        { text: "Valve and visible rim condition check" },
        { text: "Advice on whether alignment or balancing is needed" },
        { text: "Wheel balancing", href: "/services/wheel-alignment-balancing" },
      ],
    },
    {
      type: "inlineCta",
      heading: "Puncture help",
      text: "Picked up a nail or a slow puncture? Call us before driving far on a soft tyre. Depending on where the damage is and how large it is, a tyre can often be repaired; damage on the sidewall usually means replacement.",
      label: "Call About a Puncture",
      when: flags.tyrePuncture,
    },
    {
      type: "prose",
      heading: "Tyre questions or replacements",
      paragraphs: [
        flags.tyreReplacement
          ? "Need new tyres? Tell us your tyre size and preferences, and we’ll let you know what options are available for your car."
          : "If your tyres are worn or damaged, we can advise on what your car needs. Call us with your tyre size (printed on the sidewall, for example 185/65 R15) and we’ll help.",
      ],
    },
  ],
  faqHeading: "Tyre questions",
  faqs: [
    { q: "How often should I check my tyre pressure?", a: "At least once a month and before long trips, when the tyres are cold." },
    { q: "How do I know when my tyres need replacing?", a: "When the tread is level with the wear indicators, or if there are cuts, bulges or cracks. We can check them for you." },
    { q: "Why are my tyres wearing unevenly?", a: "Usually alignment, incorrect pressure, balancing or worn suspension. The wear pattern tells us which." },
    { q: "Should I replace all four tyres at once?", a: "Not always. At least replace them in pairs on the same axle so grip stays even. We can advise for your car." },
    { q: "Can a punctured tyre be repaired?", a: "Often, if the damage is small and in the tread area. Sidewall damage usually can’t be safely repaired.", when: flags.tyrePuncture },
  ],
  cta: { heading: "Worried about your tyres?", text: "Call us or send a photo of the tyre on WhatsApp. We’ll tell you whether it needs attention." },
  related: ["wheel-alignment-balancing", "car-service-maintenance", "mechanical-repairs"],
};

const denting: Service = {
  slug: "denting-painting",
  name: "Denting & Painting",
  shortName: "Bodywork",
  icon: "paintbrush",
  cardText: "Dent, scratch and paint repair for everyday damage.",
  summary:
    "Minor dents, scrapes and scratches spoil the look of a car and can lead to rust. Send us a photo and we’ll advise on the repair.",
  typicalWork: ["Minor dent repair", "Scratch repair", "Panel painting", "Surface preparation"],
  published: false, // [COND] M13
  seo: {
    title: "Car Denting and Painting in Irinjalakuda – Asian Automobiles",
    description:
      "Minor dent repair, scratch repair and car painting at Asian Automobiles, Irinjalakuda. Send a photo of the damage on WhatsApp for advice.",
    primaryKeyword: "car denting and painting Irinjalakuda",
  },
  hero: {
    eyebrow: "Denting & painting",
    h1: "Car denting and painting",
    sub: "Repair for everyday dents, scrapes and scratches, so your car looks cared for again.",
    image: images.denting,
    primaryLabel: "Call the Workshop",
    secondaryLabel: "Send Photos on WhatsApp",
    whatsappKey: "denting-painting",
    whatsappFirst: true,
  },
  sections: [
    {
      type: "prose",
      heading: "Small damage, worth fixing",
      paragraphs: [
        "A parking scrape or a dent from a gate post may look cosmetic, but broken paint lets moisture reach the metal underneath. In Kerala’s humid climate, that can turn into rust. Repairing damage early keeps the car looking good and protects the body.",
      ],
    },
    {
      type: "list",
      heading: "Damage we can look at",
      items: ["Parking dents", "Door dings", "Bumper scrapes", "Surface scratches", "Deeper scratches through the paint", "Faded or damaged paint on a panel"],
    },
    {
      type: "callout",
      variant: "info",
      text: "For major accident damage, call us to discuss before visiting.",
      when: flags.majorAccidentRepair,
    },
    {
      type: "cards",
      heading: "How we repair it",
      items: [
        { icon: "wrench", title: "Dent repair", text: "Dents are assessed by size, depth and location. Smaller dents can often be worked back into shape, while creased or deeper dents may need filling, smoothing and repainting. We’ll explain the approach after seeing the damage." },
        { icon: "paintbrush", title: "Panel painting", text: "Good paintwork depends on preparation. The damaged area is cleaned, repaired and smoothed before primer and paint are applied, and the finish is blended to sit as naturally as possible with the surrounding paint." },
        { icon: "sparkles", title: "Scratch repair", text: "Light scratches in the top layer can sometimes be polished out. Scratches that go through to the primer or metal need touch-up or repainting. Run a fingernail across the scratch: if it catches, it is likely deeper than the surface layer." },
      ],
    },
    {
      type: "photoTips",
      heading: "Get advice on your damage",
      text: "The quickest way to get advice is to send us clear photos on WhatsApp.",
      items: [
        "One photo from about two metres away showing the whole panel",
        "One close-up of the damage",
        "One photo at an angle, so the depth of the dent is visible",
        "Mention the car’s make, model, year and colour",
      ],
    },
  ],
  faqHeading: "Bodywork questions",
  faqs: [
    { q: "Can you tell me the cost from a photo?", a: "Photos help us give initial advice. A final assessment needs us to see the car." },
    { q: "Will the new paint match the rest of my car?", a: "We aim for a close, natural match. Older or sun-faded paint can make an exact match harder, and we’ll explain this before starting." },
    { q: "How long will my car be at the workshop?", a: "Paint needs time to prepare and cure, so it depends on the size of the repair. We’ll give you an idea after assessment." },
    { q: "Do you handle insurance claims?", a: "Call us to discuss how we can help with an insurance claim for your car.", when: flags.insuranceSupport },
  ],
  cta: { heading: "Dent or scratch spoiling your car?", text: "Send photos on WhatsApp or call us to talk it through." },
  related: ["car-detailing", "car-service-maintenance"],
};

const detailing: Service = {
  slug: "car-detailing",
  name: "Car Detailing",
  shortName: "Detailing",
  icon: "sparkles",
  cardText: "Cleaning, polishing and care for interior and exterior.",
  summary:
    "A thorough clean inside and out makes any car more pleasant to drive. Ask us what cleaning and polishing services are available.",
  typicalWork: ["Exterior washing", "Interior cleaning", "Polishing", "Basic paint care"],
  published: false, // [COND] M14
  seo: {
    title: "Car Detailing, Cleaning and Polishing in Irinjalakuda – Asian Automobiles",
    description:
      "Exterior washing, interior cleaning and polishing for your car at Asian Automobiles, Irinjalakuda. Ask what’s available for your car.",
    primaryKeyword: "car detailing Irinjalakuda",
  },
  hero: {
    eyebrow: "Car detailing",
    h1: "Car detailing and exterior care",
    sub: "Cleaning and care inside and out, to bring back the feeling of a well-kept car.",
    image: images.detailing,
    primaryLabel: "Ask About Detailing",
    secondaryLabel: "WhatsApp Us",
    whatsappKey: "car-detailing",
  },
  sections: [
    {
      type: "prose",
      heading: "More than a quick wash",
      paragraphs: [
        "Dust, mud, monsoon grime and daily use build up on and in every car. A thorough clean of the exterior and interior makes the car more pleasant to drive and helps protect its surfaces. Many customers combine it with a routine service.",
      ],
      link: { label: "Book it with your car service", href: "/services/car-service-maintenance" },
    },
    {
      type: "prose",
      heading: "Exterior cleaning",
      paragraphs: ["Washing removes dirt, road film and grime from the body, wheels and glass. Done carefully, it keeps the paint looking its best and makes scratches and chips easier to spot."],
    },
    { type: "list", heading: "Exterior cleaning includes", items: ["Body wash", "Wheel and tyre cleaning", "Glass cleaning", "Drying"], when: flags.detailingListsConfirmed },
    {
      type: "prose",
      heading: "Interior cleaning",
      paragraphs: ["Inside the car, dust and spills collect in carpets, seats and vents. An interior clean leaves the cabin fresher and more comfortable, which helps on long drives with family."],
    },
    { type: "list", heading: "Interior cleaning includes", items: ["Vacuuming of seats and carpets", "Dashboard and panel cleaning", "Mat cleaning", "Inside glass cleaning"], when: flags.detailingListsConfirmed },
    {
      type: "prose",
      heading: "Polishing and paint care",
      paragraphs: ["Over time, paint can look dull from sun, rain and washing. Polishing can restore some of its gloss and reduce the appearance of very light surface marks. Deeper scratches need repair rather than polish."],
      link: { label: "For deeper scratches, see denting and painting", href: "/services/denting-painting" },
      linkWhen: "denting-painting",
    },
    { type: "treatments", heading: "What’s available" },
  ],
  faqs: [],
  cta: { heading: "Want your car looking its best?", text: "Call or message us to ask what’s available and to plan a convenient time." },
  related: ["denting-painting", "car-service-maintenance"],
  detailingTreatments: [], // owner-confirmed items only; no prices, durations or packages
};

export const allServices: Service[] = [servicing, mechanical, ac, alignment, tyres, denting, detailing];
export const services = allServices.filter((s) => s.published);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => (slug === "spare-parts" ? "/spare-parts" : `/services/${slug}`);

/** Spare parts is a page, not a service route, but appears in grids and related rows. */
export const partsCard = {
  slug: "spare-parts",
  name: "Spare Parts Enquiry",
  icon: "package" as IconName,
  cardText: "Ask about genuine (OEM) and aftermarket parts for your car.",
  linkLabel: "Send an enquiry",
  image: images.parts,
};

export function relatedFor(service: Service) {
  return service.related
    .map((slug) => {
      if (slug === "spare-parts") return { slug, name: partsCard.name, text: partsCard.cardText, href: "/spare-parts" };
      const s = getService(slug);
      return s ? { slug, name: s.name, text: s.cardText, href: serviceHref(s.slug) } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
