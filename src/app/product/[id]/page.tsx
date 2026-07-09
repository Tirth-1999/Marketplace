import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { RelatedProducts } from "@/components/related-products";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CONTACT, productWhatsAppMessage, whatsappUrl } from "@/lib/contact";
import { formatPrice, getProduct, products } from "@/lib/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Item not found" };
  return {
    title: `${product.title} · ${formatPrice(product)}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const message = productWhatsAppMessage(product);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 pb-28 sm:px-4 sm:py-6 sm:pb-28 lg:py-8 lg:pb-8">
        <Button
          variant="ghost"
          className="mb-4 h-11 min-h-11 -ml-2 px-3 text-sm sm:mb-5 sm:text-base"
          render={<Link href="/" />}
          nativeButton={false}
        >
          <ArrowLeft className="size-5" />
          Back to items
        </Button>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
          <ProductGallery
            images={product.images}
            title={product.title}
            aspect={product.galleryAspect}
          />

          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-2.5 py-1 text-xs sm:text-sm">
                  {product.category}
                </Badge>
                {product.combo && (
                  <Badge variant="secondary" className="px-2.5 py-1 text-xs sm:text-sm">
                    Combo offer
                  </Badge>
                )}
                {product.brandNew && (
                  <Badge variant="secondary" className="px-2.5 py-1 text-xs sm:text-sm">
                    Brand new
                  </Badge>
                )}
                {product.giveaway ? (
                  <Badge variant="secondary" className="px-2.5 py-1 text-xs sm:text-sm">
                    Giveaway
                  </Badge>
                ) : product.negotiable ? (
                  <Badge variant="outline" className="px-2.5 py-1 text-xs sm:text-sm">
                    Negotiable
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="px-2.5 py-1 text-xs sm:text-sm">
                    Non-negotiable
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>
              <p className="text-3xl font-bold tabular-nums sm:text-4xl lg:text-5xl">
                {formatPrice(product)}
              </p>
            </div>

            <Separator />

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-lg font-semibold sm:text-xl">Description</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                {product.description}
              </p>
            </div>

            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-lg font-semibold sm:text-xl">Details</h2>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground sm:space-y-2 sm:text-base lg:text-lg">
                  {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="hidden space-y-4 rounded-xl border bg-muted/40 p-4 sm:p-5 lg:block">
              <h2 className="text-xl font-semibold">Contact me</h2>
              <p className="text-base text-muted-foreground lg:text-lg">
                {CONTACT.name}
                <br />
                WhatsApp / call: {CONTACT.phoneDisplay}
                <br />
                Available {CONTACT.hours}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-11 min-h-11 flex-1 bg-[#25D366] text-base text-white hover:bg-[#1ebe57] hover:text-white"
                  render={
                    <a
                      href={whatsappUrl(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                >
                  <WhatsAppIcon className="size-5" />
                  WhatsApp about this item
                </Button>
                <Button
                  variant="outline"
                  className="h-11 min-h-11 flex-1 text-base"
                  render={<a href={`tel:+${CONTACT.phoneE164}`} />}
                  nativeButton={false}
                >
                  <Phone className="size-5" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts product={product} />
      </main>

      {/* Sticky mobile / tablet contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-2">
          <Button
            className="h-11 min-h-11 flex-1 bg-[#25D366] text-sm text-white hover:bg-[#1ebe57] hover:text-white sm:text-base"
            render={
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            className="h-11 min-h-11 min-w-11 px-4 text-sm sm:text-base"
            render={<a href={`tel:+${CONTACT.phoneE164}`} />}
            nativeButton={false}
          >
            <Phone className="size-5" />
            <span className="hidden xs:inline sm:inline">Call</span>
          </Button>
        </div>
      </div>
    </>
  );
}
