import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PLACEHOLDER = "Enter your email to activate AI...";

export const HeroEmailCapture = () => {
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const focusedRef = useRef(false);

  // Typewriter placeholder
  useEffect(() => {
    let i = 0;
    let dir: 1 | -1 = 1;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (focusedRef.current) {
        timeout = setTimeout(tick, 400);
        return;
      }
      setPlaceholder(PLACEHOLDER.slice(0, i));
      if (dir === 1) {
        if (i < PLACEHOLDER.length) i++;
        else {
          dir = -1;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        if (i > 0) i--;
        else {
          dir = 1;
          timeout = setTimeout(tick, 600);
          return;
        }
      }
      timeout = setTimeout(tick, dir === 1 ? 70 : 35);
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const { error: insertError } = await supabase.from("leads").insert({
      email: trimmed,
      source: "Homepage Hero",
      lead_status: "new",
    });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Soft gold ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-2xl pointer-events-none opacity-80 blur-xl"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, hsl(var(--gold) / 0.35), transparent 70%)",
        }}
      />

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="relative glass rounded-2xl border border-gold/60 px-5 sm:px-6 py-5 flex items-center gap-4 animate-fade-in"
          style={{ boxShadow: "0 0 0 1px hsl(var(--gold) / 0.4), 0 20px 60px -20px hsl(var(--gold) / 0.45)" }}
        >
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gold text-background animate-scale-in">
            <Check className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-xl text-white">Access Granted!</div>
            <div className="text-xs uppercase tracking-luxe text-gold mt-1">
              NavAura AI · Your invitation is on its way
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative glass rounded-2xl border border-gold/40 p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 sm:gap-2 backdrop-blur-xl"
          style={{ boxShadow: "0 0 0 1px hsl(var(--gold) / 0.25), 0 20px 60px -25px hsl(var(--gold) / 0.5)" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
            onFocus={() => { focusedRef.current = true; }}
            onBlur={() => { focusedRef.current = false; }}
            placeholder={placeholder || " "}
            aria-label="Email address"
            required
            className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/50 px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-background font-medium text-sm uppercase tracking-luxe px-6 py-3 sm:py-3.5 hover:bg-gold-soft transition-all hover:shadow-[0_0_30px_hsl(var(--gold)/0.6)] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Activating
              </>
            ) : (
              <>
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}

      {error && status === "error" && (
        <p role="alert" className="mt-3 text-xs text-red-400/90 px-1">{error}</p>
      )}
    </div>
  );
};
