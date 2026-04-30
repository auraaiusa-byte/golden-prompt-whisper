import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import auraAvatar from "@/assets/aura-avatar.jpg";

interface Msg { role: "aura" | "user"; text: string; }

interface AuraChatProps {
  greeting?: string;
  suggestions?: string[];
}

const defaultGreeting = "Hi! I am NavAura AI. How can I automate your business today?";
const defaultSuggestions = [
  "🤖 How does AI help Med Spas?",
  "⚖️ AI for Law Firms?",
  "⚡ Scale my Gym business.",
];

export const AuraChat = ({ greeting = defaultGreeting, suggestions = defaultSuggestions }: AuraChatProps = {}) => {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "aura", text: greeting }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(t);
  }, []);

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
      {/* Greeting bubble */}
      {!open && showBubble && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[260px] animate-fade-in">
          <button
            onClick={openChat}
            className="relative glass rounded-2xl px-4 py-3 text-left text-sm text-foreground/90 shadow-luxe border border-gold/30 hover:border-gold transition-colors block"
          >
            <span className="block font-serif text-gold text-xs mb-1">NavAura AI</span>
            {greeting}
            <span className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-background border-r border-b border-gold/30" />
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-gold/40 flex items-center justify-center text-foreground/60 hover:text-gold"
            >
              <X className="w-3 h-3" />
            </button>
          </button>
        </div>
      )}

      {/* Floating avatar button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open NavAura AI Assistant"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-luxe ring-2 ring-gold/60 hover:ring-gold hover:scale-105 transition-all animate-gold-pulse bg-background"
      >
        {open ? (
          <span className="flex w-full h-full items-center justify-center bg-gold text-background">
            <X className="w-5 h-5" />
          </span>
        ) : (
          <img
            src={auraAvatar}
            alt="NavAura AI assistant"
            width={128}
            height={128}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden flex flex-col animate-scale-in border border-gold/30 shadow-luxe" style={{ height: 520 }}>
          <div className="px-5 py-4 border-b border-gold/20 flex items-center gap-3 bg-background/60">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gold/50 shrink-0">
              <img src={auraAvatar} alt="NavAura AI" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-sm truncate"><span className="text-gold">NavAura AI</span> <span className="text-foreground/40">|</span> Assistant</div>
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
              placeholder="Ask NavAura AI anything…"
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground px-3 py-2"
            />
            <button type="submit" aria-label="Send" className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center hover:bg-gold-soft transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
