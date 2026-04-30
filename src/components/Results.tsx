import { Cross, Scale, Dumbbell } from "lucide-react";

const results = [
  { Icon: Cross, label: "Med Spa", stat: "+40%", caption: "Bookings", note: "Average uplift across 47 aesthetic clinics in the first 90 days." },
  { Icon: Scale, label: "Law Firm", stat: "15hrs", caption: "Saved / week", note: "Intake, triage, and document classification — fully automated." },
  { Icon: Dumbbell, label: "Gym", stat: "2×", caption: "Lead Conversion", note: "Trial-to-member nurture and reactivation flows, always on." },
];

export const Results = () => (
  <section id="results" className="relative py-32 md:py-48 bg-secondary overflow-hidden">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">Proven Results</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          Numbers that <span className="italic">whisper</span> volumes.
        </h2>
        <p className="text-muted-foreground font-light text-lg">
          Measured outcomes from NavAura AI deployments across our member brands.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {results.map(({ Icon, label, stat, caption, note }) => (
          <div key={label} className="luxe-card p-10 rounded-sm text-center group hover:-translate-y-2 transition-transform duration-500">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 mb-8 group-hover:border-gold transition-colors">
              <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <div className="text-[10px] uppercase tracking-luxe text-gold mb-4">{label}</div>
            <div className="font-serif text-6xl md:text-7xl gold-shimmer mb-3 leading-none">{stat}</div>
            <div className="text-xs uppercase tracking-luxe text-foreground/70 mb-6">{caption}</div>
            <div className="hairline mx-auto w-16 mb-6" />
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
