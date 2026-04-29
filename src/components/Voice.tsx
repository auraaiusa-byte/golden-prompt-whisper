import voiceImg from "@/assets/voice.jpg";

export const Voice = () => (
  <section id="voice" className="relative py-32 md:py-48 bg-secondary overflow-hidden">
    <div className="container grid md:grid-cols-12 gap-16 items-center">
      <div className="md:col-span-6">
        <div className="relative aspect-[4/5] overflow-hidden luxe-shadow">
          <img src={voiceImg} alt="Champagne silk symbolizing the signature voice" loading="lazy" width={1200} height={1400} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
        </div>
      </div>

      <div className="md:col-span-6">
        <span className="text-xs uppercase tracking-luxe text-gold">02 — Aesthetic Intelligence · 24/7</span>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight mt-6 mb-8">
          Your signature voice,
          <br /><span className="italic">never asleep.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light mb-12">
          Aura studies the cadence of your brand — the warmth, the discretion, the
          quiet confidence — then replies to every Instagram DM, every comment, every
          inquiry, with prose indistinguishable from your own.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { k: "Sophisticated", v: "Trained on luxury hospitality lexicon." },
            { k: "Warm", v: "Recognizes regulars by name and history." },
            { k: "Compliant", v: "HIPAA-aware. Always discreet." },
            { k: "Unsleeping", v: "3am inquiries become 9am bookings." },
          ].map((f) => (
            <div key={f.k} className="border-l border-gold pl-5 py-2">
              <div className="font-serif text-2xl mb-1">{f.k}</div>
              <p className="text-sm text-muted-foreground font-light">{f.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
