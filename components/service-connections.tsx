import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { findService } from "@/lib/service-catalog";

/** Related services (spec 20.3.10): 2–3 links from the service's related list, published only. */
export function ServiceConnections({ id }: { id: string }) {
  const current = findService(id);
  if (!current) return null;
  const related = current.related.map((r) => findService(r)).filter((s) => s !== undefined);
  return (
    <nav className="aa-service-connections wrap" aria-label="Related services">
      <div><span className="eyebrow">RELATED SERVICES</span><h2>Keep the next step connected.</h2></div>
      <div className="aa-service-connection-links">
        {related.map((service) => (
          <Link key={service.id} href={service.href}>{service.title}<ArrowUpRight size={16} /></Link>
        ))}
        <Link href="/services/">All services<ArrowUpRight size={16} /></Link>
      </div>
    </nav>
  );
}
