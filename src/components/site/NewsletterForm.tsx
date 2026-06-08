import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
});

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    setSubmitted(true);
    toast.success("Welcome to the Circle. Check your inbox for a confirmation.");
    setEmail("");
  }

  if (submitted && compact) {
    return <p className="text-[12px] text-muted-foreground">Thank you — please check your inbox.</p>;
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`flex border border-border focus-within:border-foreground transition-colors ${
        compact ? "" : "max-w-md mx-auto"
      }`}
    >
      <label htmlFor={compact ? "nl-email-compact" : "nl-email"} className="sr-only">Email address</label>
      <input
        id={compact ? "nl-email-compact" : "nl-email"}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="flex-1 px-4 py-3 text-[13px] bg-transparent outline-none placeholder:text-muted-foreground"
        aria-invalid={!!error}
        aria-describedby={error ? "nl-error" : undefined}
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-5 py-3 text-[10px] uppercase tracking-widest font-medium hover:bg-primary/90"
      >
        Subscribe
      </button>
      {error && (
        <span id="nl-error" className="sr-only">
          {error}
        </span>
      )}
      {error && (
        <p className="absolute mt-14 text-[11px] text-destructive" role="alert">{error}</p>
      )}
    </form>
  );
}