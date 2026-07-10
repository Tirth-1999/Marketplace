"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Menu, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, isReserved, isSold, products, type Product } from "@/lib/products";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "firm-first"
  | "negotiable-first"
  | "brand-new"
  | "combos";

type QuickFilter =
  | "all"
  | "available"
  | "reserved"
  | "sold"
  | "firm"
  | "negotiable"
  | "brand-new"
  | "combo"
  | "giveaway";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "firm-first", label: "Firm price first" },
  { value: "negotiable-first", label: "Negotiable first" },
  { value: "brand-new", label: "Brand new first" },
  { value: "combos", label: "Combos first" },
];

const QUICK_FILTERS: { value: QuickFilter; label: string }[] = [
  { value: "all", label: "All deals" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
  { value: "firm", label: "Firm" },
  { value: "negotiable", label: "Negotiable" },
  { value: "brand-new", label: "Brand new" },
  { value: "combo", label: "Combo" },
  { value: "giveaway", label: "Giveaway" },
];

function matchesQuickFilter(product: Product, filter: QuickFilter) {
  const sold = isSold(product);
  const reserved = isReserved(product);

  switch (filter) {
    case "available":
      return !sold && !reserved;
    case "reserved":
      return reserved && !sold;
    case "sold":
      return sold;
    case "firm":
      return (
        !product.negotiable &&
        !product.giveaway &&
        !sold &&
        !reserved
      );
    case "negotiable":
      return (
        product.negotiable &&
        !product.giveaway &&
        !sold &&
        !reserved
      );
    case "brand-new":
      return Boolean(product.brandNew);
    case "combo":
      return Boolean(product.combo);
    case "giveaway":
      return Boolean(product.giveaway) && !sold;
    default:
      return true;
  }
}

function availabilityRank(product: Product): number {
  return isSold(product) ? 1 : 0;
}

function sortProducts(list: Product[], sort: SortOption) {
  const next = [...list];

  const comparePrimary = (a: Product, b: Product): number => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "firm-first":
        return Number(a.negotiable) - Number(b.negotiable);
      case "negotiable-first":
        return Number(b.negotiable) - Number(a.negotiable);
      case "brand-new":
        return (
          Number(Boolean(b.brandNew)) - Number(Boolean(a.brandNew))
        );
      case "combos":
        return Number(Boolean(b.combo)) - Number(Boolean(a.combo));
      default:
        return 0;
    }
  };

  return next.sort((a, b) => {
    const availability = availabilityRank(a) - availabilityRank(b);
    if (availability !== 0) return availability;
    return comparePrimary(a, b);
  });
}

function FilterPanel({
  category,
  setCategory,
  quickFilter,
  setQuickFilter,
  onPick,
}: {
  category: string;
  setCategory: (value: string) => void;
  quickFilter: QuickFilter;
  setQuickFilter: (value: QuickFilter) => void;
  onPick?: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Deal type
        </p>
        <div className="flex flex-col gap-1">
          {QUICK_FILTERS.map((item) => (
            <Button
              key={item.value}
              variant={quickFilter === item.value ? "secondary" : "ghost"}
              className="h-11 min-h-11 w-full justify-start px-3 text-base"
              onClick={() => {
                setQuickFilter(item.value);
                onPick?.();
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Category
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "secondary" : "ghost"}
              className="h-11 min-h-11 w-full justify-start px-3 text-base"
              onClick={() => {
                setCategory(item);
                onPick?.();
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [category, setCategory] = useState("All");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    (category !== "All" ? 1 : 0) + (quickFilter !== "all" ? 1 : 0);

  const filtered = useMemo(() => {
    let list = products;

    if (category === "Combo") {
      list = list.filter((p) => p.combo);
    } else if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    list = list.filter((p) => matchesQuickFilter(p, quickFilter));
    return sortProducts(list, sort);
  }, [category, quickFilter, sort]);

  const clearFilters = () => {
    setCategory("All");
    setQuickFilter("all");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Mobile / tablet compact bar */}
      <div className="flex items-center gap-2 lg:hidden">
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                className="h-11 min-h-11 shrink-0 gap-2 px-3 text-sm sm:text-base"
              />
            }
          >
            <Menu className="size-5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-0.5">
                {activeFilterCount}
              </Badge>
            )}
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100%,20rem)] gap-0 p-0 sm:max-w-sm"
          >
            <SheetHeader className="border-b">
              <SheetTitle className="text-lg">Browse & filter</SheetTitle>
              <SheetDescription>
                Categories and deal types — like Amazon filters.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <FilterPanel
                category={category}
                setCategory={setCategory}
                quickFilter={quickFilter}
                setQuickFilter={setQuickFilter}
                onPick={() => setFiltersOpen(false)}
              />
            </div>
            <SheetFooter className="border-t">
              <Button
                variant="outline"
                className="h-11 w-full"
                onClick={clearFilters}
              >
                Clear all
              </Button>
              <SheetClose
                render={<Button className="h-11 w-full" />}
              >
                Show {filtered.length} items
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1 truncate rounded-lg border bg-muted/40 px-3 py-2.5 text-sm font-medium">
          {category}
          {quickFilter !== "all" && (
            <span className="text-muted-foreground">
              {" · "}
              {QUICK_FILTERS.find((f) => f.value === quickFilter)?.label}
            </span>
          )}
        </div>

        <label className="relative flex h-11 min-w-0 shrink items-center">
          <ArrowDownUp className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            aria-label="Sort products"
            className="h-11 max-w-[9.5rem] appearance-none truncate rounded-lg border border-border bg-background py-2 pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-none sm:min-w-[11rem] sm:text-base"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Desktop sidebar + content */}
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4 rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-base font-semibold">
                <SlidersHorizontal className="size-4" />
                Filters
              </p>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-2 text-xs"
                  onClick={clearFilters}
                >
                  <X className="size-3.5" />
                  Clear
                </Button>
              )}
            </div>
            <FilterPanel
              category={category}
              setCategory={setCategory}
              quickFilter={quickFilter}
              setQuickFilter={setQuickFilter}
            />
          </div>
        </aside>

        <div className="space-y-4">
          <div className="hidden items-center justify-between gap-3 lg:flex">
            <p className="text-base text-muted-foreground">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </p>
            <label className="flex items-center gap-2 text-base font-medium">
              <ArrowDownUp className="size-4 shrink-0 text-muted-foreground" />
              <span>Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="h-11 min-w-[14rem] rounded-lg border border-border bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-sm text-muted-foreground lg:hidden">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </p>

          {filtered.length === 0 ? (
            <p className="rounded-xl border bg-muted/40 px-4 py-8 text-center text-base text-muted-foreground">
              No items match these filters. Try another category or clear
              filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
