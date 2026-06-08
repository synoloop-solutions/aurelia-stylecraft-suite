import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Aurelia Apparel" }, { name: "description", content: "Your saved Aurelia Apparel pieces." }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  if (items.length === 0) {
    return (
      <div className="container-aurelia py-32 text-center">
        <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-6" aria-hidden="true" />
        <h1 className="font-serif text-4xl italic mb-4">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8">Tap the heart on a product to save it for later.</p>
        <Link to="/shop" className="inline-flex bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="container-aurelia py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl italic mb-10">Wishlist</h1>
      <ul className="space-y-6">
        {items.map((p) => (
          <li key={p.slug} className="flex gap-4 md:gap-6 border-b border-border pb-6">
            <Link to="/shop/$slug" params={{ slug: p.slug }} className="shrink-0">
              <img src={p.image} alt={p.name} width={120} height={160} loading="lazy" className="w-24 md:w-32 aspect-[3/4] object-cover bg-secondary" />
            </Link>
            <div className="flex-1 flex flex-col">
              <Link to="/shop/$slug" params={{ slug: p.slug }} className="font-medium hover:text-accent">{p.name}</Link>
              <p className="text-[12px] text-muted-foreground mt-1">{p.colorName}</p>
              <p className="mt-2">{formatPrice(p.price)}</p>
              <div className="mt-auto flex gap-3 pt-4">
                <button onClick={() => { addToCart({ slug: p.slug, name: p.name, price: p.price, image: p.image, size: p.sizes[0], color: p.colorName, qty: 1 }); toast.success("Added to cart"); }} className="bg-primary text-primary-foreground px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-primary/90">Move to Cart</button>
                <button onClick={() => toggleWishlist(p.slug)} aria-label="Remove from wishlist" className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /> Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}