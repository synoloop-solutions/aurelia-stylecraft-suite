import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({ email: z.string().trim().email().max(255), password: z.string().min(6).max(100) });

export const Route = createFileRoute("/account/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse({ email, password });
    if (!r.success) { setError(r.error.issues[0]?.message ?? "Invalid"); return; }
    setError(null);
    toast.success("Welcome back.");
  }

  return (
    <div className="max-w-md">
      <h2 className="font-serif text-3xl italic mb-6">Log in</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="email" className="eyebrow block mb-2">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label htmlFor="password" className="eyebrow block mb-2">Password</label>
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-foreground" />
        </div>
        {error && <p className="text-[12px] text-destructive" role="alert">{error}</p>}
        <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 text-[11px] uppercase tracking-widest hover:bg-primary/90">Log in</button>
        <div className="flex justify-between text-[12px]">
          <Link to="/account/forgot" className="underline text-muted-foreground hover:text-foreground">Forgot password?</Link>
          <Link to="/account/register" className="underline text-muted-foreground hover:text-foreground">Create account</Link>
        </div>
      </form>
    </div>
  );
}