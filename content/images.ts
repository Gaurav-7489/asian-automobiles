/**
 * Image registry. `genuine: true` only for real Asian Automobiles photos (filenames prefixed real-).
 * Everything below is licensed generic stock (Unsplash License), used temporarily in
 * stock-permitted slots only and never captioned as the workshop. See public/images/LICENSES.md.
 */
export interface ImageRef {
  src: string;
  alt: string;
  genuine: boolean;
}

const unsplash = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  homeHero: { src: unsplash("photo-1486006920555-c77dcf18193c", 2400), alt: "Mechanic working under the bonnet of a car", genuine: false },
  carService: { src: unsplash("photo-1486006920555-c77dcf18193c"), alt: "Engine bay of a car being serviced", genuine: false },
  mechanical: { src: unsplash("photo-1625047509248-ec889cbff17f"), alt: "Mechanic working on a car in a workshop", genuine: false },
  ac: { src: unsplash("photo-1487754180451-c456f719a1fc"), alt: "Car interior and dashboard", genuine: false },
  alignment: { src: unsplash("photo-1503736334956-4c8f8e92946d"), alt: "Close-up of a car wheel and tyre", genuine: false },
  tyres: { src: unsplash("photo-1492144534655-ae79c964c9d7"), alt: "Close-up of a car tyre on the road", genuine: false },
  denting: { src: unsplash("photo-1486262715619-67b85e0b08d3"), alt: "Close-up of a car panel", genuine: false },
  detailing: { src: unsplash("photo-1503376780353-7e6692767b70"), alt: "Close-up of a clean, polished car", genuine: false },
  parts: { src: unsplash("photo-1511919884226-fd3cad34687c"), alt: "Car parts and tools on a workshop bench", genuine: false },
} satisfies Record<string, ImageRef>;

/** Workshop gallery – genuine photos only. Sections render only above a minimum count. */
export const gallery: (ImageRef & { caption: string })[] = [];

export const genuinePhotos = (min: number) => {
  const real = gallery.filter((g) => g.genuine);
  return real.length >= min ? real : [];
};
