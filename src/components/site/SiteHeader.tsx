import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/products";

const NAV = [
  { to: "/shop", search: { category: "new" as const }, label: "New Arrivals" },
  { to: "/shop", search: { category: "women" as const }, label: "Women" },
  { to: "/shop", search: { category: "men" as const }, label: "Men" },
  { to: "/shop", search: { category: "accessories" as const }, label: "Accessories" },
  { to: "/shop", search: { category: "sale" as const }, label: "Sale" },
  { to: "/collections", search: undefined, label: "Collections" },
];

export function SiteHeader() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="bg-primary text-primary-foreground text-[10px] tracking-[0.2em] py-2.5 text-center uppercase font-medium">
        Complimentary standard shipping on orders over $250
      </div>
      <header
        className={`sticky top-0 z-40 bg-background/85 backdrop-blur-md transition-shadow ${
          scrolled ? "border-b border-border" : "border-b border-transparent"
        }`}
      >
        <nav className="container-aurelia h-16 md:h-20 flex items-center justify-between gap-6">
          <div className="flex-1 hidden lg:flex items-center gap-7 eyebrow">
            {NAV.slice(0, 4).map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={n.search}
                className="hover:text-accent transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center -ml-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-background w-80">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl tracking-tighter">AURELIA</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-1 eyebrow">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/shop"
                    search={{ category: c.slug as never }}
                    onClick={() => setOpen(false)}
                    className="py-3 border-b border-border hover:text-accent"
                  >
                    {c.label}
                  </Link>
                ))}
                <Link to="/account" onClick={() => setOpen(false)} className="py-3 border-b border-border hover:text-accent">
                  Account
                </Link>
                <Link to="/wishlist" onClick={() => setOpen(false)} className="py-3 border-b border-border hover:text-accent">
                  Wishlist
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="font-serif text-2xl md:text-3xl tracking-tighter font-bold uppercase">
            Aurelia
          </Link>

          <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
            <Link
              to="/search"
              aria-label="Search"
              className="inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden md:inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
            >
              <User className="h-4 w-4" />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-2 right-1 text-[9px] font-medium">{wishlist.length}</span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative inline-flex h-11 w-11 items-center justify-center hover:text-accent transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-1 text-[9px] font-medium">{cartCount}</span>
              )}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}