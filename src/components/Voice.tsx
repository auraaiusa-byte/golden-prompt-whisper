import voiceImg from "@/assets/voice.jpg";
import { CallMe } from "./CallMe";

export const Voice = () => (
  <section id="voice" className="relative py-24 md:py-48 bg-secondary overflow-hidden">
    <div className="container grid md:grid-cols-12 gap-12 md:gap-16 items-center">
      <div className="md:col-span-6">
        <div className="relative aspect-[4/5] overflow-hidden luxe-card rounded-sm">
          <img src={voiceImg} alt="NavAura AI 24/7 virtual voice assistant for med spas, law firms, and gyms — futuristic gold sound waves" loading="lazy" width={1280} height={1600} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="md:col-span-6">
        <span className="text-xs uppercase tracking-luxe text-gold">02 — Experience Live AI Voice · NavAura AI</span>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight mt-6 mb-8">
          A voice that
          <br /><span className="italic">never sleeps.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light mb-12">
          NavAura AI studies the cadence of your brand — the warmth, the discretion, the
          quiet confidence — then answers every call, every DM, every inquiry,
          with prose indistinguishable from your own. At 3am. On holidays. Always.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { k: "Sophisticated", v: "Trained on luxury hospitality lexicon." },
            { k: "Warm", v: "Recognizes regulars by name and history." },
            { k: "Compliant", v: "HIPAA & GDPR aware. Always discreet." },
            { k: "Unsleeping", v: "3am inquiries become 9am bookings." },
          ].map((f) => (
            <div key={f.k} className="border-l border-gold pl-5 py-2">
              <div className="font-serif text-2xl mb-1">{f.k}</div>
              <p className="text-sm text-muted-foreground font-light">{f.v}</p>
            </div>
          ))}
        </div>

        <CallMe />
      </div>
    </div>
  </section>
);

