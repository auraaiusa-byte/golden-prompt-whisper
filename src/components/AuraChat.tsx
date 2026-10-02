import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Calendar, Check, Loader2, X, Zap } from "lucide-react";
import navRobot from "@/assets/nav-robot.png";
import elenaAvatar from "@/assets/elena-avatar.jpg";
import marcusAvatar from "@/assets/marcus-avatar.jpg";
import arthurAvatar from "@/assets/arthur-avatar.jpg";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";

type Msg = { role: "aura" | "user"; text: string; showCalendlyCta?: boolean };
type Mode = "menu" | "services" | "free-chat" | "ai-typing" | "lead-name" | "lead-email" | "lead-processing" | "lead-done";

type Persona = {
  id: string;
  name: string;
  subtitle: string;
  greeting: string;
  firstName: string;
  avatar: string;
};

const PERSONAS: Record<string, Persona> = {
  home: {
    id: "home",
    name: "Nav | AI Automation Specialist",
    subtitle: "ONLINE · HYBRID AI",
    greeting: "Hi, I'm Nav — your NavAura AI assistant. Ask me anything about our autonomous agents.",
    firstName: "Nav",
    avatar: navRobot,
  },
  medspa: {
    id: "medspa",
    name: "Elena | Med-Spa Patient Coordinator",
    subtitle: "24/7 PATIENT CONCIERGE",
    greeting: "Welcome! How can I assist with your aesthetic treatments or consultation booking today?",
    firstName: "Elena",
    avatar: elenaAvatar,
  },
  gym: {
    id: "gym",
    name: "Marcus | Fitness Membership Specialist",
    subtitle: "ELITE PERFORMANCE CONCIERGE",
    greeting: "Ready to crush your goals? Ask about our passes, training tiers, or book a free trial!",
    firstName: "Marcus",
    avatar: marcusAvatar,
  },
  law: {
    id: "law",
    name: "Arthur | Legal Intake Associate",
    subtitle: "CONFIDENTIAL CLIENT INTAKE",
    greeting: "Good day. How may I assist with your initial case assessment or consultation scheduling?",
    firstName: "Arthur",
    avatar: arthurAvatar,
  },
};

const personaForPath = (pathname: string): Persona => {
  if (pathname.startsWith("/med-spa")) return PERSONAS.medspa;
  if (pathname.startsWith("/gym")) return PERSONAS.gym;
  if (pathname.startsWith("/law") || pathname.startsWith("/legal")) return PERSONAS.law;
  return PERSONAS.home;
};

const SERVICES = [
  { title: "Med-Spa AI Receptionist", price: "From $1,997/mo", desc: "24/7 patient intake, treatment FAQ management, and instant Calendly booking." },
  { title: "Gym Membership Closer", price: "From $1,497/mo", desc: "Automated trial pass scheduling, membership qualification, and lost-lead reactivation." },
  { title: "Law Firm Intake Agent", price: "From $2,497/mo", desc: "24/7 confidential case triage, client pre-qualification, and consultation scheduling." },
];

const CALENDLY_URL = (import.meta.env.VITE_CALENDLY_URL as string) || "https://calendly.com/auraai-usa/30min";

