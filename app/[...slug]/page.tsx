import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp, Clock3, Compass,
  Droplets, Gauge, Images, MapPin, Phone, ShieldCheck, Sparkles, Upload,
  Wrench, Wind, CarFront, ClipboardCheck, Palette, Disc3, PackageSearch,
  Route, Camera, FileCheck2, MessageCircle, ChevronRight
} from "lucide-react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { businessFacts, directionsHref } from "@/lib/business-facts";
import {
  BlueprintTimeline,
  ExpandGallery,
  HoverStatRail,
  MotionFaq,
  PageProgressRail,
  ScrollRevealSection,
} from "@/components/immersive/inner-page-experiences";

const img = {
  workshop:"https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=74",
  repair:"https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=74",
  car:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=74",
  road:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=74",
  detail:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1440&q=74",
  interior:"https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1440&q=74"
};

const phone=businessFacts.phones.primaryHref;

function CTA({label="Book a Service",href="/book-service/"}:{label?:string;href?:string}){
  return <Link data-magnetic prefetch={false} className="primary-link" href={href}>{label}<ArrowUpRight size={15}/></Link>;
}
function Call(){ return <a data-magnetic className="outline-link" href={"tel:"+phone}><Phone size={15}/>Call the workshop</a>; }
function Back(){ return <Link data-magnetic prefetch={false} className="back" href="/"><ArrowLeft size={15}/>Asian Automobiles / Home</Link>; }

function Frame({eyebrow,title,intro,children,theme="paper"}:{eyebrow:string;title:string;intro?:string;children:ReactNode;theme?:string}){
  return <main className={"creative-page immersive-page immersive-page-v9 "+theme}><PageProgressRail/>
    <section className="creative-head">
      <div className="creative-head-grid" aria-hidden="true"/>
      <div className="wrap creative-wrap">
        <Back/>
        <div className="creative-heading aa-view-reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {intro&&<p>{intro}</p>}
        </div>
        <a data-magnetic href="#page-content" className="creative-compass">
          <span>SCROLL / FOLLOW THE DETAILS</span>
          <ArrowRight size={16}/>
        </a>
      </div>
    </section>
    <div id="page-content" className="creative-body">{children}</div>
  </main>
}

function About(){
  return <Frame eyebrow="About / Asian Automobiles" title="Independent multi-brand service and automobile parts in Irinjalakuda." intro="Public copy is constrained to the verified business foundation in the supplied client blueprint.">
    <section className="about-opening"><div className="wrap about-grid"><div className="year-mark"><span>LOCAL</span><strong>AA</strong><small>{businessFacts.address.locality.toUpperCase()} · {businessFacts.address.region.toUpperCase()}</small></div><div><span className="eyebrow">VERIFIED BUSINESS FOUNDATION</span><h2>Service & repair.<br/><em>Automobile spare parts.</em></h2><p>Asian Automobiles is positioned in the supplied blueprint as an independent multi-brand service center for private cars, with automobile parts and car repair & services as the two connected business pillars.</p><div className="about-proof"><span><Check/>Independent multi-brand</span><span><Wrench/>Car repair & services</span><span><PackageSearch/>Automobile spare parts</span></div></div></div></section>
    <section className="timeline-section timeline-section-v9"><div className="wrap"><div className="timeline-intro"><span className="eyebrow">A / VERIFIED POSITIONING</span><p>The blueprint prioritizes clear service discovery, direct workshop contact, real photography and only verified public claims.</p></div><BlueprintTimeline items={[
      {no:"01",label:"POSITIONING",title:"Private cars / multibrand",text:"Asian Automobiles is positioned as an independent multi-brand service center for private cars."},
      {no:"02",label:"BUSINESS MODEL",title:"Service + parts",text:"Car repair & services and automobile spare parts are the two verified business pillars."},
      {no:"03",label:"LOCATION",title:"Irinjalakuda",text:businessFacts.address.full+"."}
    ]}/></div></section>
  </Frame>
}

