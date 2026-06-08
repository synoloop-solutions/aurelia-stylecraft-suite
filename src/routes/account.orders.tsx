import { createFileRoute } from "@tanstack/react-router";
import { formatPrice } from "@/lib/store";

const orders = [
  { id: "AUR-10248", date: "May 12, 2026", status: "Delivered", total: 605 },
  { id: "AUR-09971", date: "Apr 3, 2026", status: "Delivered", total: 240 },
];

export const Route = createFileRoute("/account/orders")({
  component: () => (
    <div>
      <h2 className="font-serif text-2xl italic mb-6">Order history</h2>
      <table className="w-full text-[13px]">
        <thead className="eyebrow text-muted-foreground">
          <tr><th className="text-left py-3">Order</th><th className="text-left">Date</th><th className="text-left">Status</th><th className="text-right">Total</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="py-4 font-medium">{o.id}</td><td>{o.date}</td><td>{o.status}</td><td className="text-right">{formatPrice(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});