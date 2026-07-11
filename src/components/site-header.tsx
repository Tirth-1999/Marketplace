import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-4">
        <Link
          href="/"
          className="truncate text-lg font-bold tracking-tight sm:text-xl md:text-2xl"
        >
          Marketplace
        </Link>
        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Button
            variant="ghost"
            className="h-11 min-h-11 px-2 text-sm font-medium sm:px-3 sm:text-base"
            render={<Link href="/" />}
            nativeButton={false}
          >
            Items
          </Button>
          <Button
            variant="ghost"
            className="h-11 min-h-11 px-2 text-sm font-medium sm:px-3 sm:text-base"
            render={<Link href="/contact" />}
            nativeButton={false}
          >
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
