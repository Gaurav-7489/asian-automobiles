import Image from "next/image";
import { genuinePhotos } from "@/content/images";

/** Genuine photos only; renders nothing below the minimum count (spec 20.3.11). */
export function ImageGallery({ title, intro, min = 4 }: { title: string; intro?: string; min?: number }) {
  const photos = genuinePhotos(min);
  if (!photos.length) return null;
  return (
    <section className="section bg-warm-50" aria-labelledby="gallery-heading">
      <div className="container-x">
        <h2 id="gallery-heading" className="h2">{title}</h2>
        {intro && <p className="lead muted mt-4 max-w-[720px]">{intro}</p>}
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
          {photos.slice(0, 6).map((p, i) => (
            <li key={p.src} className={`w-4/5 shrink-0 snap-start md:w-auto ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <figure>
                <div className={`relative overflow-hidden rounded-md ${i === 0 ? "aspect-[2/1] md:aspect-square" : "aspect-square"}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 25vw, 80vw" className="object-cover" />
                </div>
                <figcaption className="muted mt-2 text-sm">{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
