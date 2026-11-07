import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IconName } from "@/content/services";
import type { ImageRef } from "@/content/images";
import { Icon } from "@/components/ui/icon";

export interface CardData { slug: string; name: string; text: string; href: string; icon: IconName; image?: ImageRef; linkLabel?: string }

/** Whole card is one link (spec 20.3.1). Compact (no image) on mobile to keep the grid short. */
export function ServiceCard({ card, anchor }: { card: CardData; anchor?: boolean }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line-200 bg-white transition duration-150 hover:border-amber-500 lg:hover:-translate-y-0.5">
      {card.image && (
        <div className="relative hidden aspect-[3/2] bg-warm-50 sm:block">
          <Image src={card.image.src} alt="" fill sizes="(min-width:1024px) 380px, 50vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 items-start gap-4 p-5 sm:flex-col sm:gap-3 lg:p-6">
        <Icon name={card.icon} className="size-7 shrink-0 text-amber-700 lg:size-8" />
        <div className="flex-1">
          <h3 className="h3">
            <Link href={card.href} className="after:absolute after:inset-0 focus-visible:outline-none" data-analytics="service_card_click" data-analytics-channel={card.slug} data-analytics-position="grid">
              {card.name}
            </Link>
          </h3>
          <p className="muted mt-1.5 text-[15px]">{card.text}</p>
          <span className="mt-4 hidden items-center gap-1.5 text-sm font-semibold text-amber-700 sm:inline-flex">
            {card.linkLabel ?? "View service"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
        {anchor && (
          <a href={`#${card.slug}`} className="relative z-10 hidden text-sm text-slate-600 underline underline-offset-4 hover:text-graphite-900 sm:inline">
            Read summary<span className="sr-only">: {card.name}</span>
          </a>
        )}
      </div>
    </div>
  );
}
