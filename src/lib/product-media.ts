import fs from "fs";
import path from "path";
import type { MediaItem, Product } from "@/lib/products";

/** Include videos only if the file exists under public/. */
export function getExistingProductMedia(product: Product): MediaItem[] {
  const videos = (product.videos ?? [])
    .filter((src) =>
      fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")))
    )
    .map((src) => ({ type: "video" as const, src }));

  const images = product.images.map((src) => ({
    type: "image" as const,
    src,
  }));

  return [...videos, ...images];
}
