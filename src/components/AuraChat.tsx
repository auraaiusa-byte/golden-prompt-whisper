import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Calendar,
  Check,
  Loader2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { useAgentChat } from "@/hooks/useAgentChat";

const CALENDLY_URL =
  (import.meta.env.VITE_CALENDLY_URL as string) ||
  "https://calendly.com/auraai-usa/30min";

export const AuraChat = ({ hideLauncher = false }: { hideLauncher?: boolean }) => {
  const {
    config,
    open,
    setOpen,
    showBubble,
    setShowBubble,
    showCalendly,
    setShowCalendly,
    mode,
    leadName,
    setLeadName,
    leadEmail,
    setLeadEmail,
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
  } = useAgentChat(hideLauncher);

  const [hovering, setHovering] = useState(false);

  const submit = ({ text }: { text: string }) => {
    if (mode === "lead-name") return submitName();
    if (mode === "lead-email") return submitEmail();
    return askQuestion(text);
  };

  return (
    <>
      {/* Floating Preview Bubble for Home/Direct Launcher */}
      <AnimatePresence>
        {!hideLauncher && !open && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="fixed bottom-32 right-6 z-50 hidden w-[min(340px,calc(100vw-2rem))] sm:block"
          >
            <div className="relative rounded-2xl border border-primary/40 bg-card/95 px-4 py-4 text-left text-sm text-foreground shadow-luxe backdrop-blur-xl">
              <Button
                onClick={() => setShowBubble(false)}
                variant="ghost"
                size="icon"
                aria-label="Dismiss assistant preview"
                className="absolute right-1 top-1 h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3 w-3" />
                <span>{config.tagline}</span>
              </div>
              <p className="mt-2 pr-4 text-xs leading-relaxed text-foreground/90">
                {config.welcomeMessage}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setOpen(true);
                    setShowBubble(false);
                    askQuestion(config.suggestionChips[0]);
                  }}
                  variant="outline"
                  size="sm"
                  className="h-auto rounded-full border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] text-primary hover:bg-primary/10"
                >
                  {config.suggestionChips[0]}
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setShowBubble(false);
                    handleBook();
                  }}
                  size="sm"
                  className="h-auto rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                >
                  {config.defaultCta.label}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button for Home Route */}
      {!hideLauncher && (
        <motion.button
          onClick={() => {
            setOpen((value) => !value);
            setShowBubble(false);
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          aria-label={`Open ${config.persona}`}
          className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-transparent outline-none md:bottom-6 md:right-6 md:h-20 md:w-20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.92 }}
        >
          <span
            aria-hidden
            className="absolute -inset-3 rounded-full bg-primary/25 blur-xl"
          />
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full border border-primary/35"
          />
          <span
            aria-hidden
            className="absolute -inset-2 animate-pulse rounded-full ring-4 ring-primary/15"
          />
          {open ? (
            <span className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary/50 bg-primary text-primary-foreground shadow-luxe">
              <X className="h-6 w-6" />
            </span>
          ) : (
            <motion.span
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-primary/60 bg-card p-1 shadow-luxe"
              animate={
                hovering
                  ? { rotate: [0, -8, 8, 0], scale: 1.06 }
                  : { rotate: [0, -2, 2, 0] }
              }
              transition={
                hovering
                  ? { duration: 0.9 }
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img
                src={config.avatarUrl}
                alt={`${config.firstName} avatar`}
                width={816}
                height={816}
                loading="lazy"
                className={`h-full w-full rounded-full ${
                  config.id === "home" ? "object-contain" : "object-cover"
                }`}
              />
            </motion.span>
          )}
          <span
            className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-agent-online md:h-5 md:w-5"
            aria-label="Online 24/7"
          >
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-foreground" />
          </span>
        </motion.button>
      )}

      {/* Main Interactive Chat Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden border border-primary/40 bg-background/95 shadow-luxe backdrop-blur-xl sm:inset-auto sm:bottom-32 sm:right-6 sm:h-[620px] sm:max-h-[calc(100vh-10rem)] sm:w-[420px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-primary/20 bg-background/80 px-4 py-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-card shadow-luxe">
                <img
                  src={config.avatarUrl}
                  alt={`${config.firstName} avatar`}
                  width={816}
                  height={816}
                  loading="lazy"
                  className={`h-full w-full ${
                    config.id === "home" ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-serif text-sm font-medium text-foreground">
                  {config.persona}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-primary truncate">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shrink-0" />
                  <span className="truncate">{config.tagline}</span>
                </div>
              </div>
              <Button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Conversation Area */}
            <Conversation className="flex-1 overflow-y-auto">
              <ConversationContent className="gap-3 p-4">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    from={message.role === "aura" ? "assistant" : "user"}
                    className="max-w-[90%]"
                  >
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-primary px-4 py-2.5 text-xs text-primary-foreground rounded-2xl"
                          : "px-1 py-1 text-xs leading-relaxed text-foreground"
                      }
                    >
                      <MessageResponse>{message.text}</MessageResponse>
                    </MessageContent>

                    {/* Contextual Action Button */}
                    {message.role === "aura" && message.actionButton && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleContextualAction(message.actionButton)}
                          className="inline-flex h-auto items-center gap-1.5 rounded-full bg-primary/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary"
                        >
                          <Sparkles className="h-3 w-3 text-gold" />
                          {message.actionButton.label}
                        </Button>
                      </div>
                    )}
                  </Message>
                ))}

                {mode === "ai-typing" && (
                  <div className="inline-flex items-center gap-2 px-1 py-2 text-xs text-primary">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {config.firstName} is analyzing knowledge base…
                  </div>
                )}

                {/* Route-Specific Action Cards View */}
                {mode === "services" && (
                  <div className="space-y-2 pt-1">
                    <div className="px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Service Configurations
                    </div>
                    {config.actionCards.map((service) => (
                      <div
                        key={service.id}
                        className="rounded-xl border border-primary/25 bg-card/75 p-3 text-left transition-colors hover:border-primary/50"
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="font-serif text-xs font-semibold text-primary">
                            {service.title}
                          </div>
                          <div className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-primary uppercase">
                            {service.badge}
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <Button
                          onClick={() =>
                            service.actionType === "book"
                              ? handleBook()
                              : askQuestion(service.actionPrompt)
                          }
                          size="sm"
                          variant="ghost"
                          className="mt-2 h-7 w-full justify-center gap-1 rounded-lg border border-primary/20 bg-background/50 text-[10px] font-semibold uppercase tracking-wider text-primary hover:bg-primary/10"
                        >
                          {service.ctaLabel}
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={handleBook}
                      className="mt-2 inline-flex h-auto w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-luxe text-primary-foreground hover:bg-primary/90"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      {config.defaultCta.label}
                    </Button>
                  </div>
                )}

                {mode === "lead-processing" && (
                  <div className="flex items-center gap-2 pt-1 text-xs text-primary">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Securing your lead details…
                  </div>
                )}

                {mode === "lead-done" && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-medium text-primary">
                    <Check className="h-3.5 w-3.5" />
                    Lead saved · our specialist will be in touch
                  </div>
                )}

                {/* Quick Actions Row */}
                {(mode === "menu" || mode === "free-chat" || mode === "lead-done") && (
                  <div className="space-y-2 pt-3">
                    <div className="px-1 text-[10px] uppercase tracking-luxe text-muted-foreground">
                      Quick Actions
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {[
                        {
                          icon: BriefcaseBusiness,
                          label: "Services",
                          onClick: handleServices,
                        },
                        {
                          icon: Calendar,
                          label: "Book Call",
                          onClick: handleBook,
                        },
                        {
                          icon: Zap,
                          label: "Fast Intake",
                          onClick: handleStartLeadCapture,
                        },
                      ].map(({ icon: Icon, label, onClick }) => (
                        <Button
                          key={label}
                          onClick={onClick}
                          variant="ghost"
                          className="h-auto w-full justify-center gap-1.5 rounded-full border border-primary/20 bg-card/60 px-2 py-2 text-center text-[11px] text-foreground hover:bg-primary/10 hover:text-primary"
                        >
                          <Icon className="h-3 w-3 text-primary shrink-0" />
                          <span>{label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </ConversationContent>
            </Conversation>

            {/* Quick Suggestion Chips Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-t border-primary/15 bg-background/60 px-3 py-2 scrollbar-none">
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Ask:
              </span>
              {config.suggestionChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => askQuestion(chip)}
                  disabled={mode === "ai-typing" || mode === "lead-processing"}
                  className="shrink-0 rounded-full border border-primary/25 bg-card/70 px-2.5 py-1 text-[11px] font-medium text-foreground/80 hover:border-primary hover:bg-primary/10 hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Prompt Input Form */}
            <PromptInput
              onSubmit={submit}
              className="border-0 border-t border-primary/20 bg-background/80 p-3"
            >
              <PromptInputTextarea
                value={
                  mode === "lead-name"
                    ? leadName
                    : mode === "lead-email"
                    ? leadEmail
                    : input
                }
                onChange={(event) => {
                  const val = event.target.value;
                  if (mode === "lead-name") setLeadName(val);
                  else if (mode === "lead-email") setLeadEmail(val);
                  else setInput(val);
                }}
                disabled={mode === "ai-typing" || mode === "lead-processing"}
                placeholder={
                  mode === "lead-name"
                    ? "Type your name…"
                    : mode === "lead-email"
                    ? "Type your email address…"
                    : `Ask ${config.firstName} anything…`
                }
                className="min-h-11 border-0 bg-transparent px-2 py-1.5 text-xs text-foreground focus-visible:ring-0 placeholder:text-muted-foreground"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={
                    mode === "ai-typing" || mode === "lead-processing"
                      ? "submitted"
                      : undefined
                  }
                  disabled={mode === "ai-typing" || mode === "lead-processing"}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                />
              </PromptInputFooter>
            </PromptInput>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly Booking Modal */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setShowCalendly(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-primary/40 bg-background shadow-luxe"
            >
              <Button
                onClick={() => setShowCalendly(false)}
                aria-label="Close calendar"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 rounded-full border border-primary/30 bg-background text-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </Button>
              <iframe
                src={CALENDLY_URL}
                title={config.bookingTitle}
                className="h-full w-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
