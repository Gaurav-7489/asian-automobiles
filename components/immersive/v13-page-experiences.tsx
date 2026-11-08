"use client";

import Image from "next/image";
import Link from "next/link";
import { bookingHref, serviceCatalog, serviceImage } from "@/lib/service-catalog";
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
    "/images/placeholders/wheel-alignment.svg",
    "/images/placeholders/spare-parts.svg",
    "/images/placeholders/car-profile.svg",
  ],
  damage: [
    "/images/placeholders/car-profile.svg",
    "/images/placeholders/spare-parts.svg",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1600&q=78",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
  ],
};

const serviceIcons = [Wrench, Sparkles, ShieldCheck, CarFront, Gauge, Disc3, PackageSearch];
const serviceItems = serviceCatalog.map((service, index) => ({
  ...service, no: String(index + 1).padStart(2, "0"), label: service.title,
  copy: service.description, icon: serviceIcons[index],
}));

export function ServiceDecisionBoard(){
  const [active,setActive]=useState(0);
  const item=serviceItems[active];
  const Icon=item.icon;
  return <div className="aa-v13-service-board">
    <div className="aa-v13-service-stage">
      <Image key={item.id} className="aa-v13-service-stage-img" src={serviceImage(item, 1400)} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
      <div className="aa-v13-service-grid" aria-hidden="true" />
      <span className="aa-v13-kicker">CHOOSE A SERVICE / {item.no}</span>
      <div className="aa-v13-service-stage-copy">
        <Icon size={30}/>
        <small>{item.meta}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <div className="aa-router-actions">
          <Link href={item.href}>Explore service <ArrowUpRight size={15} /></Link>
          <Link href={bookingHref(item.id)}>Start enquiry <ArrowUpRight size={15} /></Link>
        </div>
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
  {year:"SERVICE",label:"MAINTENANCE",title:"Car service and maintenance",copy:"Periodic servicing, oil and filter changes and general inspections for cars of many makes."},
  {year:"REPAIRS",label:"MECHANICAL",title:"Mechanical repairs",copy:"Brakes, clutch, suspension, steering and engine problems diagnosed and repaired."},
  {year:"AC",label:"CLIMATE",title:"Car AC services",copy:"Inspection, fault-finding, gas recharge and compressor-related repairs."},
  {year:"WHEELS",label:"TYRES",title:"Wheel alignment, balancing and tyre care",copy:"Fix pulling, steering vibration and uneven tyre wear; tyre checks and advice."},
  {year:"PARTS",label:"ENQUIRIES",title:"Spare-parts enquiries",copy:"Tell us the make, model, year and part — we’ll check genuine (OEM) and aftermarket options."},
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
  {no:"04",label:"Panel damage",title:"Start wide, then move closer",copy:"A vehicle-wide photo plus detailed damage photos is a useful first step."},
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

const facilityHrefs = ["/services/car-service-maintenance/", "/services/wheel-alignment-balancing/", "/services/tyre-care/", "/spare-parts/", "/contact/"];
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
      <Link className="aa-connected-action" href={facilityHrefs[active]}>Explore this service area <ArrowUpRight size={15} /></Link>
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
  {no:"02",label:"Repairs",icon:CarFront,copy:"Brakes, clutch, suspension, steering and engine problems."},
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
