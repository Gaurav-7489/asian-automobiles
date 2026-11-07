import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Our car services – Asian Automobiles";
export default function Image() {
  return ogImage("Our car services");
}
