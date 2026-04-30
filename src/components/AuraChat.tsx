import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Msg { role: "aura" | "user"; text: string; }

const initial: Msg[] = [
  { role: "aura", text: "Welcome — I'm Aura, NavAura's AI concierge. How may I help automate your business today?" },
];

const suggestions = [
  "Tell me about Med Spa automation",
  "How does pricing work?",
  "Book a strategy call",
];

export const AuraChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    const reply: Msg = {
      role: "aura",
      text: "Lovely — I've noted that. Our team will reach you at aura.usa@gmail.com within a few hours. In the meantime, may I share more about our membership tiers?",
    };
    setMessages((m) => [...m, userMsg, reply]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Aura Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-background shadow-luxe flex items-center justify-center hover:scale-105 transition-transform animate-gold-pulse"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden flex flex-col" style={{ height: 480 }}>
          <div className="px-5 py-4 border-b border-gold/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="font-serif text-gold">A</span>
            </div>
            <div className="flex-1">
              <div className="font-serif text-sm">Aura Assistant</div>
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
                    className="block w-full text-left text-xs px-3 py-2 rounded-full border border-gold/30 text-foreground/80 hover:border-gold hover:text-gold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t border-gold/20 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura anything…"
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
