import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, MapPin, Phone, ShieldCheck, Sparkles, Wrench } from "lucide-react";
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

const signals = ["PRECISION SERVICE","LOCAL EXPERTISE","CLEAR COMMUNICATION","REAL WORK"];

export default function Home(){
  return <main>
    <section className="hero cinematic">
      <div className="hero-media"><img src={images.hero} alt="" fetchPriority="high" decoding="async"/></div>
      <div className="hero-shade"/>
      <div className="hero-grid"/>
      <div className="hero-orbit" aria-hidden="true"><span/><span/><span/></div>
      <div className="wrap hero-inner">
        <div className="hero-meta">
          <span>IRINJALAKUDA · THRISSUR · KERALA</span>
          <span>INDEPENDENT / MULTI-BRAND</span>
          <span>EST. 1996 · CONFIRMATION PENDING</span>
        </div>
        <Reveal className="hero-kicker">AUTOMOTIVE SERVICE / PARTS / REPAIR</Reveal>
        <h1 className="hero-title" aria-label="Care. Repair. Restore.">
          <span className="hero-line">CARE.</span>
          <span className="hero-line ghost">REPAIR.</span>
          <span className="hero-line">RESTORE.</span>
        </h1>
        <div className="hero-bottom">
          <Reveal className="hero-copy"><p>Professional automotive service for the moments when your vehicle needs someone who knows what to do next.</p></Reveal>
          <a className="circle-link magnetic" href="#services" aria-label="Scroll to services"><ArrowDownRight size={20}/></a>
        </div>
        <div className="hero-stats">
          <div><b>1996</b><span>established · confirm</span></div>
          <div><b>05</b><span>core service pillars</span></div>
          <div><b>01</b><span>local workshop</span></div>
        </div>
      </div>
    </section>

    <div className="signal-strip" aria-label="Service principles">{signals.map((s,i)=><span key={s}><i>0{i+1}</i>{s}</span>)}</div>

    <section className="section manifesto">
      <div className="wrap split">
        <div><span className="eyebrow">01 / The workshop</span><p className="side-note">The digital experience should feel like walking into a well-run professional workshop: clear, capable, technical and easy to deal with.</p></div>
        <div>
          <Reveal><h2 className="display">Built around <span className="faded">the work.</span></h2></Reveal>
          <div className="lead-row"><p className="lead">Asian Automobiles brings service/repair and automobile parts together under one local business. The site turns that offline proposition into clear service journeys, proof, insurance assistance and frictionless contact paths.</p><a className="text-link magnetic" href="/about/">About Asian Automobiles <ArrowUpRight size={16}/></a></div>
        </div>
      </div>
    </section>

    <section id="services" className="section services">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow">02 / What we do</span><Reveal><h2 className="display">Services <span className="faded">without the noise.</span></h2></Reveal></div><span className="section-index">01—05</span></div>
        <div className="service-list">
          {services.map(([n,t,d,img,href],i)=><a className="service-row reveal-item" href={href} key={t}>
            <span className="service-num">{n}</span>
            <div><div className="service-tag">SERVICE / 0{i+1}</div><h3>{t}</h3></div>
            <span className="service-copy">{d}</span>
            <span className="service-arrow"><ChevronRight size={20}/></span>
            <span className="service-preview"><img src={img} alt="" loading="lazy" decoding="async"/></span>
          </a>)}
        </div>
        <a className="outline-link magnetic" href="/services/">View all services <ArrowUpRight size={15}/></a>
      </div>
    </section>

    <section className="section dark workshop-section">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow light">03 / Proof of place</span><Reveal><h2 className="display light">The shop <span className="faded-light">behind the service.</span></h2></Reveal></div><p className="dark-note">Real workshop photography should become the primary visual asset. Temporary imagery is used here until the client supplies the final set.</p></div>
        <div className="photo-grid">
          <figure className="photo large"><img src={images.workshop} alt="Automotive workshop" loading="lazy" decoding="async"/><figcaption><span>FACILITY / 01</span><b>Workshop floor & service environment</b></figcaption><div className="photo-mark">AA / 01</div></figure>
          <figure className="photo"><img src={images.repair} alt="Automotive repair" loading="lazy" decoding="async"/><figcaption><span>CRAFT / 02</span><b>Repair activity & technical work</b></figcaption><div className="photo-mark">AA / 02</div></figure>
        </div>
      </div>
    </section>

    <section className="section technical">
      <div className="wrap">
        <div className="tech-head"><div><span className="eyebrow">04 / A clearer journey</span><Reveal><h2 className="display">From contact <span className="faded">to handover.</span></h2></Reveal></div><div className="diagnostic-card"><div className="diagnostic-top"><span>AA / SYSTEM</span><span>ONLINE</span></div><div className="scanner"><div className="scanner-line"/></div><div className="diagnostic-values"><span><b>04</b> STEPS</span><span><b>100%</b> HUMAN</span><span><b>01</b> NEXT MOVE</span></div></div></div>
        <div className="process-list">{[["01","Contact","Tell us what your vehicle needs."],["02","Assess","Inspection and diagnosis — final workflow to be confirmed."],["03","Service","Repair/service according to the agreed scope."],["04","Handover","Collect the vehicle and understand the next step."]].map(([n,t,d])=><div className="process-row reveal-item" key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><Check size={18}/></div>)}</div>
      </div>
    </section>

    <section className="section insurance">
      <div className="wrap insurance-box">
        <div><span className="eyebrow">05 / Insurance assistance</span><Reveal><h2 className="display">Accidents are stressful. <span className="faded">The next step shouldn't be.</span></h2></Reveal><p className="lead">A dedicated route for accident repair assistance, damage photos and insurer coordination. Current insurer participation must be verified before launch.</p><a className="dark-link magnetic" href="/insurance/">Insurance assistance <ArrowUpRight size={16}/></a></div>
        <div className="shield"><ShieldCheck size={42}/><span>Cashless repair pathway</span><small>VERIFY NETWORK BEFORE PUBLISHING</small></div>
      </div>
    </section>

    <section className="section dark reviews-section">
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow light">06 / Customer proof</span><Reveal><h2 className="display light">Reviews <span className="faded-light">with context.</span></h2></Reveal></div><a className="dark-link magnetic" href="/reviews/">All reviews <ArrowUpRight size={16}/></a></div>
        <div className="review-grid">
          {[["01","ATTRIBUTION REQUIRED","Selected attributable customer reviews will live here once sources and consent are approved."],["02","SOURCE / DATE","Real customer stories can become case studies with before/after context where permission exists."],["03","VERIFIED PROOF","The website will never fabricate testimonials or turn a review into an operational promise."]].map(([n,meta,text])=><article className="review spotlight" key={n}><div className="review-top"><span>{n}</span><span>{meta}</span></div><p>“{text}”</p><span className="review-arrow"><ArrowUpRight size={17}/></span></article>)}
        </div>
      </div>
    </section>

    <section className="section contact">
      <div className="wrap contact-grid">
        <div><span className="eyebrow">07 / Find us</span><Reveal><h2 className="display">Come by. <span className="faded">Talk cars.</span></h2></Reveal><p className="lead">283 / V-526, Govt Rest House, Kattoor Road, Irinjalakuda, Thrissur — 680121, Kerala.</p><div className="contact-actions"><a className="primary-link magnetic" href="tel:+919349002038"><Phone size={16}/>Call now</a><a className="outline-link magnetic" href="/contact/">Directions & contact <ArrowUpRight size={15}/></a></div></div>
        <div className="contact-card spotlight"><div className="contact-icon"><MapPin size={20}/></div><span>IRINJALAKUDA<br/>THRISSUR · KERALA</span><small>Hours are intentionally not published until conflicting directory listings are confirmed.</small></div>
      </div>
    </section>

    <section className="final">
      <div className="final-glow"/><div className="wrap final-inner">
        <span className="eyebrow light">READY WHEN THE VEHICLE IS.</span>
        <Reveal><h2 className="display light">Book a <span className="faded-light">service.</span></h2></Reveal>
        <div className="final-actions"><a className="primary-link magnetic" href="/book-service/">Book a Service <ArrowUpRight size={16}/></a><a className="light-link magnetic" href="/request-quote/">Request a Quote <ArrowUpRight size={16}/></a></div>
        <div className="final-code"><Wrench size={14}/> AA / IRINJALAKUDA / 2026</div>
      </div>
    </section>
  </main>
}