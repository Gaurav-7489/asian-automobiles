import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle, Navigation, Phone } from "lucide-react";
import { directionsHref, phoneTel, whatsappLink } from "@/lib/business-facts";

export type ActionTone = "primary" | "dark" | "ghost" | "whatsapp";

/**
 * The site's one button-style link (`aa-v10-button`). Internal paths use client-side
 * navigation with prefetching; `tel:`, `mailto:` and external URLs render a plain anchor.
 * Without an icon a trailing arrow is shown; pass `arrow` to size or force it.
 */
export function ActionLink({
  href,
  children,
  tone = "primary",
  icon,
  arrow,
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: ActionTone;
  icon?: ReactNode;
  arrow?: number;
  external?: boolean;
}) {
  const className = "aa-v10-button aa-v10-button-" + tone;
  const arrowSize = arrow ?? (icon ? undefined : 15);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrowSize !== undefined && <ArrowUpRight size={arrowSize} />}
    </>
  );
  if (href.startsWith("/")) {
    return <Link className={className} href={href}>{inner}</Link>;
  }
  return (
    <a className={className} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  );
}

/** Spec 5.1.5: Call is always the amber primary action. */
export function CallButton({ label = "Call workshop", tone = "primary" }: { label?: string; tone?: ActionTone }) {
  return <ActionLink href={phoneTel} tone={tone} icon={<Phone size={15} />}>{label}</ActionLink>;
}

export function DirectionsButton() {
  return <ActionLink href={directionsHref} external tone="ghost" icon={<Navigation size={15} />}>Get directions</ActionLink>;
}

/** WhatsApp action; until the number is confirmed (spec 2.4) it falls back to directions. */
export function WhatsAppButton({
  label = "WhatsApp us",
  message = "Hello Asian Automobiles, I would like help with my vehicle.",
  tone = "whatsapp",
}: {
  label?: string;
  message?: string;
  tone?: ActionTone;
}) {
  const href = whatsappLink(message);
  if (!href) return <DirectionsButton />;
  return <ActionLink href={href} external tone={tone} icon={<MessageCircle size={15} />} arrow={14}>{label}</ActionLink>;
}
