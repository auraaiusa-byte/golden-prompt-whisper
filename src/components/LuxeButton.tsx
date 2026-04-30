import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export const LuxeButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 min-h-[48px] text-xs uppercase tracking-luxe transition-all duration-500 overflow-hidden";
    const styles =
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:bg-foreground"
        : "border border-foreground/30 text-foreground hover:border-gold hover:text-gold";
    return (
      <button ref={ref} className={cn(base, styles, className)} {...props}>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <span className="relative">{children}</span>
        <span className="relative inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
      </button>
    );
  }
);
LuxeButton.displayName = "LuxeButton";
