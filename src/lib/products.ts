export type GalleryAspect = "square" | "portrait" | "landscape" | "tall";

export type Seller = {
  name: string;
  firstName: string;
  phoneDisplay: string;
  phoneE164: string;
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  priceNote?: string;
  description: string;
  specs?: string[];
  category: string;
  negotiable: boolean;
  combo?: boolean;
  /** Product IDs included in this combo — combo is unavailable if any are sold/reserved. */
  includes?: string[];
  giveaway?: boolean;
  brandNew?: boolean;
  sold?: boolean;
  reserved?: boolean;
  galleryAspect: GalleryAspect;
  images: string[];
  /** Optional videos shown in the gallery (drop files under public/products/...). */
  videos?: string[];
  /** Who to contact for this listing. Defaults to the marketplace owner. */
  seller?: Seller;
};


export const SELLERS = {
  gautam: {
    name: "Gautam M",
    firstName: "Gautam",
    phoneDisplay: "+91 84463 34591",
    phoneE164: "918446334591",
  },
  srinaini: {
    name: "srinaini",
    firstName: "srinaini",
    phoneDisplay: "(979) 739-8910",
    phoneE164: "19797398910",
  },
} satisfies Record<string, Seller>;


const aspectClass: Record<GalleryAspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  tall: "aspect-[2/3]",
};

export function galleryAspectClass(aspect: GalleryAspect) {
  return aspectClass[aspect];
}

