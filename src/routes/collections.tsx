import { Link, createFileRoute } from "@tanstack/react-router";
import lookbookImg from "@/assets/lookbook.jpg";
import tailoringImg from "@/assets/collection-tailoring.jpg";
import eveningImg from "@/assets/collection-evening.jpg";
import leatherImg from "@/assets/collection-leather.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [{ title: "Collections — Aurelia Apparel" }, { name: "description", content: "Seasonal collections from the Aurelia atelier." }, { property: "og:url", content: "/collections" }] }),
  component: CollectionsPage,
});

const items = [
  { title: "Form & Substance", subtitle: "Winter 2024 Lookbook", img: lookbookImg },
  { title: "Tailored Essentials", subtitle: "The everyday wardrobe", img: tailoringImg },
  { title: "Nocturnal Elegance", subtitle: "After hours", img: eveningImg },
  { title: "The Accessory Atelier", subtitle: "Leather goods", img: leatherImg },
];

function CollectionsPage() {
  return (
    <div className="container-aurelia py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-6xl italic mb-12">Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {items.map((it) => (
          <Link key={it.title} to="/shop" className="group block">
            <div className="aspect-[4/5] overflow-hidden mb-4">
              <img src={it.img} alt={it.title} loading="lazy" width={1200} height={1500} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <span className="eyebrow text-muted-foreground">{it.subtitle}</span>
            <h2 className="font-serif text-3xl italic mt-1">{it.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}