function Services(){
  const cards: Array<[string,string,string,string,typeof Wrench]> = [
    ["01","Routine / mechanical","General car service & repairs","/services/car-service/",Wrench],
    ["02","AC / service","Car AC service & repair","/services/car-ac-repair/",Wind],
    ["03","Accident / bodywork","Denting, painting & accident repair","/services/accident-repair/",CarFront],
    ["04","Wheels / tyres","Wheel alignment, balancing & tyre services","/services/wheel-alignment/",Disc3],
    ["05","Parts / enquiry","Automobile spare parts","/spare-parts/",PackageSearch]
  ];
  return <Frame eyebrow="Services / start with the symptom" title="Start with what the car is doing." intro="No need to know the workshop vocabulary first. Pick the situation that sounds like yours.">
    <section className="service-command"><div className="wrap"><div className="command-bar"><span><Sparkles size={15}/>WHAT BROUGHT YOU HERE?</span><small>CHOOSE A STARTING POINT</small></div><div className="command-grid">{cards.map(([n,k,t,href,Icon])=><Link href={href as string} data-magnetic className="command-card" key={n as string}><span className="command-number">{n}</span><Icon size={22}/><small>{k}</small><h2>{t}</h2><span className="command-go"><ArrowRight size={16}/></span></Link>)}</div></div></section>
    <section className="service-closer"><div className="wrap service-closer-grid"><div><span className="eyebrow">Still not sure?</span><h2>Tell us what<br/>the car is doing.</h2></div><div><p>You don't have to diagnose it yourself. Describe the symptom in your own words and start from there.</p><CTA label="Describe the problem" href="/request-quote/"/></div></div></section>
  </Frame>
}

function CarService(){
  return <Frame eyebrow="01 / General car service & repairs" title="Routine maintenance and mechanical repair." intro="A dedicated enquiry path for the verified general car service and repair category.">
    <section className="diagnostic"><div className="wrap"><div className="diagnostic-top"><div><span className="eyebrow">SERVICE DESK / 01</span><h2>Start with the service need.</h2></div><span className="status-pill"><span/>MULTI-BRAND / PRIVATE CARS</span></div><div className="symptom-grid">{["Routine maintenance","Mechanical repair","General service enquiry"].map((x,i)=><div className="symptom" key={x}><span>0{i+1}</span><b>{x}</b><ChevronRight size={16}/></div>)}</div><div className="diagnostic-flow"><div><ClipboardCheck size={20}/><small>STEP 01</small><h3>Share details</h3><p>Provide the vehicle and the service or repair requirement.</p></div><div><Gauge size={20}/><small>STEP 02</small><h3>Confirm scope</h3><p>The workshop confirms the appropriate next step for the enquiry.</p></div><div><Wrench size={20}/><small>STEP 03</small><h3>Service / repair</h3><p>Proceed with the agreed service or repair scope.</p></div></div></div></section>
    <section className="split-photo"><div className="wrap"><Image src={img.detail} alt="Temporary automotive service visual pending approved workshop photography" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 55vw"/><div><span className="eyebrow">VERIFIED SCOPE</span><h2>General service and mechanical repair.</h2><p>Exact workshop workflow, equipment and vehicle-brand coverage remain confirmation-gated until approved by the client.</p><CTA label="Book a service"/></div></div></section>
  </Frame>
}

function AC(){
  return <Frame eyebrow="02 / Car AC service & repair" title="Car AC service and repair in Irinjalakuda." intro="A dedicated enquiry path for the verified AC service and repair category.">
    <section className="thermal"><div className="wrap thermal-grid"><div className="thermal-visual"><div className="thermal-ring"><Wind size={34}/><strong>AC</strong><span>COOLING<br/>CHECK</span></div><div className="thermal-readings"><span>FLOW <b>01</b></span><span>COMFORT <b>02</b></span><span>SYSTEM <b>03</b></span></div></div><div className="thermal-copy"><span className="eyebrow">VERIFIED SERVICE SCOPE</span><h2>AC service.<br/>AC repair.</h2><p>The blueprint supports car AC service and repair. Refrigerants, machine models and exact procedures are intentionally not published until confirmed.</p><div className="ac-tags">{["CAR AC SERVICE","CAR AC REPAIR","IRINJALAKUDA"].map(x=><span key={x}>{x}</span>)}</div><CTA label="Request AC service"/></div></div></section>
    <section className="dark-callout"><div className="wrap"><span className="eyebrow light">DIRECT CONTACT</span><h2>Need AC service?<br/><i>Contact the workshop.</i></h2><Call/></div></section>
  </Frame>
}

