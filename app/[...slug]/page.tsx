import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businessFacts, landlineTel, mapsEmbedSrc, phoneTel, whatsappEnabled, whatsappLink } from "@/lib/business-facts";
import { pageMeta, type PageKey } from "@/lib/page-meta";
import { bookingHref, serviceCatalog, serviceImage } from "@/lib/service-catalog";
import { MapReveal } from "@/components/map-reveal";
import { Frame } from "@/components/inner/page-frame";
import { FaqSection, Note, PageCTA, SectionHead, SpecList, Steps } from "@/components/inner/sections";
import { ActionLink, CallButton, DirectionsButton, WhatsAppButton } from "@/components/ui/action-link";
import { ChoiceExplorer } from "@/components/interactive/choice-explorer";
import { TyreGuide } from "@/components/interactive/tyre-guide";
import { ContactEnquiryForm } from "@/components/enquiry/contact-enquiry-form";

const explain = businessFacts.processConfirmed;
const photo = (name: string) => "/images/photos/" + name + ".jpg";

/* ------------------------------------------------------------------ About */

function About() {
  return (
    <Frame
      variant="split"
      page="About us"
      image={photo("engine-bay")}
      imagePosition="28% 50%"
      title="About Asian Automobiles"
      intro="An independent, multi-brand car service centre on Kattoor Road, Irinjalakuda."
      actions={<><CallButton /><DirectionsButton /></>}
      cta={
        <PageCTA image={photo("mechanical-repair")} title="Talk to the workshop." copy="You’ll find us on Kattoor Road, near the Government Rest House and Canara Bank. Tell us about your car and what you need.">
          <CallButton />
          <WhatsAppButton label="WhatsApp us" />
        </PageCTA>
      }
    >
      <section className="section surface-canvas aa-story" aria-labelledby="story-heading">
        <div className="wrap aa-story__grid">
          <div>
            <h2 id="story-heading">A local workshop for the car you already drive.</h2>
            <div className="aa-story__body">
              <p className="aa-lead">
                Asian Automobiles is an independent automobile service centre in Irinjalakuda. We service, maintain and
                repair passenger cars of many makes, and we help customers source the spare parts their cars need.
              </p>
              <p>
                {businessFacts.establishedConfirmed
                  ? `Asian Automobiles has been looking after cars in Irinjalakuda since ${businessFacts.establishedYear}. Cars have changed a great deal, but the basics have not: listen to the customer, find the real problem and fix it properly.`
                  : "A familiar workshop on Kattoor Road, serving local car owners through workshop visits, direct enquiries and spare-parts requests. Our aim has stayed simple: listen to the customer, find the real problem and fix it properly."}
              </p>
            </div>
          </div>
          <div className="aa-jobcard aa-story__card">
            <h3 className="aa-jobcard__title">At a glance</h3>
            <SpecList
              items={[
                ["What we are", businessFacts.positioning.businessType + "."],
                ["What we do", "Servicing and repairs for passenger cars, and spare-parts enquiries."],
                ["What we are not", "A car dealership, a used-car showroom or a rental company."],
                ["Where", businessFacts.address.street + ", " + businessFacts.address.locality + "."],
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section surface-alt" aria-labelledby="help-heading">
        <div className="wrap">
          <SectionHead id="help-heading" title="The everyday needs of passenger cars." copy="Not sure whether we handle a particular job? Call us and ask." />
          <ChoiceExplorer
            label="What we can help with"
            items={[
              { id: "service", label: "Service", sub: "Maintenance", title: "Car service and maintenance", copy: "Periodic servicing, oil and filter changes and general inspections for cars of many makes.", image: photo("oil-service"), href: "/services/car-service-maintenance/", hrefLabel: "Car service & maintenance" },
              { id: "repairs", label: "Repairs", sub: "Mechanical", title: "Mechanical repairs", copy: "Brakes, clutch, suspension, steering and engine problems diagnosed and repaired.", image: photo("mechanical-repair"), href: "/services/mechanical-repairs/", hrefLabel: "Mechanical repairs" },
              { id: "ac", label: "AC", sub: "Climate", title: "Car AC services", copy: "Inspection, fault-finding, gas recharge and compressor-related repairs.", image: photo("engine-detail"), href: "/services/car-ac-service/", hrefLabel: "Car AC services" },
              { id: "wheels", label: "Wheels", sub: "Tyres", title: "Wheel alignment, balancing and tyre care", copy: "Fix pulling, steering vibration and uneven tyre wear; tyre checks and advice.", image: photo("wheel-alignment"), href: "/services/wheel-alignment-balancing/", hrefLabel: "Wheel alignment & balancing" },
              { id: "parts", label: "Parts", sub: "Enquiries", title: "Spare-parts enquiries", copy: "Tell us the make, model, year and part, and we’ll check genuine (OEM) and aftermarket options.", image: photo("spare-parts"), href: "/spare-parts/", hrefLabel: "Spare parts enquiry" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="how-heading">
        <div className="wrap">
          <SectionHead id="how-heading" title="Good car care starts with understanding the problem, not guessing at it." />
          <Steps
            className="aa-steps--inverse"
            items={[
              { title: "Listen", text: "Tell us what you’ve noticed: a noise, a warning light, weak AC, a car that pulls to one side." },
              ...(explain ? [{ title: "Inspect and explain", text: "We check the car and explain what we find, what needs attention now and what can wait." }] : []),
              { title: "Repair and return", text: "We carry out the agreed work and hand the car back with a clear explanation of what was done." },
            ]}
          />
        </div>
      </section>

      <section className="section surface-canvas" aria-labelledby="expect-heading">
        <div className="wrap aa-split">
          <SectionHead id="expect-heading" title="Behaviours, not promises." />
          <SpecList
            items={[
              ["Clear communication", "We explain things in plain language and answer your questions."],
              ...(explain ? [["Your approval first", "We discuss the work with you before we start."] as [string, string]] : []),
              ["Honest advice", "We tell you what needs attention now and what can safely wait."],
              ["Respect for your time", "Call ahead and we’ll plan for your car."],
            ]}
          />
        </div>
      </section>

    </Frame>
  );
}

/* ------------------------------------------------------------------ Services hub */

const includes: Record<string, string[]> = {
  "car-service-maintenance": ["Engine oil change", "Oil and air filters", "Fluid checks", "General inspection"],
  "mechanical-repairs": ["Brakes", "Clutch", "Suspension and steering", "Engine troubleshooting"],
  "car-ac-service": ["Performance check", "Fault diagnosis", "Gas recharge", "Compressor-related repairs"],
  "wheel-alignment-balancing": ["Wheel alignment", "Balancing", "Steering checks", "Tyre wear assessment"],
  "tyre-care": ["Tyre inspection", "Pressure checks", "Wear assessment", "Tyre-related advice"],
  "spare-parts": ["Genuine (OEM) parts", "Aftermarket parts", "Matched to your make, model and year"],
};

function Services() {
  return (
    <Frame
      variant="index"
      page="Services"
      title="Our car services"
      intro="Servicing, repairs and maintenance for passenger cars of many makes, at our workshop in Irinjalakuda. Pick the closest match, or call us and we’ll point you in the right direction."
      actions={<><CallButton /><WhatsAppButton label="Ask on WhatsApp" /></>}
      cta={
        <PageCTA image={photo("mechanic-inspection")} title="Not sure which service you need?" copy="Describe the problem on the phone. We’ll tell you what to do next and whether you should bring the car in.">
          <CallButton />
          <WhatsAppButton label="Describe the problem" />
        </PageCTA>
      }
    >
      <section className="aa-directory surface-dark" aria-label="Service directory">
        <ol className="wrap">
          {serviceCatalog.map((service, index) => (
            <li key={service.id} className="aa-directory__item">
              <Link href={service.href} className="aa-directory__photo" tabIndex={-1} aria-hidden="true">
                <Image src={serviceImage(service)} alt="" fill quality={72} sizes="(max-width: 899px) 100vw, 46vw" />
              </Link>
              <div className="aa-directory__text">
                <span className="aa-directory__no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="aa-label">{service.meta}</span>
                <h2><Link href={service.href}>{service.title}</Link></h2>
                <p>{service.description}</p>
                <ul className="aa-chips">
                  {includes[service.id]?.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="aa-directory__links">
                  <Link href={service.href} className="aa-btn aa-btn--light">Explore service</Link>
                  <Link href={bookingHref(service.id)} className="aa-link">Start enquiry</Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

    </Frame>
  );
}

/* ------------------------------------------------------------------ Service pages */

function CarService() {
  return (
    <Frame
      variant="photo"
      page="Car service & maintenance"
      serviceId="car-service-maintenance"
      image={photo("oil-service")}
      imagePosition="60% 40%"
      title="Car service and maintenance in Irinjalakuda"
      intro="Periodic servicing, oil and filter changes and thorough checks for cars of many makes, to keep your car reliable between journeys."
      actions={<><CallButton label="Call to book a service" /><WhatsAppButton label="WhatsApp us" message="Hello, I'd like to book a service. Car: [make/model/year]. Kilometres: [ ]" /></>}
      cta={
        <PageCTA image={photo("engine-bay")} title="Is your car due for a service?" copy="Call us with your car’s make, model and kilometres and we’ll arrange a time.">
          <CallButton label="Call to book a service" />
          <DirectionsButton />
        </PageCTA>
      }
    >
      <section className="section surface-canvas" aria-labelledby="periodic-heading">
        <div className="wrap aa-split">
          <SectionHead
            id="periodic-heading"
            title="Planned maintenance at regular intervals."
            copy="A periodic service replaces parts that wear out with normal use, such as engine oil and filters, and checks the systems that keep you safe. Your owner’s manual lists the interval; bring it and we’ll use it as a guide."
          />
          <SpecList
            items={[
              ["Engine oil and filters", "Engine oil and oil filter replacement; air filter inspection or replacement."],
              ["Checks", "Fluid levels, brake condition, tyre condition and pressure, battery and lights."],
              ["Inspection", "General vehicle inspection and basic checks for leaks, noises and wear."],
              ["Preventive care", "Maintenance as recommended for your car, its age and its schedule."],
            ]}
          />
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="service-steps-heading">
        <div className="wrap">
          <SectionHead id="service-steps-heading" title="How a service works with us." />
          <Steps
            className="aa-steps--inverse"
            items={[
              { title: "Call or message us", text: "Tell us your car’s make, model, year and approximate kilometres. We’ll suggest a convenient time." },
              { title: "Bring your car in", text: "Mention anything you’ve noticed, however small." },
              { title: explain ? "Inspect and explain" : "Inspection", text: explain ? "We check the car and agree the recommended work with you." : "We check the car against its service needs." },
              { title: "Service", text: "We carry out the agreed work." },
              { title: "Handover", text: "We return the car and explain what was done." },
            ]}
          />
        </div>
      </section>

      <FaqSection
        title="Car service questions"
        items={[
          ["How often should my car be serviced?", "Follow the interval in your owner’s manual, usually based on kilometres or months, whichever comes first. Heavy traffic, short trips and dusty roads can mean more frequent checks."],
          ["Can you service my car if it’s still under warranty?", "Warranty terms differ between manufacturers. Check your warranty booklet or ask your dealer whether servicing elsewhere affects your cover before booking."],
          ["How long does a service take?", "It depends on the car and the work needed. Call us and we’ll give you an idea when you book."],
          ["How much does a service cost?", "Cost depends on the car’s make, model, condition and the parts needed. Call with your vehicle details to discuss."],
        ]}
      />

    </Frame>
  );
}

function Mechanical() {
  const enquire = bookingHref("mechanical-repairs");
  return (
    <Frame
      variant="photo"
      page="Mechanical repairs"
      serviceId="mechanical-repairs"
      image={photo("mechanical-repair")}
      imagePosition="50% 45%"
      title="Mechanical repairs for your car"
      intro="Brake, clutch, suspension, steering and engine problems diagnosed and repaired at our Irinjalakuda workshop."
      actions={<><CallButton label="Describe the problem" /><WhatsAppButton label="Send a video on WhatsApp" message="Hello, my car has a problem. Car: [make/model/year]. What I'm noticing: [ ]" /></>}
      cta={
        <PageCTA title="Noticed a problem with your car?" copy="Call and tell us what’s happening.">
          <CallButton />
          <WhatsAppButton label="Send a video on WhatsApp" />
        </PageCTA>
      }
    >
      <section className="section surface-canvas" aria-labelledby="symptoms-heading">
        <div className="wrap">
          <SectionHead id="symptoms-heading" title="Start with what you notice: when braking, turning, starting or at speed." copy="These are a guide, not a diagnosis." />
          <ChoiceExplorer
            label="Symptoms"
            items={[
              { id: "due", label: "Service due", sub: "Maintenance", title: "Service due", copy: "Fluids, filters and preventive checks. A good place to start if the car simply hasn’t been looked at in a while.", image: photo("oil-service"), href: enquire, hrefLabel: "Enquire about this symptom" },
              { id: "noise", label: "Noise or vibration", sub: "Symptom", title: "Noise or vibration", copy: "Describe when it happens: braking, turning, over bumps, at idle or at a particular speed. That narrows the cause quickly.", image: photo("engine-bay"), href: enquire, hrefLabel: "Enquire about this symptom" },
              { id: "handling", label: "Steering or braking", sub: "Handling", title: "Steering or braking feels different", copy: "Changes in how the car steers or stops deserve an inspection. If it doesn’t feel safe, call before driving it in.", image: photo("wheel-alignment"), href: enquire, hrefLabel: "Enquire about this symptom" },
              { id: "general", label: "General inspection", sub: "Not sure", title: "General inspection", copy: "Start broad when you are not sure what’s wrong. We’ll check the car and tell you what we find.", image: photo("mechanic-inspection"), href: enquire, hrefLabel: "Enquire about this symptom" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-alt" aria-labelledby="repair-heading">
        <div className="wrap aa-split">
          <SectionHead id="repair-heading" title="Find the cause before fixing it." copy={explain ? "A noise or vibration can have several causes, so we inspect the car, test-driving it where needed, then explain what needs repairing before going ahead." : "A noise or vibration can have several causes, so we inspect the car and, where needed, test-drive it to reproduce the problem."} />
          <SpecList
            items={[
              ["Brake system", "Pads, discs and related components when braking performance or noise changes."],
              ["Clutch", "Slipping, judder or heavy operation, and clutch-related repairs."],
              ["Suspension and steering", "Shock absorbers, springs, bushes and links; play, heaviness or vibration in the steering."],
              ["Engine troubleshooting", "Warning lights, rough running, overheating and loss of power."],
            ]}
          />
        </div>
      </section>

      <section className="section--tight surface-canvas">
        <div className="wrap">
          <Note title="If it doesn’t feel safe, don’t drive it." action={<CallButton />}>
            If your brakes feel unsafe, the steering is unusual or a red warning light is on, avoid driving the car. Call us first and we’ll advise on the next step.
          </Note>
        </div>
      </section>

      <FaqSection
        title="Repair questions"
        items={[
          ["Can you tell me what’s wrong over the phone?", "We can often suggest likely causes from your description, but a proper diagnosis needs the car to be inspected."],
          ["Is it safe to drive my car to the workshop?", "If the brakes, steering or a red warning light are involved, it may not be. Call us first and describe the problem."],
          ["Do you repair all makes of car?", "We work on passenger cars of many makes. Call with your make, model and year to confirm."],
          ["How long will the repair take?", "It depends on the problem and parts availability. We’ll give you an idea once we’ve inspected the car."],
        ]}
      />

    </Frame>
  );
}

function AC() {
  const enquire = bookingHref("car-ac-service");
  return (
    <Frame
      variant="photo"
      page="Car AC services"
      serviceId="car-ac-service"
      image={photo("engine-detail")}
      imagePosition="50% 50%"
      title="Car AC service and repair"
      intro="When your car’s AC stops cooling the way it should, we find out why, and fix the cause rather than the symptom."
      actions={<><CallButton label="Call about your AC" /><WhatsAppButton label="WhatsApp us" message="Hello, my car AC isn't working properly. Car: [make/model/year]. Problem: [ ]" /></>}
      cta={
        <PageCTA image={photo("engine-bay")} title="AC not cooling like it used to?" copy="Tell us your car’s make, model and what the AC is doing. We’ll advise on the next step.">
          <CallButton label="Call about your AC" />
          <WhatsAppButton label="WhatsApp us" />
        </PageCTA>
      }
    >
      <section className="section surface-dark" aria-labelledby="ac-problems-heading">
        <div className="wrap">
          <SectionHead id="ac-problems-heading" title="What is the AC doing inside the car?" copy="A gas top-up can restore cooling for a while, but if the system is leaking the problem returns. That is why we check the system first and explain what we find." />
          <ChoiceExplorer
            tone="dark"
            label="AC problems"
            items={[
              { id: "weak", label: "Weak cooling", sub: "Slow to cool", title: "Weak cooling", copy: "The cabin takes too long to cool, or cooling fades again soon after a recharge. A sealed system shouldn’t need frequent top-ups, so we look for the reason.", href: enquire, hrefLabel: "Enquire about this symptom" },
              { id: "airflow", label: "Low airflow", sub: "Weak air", title: "Low airflow", copy: "Air feels weak even with the fan turned up. Tell us when it started and whether it’s the same on every setting.", href: enquire, hrefLabel: "Enquire about this symptom" },
              { id: "smell", label: "Bad smell", sub: "Musty air", title: "A smell from the vents", copy: "Moisture in the system can let mould and bacteria grow, especially in humid weather. A dirty cabin filter can make it worse.", href: enquire, hrefLabel: "Enquire about this symptom" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-canvas" aria-labelledby="ac-includes-heading">
        <div className="wrap aa-split">
          <SectionHead id="ac-includes-heading" title="Check first. Then fix the cause." copy="Call as soon as you notice cooling getting weaker, and before the hottest months or a long family trip." />
          <SpecList
            items={[
              ["Performance check and diagnosis", "How well the system cools, and why it isn’t cooling properly."],
              ["Leak checks", "Checking for signs of leaks before a recharge."],
              ["Gas recharge", "AC gas recharge where required."],
              ["Compressor-related repairs", "And general AC system maintenance."],
            ]}
          />
        </div>
      </section>

      <FaqSection
        surface="alt"
        title="Car AC questions"
        items={[
          ["Does my car AC need regular gas refilling?", "A car AC is a sealed system, so it shouldn’t need frequent top-ups. If cooling drops again soon after a recharge, there is probably a leak that needs finding."],
          ["Why does my AC smell?", "Moisture in the system can let mould and bacteria grow, especially in humid weather. A dirty cabin filter can make it worse."],
          ["Can you repair the AC compressor?", "We handle compressor-related repairs. The right fix depends on what has failed, which we confirm after inspection."],
          ["How much does AC repair cost?", "It depends on the cause. Gas recharge, a leak and a compressor fault are very different jobs. Call us to discuss."],
        ]}
      />

    </Frame>
  );
}

function Wheel() {
  return (
    <Frame
      variant="photo"
      page="Wheel alignment & balancing"
      serviceId="wheel-alignment-balancing"
      image={photo("wheel-alignment")}
      imagePosition="62% 50%"
      title="Wheel alignment and balancing"
      intro="Keep your car driving straight, your steering smooth and your tyres wearing evenly."
      actions={<><CallButton label="Call to check alignment" /><WhatsAppButton label="WhatsApp us" message="Hello, I'd like a wheel alignment/balancing check. Car: [make/model/year]. Problem: [ ]" /></>}
      cta={
        <PageCTA image={photo("tyre-care")} title="Car pulling or steering shaking?" copy="Call us and describe what you’re feeling. We’ll check whether it’s alignment, balancing or something else.">
          <CallButton label="Call to check alignment" />
          <ActionLink href="/services/tyre-care/" tone="ghost">Tyre care</ActionLink>
        </PageCTA>
      }
    >
      <section className="section surface-canvas" aria-labelledby="wheel-signs-heading">
        <div className="wrap">
          <SectionHead id="wheel-signs-heading" title="Signs your wheels need attention." copy="Potholes, speed breakers and kerbs gradually knock a car’s wheels out of their correct angles and balance, affecting steering, tyre life and comfort." />
          <TyreGuide
            label="Alignment symptoms"
            href={bookingHref("wheel-alignment-balancing")}
            states={[
              { id: "pull", label: "Pulling", sub: "Toe angle", title: "The car pulls to one side", copy: "When the wheels point slightly away from straight ahead (the toe angle), the car drifts and the tyres scrub as they roll.", readoutLabel: "Toe, example", readout: "+2.3 mm", mode: "toe" },
              { id: "centre", label: "Off-centre", sub: "Steering offset", title: "The steering wheel sits off-centre", copy: "Driving straight with the steering wheel turned slightly is a common sign that the alignment has shifted.", readoutLabel: "Offset, example", readout: "4°", mode: "offset" },
              { id: "wear", label: "Uneven wear", sub: "Camber", title: "One edge of the tyre wears faster", copy: "When the wheel leans in or out (camber), one shoulder of the tread carries more load and wears first.", readoutLabel: "Camber, example", readout: "−1.6°", mode: "camber" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="compare-heading">
        <div className="wrap">
          <SectionHead id="compare-heading" title="Two different problems. Two different checks." />
          <div className="aa-compare">
            <article>
              <div className="aa-compare__photo"><Image src={photo("wheel-alignment")} alt="" fill quality={72} sizes="(max-width: 899px) 100vw, 50vw" /></div>
              <h3>Alignment: where the wheels point.</h3>
              <p>Corrects the angles at which the wheels meet the road. Often needed after a pothole or kerb impact, or suspension and steering work.</p>
              <p className="aa-compare__sign"><span className="aa-label">Typical signs</span> The car pulls, the steering sits off-centre, or tyres wear unevenly.</p>
            </article>
            <article>
              <div className="aa-compare__photo"><Image src={photo("tyre-care")} alt="" fill quality={72} sizes="(max-width: 899px) 100vw, 50vw" /></div>
              <h3>Balancing: how the wheel rotates.</h3>
              <p>Spreads the weight of each wheel and tyre evenly using small weights. Often needed after new tyres, a tyre repair or wheel removal.</p>
              <p className="aa-compare__sign"><span className="aa-label">Typical sign</span> Vibration at higher speeds.</p>
            </article>
          </div>
        </div>
      </section>

      <FaqSection
        title="Alignment and balancing questions"
        items={[
          ["What’s the difference between alignment and balancing?", "Alignment corrects the angles of the wheels; balancing corrects how weight is spread around each wheel. Pulling suggests alignment; vibration at speed usually suggests balancing."],
          ["Do I need alignment when I buy new tyres?", "It’s a good idea. New tyres are usually balanced when fitted, and checking alignment protects them from uneven wear."],
          ["Can bad alignment damage my tyres?", "Yes. Misalignment is one of the most common causes of uneven and early tyre wear."],
          ["How long does alignment take?", "It depends on the car and what adjustment is needed. Call us to plan your visit."],
        ]}
      />

    </Frame>
  );
}

function Tyres() {
  return (
    <Frame
      variant="photo"
      page="Tyre care"
      serviceId="tyre-care"
      image={photo("tyre-care")}
      imagePosition="50% 55%"
      title="Tyre care for safer driving"
      intro="Tyre inspections, pressure checks and practical advice to keep your car gripping the road, in the dry and through the monsoon."
      actions={<><CallButton label="Call about your tyres" /><WhatsAppButton label="WhatsApp a photo of your tyre" message="Hello, I'd like advice on my tyres. Car: [make/model/year]. Tyre size: [ ]. Issue: [ ]" /></>}
      cta={
        <PageCTA image={photo("wheel-alignment")} title="Worried about your tyres?" copy="Call us with your tyre size (printed on the sidewall, for example 185/65 R15) and we’ll tell you whether it needs attention.">
          <CallButton label="Call about your tyres" />
          <WhatsAppButton label="WhatsApp a photo" />
        </PageCTA>
      }
    >
      <section className="section surface-canvas" aria-labelledby="tread-heading">
        <div className="wrap">
          <SectionHead id="tread-heading" title="Read the tyre before guessing the repair." copy="The wear pattern tells us a lot: worn edges suggest alignment or pressure; patchy wear suggests balancing or suspension." />
          <TyreGuide
            label="Tyre wear patterns"
            href={bookingHref("tyre-care")}
            states={[
              { id: "even", label: "Even", sub: "Balanced wear", title: "Even-looking wear", copy: "The tread is wearing consistently across the tyre surface.", readoutLabel: "Wear pattern", readout: "Even", mode: "even" },
              { id: "edge", label: "Edge", sub: "Shoulder wear", title: "Edge-heavy wear", copy: "More wear near one edge can be a reason to check tyre pressure and wheel geometry.", readoutLabel: "Check area", readout: "Edge", mode: "edge" },
              { id: "patch", label: "Patchy", sub: "Irregular wear", title: "Irregular wear", copy: "Patchy wear can point to an uneven contact pattern that is worth inspecting.", readoutLabel: "Check area", readout: "Patches", mode: "patch" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-alt" aria-labelledby="look-heading">
        <div className="wrap aa-split">
          <SectionHead id="look-heading" title="Tread, pressure, sidewalls and age." copy="Monsoon tip: before the rains, check tread and pressure on all four tyres and the spare." />
          <div>
            <SpecList
              items={[
                ["Tread depth", "When the tread is level with the wear indicators in the grooves, it’s time to replace the tyre."],
                ["Pressure", "The correct pressure is usually on a sticker inside the driver’s door."],
                ["Sidewall damage", "Cuts, cracks or bulges can mean internal damage. Get them checked promptly."],
                ["Uneven wear", "Edge wear often points to alignment."],
              ]}
            />
            <Link href="/services/wheel-alignment-balancing/" className="aa-link aa-after-spec">See wheel alignment and balancing</Link>
          </div>
        </div>
      </section>

      <FaqSection
        title="Tyre questions"
        items={[
          ["How often should I check my tyre pressure?", "At least once a month and before long trips, when the tyres are cold."],
          ["How do I know when my tyres need replacing?", "When the tread is level with the wear indicators, or if there are cuts, bulges or cracks. We can check them for you."],
          ["Why are my tyres wearing unevenly?", "Usually alignment, incorrect pressure, balancing or worn suspension. The wear pattern tells us which."],
          ["Should I replace all four tyres at once?", "Not always. At least replace them in pairs on the same axle so grip stays even."],
        ]}
      />

    </Frame>
  );
}

/* ------------------------------------------------------------------ Spare parts */

function Parts() {
  const enquire = bookingHref("spare-parts");
  return (
    <Frame
      variant="split"
      page="Spare parts"
      serviceId="spare-parts"
      image={photo("spare-parts")}
      imagePosition="40% 50%"
      title="Spare parts enquiry"
      intro="Tell us your car and the part you need. We’ll check genuine (OEM) and aftermarket options and get back to you about availability."
      actions={<><CallButton label="Call us" /><WhatsAppButton label="Ask on WhatsApp" message="Hello, I'm looking for a spare part. Car: [make/model/year]. Part: [ ]. I'll attach a photo." /></>}
      cta={
        <PageCTA image={photo("mechanical-repair")} title="Describe the part and we’ll check for you." copy="Or bring the old part to our workshop on Kattoor Road.">
          <CallButton label="Call us" />
          <DirectionsButton />
        </PageCTA>
      }
    >
      <section className="section surface-canvas" aria-labelledby="finding-heading">
        <div className="wrap">
          <SectionHead id="finding-heading" title="The same part can differ between years, engines and variants." copy="Availability varies by part and model. We don’t hold every part in stock, but we’ll tell you what we can source." />
          <ChoiceExplorer
            label="Part categories"
            note="Availability and exact fitment should be confirmed for your vehicle before you travel."
            items={[
              { id: "maintenance", label: "Maintenance", title: "Maintenance parts", copy: "The parts a periodic service replaces, and the ones that wear with everyday driving.", chips: ["Filters", "Belts", "Mountings", "Service parts"], href: enquire, hrefLabel: "Enquire about these parts" },
              { id: "brakes", label: "Brakes", title: "Brake parts", copy: "Friction parts and the hydraulics that work them.", chips: ["Pads", "Shoes", "Discs", "Hydraulic parts"], href: enquire, hrefLabel: "Enquire about these parts" },
              { id: "suspension", label: "Suspension", title: "Suspension and steering parts", copy: "The joints and links that keep the wheels where they should be.", chips: ["Bushes", "Tie rods", "Ball joints", "Related components"], href: enquire, hrefLabel: "Enquire about these parts" },
              { id: "electrical", label: "Electrical", title: "Electrical parts", copy: "Small parts that are easy to mismatch; a photo of the old one helps.", chips: ["Sensors", "Switches", "Relays", "Lighting"], href: enquire, hrefLabel: "Enquire about these parts" },
              { id: "fluids", label: "Fluids", title: "Fluids", copy: "The right grade for your engine and system matters.", chips: ["Engine oil", "Coolant", "Brake fluid", "Other maintenance fluids"], href: enquire, hrefLabel: "Enquire about these parts" },
            ]}
          />
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="details-heading">
        <div className="wrap aa-split">
          <SectionHead
            id="details-heading"
            title="A few details get the right part first time."
            copy="Genuine (OEM) parts are made to the original specification; aftermarket parts are often lower cost and quality varies by brand. We’ll explain the options for your part."
          />
          <div className="aa-jobcard">
            <h3 className="aa-jobcard__title">What to tell us</h3>
            <SpecList
              items={[
                ["Make and model", "Plus variant: petrol or diesel, manual or automatic."],
                ["Year", "Shown on your registration certificate (RC)."],
                ["Chassis number", "Optional, and the most reliable way to match parts."],
                ["Part number", "If it’s printed on the old part."],
                ["Photo", "Especially helpful for clips, hoses, brackets and sensors."],
              ]}
            />
          </div>
        </div>
      </section>

      <FaqSection
        title="Spare parts questions"
        items={[
          ["Do you have the part in stock?", "It depends on the part and the model. Send an enquiry and we’ll check availability and options for you."],
          ["Can you fit the part for me?", "If the part is for a job our workshop handles, we can discuss fitting it. Call us to plan."],
          ["Can you find parts for older cars?", "We’ll try. Parts for older or less common models can take longer to find or may have limited options."],
          ["What details do you need?", "At minimum your car’s make, model, year and the part name. The chassis number or a photo of the old part makes matching more accurate."],
        ]}
      />

    </Frame>
  );
}

/* ------------------------------------------------------------------ Contact */

function ContactNumbers() {
  return (
    <ul className="aa-contact-lines" aria-label="Ways to reach the workshop">
      <li>
        <a href={phoneTel}>
          <span className="aa-label">Mobile, fastest</span>
          <b>{businessFacts.phones.primaryDisplay}</b>
          <Phone size={22} aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={landlineTel}>
          <span className="aa-label">Landline</span>
          <b>{businessFacts.phones.landlineDisplay}</b>
          <Phone size={22} aria-hidden="true" />
        </a>
      </li>
      {whatsappEnabled ? (
        <li>
          <a href={whatsappLink("Hello Asian Automobiles, ")!} target="_blank" rel="noopener noreferrer">
            <span className="aa-label">WhatsApp</span>
            <b>{businessFacts.phones.whatsappDisplay}</b>
            <Mail size={22} aria-hidden="true" />
          </a>
        </li>
      ) : (
        <li>
          <a href={"mailto:" + businessFacts.email + "?subject=" + encodeURIComponent("Enquiry from website")}>
            <span className="aa-label">Email, for non-urgent questions</span>
            <b className="aa-contact-lines__email">{businessFacts.email}</b>
            <Mail size={22} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  );
}

function Contact() {
  return (
    <Frame
      variant="plain"
      page="Contact"
      title="Contact and location"
      intro="Call, message or visit our workshop on Kattoor Road, Irinjalakuda. The quickest way to reach us is a call."
      heroAside={<ContactNumbers />}
    >
      <section id="enquiry" className="section surface-alt" aria-labelledby="enquiry-heading">
        <div className="wrap">
          {whatsappEnabled ? (
            <ContactEnquiryForm />
          ) : (
            <div className="aa-split">
              <div className="aa-section-head">
                <h2 id="enquiry-heading">For service, repairs or parts, call the workshop.</h2>
                <p className="aa-lead">
                  Have your car’s make, model and year ready, and tell us what you need. An enquiry is not a confirmed
                  booking: we’ll agree a time with you on the call. For non-urgent questions, email {businessFacts.email}.
                </p>
                <div className="aa-actions">
                  <CallButton />
                  <ActionLink href={landlineTel} tone="ghost" icon={<Phone size={16} aria-hidden="true" />}>Call the landline</ActionLink>
                </div>
              </div>
              <div className="aa-jobcard">
                <h3 className="aa-jobcard__title">Useful to have ready</h3>
                <SpecList
                  items={[
                    ["Your car", "Make, model, year and variant."],
                    ["What you need", "A service, a repair, AC, wheels or tyres, or a part."],
                    ["What you’ve noticed", "A noise, a warning light, a vibration, and when it happens."],
                    ["Kilometres", "Approximate reading, if it’s a service."],
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section surface-canvas" aria-labelledby="location-heading">
        <div className="wrap aa-location">
          <MapReveal src={mapsEmbedSrc}>
            <svg className="aa-map-art" viewBox="0 0 600 420" aria-hidden="true">
              <path className="aa-map-art__road aa-map-art__road--minor" d="M-20 120 C 140 140, 260 90, 620 150" />
              <path className="aa-map-art__road aa-map-art__road--minor" d="M180 -20 C 200 140, 160 280, 210 440" />
              <path className="aa-map-art__road" d="M-20 300 C 160 270, 340 250, 620 200" />
              <text className="aa-map-art__label" x="60" y="276" transform="rotate(-7 60 276)">KATTOOR ROAD</text>
              <circle className="aa-map-art__ring" cx="400" cy="232" r="34" />
              <circle className="aa-map-art__pin" cx="400" cy="232" r="9" />
            </svg>
          </MapReveal>
          <div className="aa-location__card">
            <h2 id="location-heading">V/526, Kattoor Road, Irinjalakuda.</h2>
            <address className="aa-lead">Asian Automobiles, {businessFacts.address.full}.</address>
            <dl className="aa-visit__facts">
              <div><dt className="aa-label">Landmark</dt><dd>{businessFacts.address.landmark}</dd></div>
              <div><dt className="aa-label">Working hours</dt><dd>{businessFacts.hours}{businessFacts.sundayClosed ? ". Closed on Sundays." : "."} Please call ahead on public holidays.</dd></div>
              <div><dt className="aa-label">Plus code</dt><dd>{businessFacts.address.plusCode}</dd></div>
            </dl>
            <DirectionsButton tone="dark" />
            <p className="aa-location__area">
              <MapPin size={16} aria-hidden="true" /> Coming from nearby? We welcome customers from across the Irinjalakuda area,
              including {businessFacts.serviceArea.join(", ")}.
            </p>
          </div>
        </div>
      </section>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Privacy */

function Privacy() {
  const sections: [string, string][] = [
    ["Who we are", `Asian Automobiles, ${businessFacts.address.full}. For any privacy question, email ${businessFacts.email} or call ${businessFacts.phones.primaryDisplay}.`],
    ["What information we collect", "Only what you choose to share when you contact us: your name and phone number, optional email, your car’s make, model, year and variant, the part or service you’re asking about, your message, and any photo you send. We do not ask for payment details or identity documents on this website."],
    ["How we use it", "Only to respond to your enquiry and arrange the service or part you asked about. No marketing messages unless you separately agree."],
    ["Consent", "Enquiries are sent only with your consent. You can withdraw consent at any time by contacting us."],
    ["WhatsApp and third-party services", "If you contact us on WhatsApp, WhatsApp’s own terms apply. Google Maps opens only when you choose directions. Our hosting provider keeps short technical logs for security."],
    ["How long we keep it", "Only as long as needed to respond to you and handle any follow-up work. Part photos are deleted once the enquiry is closed."],
    ["Who we share it with", "We never sell your information. We share it only with providers needed to run this website, with a parts supplier (vehicle and part details only) where needed to source a part, or where the law requires it."],
    ["Your rights", "You can ask for a summary of your information, ask us to correct or erase it, withdraw consent or raise a grievance by contacting us using the details above."],
    ["Children and cookies", "This website is intended for adults. It does not set advertising or tracking cookies."],
    ["Changes", "If we change this policy, we will update the date on this page."],
  ];
  return (
    <Frame variant="plain" page="Privacy Policy" title="Privacy Policy" intro="How Asian Automobiles collects, uses and protects the information you share through this website. Last updated 7 November 2026.">
      <section className="section surface-canvas aa-legal-wrap">
        <div className="wrap aa-legal">
          <nav className="aa-legal__toc" aria-label="On this page">
            <ol>
              {sections.map(([heading], index) => (
                <li key={heading}><a href={"#privacy-" + index}>{heading}</a></li>
              ))}
            </ol>
          </nav>
          <article className="aa-legal__body">
            {sections.map(([heading, body], index) => (
              <section key={heading} id={"privacy-" + index} aria-labelledby={"privacy-" + index + "-h"}>
                <h2 id={"privacy-" + index + "-h"}>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Routing & metadata */

const views: Record<PageKey, () => ReactNode> = {
  about: About,
  services: Services,
  "services/car-service-maintenance": CarService,
  "services/mechanical-repairs": Mechanical,
  "services/car-ac-service": AC,
  "services/wheel-alignment-balancing": Wheel,
  "services/tyre-care": Tyres,
  "spare-parts": Parts,
  contact: Contact,
  "privacy-policy": Privacy,
};

/**
 * Every page is prerendered at build time and served from the CDN. Unknown paths are a
 * real 404 instead of an on-demand render; retired URLs are redirected in next.config.ts.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(views) as PageKey[]).map((key) => ({ slug: key.split("/") }));
}

function viewKey(slug: string[] = []): PageKey | undefined {
  const key = slug.join("/");
  return Object.hasOwn(views, key) ? (key as PageKey) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const key = viewKey((await params).slug);
  if (!key) return { robots: { index: false, follow: false } };
  const { title, description } = pageMeta[key];
  return {
    title,
    description,
    alternates: { canonical: "/" + key + "/" },
    openGraph: { title, description, type: "website", locale: "en_IN", siteName: "Asian Automobiles" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const key = viewKey((await params).slug);
  if (!key) notFound();
  const View = views[key];
  return <View />;
}
