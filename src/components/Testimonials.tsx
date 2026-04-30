import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    quote: "NavAura AI replaced three part-time receptionists overnight. Our bookings rose 38% in the first quarter — and our clients say the experience feels more personal, not less.",
    name: "Isabella Marchetti",
    role: "Owner, Lumière Aesthetic Spa",
    industry: "Med Spa",
  },
  {
    quote: "Intake used to consume my paralegal's entire morning. NavAura now triages every inquiry, flags conflicts, and routes qualified leads directly to me. We've recovered 15+ hours a week — billable hours.",
    name: "Marcus Whitfield, Esq.",
    role: "Managing Partner, Whitfield & Crane LLP",
    industry: "Law Firm",
  },
  {
    quote: "Our trial-to-member conversion doubled. NavAura's reactivation flows alone brought back 87 lapsed members in 60 days. It's the most disciplined sales rep we've ever had.",
    name: "Dante Russo",
    role: "General Manager, Forge Boutique Fitness",
    industry: "Gym",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];

  return (
    <section id="testimonials" className="relative py-32 md:py-48 bg-secondary overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at top, hsl(var(--gold) / 0.2), transparent 60%)" }} />
      <div className="container relative max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-luxe text-gold">In Their Words</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-6">
            What the <span className="italic">discerning</span> say.
          </h2>
        </div>

        <div className="luxe-card rounded-sm p-10 md:p-16 relative">
          <Quote className="absolute top-8 left-8 w-10 h-10 text-gold/20" strokeWidth={1} />

          <div key={i} className="animate-fade-in">
            <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground/90 italic mb-10 text-center">
              "{r.quote}"
            </p>
            <div className="hairline mx-auto w-24 mb-6" />
            <div className="text-center">
              <div className="font-serif text-xl text-foreground">{r.name}</div>
              <div className="text-xs uppercase tracking-luxe text-muted-foreground mt-2">{r.role}</div>
              <div className="text-[10px] uppercase tracking-luxe text-gold mt-2">{r.industry}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-12">
            <button
              onClick={() => setI((p) => (p - 1 + reviews.length) % reviews.length)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1 transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-gold/30 hover:bg-gold/60"}`}
                />
              ))}
            </div>

            <button
              onClick={() => setI((p) => (p + 1) % reviews.length)}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
