import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact and location – Asian Automobiles";
export default function Image() {
  return ogImage("Contact and location");
}
