export const Concierge = () => (
  <section id="concierge" className="relative py-32 md:py-48 overflow-hidden">
    <div className="container grid md:grid-cols-12 gap-16 items-center">
      <div className="md:col-span-5 md:order-2">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs uppercase tracking-luxe text-gold">01 — The Concierge</span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
          A booking <span className="italic">whispered</span> into existence.
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 font-light text-lg">
          Two seconds. That is all it takes for a patient to secure their next ritual.
          No forms. No waiting. No phone tag. Just an effortless, app-grade experience
          delivered through the channels they already adore.
        </p>
        <ul className="space-y-4 text-sm">
          {["Instant confirmation, calendar-synced","Discreet pre-care instructions","White-glove rescheduling, automated"].map((t) => (
            <li key={t} className="flex items-center gap-4 border-b border-border pb-4">
              <span className="text-gold">◆</span>
              <span className="text-foreground/80">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-7 md:order-1 relative">
        <div className="relative aspect-[4/5] max-w-md mx-auto">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gold-soft/30 via-transparent to-gold/20 blur-3xl" />
          <div className="relative h-full rounded-[2rem] overflow-hidden luxe-shadow animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
            <div className="relative p-8 flex flex-col h-full">
              <div className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-6">Aurelia Concierge · Live</div>

              <div className="space-y-4 flex-1">
                <div className="glass rounded-2xl p-4 max-w-[80%]">
                  <p className="text-sm text-foreground/80">Hi Aurelia, I'd love a HydraFacial Friday evening.</p>
                </div>
                <div className="ml-auto rounded-2xl p-4 max-w-[80%] bg-primary text-primary-foreground">
                  <p className="text-sm">Of course, Madeline. Friday 6:30pm with Dr. Lane is reserved for you. Shall I add a Vitamin Glow infusion? ✶</p>
                </div>
                <div className="glass rounded-2xl p-4 max-w-[60%]">
                  <p className="text-sm text-foreground/80">Yes, please.</p>
                </div>
                <div className="ml-auto rounded-2xl p-4 max-w-[80%] bg-primary text-primary-foreground">
                  <p className="text-sm">Confirmed. A calendar invitation and pre-care ritual are on their way. Until Friday. ◆</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-luxe text-muted-foreground border-t border-border pt-4">
                <span>Booked in 2.1s</span>
                <span className="text-gold">●</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
