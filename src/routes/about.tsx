import { createFileRoute } from "@tanstack/react-router";
import lookbookImg from "@/assets/lookbook.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Aurelia Apparel" }, { name: "description", content: "Aurelia Apparel is a quietly luxurious atelier crafting timeless silhouettes in premium natural fibers." }, { property: "og:url", content: "/about" }] }),
  component: () => (
    <div className="container-aurelia py-12 md:py-20 max-w-3xl">
      <span className="eyebrow text-muted-foreground">Our Story</span>
      <h1 className="font-serif text-4xl md:text-6xl italic mt-2 mb-10">A quiet kind of luxury</h1>
      <img src={lookbookImg} alt="The Aurelia atelier" className="w-full aspect-[4/3] object-cover mb-10" />
      <div className="prose prose-neutral space-y-6 text-[15px] leading-relaxed text-muted-foreground">
        <p>Founded in Stockholm in 2018, Aurelia Apparel is a small atelier dedicated to a single idea: clothing should feel like it has always existed.</p>
        <p>Every piece is developed in close partnership with heritage mills across Italy and Portugal, using natural fibers that age beautifully — heavyweight silks, virgin wools, Mongolian cashmere, vegetable-tanned leather.</p>
        <p>We make small runs, refine rather than reinvent each season, and design for a wardrobe that compounds over time.</p>
      </div>
    </div>
  ),
});