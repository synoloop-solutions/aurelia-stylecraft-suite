import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Star, Truck, RotateCcw, Lock, Minus, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getProduct, getRelated, type Product } from "@/lib/products";
import { formatPrice, useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Aurelia Apparel` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
      { property: "og:type", content: "product" },
    ] : [{ title: "Product — Aurelia Apparel" }],
    links: loaderData ? [{ rel: "canonical", href: `/shop/${loaderData.product.slug}` }] : [],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: loaderData.product.name,
        description: loaderData.product.description,
        image: loaderData.product.image,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: loaderData.product.rating,
          reviewCount: loaderData.product.reviewCount,
        },
        offers: {
          "@type": "Offer",
          price: loaderData.product.price,
          priceCurrency: "USD",
          availability: loaderData.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      }),
    }] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-aurelia py-32 text-center">
      <h1 className="font-serif text-4xl italic mb-4">Product not found</h1>
      <Link to="/shop" className="text-[11px] uppercase tracking-widest border-b border-primary pb-1">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colorName);
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.slug);

  function add() {
    if (!size && product.sizes[0] !== "One Size") {
      toast.error("Please select a size");
      return;
    }
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size ?? product.sizes[0],
      color,
      qty,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <article className="container-aurelia py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img src={product.image} alt={product.name} width={800} height={1066} className="h-full w-full object-cover" />
          </div>
          {product.hoverImage && (
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              <img src={product.hoverImage} alt="" width={800} height={1066} loading="lazy" className="h-full w-full object-cover" />
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          {product.badge && <span className="eyebrow text-accent">{product.badge}</span>}
          <h1 className="font-serif text-3xl md:text-4xl italic mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex gap-0.5" aria-label={`${product.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`} aria-hidden="true" />
              ))}
            </div>
            <span className="text-[12px] text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <p className="text-2xl">{formatPrice(product.price)}</p>
            {product.compareAtPrice && <p className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</p>}
          </div>
          <p className="text-[12px] text-muted-foreground mt-2">{product.stock > 0 ? `In stock — ${product.stock} available` : "Out of stock"}</p>

          <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Color — {color}</span>
            </div>
            <div className="flex gap-2">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name} title={c.name}
                  className={`h-8 w-8 rounded-full ring-1 ring-border ${color === c.name ? "outline outline-2 outline-offset-2 outline-foreground" : ""}`}
                  style={{ background: c.hex }} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow">Size</span>
              <Dialog>
                <DialogTrigger className="text-[11px] underline text-muted-foreground hover:text-foreground">Size guide</DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle className="font-serif text-xl">Size Guide</DialogTitle></DialogHeader>
                  <table className="w-full mt-4 text-sm">
                    <thead><tr className="border-b border-border"><th className="text-left py-2">Size</th><th className="text-left py-2">Bust</th><th className="text-left py-2">Waist</th></tr></thead>
                    <tbody>
                      {["XS / 32-33", "S / 34-35", "M / 36-37", "L / 38-39", "XL / 40-41"].map((row, i) => (
                        <tr key={i} className="border-b border-border/50"><td className="py-2">{row.split(" / ")[0]}</td><td>{row.split(" / ")[1]}"</td><td>{Number(row.split("-")[0].split(" ")[2]) - 8}"</td></tr>
                      ))}
                    </tbody>
                  </table>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`min-w-[44px] h-11 px-3 text-[12px] border ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="h-11 w-11 inline-flex items-center justify-center"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="h-11 w-11 inline-flex items-center justify-center"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={add} className="flex-1 bg-primary text-primary-foreground h-11 text-[11px] uppercase tracking-widest hover:bg-primary/90">Add to Cart</button>
            <button onClick={() => toggleWishlist(product.slug)} aria-label="Add to wishlist" className="h-11 w-11 inline-flex items-center justify-center border border-border">
              <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[{icon: Truck, label: "Free Shipping"}, {icon: RotateCcw, label: "30-day Returns"}, {icon: Lock, label: "Secure Checkout"}].map((it) => (
              <div key={it.label} className="border border-border p-3">
                <it.icon className="h-4 w-4 mx-auto mb-1 text-accent" aria-hidden="true" />
                <p className="text-[10px] uppercase tracking-widest">{it.label}</p>
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible className="mt-10">
            <AccordionItem value="details">
              <AccordionTrigger className="eyebrow">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-[13px] text-muted-foreground space-y-1">
                  {product.details.map((d: string) => <li key={d}>{d}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="eyebrow">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">
                Standard 3–5 day shipping. Express available at checkout. 30-day returns with prepaid label.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="material">
              <AccordionTrigger className="eyebrow">Material & Care</AccordionTrigger>
              <AccordionContent className="text-[13px] text-muted-foreground">{product.material}. Follow garment care label.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-2xl md:text-3xl italic mb-10">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {related.map((p: Product) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </article>
  );
}