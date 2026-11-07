import {
  AlertTriangle, BadgeCheck, Car, CircleDot, Cog, Crosshair, Droplets, Gauge, Package, Paintbrush,
  PiggyBank, Route, ShieldCheck, Snowflake, Sparkles, Timer, Wind, Wrench, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/services";

const map = {
  wrench: Wrench, cog: Cog, snowflake: Snowflake, crosshair: Crosshair, "circle-dot": CircleDot,
  paintbrush: Paintbrush, sparkles: Sparkles, package: Package, shield: ShieldCheck, "piggy-bank": PiggyBank,
  car: Car, "badge-check": BadgeCheck, alert: AlertTriangle, timer: Timer, gauge: Gauge, droplets: Droplets,
  wind: Wind, route: Route,
} satisfies Record<IconName, unknown>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.5} aria-hidden="true" {...props} />;
}
