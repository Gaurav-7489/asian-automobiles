import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { PageProgressRail } from "@/components/immersive/inner-page-experiences";
import { ServiceConnections } from "@/components/service-connections";
import { CallButton, DirectionsButton } from "@/components/ui/action-link";
import { JsonLd } from "@/components/ui/json-ld";
import { siteUrl } from "@/lib/site";

export type PageTheme = "about" | "services" | "service" | "mechanical" | "privacy" | "ac" | "wheel" | "tyre" | "parts" | "contact";

const photo = (name: string) => "/images/photos/" + name + ".jpg";
const img = {
  workshop: photo("hero-workshop"),
  repair: photo("oil-service"),
  car: photo("car-profile"),
  road: photo("tyre-care"),
  detail: photo("spare-parts"),
  wheel: photo("wheel-alignment"),
};

/** Per-theme hero labels and photos: [primary label, secondary label, main photo, detail photo, context photo]. */
const heroByTheme: Record<PageTheme, [string, string, string, string, string]> = {
  about: ["KATTOOR ROAD", "INDEPENDENT / MULTI-BRAND", img.workshop, img.detail, img.car],
  mechanical: ["DIAGNOSE", "BRAKES / CLUTCH / STEERING", img.repair, img.workshop, img.detail],
  privacy: ["PRIVACY", "YOUR INFORMATION", img.detail, img.workshop, img.road],
  services: ["SERVICE MAP", "CHOOSE BY NEED", img.repair, img.workshop, img.wheel],
  service: ["VEHICLE CHECK", "MAINTENANCE / DIAGNOSIS", img.repair, img.detail, img.workshop],
  ac: ["COOLING", "CABIN CLIMATE", img.detail, img.detail, img.car],
  wheel: ["0.00°", "WHEEL GEOMETRY", img.wheel, img.car, img.road],
  tyre: ["TREAD / WEAR", "TYRE CONDITION", img.wheel, img.road, img.detail],
  parts: ["FITMENT", "MODEL / VARIANT / YEAR", img.workshop, img.detail, img.repair],
  contact: ["KATTOOR ROAD", "IRINJALAKUDA", img.road, img.workshop, img.car],
};

function HeroArt({ theme }: { theme: PageTheme }) {
  const [primary, secondary, mainPhoto, detailPhoto, contextPhoto] = heroByTheme[theme];
  return (
    <div className={"aa-v11-hero-art aa-v11-hero-" + theme + " aa-v15-photo-hero"} aria-hidden="true">
      <div className="aa-v15-hero-photo-main">
        {/* The largest above-the-fold image on inner pages (the LCP element): load it first. */}
        <Image
          src={mainPhoto}
          alt=""
          fill
          priority
          quality={76}
          sizes="(max-width: 720px) 92vw, (max-width: 1100px) 58vw, 520px"
        />
      </div>
      <div className="aa-v15-hero-photo-stack">
        <span className="aa-v15-hero-thumb">
          <Image src={detailPhoto} alt="" fill quality={68} sizes="160px" />
        </span>
        <span className="aa-v15-hero-thumb">
          <Image src={contextPhoto} alt="" fill quality={68} sizes="160px" />
        </span>
      </div>
      <div className="aa-v15-hero-scrim" />
      <div className="aa-v11-theme-core aa-v15-theme-core"><i /><i /><i /><i /></div>
      <strong>{primary}</strong>
      <small>{secondary}</small>
      <span className="aa-v15-photo-index">PHOTO / {theme.toUpperCase()}</span>
    </div>
  );
}

/** Image rail — stock photos colour-graded to the site palette; swap for real workshop photos. */
const railByTheme: Partial<Record<PageTheme, [string, string][]>> = {
  about: [[photo("oil-service"), "Servicing"], [photo("mechanical-repair"), "Repairs"], [photo("spare-parts"), "Spare parts"]],
  service: [[photo("oil-service"), "Oil & filters"], [photo("engine-detail"), "Checks"], [photo("mechanic-inspection"), "Inspection"]],
  mechanical: [[photo("wheel-alignment"), "Brakes"], [photo("mechanical-repair"), "Suspension"], [photo("engine-bay"), "Steering"]],
  ac: [[photo("mechanic-inspection"), "Inspection"], [photo("engine-bay"), "Fault-finding"], [photo("engine-detail"), "Gas recharge"]],
  wheel: [[photo("wheel-alignment"), "Alignment"], [photo("tyre-care"), "Balancing"], [photo("car-profile"), "Tyre wear"]],
  tyre: [[photo("tyre-care"), "Tread"], [photo("wheel-alignment"), "Pressure"], [photo("car-profile"), "Wear"]],
  parts: [[photo("spare-parts"), "Genuine (OEM)"], [photo("engine-detail"), "Aftermarket"], [photo("mechanical-repair"), "Fitment"]],
};

function VisualRail({ items }: { items: [string, string][] }) {
  return (
    <section className="aa-visual-rail-section" aria-label="At a glance">
      <div className="wrap">
        <ul className="aa-visual-rail">
          {items.map(([src, label], i) => (
            <li key={label}>
              <figure>
                <Image src={src} alt="" fill sizes="(max-width: 900px) 78vw, 30vw" />
                <figcaption><i>{String(i + 1).padStart(2, "0")}</i><span>{label}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Crumb = { name: string; href?: string };

/** Breadcrumbs (spec 6.2 / 20.3.7) in the template's back-link style, with BreadcrumbList JSON-LD. */
function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...trail];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: siteUrl + c.href } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className="back">
      <ArrowLeft size={15} />
      <ol style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 8px", listStyle: "none", margin: 0, padding: 0 }}>
        {all.map((c, i) => (
          <li key={c.name} style={{ display: "inline-flex", gap: 8 }}>
            {i > 0 && <span aria-hidden="true">›</span>}
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={ld} />
    </nav>
  );
}

/** Shared inner-page shell: breadcrumbs, hero, optional photo rail, page sections and related services. */
export function Frame({
  eyebrow,
  title,
  intro,
  actions,
  theme,
  serviceId,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
  theme: PageTheme;
  serviceId?: string;
  children: ReactNode;
}) {
  const trail: Crumb[] = serviceId && serviceId !== "spare-parts"
    ? [{ name: "Services", href: "/services/" }, { name: eyebrow }]
    : [{ name: eyebrow === "Legal" ? "Privacy Policy" : eyebrow }];
  const rail = railByTheme[theme];
  return (
    <main id="main" tabIndex={-1} className={"creative-page immersive-page immersive-page-v9 aa-inner-v10 aa-v11-page theme-" + theme}>
      <PageProgressRail />
      <section className="creative-head aa-v10-head">
        <div className="creative-head-grid" aria-hidden="true" />
        <div className="wrap creative-wrap aa-v10-hero-wrap">
          <Breadcrumbs trail={trail} />
          <div className="aa-v10-hero-layout">
            <div className="creative-heading aa-view-reveal">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              {intro && <p>{intro}</p>}
            </div>
            <div className="aa-v10-hero-side aa-v11-hero-side">
              <HeroArt theme={theme} />
              <div className="aa-v10-hero-actions">
                {actions ?? (
                  <>
                    <CallButton />
                    <DirectionsButton />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="page-content" className="creative-body aa-v10-body">
        {rail && <VisualRail items={rail} />}
        {children}
        {serviceId && <ServiceConnections id={serviceId} />}
      </div>
    </main>
  );
}
