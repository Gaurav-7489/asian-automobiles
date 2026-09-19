"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowUpRight,ChevronDown,Menu,Phone,X} from "lucide-react";

const services=[
 ["General Service","/services/car-service"],
 ["AC Repair","/services/car-ac-repair"],
 ["Accident Repair","/services/accident-repair"],
 ["Denting & Painting","/services/denting-painting"],
 ["Wheel & Tyres","/services/wheel-alignment"],
 ["Spare Parts","/spare-parts"],
];

export function SiteHeader(){
 const[open,setOpen]=useState(false);
 const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const on=()=>setScrolled(window.scrollY>24);on();window.addEventListener("scroll",on,{passive:true});return()=>window.removeEventListener("scroll",on)},[]);
 return <header className={"fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 "+(scrolled?"pt-3":"pt-0")}>
  <div className={"container-xl transition-all duration-500 "+(scrolled?"rounded-2xl border border-white/10 bg-[#06101c]/85 shadow-2xl shadow-black/20 backdrop-blur-xl":"bg-transparent")}>
   <div className="flex h-[76px] items-center justify-between px-0 md:px-2">
    <Link href="/" className="group flex items-center gap-3" onClick={()=>setOpen(false)}>
     <span className="grid h-10 w-10 place-items-center border border-white/20 bg-white text-sm font-black text-[#07101c] transition-transform duration-300 group-hover:rotate-6">AA</span>
     <span><b className="block text-[13px] tracking-[.23em]">ASIAN</b><small className="block text-[9px] tracking-[.32em] text-white/40">AUTOMOBILES</small></span>
    </Link>
    <nav className="hidden items-center gap-6 xl:flex">
     <div className="group relative">
      <Link href="/services" className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[.12em] text-white/60 transition hover:text-white">Services<ChevronDown size={13}/></Link>
      <div className="pointer-events-none absolute left-1/2 top-full w-[290px] -translate-x-1/2 translate-y-5 rounded-2xl border border-white/10 bg-[#081421]/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100">
       {services.map(([n,h])=><Link key={h} href={h} className="group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"><span>{n}</span><ArrowUpRight size={14} className="opacity-0 transition group-hover/item:opacity-100"/></Link>)}
      </div>
     </div>
     {[["Insurance","/insurance"],["About","/about"],["Facilities","/facilities"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]].map(([n,h])=><Link key={h} href={h} className="text-[12px] font-bold uppercase tracking-[.12em] text-white/60 transition hover:text-white">{n}</Link>)}
    </nav>
    <div className="hidden items-center gap-2 lg:flex"><Link href="tel:+919349002038" className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-xs font-bold text-white/65 transition hover:border-white/30 hover:text-white"><Phone size={14}/>Call</Link><Link href="/book-service" className="group inline-flex items-center gap-2 bg-[#1769ff] px-5 py-3 text-xs font-black transition hover:bg-white hover:text-[#07101c]">Book a Service<ArrowUpRight size={15} className="transition group-hover:rotate-45"/></Link></div>
    <button aria-label="Toggle menu" onClick={()=>setOpen(!open)} className="grid h-10 w-10 place-items-center border border-white/10 lg:hidden">{open?<X size={20}/>:<Menu size={20}/>}</button>
   </div>
  </div>
  {open&&<div className="container-xl mt-2 rounded-2xl border border-white/10 bg-[#06101c]/95 px-5 pb-6 pt-2 shadow-2xl backdrop-blur-xl lg:hidden"><div className="grid">{[["Services","/services"],["Insurance","/insurance"],["About","/about"],["Facilities","/facilities"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]].map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)} className="border-b border-white/10 py-4 text-base font-semibold text-white/75">{n}</Link>)}<Link href="/book-service" onClick={()=>setOpen(false)} className="mt-4 bg-[#1769ff] px-5 py-4 text-center text-sm font-black">Book a Service</Link></div></div>}
 </header>
}