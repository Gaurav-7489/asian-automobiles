import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { findService, serviceCatalog } from "@/lib/service-catalog";

export function ServiceConnections({ theme }: { theme: string }) {
  const current = serviceCatalog.find((service) => service.theme === theme);
  if (!current) return null;
  return (
    <nav className="aa-service-connections wrap" aria-label="Related services">
      <div><span className="eyebrow">RELATED SUPPORT</span><h2>Keep the next step connected.</h2></div>
      <div className="aa-service-connection-links">
        {current.related.map((id) => {
          const service = findService(id)!;
          return <Link key={id} href={service.href}>{service.title}<ArrowUpRight size={16} /></Link>;
        })}
        {current.id === "accident-repair" && <Link href="/insurance/">Insurance assistance<ArrowUpRight size={16} /></Link>}
        <Link href="/services/">All services<ArrowUpRight size={16} /></Link>
      </div>
    </nav>
  );
}
