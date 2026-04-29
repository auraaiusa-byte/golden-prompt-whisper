import { LuxeButton } from "./LuxeButton";

export const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="container flex items-center justify-between h-20">
      <a href="#" className="flex items-center gap-2">
        <span className="font-serif text-2xl tracking-tight">Aurelia</span>
        <span className="text-gold text-xs tracking-luxe uppercase pt-2">AI</span>
      </a>
      <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-luxe text-muted-foreground">
        <a href="#concierge" className="hover:text-gold transition-colors">Concierge</a>
        <a href="#voice" className="hover:text-gold transition-colors">Voice</a>
        <a href="#invitation" className="hover:text-gold transition-colors">Invitation</a>
      </div>
      <LuxeButton variant="ghost" className="hidden md:inline-flex !py-3 !px-6">Request Access</LuxeButton>
    </div>
  </nav>
);
