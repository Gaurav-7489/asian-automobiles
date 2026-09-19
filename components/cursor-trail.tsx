"use client";
import {useEffect,useRef} from "react";

const images=[
 "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=520&q=82",
 "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=520&q=82",
 "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=520&q=82"
];

export function CursorTrail(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  let last=0;
  const move=(e:PointerEvent)=>{
   if(e.pointerType==="touch"||performance.now()-last<110)return;
   last=performance.now();
   const item=document.createElement("div");
   item.className="aa-cursor-image";
   item.style.left=e.clientX+"px";item.style.top=e.clientY+"px";
   const img=document.createElement("img");img.src=images[Math.floor(Math.random()*images.length)];img.alt="";
   item.appendChild(img);el.appendChild(item);
   requestAnimationFrame(()=>item.classList.add("is-live"));
   setTimeout(()=>item.remove(),700);
  };
  window.addEventListener("pointermove",move,{passive:true});
  return()=>window.removeEventListener("pointermove",move);
 },[]);
 return <div ref={root} className="aa-cursor-layer" aria-hidden="true"/>;
}