function Accident(){
  return <Frame eyebrow="03 / Accident repair" title="You've already had the bad moment. The next step should feel simpler." intro="A calmer path from damage photos to repair enquiry and insurance assistance.">
    <section className="incident"><div className="wrap"><div className="incident-board"><div className="incident-label"><span>ACCIDENT REPAIR ENQUIRY</span><b>PROPOSED EXPLANATORY FLOW</b></div><div className="incident-main"><div className="incident-icon"><CarFront size={34}/></div><div><small>FIRST THING</small><h2>Show us what happened.</h2><p>Photos, a short description and your contact details are enough to start the conversation.</p></div></div><div className="dropzone"><Upload size={21}/><b>Prepare damage photos</b><span>photo upload is supported in the Request a Quote flow</span></div></div><BlueprintTimeline items={[
      {no:"01",label:"ACCIDENT",title:"Share damage details",text:"Start with the vehicle, contact details and visible damage information."},
      {no:"02",label:"CONTACT",title:"Start the workshop enquiry",text:"Use the accident-repair route or call the verified workshop number."},
      {no:"03",label:"SURVEY / APPROVAL",title:"Coordination where applicable",text:"Survey and approval coordination depends on the insurer and case."},
      {no:"04",label:"REPAIR",title:"Proceed with agreed scope",text:"Repair proceeds after the applicable scope and approvals are agreed."},
      {no:"05",label:"HANDOVER",title:"Complete the repair journey",text:"The exact internal handover workflow remains subject to workshop confirmation."}
    ]}/></div></section>
    <section className="photo-statement"><div className="wrap"><Image src={img.repair} alt="Automotive accident repair" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 55vw"/><div><span className="eyebrow">KEEP IT SIMPLE</span><h2>No insurance jargon required.</h2><p>Cashless repair assistance has its own enquiry path. Current insurer participation and case eligibility should be confirmed with the workshop before repair work begins.</p><Link data-magnetic className="dark-link" href="/insurance/">See insurance assistance <ArrowUpRight size={16}/></Link></div></div></section>
  </Frame>
}

function Denting(){
  return <Frame eyebrow="04 / Denting & painting" title="Bodywork is detail work." intro="A visual route for dents, scratches, panels and paint-related enquiries.">
    <section className="paint-studio"><div className="wrap"><div className="studio-header"><span className="eyebrow">BODY SHOP / VISUAL CHECK</span><h2>Show the mark.<br/><em>We'll start there.</em></h2></div><div className="before-after"><div className="ba-image first"><Image src={img.car} alt="Temporary automotive bodywork reference visual" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 55vw"/><span>DAMAGE / REFERENCE</span></div><div className="ba-image second"><Image src={img.detail} alt="Temporary automotive finish reference visual" width={1440} height={1000} sizes="(max-width: 900px) 100vw, 50vw"/><span>FINISH / REFERENCE</span></div><div className="ba-divider"/></div><div className="paint-notes"><span><Palette/>Denting & painting</span><span><CarFront/>Accident restoration</span><span><Camera/>Damage photo upload</span><CTA label="Send damage details" href="/request-quote/"/></div></div></section>
  </Frame>
}

function Wheel(){
  return <Frame eyebrow="05 / Wheel alignment & balancing" title="If the car isn't going straight, start with the wheels." intro="Alignment, balancing, tyre and rim repair enquiries in one focused visual.">
    <section className="alignment"><div className="wrap alignment-grid"><div className="alignment-graphic"><div className="wheel-axis a"/><div className="wheel-axis b"/><div className="wheel left"/><div className="wheel right"/><span>TRACK / 01</span><span>ALIGN / 02</span></div><div className="alignment-copy"><span className="eyebrow">VERIFIED WHEEL / TYRE SCOPE</span><h2>Alignment.<br/>Balancing. Tyres. Rims.</h2><div className="wheel-signals">{["Computerized wheel alignment","Wheel balancing","Tyre repair","Rim repair"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span><ArrowRight size={14}/></div>)}</div><CTA label="Book wheel service" href="/book-service/"/></div></div></section>
    <section className="micro-strip"><div className="wrap"><span>ALIGNMENT</span><span>BALANCING</span><span>TYRE REPAIR</span><span>RIM REPAIR</span></div></section>
  </Frame>
}

