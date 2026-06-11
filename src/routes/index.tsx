import { Link, createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import lookbookImg from "@/assets/lookbook.jpg";
import tailoringImg from "@/assets/collection-tailoring.jpg";
import eveningImg from "@/assets/collection-evening.jpg";
import leatherImg from "@/assets/collection-leather.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Star, Truck, RotateCcw, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia Apparel — The Modern Heirloom" },
      { name: "description", content: "Premium fashion atelier crafting timeless, sustainable silhouettes in natural fibers. Discover the Winter 2024 collection." },
      { property: "og:title", content: "Aurelia Apparel — The Modern Heirloom" },
      { property: "og:description", content: "Premium fashion atelier crafting timeless, sustainable silhouettes in natural fibers." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as never,
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestSellers = products.filter((p) => p.collection === "best-seller" || p.collection === "new").slice(0, 4);
  const newArrivals = products.filter((p) => p.collection === "new" || p.collection === "classic").slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers products={bestSellers} />
      <NewArrivals products={newArrivals} />
      <ShopByCategory />
      <Lookbook />
      <WhyChooseUs />
      <Reviews />
      <InstagramFeed />
      <NewsletterSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
      <img
        src={heroImg}
        alt="Model in a structured camel wool coat — Winter 2024 collection"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/30" />
      <div className="relative h-full container-aurelia flex flex-col items-start justify-end pb-20 md:items-center md:justify-center md:text-center md:pb-0">
        <span className="eyebrow text-foreground/70 mb-4">Winter Collection 2024</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic leading-[0.95] max-w-3xl mb-8">
          The Modern<br />Heirloom
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            search={{ category: "women" as const }}
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Shop Women
          </Link>
          <Link
            to="/shop"
            search={{ category: "men" as const }}
            className="inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Shop Men
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const items = [
    { img: tailoringImg, title: "Tailored Essentials", to: "/shop", search: { category: "women" as const } },
    { img: eveningImg, title: "Nocturnal Elegance", to: "/shop", search: { category: "women" as const } },
    { img: leatherImg, title: "The Accessory Atelier", to: "/shop", search: { category: "accessories" as const } },
  ];
  return (
    <section className="container-aurelia py-24 md:py-32">
      <div className="text-center mb-16">
        <span className="eyebrow text-muted-foreground">Winter 2024</span>
        <h2 className="font-serif text-3xl md:text-5xl italic mt-2">Featured Collections</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((it) => (
          <Link key={it.title} to={it.to} search={it.search} className="group block">
            <div className="overflow-hidden mb-4 aspect-[3/4]">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                width={800}
                height={1066}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="font-serif text-xl italic">{it.title}</h3>
            <p className="eyebrow text-muted-foreground mt-1 group-hover:text-accent transition-colors">Explore Collection</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BestSellers({ products }: { products: typeof import("@/lib/products").products }) {
  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-aurelia">
        <div className="flex flex-wrap gap-4 justify-between items-end mb-12 md:mb-16">
          <div>
            <span className="eyebrow text-muted-foreground">Curated for you</span>
            <h2 className="font-serif text-3xl md:text-4xl italic mt-2">Season Favorites</h2>
          </div>
          <Link to="/shop" className="text-[11px] uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent">View All Products</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function NewArrivals({ products }: { products: typeof import("@/lib/products").products }) {
  return (
    <section className="container-aurelia py-24 md:py-32">
      <div className="flex flex-wrap gap-4 justify-between items-end mb-12 md:mb-16">
        <div>
          <span className="eyebrow text-muted-foreground">Just landed</span>
          <h2 className="font-serif text-3xl md:text-4xl italic mt-2">New Arrivals</h2>
        </div>
        <Link to="/shop" search={{ category: "new" as const }} className="text-[11px] uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent">Shop New In</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

function ShopByCategory() {
  const cats = [
    { label: "Women", img: eveningImg, search: { category: "women" as const } },
    { label: "Men", img: "", search: { category: "men" as const } },
    { label: "Accessories", img: leatherImg, search: { category: "accessories" as const } },
    { label: "Footwear", img: "", search: { category: "footwear" as const } },
  ];
  return (
    <section className="bg-card py-24 md:py-32">
      <div className="container-aurelia">
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow text-muted-foreground">Explore</span>
          <h2 className="font-serif text-3xl md:text-4xl italic mt-2">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cats.map((c) => {
            const sample = products.find((p) => p.category === c.search.category);
            const img = c.img || sample?.image || "";
            return (
              <Link key={c.label} to="/shop" search={c.search} className="group relative aspect-[3/4] overflow-hidden block">
                <img src={img} alt={c.label} loading="lazy" width={600} height={800} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/35 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif italic text-2xl md:text-3xl text-primary-foreground">{c.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-aurelia grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <img src={lookbookImg} alt="Editorial lookbook — Form & Substance" loading="lazy" width={1600} height={1200} className="w-full aspect-[4/3] object-cover" />
        </div>
        <div className="md:col-span-5 md:pl-12">
          <span className="eyebrow text-muted-foreground">Winter 2024 Lookbook</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-6 italic leading-tight">Form & <br/>Substance</h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-sm">
            A collection inspired by sculptural minimalism and the interplay of light and shadow on premium natural fibers.
          </p>
          <Link to="/collections" className="mt-10 group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-medium">
            Discover the Lookbook
            <span className="block w-12 h-px bg-primary group-hover:w-20 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Sparkles, title: "Premium Quality", body: "Sourced from heritage mills in Italy and Portugal." },
    { icon: Truck, title: "Fast Delivery", body: "Complimentary express shipping on orders over $250." },
    { icon: RotateCcw, title: "Easy Returns", body: "30-day returns with prepaid labels." },
    { icon: Lock, title: "Secure Payments", body: "Encrypted checkout via trusted providers." },
  ];
  return (
    <section className="border-y border-border bg-card py-20">
      <div className="container-aurelia grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <it.icon className="h-6 w-6 mx-auto mb-4 text-accent" aria-hidden="true" />
            <h3 className="text-[12px] uppercase tracking-widest font-medium mb-2">{it.title}</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Eleanor V.", text: "The cashmere sweater is a revelation — weighty, soft, and somehow gets better each wear.", product: "Boiled Cashmere Sweater" },
    { name: "Marcus D.", text: "Finally a poplin shirt that holds its shape without feeling stiff. My new uniform.", product: "Structured Poplin Shirt" },
    { name: "Iris K.", text: "The drape on the satin blouse is unreal. Quietly luxurious in every way.", product: "Satin Drape Blouse" },
  ];
  return (
    <section className="container-aurelia py-24 md:py-32">
      <div className="text-center mb-16">
        <span className="eyebrow text-muted-foreground">Words from our clients</span>
        <h2 className="font-serif text-3xl md:text-4xl italic mt-2">In Their Closet</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r) => (
          <figure key={r.name} className="border border-border p-8 bg-card">
            <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="font-serif italic text-lg leading-relaxed">"{r.text}"</blockquote>
            <figcaption className="mt-6 text-[11px] uppercase tracking-widest">
              <span className="font-medium">{r.name}</span>
              <span className="text-muted-foreground"> — {r.product}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function InstagramFeed() {
  const imgs = [tailoringImg, eveningImg, leatherImg, lookbookImg, heroImg, eveningImg];
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container-aurelia">
        <div className="text-center mb-12">
          <span className="eyebrow text-muted-foreground">@aureliaapparel</span>
          <h2 className="font-serif text-3xl md:text-4xl italic mt-2">From the Atelier</h2>
          <a href="#" className="inline-block mt-4 text-[11px] uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent">Follow on Instagram</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {imgs.map((src, i) => (
            <a key={i} href="#" className="aspect-square overflow-hidden block group">
              <img src={src} alt={`Instagram post ${i + 1}`} loading="lazy" width={400} height={400} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="border-y border-border py-24">
      <div className="container-aurelia max-w-xl text-center">
        <h2 className="font-serif text-3xl italic mb-4">Join the Circle</h2>
        <p className="text-muted-foreground text-[13px] mb-8 leading-relaxed">
          Subscribe for early access to new collections, editorial features, and private invitations.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
