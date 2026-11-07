import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

export interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value?: string | null;
  helper: string;
  href: string | null;
  action: string;
  channel: string;
  position: string;
  external?: boolean;
  copy?: string;
  dark?: boolean;
}

/** Full-area link tile; renders nothing when its channel has no publishable value (spec 20.3.5). */
export function ContactCard({ icon, title, value, helper, href, action, channel, position, external, copy, dark }: ContactCardProps) {
  if (!href) return null;
  return (
    <div className={`group relative flex min-w-0 items-center gap-4 rounded-md border p-5 transition-colors duration-150 sm:flex-col sm:items-start lg:p-6 ${dark ? "border-charcoal-800 bg-charcoal-800/40 hover:border-amber-500" : "border-line-200 bg-white hover:border-amber-500"}`}>
      <span className={`shrink-0 ${dark ? "text-amber-500" : "text-amber-700"}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[17px] font-semibold">
          <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} className="after:absolute after:inset-0 focus-visible:outline-none" data-analytics={channel === "maps" ? "directions_click" : "contact_click"} data-analytics-channel={channel} data-analytics-position={position}>
            {title}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </h3>
        {value && <p className="mt-0.5 font-semibold [overflow-wrap:anywhere]">{value}</p>}
        <p className={`mt-1 text-[15px] ${dark ? "text-grey-400" : "text-slate-600"}`}>{helper}</p>
        <span className={`mt-3 hidden items-center gap-1 text-sm font-semibold sm:inline-flex ${dark ? "text-amber-500" : "text-amber-700"}`}>{action}</span>
      </div>
      {copy && !dark && <CopyButton value={copy} label={title} />}
      <ChevronRight className="size-5 shrink-0 opacity-60 sm:hidden" aria-hidden="true" />
    </div>
  );
}
