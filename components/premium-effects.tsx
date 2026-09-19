"use client";
import { useEffect, useRef } from "react";

export function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){el.classList.add("is-visible");observer.disconnect();}
    },{threshold:.12,rootMargin:"0px 0px -8% 0px"});
    observer.observe(el);return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={"reveal "+className}>{children}</div>;
}

export function PremiumEffects(){
  return null;
}
