import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const search = z.object({
  category: z.enum(["new", "women", "men", "accessories", "footwear", "sale", "all"]).optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop/")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop — Aurelia Apparel" },
      { name: "description", content: "Browse the Aurelia Apparel catalog — tailored essentials, evening wear, leather goods and footwear." },
      { property: "og:title", content: "Shop — Aurelia Apparel" },
      { property: "og:description", content: "Browse the full Aurelia Apparel catalog." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function matches(p: Product, params: z.infer<typeof search>): boolean {
  const cat = params.category ?? "all";
  if (cat === "new" && p.collection !== "new") return false;
  if (cat === "sale" && !p.compareAtPrice) return false;
  if (cat !== "all" && cat !== "new" && cat !== "sale" && p.category !== cat) return false;
  if (params.color && !p.colors.some((c) => c.name === params.color)) return false;
  if (params.size && !p.sizes.includes(params.size)) return false;
  if (params.q && !p.name.toLowerCase().includes(params.q.toLowerCase())) return false;
  return true;
}

function ShopPage() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = products.filter((p) => matches(p, params));
    switch (params.sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [params]);

  const allColors = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const title = params.category ? params.category.toUpperCase() : "ALL";

  const setParam = (k: string, v: string | undefined) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, [k]: v || undefined }) as never });

  const Filters = (
    <div className="space-y-8">
      <FilterGroup label="Category">
        {["all", "new", "women", "men", "accessories", "footwear", "sale"].map((c) => (
          <button key={c} onClick={() => setParam("category", c === "all" ? undefined : c)}
            className={`block text-left text-[12px] capitalize hover:text-accent ${params.category === c || (!params.category && c === "all") ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {c}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup label="Color">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setParam("color", undefined)} className={`text-[11px] px-2 py-1 border ${!params.color ? "border-foreground" : "border-border text-muted-foreground"}`}>All</button>
          {allColors.map((c) => (
            <button key={c} onClick={() => setParam("color", c)} className={`text-[11px] px-2 py-1 border ${params.color === c ? "border-foreground" : "border-border text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setParam("size", undefined)} className={`text-[11px] px-3 py-1.5 border ${!params.size ? "border-foreground" : "border-border text-muted-foreground"}`}>All</button>
          {allSizes.map((s) => (
            <button key={s} onClick={() => setParam("size", s)} className={`text-[11px] px-3 py-1.5 border ${params.size === s ? "border-foreground" : "border-border text-muted-foreground"}`}>{s}</button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="container-aurelia py-12 md:py-20">
      <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">{title}</span>
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl italic">{params.category === "new" ? "New Arrivals" : params.category === "sale" ? "Sale" : params.category ? title[0] + title.slice(1).toLowerCase() : "All Products"}</h1>
          <p className="text-[12px] text-muted-foreground mt-2">{filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
        </div>
        <div className="flex items-center gap-3">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border border-border px-4 py-2.5">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="bg-background w-80 overflow-y-auto">
              <SheetHeader><SheetTitle className="font-serif text-xl">Filters</SheetTitle></SheetHeader>
              <div className="mt-6">{Filters}</div>
            </SheetContent>
          </Sheet>
          <label className="sr-only" htmlFor="sort">Sort by</label>
          <select id="sort" value={params.sort ?? "featured"} onChange={(e) => setParam("sort", e.target.value)}
            className="text-[11px] uppercase tracking-widest border border-border bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden md:block">{Filters}</aside>
        <div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif italic text-2xl mb-3">No matches found</p>
              <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters.</p>
              <Link to="/shop" className="text-[11px] uppercase tracking-widest border-b border-primary pb-1">Clear all filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{label}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}