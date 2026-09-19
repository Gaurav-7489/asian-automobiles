import { ArrowUpRight, ArrowLeft, Check, Phone, Upload, MapPin, ShieldCheck, Clock3, Images, CarFront, CircleHelp } from "lucide-react";
import Link from "next/link";

const photos = {
  workshop: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=80",
  repair: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80",
  car: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
  road: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80"
};

type PageData = { eyebrow:string; title:string; intro:string; items:string[]; image?:string; dark?:boolean };

const pages:Record<string,PageData>={
  about:{eyebrow:"About Asian Automobiles",title:"A workshop experience that feels as clear online as it should in person.",intro:"The business proposition is built around service, repair and automobile parts. Verified history, leadership and facility details will be added after client confirmation.",items:["Established 1996 — confirm before final copy","Independent multi-brand service center positioning","Service / repair + automobile parts","Real facility photography"],image:photos.workshop},
  services:{eyebrow:"Services",title:"Automotive care, organised around what your vehicle needs.",intro:"Dedicated journeys for the major service categories identified in the supplied website blueprint.",items:["General Car Service & Repairs","Car AC Service & Repair","Denting, Painting & Accident Repair","Wheel Alignment, Balancing & Tyre Services","Automobile Spare Parts"],image:photos.car},
  insurance:{eyebrow:"Cashless Insurance Repairs",title:"After an accident, the next step should be obvious.",intro:"A dedicated route for accident repair assistance. Current insurer relationships and the exact internal process must be verified before publication.",items:["Accident repair assistance","Damage photo upload","Survey / approval coordination","Repair and handover"],image:photos.repair},
  facilities:{eyebrow:"Our Facilities",title:"See the place behind the service.",intro:"Original photography should show the workshop floor, service bays, alignment equipment, parts inventory and customer-facing spaces.",items:["Workshop floor","Service bays","Alignment equipment","Parts inventory","Customer-facing areas"],image:photos.workshop},
  gallery:{eyebrow:"Gallery",title:"Real work. Real workshop.",intro:"A visual library for workshop, repairs, parts, team, exterior and completed work.",items:["Workshop","Repairs","Parts","Team","Exterior","Completed Work"],image:photos.repair},
  reviews:{eyebrow:"Reviews & Customer Stories",title:"Proof from people who came through the doors.",intro:"Attributable public reviews and consented customer stories should be added with source and date. No fabricated testimonials.",items:["Reviewer + source","Review date","Customer story","Consent / usage status"],image:photos.car},
  contact:{eyebrow:"Contact & Directions",title:"Find the workshop. Start the conversation.",intro:"283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala.",items:["+91 9349002038","0480 2828167","WhatsApp — confirm official business number","Opening hours — confirm before launch"],image:photos.road},
  faq:{eyebrow:"FAQ",title:"Answers without the guesswork.",intro:"Every published answer should be sourced or client-approved.",items:["Services","Insurance","Vehicle brands","Location","Booking","Parts"],image:photos.car},
  "spare-parts":{eyebrow:"Automobile Spare Parts",title:"Tell us the part. We will start with the right details.",intro:"An inquiry-first parts experience. Live inventory or commerce can be connected later if required.",items:["Part requirement","Vehicle make / model","Quantity","Notes","Call / WhatsApp"],image:photos.car}
};

const services:Record<string,PageData>={
 "car-service":{eyebrow:"General Car Service & Repairs",title:"Keep the essentials running right.",intro:"Routine maintenance and mechanical repair intent, with a clear next action.",items:["Inspection","Diagnosis","Repair / service","Customer handover"],image:photos.car},
 "car-ac-repair":{eyebrow:"Car AC Service & Repair",title:"A focused path for AC issues.",intro:"Clear local-search intent for car AC service and repair in Irinjalakuda.",items:["AC issue enquiry","Inspection","Repair / service","Book or call"],image:photos.car},
 "accident-repair":{eyebrow:"Denting, Painting & Accident Repair",title:"From damage to the next step.",intro:"Accident repair, denting and painting with a direct bridge into insurance assistance.",items:["Damage description","Photo upload","Repair enquiry","Insurance assistance"],image:photos.repair},
 "denting-painting":{eyebrow:"Denting & Painting",title:"Bodywork with a clear process.",intro:"Dedicated bodywork journey for denting, painting and restoration enquiries.",items:["Damage assessment","Repair scope","Painting","Handover"],image:photos.repair},
 "wheel-alignment":{eyebrow:"Wheel Alignment, Balancing & Tyre Services",title:"Straighten out the details.",intro:"Computerized wheel alignment, balancing, tyre repair and rim repair are the capabilities identified in the supplied research.",items:["Wheel alignment","Wheel balancing","Tyre repair / puncture","Rim repair"],image:photos.road},
 "tyre-services":{eyebrow:"Tyre Services",title:"Better contact with the road.",intro:"Dedicated route for tyre and balancing enquiries.",items:["Tyre enquiry","Balancing","Repair","Booking"],image:photos.road}
};

