import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp, Clock3, Compass,
  Droplets, Gauge, Images, MapPin, Phone, ShieldCheck, Sparkles, Upload,
  Wrench, Wind, CarFront, ClipboardCheck, Palette, Disc3, PackageSearch,
  Route, Camera, FileCheck2, MessageCircle, ChevronRight
} from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";

const img = {
  workshop:"https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1900&q=82",
  repair:"https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=82",
  car:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=82",
  road:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1900&q=82",
  detail:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=82",
  interior:"https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=82"
};

const phone="+919349002038";

function CTA({label="Book a Service",href="/book-service/"}:{label?:string;href?:string}){
  return <Link className="primary-link" href={href}>{label}<ArrowUpRight size={15}/></Link>;
}
function Call(){ return <a className="outline-link" href={"tel:"+phone}><Phone size={15}/>Call the workshop</a>; }
function Back(){ return <Link className="back" href="/"><ArrowLeft size={15}/>Asian Automobiles / Home</Link>; }

function Frame({eyebrow,title,intro,children,theme="paper"}:{eyebrow:string;title:string;intro?:string;children:ReactNode;theme?:string}){
  return <main className={"creative-page "+theme}>
    <section className="creative-head"><div className="wrap creative-wrap"><Back/><div className="creative-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{intro&&<p>{intro}</p>}</div></div></section>
    {children}
  </main>
}

function About(){
  return <Frame eyebrow="About / the story" title="A local workshop should feel human online." intro="The site is designed around the practical reality of choosing a workshop: understand the work, know what to expect, then speak to someone.">
    <section className="about-opening"><div className="wrap about-grid"><div className="year-mark"><span>EST.</span><strong>1996</strong><small>CONFIRMATION PENDING</small></div><div><span className="eyebrow">WHY THIS SITE EXISTS</span><h2>Less brochure.<br/><em>More useful.</em></h2><p>Asian Automobiles has an offline history that deserves a proper digital home. The exact ownership, operating hours, brand coverage and other public claims remain client-confirmation items before launch.</p><div className="about-proof"><span><Check/>Verified before publish</span><span><Camera/>Real workshop photography</span><span><Phone/>Direct contact paths</span></div></div></div></section>
    <section className="timeline-section"><div className="wrap"><div className="timeline-intro"><span className="eyebrow">A / the principle</span><p>We are deliberately leaving uncertain facts visible as confirmation gates rather than turning assumptions into marketing copy.</p></div><div className="timeline"><div><b>01</b><h3>Know the problem</h3><p>Start with the vehicle symptom, service need or accident situation.</p></div><div><b>02</b><h3>Make the next step obvious</h3><p>Call, book, request a quote or ask about parts without hunting through the site.</p></div><div><b>03</b><h3>Keep the proof real</h3><p>Reviews, workshop imagery, insurer relationships and service claims stay attributable and verified.</p></div></div></div></section>
  </Frame>
}

function Services(){
  const cards: Array<[string,string,string,string,typeof Wrench]> = [
    ["01","I hear / feel something","General service & repairs","/services/car-service/",Wrench],
    ["02","The cabin isn't cooling","Car AC service & repair","/services/car-ac-repair/",Wind],
    ["03","I've had an accident","Denting, painting & accident repair","/services/accident-repair/",CarFront],
    ["04","The car isn't tracking right","Wheel alignment & balancing","/services/wheel-alignment/",Disc3],
    ["05","I need the right part","Automobile spare parts","/spare-parts/",PackageSearch]
  ];
  return <Frame eyebrow="Services / find your route" title="Start with what the car is doing." intro="No need to know the workshop vocabulary first. Pick the situation that sounds like yours.">
    <section className="service-command"><div className="wrap"><div className="command-bar"><span><Sparkles size={15}/>WHAT BROUGHT YOU HERE?</span><small>CHOOSE A STARTING POINT</small></div><div className="command-grid">{cards.map(([n,k,t,href,Icon])=><Link href={href as string} className="command-card" key={n as string}><span className="command-number">{n}</span><Icon size={22}/><small>{k}</small><h2>{t}</h2><span className="command-go"><ArrowRight size={16}/></span></Link>)}</div></div></section>
    <section className="service-closer"><div className="wrap service-closer-grid"><div><span className="eyebrow">Still not sure?</span><h2>Tell us what<br/>the car is doing.</h2></div><div><p>You don't have to diagnose it yourself. Use the enquiry route and describe the symptom in your own words.</p><CTA label="Describe the problem" href="/request-quote/"/></div></div></section>
  </Frame>
}

