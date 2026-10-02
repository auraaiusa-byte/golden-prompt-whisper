import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  MessageCircle,
  Sparkles,
  X,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAgentConfigForPath,
  getAgentConfigById,
  RouteKey,
  ThemeColor,
} from "@/lib/agent-knowledge";

/* ─── Constants ─────────────────────────────────────────── */
const MIN_WIDTH = 380;
const MAX_WIDTH_PX = 850;
const COMPACT_WIDTH = 400;
const EXPANDED_WIDTH = 780;

const themeClasses: Record<
  ThemeColor,
  {
    text: string;
    border: string;
    surface: string;
    button: string;
    ring: string;
    badge: string;
    cardHover: string;
  }
> = {
  rose: {
    text: "text-agent-medspa",
    border: "border-agent-medspa/40",
    surface: "bg-agent-medspa/10",
    button:
      "bg-agent-medspa text-agent-medspa-foreground hover:bg-agent-medspa/90 shadow-[0_0_20px_rgba(235,160,185,0.35)]",
    ring: "ring-agent-medspa/30",
    badge: "bg-agent-medspa/15 text-agent-medspa border-agent-medspa/30",
    cardHover: "hover:border-agent-medspa/60 hover:bg-agent-medspa/5",
  },
  electric: {
    text: "text-agent-gym",
    border: "border-agent-gym/40",
    surface: "bg-agent-gym/10",
    button:
      "bg-agent-gym text-agent-gym-foreground hover:bg-agent-gym/90 shadow-[0_0_20px_rgba(150,225,50,0.35)]",
    ring: "ring-agent-gym/30",
    badge: "bg-agent-gym/15 text-agent-gym border-agent-gym/30",
    cardHover: "hover:border-agent-gym/60 hover:bg-agent-gym/5",
  },
  gold: {
    text: "text-agent-law",
    border: "border-agent-law/40",
    surface: "bg-agent-law/10",
    button:
      "bg-agent-law text-agent-law-foreground hover:bg-agent-law/90 shadow-[0_0_20px_rgba(212,175,55,0.35)]",
    ring: "ring-agent-law/30",
    badge: "bg-agent-law/15 text-agent-law border-agent-law/30",
    cardHover: "hover:border-agent-law/60 hover:bg-agent-law/5",
  },
};

