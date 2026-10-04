import { Link } from "react-router-dom";

const ECOSYSTEMS: {
  niche: string;
  accent: "gold" | "cyan";
  brands: string[];
}[] = [
  { niche: "Med-Spa", accent: "gold", brands: ["Boulevard", "Mindbody", "Zenoti"] },
  { niche: "Legal", accent: "cyan", brands: ["Clio", "Filevine", "Smokeball"] },
  { niche: "Fitness", accent: "gold", brands: ["PushPress", "Mariana Tek", "ClubReady"] },
];

const SYNC_FEATURES = [
  "Live calendar availability check",
  "Zero duplicate bookings",
  "Automated client record creation",
];

const DASHBOARD_FEATURES = [
  "Live lead tracking, streamed in real time",
  "Instant call transcripts & audio playback",
  "Sentiment analytics on every conversation",
  "1-click status routing across your pipeline",
];

const Card: ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => JSX.Element = ({ children, className = "" }) => (
  <div
    className={`group relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/10 transition-all duration-700 hover:border-gold/40 hover:shadow-[0_24px_80px_-32px_hsl(39_65%_60%/0.35)] ${className}`}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
    {children}
  </div>
);

const FeatureBullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-sm text-foreground/75 font-light">
    <span className="mt-[3px] text-gold text-[10px]">◆</span>
    <span>{children}</span>
  </li>
);

const AccentDot = ({ accent }: { accent: "gold" | "cyan" }) => (
  <span
    className={`inline-block h-1.5 w-1.5 rounded-full ${
      accent === "gold" ? "bg-gold shadow-[0_0_8px_hsl(39_65%_60%/0.9)]" : "bg-[hsl(var(--pipeline-cyan))] shadow-[0_0_8px_hsl(var(--pipeline-cyan)/0.9)]"
    }`}
  />
);

export const Integrations = () => (
  <section id="integrations" className="relative py-24 md:py-36 overflow-hidden">
    {/* ambient glow */}
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 18% 12%, hsl(39 65% 60% / 0.06), transparent 40%), radial-gradient(circle at 84% 88%, hsl(var(--pipeline-cyan) / 0.06), transparent 42%)",
      }}
    />

    <div className="container">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-luxe text-gold">
            Universal Ecosystem Integration
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
          Plugs Directly Into Your Practice CRM —{" "}
          <span className="italic gradient-gold-text">Or Run on NavAura's Live Dashboard.</span>
        </h2>

        <p className="text-muted-foreground leading-relaxed font-light text-base sm:text-lg">
          Zero operational friction. Keep your existing software stack, or manage all
          voice bookings via our real-time client portal.
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Card 1 — CRM Sync */}
        <Card>
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                01 — Keep Your Stack
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl mb-3 leading-snug">
              Seamless CRM &amp; Practice Software Sync
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
              Instant 2-way real-time data sync with industry-standard platforms.
            </p>

            {/* Brand badges by niche */}
            <div className="space-y-4 mb-8">
              {ECOSYSTEMS.map(({ niche, accent, brands }) => (
                <div key={niche} className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-muted-foreground w-16 shrink-0">
                    <AccentDot accent={accent} />
                    {niche}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1.5 rounded-full border border-white/10 bg-zinc-950/60 text-xs font-medium tracking-wide text-foreground/80 transition-all duration-500 hover:border-gold/50 hover:text-gold"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ul className="space-y-3.5 mt-8 border-t border-white/10 pt-7">
              {SYNC_FEATURES.map((f) => (
                <FeatureBullet key={f}>{f}</FeatureBullet>
              ))}
            </ul>
          </div>
        </Card>

        {/* Card 2 — Sovereign Dashboard */}
        <Card>
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                02 — Or Go Sovereign
              </span>
              <span className="ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-[hsl(var(--pipeline-cyan))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--pipeline-cyan))] animate-pulse" />
                Real-time
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl mb-3 leading-snug">
              NavAura Sovereign Dashboard
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
              No enterprise CRM? Run everything directly on our secure, real-time
              command center.
            </p>

            {/* Mini dashboard preview */}
            <div className="relative rounded-2xl border border-white/10 bg-zinc-950/70 p-5 mb-8 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[linear-gradient(hsl(var(--pipeline-cyan)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--pipeline-cyan)/0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />
              <div className="relative space-y-3">
                {[
                  { label: "Voice booking — HydraFacial", status: "Confirmed", tone: "gold" },
                  { label: "New intake lead — PI case", status: "Routed", tone: "cyan" },
                  { label: "Membership call — VIP pass", status: "Booked", tone: "gold" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-zinc-900/60 px-3 py-2.5"
                  >
                    <span className="text-xs text-foreground/70 truncate font-light">
                      {row.label}
                    </span>
                    <span
                      className={`shrink-0 text-[9px] uppercase tracking-luxe px-2 py-1 rounded-full border ${
                        row.tone === "gold"
                          ? "text-gold border-gold/30 bg-gold/5"
                          : "text-[hsl(var(--pipeline-cyan))] border-[hsl(var(--pipeline-cyan)/0.3)] bg-[hsl(var(--pipeline-cyan)/0.05)]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <ul className="space-y-3.5 border-t border-white/10 pt-7 mb-9">
              {DASHBOARD_FEATURES.map((f) => (
                <FeatureBullet key={f}>{f}</FeatureBullet>
              ))}
            </ul>

            <div className="mt-auto">
              <Link
                to="/demo"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[48px] w-full sm:w-auto text-xs uppercase tracking-luxe bg-primary text-primary-foreground transition-all duration-500 overflow-hidden hover:bg-foreground"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                <span className="relative">View Demo Dashboard</span>
                <span className="relative inline-block transition-transform duration-500 group-hover/btn:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);
