import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({ meta: [{ title: "Search — Aurelia Apparel" }, { name: "description", content: "Search the Aurelia Apparel catalog." }] }),
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(params.q ?? "");
  const suggestions = ["blouse", "cashmere", "trousers", "leather"];
  const results = useMemo(() => {
    if (!params.q) return [];
    const t = params.q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(t) || p.material.toLowerCase().includes(t) || p.category.includes(t));
  }, [params.q]);

  return (
    <div className="container-aurelia py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl italic mb-8">Search</h1>
      <form onSubmit={(e) => { e.preventDefault(); navigate({ search: { q: q || undefined } }); }} className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, materials, categories…" className="w-full pl-12 pr-4 py-4 border border-border focus:outline-none focus:border-foreground bg-background" />
      </form>
      {!params.q && (
        <div className="mt-10">
          <p className="eyebrow text-muted-foreground mb-3">Suggested searches</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Link key={s} to="/search" search={{ q: s }} className="text-[12px] border border-border px-3 py-1.5 hover:border-foreground">{s}</Link>
            ))}
          </div>
        </div>
      )}
      {params.q && (
        <div className="mt-10">
          <p className="text-[12px] text-muted-foreground mb-6">{results.length} result{results.length === 1 ? "" : "s"} for "{params.q}"</p>
          {results.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif italic text-2xl mb-3">No matches</p>
              <p className="text-muted-foreground text-sm">Try another term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {results.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}