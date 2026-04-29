import heroImg from "@/assets/hero-spa.jpg";
import { LuxeButton } from "./LuxeButton";

export const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Serene luxury med spa interior with champagne gold accents"
        className="w-full h-full object-cover"
        width={1600}
        height={1200}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/10 md:from-background/90 md:via-background/40 md:to-transparent" />
    </div>

    <div className="container relative z-10 grid md:grid-cols-12 gap-8 items-center py-24">
      <div className="md:col-span-7">
        <div className="reveal flex items-center gap-4 mb-10">
          <div className="w-16 h-px bg-gold" />
          <span className="text-xs uppercase tracking-luxe text-gold">Private Beta · By Invitation</span>
        </div>

        <h1 className="reveal reveal-delay-1 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8">
          The Silent Partner
          <br />
          in Your Clinic's
          <br />
          <span className="italic gold-shimmer">growth.</span>
        </h1>

        <p className="reveal reveal-delay-2 max-w-xl text-lg text-muted-foreground leading-relaxed mb-12 font-light">
          From manual chaos to AI-driven serenity. Aura is the discreet intelligence
          behind America's most distinguished aesthetic practices — answering, booking, and
          delighting your patients while you focus on the artistry.
        </p>

        <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-6">
          <LuxeButton className="animate-gold-pulse">Request Invitation</LuxeButton>
          <a href="#concierge" className="text-xs uppercase tracking-luxe text-foreground/70 hover:text-gold transition-colors border-b border-foreground/20 hover:border-gold pb-1">
            Witness the Experience
          </a>
        </div>

        <div className="reveal reveal-delay-4 mt-20 flex items-center gap-10 text-xs uppercase tracking-luxe text-muted-foreground">
          <div>
            <div className="font-serif text-3xl text-foreground normal-case tracking-normal">2.1s</div>
            <div className="mt-1">Avg. Booking</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <div className="font-serif text-3xl text-foreground normal-case tracking-normal">$2.4M</div>
            <div className="mt-1">Revenue Recovered</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <div className="font-serif text-3xl text-foreground normal-case tracking-normal">312</div>
            <div className="mt-1">Elite Clinics</div>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>

    {/* Glassmorphism live booking notification */}
    <div className="hidden lg:block absolute bottom-16 right-10 z-20 reveal reveal-delay-4">
      <div className="glass rounded-2xl p-5 w-[320px] border border-gold/40">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="text-[10px] uppercase tracking-luxe text-gold">Aura · Live Booking</span>
          <span className="ml-auto text-[10px] text-muted-foreground">just now</span>
        </div>
        <p className="font-serif text-base text-foreground leading-snug">
          Madeline R. just booked a <em className="text-gold not-italic">HydraFacial Signature</em> for Friday, 6:30pm.
        </p>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[10px] uppercase tracking-luxe text-muted-foreground">
          <span>Booked in 2.1s</span>
          <span className="text-gold">◆ Confirmed</span>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-luxe text-muted-foreground animate-float">
      Scroll
    </div>
  </section>
);
