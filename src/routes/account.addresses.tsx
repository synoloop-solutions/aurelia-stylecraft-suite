import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/addresses")({
  component: () => (
    <div>
      <h2 className="font-serif text-2xl italic mb-6">Saved addresses</h2>
      <div className="border border-border p-6">
        <p className="font-medium mb-1">Default shipping address</p>
        <p className="text-muted-foreground text-[13px]">12 Avenue Foch<br/>75116 Paris, France</p>
      </div>
    </div>
  ),
});