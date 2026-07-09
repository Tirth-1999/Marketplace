import { ProductCard } from "@/components/product-card";
import { getRelatedProducts, type Product } from "@/lib/products";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 space-y-4 border-t pt-8 sm:mt-12 sm:space-y-5 sm:pt-10">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
          Related products
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
          More items in {product.category}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
