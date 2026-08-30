import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border py-12 bg-background">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <span className="font-serif text-xl">NavAura</span>
        <span className="text-gold text-[10px] tracking-luxe uppercase pt-1">AI</span>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground text-center flex flex-wrap items-center justify-between gap-2">
        <span>© 2026 NavAura AI. All rights reserved.</span>
        <span className="text-gold/40 hidden md:inline">|</span>
        <Link to="/med-spa" className="hover:text-gold transition-colors">Med-Spa</Link>
        <span className="text-gold/40">·</span>
        <Link to="/gym" className="hover:text-gold transition-colors">Gym</Link>
        <span className="text-gold/40">·</span>
        <Link to="/law" className="hover:text-gold transition-colors">Law</Link>
        <span className="text-gold/40 hidden md:inline">|</span>
        <span className="flex items-center gap-2">
          Contact:
          <a
            href="mailto:aura.usa@gmail.com"
            className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-gold transition-colors group"
          >
            <Mail className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
            <span className="border-b border-gold/30 group-hover:border-gold pb-0.5">aura.usa@gmail.com</span>
          </a>
        </span>
      </p>
    </div>
  </footer>
);
