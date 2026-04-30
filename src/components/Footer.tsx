import { Mail } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-16 bg-background">
    <div className="container grid md:grid-cols-3 gap-8 items-center">
      <div className="flex items-center gap-2 justify-center md:justify-start">
        <span className="font-serif text-xl">NavAura</span>
        <span className="text-gold text-[10px] tracking-luxe uppercase pt-1">AI</span>
      </div>

      <a
        href="mailto:aura.usa@gmail.com"
        className="flex items-center justify-center gap-3 text-sm text-foreground/80 hover:text-gold transition-colors group"
      >
        <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
        <span className="border-b border-gold/30 group-hover:border-gold pb-0.5">aura.usa@gmail.com</span>
      </a>

      <p className="text-xs text-muted-foreground text-center md:text-right">
        © {new Date().getFullYear()} NavAura AI · Unified Intelligence
      </p>
    </div>
  </footer>
);
