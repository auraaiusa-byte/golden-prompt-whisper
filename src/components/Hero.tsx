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
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/80 to-[#0a0e1a]/40 md:to-[#0a0e1a]/20" />
    </div>

    <div className="container relative z-10 grid md:grid-cols-12 gap-8 items-center py-24">
      <div className="md:col-span-7">
        <div className="reveal flex items-center gap-4 mb-10">
          <div className="w-16 h-px bg-gold" />
          <span className="text-xs uppercase tracking-luxe text-gold">Private Beta · By Invitation</span>
        </div>

        <h1 className="reveal reveal-delay-1 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] mb-8 text-white">
          The Unified
          <br />
          Intelligence for
          <br />
          <span className="italic gold-shimmer">Modern Business.</span>
        </h1>

        <p className="reveal reveal-delay-2 max-w-xl text-lg text-white/70 leading-relaxed mb-12 font-light">
          NavAura is the discreet AI command center behind ambitious modern brands —
          capturing leads, qualifying prospects, and orchestrating your operations
          while you focus on the vision.
        </p>

        <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-6">
          <LuxeButton className="animate-gold-pulse">Request Invitation</LuxeButton>
          <a href="#concierge" className="text-xs uppercase tracking-luxe text-white/70 hover:text-gold transition-colors border-b border-white/20 hover:border-gold pb-1">
            Witness the Experience
          </a>
        </div>

        <div className="reveal reveal-delay-4 mt-20 flex items-center gap-10 text-xs uppercase tracking-luxe text-white/60">
          <div>
            <div className="font-serif text-3xl text-white normal-case tracking-normal">2.1s</div>
            <div className="mt-1">Avg. Response</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <div className="font-serif text-3xl text-white normal-case tracking-normal">$2.4M</div>
            <div className="mt-1">Revenue Driven</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <div className="font-serif text-3xl text-white normal-case tracking-normal">312</div>
            <div className="mt-1">Elite Brands</div>
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
