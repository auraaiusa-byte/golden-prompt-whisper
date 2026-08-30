import { LuxeButton } from "./LuxeButton";

const tiers = [
  {
    name: "Basic",
    tagline: "For emerging studios stepping into automation.",
    price: "$299",
    period: "/ month",
    features: [
      "AI Lead Capture (1 industry agent)",
      "24/7 Chatbot — up to 1,000 conversations",
      "Calendar & EMR integrations",
      "Monthly performance brief",
      "Email support",
    ],
    cta: "Request Private Access",
    highlight: false,
  },
  {
    name: "Professional",
    tagline: "The signature tier for established brands.",
    price: "$799",
    period: "/ month",
    features: [
      "Everything in Basic",
      "Unlimited conversations across 2 agents",
      "Signature voice training & DM management",
      "Lead reactivation workflows for med spa, gym, and law",
      "Lead reactivation workflows",
      "Dedicated success curator",
    ],
    cta: "Request Private Access",
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "Bespoke intelligence for multi-location operators.",
    price: "Bespoke",
    period: "",
    features: [
      "Everything in Professional",
      "Unlimited industry agents",
      "Custom integrations & private models",
      "On-call white-glove onboarding",
      "Quarterly executive strategy sessions",
      "SLA-backed uptime & priority routing",
    ],
    cta: "Request Private Access",
    highlight: false,
  },
];

export const Pricing = () => (
  <section id="invitation" className="relative py-32 md:py-48 bg-secondary overflow-hidden">
    <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top, hsl(var(--gold) / 0.2), transparent 60%)" }} />

    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">04 — Membership</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          Three tiers. <span className="italic">One standard.</span>
        </h2>
        <p className="text-muted-foreground font-light text-lg">
          Every membership is all-inclusive within its tier — no feature gates, no hidden ledgers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative p-10 rounded-sm transition-all duration-500 ${
              t.highlight
                ? "luxe-card -translate-y-4 border-gold/80"
                : "bg-background border border-gold/20 hover:border-gold/50"
            }`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-background text-[10px] uppercase tracking-luxe rounded-sm">
                Most Distinguished
              </div>
            )}
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-luxe text-gold mb-3">{t.name}</div>
              <p className="text-xs text-muted-foreground font-light italic mb-6">{t.tagline}</p>
              <div className="hairline mx-auto w-20 mb-6" />
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-serif text-5xl text-foreground">{t.price}</span>
                {t.period && <span className="text-muted-foreground text-sm">{t.period}</span>}
              </div>
            </div>

            <ul className="space-y-3 mb-10 min-h-[260px]">
              {t.features.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-foreground/80 font-light">
                  <span className="text-gold mt-0.5">◆</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <LuxeButton
              className={`w-full ${t.highlight ? "animate-gold-pulse !bg-gold !text-background hover:!bg-gold-soft" : ""}`}
              variant={t.highlight ? "primary" : "ghost"}
            >
              {t.cta}
            </LuxeButton>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] uppercase tracking-luxe text-muted-foreground mt-12">
        All inquiries → aura.usa@gmail.com · Limited to 12 new clinics this quarter
      </p>
    </div>
  </section>
);
