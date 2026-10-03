import { Link } from "react-router-dom";
import {
  Dumbbell,
  Flame,
  Trophy,
  Users,
  Zap,
  Star,
  Check,
  MapPin,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuraChat } from "@/components/AuraChat";
import { FloatingAgentWidget } from "@/components/FloatingAgentWidget";
import { IndustryChallengeSection, IndustryROICalculator, IntakeJourneyShowcase } from "@/components/IndustryExperience";
import { Seo } from "@/components/Seo";
import gymHero from "@/assets/industry-gym.jpg";
import marcusAvatar from "@/assets/marcus-avatar.jpg";

// ============ Athletic palette ============
const OBSIDIAN = "#09090B";
const OBSIDIAN_LIFT = "#111116";
const VOLT = "#D4FF00";
const VOLT_DIM = "rgba(212,255,0,0.45)";
const TITANIUM = "#E2E8F0";
const STEEL_MUTED = "#94A3B8";
const GLASS = "rgba(24,24,27,0.6)";
const LINE = "rgba(255,255,255,0.1)";

const heroImg = gymHero; // poster frame while the video loads
const studioImg =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80";
const athleteImg =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80";

// Local athletic CTA — visual only; destinations identical to before
const VoltButton = ({ children }: { children: React.ReactNode }) => (
  <button className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 min-h-[48px] rounded-full text-xs uppercase tracking-[0.2em] font-semibold font-athletic transition-all duration-300 gym-volt-glow" style={{ background: VOLT, color: OBSIDIAN }}>
    <span className="relative transition-transform duration-500 group-hover:translate-x-1">{children}</span>
    <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
  </button>
);