function Tyres(){
  return <Frame eyebrow="06 / Tyre services" title="Tyre repair, balancing and rim-repair enquiries." intro="A dedicated route for the verified wheel and tyre service scope.">
    <section className="tyre-wall"><div className="wrap"><div className="tyre-hero-card"><div className="tread"><span/><span/><span/><span/><span/></div><div><span className="eyebrow light">VERIFIED SERVICE SCOPE</span><h2>Tyre repair.<br/>Wheel balancing.</h2><p>Rim repair and tyre-service enquiries are also included in the verified service list.</p><CTA label="Start a tyre enquiry" href="/request-quote/"/></div></div><div className="tyre-grid">{["Tyre repair / puncture","Wheel balancing","Rim repair","Tyre enquiry"].map((x,i)=><div key={x}><small>0{i+1}</small><h3>{x}</h3><ArrowUpRight size={17}/></div>)}</div></div></section>
  </Frame>
}

function Parts(){
  return <Frame eyebrow="07 / Automobile spare parts" title="Automobile spare parts, enquiry first." intro="The blueprint gives the parts business equal visibility to service and repair, without assuming a live inventory or ecommerce system.">
    <section className="parts-desk"><div className="wrap parts-grid"><HoverStatRail items={[
      {no:"01",label:"Name / phone",text:"Contact details for the parts enquiry."},
      {no:"02",label:"Vehicle / part",text:"Vehicle information or the part requirement."},
      {no:"03",label:"Quantity",text:"Quantity where relevant to the request."},
      {no:"04",label:"Notes",text:"Any additional reference information."}
    ]}/><div className="parts-receipt"><PackageSearch size={30}/><span>PARTS INQUIRY</span><h2>Tell us what<br/>you need.</h2><p>Product availability, warranty wording and OEM authorization are not assumed. Exact terms should be confirmed with the workshop.</p><Link data-magnetic className="primary-link" href="/request-quote/">Make a parts enquiry <ArrowUpRight size={15}/></Link></div></div></section>
  </Frame>
}

function Insurance(){
  return <Frame eyebrow="08 / Cashless insurance repairs" title="Insurance repair assistance, with current eligibility confirmed case by case." intro="The supplied research references cashless-network relationships with New India Assurance and United India Insurance; current participation must still be confirmed with the workshop.">
    <section className="claims"><div className="wrap"><BlueprintTimeline items={[
      {no:"01",label:"ACCIDENT",title:"Start the repair enquiry",text:"Begin with the vehicle and accident details."},
      {no:"02",label:"CONTACT",title:"Share insurer details",text:"Provide insurer information so current eligibility can be checked."},
      {no:"03",label:"SURVEY / APPROVAL",title:"Coordination where applicable",text:"Survey and approval steps vary by case and insurer."},
      {no:"04",label:"REPAIR",title:"Approved repair scope",text:"Proceed after the applicable repair scope and approvals are clear."},
      {no:"05",label:"HANDOVER",title:"Complete the repair journey",text:"Exact internal handover steps remain client-confirmation dependent."}
    ]}/><div className="claims-note"><ShieldCheck size={24}/><div><b>Research references / confirmation required</b><p>{businessFacts.insurance.publicNote}</p></div></div></div></section>
    <section className="insurance-actions"><div className="wrap"><span className="eyebrow">YOUR NEXT MOVE</span><h2>Have the photos?<br/><em>Start the enquiry.</em></h2><div><CTA label="Request repair assistance" href="/request-quote/"/><Call/></div></div></section>
  </Frame>
}

