import { Link } from "react-router-dom";
import {
  Sparkles,
  Droplet,
  Syringe,
  Sun,
  Waves,
  HeartPulse,
  Leaf,
  Star,
  Check,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuraChat } from "@/components/AuraChat";
import { Seo } from "@/components/Seo";
import { LuxeButton } from "@/components/LuxeButton";
import { FloatingAgentWidget } from "@/components/FloatingAgentWidget";
import heroImg from "@/assets/medspa-hero-luxe.jpg";
import treatmentsImg from "@/assets/medspa-treatments.jpg";
import portraitImg from "@/assets/medspa-portrait.jpg";

/* Local luxe-light palette — scoped to this page only */
const INK = "#1F1D1D";
const MUTE = "#7A6F66";
const GOLD = "#C5A05C";
const GOLD_SOFT = "#E9D6A8";
const BLUSH = "#F7EDE6";
const IVORY = "#FAF7F5";
const LINE = "#EADFCF";

const treatments = [
  { Icon: Droplet, title: "HydraFacial", desc: "Deep cleanse, hydrate & illuminate in 45 minutes.", tag: "Signature" },
  { Icon: Syringe, title: "Botox & Fillers", desc: "Refined, natural-looking rejuvenation by licensed injectors.", tag: "Injectables" },
  { Icon: Sparkles, title: "Microneedling", desc: "Collagen-boosting resurfacing for glowing, firm skin.", tag: "Skin" },
  { Icon: Sun, title: "Laser Resurfacing", desc: "Erase sun damage, pigmentation & fine lines.", tag: "Laser" },
  { Icon: Waves, title: "Body Contouring", desc: "Non-invasive sculpting for a refined silhouette.", tag: "Body" },
  { Icon: HeartPulse, title: "Skin Tightening", desc: "Radiofrequency lift for a firmer, youthful contour.", tag: "Anti-Aging" },
];

const pains = [
  { title: "Missed Patient Calls", desc: "73% of after-hours inquiries never receive a callback — every missed call is a $400+ treatment walking to your competitor." },
  { title: "DM Inbox Overflow", desc: "Instagram DMs pile up faster than staff can respond. Hot leads cool in 5 minutes — and book elsewhere." },
  { title: "No-Show Cancellations", desc: "Empty chairs cost $1,200/week per provider. Manual reminders slip; rebooking devours staff hours." },
];

const solutions = [
  { title: "Instant DM-to-Booking", desc: "Replies to every Instagram, Facebook & web inquiry in under 30 seconds — qualifies, books, and syncs the calendar." },
  { title: "Automated Patient Intake", desc: "Pre-care forms, contraindication checks & consent documents delivered the moment a booking lands — signed before arrival." },
  { title: "VIP Retention Engine", desc: "Re-engages lapsed clients with personalized offers and rebooks loyalty appointments at the perfect cadence." },
];

const stats = [
  { n: "98%", l: "Booking Accuracy" },
  { n: "24/7", l: "AI Concierge" },
  { n: "3×", l: "Lead Conversion" },
  { n: "12k+", l: "Bookings Automated" },
];

const testimonials = [
  { quote: "Our DM response time went from 6 hours to 30 seconds. Bookings doubled in the first month.", author: "Dr. Ariana Vale", role: "Beverly Hills Aesthetics" },
  { quote: "The concierge feels like an extension of our front desk — clients don't realize it's AI.", author: "Sasha Lin", role: "Miami Skin Studio" },
  { quote: "Rebooking flows recovered $38,000 in lapsed VIP clients within the first quarter.", author: "Dr. Elena Marquez", role: "Scottsdale Med Aesthetic" },
];

const faqs = [
  { q: "Is NavAura HIPAA-aware?", a: "Yes. Data handling is compliant with HIPAA best practices, with secure routing and encrypted patient forms." },
  { q: "How long does deployment take?", a: "Most clinics are fully live within 7–10 business days, including calendar integration and voice tuning." },
  { q: "Does it integrate with our booking software?", a: "We support Boulevard, Mindbody, Vagaro, Zenoti, Jane, and custom calendars via API." },
  { q: "Can the AI match our brand voice?", a: "Every agent is trained on your treatment menu, tone, and consultation style during onboarding." },
];

const cities = ["Beverly Hills, CA", "Miami, FL", "Scottsdale, AZ", "Manhattan, NY", "Dallas, TX", "Austin, TX"];

