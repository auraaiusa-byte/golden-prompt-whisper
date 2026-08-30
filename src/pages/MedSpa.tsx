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
import heroImg from "@/assets/medspa-hero-luxe.jpg";
import treatmentsImg from "@/assets/medspa-treatments.jpg";
import portraitImg from "@/assets/medspa-portrait.jpg";

/* Local luxe-light palette — scoped to this page only */
const INK = "#2A2622";
const MUTE = "#7A6F66";
const GOLD = "#C5A05C";
const GOLD_SOFT = "#E9D6A8";
const BLUSH = "#F7EDE6";
const IVORY = "#FBF8F4";
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

const MedSpa = () => (
  <main className="min-h-screen" style={{ background: IVORY, color: INK }}>
    <Seo
      title="Med Spa AI Automation & 24/7 Booking · NavAura AI"
      description="NavAura AI deploys 24/7 booking agents, automated patient intake, and VIP retention for medical spas. Stop losing DMs — request private access today."
      path="/med-spa"
      keywords="Med Spa AI Automation, automated patient intake, med spa booking AI, aesthetic clinic AI, HydraFacial booking, Botox lead capture, NavAura AI"
    />
    <Nav />

    {/* HERO */}
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden" style={{ background: `linear-gradient(180deg, ${BLUSH} 0%, ${IVORY} 100%)` }}>
      {/* decorative ornaments */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-60" style={{ background: GOLD_SOFT }} />
      <div className="pointer-events-none absolute -bottom-32 -right-16 w-[520px] h-[520px] rounded-full blur-3xl opacity-50" style={{ background: BLUSH }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${LINE}` }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MUTE }}>Luxury Medical Aesthetics · AI Concierge</span>
            </div>

            <h1 className="font-serif leading-[1.02] text-5xl md:text-6xl lg:text-7xl tracking-tight" style={{ color: INK }}>
              Timeless beauty,
              <br />
              <span className="italic" style={{ color: GOLD }}>reimagined</span> for
              <br />
              the modern woman.
            </h1>

            <p className="mt-8 text-lg md:text-xl font-light max-w-xl leading-relaxed" style={{ color: MUTE }}>
              A discreet, 24/7 aesthetic concierge — booking HydraFacials, Botox, and laser
              consultations while you focus on results. Elevated care, effortlessly delivered.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
              <Link to="/demo-dashboard">
                <button
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider transition-all hover:gap-3"
                  style={{ background: "transparent", color: INK, border: `1px solid ${INK}` }}
                >
                  Explore the Experience <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-12 pt-8" style={{ borderTop: `1px solid ${LINE}` }}>
              <div className="flex -space-x-2">
                {[portraitImg, treatmentsImg, heroImg].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover ring-2" style={{ ["--tw-ring-color" as any]: IVORY }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1" style={{ color: GOLD }}>
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-xs mt-1" style={{ color: MUTE }}>Trusted by 200+ elite clinics nationwide</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl" style={{ boxShadow: "0 40px 100px -30px rgba(139, 108, 66, 0.35)" }}>
              <img
                src={heroImg}
                alt="Woman receiving luxury facial treatment at premium medical spa"
                width={1920}
                height={1280}
                className="w-full h-[520px] md:h-[640px] object-cover"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, rgba(43,38,34,0.15) 100%)` }} />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -left-4 md:left-6 max-w-[280px] rounded-2xl p-5 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.85)", border: `1px solid ${LINE}`, boxShadow: "0 20px 60px -20px rgba(0,0,0,0.15)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: BLUSH }}>
                  <HeartPulse className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTE }}>Just Booked</p>
                  <p className="text-sm font-medium">HydraFacial · 2:30 PM</p>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${LINE}` }}>
                <span className="text-xs" style={{ color: MUTE }}>via Instagram DM</span>
                <span className="text-xs font-medium" style={{ color: GOLD }}>+ $420</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 right-4 md:right-8 rounded-full px-5 py-3 flex items-center gap-2" style={{ background: INK, color: IVORY }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD_SOFT }} />
              <span className="text-[10px] uppercase tracking-[0.25em]">24/7 Live Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* STATS BAR */}
    <section className="py-14" style={{ background: INK, color: IVORY }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-4xl md:text-5xl italic" style={{ color: GOLD_SOFT }}>{s.n}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TREATMENTS */}
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Signature Treatments</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5" style={{ color: INK }}>
            Every ritual, <span className="italic">effortlessly booked.</span>
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: MUTE }}>
            NavAura's AI concierge understands every treatment on your menu — qualifying, scheduling, and prepping clients before they arrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map(({ Icon, title, desc, tag }) => (
            <div
              key={title}
              className="group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1"
              style={{ background: "#fff", border: `1px solid ${LINE}`, boxShadow: "0 4px 20px -8px rgba(139,108,66,0.08)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-colors" style={{ background: BLUSH }}>
                  <Icon className="w-6 h-6" style={{ color: GOLD }} strokeWidth={1.4} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] px-3 py-1 rounded-full" style={{ color: GOLD, background: IVORY, border: `1px solid ${GOLD_SOFT}` }}>{tag}</span>
              </div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: INK }}>{title}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: MUTE }}>{desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }}>
                Automated <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* EDITORIAL SPLIT — pain points */}
    <section className="py-24 md:py-32" style={{ background: BLUSH }}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>The Hidden Leaks</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 leading-tight" style={{ color: INK }}>
              Where refined <span className="italic">clinics</span> quietly lose revenue.
            </h2>
            <p className="mt-6 font-light" style={{ color: MUTE }}>
              Even the most exquisite practices leak six figures a year to unanswered inquiries. NavAura closes the loop — gracefully.
            </p>
            <div className="mt-10 relative rounded-3xl overflow-hidden">
              <img src={treatmentsImg} alt="Luxury skincare flatlay" width={1400} height={1600} className="w-full h-[380px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {pains.map((p, i) => (
              <div key={p.title} className="p-8 md:p-10 rounded-2xl flex gap-6" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
                <div className="font-serif text-4xl italic shrink-0" style={{ color: GOLD }}>0{i + 1}</div>
                <div>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: INK }}>{p.title}</h3>
                  <p className="font-light leading-relaxed" style={{ color: MUTE }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* SOLUTIONS */}
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 30px 80px -30px rgba(139,108,66,0.3)" }}>
              <img src={portraitImg} alt="Elegant woman with radiant glowing skin at luxury medical spa" width={1200} height={1500} className="w-full h-[560px] object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-8" style={{ background: "linear-gradient(180deg, transparent, rgba(43,38,34,0.7))" }}>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: GOLD_SOFT }}>Real Results</p>
                <p className="font-serif text-2xl mt-2" style={{ color: IVORY }}>Radiant. Confident. Cared for.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>The NavAura Solution</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5" style={{ color: INK }}>
              Three AI agents. <span className="italic">One elegant system.</span>
            </h2>

            <div className="mt-10 space-y-3">
              {solutions.map((s, i) => (
                <div key={s.title} className="p-6 md:p-8 rounded-2xl transition-all hover:shadow-lg" style={{ background: IVORY, border: `1px solid ${LINE}` }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fff", border: `1px solid ${GOLD_SOFT}` }}>
                      <Check className="w-5 h-5" style={{ color: GOLD }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>0{i + 1}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-2" style={{ color: INK }}>{s.title}</h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: MUTE }}>{s.desc}</p>
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
    <section className="py-24 md:py-32" style={{ background: IVORY }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Whispered by the Best</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5" style={{ color: INK }}>
            Loved by <span className="italic">elite clinics.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.author} className="p-8 rounded-2xl flex flex-col" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
              <div className="flex gap-1 mb-5" style={{ color: GOLD }}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="font-serif text-lg leading-relaxed flex-1" style={{ color: INK }}>"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
                <div className="font-medium text-sm" style={{ color: INK }}>{t.author}</div>
                <div className="text-xs mt-1" style={{ color: MUTE }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* LOCAL AUTHORITY */}
    <section className="py-24 md:py-32" style={{ background: BLUSH }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Local Authority</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 mb-6" style={{ color: INK }}>
              Rank <span className="italic">#1</span> in your city.
            </h2>
            <p className="font-light leading-relaxed mb-8" style={{ color: MUTE }}>
              We engineer city-specific landing pages, automated Google review flows, and geo-targeted funnels — so when someone searches "best med spa near me," your clinic is the only answer.
            </p>
            <a href="/#contact"><LuxeButton>Claim Your Region</LuxeButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-xl transition-transform hover:-translate-y-0.5" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: GOLD }} strokeWidth={1.5} />
                <span className="text-sm" style={{ color: INK }}>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 md:py-32">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Quiet Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5" style={{ color: INK }}>Frequently <span className="italic">asked.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 md:p-8 rounded-2xl transition-all" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-serif text-lg md:text-xl" style={{ color: INK }}>{f.q}</span>
                <span className="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-45" style={{ background: BLUSH, color: GOLD }}>+</span>
              </summary>
              <p className="mt-4 font-light leading-relaxed" style={{ color: MUTE }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="py-24 md:py-32" style={{ background: `linear-gradient(135deg, ${INK} 0%, #3B342E 100%)`, color: IVORY }}>
      <div className="container text-center max-w-3xl">
        <Leaf className="w-6 h-6 mx-auto mb-6" style={{ color: GOLD_SOFT }} strokeWidth={1.3} />
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Your clinic, <span className="italic" style={{ color: GOLD_SOFT }}>elevated.</span>
        </h2>
        <p className="mt-6 font-light text-lg opacity-85 max-w-xl mx-auto">
          Join the most refined aesthetic practices already booking around the clock with NavAura.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
          <Link to="/demo-dashboard">
            <button className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider" style={{ border: `1px solid ${GOLD_SOFT}`, color: IVORY }}>
              View Live Demo <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
    <AuraChat />
  </main>
);

export default MedSpa;
