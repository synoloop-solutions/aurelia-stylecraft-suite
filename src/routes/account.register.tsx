import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/register")({
  component: () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    return (
      <div className="max-w-md">
        <h2 className="font-serif text-3xl italic mb-6">Create account</h2>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Account created."); }} className="space-y-4">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "password", label: "Password", type: "password" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="eyebrow block mb-2">{f.label}</label>
              <input id={f.id} type={f.type} required value={(form as never)[f.id]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" />
            </div>
          ))}
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 text-[11px] uppercase tracking-widest hover:bg-primary/90">Create account</button>
        </form>
      </div>
    );
  },
});