import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-spa.jpg";
import { Cross, Scale, Dumbbell, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";
import { toast } from "sonner";
import { z } from "zod";
import { HeroAssistant } from "@/components/HeroAssistant";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const PLACEHOLDER_FULL = "Enter your business email to activate Nav...";

const useTypewriter = (text: string, speed = 55, pauseAtEnd = 2200, active = true) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
        timeout = setTimeout(tick, speed);
      } else {
        timeout = setTimeout(() => {
          i = 0;
          tick();
        }, pauseAtEnd);
      }
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [text, speed, pauseAtEnd, active]);

  return display;
};

const HeroEmailCapture = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const animatedPlaceholder = useTypewriter(
    PLACEHOLDER_FULL,
    55,
    2200,
    status === "idle" && !focused && email.length === 0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("leads")
      .insert({ email: parsed.data, source: "Hero", lead_status: "new" });

    // Mirror to Make.com webhook (non-blocking)
    sendLead({ source: "contact", email: parsed.data, meta: { origin: "Hero" } }).catch(() => {});

    if (error) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
    }, 4500);
  };

  if (status === "success") {
    return (
      <div
        className="w-full max-w-xl animate-scale-in inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 border border-gold/60"
        style={{
          background:
            "linear-gradient(135deg, hsl(45 55% 52% / 0.18), hsl(45 55% 52% / 0.06))",
          backdropFilter: "blur(14px)",
          boxShadow:
            "0 0 40px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        role="status"
        aria-live="polite"
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B8941F)",
            boxShadow: "0 0 18px rgba(212,175,55,0.7)",
          }}
        >
          <Check className="w-4 h-4 text-black" strokeWidth={3} />
        </span>
        <span className="text-sm sm:text-base font-medium text-white tracking-wide">
          Access Granted. <span className="text-gold">Welcome to NavAura.</span>
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative rounded-2xl p-[1px] w-full max-w-2xl transition-all duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(212,175,55,0.55), rgba(212,175,55,0.1) 45%, rgba(212,175,55,0.04) 60%, rgba(212,175,55,0.45))",
        boxShadow: "0 0 14px rgba(212,175,55,0.18), 0 0 40px rgba(212,175,55,0.08)",
      }}
    >
      <div
        className="relative rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-2.5"
        style={{
          background: "rgba(10, 10, 12, 0.6)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={status !== "idle"}
          placeholder={focused || email ? "Enter your business email" : animatedPlaceholder + "▌"}
          aria-label="Business email"
          className="flex-1 min-w-0 w-full bg-transparent border-0 outline-none px-5 sm:px-6 py-4 text-sm sm:text-base font-sans text-white placeholder:text-white/55 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className="sm:ml-auto shrink-0 relative inline-flex items-center justify-center gap-2 rounded-lg px-7 sm:px-8 py-3.5 text-xs sm:text-sm uppercase tracking-luxe font-bold text-black transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap w-full sm:w-auto"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #C9A227)",
            boxShadow: "0 0 14px rgba(212,175,55,0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 24px rgba(212,175,55,0.7), 0 0 48px rgba(212,175,55,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 14px rgba(212,175,55,0.35)";
          }}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending
            </>
          ) : (
            "Get Started"
          )}
        </button>
      </div>
    </form>
  );
};

export const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-x-hidden pt-20 pb-32 md:pb-24">
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="NavAura AI digital command center — holographic dashboard for med spa, law firm, and gym automation"
        className="w-full h-full object-cover"
        width={1600}
        height={1200}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 md:to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>

    {/* Floating multi-industry icons */}
    <div className="absolute inset-0 pointer-events-none hidden md:block lg:hidden">
      <div className="absolute top-[22%] right-[8%] glass rounded-full p-4 animate-float" style={{ animationDelay: "0s" }}>
        <Cross className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <div className="absolute top-[55%] right-[18%] glass rounded-full p-4 animate-float" style={{ animationDelay: "1.5s" }}>
        <Scale className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <div className="absolute top-[78%] right-[6%] glass rounded-full p-4 animate-float" style={{ animationDelay: "3s" }}>
        <Dumbbell className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
    </div>

    <div className="container relative z-10 grid md:grid-cols-12 gap-8 items-center py-16 md:py-24 px-4 sm:px-6">
      <div className="md:col-span-7 w-full">
        <div className="reveal flex items-center gap-4 mb-10">
          <div className="w-16 h-px bg-gold" />
          <span className="text-xs uppercase tracking-luxe text-gold">Private Beta · By Invitation</span>
        </div>

        <h1
          className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 md:mb-8 text-white break-words"
          style={{ textShadow: "0 2px 30px hsl(222 30% 4% / 0.85), 0 1px 4px hsl(222 30% 4% / 0.9)" }}
        >
          The Unified
          <br />
          Intelligence for
          <br />
          <span className="italic gold-shimmer">Modern Business.</span>
        </h1>

        <p className="reveal reveal-delay-2 max-w-xl text-lg text-white/80 leading-relaxed mb-12 font-light"
           style={{ textShadow: "0 1px 12px hsl(222 30% 4% / 0.8)" }}>
          NavAura deploys specialized AI agents to manage leads, appointments,
          and client relations — across med spas, law firms, and fitness studios.
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-5 sm:gap-6">
          <HeroEmailCapture />
          <a href="#industries" className="text-xs uppercase tracking-luxe text-white/80 hover:text-gold transition-colors border-b border-white/30 hover:border-gold pb-1 self-start sm:self-auto">
            Explore Industries
          </a>
        </div>

        <div className="reveal reveal-delay-4 mt-12 md:mt-20 grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-10 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-luxe text-white/60">
          <div className="text-center sm:text-left">
            <div className="font-serif text-2xl sm:text-3xl text-white normal-case tracking-normal">2.1s</div>
            <div className="mt-1 leading-tight">Avg. Response</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center sm:text-left border-x sm:border-x-0 border-white/15 sm:border-0 px-2 sm:px-0">
            <div className="font-serif text-2xl sm:text-3xl text-white normal-case tracking-normal">$2.4M</div>
            <div className="mt-1 leading-tight">Revenue Driven</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center sm:text-left">
            <div className="font-serif text-2xl sm:text-3xl text-white normal-case tracking-normal">312</div>
            <div className="mt-1 leading-tight">Elite Brands</div>
          </div>
        </div>
      </div>
      <HeroAssistant />
    </div>

    {/* Glassmorphism live booking notification */}
    <div className="hidden lg:block absolute bottom-16 right-10 z-20 reveal reveal-delay-4">
      <div className="glass rounded-2xl p-5 w-[320px] border border-gold/40">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="text-[10px] uppercase tracking-luxe text-gold">NavAura · Live Lead</span>
          <span className="ml-auto text-[10px] text-muted-foreground">just now</span>
        </div>
        <p className="font-serif text-base text-foreground leading-snug">
          Madeline R. just booked a <em className="text-gold not-italic">Strategy Consultation</em> for Friday, 6:30pm.
        </p>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[10px] uppercase tracking-luxe text-muted-foreground">
          <span>Captured in 2.1s</span>
          <span className="text-gold">◆ Confirmed</span>
        </div>
      </div>
    </div>

    <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-luxe text-white/60 animate-float">
      Scroll
    </div>
  </section>
);
