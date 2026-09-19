"use client";
import { useEffect, useRef } from "react";

export function InteractiveLayer(){
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=document.documentElement;
    const move=(e:MouseEvent)=>{
      root.style.setProperty("--mx",e.clientX+"px");
      root.style.setProperty("--my",e.clientY+"px");
      if(cursor.current) cursor.current.style.transform="translate3d("+e.clientX+"px,"+e.clientY+"px,0)";
    };
    const scroll=()=>root.style.setProperty("--scroll-progress",Math.min(1,window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100+"%");
    window.addEventListener("mousemove",move);window.addEventListener("scroll",scroll,{passive:true});scroll();
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("scroll",scroll);};
  },[]);
  return <><div className="progress"/><div ref={cursor} className="cursor"><i/></div></>;
}