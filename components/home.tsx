"use client";

import Link from "next/link";
import {CarScene} from "@/components/car-scene";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronRight, Clock3,
  Gauge, MapPin, MoveUpRight, ShieldCheck, Sparkles, Wrench, Zap
} from "lucide-react";

const hero="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2400&q=92";
const workshop="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=90";
const lift="https://images.unsplash.com/photo-1632823471565-1ecdf5c96c54?auto=format&fit=crop&w=1600&q=90";
const detail="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90";

const services=[
 {no:"01",title:"General Service",text:"Maintenance, inspection and mechanical care.",href:"/services/car-service",icon:Wrench},
 {no:"02",title:"AC Repair",text:"Cooling diagnostics and AC repair enquiries.",href:"/services/car-ac-repair",icon:Zap},
 {no:"03",title:"Accident Repair",text:"Body restoration with insurance assistance.",href:"/services/accident-repair",icon:ShieldCheck},
 {no:"04",title:"Wheels + Tyres",text:"Alignment, balancing, tyres and rims.",href:"/services/wheel-alignment",icon:Gauge},
];

function MagneticButton({href,children,dark=false}:{href:string;children:React.ReactNode;dark?:boolean}){
 const ref=useRef<HTMLAnchorElement>(null);
 const move=(e:React.MouseEvent)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");};
 return <Link ref={ref} href={href} onMouseMove={move} className={"magnetic group relative inline-flex items-center gap-3 overflow-hidden px-6 py-4 text-sm font-bold "+(dark?"bg-[#07101c] text-white":"bg-[#1769ff] text-white")}>
  <span className="magnetic-glow"/><span className="relative z-10">{children}</span><ArrowUpRight size={17} className="relative z-10 transition-transform duration-300 group-hover:rotate-45"/>
 </Link>
}

function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){
 return <motion.div className={className} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.7,ease:[.22,1,.36,1]}}>{children}</motion.div>
}

function Marquee(){
 return <div className="overflow-hidden border-y border-white/10 bg-[#050b13] py-4 text-[10px] font-bold uppercase tracking-[.3em] text-white/35">
  <motion.div className="flex w-max gap-10" animate={{x:["0%","-50%"]}} transition={{duration:28,repeat:Infinity,ease:"linear"}}>
   {Array.from({length:12}).map((_,i)=><span key={i} className="flex items-center gap-10">ASIAN AUTOMOBILES <i className="h-1 w-1 rounded-full bg-[#52cfe7]"/></span>)}
  </motion.div>
 </div>
}

