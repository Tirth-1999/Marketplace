"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ShareButtonProps = {
  title: string;
  className?: string;
};

export function ShareButton({ title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} on Marketplace`,
          url,
        });
        return;
      } catch {
        // cancelled or unsupported — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className ?? "h-11 min-h-11"}
      onClick={share}
    >
      {copied ? <Check className="size-5" /> : <Share2 className="size-5" />}
      {copied ? "Link copied" : "Share"}
    </Button>
  );
}