/* ─── Component ─────────────────────────────────────────── */
export function FloatingAgentWidget({
  industry,
  avatarUrl,
  agentName,
  role,
  greetingMessage,
  themeColor,
}: {
  industry?: RouteKey | "med_spa" | "law_firm";
  avatarUrl?: string;
  agentName?: string;
  role?: string;
  greetingMessage?: string;
  themeColor?: ThemeColor;
}) {
  const { pathname } = useLocation();
  const baseConfig = industry
    ? getAgentConfigById(industry)
    : getAgentConfigForPath(pathname);

  const resolved = {
    ...baseConfig,
    avatarUrl: avatarUrl ?? baseConfig.avatarUrl,
    agentName: agentName ?? baseConfig.agentName,
    role: role ?? baseConfig.tagline,
    greetingMessage: greetingMessage ?? baseConfig.welcomeMessage,
    themeColor: themeColor ?? baseConfig.themeColor,
  };

  const theme = themeClasses[resolved.themeColor];
  const [open, setOpen] = useState(false);

  /* ── Resize state ────────────────────────────────────── */
  const [widgetWidth, setWidgetWidth] = useState(COMPACT_WIDTH);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(COMPACT_WIDTH);

  /** Clamp width between MIN and the viewport-aware MAX */
  const clampWidth = useCallback((w: number) => {
    const maxW = Math.min(MAX_WIDTH_PX, window.innerWidth * 0.9);
    return Math.max(MIN_WIDTH, Math.min(w, maxW));
  }, []);

  /* ── Drag handlers (attached to window) ──────────────── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      // Dragging LEFT edge → moving mouse left widens, right narrows
      const delta = dragStartX.current - e.clientX;
      setWidgetWidth(clampWidth(dragStartWidth.current + delta));
    },
    [clampWidth],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartWidth.current = widgetWidth;
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ew-resize";
    },
    [widgetWidth],
  );

  /* ── Expand / collapse toggle ────────────────────────── */
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      setWidgetWidth(clampWidth(next ? EXPANDED_WIDTH : COMPACT_WIDTH));
      return next;
    });
  }, [clampWidth]);

  /* ── Action dispatcher ───────────────────────────────── */
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
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ width: widgetWidth }}
            className={`relative max-w-[90vw] max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border bg-card/95 shadow-luxe backdrop-blur-2xl transition-[width] duration-200 ease-out ${theme.border}`}
          >
            {/* ── Left-edge drag-to-resize handle ────────── */}
            <div
              role="separator"
              aria-orientation="vertical"
              onMouseDown={startDrag}
              className="absolute left-0 top-0 bottom-0 z-10 w-1.5 cursor-ew-resize group"
            >
              {/* Visible affordance line */}
              <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-transparent group-hover:bg-primary/30 transition-colors" />
            </div>

            {/* ── Header ──────────────────────────────────── */}
            <div
              className={`flex items-center gap-3 border-b px-4 py-3.5 ${theme.border} ${theme.surface}`}
            >
              <div className="relative">
                <img
                  src={resolved.avatarUrl}
                  alt={`${resolved.agentName} avatar`}
                  width={816}
                  height={816}
                  loading="lazy"
                  className={`h-11 w-11 rounded-full border object-cover shadow-sm ${theme.border}`}
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-agent-online" />
              </div>
              <div className="min-w-0 flex-1">
                <h2
                  id="floating-agent-title"
                  className="truncate font-serif text-sm font-medium leading-tight text-foreground"
                >
                  {resolved.persona}
                </h2>
                <p className={`mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.text}`}>
                  {resolved.tagline}
                </p>
              </div>

              {/* Expand / Collapse toggle */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={isExpanded ? "Collapse widget" : "Expand widget"}
                onClick={toggleExpand}
                className="shrink-0 h-8 w-8 rounded-full text-muted-foreground hover:bg-background/50 hover:text-foreground transition-colors"
              >
                {isExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>

              {/* Close */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close assistant preview"
                onClick={() => setOpen(false)}
                className="shrink-0 h-8 w-8 rounded-full text-muted-foreground hover:bg-background/50 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* ── Scrollable Content ──────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-4 space-y-4 text-left">
              {/* Welcome message */}
              <div className="rounded-xl border border-border/40 bg-secondary/30 p-3.5 text-xs leading-relaxed text-foreground/90">
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
                  <Sparkles className={`h-3 w-3 ${theme.text}`} />
                  <span className={theme.text}>Concierge Dispatch</span>
                </div>
                <p>{resolved.greetingMessage}</p>
              </div>

              {/* Quick Service Action Cards */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Quick Service Cards
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider ${theme.text}`}>
                    Tap to Inquire
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {resolved.actionCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() =>
                        sendAction(
                          card.actionType === "book"
                            ? { book: true }
                            : { prompt: card.actionPrompt }
                        )
                      }
                      className={`group relative flex items-start justify-between gap-3 rounded-xl border border-border/50 bg-background/60 p-3 text-left transition-all duration-200 ${theme.cardHover}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                            {card.title}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase ${theme.badge}`}
                          >
                            {card.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Suggestion Chips */}
              <div>
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Frequent Inquiries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resolved.suggestionChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendAction({ prompt: chip })}
                      className={`rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-left text-[11px] font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <Button
                type="button"
                onClick={() => sendAction({ book: true })}
                className={`w-full gap-2 py-3 text-xs font-bold uppercase tracking-wider ${theme.button}`}
              >
                <CalendarDays className="h-4 w-4" />
                {resolved.defaultCta.label}
              </Button>

              {/* Chat trigger link */}
              <button
                type="button"
                onClick={() => sendAction({ prompt: "Hello, I have a few questions." })}
                className="flex w-full items-center justify-center gap-2 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Open full interactive chat with {resolved.firstName}</span>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger circle */}
      <Button
        type="button"
        aria-label={open ? "Close assistant" : `Open ${resolved.agentName}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`relative h-16 w-16 rounded-full border-2 p-1 shadow-luxe transition-transform duration-300 md:h-20 md:w-20 ${theme.border} ${theme.surface} hover:scale-105`}
      >
        <span
          className={`pointer-events-none absolute -inset-1 -z-10 rounded-full border ${theme.border}`}
        />
        <span
          className={`pointer-events-none absolute -inset-2 -z-20 animate-pulse rounded-full ring-4 ${theme.ring}`}
        />
        {open ? (
          <X className={`h-6 w-6 ${theme.text}`} />
        ) : (
          <img
            src={resolved.avatarUrl}
            alt=""
            width={816}
            height={816}
            loading="lazy"
            className="h-full w-full rounded-full object-cover"
          />
        )}
        <span
          className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-agent-online md:h-5 md:w-5"
          aria-label="Online 24/7"
        >
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-foreground" />
        </span>
      </Button>
    </div>
  );
}