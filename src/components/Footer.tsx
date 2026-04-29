export const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <span className="font-serif text-xl">Aurelia</span>
        <span className="text-gold text-[10px] tracking-luxe uppercase pt-1">AI</span>
      </div>
      <p className="text-xs uppercase tracking-luxe text-muted-foreground">
        Crafted in Manhattan · For the world's finest clinics
      </p>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Aurelia Intelligence</p>
    </div>
  </footer>
);