function CarService(){
  return <Frame eyebrow="01 / General service & repairs" title="Tell us the symptom. We'll start from there." intro="A diagnosis-led route for routine service and mechanical repair enquiries.">
    <section className="diagnostic"><div className="wrap"><div className="diagnostic-top"><div><span className="eyebrow">SERVICE DESK / 01</span><h2>What changed?</h2></div><span className="status-pill"><span/>ENQUIRY READY</span></div><div className="symptom-grid">{["Strange sound","Warning light","Poor pickup","Brake concern","Routine service","Something feels off"].map((x,i)=><div className="symptom" key={x}><span>0{i+1}</span><b>{x}</b><ChevronRight size={16}/></div>)}</div><div className="diagnostic-flow"><div><ClipboardCheck size={20}/><small>STEP 01</small><h3>Describe</h3><p>Use normal language. Noise, vibration, light, smell, mileage — all useful.</p></div><div><Gauge size={20}/><small>STEP 02</small><h3>Inspect</h3><p>The actual inspection and diagnosis are determined at the workshop.</p></div><div><Wrench size={20}/><small>STEP 03</small><h3>Service</h3><p>Proceed with the agreed scope, then hand the vehicle back clearly.</p></div></div></div></section>
    <section className="split-photo"><div className="wrap"><img src={img.detail} alt="Vehicle service detail" loading="lazy"/><div><span className="eyebrow">GOOD TO KNOW</span><h2>You don't need the technical words.</h2><p>“It makes a clicking noise when I turn left” is already useful information. Start there.</p><CTA label="Book this route"/></div></div></section>
  </Frame>
}

function AC(){
  return <Frame eyebrow="02 / Car AC service & repair" title="Hot cabin? Let's get specific." intro="A dedicated AC route instead of making a customer dig through a generic service list.">
    <section className="thermal"><div className="wrap thermal-grid"><div className="thermal-visual"><div className="thermal-ring"><Wind size={34}/><strong>AC</strong><span>COOLING<br/>CHECK</span></div><div className="thermal-readings"><span>FLOW <b>01</b></span><span>COMFORT <b>02</b></span><span>SYSTEM <b>03</b></span></div></div><div className="thermal-copy"><span className="eyebrow">AC / THE SHORT VERSION</span><h2>When “it's not cold” isn't enough.</h2><p>Tell us what you notice: weak airflow, warm air, unusual smell, noise, intermittent cooling or another symptom.</p><div className="ac-tags">{["Weak airflow","Warm air","Bad smell","Noise","Stops cooling"].map(x=><span key={x}>{x}</span>)}</div><CTA label="Book AC service"/></div></div></section>
    <section className="dark-callout"><div className="wrap"><span className="eyebrow light">NO GUESSWORK</span><h2>Describe the cabin.<br/><i>We'll handle the vocabulary.</i></h2><Call/></div></section>
  </Frame>
}

