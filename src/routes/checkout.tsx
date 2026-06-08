import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, Lock } from "lucide-react";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Aurelia Apparel" }, { name: "description", content: "Secure checkout for your Aurelia Apparel order." }, { name: "robots", content: "noindex" }] }),
  component: CheckoutPage,
});

const steps = ["Customer", "Shipping", "Payment", "Review", "Confirmed"] as const;

const customerSchema = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
});
const shippingSchema = z.object({
  address: z.string().trim().min(3).max(200),
  city: z.string().trim().min(1).max(100),
  postal: z.string().trim().min(2).max(20),
  country: z.string().trim().min(2).max(100),
});
const paymentSchema = z.object({
  card: z.string().trim().regex(/^[\d ]{12,23}$/, "Invalid card number"),
  expiry: z.string().trim().regex(/^\d{2}\/\d{2}$/, "MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "3-4 digits"),
});

function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState({ email: "", firstName: "", lastName: "" });
  const [shipping, setShipping] = useState({ address: "", city: "", postal: "", country: "" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ship = cartSubtotal > 250 ? 0 : 15;
  const tax = Math.round(cartSubtotal * 0.08);
  const total = cartSubtotal + ship + tax;

  function validate(): boolean {
    let schema, data;
    if (step === 0) { schema = customerSchema; data = customer; }
    else if (step === 1) { schema = shippingSchema; data = shipping; }
    else if (step === 2) { schema = paymentSchema; data = payment; }
    else return true;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  }

  function next() {
    if (!validate()) return;
    if (step === 3) {
      clearCart();
      setStep(4);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  if (cart.length === 0 && step < 4) {
    return (
      <div className="container-aurelia py-32 text-center">
        <h1 className="font-serif text-3xl italic mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-[11px] uppercase tracking-widest border-b border-primary pb-1">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-aurelia py-12 md:py-20 max-w-4xl">
      <Link to="/" className="font-serif text-2xl uppercase font-bold tracking-tighter">Aurelia</Link>
      <div className="flex items-center gap-2 my-8 text-[10px] uppercase tracking-widest" aria-label="Checkout progress">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${i <= step ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span className={i === step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
            {i < steps.length - 1 && <span className="w-6 md:w-10 h-px bg-border" />}
          </div>
        ))}
      </div>

      {step === 4 ? (
        <div className="text-center py-12">
          <Check className="h-12 w-12 mx-auto text-accent mb-6" aria-hidden="true" />
          <h1 className="font-serif text-4xl italic mb-3">Order confirmed</h1>
          <p className="text-muted-foreground mb-2">Thank you, {customer.firstName || "friend"}.</p>
          <p className="text-muted-foreground mb-8">A receipt is on its way to {customer.email || "your inbox"}.</p>
          <Link to="/" className="inline-flex bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90">Return Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <form onSubmit={(e) => { e.preventDefault(); next(); }} className="space-y-6">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-2"><Lock className="h-3 w-3" /> Secure SSL encrypted</div>
            {step === 0 && (
              <fieldset className="space-y-4">
                <legend className="font-serif text-2xl italic mb-2">Customer information</legend>
                <p className="text-[12px] text-muted-foreground">Have an account? <Link to="/account/login" className="underline">Log in</Link></p>
                <Field label="Email" id="email" value={customer.email} type="email" onChange={(v) => setCustomer({ ...customer, email: v })} error={errors.email} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First name" id="firstName" value={customer.firstName} onChange={(v) => setCustomer({ ...customer, firstName: v })} error={errors.firstName} />
                  <Field label="Last name" id="lastName" value={customer.lastName} onChange={(v) => setCustomer({ ...customer, lastName: v })} error={errors.lastName} />
                </div>
              </fieldset>
            )}
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className="font-serif text-2xl italic mb-2">Shipping address</legend>
                <Field label="Street address" id="address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} error={errors.address} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" id="city" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} error={errors.city} />
                  <Field label="Postal code" id="postal" value={shipping.postal} onChange={(v) => setShipping({ ...shipping, postal: v })} error={errors.postal} />
                </div>
                <Field label="Country" id="country" value={shipping.country} onChange={(v) => setShipping({ ...shipping, country: v })} error={errors.country} />
              </fieldset>
            )}
            {step === 2 && (
              <fieldset className="space-y-4">
                <legend className="font-serif text-2xl italic mb-2">Payment</legend>
                <Field label="Card number" id="card" placeholder="1234 5678 9012 3456" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} error={errors.card} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" id="expiry" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} error={errors.expiry} />
                  <Field label="CVC" id="cvc" value={payment.cvc} onChange={(v) => setPayment({ ...payment, cvc: v })} error={errors.cvc} />
                </div>
              </fieldset>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl italic mb-2">Review your order</h2>
                <ReviewBlock title="Customer" lines={[`${customer.firstName} ${customer.lastName}`, customer.email]} />
                <ReviewBlock title="Shipping" lines={[shipping.address, `${shipping.city}, ${shipping.postal}`, shipping.country]} />
                <ReviewBlock title="Payment" lines={[`Card ending •••• ${payment.card.replace(/\s/g, "").slice(-4)}`]} />
              </div>
            )}
            <div className="flex justify-between items-center pt-4">
              <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30">Back</button>
              <button type="submit" className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-widest hover:bg-primary/90">{step === 3 ? "Place Order" : "Continue"}</button>
            </div>
          </form>
          <aside className="bg-card border border-border p-6 h-fit space-y-4">
            <h2 className="eyebrow">Order summary</h2>
            <ul className="space-y-3 text-[13px]">
              {cart.map((i) => (
                <li key={`${i.slug}-${i.size}-${i.color}`} className="flex justify-between gap-3">
                  <span className="text-muted-foreground truncate">{i.name} × {i.qty}</span>
                  <span>{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-3 text-[13px] space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{ship === 0 ? "Free" : formatPrice(ship)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between font-medium pt-2 border-t border-border mt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ label, id, value, onChange, error, type = "text", placeholder }: { label: string; id: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block eyebrow mb-2">{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full bg-background border ${error ? "border-destructive" : "border-border"} px-4 py-3 text-[14px] focus:outline-none focus:border-foreground`} />
      {error && <p id={`${id}-err`} role="alert" className="text-[11px] text-destructive mt-1">{error}</p>}
    </div>
  );
}

function ReviewBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="border border-border p-4">
      <h3 className="eyebrow mb-2">{title}</h3>
      {lines.map((l, i) => <p key={i} className="text-[13px] text-muted-foreground">{l}</p>)}
    </div>
  );
}