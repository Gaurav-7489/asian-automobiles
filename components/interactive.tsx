"use client";
import { useEffect, useRef } from "react";

export function InteractiveLayer(){
  const cursor=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=document.documentElement;
    let raf=0,lastX=0,lastY=0,targetX=0,targetY=0;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move=(e:MouseEvent)=>{
      targetX=e.clientX;targetY=e.clientY;
      if(reduced)return;
      if(!raf)raf=requestAnimationFrame(()=>{
        lastX+=(targetX-lastX)*.28;lastY+=(targetY-lastY)*.28;
        if(cursor.current)cursor.current.style.transform=`translate3d(${lastX}px,${lastY}px,0)`;
        raf=0;
      });
    };
    const scroll=()=>{
      if(reduced)return;
      root.style.setProperty("--scroll-progress",Math.min(1,window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight))*100+"%");
      root.style.setProperty("--hero-progress",Math.min(1,window.scrollY/Math.max(1,window.innerHeight*.9)).toFixed(3));
    };
    window.addEventListener("mousemove",move,{passive:true});
    window.addEventListener("scroll",scroll,{passive:true});
    scroll();
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("scroll",scroll);cancelAnimationFrame(raf);};
  },[]);
  return <><div className="progress"/><div ref={cursor} className="cursor"><i/></div></>;
}
