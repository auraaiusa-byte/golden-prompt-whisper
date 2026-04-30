import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LuxeButton } from "./LuxeButton";

export const ExitIntent = () => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("navaura_exit_shown")) return;
    const handler = (e: MouseEvent) => {
      if (!shown && e.clientY <= 0) {
        setOpen(true);
        setShown(true);
        sessionStorage.setItem("navaura_exit_shown", "1");
      }
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, [shown]);

  if (!open) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const subject = encodeURIComponent("NavAura — Wait! 20+ hours request");
    const body = encodeURIComponent(`Email: ${email}\n\nI'd like to see how NavAura saves 20+ hours a week.`);
    window.location.href = `mailto:aura.usa@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full glass rounded-2xl p-10 border border-gold/40">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted-foreground hover:text-gold"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-xs uppercase tracking-luxe text-gold">Wait —</span>
        <h3 className="font-serif text-3xl mt-4 mb-4 leading-tight">
          Want to see how NavAura can save you <span className="italic text-gold">20+ hours</span> a week?
        </h3>
        <p className="text-sm text-muted-foreground font-light mb-6">
          Leave your email and we'll send a private 3-minute walkthrough tailored to your industry.
        </p>
        {submitted ? (
          <p className="text-sm text-gold">Thank you — your inquiry has been routed to aura.usa@gmail.com.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              required
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold placeholder:text-muted-foreground"
            />
            <LuxeButton className="w-full animate-gold-pulse">Request Private Access</LuxeButton>
          </form>
        )}
      </div>
    </div>
  );
};
