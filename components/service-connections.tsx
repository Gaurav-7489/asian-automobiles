import Image from "next/image";
import Link from "next/link";
import { findService, serviceImage } from "@/lib/service-catalog";

/** Related services (spec 20.3.10): the service's related list, published services only. */
export function ServiceConnections({ id }: { id: string }) {
  const current = findService(id);
  if (!current) return null;
  const related = current.related.map((r) => findService(r)).filter((s) => s !== undefined);
  return (
    <nav className="section surface-alt aa-related" aria-labelledby="related-heading">
      <div className="wrap">
        <div className="aa-related__head">
          <h2 id="related-heading">Often needed alongside</h2>
          <Link href="/services/" className="aa-link">All services</Link>
        </div>
        <ul className="aa-related__list">
          {related.map((service) => (
            <li key={service.id}>
              <Link href={service.href} className="aa-related__item">
                <span className="aa-related__photo">
                  <Image src={serviceImage(service)} alt="" fill quality={68} sizes="(max-width: 699px) 100vw, 33vw" />
                </span>
                <span className="aa-label">{service.meta}</span>
                <b>{service.title}</b>
                <span className="aa-related__desc">{service.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
