import { isReserved, isSold, type Product } from "@/lib/products";

export const CONTACT = {
  name: "Tirth C Shah",
  firstName: "Tirth",
  phoneDisplay: "(979) 635-2045",
  phoneE164: "19796352045",
  hours: "9:00 a.m. – 5:00 p.m.",
  responseNote: "Usually replies within a few hours during 9:00 a.m. – 5:00 p.m.",
  pickup: {
    city: "College Station, TX",
    address: "601 Luther Street West",
    note: "Pickup only at my place — I cannot deliver. Buyer comes to pick up.",
  },
  conditionNote:
    "Almost like new — first-hand used (not brand new unless marked Brand new).",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppMessage(product: Product) {
  if (isSold(product)) {
    return `Hey ${CONTACT.firstName}, I saw "${product.title}" marked sold — do you have anything similar available?`;
  }

  if (isReserved(product)) {
    return `Hey ${CONTACT.firstName}, I saw "${product.title}" is reserved — if it opens up, please let me know.`;
  }

  if (product.giveaway || product.price === 0) {
    return `Hey ${CONTACT.firstName}, I'm interested in the giveaway item "${product.title}". Is it still available?`;
  }

  const firmNote = product.negotiable ? "" : " (firm price)";
  return `Hey ${CONTACT.firstName}, I'm interested in buying this ${product.title} for $${product.price}${firmNote}. Is it still available?`;
}
