import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Industry } from "@/components/IndustryExperience";
import elenaAvatar from "@/assets/elena-avatar.jpg";
import marcusAvatar from "@/assets/marcus-avatar.jpg";
import arthurAvatar from "@/assets/arthur-avatar.jpg";

type ThemeColor = "rose" | "electric" | "gold";

type AgentConfig = {
  avatarUrl: string;
  agentName: string;
  role: string;
  greetingMessage: string;
  themeColor: ThemeColor;
  prompts: string[];
  bookingLabel: string;
};

const agentDefaults: Record<Industry, AgentConfig> = {
  medspa: {
    avatarUrl: elenaAvatar,
    agentName: "Aura Aesthetic Concierge",
    role: "Patient coordinator · Online",
    greetingMessage: "Welcome! I can help with treatments, consultations, and appointment options.",
    themeColor: "rose",
    prompts: ["Explore treatment booking", "Consultation options", "Treatment FAQs"],
    bookingLabel: "Book a consultation",
  },
  gym: {
    avatarUrl: marcusAvatar,
    agentName: "Aura Fitness Coach",
    role: "Membership specialist · Online",
    greetingMessage: "Ready to get started? I can help with a free pass, class times, or membership options.",
    themeColor: "electric",
    prompts: ["Book a free pass", "Class timings", "Membership options"],
    bookingLabel: "Book a free pass",
  },
  law: {
    avatarUrl: arthurAvatar,
    agentName: "Aura Legal Intake Specialist",
    role: "Confidential intake · Online",
    greetingMessage: "Good day. I can help arrange an initial evaluation or explain the intake process.",
    themeColor: "gold",
    prompts: ["Schedule case evaluation", "Inquire about retainers", "Is intake confidential?"],
    bookingLabel: "Schedule an evaluation",
  },
};

const themeClasses: Record<ThemeColor, { text: string; border: string; surface: string; button: string; ring: string }> = {
  rose: { text: "text-agent-medspa", border: "border-agent-medspa/40", surface: "bg-agent-medspa/10", button: "bg-agent-medspa text-agent-medspa-foreground hover:bg-agent-medspa/90", ring: "ring-agent-medspa/30" },
  electric: { text: "text-agent-gym", border: "border-agent-gym/40", surface: "bg-agent-gym/10", button: "bg-agent-gym text-agent-gym-foreground hover:bg-agent-gym/90", ring: "ring-agent-gym/30" },
  gold: { text: "text-agent-law", border: "border-agent-law/40", surface: "bg-agent-law/10", button: "bg-agent-law text-agent-law-foreground hover:bg-agent-law/90", ring: "ring-agent-law/30" },
};

export function FloatingAgentWidget({
  industry,
  avatarUrl,
  agentName,
  role,
  greetingMessage,
  themeColor,
}: {
  industry: Industry;
  avatarUrl?: string;
  agentName?: string;
  role?: string;
  greetingMessage?: string;
  themeColor?: ThemeColor;
}) {
  const defaults = agentDefaults[industry];
  const resolved = {
    ...defaults,
    avatarUrl: avatarUrl ?? defaults.avatarUrl,
    agentName: agentName ?? defaults.agentName,
    role: role ?? defaults.role,
    greetingMessage: greetingMessage ?? defaults.greetingMessage,
    themeColor: themeColor ?? defaults.themeColor,
  };
  const theme = themeClasses[resolved.themeColor];
  const [open, setOpen] = useState(false);

  const sendAction = (action: { prompt?: string; book?: boolean }) => {
    window.dispatchEvent(new CustomEvent("aura:open", { detail: action }));
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-labelledby="floating-agent-title"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`w-[min(360px,calc(100vw-2rem))] overflow-hidden border bg-card/95 shadow-luxe backdrop-blur-xl ${theme.border}`}
          >
            <div className={`flex items-center gap-3 border-b px-4 py-4 ${theme.border} ${theme.surface}`}>
              <img src={resolved.avatarUrl} alt={`${resolved.agentName} avatar`} width={816} height={816} loading="lazy" className={`h-12 w-12 rounded-full border object-cover ${theme.border}`} />
              <div className="min-w-0 flex-1">
                <h2 id="floating-agent-title" className="font-serif text-sm leading-snug text-foreground">{resolved.agentName}</h2>
                <p className={`mt-1 text-[10px] uppercase tracking-[0.15em] ${theme.text}`}>{resolved.role}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label="Close assistant" onClick={() => setOpen(false)} className="shrink-0 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></Button>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-foreground">{resolved.greetingMessage}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {defaults.prompts.map((prompt) => (
                  <Button key={prompt} type="button" variant="outline" size="sm" onClick={() => sendAction({ prompt })} className={`h-auto min-h-8 whitespace-normal rounded-full px-3 py-1.5 text-left text-xs leading-snug ${theme.border} ${theme.text} hover:opacity-80`}>
                    {prompt}
                  </Button>
                ))}
              </div>
              <Button type="button" onClick={() => sendAction({ book: true })} className={`mt-4 w-full gap-2 ${theme.button}`}>
                <CalendarDays className="h-4 w-4" />{defaults.bookingLabel}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground"><MessageCircle className="h-3 w-3" />Continue in the NavAura assistant</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <Button
        type="button"
        aria-label={open ? "Close industry assistant" : `Open ${resolved.agentName}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`relative h-14 w-14 rounded-full border p-0 shadow-luxe ${theme.border} ${theme.surface} hover:scale-105`}
      >
        <span className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-agent-online`} aria-label="Online" />
        {open ? <X className={`h-5 w-5 ${theme.text}`} /> : <img src={resolved.avatarUrl} alt="" width={816} height={816} loading="lazy" className="h-full w-full rounded-full object-cover" />}
        <span className={`pointer-events-none absolute inset-0 -z-10 animate-pulse rounded-full ring-4 ${theme.ring}`} />
      </Button>
    </div>
  );
}