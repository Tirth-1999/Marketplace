"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  galleryAspectClass,
  type GalleryAspect,
  type MediaItem,
} from "@/lib/products";

type ProductGalleryProps = {
  media: MediaItem[];
  title: string;
  aspect: GalleryAspect;
};

export function ProductGallery({ media, title, aspect }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];

  if (!current) return null;

  return (
    <div
      className="w-full space-y-3 sm:space-y-4 select-none"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-muted",
          "max-h-[42vh]",
          "md:max-h-[min(28rem,55vh)] lg:max-h-[min(32rem,60vh)]",
          galleryAspectClass(aspect)
        )}
      >
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            controlsList="nodownload"
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-contain"
            onContextMenu={(event) => event.preventDefault()}
          />
        ) : (
          <Image
            src={current.src}
            alt={`${title} — photo ${active + 1}`}
            fill
            draggable={false}
            className="pointer-events-none object-contain p-2 select-none"
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      {media.length > 1 && (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item, index) => (
            <button
              key={`${item.type}-${item.src}`}
              type="button"
              onClick={() => setActive(index)}
              onContextMenu={(event) => event.preventDefault()}
              className={cn(
                "relative aspect-square min-h-11 overflow-hidden rounded-lg border-2 bg-muted transition",
                active === index
                  ? "border-foreground"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={
                item.type === "video"
                  ? "Show video"
                  : `Show photo ${index + 1}`
              }
            >
              {item.type === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <Play className="size-5 fill-white text-white" />
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  draggable={false}
                  className="pointer-events-none object-cover select-none"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
