import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden py-0 transition-shadow group-hover:shadow-md">
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.02] sm:p-1"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <CardContent className="space-y-1.5 p-2 sm:space-y-2 sm:p-3 lg:p-4">
          <div className="flex flex-wrap gap-1">
            {product.giveaway && (
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