export const products: Product[] = [
  {
    id: "scooter",
    title: "NAVEE Electric Scooter + Charger",
    price: 100,
    description:
      "NAVEE electric scooter plus charger. Includes handlebar display, kickstand, stem combo lock, and the charger. Compact for campus and short trips. Message for battery condition and pickup details.",
    specs: [
      "Brand: NAVEE",
      "Includes charger",
      "Includes stem combo lock",
      "Kickstand included",
      "Handlebar speed/battery display",
      "Price: $100 — negotiable",
    ],
    category: "Transport",
    negotiable: true,
    sold: true,
    galleryAspect: "tall",
    images: [
      "/products/scooter/scooter-01.jpeg",
      "/products/scooter/scooter-02.jpeg",
      "/products/scooter/scooter-03.jpeg",
      "/products/scooter/scooter-04.jpeg",
      "/products/scooter/scooter-05.jpeg",
    ],
  },
  {
    id: "chair",
    title: "Ergonomic Office Chair",
    price: 25,
    priceNote: "Non-negotiable",
    description:
      "Black mesh high-back office chair with gray seat, adjustable armrests, and chrome five-star base with casters. Breathable mesh back for long study sessions.",
    specs: [
      "Chair alone: $25 (firm / non-negotiable)",
      "Combo with lumbar + seat cushions: $30 — see Chair + Cushions Combo",
    ],
    category: "Furniture",
    negotiable: false,
    sold: true,
    galleryAspect: "portrait",
    videos: ["/products/chair/chair-video.mp4"],
    images: [
      "/products/chair/chair-01.jpeg",
      "/products/chair/chair-07.jpeg",
      "/products/chair/chair-04.jpeg",
      "/products/chair/chair-05.jpeg",
      "/products/chair/chair-06.jpeg",
    ],
  },
  {
    id: "chair-combo",
    title: "Chair + Lumbar + Seat Cushion Combo",
    price: 30,
    priceNote: "Combo",
    description:
      "Ergonomic office chair plus lumbar/back-rest foam cushion and soft seat cushion. Better value than buying the chair ($25) and cushions separately.",
    specs: [
      "Includes chair + lumbar support cushion + seat cushion",
      "Combo price: $30",
      "Chair alone also listed at $25 (non-negotiable)",
    ],
    category: "Furniture",
    negotiable: true,
    combo: true,
    includes: ["chair", "back-rest-cushion"],
    galleryAspect: "portrait",
    videos: ["/products/chair/chair-video.mp4"],
    images: [
      "/products/chair/chair-02.jpeg",
      "/products/chair/chair-03.jpeg",
      "/products/chair/chair-07.jpeg",
      "/products/chair/chair-01.jpeg",
      "/products/back-rest-cushion/back-rest-cushion-01.jpeg",
      "/products/back-rest-cushion/back-rest-cushion-04.jpeg",
    ],
  },
  {
    id: "graduation-gown",
    title: "Graduation Regalia Hood",
    price: 15,
    description:
      "Texas A&M / ATM academic regalia hood only. Gown and graduation mortarboard (cap) have already been sold separately — this listing is just the hood.",
    specs: [
      "Hood only — gown and cap sold separately",
      "Texas A&M / ATM regalia",
      "Price: $15 — negotiable",
    ],
    category: "Graduation",
    negotiable: true,
    galleryAspect: "portrait",
    images: [
      "/products/graduation-set/graduation-set-04.jpeg",
      "/products/graduation-set/graduation-set-05.jpeg",
      "/products/graduation-gown/graduation-gown-01.jpeg",
      "/products/graduation-gown/graduation-gown-02.jpeg",
    ],
  },
  {
    id: "graduation-set",
    title: "Graduation + A&M Swag Combo",
    price: 80,
    priceNote: "Combo · +$10",
    description:
      "Everything in the $70 graduation set (gown, hood, mortarboard, cuffs, tassel), plus an A&M sun/swag cap (not the graduation mortarboard) and A&M swag poncho. Pay $10 extra on top of the gown set for the swag add-ons.",
    specs: [
      "Base: graduation gown set ($70 value)",
      "Add-on: A&M sun/swag cap (separate from graduation mortarboard)",
      "Add-on: A&M swag poncho",
      "Combo price: $80 ($10 more than gown set alone)",
      "Gown set alone also listed at $70",
    ],
    category: "Graduation",
    negotiable: true,
    combo: true,
    sold: true,
    galleryAspect: "portrait",
    images: [
      "/products/graduation-set/graduation-set-01.jpeg",
      "/products/graduation-set/graduation-set-02.jpeg",
      "/products/graduation-set/graduation-set-03.jpeg",
      "/products/graduation-set/graduation-set-04.jpeg",
      "/products/graduation-set/graduation-set-05.jpeg",
    ],
  },
  {
    id: "desktop",
    title: "Desktop Computer (Dell)",
    price: 30,
    priceNote: "with cables",
    description:
      "Dell desktop/monitor computer setup. $30 with cables included. Without cables: $25 (non-negotiable). Good for basic home or student use — ask for exact model/specs before pickup.",
    specs: [
      "With cables: $30",
      "Without cables: $25 (non-negotiable)",
      "Cables shown in photos",
    ],
    category: "Electronics",
    negotiable: false,
    sold: true,
    galleryAspect: "landscape",
    videos: ["/products/desktop/desktop-video.mp4"],
    images: [
      "/products/desktop/desktop-01.jpeg",
      "/products/desktop/desktop-02.jpeg",
      "/products/desktop/desktop-03.jpeg",
      "/products/desktop/desktop-04.jpeg",
      "/products/desktop/desktop-05.jpeg",
    ],
  },
  {
    id: "nike-initiator",
    title: "Nike Initiator — US 10 / UK 9",
    price: 35,
    description:
      "Nike Initiator sneakers in dark green/black with gold swoosh. Essentially brand new — worn only once. Includes original shoe box. Clean pair for everyday wear.",
    specs: [
      "Brand / Model: Nike Initiator",
      "Style code: HQ3611-010",
      "US: 10",
      "UK: 9",
      "EUR: 44",
      "CM: 28",
      "Condition: Brand new / worn once",
      "Includes original shoe box",
      "Price: $35 — negotiable",
    ],
    category: "Shoes",
    negotiable: true,
    brandNew: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/nike-initiator/nike-initiator-01.jpeg",
      "/products/nike-initiator/nike-initiator-02.jpeg",
      "/products/nike-initiator/nike-initiator-03.jpeg",
      "/products/nike-initiator/nike-initiator-04.jpeg",
      "/products/nike-initiator/nike-initiator-05.jpeg",
    ],
  },
  {
    id: "keyboard-mouse-combo",
    title: "Keyboard + Mouse Combo",
    price: 20,
    priceNote: "Combo · mat free",
    description:
      "Seenda wireless keyboard and matching mouse as a set. Keyboard mat included free with the keyboard — $20 for keyboard + mouse, mat on the house.",
    specs: [
      "Combo: $20 (keyboard + mouse)",
      "Keyboard mat included free",
      "Keyboard alone: $18 (mat also free)",
      "Mouse alone: $5 (non-negotiable)",
    ],
    category: "Electronics",
    negotiable: true,
    combo: true,
    includes: ["keyboard", "mouse"],
    galleryAspect: "landscape",
    images: [
      "/products/keyboard-mouse-combo/keyboard-mouse-combo-01.jpeg",
      "/products/keyboard/keyboard-01.jpeg",
      "/products/keyboard/keyboard-02.jpeg",
      "/products/mouse/mouse-01.jpeg",
      "/products/mouse/mouse-02.jpeg",
      "/products/keyboard/keyboard-03.jpeg",
    ],
  },
  {
    id: "keyboard",
    title: "Seenda Wireless Keyboard",
    price: 18,
    priceNote: "Mat free",
    description:
      "Full-size Seenda wireless Bluetooth keyboard with multi-device switching and silicone cover. Quiet low-profile keys. Keyboard mat included free with purchase.",
    specs: [
      "Brand: Seenda",
      "Wireless / multi-device",
      "Includes silicone cover",
      "Keyboard mat included free",
      "Also in $20 keyboard + mouse combo (mat free)",
    ],
    category: "Electronics",
    negotiable: true,
    sold: true,
    galleryAspect: "landscape",
    images: [
      "/products/keyboard/keyboard-01.jpeg",
      "/products/keyboard/keyboard-02.jpeg",
      "/products/keyboard/keyboard-03.jpeg",
      "/products/keyboard/keyboard-04.jpeg",
    ],
  },
  {
    id: "mouse",
    title: "Seenda Wireless Mouse",
    price: 5,
    priceNote: "Non-negotiable",
    description:
      "Seenda SKM64-2 wireless Bluetooth mouse with multi-device pairing and DPI switch. Slim optical design. Sold separately at $5 (firm). Pair with the keyboard for the $20 combo — mat free with keyboard.",
    specs: [
      "Model: Seenda SKM64-2",
      "Price: $5 (non-negotiable)",
      "Also in $20 keyboard + mouse combo",
    ],
    category: "Electronics",
    negotiable: false,
    galleryAspect: "square",
    images: [
      "/products/mouse/mouse-01.jpeg",
      "/products/mouse/mouse-02.jpeg",
    ],
  },
  {
    id: "keyboard-mat",
    title: "Keyboard Mat",
    price: 1,
    priceNote: "Non-negotiable",
    description:
      "Desk keyboard mat for a cleaner typing surface. Free with any keyboard purchase — $1 only if bought on its own.",
    specs: [
      "Free with keyboard purchase",
      "Alone: $1 (non-negotiable / firm)",
    ],
    category: "Electronics",
    negotiable: false,
    sold: true,
    galleryAspect: "landscape",
    images: ["/products/keyboard-mat/keyboard-mat-01.jpeg"],
  },
  {
    id: "sony-speaker",
    title: "Sony Portable Speaker",
    price: 15,
    description:
      "Black portable Sony Bluetooth speaker with cylindrical body and fabric carry strap. Compact for desk, dorm, or travel.",
    specs: ["Brand: Sony", "Portable with carry strap", "Price: $15 — negotiable"],
    category: "Electronics",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/sony-speaker/sony-speaker-01.jpeg",
      "/products/sony-speaker/sony-speaker-02.jpeg",
    ],
  },
  {
    id: "sony-earphones",
    title: "Sony Wireless Earphones",
    price: 5,
    priceNote: "Non-negotiable",
    description:
      "White Sony wireless neckband earphones with in-line volume and multi-function controls. Lightweight for calls and everyday listening.",
    specs: ["Brand: Sony", "Neckband wireless", "Price: $5 (non-negotiable)"],
    category: "Electronics",
    negotiable: false,
    sold: true,
    galleryAspect: "landscape",
    images: [
      "/products/sony-earphones/sony-earphones-01.jpeg",
      "/products/sony-earphones/sony-earphones-02.jpeg",
    ],
  },
  {
    id: "desk-lamp",
    title: "Desk Lamp with Plug Socket",
    price: 10,
    description:
      "Gooseneck study desk lamp with flexible neck for directed light. Built-in outlet on the base (120V, Max 5A) so you can plug in a phone charger or small device.",
    specs: [
      "Built-in plug socket on base",
      "120V · Max 5A",
      "Flexible gooseneck",
      "Price: $10 — negotiable",
    ],
    category: "Home",
    negotiable: true,
    galleryAspect: "portrait",
    images: [
      "/products/desk-lamp/desk-lamp-01.jpeg",
      "/products/desk-lamp/desk-lamp-02.jpeg",
      "/products/desk-lamp/desk-lamp-03.jpeg",
      "/products/desk-lamp/desk-lamp-04.jpeg",
    ],
  },
  {
    id: "badminton-shoes",
    title: "NIVIA Power Strike Duo Cushion II — UK 9 / US 10",
    price: 20,
    description:
      "NIVIA Power Strike Duo Cushion II black court / badminton shoes with neon accents and gum herringbone non-marking sole. Built for indoor court sports with cushioned midsole support.",
    specs: [
      "Brand: NIVIA",
      "Model: Power Strike Duo Cushion II",
      "UK: 9 · US: 10",
      "Court / badminton shoes",
      "Price: $20 — negotiable",
    ],
    category: "Shoes",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/badminton-shoes/badminton-shoes-01.jpeg",
      "/products/badminton-shoes/badminton-shoes-02.jpeg",
      "/products/badminton-shoes/badminton-shoes-03.jpeg",
      "/products/badminton-shoes/badminton-shoes-04.jpeg",
    ],
  },
  {
    id: "gym-bottle",
    title: "Large Gym Bottle",
    price: 10,
    priceNote: "Almost firm",
    description:
      "Large black gym water bottle with flip spout, neoprene sleeve, and blue paracord + carabiner. Easy to carry to the gym or campus.",
    specs: [
      "Large capacity gym bottle",
      "Neoprene sleeve + carabiner",
      "Price: $10 — negotiable but almost firm",
    ],
    category: "Fitness",
    negotiable: true,
    galleryAspect: "square",
    images: [
      "/products/gym-bottle/gym-bottle-01.jpeg",
      "/products/gym-bottle/gym-bottle-02.jpeg",
      "/products/gym-bottle/gym-bottle-03.jpeg",
    ],
  },
  {
    id: "back-rest-cushion",
    title: "Back Rest Foam Cushion",
    price: 5,
    description:
      "Contoured lumbar / back-rest foam cushion with breathable mesh face and non-slip dotted backing. Helps support lower back at a desk. Also available in the $30 chair + cushions combo.",
    specs: [
      "Individual: $5 — negotiable",
      "Also in Chair + Cushions Combo ($30)",
    ],
    category: "Furniture",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/back-rest-cushion/back-rest-cushion-01.jpeg",
      "/products/back-rest-cushion/back-rest-cushion-02.jpeg",
      "/products/back-rest-cushion/back-rest-cushion-03.jpeg",
      "/products/back-rest-cushion/back-rest-cushion-04.jpeg",
    ],
  },
  {
    id: "office-folder",
    title: "Office Depot Folder",
    price: 5,
    priceNote: "Non-negotiable",
    description:
      "White Office Depot 3-ring binder with clear sheet protectors included. Ready for class notes, handouts, or organizing papers.",
    specs: ["Brand: Office Depot", "3-ring binder + sheet protectors", "Price: $5 (firm)"],
    category: "Stationery",
    negotiable: false,
    galleryAspect: "portrait",
    images: [
      "/products/office-folder/office-folder-01.jpeg",
      "/products/office-folder/office-folder-02.jpeg",
      "/products/office-folder/office-folder-03.jpeg",
      "/products/office-folder/office-folder-04.jpeg",
      "/products/office-folder/office-folder-05.jpeg",
    ],
  },
  {
    id: "iron-board-cover",
    title: "Iron Board Cover Pad",
    price: 5,
    description:
      "Mainstays ironing board cover and pad — new in packaging. Fits a standard ironing board.",
    specs: ["Brand: Mainstays", "New in packaging", "Price: $5 — negotiable"],
    category: "Home",
    negotiable: true,
    brandNew: true,
    galleryAspect: "square",
    images: ["/products/iron-board-cover/iron-board-cover-01.jpeg"],
  },
  {
    id: "bidet",
    title: "Metal Bidet + Bathroom Mat",
    price: 0,
    priceNote: "Giveaway",
    description:
      "Unused metal bidet sprayer kit with hose, T-valve, and bracket — bathroom mat included. Free giveaway — message to arrange pickup.",
    specs: ["Unused / new kit", "Bathroom mat included", "Giveaway — free"],
    category: "Home",
    negotiable: false,
    giveaway: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/bidet/bidet-01.jpeg",
      "/products/bidet/bidet-02.jpeg",
    ],
  },
  {
    id: "yoga-mat",
    title: "Yoga Mat",
    price: 5,
    priceNote: "Non-negotiable",
    description:
      "Foldable blue yoga mat. Compact when folded for dorm or travel; unfolds for yoga, stretching, or floor workouts.",
    specs: ["Foldable blue mat", "Price: $5 (non-negotiable)"],
    category: "Fitness",
    negotiable: false,
    sold: true,
    galleryAspect: "landscape",
    images: [
      "/products/yoga-mat/yoga-mat-01.jpeg",
      "/products/yoga-mat/yoga-mat-02.jpeg",
    ],
  },
  {
    id: "resistance-bands",
    title: "Resistance Bands Set",
    price: 5,
    priceNote: "Non-negotiable",
    description:
      "Set of five loop resistance bands from extra light to extra heavy (yellow through black). Good for strength training, mobility, and home workouts.",
    specs: [
      "5 bands: Extra Light → Extra Heavy",
      "Price: $5 (non-negotiable)",
    ],
    category: "Fitness",
    negotiable: false,
    sold: true,
    galleryAspect: "landscape",
    images: ["/products/resistance-bands/resistance-bands-01.jpeg"],
  },
  {
    id: "hand-gripper",
    title: "Hand Gripper",
    price: 2,
    description:
      "Adjustable hand gripper with 5–60 kg resistance and textured non-slip grips. Can be added as a combo with other fitness items — just ask.",
    specs: [
      "Adjustable 5–60 kg",
      "Price: $2",
      "Can be added as a combo with other items",
    ],
    category: "Fitness",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/hand-gripper/hand-gripper-01.jpeg",
      "/products/hand-gripper/hand-gripper-02.jpeg",
      "/products/hand-gripper/hand-gripper-03.jpeg",
    ],
  },
  {
    id: "shoe-cups",
    title: "Branded Shoe Cups (Anti-Crease)",
    price: 5,
    priceNote: "per pair · brand new",
    description:
      "Clear plastic anti-crease shoe trees / shoe cups. Brand new, unopened. Helps keep the toe box from creasing in sneakers. $5 per pair.",
    specs: [
      "Brand new — not opened",
      "$5 per pair",
      "Anti-crease shoe trees",
      "Negotiable",
    ],
    category: "Shoes",
    negotiable: true,
    brandNew: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/shoe-cups/shoe-cups-01.jpeg",
      "/products/shoe-cups/shoe-cups-02.jpeg",
      "/products/shoe-cups/shoe-cups-03.jpeg",
      "/products/shoe-cups/shoe-cups-04.jpeg",
    ],
  },
  {
    id: "clothes-hangers",
    title: "Clothes Hangers (Over-Door)",
    price: 5,
    description:
      "Black over-door multi-hook clothes hanger. Clips onto a standard door — no drilling. Extra hooks for coats, towels, or bags. Can be added as a combo with other home items.",
    specs: [
      "No drilling — clips on door",
      "Price: $5 — negotiable",
      "Can be added as a combo",
    ],
    category: "Home",
    negotiable: true,
    galleryAspect: "portrait",
    images: [
      "/products/clothes-hangers/clothes-hangers-01.jpeg",
      "/products/clothes-hangers/clothes-hangers-02.jpeg",
      "/products/clothes-hangers/clothes-hangers-03.jpeg",
    ],
  },
  {
    id: "face-ice-mold",
    title: "Silicone Face Ice Mold",
    price: 3,
    description:
      "Turquoise silicone face ice mold. Fill with water, freeze, then use for facial icing or cold massage. Flexible and reusable.",
    specs: ["Silicone face ice mold", "Price: $3 — negotiable"],
    category: "Personal Care",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/face-ice-mold/face-ice-mold-01.jpeg",
      "/products/face-ice-mold/face-ice-mold-02.jpeg",
    ],
  },
  {
    id: "pencil-holder",
    title: "Pencil Holder with Pens & Stationery",
    price: 5,
    description:
      "White fluted pencil holder packed with pens, pencils, A&M fan, and Howdy Week sign. Ready desk set for a student.",
    specs: ["Holder + pens/pencils included", "A&M fan / stationery extras", "Price: $5 — negotiable"],
    category: "Stationery",
    negotiable: true,
    galleryAspect: "square",
    images: [
      "/products/pencil-holder/pencil-holder-01.jpeg",
      "/products/pencil-holder/pencil-holder-02.jpeg",
      "/products/pencil-holder/pencil-holder-03.jpeg",
    ],
  },
  {
    id: "wireless-charger",
    title: "Magnetic Wireless Phone Charger",
    price: 5,
    description:
      "Black MagSafe-style magnetic wireless phone charger stand (up to 15W) with accessory slot. Bamboo pad also shown in photos. Can be added as a combo with other electronics — ask on WhatsApp.",
    specs: [
      "Magnetic / MagSafe-style stand",
      "Up to 15W",
      "Price: $5",
      "Can be added as a combo",
    ],
    category: "Electronics",
    negotiable: true,
    galleryAspect: "square",
    images: [
      "/products/wireless-charger/wireless-charger-01.jpeg",
      "/products/wireless-charger/wireless-charger-02.jpeg",
      "/products/wireless-charger/wireless-charger-03.jpeg",
    ],
  },
  {
    id: "notebooks",
    title: "Notebooks",
    price: 2,
    priceNote: "each",
    description:
      "Mead / Five Star spiral notebooks (blue and green covers). College-style pages for class or notes. $2 per notebook.",
    specs: ["$2 per notebook", "Negotiable", "Blue and green covers available"],
    category: "Stationery",
    negotiable: true,
    sold: true,
    galleryAspect: "square",
    images: [
      "/products/notebooks/notebooks-01.jpeg",
      "/products/notebooks/notebooks-02.jpeg",
      "/products/notebooks/notebooks-03.jpeg",
    ],
  },
  {
    id: "razer-blackwidow-v2",
    title: "Razer BlackWidow V2 with Wrist Rest",
    price: 50,
    description:
      "Razer BlackWidow V2 mechanical gaming keyboard with included wrist rest. Full-size layout with dedicated media controls and volume dial. Listed by Gautam M.",
    specs: [
      "Brand / Model: Razer BlackWidow V2",
      "Includes wrist rest",
      "Gaming keyboard",
      "Price: $50 — negotiable",
    ],
    category: "Electronics",
    negotiable: true,
    seller: SELLERS.gautam,
    galleryAspect: "landscape",
    images: ["/products/razer-blackwidow-v2/razer-blackwidow-v2-01.png"],
  },
  {
    id: "tamu-graduation-regalia",
    title: "Texas A&M Graduation Regalia",
    price: 90,
    description:
      "Texas A&M / ATM graduation regalia set. Full formal graduation outfit for pickup in College Station — message the seller for details on what's included and condition.",
    specs: [
      "Texas A&M / ATM regalia",
      "Price: $90 — negotiable",
      "Listed by srinaini",
    ],
    category: "Graduation",
    negotiable: true,
    seller: SELLERS.srinaini,
    galleryAspect: "portrait",
    images: [
      "/products/graduation-gown/graduation-gown-01.jpeg",
      "/products/graduation-gown/graduation-gown-02.jpeg",
    ],
  },
  {
    id: "halloween-costume-sword",
    title: "Halloween Costume Jacket + Sword",
    price: 20,
    priceNote: "Non-negotiable",
    description:
      "Circus-style Halloween costume jacket (adult L/XL, fits up to size 46) plus sword. Jacket is new in packaging. Listed by Gautam M.",
    specs: [
      "Costume jacket + sword",
      "Jacket: adult L/XL (fits up to size 46)",
      "Price: $20 (non-negotiable)",
    ],
    category: "Costume",
    negotiable: false,
    seller: SELLERS.gautam,
    galleryAspect: "portrait",
    images: ["/products/halloween-costume-sword/halloween-costume-sword-01.png"],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function isSold(product: Product): boolean {
  if (product.sold) return true;
  if (product.includes?.length) {
    return product.includes.some((id) => {
      const item = getProduct(id);
      return item ? isSold(item) : false;
    });
  }
  return false;
}

export function isReserved(product: Product): boolean {
  if (isSold(product)) return false;
  if (product.reserved) return true;
  if (product.includes?.length) {
    return product.includes.some((id) => {
      const item = getProduct(id);
      if (!item) return false;
      return isSold(item) || isReserved(item);
    });
  }
  return false;
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        !isSold(p) &&
        !isReserved(p)
    )
    .slice(0, limit);
}

