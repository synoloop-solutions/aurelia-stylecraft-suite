import { Link, createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Cart — Aurelia Apparel" }, { name: "description", content: "Review the items in your cart and proceed to secure checkout." }, { property: "og:url", content: "/cart" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = cartSubtotal > 250 || cartSubtotal === 0 ? 0 : 15;
  const tax = Math.round((cartSubtotal - discount) * 0.08);
  const total = Math.max(0, cartSubtotal - discount) + shipping + tax;

  function applyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "WELCOME10") {
      setDiscount(Math.round(cartSubtotal * 0.1));
      toast.success("Coupon applied: 10% off");
    } else {
      toast.error("Invalid coupon code");
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container-aurelia py-32 text-center">
        <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-6" aria-hidden="true" />
        <h1 className="font-serif text-4xl italic mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Discover our latest arrivals.</p>
        <Link to="/shop" className="inline-flex bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-aurelia py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl italic mb-10">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <ul className="space-y-6">
          {cart.map((item) => (
            <li key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-4 md:gap-6 border-b border-border pb-6">
              <Link to="/shop/$slug" params={{ slug: item.slug }} className="shrink-0">
                <img src={item.image} alt={item.name} width={120} height={160} className="w-24 md:w-32 aspect-[3/4] object-cover bg-secondary" loading="lazy" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <Link to="/shop/$slug" params={{ slug: item.slug }} className="font-medium text-[14px] truncate block hover:text-accent">{item.name}</Link>
                    <p className="text-[12px] text-muted-foreground mt-1">{item.color} · Size {item.size}</p>
                  </div>
                  <p className="font-medium text-[14px] shrink-0">{formatPrice(item.price * item.qty)}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-border">
                    <button aria-label="Decrease" onClick={() => updateQty(item.slug, item.size, item.color, item.qty - 1)} className="h-10 w-10 inline-flex items-center justify-center"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button aria-label="Increase" onClick={() => updateQty(item.slug, item.size, item.color, item.qty + 1)} className="h-10 w-10 inline-flex items-center justify-center"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.slug, item.size, item.color)} className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-destructive">
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="bg-card border border-border p-6 md:p-8 h-fit space-y-5 lg:sticky lg:top-28">
          <h2 className="eyebrow">Order Summary</h2>
          <form onSubmit={applyCoupon} className="flex border border-border focus-within:border-foreground">
            <label htmlFor="coupon" className="sr-only">Coupon code</label>
            <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2.5 text-[13px] bg-transparent outline-none" />
            <button type="submit" className="px-4 text-[11px] uppercase tracking-widest">Apply</button>
          </form>
          <dl className="text-[13px] space-y-2">
            <Row label="Subtotal" value={formatPrice(cartSubtotal)} />
            {discount > 0 && <Row label="Discount" value={`-${formatPrice(discount)}`} />}
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
            <Row label="Estimated tax" value={formatPrice(tax)} />
          </dl>
          <div className="border-t border-border pt-4 flex justify-between font-medium">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="block text-center bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90">Secure Checkout</Link>
          <Link to="/shop" className="block text-center text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>;
}