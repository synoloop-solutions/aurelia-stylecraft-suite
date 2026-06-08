import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Aurelia Apparel" }, { name: "description", content: "Reach the Aurelia client care team." }] }),
  component: () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    function submit(e: React.FormEvent) {
      e.preventDefault();
      const r = schema.safeParse(form);
      if (!r.success) {
        const errs: Record<string, string> = {};
        r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
        setErrors(errs);
        return;
      }
      setErrors({});
      toast.success("Thank you. We'll be in touch within one business day.");
      setForm({ name: "", email: "", message: "" });
    }
    return (
      <div className="container-aurelia py-12 md:py-20 max-w-xl">
        <h1 className="font-serif text-4xl md:text-5xl italic mb-4">Contact us</h1>
        <p className="text-muted-foreground mb-10">Our client care team is available Monday–Friday, 9am to 6pm CET.</p>
        <form onSubmit={submit} className="space-y-4">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="eyebrow block mb-2">{f.label}</label>
              <input id={f.id} type={f.type} value={(form as never)[f.id]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" aria-invalid={!!errors[f.id]} />
              {errors[f.id] && <p className="text-[11px] text-destructive mt-1" role="alert">{errors[f.id]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="eyebrow block mb-2">Message</label>
            <textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" />
            {errors.message && <p className="text-[11px] text-destructive mt-1" role="alert">{errors.message}</p>}
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-10 py-3.5 text-[11px] uppercase tracking-widest hover:bg-primary/90">Send</button>
        </form>
      </div>
    );
  },
});