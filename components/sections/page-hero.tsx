import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageRef } from "@/content/images";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

/** Compact inner-page hero on graphite. Optional image on the right (service pages). */
export function PageHero({ crumbs, eyebrow, title, sub, actions, image }: { crumbs: Crumb[]; eyebrow: string; title: string; sub: string; actions?: ReactNode; image?: ImageRef }) {
  return (
    <section className="on-dark bg-graphite-900 text-white">
      <div className={`container-x grid gap-10 pb-14 pt-8 lg:pb-20 lg:pt-12 ${image ? "lg:grid-cols-2 lg:items-center" : ""}`}>
        <div className="max-w-[640px]">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="h1">{title}</h1>
          <p className="lead mt-5 text-grey-400">{sub}</p>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-md bg-charcoal-800">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
