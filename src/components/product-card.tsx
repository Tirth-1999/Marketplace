"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice, isReserved, isSold, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const sold = isSold(product);
  const reserved = isReserved(product);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block h-full"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <Card className="h-full overflow-hidden py-0 transition-shadow group-hover:shadow-md">
        <div
          className={cn(
            "relative aspect-square bg-muted select-none",
            sold && "sold-unavailable"
          )}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            draggable={false}
            className={cn(
              "pointer-events-none object-contain p-0.5 transition-transform duration-300 select-none sm:p-1",
              sold
                ? "grayscale contrast-75 brightness-90"
                : "group-hover:scale-[1.02]"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <div className="sold-stamp rotate-[-8deg] rounded-md border-2 border-white/80 px-3 py-1.5 text-center text-sm font-bold tracking-wide text-white uppercase shadow-sm sm:text-base">
                Unavailable
              </div>
            </div>
          )}
          {reserved && !sold && (
            <div className="absolute inset-x-0 bottom-0 bg-amber-600/90 px-2 py-1 text-center text-xs font-semibold text-white">
              RESERVED
            </div>
          )}
        </div>
        <CardContent className="space-y-1.5 p-2 sm:space-y-2 sm:p-3 lg:p-4">
          <div className="flex flex-wrap gap-1">
            {sold && (
              <Badge variant="destructive" className="text-[10px] sm:text-xs">
                {product.giveaway ? "Claimed" : "Sold"}
              </Badge>
            )}
            {reserved && !sold && (
              <Badge className="bg-amber-600 text-[10px] text-white hover:bg-amber-600 sm:text-xs">
                Reserved
              </Badge>
            )}
            {product.giveaway && !sold && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                Giveaway
              </Badge>
            )}
            {product.combo && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                Combo
              </Badge>
            )}
            {product.brandNew && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                Brand new
              </Badge>
            )}
            {!product.giveaway &&
              !sold &&
              !reserved &&
              (product.negotiable ? (
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  Negotiable
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-[10px] sm:text-xs">
                  Firm
                </Badge>
              ))}
          </div>
          <h2 className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base lg:text-lg">
            {product.title}
          </h2>
          <p className="text-base font-bold tabular-nums sm:text-lg lg:text-xl">
            {formatPrice(product)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
