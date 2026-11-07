import Link from "next/link";
import { ArrowRight, MessageCircle, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { displayPhone, mapsHref, telHref, waHref } from "@/lib/links";
import type { WhatsappKey } from "@/content/whatsappMessages";

type Variant = "primary" | "secondary" | "text";
const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-semibold leading-none transition-colors duration-150 text-[15px] lg:text-base";
const styles: Record<Variant, string> = {
  primary: "bg-amber-500 text-graphite-900 hover:bg-amber-700 hover:text-white px-5",
  secondary:
    "border border-graphite-900 text-graphite-900 hover:bg-graphite-900 hover:text-white px-5 [.on-dark_&]:border-white [.on-dark_&]:text-white [.on-dark_&]:hover:bg-white [.on-dark_&]:hover:text-graphite-900",
  text: "text-amber-700 underline-offset-4 hover:underline [.on-dark_&]:text-amber-500 px-0",
};

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  analytics?: { event: string; channel?: string; position: string };
}

export function ButtonLink({ href, children, variant = "primary", size = "md", icon, external, className = "", ariaLabel, analytics }: ButtonLinkProps) {
  const cls = `${base} ${styles[variant]} ${variant === "text" ? "" : size === "lg" ? "min-h-[52px]" : "min-h-11"} ${className}`;
  const data = analytics
    ? { "data-analytics": analytics.event, "data-analytics-channel": analytics.channel, "data-analytics-position": analytics.position }
    : {};
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {variant === "text" && <ArrowRight className="size-4" aria-hidden="true" />}
    </>
  );
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal)
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} {...data}>
        {content}
      </Link>
    );
  return (
    <a
      href={href}
      className={cls}
      aria-label={external ? `${ariaLabel ?? (typeof children === "string" ? children : "")} (opens in a new tab)`.trim() : ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      {...data}
    >
      {content}
    </a>
  );
}

/* Channel buttons derive from business data; a missing channel renders nothing. */

export function CallButton({ label = "Call the Workshop", mobileLabel, position, variant = "primary", size = "lg", className }: { label?: string; mobileLabel?: string; position: string; variant?: Variant; size?: "md" | "lg"; className?: string }) {
  const href = telHref();
  if (!href) return null;
  return (
    <ButtonLink href={href} variant={variant} size={size} className={className} icon={<Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />} ariaLabel={`${label} on ${displayPhone()}`} analytics={{ event: "contact_click", channel: "phone", position }}>
      {mobileLabel ? <><span className="sm:hidden">{mobileLabel}</span><span className="hidden sm:inline">{label}</span></> : label}
    </ButtonLink>
  );
}

export function WhatsappButton({ label = "WhatsApp Us", messageKey = "general", position, variant = "secondary", size = "lg", className }: { label?: string; messageKey?: WhatsappKey; position: string; variant?: Variant; size?: "md" | "lg"; className?: string }) {
  const href = waHref(messageKey);
  if (!href) return null;
  return (
    <ButtonLink href={href} variant={variant} size={size} className={className} external icon={<MessageCircle className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />} analytics={{ event: "contact_click", channel: "whatsapp", position }}>
      {label}
    </ButtonLink>
  );
}

export function DirectionsLink({ label = "Get Directions", position, asButton = false, className }: { label?: string; position: string; asButton?: boolean; className?: string }) {
  return (
    <ButtonLink href={mapsHref()} variant={asButton ? "secondary" : "text"} size="lg" external className={className} icon={asButton ? <Navigation className="size-[18px]" strokeWidth={1.75} aria-hidden="true" /> : undefined} analytics={{ event: "directions_click", position }}>
      {label}
    </ButtonLink>
  );
}
