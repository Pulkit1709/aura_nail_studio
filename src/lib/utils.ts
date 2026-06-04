import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const phone = "+91 98725 44509";
export const whatsappBase = "https://wa.me/919872544509";
export const instagramUrl = "https://instagram.com/_theaura._";
export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Sector%2017%2C%20Gurunanak%20Colony%2C%20Sangrur%2C%20Punjab";

export function whatsappLink(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}
