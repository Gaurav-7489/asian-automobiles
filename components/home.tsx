"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {motion,useScroll,useSpring,useTransform} from "framer-motion";
import {
 ArrowDownRight,ArrowUpRight,CalendarDays,ChevronRight,Clock3,
 Gauge,MapPin,Menu as MenuIcon,ShieldCheck,Star,Wrench,Zap
} from "lucide-react";
import {CarScene} from "@/components/car-scene";

const hero="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=92";
const workshop="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=92";
const detail="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=92";
const wheel="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=90";

const services=[
 {n:"01",title:"General Service",copy:"Maintenance, inspection and mechanical care.",href:"/services/car-service",image:workshop,icon:Wrench},
 {n:"02",title:"AC Repair",copy:"Diagnostics, cooling and climate-system repair.",href:"/services/car-ac-repair",image:detail,icon:Zap},
 {n:"03",title:"Accident Repair",copy:"Body restoration with a clear insurance path.",href:"/services/accident-repair",image:hero,icon:ShieldCheck},
 {n:"04",title:"Wheels & Tyres",copy:"Alignment, balancing, tyres and wheel care.",href:"/services/wheel-alignment",image:wheel,icon:Gauge},
];

function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 return <motion.div className={className} initial={{opacity:0,y:42}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.8,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

function Magnetic({href,children,light=false}:{href:string;children:React.ReactNode;light?:boolean}){
 const ref=useRef<HTMLAnchorElement>(null);
 return <Link ref={ref} href={href} onMouseMove={(e)=>{const r=ref.current?.getBoundingClientRect();if(r){ref.current?.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");ref.current?.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%")}}} className={"aa-magnetic "+(light?"aa-magnetic-light":"")}><span className="aa-magnetic-glow"/><span className="relative z-10">{children}</span><ArrowUpRight className="relative z-10" size={16}/></Link>;
}

function WordReveal({children,muted=false}:{children:string;muted?:boolean}){
 return <span className={"block overflow-hidden "+(muted?"text-black/15":"")}><motion.span className="block" initial={{y:"110%"}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.9,ease:[.16,1,.3,1]}}>{children}</motion.span></span>;
}

function ServiceRow({s}:{s:typeof services[number]}){
 const [active,setActive]=useState(false);
 const Icon=s.icon;
 return <Link href={s.href} onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)} className="service-row group relative grid grid-cols-[42px_1fr_auto] items-center gap-5 border-t border-black/10 py-7 md:grid-cols-[55px_1fr_180px_auto] md:py-9">
  <span className="font-mono text-[10px] text-black/35">{s.n}</span>
  <div><h3 className="text-[clamp(1.7rem,3vw,3.2rem)] font-medium tracking-[-.055em] transition-transform duration-500 group-hover:translate-x-2">{s.title}</h3><p className="mt-2 max-w-md text-sm text-black/45 md:hidden">{s.copy}</p></div>
  <span className="hidden text-sm text-black/40 md:block">{s.copy}</span>
  <span className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">{active?<ArrowUpRight size={17}/>:<Icon size={17} strokeWidth={1.5}/>}</span>
  <motion.div initial={{opacity:0,scale:.8,rotate:-5}} animate={{opacity:active?1:0,scale:active?1:.8,rotate:active?0:-5}} transition={{duration:.35}} className="pointer-events-none absolute right-[13%] top-1/2 z-20 hidden h-40 w-56 -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl lg:block"><img src={s.image} alt="" className="h-full w-full object-cover"/></motion.div>
 </Link>;
}

