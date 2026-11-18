"use client";

import Image from "next/image";
import Link from "next/link";
import { bookingHref, serviceCatalog, serviceImage } from "@/lib/service-catalog";
import { useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  Disc3,
  Gauge,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const aboutPhotos = [
  "/images/photos/hero-workshop.jpg",
  "/images/photos/oil-service.jpg",
  "/images/photos/wheel-alignment.jpg",
  "/images/photos/spare-parts.jpg",
  "/images/photos/car-profile.jpg",
];

const serviceIcons = [Wrench, Sparkles, ShieldCheck, CarFront, Gauge, Disc3, PackageSearch];
const serviceItems = serviceCatalog.map((service, index) => ({
  ...service, no: String(index + 1).padStart(2, "0"), label: service.title,
  copy: service.description, icon: serviceIcons[index],
}));

export function ServiceDecisionBoard(){
  const [active,setActive]=useState(0);
  const item=serviceItems[active];
  const Icon=item.icon;
  return <div className="aa-v13-service-board">
    <div className="aa-v13-service-stage">
      <Image key={item.id} className="aa-v13-service-stage-img" src={serviceImage(item)} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
      <div className="aa-v13-service-grid" aria-hidden="true" />
      <span className="aa-v13-kicker">CHOOSE A SERVICE / {item.no}</span>
      <div className="aa-v13-service-stage-copy">
        <Icon size={30}/>
        <small>{item.meta}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <div className="aa-router-actions">
          <Link href={item.href}>Explore service <ArrowUpRight size={15} /></Link>
          <Link href={bookingHref(item.id)}>Start enquiry <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="aa-v13-service-pulse" aria-hidden="true"><i/><i/><i/></div>
    </div>
    <div className="aa-v13-service-index">
      {serviceItems.map((x,index)=>{
        const I=x.icon;
        return <button key={x.no} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)} aria-pressed={index===active}>
          <span>{x.no}</span><I size={18}/><b>{x.label}</b><ArrowUpRight size={15}/>
        </button>;
      })}
    </div>
  </div>;
}

const aboutItems=[
  {year:"SERVICE",label:"MAINTENANCE",title:"Car service and maintenance",copy:"Periodic servicing, oil and filter changes and general inspections for cars of many makes."},
  {year:"REPAIRS",label:"MECHANICAL",title:"Mechanical repairs",copy:"Brakes, clutch, suspension, steering and engine problems diagnosed and repaired."},
  {year:"AC",label:"CLIMATE",title:"Car AC services",copy:"Inspection, fault-finding, gas recharge and compressor-related repairs."},
  {year:"WHEELS",label:"TYRES",title:"Wheel alignment, balancing and tyre care",copy:"Fix pulling, steering vibration and uneven tyre wear; tyre checks and advice."},
  {year:"PARTS",label:"ENQUIRIES",title:"Spare-parts enquiries",copy:"Tell us the make, model, year and part — we’ll check genuine (OEM) and aftermarket options."},
];

export function AboutTimeline(){
  const [active,setActive]=useState(0);
  const item=aboutItems[active];
  return <div className="aa-v13-about-timeline">
    <div className="aa-v13-about-line">
      {aboutItems.map((x,index)=><button key={x.year} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)} aria-pressed={index===active}>
        <i/><span>{x.label}</span><b>{x.year}</b>
      </button>)}
    </div>
    <div className="aa-v13-about-readout">
      <div className="aa-v16-about-photo" aria-hidden="true">
        <Image key={active} src={aboutPhotos[active]} alt="" fill quality={76} sizes="(max-width: 900px) 100vw, 42vw" />
        <i />
      </div>
      <div className="aa-v16-about-copy">
      <span>{String(active+1).padStart(2,"0")} / {String(aboutItems.length).padStart(2,"0")}</span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
      </div>
    </div>
  </div>;
}