/* Rose-gold accents for the dedicated integration section */
const ROSE = "#C98B7E";
const ROSE_SOFT = "#E8C9BE";

const medspaPlatforms = ["Boulevard", "Mindbody", "Zenoti", "Jane App", "Vagaro"];

const medspaSyncRows = [
  { label: "Boulevard Calendar Availability", badge: "[2-WAY ACTIVE]" },
  { label: "Patient Intake & Medical Records", badge: "[AUTO-SYNC]" },
  { label: "Deposit & No-Show Protection", badge: "[ENFORCED]" },
] as const;

const medspaSyncFeatures = [
  "Live treatment room & provider calendar check",
  "Zero double-booking for Botox, Fillers & Lasers",
  "Automatic patient profile & consent status creation",
];

const medspaIntakeRows = [
  { label: "Aura Voice Booking — Full Face Botox", status: "Confirmed", tone: "rose" },
  { label: "New Patient Consultation — Laser Resurfacing", status: "Slot Locked", tone: "gold" },
  { label: "VIP Membership Inquiry — HydraFacial Package", status: "Routed", tone: "rose" },
] as const;

const medspaPortalFeatures = [
  "Real-time patient inquiry tracking with audio replay",
  "Instant SMS deposit links & cancellation recovery",
  "HIPAA-aware encrypted patient logging",
];

