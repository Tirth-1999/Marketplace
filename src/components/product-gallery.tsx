"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  galleryAspectClass,
  type GalleryAspect,
} from "@/lib/products";

type ProductGalleryProps = {
  images: string[];
  title: string;
  aspect: GalleryAspect;
};

export function ProductGallery({ images, title, aspect }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-muted",
          "max-h-[50vh] sm:max-h-[60vh] lg:max-h-none",
          galleryAspectClass(aspect)
        )}
      >
        <Image
          src={main}
          alt={`${title} — photo ${active + 1}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 55vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-5 sm:gap-2 md:grid-cols-6">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square min-h-11 overflow-hidden rounded-lg border-2 bg-muted transition",
                active === index
                  ? "border-foreground"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={`Show photo ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