const GhostButton = ({ children }: { children: React.ReactNode }) => (
  <button
    className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-athletic transition-all duration-300 hover:border-[#D4FF00]/60 hover:text-[#D4FF00]"
    style={{ background: "transparent", color: TITANIUM, border: `1px solid ${LINE}` }}
  >
    {children} <ArrowRight className="w-4 h-4" />
  </button>
);

const tiers = [
  {
    name: "VIP Trial Pass",
    price: "Complimentary",
    period: "7 days",
    tag: "Entry",
    features: ["AI-booked intro session", "Coach matching in 60s", "Locker + recovery access", "No-show SMS sequence"],
  },
  {
    name: "Elite Performance",
    price: "$249",
    period: "/ month",
    tag: "Signature",
    highlight: true,
    features: ["Unlimited classes", "Membership qualification AI", "Personal training waitlist", "Lapsed-lead win-back"],
  },
  {
    name: "Private Club",
    price: "$590",
    period: "/ month",
    tag: "Founders",
    features: ["Private suite hours", "Concierge programming", "Guest passes automated", "Priority coach calendar"],
  },
];

const stats = [
  { n: "2×", l: "Trial Conversion" },
  { n: "85%+", l: "Class Fill Rate" },
  { n: "24/7", l: "Membership Closer" },
  { n: "18%", l: "Lapsed Win-Back" },
];

const pains = [
  { title: "Trial Leads That Ghost", desc: "8 of 10 trial sign-ups never walk through the door. Manual follow-up burns the front desk and still converts under 20%." },
  { title: "Lapsed Members Forgotten", desc: "Your CRM is a vault of 500+ former members worth $40K+ a year — and no one has time to call them back." },
  { title: "Half-Empty Classes", desc: "Prime time fills. Dawn and late-night sessions sit at 40%. Coaches are paid; the floor is empty." },
];

const solutions = [
  { Icon: Zap, title: "Automated Trial Intake", desc: "Marcus qualifies goals, availability, and budget in chat or DM — then books the VIP trial before the lead cools." },
  { Icon: Users, title: "Membership Closer", desc: "Presents Elite and Private Club offers at peak motivation: after the first class, the PR, or the week-one check-in." },
  { Icon: Flame, title: "Cold Lead Reactivation", desc: "Segments drop-off reasons and runs personalized win-back sequences — typically recovering 12–18% of the cold list." },
];

const testimonials = [
  { quote: "Trial no-shows dropped in half. The AI books the intro, reminds them twice, and the closer hits while they're still buzzing.", author: "Kai Reynolds", role: "Owner, Equinox-adjacent Studio · West Hollywood" },
  { quote: "We reactivated a graveyard list in six weeks. Membership revenue is the highest it's been in three years.", author: "Maya Chen", role: "GM, Barry's-inspired Box · Miami" },
  { quote: "6am classes finally fill. The waitlist agent is more consistent than any salesperson I have ever hired.", author: "Jordan Hale", role: "Founder, Carbon Club · Austin" },
];

const faqs = [
  { q: "Does this replace my front desk?", a: "No. It covers nights, weekends, and overflow so your team greets members — not voicemail." },
  { q: "Which booking systems do you connect?", a: "Mindbody, PushPress, Mariana Tek, Glofox, ClubReady, and custom calendars via API." },
  { q: "How fast can we go live?", a: "Most clubs launch in 7–10 business days, including membership script training and trial-pass flows." },
  { q: "Will it sound like our brand?", a: "Marcus is trained on your class menu, tone, and offer stack during onboarding — never generic gym-bro copy." },
];

const cities = ["Los Angeles, CA", "Miami, FL", "Austin, TX", "Denver, CO", "Brooklyn, NY", "Nashville, TN"];

const gymChallenges = [
  { pain: "Trial inquiries go quiet", detail: "Prospects ask for a pass, then wait hours for a reply while their motivation fades.", solution: "Instant trial qualification", outcome: "Responds with the next available intro, gathers goals, and confirms a pass while interest is high." },
  { pain: "Former members slip away", detail: "Past members and stalled trials sit in the CRM without a timely, personal follow-up.", solution: "Personalized win-back", outcome: "Reopens conversations with relevant return offers and routes interested members into a next step." },
  { pain: "Classes leave open spots", detail: "Late cancellations and half-filled sessions cost coaches time and the club recurring revenue.", solution: "Class and waitlist follow-through", outcome: "Prompts members about open sessions and keeps booking details moving into the studio calendar." },
];

const gymJourney = [
  { label: "Connect", title: "A trial lead messages", detail: "A web, social, or text inquiry receives an immediate, on-brand first response." },
  { label: "Qualify", title: "Goals and availability captured", detail: "The agent learns training goals, preferred times, and which pass fits." },
  { label: "Book", title: "Intro session confirmed", detail: "The trial is matched to an available class or coach and placed on the calendar." },
  { label: "Retain", title: "Membership follow-up queued", detail: "Attendance and next steps are handed into the club’s existing CRM workflow." },
];

const Gym = () => (
  <main className="min-h-screen bg-transparent" style={{ color: TITANIUM }}>
    <Seo
      title="Gym Membership AI & Trial Conversion · NavAura AI"
      description="NavAura AI converts trial leads to members, reactivates lapsed lists, and fills every class for boutique gyms and luxury studios. Request access today."
      path="/gym"
      keywords="Gym Lead Management, fitness AI, trial to member conversion, gym CRM automation, boutique fitness AI, class booking AI, NavAura AI"
    />
    <Nav />

    {/* ============ HERO — video background ============ */}
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-transparent">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <source src="/gym-hero-bg.webm" type="video/webm" />
          <source src="/gym-hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient to protect text legibility without covering the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/40 to-black/60 pointer-events-none" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md" style={{ background: GLASS, border: `1px solid ${VOLT_DIM}` }}>
              <Dumbbell className="w-3.5 h-3.5" style={{ color: VOLT }} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-athletic" style={{ color: STEEL_MUTED }}>Luxury Athletic Club · Elite Concierge</span>
            </div>
            <h1 className="font-athletic uppercase font-bold leading-[0.98] text-5xl md:text-6xl lg:text-7xl tracking-tight" style={{ color: TITANIUM }}>
              Train like a private club.
              <br />
              Convert like a <span style={{ color: VOLT }}>machine.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl font-light max-w-xl leading-relaxed" style={{ color: STEEL_MUTED }}>
              High-performance growth for boutique boxes and luxury studios — VIP trial passes, elite memberships, and class fill, closed 24/7 by Marcus.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="/#contact"><VoltButton>Book a Trial Strategy Call</VoltButton></a>
              <Link to="/demo-dashboard"><GhostButton>View Live Demo</GhostButton></Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border p-6 backdrop-blur-md transition-all duration-300 hover:border-[#D4FF00]/40" style={{ background: GLASS, borderColor: LINE }}>
              <div className="mb-5 flex items-center gap-3 border-b pb-5" style={{ borderColor: LINE }}>
                <div className="relative">
                  <img src={marcusAvatar} alt="Marcus, Fitness Membership Specialist" width={816} height={816} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2" style={{ background: "#22C55E", borderColor: OBSIDIAN }} />
                </div>
                <div>
                  <p className="font-athletic uppercase tracking-wide text-base">Marcus is online</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-athletic" style={{ color: VOLT }}>Membership Closer</p>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 font-athletic" style={{ color: VOLT }}>Just closed</p>
              <p className="font-athletic uppercase text-2xl tracking-tight">Elite Performance · 12-month</p>
              <p className="text-sm mt-2" style={{ color: STEEL_MUTED }}>Trial booked via Instagram DM · converted after class 1</p>
              <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${LINE}` }}>
                <span className="text-xs" style={{ color: STEEL_MUTED }}>via Membership Closer</span>
                <span className="text-sm font-semibold font-athletic" style={{ color: VOLT }}>+ $2,988</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ METRIC PILLS ============ */}
    <section className="py-14 relative" style={{ background: OBSIDIAN_LIFT }}>
      <div className="absolute inset-0 gym-carbon-grid opacity-40 pointer-events-none" />
      <div className="container relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s) => (
          <div
            key={s.l}
            className="text-center rounded-full md:rounded-2xl px-4 py-5 backdrop-blur-md transition-all duration-300 hover:border-[#D4FF00]/60 gym-volt-glow"
            style={{ background: GLASS, border: `1px solid ${VOLT_DIM}` }}
          >
            <div className="font-athletic uppercase font-bold text-3xl md:text-4xl tracking-tight" style={{ color: VOLT }}>{s.n}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] mt-2 font-athletic" style={{ color: STEEL_MUTED }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ============ TIERS ============ */}
    <section className="py-24 md:py-32" style={{ background: OBSIDIAN }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>Membership Architecture</span>
          <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 tracking-tight">
            Tiers your AI can actually <span style={{ color: VOLT }}>close.</span>
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: STEEL_MUTED }}>
            Marcus qualifies every lead against your stack — trial, Elite, or Private Club — then books the next session on the calendar.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative p-8 rounded-2xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 gym-card-hover ${t.highlight ? "gym-volt-glow" : ""}`}
              style={{
                background: t.highlight ? "rgba(28,28,32,0.8)" : GLASS,
                border: t.highlight ? `1px solid ${VOLT}` : `1px solid ${LINE}`,
              }}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-athletic rounded-full" style={{ background: VOLT, color: OBSIDIAN }}>
                  Most closed
                </div>
              )}
              <div className="flex items-center justify-between mb-6">
                <Trophy className="w-5 h-5" style={{ color: VOLT }} strokeWidth={1.4} />
                <span className="text-[9px] uppercase tracking-[0.25em] font-athletic px-3 py-1 rounded-full" style={{ color: VOLT, border: `1px solid ${VOLT_DIM}` }}>{t.tag}</span>
              </div>
              <h3 className="font-athletic uppercase text-2xl tracking-tight mb-2">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-athletic font-bold text-4xl" style={{ color: VOLT }}>{t.price}</span>
                <span className="text-sm" style={{ color: STEEL_MUTED }}>{t.period}</span>
              </div>
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-light" style={{ color: STEEL_MUTED }}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: VOLT }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <IndustryChallengeSection
      industry="gym"
      eyebrow="The floor leaks"
      title="Every quiet lead is a chance to fill the floor."
      description="Open conversations at the right moment—before a trial, a class spot, or a returning member is lost to slow follow-up."
      items={gymChallenges}
    />

    {/* ============ PAIN POINTS ============ */}
    <section className="py-24 md:py-32 relative" style={{ background: OBSIDIAN_LIFT }}>
      <div className="absolute inset-0 gym-carbon-grid opacity-30 pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>The Floor Leaks</span>
            <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 leading-tight tracking-tight">
              Where elite clubs <span style={{ color: VOLT }}>quietly bleed</span> members.
            </h2>
            <div className="mt-10 relative rounded-3xl overflow-hidden border" style={{ borderColor: LINE }}>
              <img src={studioImg} alt="Premium studio interior" className="w-full h-[380px] object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(9,9,11,0.7) 100%)" }} />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {pains.map((p, i) => (
              <div key={p.title} className="p-8 rounded-2xl flex gap-6 backdrop-blur-md gym-card-hover" style={{ background: GLASS, border: `1px solid ${LINE}` }}>
                <div className="font-athletic font-bold text-4xl shrink-0" style={{ color: VOLT }}>0{i + 1}</div>
                <div>
                  <h3 className="font-athletic uppercase text-2xl tracking-tight mb-2">{p.title}</h3>
                  <p className="font-light leading-relaxed" style={{ color: STEEL_MUTED }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <IndustryROICalculator industry="gym" />

    <IntakeJourneyShowcase
      industry="gym"
      eyebrow="Trial pass · Live flow"
      title="From first message to the first rep."
      description="See how a prospect moves from a quick question to a booked visit, then into the follow-up that helps a good first session become a membership."
      steps={gymJourney}
    />

    {/* ============ SOLUTIONS ============ */}
    <section className="py-24 md:py-32" style={{ background: OBSIDIAN }}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: LINE }}>
              <img src={athleteImg} alt="Athlete in a luxury training club" className="w-full h-[520px] object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-8" style={{ background: "linear-gradient(180deg, transparent, rgba(9,9,11,0.9))" }}>
                <p className="text-xs uppercase tracking-[0.3em] font-athletic" style={{ color: VOLT }}>Intake · Live</p>
                <p className="font-athletic uppercase text-2xl mt-2 tracking-tight">VIP trial locked · Thursday 6:30am</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>Automated Intake & Trial Pass</span>
            <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 tracking-tight">
              From DM to first sweat <span style={{ color: VOLT }}>in under a minute.</span>
            </h2>
            <div className="mt-10 space-y-3">
              {solutions.map((s, i) => (
                <div key={s.title} className="p-6 md:p-8 rounded-2xl backdrop-blur-md gym-card-hover" style={{ background: GLASS, border: `1px solid ${LINE}` }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ border: `1px solid ${VOLT_DIM}` }}>
                      <s.Icon className="w-5 h-5" style={{ color: VOLT }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-athletic" style={{ color: VOLT }}>0{i + 1}</span>
                      <h3 className="font-athletic uppercase text-xl md:text-2xl mt-1 mb-2 tracking-tight">{s.title}</h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: STEEL_MUTED }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="/#contact"><VoltButton>Activate Trial Pass Automation</VoltButton></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ TESTIMONIALS ============ */}
    <section className="py-24 md:py-32 relative" style={{ background: OBSIDIAN_LIFT }}>
      <div className="absolute inset-0 gym-carbon-grid opacity-30 pointer-events-none" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>From the Floor</span>
          <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 tracking-tight">
            Trusted by <span style={{ color: VOLT }}>performance clubs.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.author} className="p-8 rounded-2xl flex flex-col backdrop-blur-md gym-card-hover" style={{ background: GLASS, border: `1px solid ${LINE}` }}>
              <div className="flex gap-1 mb-5" style={{ color: VOLT }}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="text-lg leading-relaxed flex-1" style={{ color: TITANIUM }}>"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
                <div className="font-athletic uppercase tracking-wide font-medium text-sm">{t.author}</div>
                <div className="text-xs mt-1" style={{ color: STEEL_MUTED }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* ============ LOCAL AUTHORITY ============ */}
    <section className="py-24 md:py-32" style={{ background: OBSIDIAN }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>Local Authority</span>
            <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 mb-6 tracking-tight">
              Own <span style={{ color: VOLT }}>your city</span> on the map.
            </h2>
            <p className="font-light leading-relaxed mb-8" style={{ color: STEEL_MUTED }}>
              Hyper-local studio pages, automated Google reviews after every PR, and geo-targeted nurture — so “best gym near me” points to your door.
            </p>
            <a href="/#contact"><VoltButton>Claim Your Region</VoltButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-md gym-card-hover" style={{ background: GLASS, border: `1px solid ${LINE}` }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: VOLT }} strokeWidth={1.5} />
                <span className="text-sm" style={{ color: TITANIUM }}>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ============ FAQ ============ */}
    <section className="py-24 md:py-32 relative" style={{ background: OBSIDIAN_LIFT }}>
      <div className="absolute inset-0 gym-carbon-grid opacity-30 pointer-events-none" />
      <div className="container max-w-4xl relative">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] font-athletic" style={{ color: VOLT }}>Locker Room Questions</span>
          <h2 className="font-athletic uppercase font-bold text-4xl md:text-5xl mt-5 tracking-tight">Frequently <span style={{ color: VOLT }}>asked.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 md:p-8 rounded-2xl backdrop-blur-md" style={{ background: GLASS, border: `1px solid ${LINE}` }}>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-athletic uppercase tracking-wide text-lg md:text-xl">{f.q}</span>
                <span className="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-45" style={{ background: "rgba(212,255,0,0.12)", color: VOLT }}>+</span>
              </summary>
              <p className="mt-4 font-light leading-relaxed" style={{ color: STEEL_MUTED }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ============ FINAL CTA ============ */}
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: OBSIDIAN }}>
      <div className="absolute inset-0 gym-carbon-grid opacity-50 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-15" style={{ background: VOLT }} />
      <div className="container text-center max-w-3xl relative">
        <Activity className="w-6 h-6 mx-auto mb-6" style={{ color: VOLT }} strokeWidth={1.3} />
        <h2 className="font-athletic uppercase font-bold text-4xl md:text-6xl leading-tight tracking-tight">
          Fill the floor. <span style={{ color: VOLT }}>Close the member.</span>
        </h2>
        <p className="mt-6 font-light text-lg max-w-xl mx-auto" style={{ color: STEEL_MUTED }}>
          Join performance clubs already converting trials around the clock with NavAura’s Gym Membership Closer — from $1,497/mo.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contact"><VoltButton>Request Private Access</VoltButton></a>
          <Link to="/demo-dashboard"><GhostButton>View Live Demo</GhostButton></Link>
        </div>
      </div>
    </section>

    <Footer />
    <AuraChat hideLauncher />
    <FloatingAgentWidget industry="gym" />
  </main>
);

export default Gym;
