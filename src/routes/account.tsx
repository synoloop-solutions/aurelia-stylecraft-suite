import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Aurelia Apparel" }, { name: "description", content: "Manage your Aurelia Apparel account, orders, and addresses." }] }),
  component: AccountLayout,
});

function AccountLayout() {
  return (
    <div className="container-aurelia py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl italic mb-10">Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <nav className="space-y-2 eyebrow">
          <Link to="/account" activeOptions={{ exact: true }} className="block py-2 hover:text-accent" activeProps={{ className: "text-foreground" }}>Overview</Link>
          <Link to="/account/orders" className="block py-2 hover:text-accent" activeProps={{ className: "text-foreground" }}>Orders</Link>
          <Link to="/account/addresses" className="block py-2 hover:text-accent" activeProps={{ className: "text-foreground" }}>Addresses</Link>
          <Link to="/wishlist" className="block py-2 hover:text-accent">Wishlist</Link>
          <Link to="/account/login" className="block py-2 hover:text-accent" activeProps={{ className: "text-foreground" }}>Log in</Link>
          <Link to="/account/register" className="block py-2 hover:text-accent" activeProps={{ className: "text-foreground" }}>Register</Link>
        </nav>
        <div><Outlet /></div>
      </div>
    </div>
  );
}