const MedSpaIntegrations = () => (
  <section
    className="relative py-24 md:py-32 overflow-hidden bg-[#F4ECE6] border-y border-[#EADFCF]/60"
    style={{ color: INK }}
  >
    {/* ambient rose-gold glow */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 15% 10%, rgba(201,139,126,0.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(197,160,92,0.14), transparent 45%)",
      }}
    />

    <div className="container relative">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 backdrop-blur-md bg-white border border-[#C98B7E]/35 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8C6B58]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6B58] font-semibold">
            Med Spa Practice Integration
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#1F1D1D]">
          Syncs seamlessly with your <span className="italic text-[#8C6B58]">aesthetic EHR</span> —
          <br className="hidden sm:block" /> or use NavAura Sovereign.
        </h2>

        <p className="mt-6 font-light text-lg leading-relaxed text-[#7A6F66]">
          Zero disruption to your clinic. Auto-book injectables and consultations directly into your
          existing software, or run your practice via our secure patient dashboard.
        </p>
      </div>

      {/* 2-column split */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Card 1 — Practice Management Sync */}
        <div
          className="group relative overflow-hidden rounded-3xl bg-white border border-[#EADFCF] shadow-[0_12px_40px_-16px_rgba(140,107,88,0.12)] transition-all duration-500 hover:border-[#C98B7E]/50 hover:shadow-[0_20px_50px_-20px_rgba(201,139,126,0.25)] p-8 sm:p-10 lg:p-12 flex flex-col h-full"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,139,126,0.5), transparent)" }}
          />

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6B58] font-semibold mb-5">01 — Keep Your Stack</span>
          <h3 className="font-serif text-2xl sm:text-3xl leading-snug text-[#1F1D1D] mb-3">
            Aesthetic Practice Management Sync
          </h3>
          <p className="text-sm font-light leading-relaxed text-[#7A6F66] mb-6">
            Instant 2-way real-time calendar &amp; chart synchronization.
          </p>

          {/* Platform pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {medspaPlatforms.map((p) => (
              <span
                key={p}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide border border-[#EADFCF] bg-[#FAF7F5] text-[#1F1D1D] transition-all duration-300 hover:border-[#C98B7E] hover:text-[#8C6B58]"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Status Panel: LIVE EHR SYNC ENGINE */}
          <div className="relative rounded-2xl border border-[#C98B7E]/25 bg-[#FAF7F5] p-5 mb-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(rgba(201,139,126,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,139,126,0.06) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6B58]">
                  LIVE EHR SYNC ENGINE
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-[#8C6B58]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8C6B58] animate-pulse" />
                  Active
                </span>
              </div>
              <div className="space-y-2.5">
                {medspaSyncRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#C98B7E]/20 bg-white px-3.5 py-2.5 shadow-sm"
                  >
                    <span className="text-xs font-medium text-[#1F1D1D] truncate">{row.label}</span>
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#C98B7E]/30 bg-[#F4ECE6] text-[#8C6B58]">
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="space-y-3.5 border-t border-[#EADFCF] pt-7 mt-auto">
            {medspaSyncFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm font-light text-[#7A6F66]">
                <span className="mt-[3px] text-[10px] text-[#8C6B58]">◆</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2 — Sovereign Med Spa Portal */}
        <div
          className="group relative overflow-hidden rounded-3xl bg-white border border-[#EADFCF] shadow-[0_12px_40px_-16px_rgba(140,107,88,0.12)] transition-all duration-500 hover:border-[#C5A05C]/50 hover:shadow-[0_20px_50px_-20px_rgba(197,160,92,0.25)] p-8 sm:p-10 lg:p-12 flex flex-col h-full"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,92,0.5), transparent)" }}
          />

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6B58] font-semibold">02 — Or Go Sovereign</span>
            <span className="ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8C6B58]">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[#8C6B58]" />
              Live
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl leading-snug text-[#1F1D1D] mb-3">
            NavAura Sovereign Med Spa Portal
          </h3>
          <p className="text-sm font-light leading-relaxed text-[#7A6F66] mb-8">
            No enterprise software? Complete patient intake &amp; booking command center.
          </p>

          {/* Live intake simulation */}
          <div className="relative rounded-2xl border border-[#C98B7E]/25 bg-[#FAF7F5] p-5 mb-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(rgba(201,139,126,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,139,126,0.06) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative space-y-2.5">
              {medspaIntakeRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#C98B7E]/20 bg-white px-3.5 py-2.5 shadow-sm"
                >
                  <span className="text-xs font-medium text-[#1F1D1D] truncate">{row.label}</span>
                  <span
                    className={`shrink-0 text-[9px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
                      row.tone === "rose"
                        ? "text-[#8C6B58] border-[#C98B7E]/30 bg-[#F4ECE6]"
                        : "text-[#8C6B58] border-[#C5A05C]/35 bg-[#FAF7F5]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ul className="space-y-3.5 border-t border-[#EADFCF] pt-7 mb-8">
            {medspaPortalFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm font-light text-[#7A6F66]">
                <span className="mt-[3px] text-[10px] text-[#8C6B58]">◆</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link
              to="/demo"
              className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[48px] w-full sm:w-auto text-xs uppercase tracking-[0.25em] overflow-hidden rounded-full transition-all duration-500 font-medium"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${ROSE} 100%)`, color: "#1A1512" }}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
              <span className="relative">Explore Live Demo Dashboard</span>
              <ArrowRight className="relative w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MedSpa = () => (
  <main className="min-h-screen bg-[#FAF7F5]" style={{ color: INK }}>
    <Seo
      title="Med Spa AI Automation & 24/7 Booking · NavAura AI"
      description="NavAura AI deploys 24/7 booking agents, automated patient intake, and VIP retention for medical spas. Stop losing DMs — request private access today."
      path="/med-spa"
      keywords="Med Spa AI Automation, automated patient intake, med spa booking AI, aesthetic clinic AI, HydraFacial booking, Botox lead capture, NavAura AI"
    />
    <Nav />

    {/* HERO */}
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-zinc-950 pt-28 md:pt-36 pb-20 md:pb-28">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/medspa-hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md bg-white/10 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B7A0]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/90 font-medium">Luxury Medical Aesthetics · AI Concierge</span>
            </div>

            <h1 className="text-white font-serif text-4xl sm:text-6xl font-light tracking-tight leading-[1.05]">
              Timeless beauty,
              <br />
              <span className="italic font-serif text-[#E2B7A0] selection:bg-rose-500/30">reimagined</span> for
              <br />
              the modern woman.
            </h1>

            <p className="mt-8 text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              A discreet, 24/7 aesthetic concierge — booking HydraFacials, Botox, and laser
              consultations while you focus on results. Elevated care, effortlessly delivered.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
              <Link to="/demo-dashboard">
                <button
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider transition-all hover:gap-3 text-white border border-white/30 hover:border-[#E2B7A0] hover:text-[#E2B7A0]"
                  style={{ background: "transparent" }}
                >
                  Explore the Experience <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-12 pt-8" style={{ borderTop: `1px solid rgba(255,255,255,0.15)` }}>
              <div className="flex -space-x-2">
                {[portraitImg, treatmentsImg, heroImg].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover ring-2" style={{ ["--tw-ring-color" as any]: "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1" style={{ color: GOLD }}>
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-xs mt-1 text-white/80">Trusted by 200+ elite clinics nationwide</p>
              </div>
            </div>
          </div>

          {/* Hero image & preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10" style={{ boxShadow: "0 40px 100px -30px rgba(0, 0, 0, 0.6)" }}>
              <img
                src={heroImg}
                alt="Woman receiving luxury facial treatment at premium medical spa"
                width={1920}
                height={1280}
                className="w-full h-[520px] md:h-[640px] object-cover opacity-90"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, rgba(9,9,11,0.5) 100%)` }} />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -left-4 md:left-6 max-w-[280px] rounded-2xl p-5 backdrop-blur-xl border border-white/15 shadow-2xl" style={{ background: "rgba(18, 18, 24, 0.8)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gold/30" style={{ background: "rgba(197, 160, 92, 0.15)" }}>
                  <HeartPulse className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Just Booked</p>
                  <p className="text-sm font-medium text-white">HydraFacial · 2:30 PM</p>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between border-t border-white/10">
                <span className="text-xs text-white/60">via Instagram DM</span>
                <span className="text-xs font-medium" style={{ color: GOLD }}>+ $420</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 right-4 md:right-8 rounded-full px-5 py-3 flex items-center gap-2 border border-white/15 backdrop-blur-md" style={{ background: "rgba(18, 18, 24, 0.85)", color: IVORY }}>
              <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.25em]">24/7 Live Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* STATS BAR */}
    <section className="py-14 bg-[#F4ECE6] border-y border-[#EADFCF]/60 text-[#1F1D1D]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-4xl md:text-5xl italic text-[#8C6B58]">{s.n}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] mt-2 text-[#7A6F66] font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TREATMENTS */}
    <section className="py-24 md:py-32" style={{ background: IVORY }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">Signature Treatments</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5 text-[#1F1D1D]">
            Every ritual, <span className="italic text-[#8C6B58]">effortlessly booked.</span>
          </h2>
          <p className="mt-5 font-light text-lg text-[#7A6F66]">
            NavAura's AI concierge understands every treatment on your menu — qualifying, scheduling, and prepping clients before they arrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map(({ Icon, title, desc, tag }) => (
            <div
              key={title}
              className="group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 bg-white border border-[#EADFCF] shadow-[0_4px_20px_-8px_rgba(140,107,88,0.08)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-colors bg-[#FAF7F5] border border-[#EADFCF]">
                  <Icon className="w-6 h-6 text-[#8C6B58]" strokeWidth={1.4} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] px-3 py-1 rounded-full text-[#8C6B58] bg-[#FAF7F5] border border-[#C98B7E]/30 font-medium">{tag}</span>
              </div>
              <h3 className="font-serif text-2xl mb-3 text-[#1F1D1D]">{title}</h3>
              <p className="text-sm font-light leading-relaxed text-[#7A6F66]">{desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity text-[#8C6B58] font-medium">
                Automated <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* EDITORIAL SPLIT — pain points */}
    <section className="py-24 md:py-32 bg-[#F4ECE6]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">The Hidden Leaks</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 leading-tight text-[#1F1D1D]">
              Where refined <span className="italic text-[#8C6B58]">clinics</span> quietly lose revenue.
            </h2>
            <p className="mt-6 font-light text-[#7A6F66]">
              Even the most exquisite practices leak six figures a year to unanswered inquiries. NavAura closes the loop — gracefully.
            </p>
            <div className="mt-10 relative rounded-3xl overflow-hidden shadow-lg border border-[#EADFCF]">
              <img src={treatmentsImg} alt="Luxury skincare flatlay" width={1400} height={1600} className="w-full h-[380px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {pains.map((p, i) => (
              <div key={p.title} className="p-8 md:p-10 rounded-2xl flex gap-6 bg-white border border-[#EADFCF] shadow-[0_4px_20px_-8px_rgba(140,107,88,0.06)]">
                <div className="font-serif text-4xl italic shrink-0 text-[#8C6B58]">0{i + 1}</div>
                <div>
                  <h3 className="font-serif text-2xl mb-2 text-[#1F1D1D]">{p.title}</h3>
                  <p className="font-light leading-relaxed text-[#7A6F66]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* SOLUTIONS */}
    <section className="py-24 md:py-32 bg-[#FAF7F5]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#EADFCF]" style={{ boxShadow: "0 30px 80px -30px rgba(140,107,88,0.25)" }}>
              <img src={portraitImg} alt="Elegant woman with radiant glowing skin at luxury medical spa" width={1200} height={1500} className="w-full h-[560px] object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-8" style={{ background: "linear-gradient(180deg, transparent, rgba(31,29,29,0.75))" }}>
                <p className="text-xs uppercase tracking-[0.3em] text-[#E9D6A8]">Real Results</p>
                <p className="font-serif text-2xl mt-2 text-white">Radiant. Confident. Cared for.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">The NavAura Solution</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 text-[#1F1D1D]">
              Three AI agents. <span className="italic text-[#8C6B58]">One elegant system.</span>
            </h2>

            <div className="mt-10 space-y-3">
              {solutions.map((s, i) => (
                <div key={s.title} className="p-6 md:p-8 rounded-2xl transition-all hover:shadow-lg bg-white border border-[#EADFCF]">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#FAF7F5] border border-[#C5A05C]/35">
                      <Check className="w-5 h-5 text-[#8C6B58]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6B58] font-semibold">0{i + 1}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-2 text-[#1F1D1D]">{s.title}</h3>
                      <p className="text-sm font-light leading-relaxed text-[#7A6F66]">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="py-24 md:py-32 bg-[#F4ECE6] border-y border-[#EADFCF]/60">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">Whispered by the Best</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5 text-[#1F1D1D]">
            Loved by <span className="italic text-[#8C6B58]">elite clinics.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.author} className="p-8 rounded-2xl flex flex-col bg-white border border-[#EADFCF] shadow-[0_4px_20px_-8px_rgba(140,107,88,0.06)]">
              <div className="flex gap-1 mb-5" style={{ color: GOLD }}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="font-serif text-lg leading-relaxed flex-1 text-[#1F1D1D]">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6 border-t border-[#EADFCF]">
                <div className="font-medium text-sm text-[#1F1D1D]">{t.author}</div>
                <div className="text-xs mt-1 text-[#7A6F66]">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* LOCAL AUTHORITY */}
    <section className="py-24 md:py-32 bg-[#FAF7F5]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">Local Authority</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 mb-6 text-[#1F1D1D]">
              Rank <span className="italic text-[#8C6B58]">#1</span> in your city.
            </h2>
            <p className="font-light leading-relaxed mb-8 text-[#7A6F66]">
              We engineer city-specific landing pages, automated Google review flows, and geo-targeted funnels — so when someone searches "best med spa near me," your clinic is the only answer.
            </p>
            <a href="/#contact"><LuxeButton>Claim Your Region</LuxeButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-xl transition-transform hover:-translate-y-0.5 bg-white border border-[#EADFCF] shadow-sm">
                <MapPin className="w-4 h-4 shrink-0 text-[#8C6B58]" strokeWidth={1.5} />
                <span className="text-sm text-[#1F1D1D] font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 md:py-32 bg-[#F4ECE6] border-t border-[#EADFCF]/60">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6B58] font-semibold">Quiet Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5 text-[#1F1D1D]">Frequently <span className="italic text-[#8C6B58]">asked.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 md:p-8 rounded-2xl transition-all bg-white border border-[#EADFCF] shadow-[0_4px_20px_-8px_rgba(140,107,88,0.06)]">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-serif text-lg md:text-xl text-[#1F1D1D]">{f.q}</span>
                <span className="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-45 bg-[#F4ECE6] text-[#8C6B58] font-light">+</span>
              </summary>
              <p className="mt-4 font-light leading-relaxed text-[#7A6F66]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* MED SPA PRACTICE INTEGRATION */}
    <MedSpaIntegrations />

    {/* FINAL CTA */}
    <section className="py-24 md:py-32 bg-[#FAF7F5] border-t border-[#EADFCF]/60" style={{ color: INK }}>
      <div className="container text-center max-w-3xl">
        <Leaf className="w-6 h-6 mx-auto mb-6 text-[#8C6B58]" strokeWidth={1.3} />
        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-[#1F1D1D]">
          Your clinic, <span className="italic text-[#8C6B58]">elevated.</span>
        </h2>
        <p className="mt-6 font-light text-lg max-w-xl mx-auto text-[#7A6F66]">
          Join the most refined aesthetic practices already booking around the clock with NavAura.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
          <Link to="/demo-dashboard">
            <button className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider border border-[#8C6B58]/40 hover:border-[#8C6B58] text-[#1F1D1D] hover:text-[#8C6B58] bg-white shadow-sm transition-all">
              View Live Demo <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
    <AuraChat hideLauncher />
    <FloatingAgentWidget industry="medspa" />
  </main>
);

export default MedSpa;
