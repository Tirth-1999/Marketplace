import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBundlePrompt } from "@/lib/products";

export function BundlePrompt({ productId }: { productId: string }) {
  const prompt = getBundlePrompt(productId);
  if (!prompt) return null;

  return (
    <div className="space-y-3 rounded-xl border border-dashed bg-muted/30 p-4 sm:p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Bundle deal
        </p>
        <h2 className="text-lg font-semibold sm:text-xl">{prompt.headline}</h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          {prompt.body}
        </p>
      </div>
      <Button
        variant="secondary"
        className="h-11 min-h-11"
        render={<Link href={`/product/${prompt.target.id}`} />}
        nativeButton={false}
      >
        View {prompt.target.title}
      </Button>
    </div>
  );
}
