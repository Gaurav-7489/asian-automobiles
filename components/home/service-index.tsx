"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type IndexService = {
  id: string;
  title: string;
  meta: string;
  description: string;
  href: string;
  image: string;
};

/**
 * Homepage service index. On wide screens the photo panel follows the row under the pointer
 * or keyboard focus; on phones and tablets every row carries its own thumbnail. Each service
 * has exactly one image in the DOM, positioned differently per breakpoint, and every row is
 * a plain link, so the list works with no hover and before hydration.
 */
export function ServiceIndex({ services }: { services: IndexService[] }) {
  const [active, setActive] = useState(0);
  return (
    <ol className="aa-svc-index">
      {services.map((service, index) => (
        <li key={service.id} className={index === active ? "is-active" : undefined}>
          <Link
            href={service.href}
            className="aa-svc-row"
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="aa-svc-row__no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="aa-svc-row__text">
              <h3>{service.title}</h3>
              <span className="aa-label">{service.meta}</span>
              <span className="aa-svc-row__desc">{service.description}</span>
            </span>
            <span className="aa-svc-row__photo">
              <Image src={service.image} alt="" fill quality={72} sizes="(max-width: 1099px) 160px, 42vw" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
