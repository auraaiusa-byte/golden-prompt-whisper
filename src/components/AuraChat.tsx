import { useState, useEffect } from "react";
import { X, Send, Sparkles, Calendar, Zap, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navRobot from "@/assets/nav-robot.png";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";

interface Msg { role: "aura" | "user"; text: string; }

interface AuraChatProps {
  greeting?: string;
  suggestions?: string[];
}

const defaultGreeting = "Hi, I'm Nav! Ready to automate?";

const CALENDLY_URL = (import.meta.env.VITE_CALENDLY_URL as string) || "https://calendly.com/auraai-usa/30min";

const SERVICES = [
  {
    title: "AI Automation",
    price: "From $1,997/mo",
    desc: "24/7 lead capture, voice agents, follow-up sequences. Replace a full sales team.",
  },
  {
    title: "Technical SEO",
    price: "From $1,497/mo",
    desc: "Schema, Core Web Vitals, content engine. Rank your site on page 1.",
  },
  {
    title: "Full-Stack Development",
    price: "Custom Quote",
    desc: "Conversion-optimized sites, dashboards, custom AI integrations.",
  },
];

type Mode = "menu" | "services" | "lead-name" | "lead-email" | "lead-processing" | "lead-done" | "free-chat";

export const AuraChat = ({ greeting = defaultGreeting }: AuraChatProps = {}) => {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "aura", text: "Hi, I'm Nav — your NavAura AI assistant. How can I automate your business today?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const pushAura = (text: string) => setMessages((m) => [...m, { role: "aura", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { role: "user", text }]);

  const openChat = () => {
    setOpen(true);
    setShowBubble(false);
  };

  // Quick action handlers
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
    pushUser("Test your lead capture speed");
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
    pushAura("Processing…");

    await supabase.from("leads").insert({
      email,
      source: `Chat · Test Lead · ${leadName}`,
      lead_status: "new",
    });
    sendLead({ source: "chat", name: leadName, email, message: "Test Lead from Aura chat" }).catch(() => {});

    setTimeout(() => {
      setMode("lead-done");
      pushAura("✨ Aura AI has analyzed your lead. Check your inbox — our team will reach out shortly!");
    }, 1400);
  };

  const sendFree = (text: string) => {
    if (!text.trim()) return;
    pushUser(text);
    setInput("");
    setTimeout(() => {
      pushAura("Got it. Want me to show you our services, book a call, or capture your info?");
      setMode("menu");
    }, 600);
  };

  return (
    <>
      {/* Welcome speech bubble */}
      <AnimatePresence>
        {!open && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 max-w-[240px]"
          >
            <button
              onClick={openChat}
              className="relative glass rounded-2xl px-4 py-3 text-left text-sm text-foreground/90 shadow-luxe border border-gold/30 hover:border-gold transition-colors block"
            >
              <span className="block font-serif text-gold text-xs mb-1">NavAura AI</span>
              {greeting}
              <span className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-background border-r border-b border-gold/30" />
              <span
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                role="button"
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-gold/40 flex items-center justify-center text-foreground/60 hover:text-gold cursor-pointer"
              >
                <X className="w-3 h-3" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating robot mascot */}
      <motion.button
        onClick={() => { setOpen((o) => !o); setShowBubble(false); }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        aria-label="Open NavAura AI Assistant"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-transparent outline-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, hsl(var(--gold) / 0.55) 0%, hsl(var(--gold) / 0.18) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {open ? (
          <motion.span
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold text-background flex items-center justify-center shadow-luxe ring-2 ring-gold/60"
          >
            <X className="w-6 h-6" />
          </motion.span>
        ) : (
          <motion.img
            src={navRobot}
            alt="Nav — NavAura AI robot assistant"
            width={256}
            height={256}
            loading="lazy"
            className="relative w-full h-full object-contain drop-shadow-[0_10px_25px_hsl(var(--gold)/0.35)] select-none pointer-events-none"
            animate={
              hovering
                ? { rotate: [0, -8, 8, -6, 6, 0], scale: 1.06 }
                : { rotate: [0, -2, 2, 0], scale: 1 }
            }
            transition={
              hovering
                ? { duration: 0.9, ease: "easeInOut" }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
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
            className="fixed z-50 glass overflow-hidden flex flex-col border border-gold/30 shadow-luxe
                       inset-0 sm:inset-auto sm:bottom-32 sm:right-6 sm:w-[380px] sm:max-w-[calc(100vw-2rem)]
                       sm:h-[560px] sm:max-h-[calc(100vh-10rem)] sm:rounded-2xl"
          >
            <div className="px-5 py-4 border-b border-gold/20 flex items-center gap-3 bg-background/70">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gold/50 shrink-0 bg-background flex items-center justify-center">
                <img src={navRobot} alt="Nav robot" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-sm truncate"><span className="text-gold">Nav</span> <span className="text-foreground/40">|</span> NavAura AI Assistant</div>
                <div className="text-[10px] uppercase tracking-luxe text-gold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> Online
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="sm:hidden w-9 h-9 rounded-full bg-secondary text-foreground/70 hover:text-gold flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    m.role === "aura"
                      ? "bg-secondary text-foreground/90"
                      : "ml-auto bg-gold text-background"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {/* Services cards */}
              {mode === "services" && (
                <div className="space-y-2 pt-1">
                  {SERVICES.map((s) => (
                    <div key={s.title} className="rounded-xl border border-gold/30 bg-background/50 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-serif text-sm text-gold">{s.title}</div>
                        <div className="text-[10px] uppercase tracking-luxe text-foreground/60">{s.price}</div>
                      </div>
                      <p className="text-xs text-foreground/75 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                  <button
                    onClick={handleBook}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs uppercase tracking-luxe font-bold text-background bg-gold hover:bg-gold-soft transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book a Consultation
                  </button>
                </div>
              )}

              {/* Lead capture inline form */}
              {mode === "lead-name" && (
                <form
                  onSubmit={(e) => { e.preventDefault(); submitName(); }}
                  className="pt-1"
                >
                  <input
                    autoFocus
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-background/60 border border-gold/40 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </form>
              )}
              {mode === "lead-email" && (
                <form
                  onSubmit={(e) => { e.preventDefault(); submitEmail(); }}
                  className="pt-1"
                >
                  <input
                    autoFocus
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="w-full bg-background/60 border border-gold/40 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </form>
              )}
              {mode === "lead-processing" && (
                <div className="flex items-center gap-2 text-xs text-gold pt-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Aura AI is analyzing your lead…
                </div>
              )}
              {mode === "lead-done" && (
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3 py-2 text-xs text-gold">
                  <Check className="w-3.5 h-3.5" /> Lead captured · check your inbox
                </div>
              )}

              {/* Quick actions menu */}
              {(mode === "menu" || mode === "free-chat" || mode === "lead-done") && messages.length >= 1 && (
                <div className="pt-3 space-y-2">
                  <div className="text-[10px] uppercase tracking-luxe text-foreground/50 px-1">Quick Actions</div>
                  <button
                    onClick={handleServices}
                    className="w-full text-left text-xs px-3 py-2.5 rounded-full border border-gold/30 text-foreground/85 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold" /> Ask about Services
                  </button>
                  <button
                    onClick={handleBook}
                    className="w-full text-left text-xs px-3 py-2.5 rounded-full border border-gold/30 text-foreground/85 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold" /> Book Consultation
                  </button>
                  <button
                    onClick={handleTestLead}
                    className="w-full text-left text-xs px-3 py-2.5 rounded-full border border-gold/30 text-foreground/85 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-gold" /> Test Lead Speed
                  </button>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === "lead-name") return submitName();
                if (mode === "lead-email") return submitEmail();
                sendFree(input);
              }}
              className="p-3 border-t border-gold/20 flex items-center gap-2 bg-background/70"
            >
              <input
                value={mode === "lead-name" ? leadName : mode === "lead-email" ? leadEmail : input}
                onChange={(e) => {
                  if (mode === "lead-name") setLeadName(e.target.value);
                  else if (mode === "lead-email") setLeadEmail(e.target.value);
                  else setInput(e.target.value);
                }}
                placeholder={
                  mode === "lead-name" ? "Type your name…" :
                  mode === "lead-email" ? "Type your email…" :
                  "Ask Nav anything…"
                }
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground px-3 py-2"
              />
              <button type="submit" aria-label="Send" className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center hover:bg-gold-soft transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly modal overlay */}
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
              className="relative w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden border border-gold/40 bg-background shadow-luxe"
            >
              <button
                onClick={() => setShowCalendly(false)}
                aria-label="Close calendar"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background border border-gold/40 flex items-center justify-center text-foreground/80 hover:text-gold"
              >
                <X className="w-4 h-4" />
              </button>
              <iframe
                src={CALENDLY_URL}
                title="Book a consultation"
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
