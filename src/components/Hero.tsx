import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-spa.jpg";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";
import { toast } from "sonner";
import { z } from "zod";
import { HeroAssistant } from "@/components/HeroAssistant";
import type { PipelineIndustryConfig } from "@/components/HeroAssistant";
import { Button } from "@/components/ui/button";

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

    const userEmail = email.trim().toLowerCase();
    const parsed = emailSchema.safeParse(userEmail);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("leads")
      .insert({
        email: userEmail.trim().toLowerCase(),
        source: "Hero",
      });

    // Mirror to Make.com webhook (non-blocking)
    sendLead({ source: "contact", email: userEmail.trim().toLowerCase(), meta: { origin: "Hero" } }).catch(() => {});

    if (error) {
      console.error("Supabase insert lead error:", error);
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

type IndustryKey = "medspa" | "law" | "gym";

const industryContent: Record<IndustryKey, PipelineIndustryConfig & {
  headline: string;
  accent: string;
  description: string;
  metrics: { value: string; label: string }[];
}> = {
  medspa: {
    label: "Medical Spa",
    headline: "Turn every inquiry into",
    accent: "a booked treatment.",
    description: "Aura qualifies treatment interest, answers patient questions, and books consultations while your team stays focused on care.",
    triggerTitle: "New treatment inquiry captured",
    channels: ["Website", "SMS", "Instagram"],
    intent: "Analyzing treatment goals, timeline, and readiness",
    qualification: "High intent verified",
    actionTitle: "Consultation booked & CRM synced",
    actionDetail: "Patient receives confirmation, reminders, and pre-visit instructions automatically.",
    integrations: ["Mindbody", "Zenoti", "Zapier"],
    activity: "Aesthetic consultation secured",
    metrics: [{ value: "2.1s", label: "Avg. Response" }, { value: "+31%", label: "Consultations" }, { value: "24/7", label: "Patient Intake" }],
  },
  law: {
    label: "Law Firm",
    headline: "Convert urgent inquiries into",
    accent: "qualified consultations.",
    description: "Aura conducts confidential intake, identifies case fit, and schedules consultations before high-value prospects call another firm.",
    triggerTitle: "Inbound case inquiry captured",
    channels: ["Website", "SMS", "WhatsApp"],
    intent: "Analyzing matter type, urgency, and jurisdiction",
    qualification: "Case criteria verified",
    actionTitle: "Consultation booked & matter synced",
    actionDetail: "Qualified intake is routed with a complete summary and conflict-check details.",
    integrations: ["Clio", "MyCase", "Zapier"],
    activity: "Qualified case evaluation secured",
    metrics: [{ value: "98%", label: "Intake Accuracy" }, { value: "3.2×", label: "More Retainers" }, { value: "24/7", label: "Case Capture" }],
  },
  gym: {
    label: "Fitness & Gym",
    headline: "Transform every trial lead into",
    accent: "recurring membership.",
    description: "Aura follows up instantly, matches prospects to the right membership, and books tours and trial sessions around the clock.",
    triggerTitle: "New membership lead captured",
    channels: ["Website", "SMS", "WhatsApp"],
    intent: "Analyzing goals, preferred classes, and start date",
    qualification: "Membership intent verified",
    actionTitle: "Free pass booked & CRM synced",
    actionDetail: "The prospect receives a pass, class recommendations, and automated follow-up.",
    integrations: ["Mindbody", "HubSpot", "Zapier"],
    activity: "High-intent trial visit secured",
    metrics: [{ value: "43%", label: "More Tours" }, { value: "2.8×", label: "Lead Conversion" }, { value: "24/7", label: "Member Sales" }],
  },
};

export const Hero = () => {
  const [industry, setIndustry] = useState<IndustryKey>("medspa");
  const selected = industryContent[industry];

  return (
  <section className="relative min-h-screen flex items-center overflow-x-hidden pt-20 pb-24">
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

    <div className="container relative z-10 grid md:grid-cols-12 gap-10 lg:gap-12 items-center py-12 md:py-20 px-4 sm:px-6">
      <div className="md:col-span-6 w-full min-w-0">
        <div className="reveal flex items-center gap-4 mb-6">
          <div className="w-16 h-px bg-gold" />
          <span className="text-xs uppercase tracking-luxe text-gold">Private Beta · By Invitation</span>
        </div>

        <div className="reveal reveal-delay-1 mb-7 flex w-full max-w-xl rounded-lg border border-border bg-background/70 p-1 backdrop-blur-lg" role="group" aria-label="Select industry workflow">
          {(Object.keys(industryContent) as IndustryKey[]).map((key) => (
            <Button key={key} type="button" variant="ghost" onClick={() => setIndustry(key)} aria-pressed={industry === key} className={`h-auto min-w-0 flex-1 whitespace-normal rounded-md px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-xs ${industry === key ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              {industryContent[key].label}
            </Button>
          ))}
        </div>

        <h1
          className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] mb-6 text-foreground break-words"
          style={{ textShadow: "0 2px 30px hsl(222 30% 4% / 0.85), 0 1px 4px hsl(222 30% 4% / 0.9)" }}
        >
          {selected.headline}
          <br />
          <span className="italic gold-shimmer">{selected.accent}</span>
        </h1>

        <p className="reveal reveal-delay-2 max-w-xl text-lg text-white/80 leading-relaxed mb-12 font-light"
           style={{ textShadow: "0 1px 12px hsl(222 30% 4% / 0.8)" }}>
          {selected.description}
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-5 sm:gap-6">
          <HeroEmailCapture />
          <a href="#industries" className="text-xs uppercase tracking-luxe text-white/80 hover:text-gold transition-colors border-b border-white/30 hover:border-gold pb-1 self-start sm:self-auto">
            Explore Industries
          </a>
        </div>

        <div className="reveal reveal-delay-4 mt-10 grid grid-cols-3 gap-3 text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]">
          {selected.metrics.map((metric, index) => <div key={metric.label} className={`text-center sm:text-left ${index === 1 ? "border-x border-border px-2" : ""}`}><div className="font-sans text-xl font-semibold text-foreground normal-case tracking-normal sm:text-2xl">{metric.value}</div><div className="mt-1 leading-tight">{metric.label}</div></div>)}
        </div>
      </div>
      <HeroAssistant config={selected} />
    </div>

    <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-luxe text-white/60 animate-float">
      Scroll
    </div>
  </section>
  );
};
