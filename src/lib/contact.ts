import { isReserved, isSold, type Product, type Seller } from "@/lib/products";

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

export const DEFAULT_SELLER: Seller = {
  name: CONTACT.name,
  firstName: CONTACT.firstName,
  phoneDisplay: CONTACT.phoneDisplay,
  phoneE164: CONTACT.phoneE164,
};

export function getProductSeller(product: Product): Seller {
  return product.seller ?? DEFAULT_SELLER;
}

export function whatsappUrl(message: string, phoneE164: string = CONTACT.phoneE164) {
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppMessage(product: Product) {
  const seller = getProductSeller(product);

  if (isSold(product)) {
    return `Hey ${seller.firstName}, I saw "${product.title}" marked sold — do you have anything similar available?`;
  }

  if (isReserved(product)) {
    return `Hey ${seller.firstName}, I saw "${product.title}" is reserved — if it opens up, please let me know.`;
  }

  if (product.giveaway || product.price === 0) {
    return `Hey ${seller.firstName}, I'm interested in the giveaway item "${product.title}". Is it still available?`;
  }

  const firmNote = product.negotiable ? "" : " (firm price)";
  return `Hey ${seller.firstName}, I'm interested in buying this ${product.title} for $${product.price}${firmNote}. Is it still available?`;
}

export function productWhatsAppUrl(product: Product) {
  const seller = getProductSeller(product);
  return whatsappUrl(productWhatsAppMessage(product), seller.phoneE164);
}
