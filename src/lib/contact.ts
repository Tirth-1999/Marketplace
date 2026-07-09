export const CONTACT = {
  name: "Tirth C Shah",
  firstName: "Tirth",
  phoneDisplay: "(979) 635-2045",
  phoneE164: "19796352045",
  hours: "9:00 a.m. – 5:00 p.m.",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppMessage(product: {
  title: string;
  price: number;
  giveaway?: boolean;
  negotiable: boolean;
}) {
  if (product.giveaway || product.price === 0) {
    return `Hey ${CONTACT.firstName}, I'm interested in the giveaway item "${product.title}". Is it still available?`;
  }

  const firmNote = product.negotiable ? "" : " (firm price)";
  return `Hey ${CONTACT.firstName}, I'm interested in buying this ${product.title} for $${product.price}${firmNote}. Is it still available?`;
}
