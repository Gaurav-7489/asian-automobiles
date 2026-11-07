import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asian Automobiles",
    short_name: "Asian Auto",
    description: "Independent multi-brand car service centre in Irinjalakuda.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#111820",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
