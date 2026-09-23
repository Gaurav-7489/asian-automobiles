"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  CarFront,
  CheckCircle2,
  CircleHelp,
  Disc3,
  Gauge,
  MapPin,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const aaV13Visuals = {
  about: [
    "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=78",
  ],
  damage: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
  ],
};

const serviceItems = [
  { no:"01", label:"Routine service", meta:"MAINTENANCE", title:"Service due?", copy:"Start with routine maintenance, fluids, filters and preventive checks.", icon:CalendarDays },
  { no:"02", label:"Noise / vibration", meta:"MECHANICAL", title:"Something feels different?", copy:"Describe the noise, vibration or change in behaviour in plain language.", icon:Wrench },
  { no:"03", label:"AC cooling", meta:"CLIMATE", title:"Cabin not cooling?", copy:"Weak cooling, airflow or inconsistent AC performance can start here.", icon:Sparkles },
  { no:"04", label:"Pulling / shaking", meta:"WHEELS", title:"Car pulling or vibrating?", copy:"Alignment, balancing, tyre wear and wheel-condition checks are the right route.", icon:Disc3 },
  { no:"05", label:"Body damage", meta:"BODY", title:"Dent, scratch or impact?", copy:"Clear photos and one short note are enough to start a body-repair enquiry.", icon:CarFront },
  { no:"06", label:"Need a part", meta:"PARTS", title:"Looking for a component?", copy:"Vehicle make, model, variant and year are the useful starting details.", icon:PackageSearch },
];

export function ServiceDecisionBoard(){
  const [active,setActive]=useState(0);
  const item=serviceItems[active];
  const Icon=item.icon;
  return <div className="aa-v13-service-board">
    <div className="aa-v13-service-stage">
      <div className="aa-v13-service-grid" aria-hidden="true" />
      <span className="aa-v13-kicker">LIVE SERVICE ROUTER / {item.no}</span>
      <div className="aa-v13-service-stage-copy">
        <Icon size={30}/>
        <small>{item.meta}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
      <div className="aa-v13-service-pulse" aria-hidden="true"><i/><i/><i/></div>
    </div>
    <div className="aa-v13-service-index">
      {serviceItems.map((x,index)=>{
        const I=x.icon;
        return <button key={x.no} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)} aria-pressed={index===active}>
          <span>{x.no}</span><I size={18}/><b>{x.label}</b><ArrowUpRight size={15}/>
        </button>;
      })}
    </div>
  </div>;
}

const aboutItems=[
  {year:"1996",label:"START",title:"Local automotive roots",copy:"Asian Automobiles is presented as an established Irinjalakuda automotive business with service and parts as its two connected pillars."},
  {year:"SERVICE",label:"WORKSHOP",title:"Multi-brand vehicle support",copy:"Routine maintenance, mechanical repair and problem-led vehicle enquiries sit at the centre of the workshop experience."},
  {year:"WHEELS",label:"PRECISION",title:"Alignment, balancing and tyre care",copy:"Wheel-related work has its own dedicated service path instead of being buried inside general servicing."},
  {year:"PARTS",label:"SUPPORT",title:"Parts knowledge alongside service",copy:"Spare-parts enquiries remain a visible business pillar and start with vehicle-fitment details."},
  {year:"NOW",label:"DIGITAL",title:"A simpler customer journey",copy:"The site reduces friction: describe the issue, choose the closest route and continue directly with the workshop."},
];

export function AboutTimeline(){
  const [active,setActive]=useState(0);
  const item=aboutItems[active];
  return <div className="aa-v13-about-timeline">
    <div className="aa-v13-about-line">
      {aboutItems.map((x,index)=><button key={x.year} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)} aria-pressed={index===active}>
        <i/><span>{x.label}</span><b>{x.year}</b>
      </button>)}
    </div>
    <div className="aa-v13-about-readout">
      <div className="aa-v16-about-photo" aria-hidden="true">
        <Image key={active} src={aaV13Visuals.about[active]} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 42vw" />
        <i />
      </div>
      <div className="aa-v16-about-copy">
      <span>{String(active+1).padStart(2,"0")} / {String(aboutItems.length).padStart(2,"0")}</span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
      </div>
    </div>
  </div>;
}

const damageItems=[
  {no:"01",label:"Dent / crease",title:"Show the shape of the dent",copy:"One wider shot and one angled close-up usually communicate the panel shape better than a single straight-on photo."},
  {no:"02",label:"Scratch / paint",title:"Show the finish clearly",copy:"Use a close photo in good light plus a wider view so the affected panel is easy to identify."},
  {no:"03",label:"Bumper / panel",title:"Show the whole affected area",copy:"Include the edges around the damage so the workshop can understand where the impact sits on the vehicle."},
  {no:"04",label:"Accident damage",title:"Start wide, then move closer",copy:"A vehicle-wide photo plus detailed damage photos is a useful first step before any case-specific assessment."},
];

