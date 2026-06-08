import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/forgot")({
  component: () => {
    const [email, setEmail] = useState("");
    return (
      <div className="max-w-md">
        <h2 className="font-serif text-3xl italic mb-6">Reset password</h2>
        <form onSubmit={(e) => { e.preventDefault(); toast.success(`Reset link sent to ${email}`); }} className="space-y-4">
          <div>
            <label htmlFor="fe" className="eyebrow block mb-2">Email</label>
            <input id="fe" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 text-[11px] uppercase tracking-widest hover:bg-primary/90">Send reset link</button>
        </form>
      </div>
    );
  },
});