export function Home(){
 const [intro,setIntro]=useState(true);
 const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:120,damping:30});
 const heroScale=useTransform(scrollYProgress,[0,.35],[1,1.08]);
 const heroY=useTransform(scrollYProgress,[0,.35],[0,100]);

 useEffect(()=>{const t=setTimeout(()=>setIntro(false),900);return()=>clearTimeout(t)},[]);

 return <main className="aa-site">
  <motion.div className="aa-progress" style={{scaleX:progress}}/>

  {intro&&<motion.div className="aa-intro" initial={{opacity:1}} animate={{opacity:0}} transition={{delay:.5,duration:.5}}><div className="aa-intro-mark">AA</div><div className="aa-intro-line"><span/></div><p>ASIAN AUTOMOBILES / IRINJALAKUDA</p></motion.div>}

  <section className="aa-hero">
   <motion.div className="aa-hero-media" style={{scale:heroScale,y:heroY,backgroundImage:"url("+hero+")"}}/>
   <div className="aa-hero-shade"/>
   <div className="aa-hero-grain"/>
   <div className="aa-container aa-hero-inner">
    <div className="aa-hero-meta"><span>01 — AUTOMOTIVE CARE</span><span className="hidden md:block">IRINJALAKUDA / KERALA</span><span>EST. 1996</span></div>
    <div className="max-w-5xl">
     <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.28em] text-white/60"><span className="h-px w-10 bg-white/50"/>Independent workshop. Serious about cars.</div>
     <h1 className="aa-display aa-hero-title"><WordReveal>KEEP</WordReveal><WordReveal muted>MOVING.</WordReveal></h1>
     <div className="mt-8 flex max-w-2xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
      <p className="max-w-lg text-base leading-7 text-white/65 md:text-lg">A premium service experience for everyday cars, serious repairs and the moments when your vehicle needs more than a quick fix.</p>
      <Magnetic href="/book-service">Book a service</Magnetic>
     </div>
    </div>
    <div className="aa-hero-bottom">
     <div><span className="aa-kicker">WORKSHOP</span><strong>5+</strong><span>core services</span></div>
     <div><span className="aa-kicker">CUSTOMER PATH</span><strong>01</strong><span>call → inspect → repair</span></div>
     <div><span className="aa-scroll">SCROLL <ArrowDownRight size={15}/></span></div>
    </div>
   </div>
  </section>

  <section className="aa-intro-section">
   <div className="aa-container">
    <div className="grid gap-14 lg:grid-cols-[.45fr_1.55fr]">
     <Reveal><p className="aa-kicker aa-blue">02 — THE WORK</p><p className="mt-6 max-w-[190px] text-sm leading-6 text-black/45">No noisy template language. Just a clear, considered experience around the work we actually do.</p></Reveal>
     <Reveal><h2 className="aa-display text-[clamp(3.5rem,8vw,8.5rem)]"><WordReveal>YOUR CAR.</WordReveal><WordReveal muted>OUR CRAFT.</WordReveal></h2><div className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><p className="max-w-xl text-lg leading-8 text-black/55">From preventive maintenance to accident restoration, Asian Automobiles brings the service journey into focus — what you need, why you need it, and what happens next.</p><Link href="/about" className="aa-text-link">Meet the workshop <ArrowUpRight size={15}/></Link></div></Reveal>
    </div>
   </div>
  </section>

  <section className="aa-services">
   <div className="aa-container">
    <div className="mb-10 flex items-end justify-between"><div><p className="aa-kicker aa-blue">03 — SERVICES</p><h2 className="aa-section-title mt-4">THE GARAGE<br/><span>AT A GLANCE.</span></h2></div><span className="hidden text-[10px] uppercase tracking-[.22em] text-black/35 md:block">Hover a service</span></div>
    <div>{services.map(s=><ServiceRow key={s.n} s={s}/>)}</div>
    <div className="border-t border-black/10 pt-7"><Link href="/services" className="aa-text-link">View all services <ArrowUpRight size={15}/></Link></div>
   </div>
  </section>

  <section className="aa-dark-section">
   <div className="aa-container">
    <Reveal><div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="aa-kicker text-white/45">04 — THE WORKSHOP</p><h2 className="aa-section-title aa-light mt-5">BUILT FOR<br/><span>THE REAL WORLD.</span></h2></div><p className="max-w-md text-base leading-7 text-white/45">A dark, editorial moment to show the workshop as it is: practical, precise and focused on the machine.</p></div></Reveal>
    <div className="aa-photo-grid mt-16">
     <Reveal className="aa-photo aa-photo-large"><img src={workshop} alt="Automotive workshop" /><div className="aa-photo-caption"><span>WORKSHOP / 01</span><strong>Precision before promises.</strong></div></Reveal>
     <Reveal className="aa-photo aa-photo-small" delay={.1}><img src={detail} alt="Performance car detail" /><div className="aa-photo-caption"><span>DETAIL / 02</span><strong>Every line matters.</strong></div></Reveal>
    </div>
   </div>
  </section>

  <section className="aa-machine">
   <div className="aa-container">
    <div className="grid gap-8 md:grid-cols-[.4fr_1.6fr] md:items-end"><Reveal><p className="aa-kicker aa-blue">05 — MACHINE STUDY</p><p className="mt-5 text-sm leading-6 text-black/45">An interactive 3D interlude. Move your pointer over the machine.</p></Reveal><Reveal><h2 className="aa-section-title">LOOK CLOSER.</h2></Reveal></div>
    <div className="aa-machine-stage"><CarScene/><div className="aa-machine-label"><span>VEHICLE / 001</span><strong>ROTATE<br/>THE MACHINE.</strong></div><div className="aa-machine-spec"><span>ENGINEERING</span><b>DETAIL</b><span>INTERACTION</span></div></div>
   </div>
  </section>

  <section className="aa-statement">
   <div className="aa-container">
    <Reveal><p className="aa-kicker aa-blue">06 — WHEN THINGS GO WRONG</p><h2 className="aa-display mt-6 text-[clamp(4rem,11vw,11rem)]"><WordReveal>ACCIDENT?</WordReveal><WordReveal muted>WE'VE GOT YOU.</WordReveal></h2><div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-lg leading-8 text-black/50">Accident repair should not feel like a maze. Start with the damage, share the details and let the workshop guide the next step.</p><div className="flex flex-wrap gap-3"><Magnetic href="/insurance">Insurance assistance</Magnetic><Link href="/request-quote" className="aa-outline-button">Request a quote <ArrowUpRight size={15}/></Link></div></div></Reveal>
   </div>
  </section>

  <section className="aa-slider-section">
   <div className="aa-container">
    <div className="flex items-end justify-between"><div><p className="aa-kicker text-white/45">07 — TRUST</p><h2 className="aa-section-title aa-light mt-4">WHAT PEOPLE<br/><span>SAY.</span></h2></div><div className="hidden text-xs text-white/35 md:block">01 / 03</div></div>
    <div className="aa-testimonial-track">
     {[["“Clear communication and the car was ready when promised.”","Customer / Irinjalakuda"],["“The accident repair process was much easier than expected.”","Customer / Thrissur"],["“Professional service without the usual workshop confusion.”","Customer / Kerala"]].map(([q,n],i)=><Reveal key={i} className="aa-testimonial"><div className="flex gap-1 text-[#c8ff3d]">{[1,2,3,4,5].map(x=><Star key={x} size={13} fill="currentColor"/></div><p>{q}</p><span>{n}</span></Reveal>)}
    </div>
   </div>
  </section>

  <section className="aa-contact">
   <div className="aa-container">
    <Reveal><div className="grid gap-14 lg:grid-cols-[1.3fr_.7fr] lg:items-end"><div><p className="aa-kicker aa-blue">08 — FIND US</p><h2 className="aa-display mt-5 text-[clamp(4rem,10vw,10rem)]"><WordReveal>COME</WordReveal><WordReveal muted>OVER.</WordReveal></h2></div><div><p className="text-base leading-7 text-black/50">283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p><div className="mt-8 flex flex-wrap gap-3"><Magnetic href="/contact">Get directions</Magnetic><Link href="tel:+919349002038" className="aa-outline-button">+91 93490 02038</Link></div></div></div></Reveal>
   </div>
  </section>

  <section className="aa-final">
   <div className="aa-container"><Reveal><p className="aa-kicker text-white/45">09 — NEXT MOVE</p><h2 className="aa-display mt-5 text-[clamp(4rem,11vw,11rem)] text-white"><WordReveal>KEEP</WordReveal><WordReveal muted>MOVING.</WordReveal></h2><div className="mt-10"><Magnetic href="/book-service">Book your service <CalendarDays size={16}/></Magnetic></div></Reveal></div>
  </section>
 </main>;
}