function Facilities(){
  const zones=[
    ["Workshop floor",img.workshop,"PHOTO BRIEF"],
    ["Service bays",img.workshop,"PHOTO BRIEF"],
    ["Alignment equipment",img.road,"PHOTO BRIEF"],
    ["Parts inventory",img.repair,"PHOTO BRIEF"],
    ["Repair activity",img.detail,"PHOTO BRIEF"],
    ["Customer-facing areas",img.interior,"PHOTO BRIEF"]
  ];
  return <Frame eyebrow="09 / Our facilities" title="Workshop proof should come from the real workshop." intro="The blueprint prioritizes real photography of the workshop floor, service bays, alignment equipment, parts inventory, repair activity and customer-facing areas.">
    <section className="facility-map"><div className="wrap"><ExpandGallery items={zones.map(([label,image,eyebrow])=>({label,eyebrow,image,alt:"Temporary visual placeholder pending approved Asian Automobiles "+label.toLowerCase()+" photography"}))}/><div className="facility-caption"><div><span className="eyebrow">VERIFIED CONTENT RULE</span><h2>Real photography.<br/><em>No invented facility specs.</em></h2></div><p>Exact bay count, lift count, equipment brands and customer amenities stay off the public site until directly confirmed by the client.</p></div></div></section>
  </Frame>
}

function Gallery(){
  const items=[[img.workshop,"WORKSHOP"],[img.repair,"REPAIRS"],[img.car,"PARTS"],[img.detail,"TEAM"],[img.interior,"EXTERIOR"],[img.road,"COMPLETED WORK"]];
  return <Frame eyebrow="10 / Gallery" title="The final gallery belongs to real workshop photography." intro="The blueprint defines six gallery filters: Workshop, Repairs, Parts, Team, Exterior and Completed Work. Current generic imagery is temporary until approved Asian Automobiles photography is supplied.">
    <section className="gallery-wall gallery-wall-v9"><div className="wrap"><ExpandGallery items={items.map(([image,label])=>({label,eyebrow:"GALLERY FILTER",image,alt:"Temporary visual placeholder for "+label.toLowerCase()}))}/></div></section>
  </Frame>
}

function Reviews(){
  return <Frame eyebrow="11 / Reviews & customer stories" title="Only attributable reviews belong here." intro="The blueprint requires public reviews to retain source, date and context, and customer stories to be consented rather than fabricated.">
    <section className="review-wall"><div className="wrap"><div className="review-statement"><span className="eyebrow">PROOF / NOT PERFORMANCE</span><h2>Real words.<br/><em>Real context.</em></h2><p>Customer stories can show what was done, when it happened and where the feedback came from.</p></div><div className="review-notes">{[["SOURCE","Google / approved source"],["DATE","Publication date"],["CONTEXT","What work was done"],["PERMISSION","Usage confirmed"]].map(([a,b],i)=><div key={a}><span>0{i+1}</span><small>{a}</small><b>{b}</b><ArrowUpRight size={15}/></div>)}</div></div></section>
  </Frame>
}

function Contact(){
  return <Frame eyebrow="12 / Contact & directions" title="Contact Asian Automobiles in Irinjalakuda." intro={businessFacts.address.full + "."}>
    <section className="contact-map"><div className="wrap contact-map-grid"><div className="map-art"><div className="map-road r1"/><div className="map-road r2"/><div className="map-road r3"/><div className="map-pin"><MapPin size={24}/><span>ASIAN<br/>AUTOMOBILES</span></div><span className="map-label l1">KATTOOR ROAD</span><span className="map-label l2">{businessFacts.address.locality.toUpperCase()}</span></div><div className="contact-console"><div><span className="eyebrow">VERIFIED CONTACT</span><h2>Talk to the workshop.</h2></div><a href={"tel:"+businessFacts.phones.primaryHref} data-magnetic className="console-row"><Phone/><span><small>PRIMARY PHONE</small><b>{businessFacts.phones.primaryDisplay}</b></span><ArrowUpRight/></a><a href={"tel:"+businessFacts.phones.landlineHref} data-magnetic className="console-row"><Phone/><span><small>LANDLINE</small><b>{businessFacts.phones.landlineDisplay}</b></span><ArrowUpRight/></a><div className="console-row muted"><Clock3/><span><small>OPENING HOURS</small><b>Call to confirm before travelling</b></span></div><a href={directionsHref} target="_blank" rel="noreferrer" data-magnetic className="console-row"><MapPin/><span><small>DIRECTIONS</small><b>Kattoor Road, Irinjalakuda</b></span><ArrowUpRight/></a></div></div></section>
  </Frame>
}

