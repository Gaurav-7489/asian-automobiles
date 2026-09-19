"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowUpRight,ChevronDown,Menu,X} from "lucide-react";

const links=[["Services","/services"],["Insurance","/insurance"],["About","/about"],["Facilities","/facilities"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]];

export function SiteHeader(){
 const[open,setOpen]=useState(false);
 const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>32);f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
 return <header className={"aa-header "+(scrolled?"aa-header-scrolled":"")}>
  <div className="aa-header-inner">
   <Link href="/" className="aa-brand" onClick={()=>setOpen(false)}><span>AA</span><div><b>ASIAN</b><small>AUTOMOBILES</small></div></Link>
   <nav className="aa-nav">
    <div className="aa-nav-services"><Link href="/services">Services <ChevronDown size={12}/></Link><div className="aa-nav-dropdown">{[["General Service","/services/car-service"],["AC Repair","/services/car-ac-repair"],["Accident Repair","/services/accident-repair"],["Denting & Painting","/services/denting-painting"],["Wheels & Tyres","/services/wheel-alignment"],["Spare Parts","/spare-parts"]].map(([n,h])=><Link key={h} href={h}>{n}<ArrowUpRight size={13}/></Link>)}</div></div>
    {links.slice(1).map(([n,h])=><Link key={h} href={h}>{n}</Link>)}
   </nav>
   <div className="aa-header-actions"><Link href="tel:+919349002038">CALL</Link><Link href="/book-service" className="aa-book">BOOK <ArrowUpRight size={14}/></Link></div>
   <button className="aa-menu-button" aria-label="Open menu" onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
  </div>
  {open&&<motionMenu/>}
 </header>;
}

function motionMenu(){
 return <div className="aa-mobile-menu"><div className="aa-mobile-links">{links.map(([n,h])=><Link key={h} href={h}>{n}<ArrowUpRight size={16}/></Link>)}</div><div className="aa-mobile-foot"><span>IRINJALAKUDA / KERALA</span><Link href="/book-service">BOOK A SERVICE</Link></div></div>;
}
