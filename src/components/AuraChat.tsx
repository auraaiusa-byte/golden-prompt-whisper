import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, Calendar, Zap, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navRobot from "@/assets/nav-influencer.png";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";

interface Msg {
  role: "aura" | "user";
  text: string;
  showCalendlyCta?: boolean;
}

interface AuraChatProps {
  greeting?: string;
}

const defaultGreeting = "Hi, I'm Nav! Ready to automate?";

const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL as string) || "https://calendly.com/auraai-usa/30min";

const SERVICES = [
  { title: "AI Automation", price: "From $1,997/mo", desc: "24/7 lead capture, voice agents, follow-up sequences." },
  { title: "Technical SEO", price: "From $1,497/mo", desc: "Audits, schema, Core Web Vitals, backlinking." },
  { title: "Full-Stack Dev", price: "Custom Quote", desc: "Next.js + Supabase, dashboards, AI integrations." },
];

type Mode =
  | "menu"
  | "services"
  | "free-chat"
  | "ai-typing"
  | "lead-name"
  | "lead-email"
  | "lead-processing"
  | "lead-done";

export const AuraChat = ({ greeting = defaultGreeting }: AuraChatProps = {}) => {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [aiTurns, setAiTurns] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "aura", text: "Hi, I'm Nav — your NavAura AI assistant. Ask me anything about AI automation, SEO, or custom development." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // External trigger from HeroAssistant
  useEffect(() => {
    const handler = () => { setOpen(true); setShowBubble(false); };
    window.addEventListener("aura:open", handler);
    return () => window.removeEventListener("aura:open", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mode]);

  const pushAura = (text: string, opts?: { showCalendlyCta?: boolean }) =>
    setMessages((m) => [...m, { role: "aura", text, ...opts }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { role: "user", text }]);

  const handleServices = () => {
    pushUser("Tell me about your services");
    setMode("services");
    setTimeout(() => pushAura("Here's what NavAura AI delivers — pick any to learn more or book a call."), 300);
  };

  const handleBook = () => {
    pushUser("I want to book a consultation");
    setTimeout(() => pushAura("Opening the calendar — pick any time that works for you."), 200);
    setShowCalendly(true);
  };

  const handleTestLead = () => {
    pushUser("Capture my info");
    setMode("lead-name");
    setTimeout(() => pushAura("Let's go ⚡ — what's your name?"), 300);
  };

  const submitName = () => {
    if (!leadName.trim()) return;
    pushUser(leadName);
    setMode("lead-email");
    setTimeout(() => pushAura(`Nice to meet you, ${leadName.split(" ")[0]}! What's your best email?`), 300);
  };

  const submitEmail = async () => {
    const email = leadEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushAura("That doesn't look like a valid email — please try again.");
      return;
    }
    pushUser(email);
    setMode("lead-processing");

    await supabase.from("leads").insert({
      email,
      source: `Chat · ${leadName || "Aura"}`,
      lead_status: "new",
    });
    sendLead({ source: "chat", name: leadName, email, message: "Lead captured via Aura chat" }).catch(() => {});

    setLeadCaptured(true);
    setTimeout(() => {
      setMode("lead-done");
      pushAura("✨ Got it! Our team will reach out shortly. Want to lock in a strategy slot now?", { showCalendlyCta: true });
    }, 1200);
  };

  const askAI = async (text: string) => {
    if (!text.trim()) return;
    pushUser(text);
    setInput("");
    setMode("ai-typing");

    try {
      const history = messages.slice(-6);
      const { data, error } = await supabase.functions.invoke("aura-chat", {
        body: { message: text, history },
      });

      // Mirror every custom question to webhook
      sendLead({
        source: "chat",
        name: leadName || undefined,
        email: leadEmail || undefined,
        message: text,
        meta: { type: "custom-question", reply: data?.reply },
      }).catch(() => {});

      if (error || !data?.reply) {
        pushAura("I had trouble reaching the AI. Try again, or book a call below.", { showCalendlyCta: true });
      } else {
        pushAura(data.reply, { showCalendlyCta: true });
      }

      const nextTurns = aiTurns + 1;
      setAiTurns(nextTurns);

      // After 2 substantive Q&As, request lead info if not captured
      if (!leadCaptured && nextTurns >= 2) {
        setTimeout(() => {
          setMode("lead-name");
          pushAura("Quick one — what's your name? I'll personalize the next steps.");
        }, 700);
      } else {
        setMode("free-chat");
      }
    } catch (e) {
      pushAura("Connection hiccup. Try again in a moment.", { showCalendlyCta: true });
      setMode("free-chat");
    }
  };

  return (
    <>
      {/* Mobile-only floating bubble (desktop uses HeroAssistant) */}
      <AnimatePresence>
        {!open && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 z-50 max-w-[240px] lg:hidden"
          >
            <button
              onClick={() => { setOpen(true); setShowBubble(false); }}
              className="relative rounded-2xl px-4 py-3 text-left text-sm text-white/90 block border"
              style={{
                background: "linear-gradient(135deg, hsla(220,100%,18%,0.85), hsla(270,60%,15%,0.85))",
                backdropFilter: "blur(14px)",
                borderColor: "hsla(220,90%,70%,0.4)",
                boxShadow: "0 10px 40px hsla(220,100%,50%,0.35)",
              }}
            >
              <span className="block text-xs mb-1" style={{ color: "hsl(220,100%,75%)" }}>NavAura AI</span>
              {greeting}
              <span
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                role="button"
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-white/20 flex items-center justify-center text-foreground/60 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher — mobile only */}
      <motion.button
        onClick={() => { setOpen((o) => !o); setShowBubble(false); }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        aria-label="Open NavAura AI Assistant"
        className="fixed bottom-4 right-4 z-50 w-20 h-20 flex items-center justify-center bg-transparent outline-none lg:hidden"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, hsla(220,100%,60%,0.55) 0%, hsla(270,80%,55%,0.25) 45%, transparent 75%)",
            filter: "blur(10px)",
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {open ? (
          <span className="relative w-14 h-14 rounded-full text-background flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(220,100%,65%), hsl(270,80%,60%))",
              boxShadow: "0 0 24px hsla(220,100%,60%,0.55)",
            }}>
            <X className="w-6 h-6" />
          </span>
        ) : (
          <motion.img
            src={navRobot}
            alt="Nav AI"
            width={120}
            height={120}
            className="relative w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_25px_hsla(220,100%,55%,0.5)]"
            animate={hovering ? { rotate: [0, -8, 8, 0], scale: 1.06 } : { rotate: [0, -2, 2, 0] }}
            transition={hovering ? { duration: 0.9 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 overflow-hidden flex flex-col shadow-luxe
                       inset-0 sm:inset-auto sm:bottom-32 sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-2rem)]
                       sm:h-[600px] sm:max-h-[calc(100vh-10rem)] sm:rounded-2xl border"
            style={{
              background: "linear-gradient(160deg, hsla(222,40%,8%,0.92), hsla(260,40%,10%,0.92))",
              backdropFilter: "blur(20px)",
              borderColor: "hsla(220,90%,65%,0.3)",
              boxShadow: "0 30px 80px hsla(220,100%,40%,0.25)",
            }}
          >
            <div className="px-5 py-4 border-b flex items-center gap-3"
              style={{ borderColor: "hsla(220,90%,65%,0.2)", background: "hsla(222,40%,6%,0.7)" }}>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 shrink-0 flex items-center justify-center"
                style={{ background: "hsla(220,80%,12%,0.9)", boxShadow: "0 0 12px hsla(220,100%,60%,0.45)" }}>
                <img src={navRobot} alt="Nav" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-sm truncate text-white">
                  <span style={{ color: "hsl(220,100%,75%)" }}>Nav</span>
                  <span className="text-white/40"> | </span>
                  AI Sales Agent
                </div>
                <div className="text-[10px] uppercase tracking-luxe flex items-center gap-1.5"
                  style={{ color: "hsl(220,100%,75%)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(220,100%,65%)" }} /> Online · Hybrid AI
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-9 h-9 rounded-full bg-white/5 text-white/70 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i}>
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${
                      m.role === "aura"
                        ? "text-white/90"
                        : "ml-auto text-white"
                    }`}
                    style={
                      m.role === "aura"
                        ? { background: "hsla(220,30%,15%,0.7)", border: "1px solid hsla(220,90%,65%,0.18)" }
                        : { background: "linear-gradient(135deg, hsl(220,100%,55%), hsl(270,80%,55%))" }
                    }
                  >
                    {m.text}
                  </div>
                  {m.showCalendlyCta && (
                    <button
                      onClick={() => setShowCalendly(true)}
                      className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-luxe font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, hsl(220,100%,55%), hsl(270,80%,55%))",
                        boxShadow: "0 0 18px hsla(220,100%,60%,0.55)",
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" /> Book Strategy Call
                    </button>
                  )}
                </div>
              ))}

              {mode === "ai-typing" && (
                <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs"
                  style={{ background: "hsla(220,30%,15%,0.7)", color: "hsl(220,100%,80%)" }}>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(220,100%,70%)" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:120ms]" style={{ background: "hsl(245,100%,75%)" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:240ms]" style={{ background: "hsl(270,100%,75%)" }} />
                  </span>
                  Nav is thinking…
                </div>
              )}

              {mode === "services" && (
                <div className="space-y-2 pt-1">
                  {SERVICES.map((s) => (
                    <div key={s.title} className="rounded-xl p-3 border"
                      style={{ background: "hsla(220,30%,12%,0.7)", borderColor: "hsla(220,90%,65%,0.25)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-serif text-sm" style={{ color: "hsl(220,100%,75%)" }}>{s.title}</div>
                        <div className="text-[10px] uppercase tracking-luxe text-white/60">{s.price}</div>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                  <button
                    onClick={handleBook}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs uppercase tracking-luxe font-bold text-white"
                    style={{ background: "linear-gradient(135deg, hsl(220,100%,55%), hsl(270,80%,55%))" }}
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book a Consultation
                  </button>
                </div>
              )}

              {mode === "lead-processing" && (
                <div className="flex items-center gap-2 text-xs pt-1" style={{ color: "hsl(220,100%,75%)" }}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Securing your lead…
                </div>
              )}
              {mode === "lead-done" && (
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs"
                  style={{ borderColor: "hsla(220,90%,65%,0.5)", background: "hsla(220,100%,50%,0.12)", color: "hsl(220,100%,80%)" }}>
                  <Check className="w-3.5 h-3.5" /> Lead saved · we'll be in touch
                </div>
              )}

              {(mode === "menu" || mode === "free-chat" || mode === "lead-done") && (
                <div className="pt-3 space-y-2">
                  <div className="text-[10px] uppercase tracking-luxe text-white/50 px-1">Quick Actions</div>
                  {[
                    { icon: Sparkles, label: "Our Services", onClick: handleServices },
                    { icon: Calendar, label: "Book Consultation", onClick: handleBook },
                    { icon: Zap, label: "Capture My Info", onClick: handleTestLead },
                  ].map(({ icon: Icon, label, onClick }) => (
                    <button
                      key={label}
                      onClick={onClick}
                      className="w-full text-left text-xs px-3 py-2.5 rounded-full border text-white/85 hover:text-white transition-colors flex items-center gap-2"
                      style={{ borderColor: "hsla(220,90%,65%,0.3)", background: "hsla(220,30%,12%,0.4)" }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(220,100%,75%)" }} /> {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === "lead-name") return submitName();
                if (mode === "lead-email") return submitEmail();
                askAI(input);
              }}
              className="p-3 border-t flex items-center gap-2"
              style={{ borderColor: "hsla(220,90%,65%,0.2)", background: "hsla(222,40%,6%,0.7)" }}
            >
              <input
                value={mode === "lead-name" ? leadName : mode === "lead-email" ? leadEmail : input}
                onChange={(e) => {
                  if (mode === "lead-name") setLeadName(e.target.value);
                  else if (mode === "lead-email") setLeadEmail(e.target.value);
                  else setInput(e.target.value);
                }}
                disabled={mode === "ai-typing" || mode === "lead-processing"}
                placeholder={
                  mode === "lead-name" ? "Type your name…" :
                  mode === "lead-email" ? "Type your email…" :
                  "Ask Nav anything…"
                }
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40 px-3 py-2 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={mode === "ai-typing" || mode === "lead-processing"}
                aria-label="Send"
                className="w-9 h-9 rounded-full text-white flex items-center justify-center disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, hsl(220,100%,55%), hsl(270,80%,55%))",
                  boxShadow: "0 0 14px hsla(220,100%,60%,0.45)",
                }}
              >
                {mode === "ai-typing" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly modal */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCalendly(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden border bg-background shadow-luxe"
              style={{ borderColor: "hsla(220,90%,65%,0.4)" }}
            >
              <button
                onClick={() => setShowCalendly(false)}
                aria-label="Close calendar"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background border border-white/20 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <iframe src={CALENDLY_URL} title="Book a consultation" className="w-full h-full border-0" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