function FAQ(){
  const qs=[
    ["What services are offered?","Asian Automobiles handles general car service and repairs, AC, accident repair, denting and painting, wheel alignment and balancing, tyre services and automobile spare-parts enquiries."],
    ["Which vehicle brands do you service?","For vehicle-specific service availability, call the workshop with your make, model and year."],
    ["Do you provide cashless insurance repair?","Insurance assistance is available as an enquiry route. Call the workshop to confirm insurer-specific eligibility and the process for your case."],
    ["What are the opening hours?","Please call the workshop to confirm today's opening hours before travelling."],
    ["How do I start a service booking?","Use the service enquiry page to prepare the vehicle and service details, or call the workshop directly to arrange the next step."],
    ["Can I upload damage photos?","The Request a Quote flow is designed to accept photos where applicable, especially for accident and body-repair enquiries."]
  ];
  return <Frame eyebrow="13 / FAQ" title="The questions people actually ask before they drive over." intro="Straight answers to the questions that matter before you call, book or drive over.">
    <section className="faq-stage"><div className="wrap faq-layout"><div className="faq-aside"><CircleHelp size={32}/><span>NO GUESSWORK</span><p>If a detail isn't verified, the answer says so.</p></div><MotionFaq items={qs.map(([question,answer])=>({question,answer}))}/></div></section>
  </Frame>
}

