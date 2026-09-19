"use client";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader(){
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
 const pathname = usePathname();
 const links=[["Services","/services/"],["Insurance","/insurance/"],["About","/about/"],["Facilities","/facilities/"],["Gallery","/gallery/"],["Reviews","/reviews/"],["Contact","/contact/"]];
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);window.addEventListener("scroll",onScroll,{passive:true});onScroll();return()=>window.removeEventListener("scroll",onScroll)},[]);
 return <header className={"header "+(scrolled?"header-scrolled":"")}><div className="wrap header-inner">
   <a href="/" className="brand"><strong>AA</strong><span>ASIAN<br/>AUTOMOBILES</span></a>
   <nav>{links.map(([t,h])=><a key={t} href={h} className={pathname===h || (h!=="/services/" && pathname.startsWith(h)) ? "nav-active" : ""}>{t}</a>)}</nav>
   <div className="header-actions"><a className="header-phone" href="tel:+919349002038" >+91 93490 02038</a><a className="header-book magnetic" href="/book-service/">Book a Service <ArrowUpRight size={14}/></a></div>
   <button className="menu" onClick={()=>setOpen(v=>!v)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
 </div>{open&&<div className="mobile-nav">{links.map(([t,h])=><a key={t} href={h} onClick={()=>setOpen(false)}>{t}<ArrowUpRight size={17}/></a>)}<a className="mobile-book" href="/book-service/">Book a Service <ArrowUpRight size={17}/></a></div>}</header>;
}
