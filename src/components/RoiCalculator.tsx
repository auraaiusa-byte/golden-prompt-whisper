import { useState, useMemo } from "react";
import { LuxeButton } from "./LuxeButton";

export const RoiCalculator = () => {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(45);

  const { weekly, monthly, yearly } = useMemo(() => {
    const w = hours * rate;
    return { weekly: w, monthly: w * 4.33, yearly: w * 52 };
  }, [hours, rate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="roi" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.25), transparent 60%)" }} />
      <div className="container relative max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-luxe text-gold">03 — ROI Intelligence</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
            Calculate your <span className="italic">return</span>.
          </h2>
          <p className="text-muted-foreground font-light text-lg">
            Discover what NavAura AI can recover for you — in hours, in dollars, in life.
          </p>
        </div>

        <div className="luxe-card rounded-sm p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-xs uppercase tracking-luxe text-foreground/70">Manual hours / week on admin</label>
                <span className="font-serif text-2xl text-gold">{hours}h</span>
              </div>
              <input
                type="range" min={1} max={80} value={hours}
                onChange={(e) => setHours(+e.target.value)}
                className="w-full accent-[hsl(var(--gold))] h-1"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-luxe text-muted-foreground mt-2">
                <span>1h</span><span>80h</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-xs uppercase tracking-luxe text-foreground/70">Hourly cost of staff</label>
                <span className="font-serif text-2xl text-gold">${rate}</span>
              </div>
              <input
                type="range" min={15} max={150} value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="w-full accent-[hsl(var(--gold))] h-1"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-luxe text-muted-foreground mt-2">
                <span>$15</span><span>$150</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-l border-gold/20 md:pl-12">
            <div>
              <div className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Estimated savings · weekly</div>
              <div className="font-serif text-4xl text-foreground">{fmt(weekly)}</div>
            </div>
            <div className="hairline" />
            <div>
              <div className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Monthly</div>
              <div className="font-serif text-4xl text-foreground">{fmt(monthly)}</div>
            </div>
            <div className="hairline" />
            <div>
              <div className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">Annual recovery</div>
              <div className="font-serif text-5xl gold-shimmer">{fmt(yearly)}</div>
            </div>
            <a href="#contact" className="block pt-4">
              <LuxeButton className="w-full animate-gold-pulse">Request Private Access</LuxeButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
