import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { sendLead } from "@/lib/webhook";
import {
  getAgentConfigForPath,
  matchKnowledgeIntent,
  RouteAgentConfig,
} from "@/lib/agent-knowledge";

export interface ChatMessage {
  id: string;
  role: "aura" | "user";
  text: string;
  topic?: string;
  actionButton?: {
    label: string;
    action: "book" | "prompt" | "lead";
    prompt?: string;
  };
  showCalendlyCta?: boolean;
}

export type ChatMode =
  | "menu"
  | "services"
  | "free-chat"
  | "ai-typing"
  | "lead-name"
  | "lead-email"
  | "lead-processing"
  | "lead-done";

export function useAgentChat(hideLauncher = false) {
  const { pathname } = useLocation();
  const config = useMemo(() => getAgentConfigForPath(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [mode, setMode] = useState<ChatMode>("menu");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [aiTurns, setAiTurns] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "aura",
      text: config.welcomeMessage,
      actionButton: config.defaultCta,
    },
  ]);

  const externalActions = useRef<{
    prompt: (text: string) => void;
    book: () => void;
  }>({
    prompt: () => undefined,
    book: () => undefined,
  });

  // Re-initialize greeting when route/persona changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${config.id}`,
        role: "aura",
        text: config.welcomeMessage,
        actionButton: config.defaultCta,
      },
    ]);
    setMode("menu");
    setInput("");
  }, [config.id, config.welcomeMessage, config.defaultCta]);

  // Listen to global open events from FloatingAgentWidget or other buttons
  useEffect(() => {
    const timer = hideLauncher
      ? undefined
      : window.setTimeout(() => setShowBubble(true), 1500);

    const handler = (event: Event) => {
      const detail = (
        event as CustomEvent<{ prompt?: string; book?: boolean; action?: string }>
      ).detail;
      setOpen(true);
      setShowBubble(false);
      if (detail?.book) {
        externalActions.current.book();
      } else if (detail?.prompt) {
        externalActions.current.prompt(detail.prompt);
      }
    };

    window.addEventListener("aura:open", handler);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("aura:open", handler);
    };
  }, [hideLauncher]);

  const pushAura = (
    text: string,
    opts?: {
      actionButton?: {
        label: string;
        action: "book" | "prompt" | "lead";
        prompt?: string;
      };
      showCalendlyCta?: boolean;
      topic?: string;
    }
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `aura-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "aura",
        text,
        ...opts,
      },
    ]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "user",
        text,
      },
    ]);
  };

  const handleBook = () => {
    pushUser("I want to book a consultation");
    window.setTimeout(() => {
      pushAura("Opening the calendar — choose any slot that works for you.", {
        showCalendlyCta: false,
      });
    }, 200);
    setShowCalendly(true);
  };

  const handleServices = () => {
    pushUser("Tell me about your services");
    setMode("services");
    window.setTimeout(() => {
      pushAura(
        `Here are the core offerings and packages for ${config.tagline}. Select any option to learn more or reserve directly:`,
        {
          actionButton: config.defaultCta,
        }
      );
    }, 250);
  };

  const handleStartLeadCapture = () => {
    pushUser("Capture my info");
    setMode("lead-name");
    window.setTimeout(() => {
      pushAura("Let's get started — what's your full name?", {
        actionButton: undefined,
      });
    }, 300);
  };

  const submitName = () => {
    if (!leadName.trim()) return;
    pushUser(leadName);
    setMode("lead-email");
    window.setTimeout(() => {
      pushAura(
        `Pleasure to meet you, ${leadName.trim().split(" ")[0]}! What is your best email address?`
      );
    }, 300);
  };

  const submitEmail = async () => {
    const rawEmail = leadEmail.trim();
    if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      pushAura("Please enter a valid email address so we can reach you.");
      return;
    }
    const cleanEmail = rawEmail.toLowerCase();
    pushUser(cleanEmail);
    setMode("lead-processing");

    // Clean row insert into Supabase leads table
    try {
      await supabase.from("leads").insert({
        email: cleanEmail,
        source: `Chat · ${config.agentName}`,
      });
    } catch (err) {
      console.error("Lead insert error:", err);
    }

    sendLead({
      source: "chat",
      name: leadName.trim(),
      email: cleanEmail,
      message: `Lead captured via ${config.persona}`,
    }).catch(() => {});

    setLeadCaptured(true);
    window.setTimeout(() => {
      setMode("lead-done");
      pushAura(
        "Information secured! Our team will follow up promptly. Would you like to reserve a priority time slot now?",
        {
          actionButton: {
            label: config.defaultCta.label,
            action: "book",
          },
          showCalendlyCta: true,
        }
      );
    }, 900);
  };

  const askQuestion = async (text: string) => {
    const query = text.trim();
    if (!query) return;

    pushUser(query);
    setInput("");
    setMode("ai-typing");

    // Execute Conversational Intent Engine locally first
    const intentResult = matchKnowledgeIntent(query, config);

    // Non-blocking lead logging
    sendLead({
      source: "chat",
      name: leadName || undefined,
      email: leadEmail || undefined,
      message: query,
      meta: {
        route: config.routePath,
        industry: config.id,
        matchedTopic: intentResult.topic,
      },
    }).catch(() => {});

    // Simulate natural AI response latency (350-500ms)
    window.setTimeout(() => {
      pushAura(intentResult.response, {
        actionButton: intentResult.cta,
        topic: intentResult.topic,
        showCalendlyCta: intentResult.cta.action === "book",
      });

      const nextTurns = aiTurns + 1;
      setAiTurns(nextTurns);

      if (!leadCaptured && nextTurns >= 3) {
        window.setTimeout(() => {
          setMode("lead-name");
          pushAura(
            "Quick question — what is your name so our specialist can personalize your next steps?"
          );
        }, 800);
      } else {
        setMode("free-chat");
      }
    }, 400);
  };

  const handleContextualAction = (action?: {
    label: string;
    action: "book" | "prompt" | "lead";
    prompt?: string;
  }) => {
    if (!action) return;
    if (action.action === "book") {
      setShowCalendly(true);
    } else if (action.action === "prompt" && action.prompt) {
      void askQuestion(action.prompt);
    } else if (action.action === "lead") {
      setMode("lead-name");
      pushAura("Let's get started — what's your full name?");
    }
  };

  externalActions.current = {
    prompt: (text: string) => {
      void askQuestion(text);
    },
    book: handleBook,
  };

  return {
    config,
    open,
    setOpen,
    showBubble,
    setShowBubble,
    showCalendly,
    setShowCalendly,
    mode,
    setMode,
    leadName,
    setLeadName,
    leadEmail,
    setLeadEmail,
    leadCaptured,
    input,
    setInput,
    messages,
    askQuestion,
    handleBook,
    handleServices,
    handleStartLeadCapture,
    submitName,
    submitEmail,
    handleContextualAction,
  };
}
