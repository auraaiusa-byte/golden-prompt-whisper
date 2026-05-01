import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navRobot from "@/assets/nav-robot.png";

interface Msg { role: "aura" | "user"; text: string; }

interface AuraChatProps {
  greeting?: string;
  suggestions?: string[];
}

const defaultGreeting = "Hi, I'm Nav! Ready to automate?";
const defaultSuggestions = [
  "🤖 How does AI help Med Spas?",
  "⚖️ AI for Law Firms?",
  "⚡ Scale my Gym business.",
];

export const AuraChat = ({ greeting = defaultGreeting, suggestions = defaultSuggestions }: AuraChatProps = {}) => {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "aura", text: "Hi, I'm Nav — your NavAura AI assistant. How can I automate your business today?" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    const reply: Msg = {
      role: "aura",
      text: "Wonderful — NavAura AI has noted your interest. Our team will reach you at aura.usa@gmail.com shortly. May I share more about our membership tiers?",
    };
    setMessages((m) => [...m, userMsg, reply]);
    setInput("");
  };

  const openChat = () => {
    setOpen(true);
    setShowBubble(false);
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
        {/* Pulsing gold glow */}
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
            style={{ transformOrigin: "30% 95%", transformPerspective: 600 }}
            animate={
              hovering
                ? {
                    rotate: [0, -22, -10, -22, -10, -22, 0],
                    rotateY: [0, -15, 10, -15, 10, -15, 0],
                    y: [0, -6, -3, -6, -3, -6, 0],
                    scale: 1.06,
                  }
                : { rotate: 0, rotateY: 0, y: 0, scale: 1 }
            }
            transition={
              hovering
                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4, ease: "easeOut" }
            }
            draggable={false}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 sm:bottom-32 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden flex flex-col border border-gold/30 shadow-luxe"
            style={{ height: 520, maxHeight: "calc(100vh - 10rem)" }}
          >
            <div className="px-5 py-4 border-b border-gold/20 flex items-center gap-3 bg-background/60">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gold/50 shrink-0 bg-background flex items-center justify-center">
                <img src={navRobot} alt="Nav robot" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-sm truncate"><span className="text-gold">Nav</span> <span className="text-foreground/40">|</span> NavAura AI Assistant</div>
                <div className="text-[10px] uppercase tracking-luxe text-gold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> Online
                </div>
              </div>
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
              {messages.length <= 1 && (
                <div className="pt-2 space-y-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs px-3 py-2.5 rounded-full border border-gold/30 text-foreground/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-gold/20 flex items-center gap-2 bg-background/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nav anything…"
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground px-3 py-2"
              />
              <button type="submit" aria-label="Send" className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center hover:bg-gold-soft transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
