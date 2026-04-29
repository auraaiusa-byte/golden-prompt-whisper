import { LuxeButton } from "./LuxeButton";

const includes = [
  "Unlimited AI Concierge bookings",
  "24/7 DM & comment management",
  "Signature voice training & quarterly refinement",
  "Priority calendar & EMR integrations",
  "Dedicated success curator",
  "White-glove onboarding within 7 days",
  "No setup fees. No per-message charges.",
];

export const Pricing = () => (
  <section id="invitation" className="relative py-32 md:py-48 bg-foreground text-background overflow-hidden">
    <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top, hsl(var(--gold) / 0.25), transparent 60%)" }} />

    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">03 — The Invitation</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          One tier. <span className="italic">All-inclusive.</span>
        </h2>
        <p className="text-background/60 font-light text-lg">
          We do not believe in feature gates or hidden ledgers. One graceful price for
          everything Aurelia offers — and everything she will become.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="absolute -inset-px rounded-sm" style={{ background: "var(--gradient-gold)" }} />
          <div className="relative bg-foreground p-12 rounded-sm">
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-luxe text-gold mb-6">The Aurelia Membership</div>
              <div className="hairline mx-auto w-24 mb-8" />
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-serif text-7xl text-background">$299</span>
                <span className="text-background/50 text-sm">/ month</span>
              </div>
              <div className="text-xs uppercase tracking-luxe text-background/40 mt-3">All-Inclusive · No Hidden Fees</div>
            </div>

            <div className="hairline my-8" />

            <ul className="space-y-4 mb-10">
              {includes.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-background/80 font-light">
                  <span className="text-gold mt-0.5">◆</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <LuxeButton className="w-full !bg-gold !text-foreground hover:!bg-gold-soft">
              Request Invitation
            </LuxeButton>

            <p className="text-center text-[10px] uppercase tracking-luxe text-background/40 mt-6">
              Limited to 12 new clinics this quarter
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
