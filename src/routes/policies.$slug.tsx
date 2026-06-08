import { createFileRoute } from "@tanstack/react-router";

const CONTENT: Record<string, { title: string; body: string }> = {
  shipping: { title: "Shipping", body: "Standard delivery 3–5 business days. Complimentary on orders over $250. Express delivery available at checkout." },
  returns: { title: "Returns", body: "Returns accepted within 30 days of delivery, in original condition. We provide a prepaid label." },
  "size-guide": { title: "Size Guide", body: "Our pieces run true to size. See individual product pages for full measurements." },
  privacy: { title: "Privacy Policy", body: "We collect only the information needed to fulfill your order and improve our service. We never sell your data." },
  terms: { title: "Terms of Service", body: "By using this site you agree to our terms. All content © Aurelia Apparel." },
};

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => CONTENT[params.slug] ?? { title: "Policy", body: "Content unavailable." },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Policy"} — Aurelia Apparel` }, { name: "description", content: loaderData?.body.slice(0, 155) ?? "" }] }),
  component: () => {
    const data = Route.useLoaderData();
    return (
      <div className="container-aurelia py-12 md:py-20 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-5xl italic mb-6">{data.title}</h1>
        <p className="text-muted-foreground leading-relaxed text-[15px]">{data.body}</p>
      </div>
    );
  },
});