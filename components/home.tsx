"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, ShieldCheck, Star, Wrench, Zap } from "lucide-react";
import { CarScene } from "@/components/car-scene";

const imagery = {
  hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=88",
  workshop: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=88",
  detail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=88",
  wheel: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=88",
};

const services = [
  { n:"01", title:"General Service", copy:"Maintenance, inspection and mechanical care.", href:"/services/car-service", image:imagery.workshop, icon:Wrench },
  { n:"02", title:"AC Repair", copy:"Diagnostics, cooling and climate-system repair.", href:"/services/car-ac-repair", image:imagery.detail, icon:Zap },
  { n:"03", title:"Accident Repair", copy:"Body restoration with a clear insurance path.", href:"/services/accident-repair", image:imagery.hero, icon:ShieldCheck },
  { n:"04", title:"Wheels & Tyres", copy:"Alignment, balancing, tyres and wheel care.", href:"/services/wheel-alignment", image:imagery.wheel, icon:Wrench },
];

function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
  return <motion.div className={className} initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.75,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

function MagneticButton({href,children,light=false}:{href:string;children:React.ReactNode;light?:boolean}) {
  const ref=useRef<HTMLAnchorElement>(null);
  return <Link ref={ref} href={href} className={`aa-magnetic ${light?"aa-magnetic-light":""}`} onMouseMove={(event)=>{
    const rect=ref.current?.getBoundingClientRect();
    if(!rect||!ref.current)return;
    ref.current.style.setProperty("--mx",((event.clientX-rect.left)/rect.width*100)+"%");
    ref.current.style.setProperty("--my",((event.clientY-rect.top)/rect.height*100)+"%");
  }}><span className="aa-magnetic-glow"/><span className="aa-magnetic-label">{children}</span><ArrowUpRight size={16}/></Link>;
}

function WordReveal({children,muted=false}:{children:string;muted?:boolean}) {
  return <span className={`aa-word-wrap ${muted?"is-muted":""}`}><motion.span initial={{y:"110%"}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.85,ease:[.16,1,.3,1]}}>{children}</motion.span></span>;
}

function ServiceRow({service}:{service:(typeof services)[number]}) {
  const Icon=service.icon;
  return <Link href={service.href} className="aa-service-row">
    <span className="aa-service-number">{service.n}</span>
    <div className="aa-service-title"><h3>{service.title}</h3><p>{service.copy}</p></div>
    <span className="aa-service-copy">{service.copy}</span>
    <span className="aa-service-action"><Icon size={18} strokeWidth={1.5} className="service-icon"/><ArrowUpRight size={18} className="service-arrow"/></span>
    <span className="aa-service-preview"><img src={service.image} alt=""/></span>
  </Link>;
}