function Form({quote=false}:{quote?:boolean}){
  return <section className={"form-stage "+(quote?"quote-stage":"booking-stage")}><div className="wrap form-layout"><div className="form-intro">{quote?<><span className="eyebrow">DAMAGE / PARTS DESK</span><h2>Show us what needs attention.</h2><p>Write it like you would tell a mechanic. Clear details make the repair conversation easier.</p><div className="form-side-note"><Camera size={18}/><span>Photo upload is especially useful for accident and body-repair enquiries.</span></div></>:<><span className="eyebrow">SERVICE DESK</span><h2>Let's find a sensible time to talk.</h2><p>Keep the useful details together: who you are, which vehicle, what it needs and when you would prefer to visit.</p><div className="booking-steps"><span>01 / YOU</span><span>02 / VEHICLE</span><span>03 / SERVICE</span><span>04 / TIME</span></div></>}</div><div className="real-form"><label>Name<input placeholder="What should we call you?"/></label><label>Phone<input placeholder="A number we can reach"/></label><label>Vehicle make / model<input placeholder="e.g. Hyundai i20"/></label><label>{quote?"What needs attention?":"Service needed"}<input placeholder={quote?"Tell it in your own words":"Choose or describe the service"}/></label>{!quote&&<label>Preferred date / time<input placeholder="Your preferred slot"/></label>}<label className="wide">More detail<textarea placeholder={quote?"Service, parts or damage details.":"Anything we should know before the appointment?"}/></label>{quote&&<label className="upload wide"><Upload size={17}/><span>Attach damage / reference photos</span></label>}<button>Send enquiry <ArrowUpRight size={16}/></button><small>Prefer to speak to someone? Call {businessFacts.phones.primaryDisplay}. The official WhatsApp number and form-routing endpoints remain confirmation-gated.</small></div></div></section>
}

function Booking({quote=false}){ 
  const eyebrow = quote ? "Request a quote / damage desk" : "Book a service / service desk";
  const title = quote ? "A photo can say more than a paragraph." : "Let's get the basics on the table.";
  const intro = quote
    ? "Send the problem in your own words and prepare the right details for a repair conversation."
    : "Keep the useful vehicle and service details together before you contact the workshop.";

  return (
    <Frame eyebrow={eyebrow} title={title} intro={intro}>
      <Form quote={quote}/>
    </Frame>
  );
}

function SpareRedirect(){return <Parts/>}

const routeMeta: Record<string, { title: string; description: string }> = {
  about: {
    title: "About Asian Automobiles | Irinjalakuda",
    description: "Learn about Asian Automobiles, its multi-brand automobile service and parts business in Irinjalakuda, Kerala.",
  },
  services: {
    title: "Car Service & Repair in Irinjalakuda | Asian Automobiles",
    description: "Explore general car service, AC repair, accident restoration, denting and painting, wheel services, tyre repair and spare-parts enquiries.",
  },
  "services/car-service": {
    title: "General Car Service & Repair | Asian Automobiles",
    description: "General car service and mechanical repair enquiries in Irinjalakuda, Kerala.",
  },
  "services/car-ac-repair": {
    title: "Car AC Service & Repair | Asian Automobiles",
    description: "Car AC service and repair enquiries in Irinjalakuda, Kerala.",
  },
  "services/accident-repair": {
    title: "Accident Repair & Restoration | Asian Automobiles",
    description: "Accident restoration, denting and painting enquiries with a direct path to insurance assistance.",
  },
  "services/denting-painting": {
    title: "Car Denting & Painting | Asian Automobiles",
    description: "Denting, painting and body-repair enquiries from Asian Automobiles in Irinjalakuda.",
  },
  "services/wheel-alignment": {
    title: "Wheel Alignment & Balancing | Asian Automobiles",
    description: "Computerized wheel alignment, wheel balancing, tyre repair and rim-repair enquiries in Irinjalakuda.",
  },
  "services/tyre-services": {
    title: "Tyre Services | Asian Automobiles",
    description: "Tyre repair, balancing and related wheel-service enquiries in Irinjalakuda, Kerala.",
  },
  "spare-parts": {
    title: "Automobile Spare Parts | Asian Automobiles",
    description: "Automobile spare-parts enquiries from Asian Automobiles in Irinjalakuda.",
  },
  insurance: {
    title: "Cashless Insurance Repair Assistance | Asian Automobiles",
    description: "Start an accident-repair and insurance-assistance enquiry with Asian Automobiles.",
  },
  facilities: {
    title: "Workshop Facilities | Asian Automobiles",
    description: "Facilities page for approved Asian Automobiles workshop photography and verified facility information.",
  },
  gallery: {
    title: "Gallery | Asian Automobiles",
    description: "Gallery for approved Asian Automobiles workshop, repair, parts, team, exterior and completed-work photography.",
  },
  reviews: {
    title: "Customer Stories | Asian Automobiles",
    description: "Customer feedback and service stories presented with source and context.",
  },
  contact: {
    title: "Contact Asian Automobiles | Irinjalakuda",
    description: "Call Asian Automobiles or find the workshop on Kattoor Road, Irinjalakuda, Thrissur, Kerala.",
  },
  faq: {
    title: "FAQ | Asian Automobiles",
    description: "Answers about services, insurance assistance, vehicle enquiries, booking and workshop contact.",
  },
  "book-service": {
    title: "Book a Service | Asian Automobiles",
    description: "Prepare your vehicle and service details before contacting Asian Automobiles in Irinjalakuda.",
  },
  "request-quote": {
    title: "Request a Repair or Parts Quote | Asian Automobiles",
    description: "Prepare the useful vehicle, damage or parts details for a quote conversation with Asian Automobiles.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const rawKey = slug.join("/");
  const key = rawKey.startsWith("services/") || rawKey === "services"
    ? rawKey
    : rawKey === "car-service" || rawKey === "car-ac-repair" || rawKey === "accident-repair" || rawKey === "denting-painting" || rawKey === "wheel-alignment" || rawKey === "tyre-services"
      ? `services/${rawKey}`
      : rawKey;
  const meta = routeMeta[key];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${key}/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function Page({params}:{params:Promise<{slug?:string[]}>}){
  const {slug=[]}=await params;
  const key=slug.join("/");
  const map:Record<string,()=>ReactNode>={
    about:About,services:Services,
    "car-service":CarService,"services/car-service":CarService,
    "car-ac-repair":AC,"services/car-ac-repair":AC,
    "accident-repair":Accident,"services/accident-repair":Accident,
    "denting-painting":Denting,"services/denting-painting":Denting,
    "wheel-alignment":Wheel,"services/wheel-alignment":Wheel,
    "tyre-services":Tyres,"services/tyre-services":Tyres,
    "spare-parts":SpareRedirect,"services/spare-parts":SpareRedirect,insurance:Insurance,
    facilities:Facilities,gallery:Gallery,reviews:Reviews,contact:Contact,faq:FAQ,
    "book-service":()=> <Booking/>,"request-quote":()=> <Booking quote/>
  };
  const PageView=map[key];
  if(!PageView) return <main className="creative-404"><div><span>404 / WRONG TURN</span><h1>Looks like we took the scenic route.</h1><p>This page isn't in the workshop.</p><CTA label="Back to the workshop"/></div></main>;
  return PageView();
}
