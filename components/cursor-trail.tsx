"use client";
import {useEffect,useRef} from "react";
export function CursorTrail(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const root=ref.current;if(!root)return;let x=0,y=0;const move=(e:PointerEvent)=>{x=e.clientX;y=e.clientY;const dot=document.createElement("span");dot.className="cursor-trail";dot.style.left=x+"px";dot.style.top=y+"px";root.appendChild(dot);requestAnimationFrame(()=>dot.classList.add("cursor-trail-live"));setTimeout(()=>dot.remove(),650)};window.addEventListener("pointermove",move,{passive:true});return()=>window.removeEventListener("pointermove",move)},[]);
 return <div ref={ref} className="pointer-events-none fixed inset-0 z-[120] hidden md:block"/>;
}