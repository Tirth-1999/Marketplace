import { ProductGrid } from "@/components/product-grid";
import { SiteHeader } from "@/components/site-header";
import { CONTACT } from "@/lib/contact";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-4 sm:py-8 lg:py-10">
        <div className="mb-5 space-y-2 sm:mb-8 sm:space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Items for sale
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base lg:text-lg">
            Browse photos, check the price, then message me on WhatsApp.{" "}
            Pickup only in {CONTACT.pickup.city} ({CONTACT.pickup.address}) —
            come pick up at my place. {products.length} items listed.
          </p>
          <p className="text-sm text-muted-foreground sm:text-base">
            {CONTACT.responseNote}
          </p>
        </div>
        <ProductGrid />
      </main>
    </>
  );
}