function Form({quote}:{quote:boolean}) {
  return <div className="form-shell"><div className="form-heading"><span className="eyebrow">ENQUIRY / 01</span><h2>{quote?"Request a quote":"Book a service"}</h2><p>Share the essentials. The final workflow can be connected to CRM, email or WhatsApp during technical setup.</p></div><div className="form"><div className="form-grid">
    {["Name","Phone","Vehicle make / model","Service needed"].map(x=><label key={x}>{x}<input placeholder={x}/></label>)}
    <label className="wide">Preferred date / time<input placeholder="Your preferred slot"/></label>
    <label className="wide">Notes<textarea placeholder="Tell us what you need..."/></label>
    {quote&&<label className="upload wide"><Upload size={17}/>Upload damage / reference photos</label>}
  </div><button>Submit enquiry <ArrowUpRight size={16}/></button><small>Frontend form — routing, storage and notification integrations to be connected during technical discovery.</small></div></div>
}

function DetailPage({item}:{item:PageData}) {
  return <main className="inner-page">
    <section className="inner-hero"><div className="wrap narrow">
      <Link className="back" href="/"><ArrowLeft size={15}/>Back home</Link>
      <div className="inner-hero-grid"><div><span className="eyebrow">{item.eyebrow}</span><h1 className="page-title">{item.title}</h1><p className="page-intro">{item.intro}</p><div className="page-actions"><Link className="primary-link" href="/book-service/">Book a Service <ArrowUpRight size={15}/></Link><a className="outline-link" href="tel:+919349002038"><Phone size={15}/>Call</a></div></div><div className="inner-hero-image"><img src={item.image||photos.car} alt="" loading="eager" decoding="async"/></div></div>
    </div></section>
    <section className="inner-section"><div className="wrap narrow"><div className="inner-section-head"><span className="eyebrow">WHAT THIS PAGE COVERS</span><span className="section-index">01—{String(item.items.length).padStart(2,"0")}</span></div><div className="detail-grid">{item.items.map((x,i)=><div className="detail-card" key={x}><div><small>0{i+1}</small><h2>{x}</h2></div><Check size={17}/></div>)}</div></div></section>
    <section className="inner-dark"><div className="wrap narrow inner-dark-grid"><div><span className="eyebrow light">THE NEXT STEP</span><h2>Make the enquiry easy.</h2><p>Use the dedicated booking or quote route, or call the workshop directly.</p></div><div className="dark-actions"><Link href="/book-service/" className="primary-link">Book <ArrowUpRight size={16}/></Link><a href="tel:+919349002038" className="light-link"><Phone size={15}/>Call</a></div></div></section>
  </main>
}

function FormPage({quote}:{quote:boolean}) {
  return <main className="inner-page"><section className="inner-hero"><div className="wrap narrow"><Link className="back" href="/"><ArrowLeft size={15}/>Back home</Link><div className="form-hero"><div><span className="eyebrow">{quote?"REQUEST A QUOTE":"BOOK A SERVICE"}</span><h1 className="page-title">{quote?"Tell us what needs fixing.":"Let's book your service."}</h1><p className="page-intro">{quote?"Use this route for service and parts enquiries, including damage photos where applicable.":"Name, phone, vehicle, service and preferred date/time will feed the final booking workflow."}</p><div className="trust-row"><span><ShieldCheck size={16}/>Clear enquiry</span><span><Clock3 size={16}/>Simple process</span><span><Phone size={16}/>Direct contact</span></div></div><Form quote={quote}/></div></div></section></main>
}

export default async function Page({params}:{params:Promise<{slug?:string[]}>}) {
  const {slug=[]}=await params; const key=slug.join("/");
  if(key==="book-service"||key==="request-quote") return <FormPage quote={key==="request-quote"}/>;
  const item=services[key]||pages[key];
  if(!item) return <main className="inner-page"><div className="wrap narrow"><span className="eyebrow">404</span><h1 className="page-title">Page not found.</h1><Link className="primary-link" href="/">Back home</Link></div></main>;
  return <DetailPage item={item}/>;
}
