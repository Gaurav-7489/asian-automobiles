"use client";
import {useState} from "react";
import Link from "next/link";
import {Menu,X,ArrowUpRight,ChevronDown,Phone} from "lucide-react";

const services=[["General Service","/services/car-service"],["AC Repair","/services/car-ac-repair"],["Accident Repair","/services/accident-repair"],["Denting & Painting","/services/denting-painting"],["Wheel & Tyres","/services/wheel-alignment"],["Spare Parts","/spare-parts"]];

export function SiteHeader(){
 const[open,setOpen]=useState(false);
 return <header className="fixed inset-x-0 top-0 z-50 text-white">
  <div className="border-b border-white/10 bg-[#06101c]/80 backdrop-blur-xl">
   <div className="container-xl flex h-[78px] items-center justify-between">
    <Link href="/" className="flex items-center gap-3" onClick={()=>setOpen(false)}>
     <span className="grid h-10 w-10 place-items-center bg-white text-sm font-black text-[#07101c]">AA</span>
     <span><b className="block text-[13px] tracking-[.23em]">ASIAN</b><small className="block text-[9px] tracking-[.32em] text-white/45">AUTOMOBILES</small></span>
    </Link>
    <nav className="hidden items-center gap-6 xl:flex">
     <div className="group relative"><Link href="/services" className="flex items-center gap-1 text-[13px] font-medium text-white/70 hover:text-white">Services<ChevronDown size={13}/></Link><div className="pointer-events-none absolute left-1/2 top-full w-[285px] -translate-x-1/2 translate-y-4 rounded-2xl border border-white/10 bg-[#0a1524] p-2 opacity-0 shadow-2xl transition group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100">{services.map(([n,h])=><Link key={h} href={h} className="block rounded-xl px-4 py-3 text-sm text-white/65 hover:bg-white/5 hover:text-white">{n}</Link>)}</div></div>
     {[["Insurance","/insurance"],["About","/about"],["Facilities","/facilities"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]].map(([n,h])=><Link key={h} href={h} className="text-[13px] font-medium text-white/70 hover:text-white">{n}</Link>)}
    </nav>
    <div className="hidden items-center gap-3 lg:flex"><Link href="tel:+919349002038" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs font-semibold text-white/75 hover:text-white"><Phone size={14}/>Call</Link><Link href="/book-service" className="group inline-flex items-center gap-2 bg-[#1769ff] px-5 py-3 text-xs font-bold">Book a Service<ArrowUpRight size={15} className="transition group-hover:rotate-45"/></Link></div>
    <button aria-label="Toggle menu" onClick={()=>setOpen(!open)} className="lg:hidden">{open?<X/>:<Menu/>}</button>
   </div>
  </div>
  {open&&<div className="border-b border-white/10 bg-[#06101c] px-5 pb-7 pt-3 lg:hidden"><div className="container-xl grid">{[["Services","/services"],["Insurance","/insurance"],["About","/about"],["Facilities","/facilities"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]].map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)} className="border-b border-white/10 py-4 text-lg text-white/80">{n}</Link>)}<Link href="/book-service" onClick={()=>setOpen(false)} className="mt-4 bg-[#1769ff] px-5 py-4 text-center font-bold">Book a Service</Link></div></div>}
 </header>
}