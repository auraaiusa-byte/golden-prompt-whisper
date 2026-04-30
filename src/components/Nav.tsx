import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LuxeButton } from "./LuxeButton";

const links = [
  { to: "/med-spa", label: "Med Spa" },
  { to: "/legal-automation", label: "Law" },
  { to: "/gym-growth", label: "Gym" },
  { to: "/demo-dashboard", label: "Demo" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const ctaHref = pathname === "/" ? "#contact" : "/#contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl tracking-tight">NavAura</span>
          <span className="text-gold text-xs tracking-luxe uppercase pt-2">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-luxe text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors ${pathname === l.to ? "text-gold" : "hover:text-gold"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a href={ctaHref} className="hidden md:inline-flex">
          <LuxeButton variant="ghost" className="!py-3 !px-6">Request Private Access</LuxeButton>
        </a>

        <button
          className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <div className="container py-6 flex flex-col gap-4 text-sm uppercase tracking-luxe">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`py-2 ${pathname === l.to ? "text-gold" : "text-muted-foreground hover:text-gold"}`}
              >
                {l.label}
              </Link>
            ))}
            <a href={ctaHref} onClick={() => setOpen(false)} className="pt-2">
              <LuxeButton variant="ghost" className="w-full !py-3">Request Private Access</LuxeButton>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
