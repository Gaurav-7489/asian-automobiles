import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Spare parts enquiry – Asian Automobiles";
export default function Image() {
  return ogImage("Spare parts enquiry");
}
