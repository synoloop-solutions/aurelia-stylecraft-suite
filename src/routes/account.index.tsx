import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account/")({
  component: () => (
    <div className="space-y-6">
      <p className="text-muted-foreground">Welcome back. Manage your orders, addresses, and saved pieces from this dashboard.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{to: "/account/orders", label: "View orders"}, {to: "/account/addresses", label: "Manage addresses"}, {to: "/wishlist", label: "View wishlist"}].map((c) => (
          <Link key={c.label} to={c.to} className="border border-border p-6 hover:border-foreground transition-colors">
            <p className="font-medium">{c.label}</p>
            <span className="eyebrow text-muted-foreground mt-2 block">→</span>
          </Link>
        ))}
      </div>
    </div>
  ),
});