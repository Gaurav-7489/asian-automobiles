import { ArrowDownRight, ArrowUpRight, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Reveal } from "@/components/premium-effects";

const images = {
  hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=82",
  workshop: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=78",
  repair: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=78",
  car: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=78"
};

const services = [
  ["01","General Car Service & Repairs","Routine maintenance and mechanical repair enquiries.",images.car,"/services/car-service/"],
  ["02","Car AC Service & Repair","A focused route for AC service and repair.",images.hero,"/services/car-ac-repair/"],
  ["03","Denting, Painting & Accident Repair","Bodywork, restoration and insurance assistance.",images.repair,"/services/accident-repair/"],
  ["04","Wheel Alignment, Balancing & Tyre","Alignment, balancing, tyre repair and rim repair.",images.workshop,"/services/wheel-alignment/"],
  ["05","Automobile Spare Parts","Inquiry-first parts assistance for your vehicle.",images.car,"/spare-parts/"]
];

export default function Home() {
  return <main>
    <section className="hero hero-minimal">
      <div className="hero-media"><img src={images.hero} alt="Automotive service vehicle" fetchPriority="high" decoding="async"/></div>
      <div className="hero-shade"/>
      <div className="wrap hero-inner">
        <div className="hero-minimal-top">
          <span>IRINJALAKUDA · THRISSUR · KERALA</span>
          <span>EST. 1996 · CONFIRMATION PENDING</span>
        </div>
        <div className="hero-minimal-content">
          <Reveal className="hero-kicker">AUTOMOTIVE SERVICE / REPAIR / PARTS</Reveal>
          <h1 className="hero-title minimal-title">Care for<br/><span>every mile.</span></h1>
          <div className="hero-minimal-bottom">
            <Reveal className="hero-copy"><p>A straightforward place to service, repair and look after your vehicle.</p></Reveal>
            <a className="circle-link" href="#services" aria-label="Explore services"><ArrowDownRight size={20}/></a>
          </div>
        </div>
      </div>
    </section>

    <div className="signal-strip">
      {["SERVICE","REPAIR","PARTS","ASSISTANCE"].map((s,i)=><span key={s}><i>0{i+1}</i>{s}</span>)}
    </div>

    <section className="section manifesto">
      <div className="wrap split">
        <div><span className="eyebrow">01 / The workshop</span><p className="side-note">A digital experience built to feel like the workshop itself: clear, capable, technical and easy to deal with.</p></div>
        <div>
          <Reveal><h2 className="display">Good work.<br/><span className="faded">Clear communication.</span></h2></Reveal>
          <div className="lead-row"><p className="lead">Asian Automobiles brings service, repair and automobile parts together under one local business. The website keeps every important journey simple: understand the service, see the work, then take the next step.</p><a className="text-link" href="/about/">About Asian Automobiles <ArrowUpRight size={16}/></a></div>
        </div>
      </div>
    </section>

    <section id="services" className="section services">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow">02 / What we do</span><Reveal><h2 className="display">Services<br/><span className="faded">made simple.</span></h2></Reveal></div><span className="section-index">01—05</span></div>
        <div className="service-list">
          {services.map(([n,t,d,img,href],i)=><a className="service-row reveal-item" href={href} key={t}>
            <span className="service-num">{n}</span>
            <div><div className="service-tag">SERVICE / 0{i+1}</div><h3>{t}</h3></div>
            <span className="service-copy">{d}</span>
            <span className="service-arrow"><ArrowUpRight size={19}/></span>
            <span className="service-preview"><img src={img} alt="" loading="lazy" decoding="async"/></span>
          </a>)}
        </div>
        <a className="outline-link" href="/services/">Explore all services <ArrowUpRight size={15}/></a>
      </div>
    </section>

    <section className="section dark workshop-section">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow light">03 / Proof of place</span><Reveal><h2 className="display light">The workshop<br/><span className="faded-light">behind the work.</span></h2></Reveal></div><p className="dark-note">Real workshop photography should become the primary visual asset. Temporary imagery is used until the client supplies the final set.</p></div>
        <div className="photo-grid">
          <figure className="photo large"><img src={images.workshop} alt="Automotive workshop" loading="lazy" decoding="async"/><figcaption><span>FACILITY / 01</span><b>Workshop floor & service environment</b></figcaption></figure>
          <figure className="photo"><img src={images.repair} alt="Automotive repair" loading="lazy" decoding="async"/><figcaption><span>CRAFT / 02</span><b>Repair activity & technical work</b></figcaption></figure>
        </div>
      </div>
    </section>

    <section className="section technical">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow">04 / The journey</span><Reveal><h2 className="display">From contact<br/><span className="faded">to handover.</span></h2></Reveal></div></div>
        <div className="process-list">
          {[["01","Contact","Tell us what your vehicle needs."],["02","Assess","Inspection and diagnosis — final workflow to be confirmed."],["03","Service","Repair or service according to the agreed scope."],["04","Handover","Collect the vehicle and understand the next step."]].map(([n,t,d])=><div className="process-row reveal-item" key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><span className="process-line"/></div>)}
        </div>
      </div>
    </section>

    <section className="section insurance">
      <div className="wrap insurance-box">
        <div><span className="eyebrow">05 / Insurance assistance</span><Reveal><h2 className="display">After an accident,<br/><span className="faded">know the next step.</span></h2></Reveal><p className="lead">A dedicated route for accident repair assistance, damage photos and insurer coordination. Current insurer participation must be verified before launch.</p><a className="dark-link" href="/insurance/">Insurance assistance <ArrowUpRight size={16}/></a></div>
        <div className="shield"><ShieldCheck size={38}/><b>Repair assistance</b><small>NETWORK / DETAILS TO BE VERIFIED</small></div>
      </div>
    </section>

    <section className="section dark">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow light">06 / Customer proof</span><Reveal><h2 className="display light">Reviews<br/><span className="faded-light">with context.</span></h2></Reveal></div><a className="light-link" href="/reviews/">View reviews <ArrowUpRight size={16}/></a></div>
        <div className="review-grid">
          {[["01","ATTRIBUTION REQUIRED","Selected attributable customer reviews will live here once sources and consent are approved."],["02","SOURCE / DATE","Customer stories can become case studies with before/after context where permission exists."],["03","VERIFIED PROOF","The website will never fabricate testimonials or turn a review into an operational promise."]].map(([n,meta,copy])=><article className="review spotlight" key={n}><div className="review-top"><span>{n}</span><span>{meta}</span></div><p>“{copy}”</p><span className="review-arrow"><ArrowUpRight size={17}/></span></article>)}
        </div>
      </div>
    </section>

    <section className="section contact">
      <div className="wrap contact-grid">
        <div><span className="eyebrow">07 / Find us</span><Reveal><h2 className="display">Come by.<br/><span className="faded">Talk cars.</span></h2></Reveal><p className="lead">283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p><div className="contact-actions"><a className="primary-link" href="tel:+919349002038"><Phone size={16}/>Call now</a><a className="outline-link" href="/contact/">Directions & contact <ArrowUpRight size={15}/></a></div></div>
        <div className="contact-card spotlight"><div className="contact-icon"><MapPin size={20}/></div><span>IRINJALAKUDA<br/>THRISSUR · KERALA</span><small>Hours are intentionally not published until conflicting directory listings are confirmed.</small></div>
      </div>
    </section>

    <section className="final">
      <div className="wrap final-inner"><span className="eyebrow light">READY WHEN THE VEHICLE IS.</span><Reveal><h2 className="display light">Book a<br/><span className="faded-light">service.</span></h2></Reveal><div className="final-actions"><a className="primary-link" href="/book-service/">Book a Service <ArrowUpRight size={16}/></a><a className="light-link" href="/request-quote/">Request a Quote <ArrowUpRight size={16}/></a></div><div className="final-code"><Wrench size={14}/> AA / IRINJALAKUDA / 2026</div></div>
    </section>
  </main>;
}
