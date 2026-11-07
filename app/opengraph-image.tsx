import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Reliable care for every journey. – Asian Automobiles";
export default function Image() {
  return ogImage("Reliable care for every journey.");
}