export function BodyworkDamageGuide(){
  const [active,setActive]=useState(0);
  const item=damageItems[active];
  return <div className="aa-v13-damage-guide">
    <div className={"aa-v13-damage-stage damage-"+active}>
      <div className="aa-v16-damage-photo" aria-hidden="true">
        <Image key={active} src={aaV13Visuals.damage[active]} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 62vw" />
        <i />
      </div>
      <div className="aa-v13-car-silhouette" aria-hidden="true"><i/><i/><i/><i/></div>
      <div className="aa-v13-damage-target" aria-hidden="true"><span/><span/></div>
      <div className="aa-v13-damage-copy">
        <small>DAMAGE PHOTO GUIDE / {item.no}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
    </div>
    <div className="aa-v13-damage-tabs">
      {damageItems.map((x,index)=><button key={x.no} type="button" className={index===active?"is-active":""} aria-pressed={index===active} onClick={()=>setActive(index)}><span>{x.no}</span><b>{x.label}</b><Camera size={16}/></button>)}
    </div>
  </div>;
}

const facilityItems=[
  {no:"01",label:"Service floor",meta:"MAINTENANCE",copy:"Routine servicing and common mechanical work."},
  {no:"02",label:"Alignment zone",meta:"WHEEL GEOMETRY",copy:"Dedicated wheel-alignment workflow."},
  {no:"03",label:"Balancing zone",meta:"WHEEL CARE",copy:"Balancing and wheel-condition support."},
  {no:"04",label:"Parts support",meta:"FITMENT",copy:"Parts enquiry and replacement-component support."},
  {no:"05",label:"Customer area",meta:"VISIT",copy:"A clear arrival and conversation point for customers."},
];

export function WorkshopFloorExplorer(){
  const [active,setActive]=useState(0);
  const item=facilityItems[active];
  return <div className="aa-v13-floor-explorer">
    <div className="aa-v13-floor-plan" aria-label="Interactive workshop capability map">
      {facilityItems.map((x,index)=><button key={x.no} type="button" className={"zone zone-"+(index+1)+" "+(index===active?"is-active":"")} aria-pressed={index===active} onClick={()=>setActive(index)}>
        <span>{x.no}</span><b>{x.label}</b>
      </button>)}
      <div className="aa-v13-floor-axis" aria-hidden="true"/>
    </div>
    <div className="aa-v13-floor-readout">
      <Gauge size={22}/>
      <small>{item.no} / {item.meta}</small>
      <h3>{item.label}</h3>
      <p>{item.copy}</p>
      <span className="aa-v13-floor-note">Capabilities shown here are service categories, not an equipment-count claim.</span>
    </div>
  </div>;
}

const reviewRules=[
  {no:"01",label:"Source",title:"Where did it come from?",copy:"Keep the review source visible so the feedback stays attributable."},
  {no:"02",label:"Date",title:"When was it written?",copy:"Useful timing and context should remain attached to published feedback."},
  {no:"03",label:"Work done",title:"What was the actual service?",copy:"Connect feedback to the real job when that context is known."},
  {no:"04",label:"Permission",title:"Can this story be published?",copy:"Customer stories and identifying detail should be used responsibly."},
];

export function ReviewProofBoard(){
  const [active,setActive]=useState(0);
  const item=reviewRules[active];
  return <div className="aa-v13-review-board">
    <div className="aa-v13-review-ledger">
      <span>REVIEW INTEGRITY / CHECK {item.no}</span>
      <blockquote>“{item.title}”</blockquote>
      <p>{item.copy}</p>
      <div className="aa-v13-ledger-lines" aria-hidden="true"><i/><i/><i/><i/></div>
      <CheckCircle2 size={28}/>
    </div>
    <div className="aa-v13-review-tabs">
      {reviewRules.map((x,index)=><button key={x.no} type="button" className={index===active?"is-active":""} aria-pressed={index===active} onClick={()=>setActive(index)}>
        <span>{x.no}</span><b>{x.label}</b><ArrowUpRight size={15}/>
      </button>)}
    </div>
  </div>;
}

const faqItems=[
  {no:"01",label:"Service",icon:Wrench,copy:"Maintenance, mechanical concerns and what to do when you are not sure."},
  {no:"02",label:"Accident",icon:CarFront,copy:"Body damage, photo-led enquiries and case-specific insurance assistance."},
  {no:"03",label:"Parts",icon:PackageSearch,copy:"Vehicle details, fitment information and availability enquiries."},
  {no:"04",label:"Visit",icon:MapPin,copy:"Location, directions and why calling before travelling can help."},
];

export function FaqRouteCards(){
  return <div className="aa-v13-faq-routes">
    {faqItems.map((x)=><div key={x.no}><span>{x.no}</span><x.icon size={20}/><b>{x.label}</b><p>{x.copy}</p><CircleHelp size={15}/></div>)}
  </div>;
}

export function BookingJourney({quote=false}:{quote?:boolean}){
  const items=quote
    ? [["01","VEHICLE","Tell us the vehicle."],["02","NEED","Describe the repair or part."],["03","DETAIL","Add a short note."],["04","WHATSAPP","Continue the conversation."]]
    : [["01","VEHICLE","Tell us the vehicle."],["02","SERVICE","Choose the closest need."],["03","PREFERENCE","Add a preferred time."],["04","WHATSAPP","Confirm directly."]];
  return <div className="aa-v13-booking-journey">
    <div className="aa-v13-journey-track" aria-hidden="true"/>
    {items.map(([no,label,copy],index)=><div key={no} className="aa-v13-journey-step">
      <span>{no}</span><i>{index===items.length-1?<MessageCircle size={18}/>:<CheckCircle2 size={18}/>}</i><b>{label}</b><p>{copy}</p>
    </div>)}
  </div>;
}