export function Home() {
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:120,damping:30});
  const heroScale=useTransform(scrollYProgress,[0,.3],[1.04,1]);
  const heroY=useTransform(scrollYProgress,[0,.3],[0,90]);

  return <main className="aa-site">
    <motion.div className="aa-progress" style={{scaleX:progress}}/>
    <section className="aa-hero">
      <motion.div className="aa-hero-image" style={{scale:heroScale,y:heroY,backgroundImage:`url(${imagery.hero})`}}/>
      <div className="aa-hero-overlay"/><div className="aa-hero-grain"/>
      <div className="aa-container aa-hero-inner">
        <div className="aa-hero-meta"><span>01 / AUTOMOTIVE CARE</span><span>IRINJALAKUDA / KERALA</span><span>EST. 1996</span></div>
        <div className="aa-hero-main">
          <p className="aa-eyebrow aa-eyebrow-light">INDEPENDENT WORKSHOP / SERIOUS ABOUT CARS</p>
          <h1 className="aa-display aa-hero-title"><WordReveal>KEEP</WordReveal><WordReveal muted>MOVING.</WordReveal></h1>
          <div className="aa-hero-copy-row"><p>A considered service experience for everyday maintenance, serious repairs and the moments when your vehicle needs more than a quick fix.</p><MagneticButton href="/book-service">Book a service</MagneticButton></div>
        </div>
        <div className="aa-hero-bottom"><div><span>CORE SERVICES</span><strong>05+</strong></div><div><span>CUSTOMER PATH</span><strong>01</strong><em>CALL → INSPECT → REPAIR</em></div><div className="aa-scroll-note"><span>SCROLL</span><ArrowDown size={15}/></div></div>
      </div>
    </section>

    <section className="aa-about aa-section">
      <div className="aa-container aa-two-column">
        <Reveal><p className="aa-eyebrow">02 / THE WORK</p><p className="aa-side-copy">No noisy template language. Just a clear, considered experience around the work we actually do.</p></Reveal>
        <Reveal><h2 className="aa-display aa-big-heading"><WordReveal>YOUR CAR.</WordReveal><WordReveal muted>OUR CRAFT.</WordReveal></h2><div className="aa-text-with-link"><p>From preventive maintenance to accident restoration, Asian Automobiles brings the service journey into focus — what you need, why you need it, and what happens next.</p><Link href="/about" className="aa-text-link">Meet the workshop <ArrowUpRight size={15}/></Link></div></Reveal>
      </div>
    </section>

    <section className="aa-services aa-section"><div className="aa-container">
      <div className="aa-section-intro"><div><p className="aa-eyebrow">03 / SERVICES</p><h2 className="aa-section-title">THE GARAGE <span>AT A GLANCE.</span></h2></div><span className="aa-section-note">HOVER TO EXPLORE</span></div>
      <div className="aa-service-list">{services.map((service)=><ServiceRow key={service.n} service={service}/>)}</div>
      <Link href="/services" className="aa-text-link aa-list-link">View all services <ArrowUpRight size={15}/></Link>
    </div></section>

    <section className="aa-workshop aa-section aa-dark"><div className="aa-container">
      <div className="aa-workshop-head"><div><p className="aa-eyebrow aa-eyebrow-light">04 / THE WORKSHOP</p><h2 className="aa-section-title aa-light">BUILT FOR <span>THE REAL WORLD.</span></h2></div><p className="aa-workshop-copy">A visual interlude that lets the space feel practical, precise and focused on the machine.</p></div>
      <div className="aa-photo-grid">
        <Reveal className="aa-photo aa-photo-large"><img src={imagery.workshop} alt="Automotive workshop"/><div className="aa-photo-caption"><span>WORKSHOP / 01</span><strong>Precision before promises.</strong></div></Reveal>
        <Reveal className="aa-photo aa-photo-small" delay={.08}><img src={imagery.detail} alt="Car detail"/><div className="aa-photo-caption"><span>DETAIL / 02</span><strong>Every line matters.</strong></div></Reveal>
      </div>
    </div></section>

    <section className="aa-machine aa-section"><div className="aa-container">
      <div className="aa-machine-head aa-two-column"><Reveal><p className="aa-eyebrow">05 / MACHINE STUDY</p><p className="aa-side-copy">One deliberate interactive moment. Move over the machine to reveal its form.</p></Reveal><Reveal><h2 className="aa-section-title">LOOK CLOSER.</h2></Reveal></div>
      <div className="aa-machine-stage"><CarScene/><div className="aa-machine-label"><span>VEHICLE / 001</span><strong>ROTATE<br/>THE MACHINE.</strong></div><div className="aa-machine-spec"><span>INTERACTION</span><b>POINTER-DRIVEN</b><span>DETAIL STUDY</span></div></div>
    </div></section>

    <section className="aa-accident aa-section"><div className="aa-container"><Reveal><p className="aa-eyebrow">06 / ACCIDENT SUPPORT</p><h2 className="aa-display aa-accident-title"><WordReveal>ACCIDENT?</WordReveal><WordReveal muted>WE'VE GOT YOU.</WordReveal></h2><div className="aa-accident-foot"><p>Start with the damage, share the details and let the workshop guide the next step with a clear repair path.</p><div className="aa-actions"><MagneticButton href="/insurance">Insurance assistance</MagneticButton><Link href="/request-quote" className="aa-outline-button">Request a quote <ArrowUpRight size={15}/></Link></div></div></Reveal></div></section>

    <section className="aa-trust aa-section aa-dark"><div className="aa-container">
      <div className="aa-section-intro aa-trust-head"><div><p className="aa-eyebrow aa-eyebrow-light">07 / TRUST</p><h2 className="aa-section-title aa-light">WHAT PEOPLE <span>SAY.</span></h2></div><span className="aa-section-note aa-dark-note">03 REVIEWS</span></div>
      <div className="aa-testimonial-track">{[
        "Clear communication and the car was ready when promised.",
        "The accident repair process was much easier than expected.",
        "Professional service without the usual workshop confusion."
      ].map((quote,index)=><Reveal key={quote} className="aa-testimonial" delay={index*.08}><div className="aa-stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div><p>“{quote}”</p><span>Customer / Kerala</span></Reveal>)}</div>
    </div></section>

    <section className="aa-contact aa-section"><div className="aa-container aa-contact-grid">
      <Reveal><p className="aa-eyebrow">08 / FIND US</p><h2 className="aa-display aa-contact-title"><WordReveal>COME</WordReveal><WordReveal muted>OVER.</WordReveal></h2></Reveal>
      <Reveal className="aa-contact-card"><p><MapPin size={17}/>283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p><div className="aa-actions"><MagneticButton href="/contact">Get directions</MagneticButton><a href="tel:+919349002038" className="aa-outline-button">+91 93490 02038</a></div></Reveal>
    </div></section>

    <section className="aa-final aa-section aa-dark"><div className="aa-container"><Reveal><p className="aa-eyebrow aa-eyebrow-light">09 / NEXT MOVE</p><h2 className="aa-display aa-final-title"><WordReveal>KEEP</WordReveal><WordReveal muted>MOVING.</WordReveal></h2><MagneticButton href="/book-service" light>Book your service <CalendarDays size={16}/></MagneticButton></Reveal></div></section>
  </main>;
}