export const AuraChat = ({ hideLauncher = false }: { hideLauncher?: boolean }) => {
  const { pathname } = useLocation();
  const persona = useMemo(() => personaForPath(pathname), [pathname]);
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [aiTurns, setAiTurns] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([{ role: "aura", text: persona.greeting }]);
  const externalActions = useRef<{ prompt: (text: string) => void; book: () => void }>({ prompt: () => undefined, book: () => undefined });

  useEffect(() => {
    setMessages([{ role: "aura", text: persona.greeting }]);
    setMode("menu");
    setInput("");
  }, [persona.greeting]);

  useEffect(() => {
    const timer = hideLauncher ? undefined : window.setTimeout(() => setShowBubble(true), 1500);
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ prompt?: string; book?: boolean }>).detail;
      setOpen(true);
      setShowBubble(false);
      if (detail?.book) externalActions.current.book();
      else if (detail?.prompt) externalActions.current.prompt(detail.prompt);
    };
    window.addEventListener("aura:open", handler);
    return () => { if (timer !== undefined) window.clearTimeout(timer); window.removeEventListener("aura:open", handler); };
  }, [hideLauncher]);

  const pushAura = (text: string, opts?: { showCalendlyCta?: boolean }) => setMessages((items) => [...items, { role: "aura", text, ...opts }]);
  const pushUser = (text: string) => setMessages((items) => [...items, { role: "user", text }]);

  const handleServices = () => {
    pushUser("Tell me about your services");
    setMode("services");
    window.setTimeout(() => pushAura("Here are NavAura's official niche AI automation packages — choose one to learn more or book a call."), 300);
  };
  const handleBook = () => {
    pushUser("I want to book a consultation");
    window.setTimeout(() => pushAura("Opening the calendar — pick any time that works for you."), 200);
    setShowCalendly(true);
  };
  const handleTestLead = () => {
    pushUser("Capture my info");
    setMode("lead-name");
    window.setTimeout(() => pushAura("Let's go — what's your name?"), 300);
  };
  const submitName = () => {
    if (!leadName.trim()) return;
    pushUser(leadName);
    setMode("lead-email");
    window.setTimeout(() => pushAura(`Nice to meet you, ${leadName.split(" ")[0]}! What's your best email?`), 300);
  };
  const submitEmail = async () => {
    const email = leadEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushAura("That doesn't look like a valid email — please try again.");
      return;
    }
    pushUser(email);
    setMode("lead-processing");
    await supabase.from("leads").insert({ email, source: `Chat · ${leadName || "Aura"}`, lead_status: "new" });
    sendLead({ source: "chat", name: leadName, email, message: "Lead captured via Aura chat" }).catch(() => {});
    setLeadCaptured(true);
    window.setTimeout(() => {
      setMode("lead-done");
      pushAura("Got it! Our team will reach out shortly. Want to lock in a strategy slot now?", { showCalendlyCta: true });
    }, 1200);
  };
  const askAI = async (text: string) => {
    if (!text.trim()) return;
    pushUser(text);
    setInput("");
    setMode("ai-typing");
    try {
      const { data, error } = await supabase.functions.invoke("aura-chat", { body: { message: text, history: messages.slice(-6), industry: persona.id } });
      sendLead({ source: "chat", name: leadName || undefined, email: leadEmail || undefined, message: text, meta: { type: "custom-question", reply: data?.reply } }).catch(() => {});
      pushAura(error || !data?.reply ? "I had trouble reaching the AI. Try again, or book a call below." : data.reply, { showCalendlyCta: true });
      const nextTurns = aiTurns + 1;
      setAiTurns(nextTurns);
      if (!leadCaptured && nextTurns >= 2) {
        window.setTimeout(() => { setMode("lead-name"); pushAura("Quick one — what's your name? I'll personalize the next steps."); }, 700);
      } else setMode("free-chat");
    } catch {
      pushAura("Connection hiccup. Try again in a moment.", { showCalendlyCta: true });
      setMode("free-chat");
    }
  };

  const submit = ({ text }: { text: string }) => {
    if (mode === "lead-name") return submitName();
    if (mode === "lead-email") return submitEmail();
    return askAI(text);
  };
  externalActions.current = { prompt: (text) => { void askAI(text); }, book: handleBook };

  return <>
    <AnimatePresence>
      {!hideLauncher && !open && showBubble && <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="fixed bottom-28 right-4 z-50 max-w-[270px] lg:hidden">
        <button onClick={() => { setOpen(true); setShowBubble(false); }} className="relative block rounded-2xl border border-primary/40 bg-background/95 px-4 py-3 text-left text-sm text-foreground shadow-luxe backdrop-blur-xl">
          <span className="mb-1 block text-xs text-primary">{persona.firstName}</span>{persona.greeting}
          <span onClick={(event) => { event.stopPropagation(); setShowBubble(false); }} role="button" aria-label="Dismiss" className="absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-background text-muted-foreground"><X className="h-3 w-3" /></span>
        </button>
      </motion.div>}
    </AnimatePresence>

    {!hideLauncher && <motion.button onClick={() => { setOpen((value) => !value); setShowBubble(false); }} onHoverStart={() => setHovering(true)} onHoverEnd={() => setHovering(false)} aria-label={`Open ${persona.name}`} className="fixed bottom-4 right-4 z-50 flex h-20 w-20 items-center justify-center bg-transparent outline-none lg:hidden" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} whileTap={{ scale: 0.92 }}>
      <span aria-hidden className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
      {open ? <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-luxe"><X className="h-6 w-6" /></span> : <motion.span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-primary/50 bg-card shadow-luxe" animate={hovering ? { rotate: [0, -8, 8, 0], scale: 1.06 } : { rotate: [0, -2, 2, 0] }} transition={hovering ? { duration: 0.9 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}><img src={persona.avatar} alt={`${persona.firstName} avatar`} width={816} height={816} loading="lazy" className={`h-full w-full ${persona.id === "home" ? "object-contain" : "object-cover"}`} /></motion.span>}
    </motion.button>}

    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed inset-0 z-50 flex flex-col overflow-hidden border border-primary/40 bg-background/95 shadow-luxe backdrop-blur-xl sm:inset-auto sm:bottom-32 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-10rem)] sm:w-[400px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl">
      <div className="flex items-center gap-3 border-b border-primary/20 bg-background/80 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-card shadow-luxe"><img src={persona.avatar} alt={`${persona.firstName} avatar`} width={816} height={816} loading="lazy" className={`h-full w-full ${persona.id === "home" ? "object-contain" : "object-cover"}`} /></div>
        <div className="min-w-0 flex-1"><div className="truncate font-serif text-sm text-foreground">{persona.name}</div><div className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />{persona.subtitle}</div></div>
        <Button onClick={() => setOpen(false)} aria-label="Close chat" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"><X className="h-4 w-4" /></Button>
      </div>
      <Conversation className="flex-1"><ConversationContent className="gap-3 p-4">
        {messages.map((message, index) => <Message key={index} from={message.role === "aura" ? "assistant" : "user"} className="max-w-[90%]"><MessageContent className={message.role === "user" ? "bg-primary px-4 py-3 text-primary-foreground" : "px-1 py-1 text-foreground"}><MessageResponse>{message.text}</MessageResponse></MessageContent>{message.showCalendlyCta && <Button onClick={() => setShowCalendly(true)} className="mt-2 inline-flex h-auto items-center gap-2 self-start rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-luxe text-primary-foreground shadow-luxe hover:bg-primary/90"><Calendar className="h-3.5 w-3.5" />Book Strategy Call</Button>}</Message>)}
        {mode === "ai-typing" && <div className="inline-flex items-center gap-2 px-1 py-2 text-xs text-primary"><Loader2 className="h-3.5 w-3.5 animate-spin" />{persona.firstName} is thinking…</div>}
        {mode === "services" && <div className="space-y-2 pt-1">{SERVICES.map((service) => <div key={service.title} className="rounded-xl border border-primary/20 bg-card/70 p-3"><div className="mb-1 flex items-center justify-between gap-2"><div className="font-serif text-sm text-primary">{service.title}</div><div className="shrink-0 text-[10px] uppercase tracking-luxe text-muted-foreground">{service.price}</div></div><p className="text-xs leading-relaxed text-muted-foreground">{service.desc}</p></div>)}<Button onClick={handleBook} className="mt-2 inline-flex h-auto w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-luxe text-primary-foreground hover:bg-primary/90"><Calendar className="h-3.5 w-3.5" />Book a Consultation</Button></div>}
        {mode === "lead-processing" && <div className="flex items-center gap-2 pt-1 text-xs text-primary"><Loader2 className="h-3.5 w-3.5 animate-spin" />Securing your lead…</div>}
        {mode === "lead-done" && <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs text-primary"><Check className="h-3.5 w-3.5" />Lead saved · we'll be in touch</div>}
        {(mode === "menu" || mode === "free-chat" || mode === "lead-done") && <div className="space-y-2 pt-3"><div className="px-1 text-[10px] uppercase tracking-luxe text-muted-foreground">Quick Actions</div>{[{ icon: BriefcaseBusiness, label: "Our Services", onClick: handleServices }, { icon: Calendar, label: "Book Consultation", onClick: handleBook }, { icon: Zap, label: "Capture My Info", onClick: handleTestLead }].map(({ icon: Icon, label, onClick }) => <Button key={label} onClick={onClick} variant="ghost" className="h-auto w-full justify-start gap-2 rounded-full border border-primary/20 bg-card/60 px-3 py-2.5 text-left text-xs text-foreground hover:bg-primary/10 hover:text-primary"><Icon className="h-3.5 w-3.5 text-primary" />{label}</Button>)}</div>}
      </ConversationContent></Conversation>
      <PromptInput onSubmit={submit} className="border-0 border-t border-primary/20 bg-background/80 p-3"><PromptInputTextarea value={mode === "lead-name" ? leadName : mode === "lead-email" ? leadEmail : input} onChange={(event) => { const value = event.target.value; if (mode === "lead-name") setLeadName(value); else if (mode === "lead-email") setLeadEmail(value); else setInput(value); }} disabled={mode === "ai-typing" || mode === "lead-processing"} placeholder={mode === "lead-name" ? "Type your name…" : mode === "lead-email" ? "Type your email…" : `Ask ${persona.firstName} anything…`} className="min-h-12 border-0 bg-transparent px-2 py-2 text-sm focus-visible:ring-0" /><PromptInputFooter className="justify-end"><PromptInputSubmit status={mode === "ai-typing" || mode === "lead-processing" ? "submitted" : undefined} disabled={mode === "ai-typing" || mode === "lead-processing"} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90" /></PromptInputFooter></PromptInput>
    </motion.div>}</AnimatePresence>
    <AnimatePresence>{showCalendly && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onClick={() => setShowCalendly(false)}><motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(event) => event.stopPropagation()} className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-primary/40 bg-background shadow-luxe"><Button onClick={() => setShowCalendly(false)} aria-label="Close calendar" variant="ghost" size="icon" className="absolute right-3 top-3 z-10 rounded-full border border-primary/30 bg-background text-foreground"><X className="h-4 w-4" /></Button><iframe src={CALENDLY_URL} title="Book a consultation" className="h-full w-full border-0" /></motion.div></motion.div>}</AnimatePresence>
  </>;
};