export function Home(){
 const [loaded,setLoaded]=useState(false);
 const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:120,damping:25});
 const heroY=useTransform(scrollYProgress,[0,.35],[0,130]);
 useEffect(()=>{const t=setTimeout(()=>setLoaded(true),500);return()=>clearTimeout(t)},[]);
 return <main className="overflow-hidden">
  <motion.div className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-[#52cfe7]" style={{scaleX:progress,width:"100%"}}/>

  {!loaded&&<motion.div className="fixed inset-0 z-[90] grid place-items-center bg-[#050b13] text-white" initial={{opacity:1}} animate={{opacity:0}} transition={{delay:.35,duration:.5}}><div className="text-center"><div className="font-mono text-xs tracking-[.4em] text-white/35">AA / 001</div><div className="mt-4 text-5xl font-black tracking-[-.08em]">START ENGINE</div></div></motion.div>}

  <section className="relative min-h-[100svh] bg-[#050b13] text-white">
   <motion.div style={{y:heroY}} className="absolute inset-0">
    <div className="absolute inset-0 bg-cover bg-center scale-[1.08]" style={{backgroundImage:"url("+hero+")"}}/>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(23,105,255,.18),transparent_35%)]"/>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,#050b13_0%,rgba(5,11,19,.88)_32%,rgba(5,11,19,.35)_72%,rgba(5,11,19,.12)_100%)]"/>
    <div className="absolute inset-0 bg-[linear-gradient(0deg,#050b13_0%,transparent_45%)]"/>
   </motion.div>
   <div className="absolute inset-0 cyber-grid opacity-20"/>
   <div className="container-xl relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
    <div className="flex items-center justify-between pb-12 text-[10px] font-bold uppercase tracking-[.25em] text-white/35"><span>IRINJALAKUDA / KERALA</span><span className="hidden md:block">AUTOMOTIVE SYSTEM / 2026</span></div>
    <div className="max-w-6xl">
     <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}} className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-[#67d8ed]"><span className="h-px w-12 bg-[#67d8ed]"/>Independent automotive workshop</motion.div>
     <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:.72,duration:.9,ease:[.22,1,.36,1]}} className="display text-[clamp(4rem,11vw,10rem)] font-semibold">
      <span className="block">MAKE IT</span><span className="block text-white/25">MOVE.</span>
     </motion.h1>
     <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.05}} className="mt-7 max-w-xl text-base leading-7 text-white/55 md:text-lg">A service-first automotive experience for people who care what happens under the hood — from routine maintenance to accident restoration.</motion.p>
     <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.15}} className="mt-9 flex flex-wrap gap-3">
      <MagneticButton href="/book-service">Book a Service</MagneticButton>
      <Link href="/services" className="group inline-flex items-center gap-3 border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold backdrop-blur-md transition hover:bg-white hover:text-[#07101c]">Explore the machine<ChevronRight size={17} className="transition-transform group-hover:translate-x-1"/></Link>
     </motion.div>
    </div>
    <div className="mt-16 grid border-y border-white/15 md:grid-cols-4">
     {[["1996","Established"],["5+","Core services"],["680121","Irinjalakuda"],["24/7","Enquiry access"]].map(([a,b],i)=><div key={b} className={"py-5 md:px-6 "+(i<3?"border-b border-white/10 md:border-b-0 md:border-r":"")}><div className="text-xl font-semibold">{a}</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[.2em] text-white/30">{b}</div></div>)}
    </div>
   </div>
   <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[.25em] text-white/30 md:flex"><span>Scroll to enter</span><ArrowDownRight size={14}/></div>
  </section>

  <div className="relative bg-[#050b13] py-8"><div className="container-xl relative h-[360px] md:h-[500px]"><CarScene/><div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"><div className="font-mono text-[10px] tracking-[.3em] text-white/30">INTERACTIVE VEHICLE / 001</div><div className="mt-3 text-3xl font-black tracking-[-.06em] text-white/80 md:text-5xl">ROTATE<br/>THE MACHINE.</div></div></div></div><Marquee/>

  <section className="relative bg-[#f2f4f6] py-24 md:py-36">
   <div className="absolute inset-0 cyber-grid-light opacity-40"/>
   <div className="container-xl relative">
    <div className="grid gap-14 lg:grid-cols-[.6fr_1.4fr]">
     <Reveal><p className="eyebrow">01 / The system</p><h2 className="display mt-4 text-6xl font-semibold md:text-8xl">One garage.<br/><span className="text-slate-300">Many problems.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-slate-500">Everything is organized around the thing that matters: getting your car back on the road.</p></Reveal>
     <div className="grid border-t border-slate-300 sm:grid-cols-2">
      {services.map((s,i)=>{const Icon=s.icon;return <Reveal key={s.no}><Link href={s.href} className="service-card group relative block min-h-[300px] border-b border-slate-300 p-7 sm:p-9">
       <span className="absolute right-7 top-7 font-mono text-xs text-slate-400">{s.no}</span><div className="service-icon grid h-12 w-12 place-items-center border border-slate-300 bg-white"><Icon size={20} strokeWidth={1.4}/></div>
       <div className="mt-24"><h3 className="text-3xl font-semibold tracking-[-.04em]">{s.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">{s.text}</p></div>
       <span className="absolute bottom-7 right-7 grid h-10 w-10 place-items-center border border-slate-300 transition-all duration-300 group-hover:border-[#1769ff] group-hover:bg-[#1769ff] group-hover:text-white"><MoveUpRight size={15}/></span>
      </Link></Reveal>})}
     </div>
    </div>
   </div>
  </section>

  <section className="relative bg-[#07101c] py-24 text-white md:py-36">
   <div className="container-xl">
    <Reveal><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="eyebrow eyebrow-dark">02 / Workshop mode</p><h2 className="display mt-4 text-6xl font-semibold md:text-9xl">BUILT<br/><span className="text-white/20">TO LAST.</span></h2></div><p className="max-w-md text-base leading-7 text-white/45">A visual identity that feels closer to a modern automotive brand than a generic local-business template.</p></div></Reveal>
    <div className="mt-20 grid gap-4 md:grid-cols-[1.4fr_.6fr]">
     <Reveal className="relative min-h-[520px] overflow-hidden"><div className="absolute inset-0 bg-cover bg-center grayscale transition duration-1000 hover:scale-105 hover:grayscale-0" style={{backgroundImage:"url("+workshop+")"}}/><div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-transparent to-transparent"/><div className="absolute bottom-7 left-7"><div className="font-mono text-xs text-white/35">WORKSHOP / 01</div><div className="mt-2 text-2xl font-semibold">The work happens here.</div></div></Reveal>
     <div className="grid gap-4">
      <Reveal className="relative min-h-[250px] overflow-hidden"><div className="absolute inset-0 bg-cover bg-center grayscale transition duration-1000 hover:scale-105 hover:grayscale-0" style={{backgroundImage:"url("+lift+")"}}/><div className="absolute inset-0 bg-gradient-to-t from-[#07101c] to-transparent"/><div className="absolute bottom-6 left-6 text-sm font-semibold">Precision / Care / Process</div></Reveal>
      <Reveal className="relative min-h-[250px] overflow-hidden bg-[#1769ff] p-8"><Sparkles className="text-white/60"/><div className="absolute bottom-7 left-7 right-7"><div className="text-5xl font-black tracking-[-.06em]">NO<br/>BORING<br/>WEBSITES.</div></div></Reveal>
     </div>
    </div>
   </div>
  </section>

  <section className="bg-white py-24 md:py-36">
   <div className="container-xl">
    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
     <Reveal className="relative overflow-hidden"><motion.div whileHover={{scale:1.04}} transition={{duration:.6}} className="aspect-[4/5] bg-cover bg-center" style={{backgroundImage:"url("+detail+")"}}/><div className="absolute left-5 top-5 border border-white/20 bg-[#07101c]/80 px-4 py-3 text-white backdrop-blur-md"><div className="font-mono text-[10px] text-white/40">AA / DETAIL</div><div className="mt-1 text-sm font-semibold">CARE IN THE SMALL THINGS</div></div></Reveal>
     <Reveal><p className="eyebrow">03 / Why Asian Automobiles</p><h2 className="display mt-4 text-6xl font-semibold md:text-8xl">THE CAR<br/><span className="text-slate-300">COMES FIRST.</span></h2><p className="mt-8 max-w-xl text-lg leading-8 text-slate-500">Clear service journeys, direct contact and a dedicated accident-repair path turn a workshop visit into something customers can actually understand.</p><div className="mt-10 grid max-w-xl gap-5 sm:grid-cols-2"><div className="border-t border-slate-200 pt-5"><Clock3 className="text-[#1769ff]"/><h3 className="mt-5 font-semibold">Clear process</h3><p className="mt-2 text-sm leading-6 text-slate-500">Know what you are asking for before you call.</p></div><div className="border-t border-slate-200 pt-5"><ShieldCheck className="text-[#1769ff]"/><h3 className="mt-5 font-semibold">Insurance support</h3><p className="mt-2 text-sm leading-6 text-slate-500">A focused path for accident-related enquiries.</p></div></div></Reveal>
    </div>
   </div>
  </section>

  <section className="relative overflow-hidden bg-[#1769ff] py-24 text-white md:py-36">
   <div className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[70px] border-white/10"/>
   <div className="absolute -right-4 top-1/2 h-[250px] w-[250px] -translate-y-1/2 rounded-full border border-white/20"/>
   <div className="container-xl relative"><Reveal><p className="text-xs font-bold uppercase tracking-[.25em] text-white/55">04 / Accident + insurance</p><h2 className="display mt-5 max-w-6xl text-6xl font-semibold md:text-9xl">DAMAGE<br/><span className="text-white/35">HAPPENS.</span></h2><p className="mt-8 max-w-xl text-base leading-7 text-white/70">The website gives customers a direct way to explain the damage, share details and start an enquiry.</p><div className="mt-9 flex flex-wrap gap-3"><MagneticButton href="/insurance" dark>Insurance Assistance</MagneticButton><Link href="/request-quote" className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 text-sm font-bold hover:bg-white hover:text-[#1769ff]">Request a Quote<ArrowUpRight size={16}/></Link></div></Reveal></div>
  </section>

  <section className="grid-lines bg-[#f2f4f6] py-24 md:py-32">
   <div className="container-xl"><Reveal><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow">05 / Parts department</p><h2 className="display mt-4 text-6xl font-semibold md:text-8xl">FIND THE<br/><span className="text-slate-300">RIGHT PART.</span></h2></div><Link href="/spare-parts" className="group inline-flex items-center gap-2 text-sm font-bold">Make an enquiry<ArrowUpRight size={16} className="transition group-hover:translate-x-1"/></Link></div></Reveal>
    <div className="mt-14 border-y border-slate-300 py-8"><div className="flex flex-wrap gap-x-12 gap-y-5 text-xs font-bold uppercase tracking-[.18em] text-slate-400"><span>Vehicle</span><span>Part</span><span>Quantity</span><span>Availability</span><span>Enquiry</span></div></div>
   </div>
  </section>

  <section className="relative bg-[#050b13] py-28 text-white md:py-40">
   <div className="absolute inset-0 opacity-30 cyber-grid"/>
   <div className="container-xl relative"><Reveal><div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow eyebrow-dark">06 / Coordinates</p><h2 className="display mt-5 text-6xl font-semibold md:text-9xl">COME<br/><span className="text-white/20">FIND US.</span></h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/45">283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala.</p></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-sm font-bold text-[#07101c]">Directions<MapPin size={16}/></Link><MagneticButton href="/book-service">Book a Service</MagneticButton></div></div></Reveal></div>
  </section>

  <section className="relative overflow-hidden bg-white py-28 md:py-40">
   <div className="container-xl relative z-10"><Reveal><p className="eyebrow">07 / Start engine</p><h2 className="display mt-5 max-w-6xl text-7xl font-semibold md:text-[10rem]">YOUR CAR.<br/><span className="text-slate-200">NEXT MOVE.</span></h2><div className="mt-10 flex flex-wrap gap-3"><MagneticButton href="/book-service">Book a Service</MagneticButton><Link href="/contact" className="inline-flex items-center gap-2 border border-slate-300 px-6 py-4 text-sm font-bold">Talk to the workshop<ArrowUpRight size={16}/></Link></div></Reveal></div>
   <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full border-[50px] border-slate-100"/>
  </section>
 </main>;
}
