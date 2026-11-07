import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Asian Automobiles – Asian Automobiles";
export default function Image() {
  return ogImage("About Asian Automobiles");
}
