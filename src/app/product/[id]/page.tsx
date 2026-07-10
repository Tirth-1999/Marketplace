import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { BundlePrompt } from "@/components/bundle-prompt";
import { ProductGallery } from "@/components/product-gallery";
import { RelatedProducts } from "@/components/related-products";
import { ShareButton } from "@/components/share-button";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CONTACT, productWhatsAppMessage, whatsappUrl } from "@/lib/contact";
import { getExistingProductMedia } from "@/lib/product-media";
import { formatPrice, getProduct, isReserved, isSold, products } from "@/lib/products";

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
  const media = getExistingProductMedia(product);
  const sold = isSold(product);
  const reserved = isReserved(product);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 pb-28 sm:px-4 sm:py-6 md:pb-8 lg:py-8">
        <Button
          variant="ghost"
          className="mb-4 h-11 min-h-11 -ml-2 px-3 text-sm sm:mb-5 sm:text-base"
          render={<Link href="/" />}
          nativeButton={false}
        >
          <ArrowLeft className="size-5" />
          Back to items
        </Button>

        <div className="grid items-start gap-5 md:grid-cols-2 md:gap-6 lg:gap-10">
          <ProductGallery
            media={media}
            title={product.title}
            aspect={product.galleryAspect}
            sold={sold}
            reserved={reserved}
          />

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-2">
                {sold && (
                  <Badge variant="destructive" className="px-2.5 py-1 text-xs sm:text-sm">
                    {product.giveaway ? "Claimed" : "Sold / Unavailable"}
                  </Badge>
                )}
                {reserved && !sold && (
                  <Badge className="bg-amber-600 px-2.5 py-1 text-xs text-white hover:bg-amber-600 sm:text-sm">
                    Reserved
                  </Badge>
                )}
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
                {product.giveaway && !sold ? (
                  <Badge variant="secondary" className="px-2.5 py-1 text-xs sm:text-sm">
                    Giveaway
                  </Badge>
                ) : !sold && !reserved && product.negotiable ? (
                  <Badge variant="outline" className="px-2.5 py-1 text-xs sm:text-sm">
                    Negotiable
                  </Badge>
                ) : !sold && !reserved ? (
                  <Badge variant="destructive" className="px-2.5 py-1 text-xs sm:text-sm">
                    Non-negotiable
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>
              <p className="text-3xl font-bold tabular-nums sm:text-4xl lg:text-5xl">
                {formatPrice(product)}
              </p>
              {sold && (
                <p className="text-sm font-medium text-muted-foreground sm:text-base">
                  {product.giveaway
                    ? "This giveaway has been claimed and is no longer available."
                    : product.combo && !product.sold
                      ? "One or more items in this combo are no longer available."
                      : "This item is sold and no longer available."}
                </p>
              )}
              {reserved && !sold && (
                <p className="text-sm font-medium text-amber-700 sm:text-base">
                  This item is reserved for another buyer.
                </p>
              )}
            </div>

            <Separator />

            <BundlePrompt productId={product.id} />

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

            <div className="space-y-2 rounded-xl border bg-muted/40 p-4 sm:p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
                <MapPin className="size-5 shrink-0" />
                Pickup & condition
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground sm:text-base">
                <li>
                  <span className="font-medium text-foreground">Pickup:</span>{" "}
                  {CONTACT.pickup.city} — {CONTACT.pickup.address}.{" "}
                  {CONTACT.pickup.note}
                </li>
                <li>
                  <span className="font-medium text-foreground">Condition:</span>{" "}
                  {CONTACT.conditionNote}
                </li>
                <li>
                  <span className="font-medium text-foreground">Response:</span>{" "}
                  {CONTACT.responseNote}
                </li>
              </ul>
            </div>

            <div className="hidden space-y-4 rounded-xl border bg-muted/40 p-4 sm:p-5 md:block">
              <h2 className="text-lg font-semibold sm:text-xl">Contact me</h2>
              <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                {CONTACT.name}
                <br />
                WhatsApp / call: {CONTACT.phoneDisplay}
                <br />
                {CONTACT.responseNote}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {!sold && !reserved && (
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
                )}
                {(sold || reserved) && (
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
                    {sold ? "Ask about similar" : "Ask if it opens up"}
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="h-11 min-h-11 flex-1 text-base"
                  render={<a href={`tel:+${CONTACT.phoneE164}`} />}
                  nativeButton={false}
                >
                  <Phone className="size-5" />
                  Call
                </Button>
                <ShareButton title={product.title} className="h-11 min-h-11 flex-1" />
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts product={product} />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
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
            {sold
              ? "Ask similar"
              : reserved
                ? "Ask if open"
                : "WhatsApp"}
          </Button>
          <ShareButton title={product.title} className="h-11 min-h-11 px-3" />
          <Button
            variant="outline"
            className="h-11 min-h-11 min-w-11 px-4 text-sm sm:text-base"
            render={<a href={`tel:+${CONTACT.phoneE164}`} />}
            nativeButton={false}
          >
            <Phone className="size-5" />
            <span className="inline">Call</span>
          </Button>
        </div>
      </div>
    </>
  );
}