/** Explicit combo upsells shown on product pages. */
export const BUNDLE_PROMPTS: Record<
  string,
  { targetId: string; headline: string; body: string }
> = {
  chair: {
    targetId: "chair-combo",
    headline: "Save with the chair combo",
    body: "Chair + lumbar + seat cushion for $30 (vs chair alone at $25).",
  },
  "chair-combo": {
    targetId: "chair",
    headline: "Just need the chair?",
    body: "Chair alone is listed at $25 (firm).",
  },
  keyboard: {
    targetId: "keyboard-mouse-combo",
    headline: "Add the mouse — mat still free",
    body: "Keyboard + mouse for $20. Mat included free with the keyboard.",
  },
  mouse: {
    targetId: "keyboard-mouse-combo",
    headline: "Get the full desk set",
    body: "Keyboard + mouse for $20 — mat free with the keyboard.",
  },
  "keyboard-mat": {
    targetId: "keyboard",
    headline: "Free with the keyboard",
    body: "Buy the keyboard ($18) and the mat is included at no extra cost.",
  },
  "keyboard-mouse-combo": {
    targetId: "keyboard",
    headline: "Prefer pieces separately?",
    body: "Keyboard $18 (mat free) · Mouse $5 (firm) · Mat $1 alone.",
  },
};

export function getBundlePrompt(productId: string) {
  const prompt = BUNDLE_PROMPTS[productId];
  if (!prompt) return null;
  const target = getProduct(prompt.targetId);
  if (!target || isSold(target) || isReserved(target)) return null;
  return { ...prompt, target };
}

export function formatPrice(product: Product) {
  if (isSold(product) && product.giveaway) return "Claimed";
  if (isSold(product)) return "Sold";
  if (isReserved(product)) {
    const base = `$${product.price}`;
    return product.priceNote ? `${base} ${product.priceNote}` : base;
  }
  if (product.giveaway || product.price === 0) return "Giveaway";
  const base = `$${product.price}`;
  if (product.priceNote) return `${base} ${product.priceNote}`;
  return base;
}

export const categories = [
  "All",
  "Combo",
  ...Array.from(new Set(products.map((p) => p.category))).sort(),
];