function Accident(){
  return <Frame eyebrow="03 / Accident repair" title="You've already had the bad moment. The website shouldn't add another." intro="A calmer path from damage photos to repair enquiry and insurance assistance.">
    <section className="incident"><div className="wrap"><div className="incident-board"><div className="incident-label"><span>INCIDENT DESK</span><b>CASE / NEW</b></div><div className="incident-main"><div className="incident-icon"><CarFront size={34}/></div><div><small>FIRST THING</small><h2>Show us what happened.</h2><p>Photos, a short description and your contact details are enough to start the conversation.</p></div></div><div className="dropzone"><Upload size={21}/><b>Drop damage photos here</b><span>or continue with a description</span></div></div><div className="incident-steps">{[["01","Damage","Photos + description"],["02","Assessment","Repair scope"],["03","Insurance","Coordination if applicable"],["04","Repair","Agreed work + handover"]].map(([n,t,d])=><div key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
    <section className="photo-statement"><div className="wrap"><img src={img.repair} alt="Automotive accident repair" loading="lazy"/><div><span className="eyebrow">KEEP IT SIMPLE</span><h2>No insurance jargon required.</h2><p>If you need cashless repair assistance, use the insurance route. Current insurer relationships are a client-confirmation item.</p><Link className="dark-link" href="/insurance/">See insurance assistance <ArrowUpRight size={16}/></Link></div></div></section>
  </Frame>
}

function Denting(){
  return <Frame eyebrow="04 / Denting & painting" title="Bodywork is detail work." intro="A visual route for dents, scratches, panels and paint-related enquiries.">
    <section className="paint-studio"><div className="wrap"><div className="studio-header"><span className="eyebrow">BODY SHOP / VISUAL CHECK</span><h2>Show the mark.<br/><em>We'll start there.</em></h2></div><div className="before-after"><div className="ba-image first"><img src={img.car} alt="Vehicle exterior" loading="lazy"/><span>BEFORE / DAMAGE</span></div><div className="ba-image second"><img src={img.detail} alt="Vehicle detail" loading="lazy"/><span>REFERENCE / FINISH</span></div><div className="ba-divider"/></div><div className="paint-notes"><span><Palette/>Colour / finish</span><span><CarFront/>Panel / body</span><span><Camera/>Damage photos</span><CTA label="Send damage details" href="/request-quote/"/></div></div></section>
  </Frame>
}

function Wheel(){
  return <Frame eyebrow="05 / Wheel alignment & balancing" title="If the car isn't going straight, start with the wheels." intro="Alignment, balancing, tyre and rim repair enquiries in one focused visual.">
    <section className="alignment"><div className="wrap alignment-grid"><div className="alignment-graphic"><div className="wheel-axis a"/><div className="wheel-axis b"/><div className="wheel left"/><div className="wheel right"/><span>TRACK / 01</span><span>ALIGN / 02</span></div><div className="alignment-copy"><span className="eyebrow">THE WHEEL DESK</span><h2>Pulling left?<br/>Shaking at speed?</h2><div className="wheel-signals">{["Steering feels off","Uneven tyre wear","Vibration","After a pothole","Rim concern"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span><ArrowRight size={14}/></div>)}</div><CTA label="Ask about wheel service" href="/book-service/"/></div></div></section>
    <section className="micro-strip"><div className="wrap"><span>ALIGNMENT</span><span>BALANCING</span><span>TYRE REPAIR</span><span>RIM REPAIR</span></div></section>
  </Frame>
}

function Tyres(){
  return <Frame eyebrow="06 / Tyre services" title="Your tyres are where the road starts." intro="A quick, practical route for tyre, puncture, balancing and related enquiries.">
    <section className="tyre-wall"><div className="wrap"><div className="tyre-hero-card"><div className="tread"><span/><span/><span/><span/><span/></div><div><span className="eyebrow light">TYRE DESK / READY</span><h2>What's happening<br/>at the contact patch?</h2><p>Tell us what you see or feel. A photo is useful too.</p><CTA label="Start a tyre enquiry" href="/request-quote/"/></div></div><div className="tyre-grid">{["Puncture / repair","Balancing","Tyre enquiry","Rim concern"].map((x,i)=><div key={x}><small>0{i+1}</small><h3>{x}</h3><ArrowUpRight size={17}/></div>)}</div></div></section>
  </Frame>
}

function Parts(){
  return <Frame eyebrow="07 / Automobile spare parts" title="Don't know the part number? That's okay." intro="Start with the vehicle and the thing you need. We can turn the conversation into the right parts enquiry.">
    <section className="parts-desk"><div className="wrap parts-grid"><div className="parts-list">{["Vehicle make / model","Year / variant","Part you need","Quantity","Photo or reference number"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span><ArrowRight size={15}/></div>)}</div><div className="parts-receipt"><PackageSearch size={30}/><span>PARTS REQUEST</span><h2>Tell us what<br/>you're looking for.</h2><p>Live inventory and ecommerce are not assumed here. This is an enquiry-first route until stock data is connected.</p><Link className="primary-link" href="/request-quote/">Make a parts enquiry <ArrowUpRight size={15}/></Link></div></div></section>
  </Frame>
}

function Insurance(){
  return <Frame eyebrow="08 / Insurance assistance" title="Accident happened. Here's the calmer route." intro="The website can explain the journey without pretending to know insurer relationships that have not been confirmed.">
    <section className="claims"><div className="wrap"><div className="claims-track"><div className="claims-line"/>{[["01","DAMAGE","Share photos + details"],["02","SURVEY","Assessment / approval"],["03","REPAIR","Agreed repair scope"],["04","HANDOVER","Vehicle ready"]].map(([n,t,d])=><div className="claim-step" key={n}><span>{n}</span><div><small>{t}</small><h2>{d}</h2></div></div>)}</div><div className="claims-note"><ShieldCheck size={24}/><div><b>Verification gate</b><p>Which insurers are currently active for cashless work must be confirmed before insurer logos, relationships or “cashless” claims are published.</p></div></div></div></section>
    <section className="insurance-actions"><div className="wrap"><span className="eyebrow">YOUR NEXT MOVE</span><h2>Have the photos?<br/><em>Start the enquiry.</em></h2><div><CTA label="Request repair assistance" href="/request-quote/"/><Call/></div></div></section>
  </Frame>
}

function Facilities(){
  const zones=["Reception","Service bays","Diagnostics","Alignment","Parts","Customer area"];
  return <Frame eyebrow="09 / Facilities" title="See the place behind the promise." intro="The facilities page is intentionally structured to become a visual tour once original workshop photography is supplied.">
    <section className="facility-map"><div className="wrap"><div className="facility-grid">{zones.map((x,i)=><div className={"facility-zone z"+i} key={x}><span>0{i+1}</span><b>{x}</b><small>PHOTO SLOT</small></div>)}</div><div className="facility-caption"><div><span className="eyebrow">PHOTOGRAPHY PLAN</span><h2>Tools. Bays. People.<br/><em>The real place.</em></h2></div><p>Detail shots of tools, diagnostics, parts and craft are specifically called for in the blueprint. Replace temporary imagery with approved workshop photography before launch.</p></div></div></section>
  </Frame>
}

function Gallery(){
  const items=[[img.workshop,"WORKSHOP / 01"],[img.repair,"CRAFT / 02"],[img.car,"VEHICLE / 03"],[img.detail,"DETAIL / 04"],[img.interior,"INTERIOR / 05"],[img.road,"ROAD / 06"]];
  return <Frame eyebrow="10 / Gallery" title="The workshop, without the stock-photo filter." intro="A visual library built for real images: workshop, repairs, parts, people, exterior and completed work.">
    <section className="gallery-wall"><div className="wrap gallery-masonry">{items.map(([src,label],i)=><figure className={"gallery-tile g"+i} key={label}><img src={src} alt={label} loading="lazy"/><figcaption><span>{label}</span><ArrowUpRight size={16}/></figcaption></figure>)}</div></section>
  </Frame>
}

function Reviews(){
  return <Frame eyebrow="11 / Reviews & customer stories" title="What people noticed matters more than a five-star badge." intro="The final page should use attributable public reviews and consented customer stories with source and date. No invented testimonials.">
    <section className="review-wall"><div className="wrap"><div className="review-statement"><span className="eyebrow">PROOF / NOT PERFORMANCE</span><h2>Real words.<br/><em>Real context.</em></h2><p>Customer stories can show what was done, when it happened and where the feedback came from.</p></div><div className="review-notes">{[["SOURCE","Google / approved source"],["DATE","Publication date"],["CONTEXT","What work was done"],["PERMISSION","Usage confirmed"]].map(([a,b],i)=><div key={a}><span>0{i+1}</span><small>{a}</small><b>{b}</b><ArrowUpRight size={15}/></div>)}</div></div></section>
  </Frame>
}

function Contact(){
  return <Frame eyebrow="12 / Contact & directions" title="Come by. Call first. Either way, make the next move easy." intro="283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.">
    <section className="contact-map"><div className="wrap contact-map-grid"><div className="map-art"><div className="map-road r1"/><div className="map-road r2"/><div className="map-road r3"/><div className="map-pin"><MapPin size={24}/><span>ASIAN<br/>AUTOMOBILES</span></div><span className="map-label l1">KATTOOR ROAD</span><span className="map-label l2">IRINJALAKUDA</span></div><div className="contact-console"><div><span className="eyebrow">CONTACT CONSOLE</span><h2>Talk to the workshop.</h2></div><a href={"tel:"+phone} className="console-row"><Phone/><span><small>PHONE</small><b>+91 93490 02038</b></span><ArrowUpRight/></a><div className="console-row"><Phone/><span><small>LANDLINE</small><b>0480 2828167</b></span></div><div className="console-row muted"><Clock3/><span><small>OPENING HOURS</small><b>Confirm before publishing</b></span></div><div className="console-row muted"><MessageCircle/><span><small>WHATSAPP</small><b>Official number to be confirmed</b></span></div></div></div></section>
  </Frame>
}

function FAQ(){
  const qs=[
    ["What services are offered?","The current site structure covers general car service and repairs, AC, accident repair, denting and painting, wheel alignment/balancing, tyre services and automobile spare parts. Final service scope remains subject to client approval."],
    ["Which vehicle brands do you service?","The exact current makes/models need client confirmation before publication."],
    ["Do you provide cashless insurance repair?","Insurance assistance is planned, but active insurer relationships must be verified before the site makes cashless claims."],
    ["What are the opening hours?","Hours are intentionally not published until conflicting directory listings are resolved."],
    ["Can I book a service online?","Yes, the site provides a booking enquiry route. The final submission and notification workflow should be connected during technical setup."],
    ["Can I send photos of damage or a part?","Yes. The quote route is designed for damage/reference photos once upload storage and notification handling are connected."]
  ];
  return <Frame eyebrow="13 / FAQ" title="The questions people actually ask before they drive over." intro="Short answers, with confirmation gates where the source material does not support a firm claim.">
    <section className="faq-stage"><div className="wrap faq-layout"><div className="faq-aside"><CircleHelp size={32}/><span>NO GUESSWORK</span><p>If a detail isn't verified, the answer says so.</p></div><div className="faq-list">{qs.map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span><b>{q}</b><ChevronRight/></summary><p>{a}</p></details>)}</div></div></section>
  </Frame>
}

function Form({quote=false}:{quote?:boolean}){
  return <section className={"form-stage "+(quote?"quote-stage":"booking-stage")}><div className="wrap form-layout"><div className="form-intro">{quote?<><span className="eyebrow">DAMAGE / PARTS DESK</span><h2>Show us what needs attention.</h2><p>Write it like you would tell a mechanic. Add photos when the final upload connection is enabled.</p><div className="form-side-note"><Camera size={18}/><span>Photos help explain dents, warning lights, parts and visible damage.</span></div></>:<><span className="eyebrow">SERVICE DESK</span><h2>Let's find a sensible time to talk.</h2><p>Give us the basics. The final booking workflow can route this to CRM, email or another approved channel.</p><div className="booking-steps"><span>01 / YOU</span><span>02 / VEHICLE</span><span>03 / SERVICE</span><span>04 / TIME</span></div></>}</div><div className="real-form"><label>Name<input placeholder="What should we call you?"/></label><label>Phone<input placeholder="A number we can reach"/></label><label>Vehicle make / model<input placeholder="e.g. Hyundai i20"/></label><label>{quote?"What needs attention?":"Service needed"}<input placeholder={quote?"Tell it in your own words":"Choose or describe the service"}/></label><label>Preferred date / time<input placeholder="Your preferred slot"/></label><label className="wide">More detail<textarea placeholder={quote?"Noise, damage, part number, warning light — anything useful.":"Anything we should know before the appointment?"}/></label>{quote&&<label className="upload wide"><Upload size={17}/><span>Attach damage / reference photos</span></label>}<button>Send enquiry <ArrowUpRight size={16}/></button><small>Demo frontend. Connect validation, storage, notifications, spam protection and privacy consent before production.</small></div></div></section>
}

function Booking({quote=false}){ 
  const eyebrow = quote ? "Request a quote / damage desk" : "Book a service / service desk";
  const title = quote ? "A photo can say more than a paragraph." : "Let's get the basics on the table.";
  const intro = quote
    ? "Send the problem in your own words and prepare the right details for a repair conversation."
    : "A focused enquiry form instead of a long generic contact page.";

  return (
    <Frame eyebrow={eyebrow} title={title} intro={intro}>
      <Form quote={quote}/>
    </Frame>
  );
}

function SpareRedirect(){return <Parts/>}

export default async function Page({params}:{params:Promise<{slug?:string[]}>}){
  const {slug=[]}=await params;
  const key=slug.join("/");
  const map:Record<string,()=>ReactNode>={
    about:About,services:Services,"car-service":CarService,"car-ac-repair":AC,
    "accident-repair":Accident,"denting-painting":Denting,"wheel-alignment":Wheel,
    "tyre-services":Tyres,"spare-parts":SpareRedirect,insurance:Insurance,
    facilities:Facilities,gallery:Gallery,reviews:Reviews,contact:Contact,faq:FAQ,
    "book-service":()=> <Booking/>,"request-quote":()=> <Booking quote/>
  };
  const PageView=map[key];
  if(!PageView) return <main className="creative-404"><div><span>404 / WRONG TURN</span><h1>Looks like we took the scenic route.</h1><p>This page isn't in the workshop.</p><CTA label="Back to the workshop"/></div></main>;
  return PageView();
}
