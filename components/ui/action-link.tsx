import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { businessFacts, directionsHref, phoneTel, whatsappLink } from "@/lib/business-facts";

/**
 * primary: copper fill (the one main action in a group)
 * dark:    graphite fill, for light surfaces
 * light:   porcelain fill, for dark surfaces and photos
 * ghost:   outline that inherits the surrounding text colour
 */
export type ActionTone = "primary" | "dark" | "light" | "ghost";

/**
 * The site's one button-style link. Internal paths use client-side navigation with
 * prefetching; `tel:`, `mailto:` and external URLs render a plain anchor.
 */
export function ActionLink({
  href,
  children,
  tone = "primary",
  icon,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: ActionTone;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = "aa-btn aa-btn--" + tone + (className ? " " + className : "");
  const inner = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (href.startsWith("/")) {
    return <Link className={classes} href={href}>{inner}</Link>;
  }
  return (
    <a className={classes} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  );
}

/** Calling the workshop is the fastest route, so it is the primary action unless a page says otherwise. */
export function CallButton({ label = "Call the workshop", tone = "primary" }: { label?: string; tone?: ActionTone }) {
  return <ActionLink href={phoneTel} tone={tone} icon={<Phone size={16} aria-hidden="true" />}>{label}</ActionLink>;
}

/** Call button that shows the number itself, for places where seeing it matters. */
export function CallNumberButton({ tone = "ghost" }: { tone?: ActionTone }) {
  return (
    <ActionLink href={phoneTel} tone={tone} icon={<Phone size={16} aria-hidden="true" />}>
      {"Call " + businessFacts.phones.primaryDisplay}
    </ActionLink>
  );
}

export function DirectionsButton({ tone = "ghost" }: { tone?: ActionTone }) {
  return <ActionLink href={directionsHref} external tone={tone} icon={<Navigation size={16} aria-hidden="true" />}>Get directions</ActionLink>;
}

/** WhatsApp action; until the number is confirmed (spec 2.4) it falls back to directions. */
export function WhatsAppButton({
  label = "WhatsApp us",
  message = "Hello Asian Automobiles, I would like help with my vehicle.",
  tone = "ghost",
}: {
  label?: string;
  message?: string;
  tone?: ActionTone;
}) {
  const href = whatsappLink(message);
  if (!href) return <DirectionsButton tone={tone} />;
  return <ActionLink href={href} external tone={tone} icon={<MessageCircle size={16} aria-hidden="true" />}>{label}</ActionLink>;
}
