import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type StackService = {
  no: string;
  title: string;
  text: string;
  href: string;
  image: string;
  meta: string;
};

export function SkiperServiceStack({ services }: { services: StackService[] }) {
  return (
    <div className="aa-skip-stack">
      {services.map((service, index) => (
        <article
          className="aa-skip-card"
          key={service.no}
          style={{ "--stack-index": index } as React.CSSProperties}
        >
          <div className="aa-skip-card-copy">
            <div className="aa-skip-card-meta">
              <span>{service.no}</span>
              <span>{service.meta}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <Link data-magnetic href={service.href}>
              Explore service <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="aa-skip-card-media">
            <Image
              src={service.image}
              alt=""
              fill
              quality={72}
              sizes="(max-width: 800px) 92vw, 52vw"
            />
            <div className="aa-skip-card-no">{service.no}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
