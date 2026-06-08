import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, useStore } from "@/lib/store";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.slug);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0] ?? "One Size",
      color: product.colorName,
      qty: 1,
    });
    toast.success(`${product.name} added to cart`);
  }

  function wish(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist(product.slug);
  }

  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={800}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            product.hoverImage ? "group-hover:opacity-0" : ""
          }`}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={600}
            height={800}
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] px-2 py-1 uppercase tracking-widest">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={wish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:text-accent"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`} />
        </button>
        <button
          type="button"
          onClick={quickAdd}
          className="absolute bottom-3 left-3 right-3 bg-background/95 backdrop-blur text-foreground py-3 text-[10px] uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          Quick Add
        </button>
      </div>
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium tracking-wide truncate">{product.name}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{product.colorName}</p>
        </div>
        <div className="text-right shrink-0">
          {product.compareAtPrice && (
            <p className="text-[11px] text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</p>
          )}
          <p className="text-[13px] font-medium">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}