import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ServiceConnections } from "@/components/service-connections";
import { JsonLd } from "@/components/ui/json-ld";
import { siteUrl } from "@/lib/site";

/**
 * photo: full-bleed photograph with the title over it (service pages)
 * split: porcelain, title beside a tall photograph (About, Spare parts)
 * index: graphite, typographic, leads straight into a directory (Services)
 * plain: porcelain, typographic, for reading or for a custom panel (Contact, Privacy)
 */
export type HeroVariant = "photo" | "split" | "index" | "plain";

type Crumb = { name: string; href?: string };

/** Breadcrumbs (spec 6.2 / 20.3.7) with BreadcrumbList JSON-LD. */
function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...trail];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: siteUrl + c.href } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className="aa-crumbs">
      <ol>
        {all.map((c, i) => (
          <li key={c.name}>
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={ld} />
    </nav>
  );
}

export function Frame({
  page,
  title,
  intro,
  actions,
  variant,
  image,
  imagePosition,
  serviceId,
  heroAside,
  cta,
  children,
}: {
  /** Breadcrumb name of this page. */
  page: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
  variant: HeroVariant;
  image?: string;
  /** CSS object-position for the hero photo, to art-direct the crop. */
  imagePosition?: string;
  serviceId?: string;
  /** Extra hero content beside the text (used by Contact for the numbers). */
  heroAside?: ReactNode;
  /** Closing call to action; always last, after related services. */
  cta?: ReactNode;
  children: ReactNode;
}) {
  const trail: Crumb[] = serviceId && serviceId !== "spare-parts"
    ? [{ name: "Services", href: "/services/" }, { name: page }]
    : [{ name: page }];
  const inverse = variant === "photo" || variant === "index";

  return (
    <main id="main" tabIndex={-1} className={"aa-page aa-page--" + variant}>
      <section className={"aa-page-hero aa-page-hero--" + variant + (inverse ? " is-inverse" : "")}>
        {variant === "photo" && image && (
          <div className="aa-page-hero__photo">
            {/* The hero photo is the page's largest element (LCP): load it first. */}
            <Image src={image} alt="" fill priority quality={76} sizes="100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          </div>
        )}
        <div className="wrap aa-page-hero__grid">
          <div className="aa-page-hero__text">
            <Breadcrumbs trail={trail} />
            <h1>{title}</h1>
            {intro && <p>{intro}</p>}
            {actions && <div className="aa-actions">{actions}</div>}
          </div>
          {variant === "split" && image && (
            <figure className="aa-page-hero__figure">
              <Image src={image} alt="" fill priority quality={76} sizes="(max-width: 899px) 100vw, 44vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
            </figure>
          )}
          {heroAside}
        </div>
        {variant === "photo" && <span className="aa-gauge aa-page-hero__gauge" aria-hidden="true" />}
      </section>
      {children}
      {serviceId && <ServiceConnections id={serviceId} />}
      {cta}
    </main>
  );
}
