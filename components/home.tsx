"use client";
import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight,CheckCircle2,ChevronRight,Clock3,MapPin,ShieldCheck,Wrench,Zap} from "lucide-react";

const hero="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2200&q=90";
const workshop="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1800&q=90";
const lift="https://images.unsplash.com/photo-1632823471565-1ecdf5c96c54?auto=format&fit=crop&w=1400&q=90";

const services=[
 {no:"01",title:"General Car Service",text:"Routine maintenance, inspection and mechanical repair.",href:"/services/car-service",icon:Wrench},
 {no:"02",title:"Car AC Service",text:"Inspection and repair enquiries for cooling and AC issues.",href:"/services/car-ac-repair",icon:Zap},
 {no:"03",title:"Accident Repair",text:"Bodywork, restoration and insurance assistance.",href:"/services/accident-repair",icon:ShieldCheck},
 {no:"04",title:"Wheels & Tyres",text:"Alignment, balancing, tyre and rim services.",href:"/services/wheel-alignment",icon:CheckCircle2},
];

export function Home(){
 return <main>
  <section className="relative min-h-[min(900px,100vh)] overflow-hidden bg-[#06101c] text-white">
   <div className="absolute inset-0 bg-cover bg-center scale-[1.03]" style={{backgroundImage:"url("+hero+")"}}/>
   <div className="absolute inset-0 bg-[linear-gradient(90deg,#06101c_0%,rgba(6,16,28,.94)_28%,rgba(6,16,28,.52)_62%,rgba(6,16,28,.2)_100%)]"/>
   <div className="absolute inset-0 bg-[linear-gradient(0deg,#06101c_0%,transparent_35%)]"/>
   <div className="absolute inset-0 noise opacity-25"/>
   <div className="container-xl relative flex min-h-[min(900px,100vh)] flex-col justify-end pb-14 pt-36 md:pb-16">
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
     <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-[#67d8ed]"><span className="h-px w-10 bg-[#67d8ed]"/>Independent automotive workshop</div>
     <h1 className="display max-w-6xl text-[clamp(4rem,10.5vw,9.6rem)] font-semibold">Care for cars.<br/><span className="text-white/35">Built on trust.</span></h1>
     <p className="mt-8 max-w-xl text-base leading-7 text-white/60 md:text-lg">Service, repairs, accident restoration, wheels, tyres, AC support and spare parts — brought together in one clear automotive experience.</p>
     <div className="mt-9 flex flex-wrap gap-3">
      <Link href="/book-service" className="group inline-flex items-center gap-3 bg-[#1769ff] px-6 py-4 text-sm font-bold transition hover:bg-white hover:text-[#07101c]">Book a Service<ArrowUpRight size={17} className="transition group-hover:rotate-45"/></Link>
      <Link href="/services" className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold backdrop-blur-md transition hover:bg-white hover:text-[#07101c]">Explore Services<ChevronRight size={17}/></Link>
     </div>
    </motion.div>
    <div className="mt-16 grid border-y border-white/15 md:grid-cols-4">
     {[["1996","Established"],["MULTI","Brand service"],["5+","Core services"],["680121","Irinjalakuda"]].map(([a,b],i)=><div key={b} className={"py-5 md:px-6 "+(i<3?"border-b border-white/10 md:border-b-0 md:border-r":"")}><div className="text-xl font-semibold tracking-tight">{a}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">{b}</div></div>)}
    </div>
   </div>
  </section>

  <section className="relative overflow-hidden bg-[#f4f6f8] py-24 md:py-32">
   <div className="absolute inset-y-0 right-0 w-1/3 opacity-40 grid-lines"/>
   <div className="container-xl relative">
    <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
     <div><p className="eyebrow">01 / Services</p><h2 className="display mt-4 text-5xl font-semibold md:text-7xl">Everything your car needs.</h2><Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-bold">View all services<ArrowUpRight size={16}/></Link></div>
     <div className="grid border-t border-slate-300 sm:grid-cols-2">
      {services.map((s,i)=>{const Icon=s.icon;return <motion.div key={s.no} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}><Link href={s.href} className="group block min-h-[270px] border-b border-slate-300 p-6 transition hover:bg-white sm:border-r sm:p-8"><div className="flex justify-between"><span className="font-mono text-xs text-slate-400">{s.no}</span><Icon size={21} strokeWidth={1.5} className="text-[#1769ff]"/></div><div className="mt-20"><h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">{s.text}</p></div><span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] opacity-0 transition group-hover:opacity-100">Explore<ArrowUpRight size={14}/></span></Link></motion.div>})}
     </div>
    </div>
   </div>
  </section>

  <section className="bg-[#07101c] py-24 text-white md:py-32">
   <div className="container-xl">
    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
     <div><p className="eyebrow eyebrow-dark">02 / The workshop</p><h2 className="display mt-4 text-5xl font-semibold md:text-8xl">A local workshop.<br/><span className="text-white/30">A serious standard.</span></h2></div>
     <div><p className="max-w-xl text-lg leading-8 text-white/55 md:text-xl">The website is designed around one simple idea: make it easier for customers to understand the service, know what happens next and contact the workshop quickly.</p><div className="mt-10 grid gap-5 sm:grid-cols-2"><div className="border-t border-white/10 pt-5"><Clock3 className="text-[#52cfe7]"/><h3 className="mt-5 font-semibold">Clear process</h3><p className="mt-2 text-sm leading-6 text-white/40">Service information and enquiry paths stay straightforward.</p></div><div className="border-t border-white/10 pt-5"><ShieldCheck className="text-[#52cfe7]"/><h3 className="mt-5 font-semibold">Insurance support</h3><p className="mt-2 text-sm leading-6 text-white/40">A dedicated path for accident and insurance-related enquiries.</p></div></div></div>
    </div>
    <div className="mt-20 grid gap-4 md:grid-cols-[1.35fr_.65fr]">
      <div className="group relative min-h-[440px] overflow-hidden bg-slate-900"><div className="absolute inset-0 bg-cover bg-center grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" style={{backgroundImage:"url("+workshop+")"}}/><div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-transparent to-transparent"/><span className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[.2em] text-white/60">Workshop / placeholder photography</span></div>
      <div className="group relative min-h-[440px] overflow-hidden bg-slate-900"><div className="absolute inset-0 bg-cover bg-center grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" style={{backgroundImage:"url("+lift+")"}}/><div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-transparent to-transparent"/><span className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[.2em] text-white/60">Service / placeholder photography</span></div>
    </div>
   </div>
  </section>

  <section className="py-24 md:py-32">
   <div className="container-xl">
    <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
     <div className="relative overflow-hidden"><div className="aspect-[4/5] bg-cover bg-center" style={{backgroundImage:"url("+workshop+")"}}/><div className="absolute bottom-5 left-5 bg-[#07101c] px-5 py-4 text-white"><div className="text-2xl font-semibold">01</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">Accident support</div></div></div>
     <div><p className="eyebrow">03 / Insurance assistance</p><h2 className="display mt-4 text-5xl font-semibold md:text-7xl">When something goes wrong, the next step should be simple.</h2><p className="mt-7 max-w-xl text-base leading-8 text-slate-500">A dedicated frontend journey lets customers describe damage, share details and start an insurance-repair enquiry. Insurer participation and operational workflow remain placeholders until confirmed.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/insurance" className="inline-flex items-center gap-2 bg-[#07101c] px-6 py-4 text-sm font-bold text-white">Insurance Assistance<ArrowUpRight size={16}/></Link><Link href="/request-quote" className="inline-flex items-center gap-2 border border-slate-300 px-6 py-4 text-sm font-bold">Request a Quote<ArrowUpRight size={16}/></Link></div></div>
    </div>
   </div>
  </section>

  <section className="grid-lines bg-[#f4f6f8] py-24 md:py-32">
   <div className="container-xl">
    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow">04 / Spare parts</p><h2 className="display mt-4 text-5xl font-semibold md:text-7xl">Looking for a part?</h2></div><Link href="/spare-parts" className="inline-flex items-center gap-2 text-sm font-bold">Make an enquiry<ArrowUpRight size={16}/></Link></div>
    <div className="mt-12 border-y border-slate-300 py-7"><div className="flex flex-wrap gap-x-10 gap-y-4 text-xs font-bold uppercase tracking-[.18em] text-slate-400"><span>Part enquiry</span><span>Vehicle details</span><span>Quantity</span><span>Availability placeholder</span><span>Call / WhatsApp</span></div></div>
   </div>
  </section>

  <section className="bg-[#1769ff] py-20 text-white md:py-28">
   <div className="container-xl grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-white/60">05 / Visit us</p><h2 className="display max-w-4xl text-5xl font-semibold md:text-8xl">Kattoor Road.<br/>Irinjalakuda.</h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/70">283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur - 680121, Kerala.</p></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 bg-white px-6 py-4 text-sm font-bold text-[#07101c]">Contact & Directions<MapPin size={16}/></Link><Link href="/book-service" className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 text-sm font-bold">Book a Service<ArrowUpRight size={16}/></Link></div></div>
  </section>

  <section className="bg-[#07101c] py-20 text-white md:py-28">
   <div className="container-xl flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="eyebrow eyebrow-dark">06 / Start here</p><h2 className="display mt-4 max-w-4xl text-5xl font-semibold md:text-8xl">Your car.<br/><span className="text-white/35">Next step.</span></h2></div><Link href="/book-service" className="group inline-flex w-fit items-center gap-3 bg-white px-7 py-5 text-sm font-bold text-[#07101c]">Book a Service<ArrowUpRight size={17} className="transition group-hover:rotate-45"/></Link></div>
  </section>
 </main>;
}