import { Search, Cpu, TrendingUp } from "lucide-react";

const steps = [
  { n: "01", Icon: Search, title: "Audit", desc: "We map every leak in your funnel — missed calls, ghosted DMs, abandoned intake forms — and quantify the silent losses." },
  { n: "02", Icon: Cpu, title: "Deploy", desc: "Our team builds and trains industry-specific NavAura AI agents, fully integrated with your calendar, EMR, CRM, and channels." },
  { n: "03", Icon: TrendingUp, title: "Scale", desc: "You enjoy the growth. Bookings flow, leads convert, and your team focuses on the craft — not the chaos." },
];

export const Process = () => (
  <section id="process" className="relative py-32 md:py-48 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">The Method</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          A three-act <span className="italic">ritual</span>.
        </h2>
        <p className="text-muted-foreground font-light text-lg">
          From discovery to dominion — refined to the point of inevitability.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        {steps.map(({ n, Icon, title, desc }) => (
          <div key={n} className="relative text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-background border border-gold/40 mb-8 mx-auto z-10">
              <Icon className="w-7 h-7 text-gold" strokeWidth={1.25} />
              <span className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center text-[10px] font-serif">{n}</span>
            </div>
            <h3 className="font-serif text-3xl mb-4">{title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
