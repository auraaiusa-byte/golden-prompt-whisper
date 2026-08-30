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
import { Seo } from "@/components/Seo";
import { LuxeButton } from "@/components/LuxeButton";

const CARBON = "#0A0A0C";
const GRAPHITE = "#141418";
const STEEL = "#1C1C22";
const GOLD = "#D4AF37";
const AMBER = "#E8B84A";
const IVORY = "#F4F0E8";
const MUTE = "#A39B8F";
const LINE = "rgba(212,175,55,0.22)";

const heroImg =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80";
const studioImg =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80";
const athleteImg =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80";

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

const Gym = () => (
  <main className="min-h-screen" style={{ background: CARBON, color: IVORY }}>
    <Seo
      title="Gym Membership AI & Trial Conversion · NavAura AI"
      description="NavAura AI converts trial leads to members, reactivates lapsed lists, and fills every class for boutique gyms and luxury studios. Request access today."
      path="/gym"
      keywords="Gym Lead Management, fitness AI, trial to member conversion, gym CRM automation, boutique fitness AI, class booking AI, NavAura AI"
    />
    <Nav />

    <section className="relative pt-28 md:pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury athletic club training floor" className="w-full h-full object-cover opacity-45" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${CARBON}CC 0%, ${CARBON}F2 100%)` }} />
      </div>
      <div className="pointer-events-none absolute -top-24 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-30" style={{ background: GOLD }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: `${GRAPHITE}CC`, border: `1px solid ${LINE}` }}>
              <Dumbbell className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MUTE }}>Luxury Athletic Club · Elite Concierge</span>
            </div>
            <h1 className="font-serif leading-[1.02] text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Train like a private club.
              <br />
              Convert like a <span className="italic" style={{ color: AMBER }}>machine.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl font-light max-w-xl leading-relaxed" style={{ color: MUTE }}>
              High-performance growth for boutique boxes and luxury studios — VIP trial passes, elite memberships, and class fill, closed 24/7 by Marcus.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="/#contact"><LuxeButton>Book a Trial Strategy Call</LuxeButton></a>
              <Link to="/demo-dashboard">
                <button
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider transition-all hover:gap-3"
                  style={{ background: "transparent", color: IVORY, border: `1px solid ${LINE}` }}
                >
                  View Live Demo <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border p-6" style={{ background: `${GRAPHITE}E6`, borderColor: LINE, backdropFilter: "blur(16px)" }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>Just closed</p>
              <p className="font-serif text-2xl">Elite Performance · 12-month</p>
              <p className="text-sm mt-2" style={{ color: MUTE }}>Trial booked via Instagram DM · converted after class 1</p>
              <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${LINE}` }}>
                <span className="text-xs" style={{ color: MUTE }}>via Membership Closer</span>
                <span className="text-sm font-medium" style={{ color: AMBER }}>+ $2,988</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-14" style={{ background: GRAPHITE }}>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-serif text-4xl md:text-5xl italic" style={{ color: AMBER }}>{s.n}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: MUTE }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Membership Architecture</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">
            Tiers your AI can actually <span className="italic" style={{ color: AMBER }}>close.</span>
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: MUTE }}>
            Marcus qualifies every lead against your stack — trial, Elite, or Private Club — then books the next session on the calendar.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-2xl transition-transform hover:-translate-y-1"
              style={{
                background: t.highlight ? STEEL : GRAPHITE,
                border: t.highlight ? `1px solid ${GOLD}` : `1px solid ${LINE}`,
                boxShadow: t.highlight ? `0 24px 60px -24px ${GOLD}66` : "none",
              }}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] uppercase tracking-[0.2em] rounded-full" style={{ background: GOLD, color: CARBON }}>
                  Most closed
                </div>
              )}
              <div className="flex items-center justify-between mb-6">
                <Trophy className="w-5 h-5" style={{ color: GOLD }} strokeWidth={1.4} />
                <span className="text-[9px] uppercase tracking-[0.25em] px-3 py-1 rounded-full" style={{ color: GOLD, border: `1px solid ${LINE}` }}>{t.tag}</span>
              </div>
              <h3 className="font-serif text-2xl mb-2">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-4xl" style={{ color: AMBER }}>{t.price}</span>
                <span className="text-sm" style={{ color: MUTE }}>{t.period}</span>
              </div>
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-light" style={{ color: MUTE }}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: GRAPHITE }}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>The Floor Leaks</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 leading-tight">
              Where elite clubs <span className="italic" style={{ color: AMBER }}>quietly bleed</span> members.
            </h2>
            <div className="mt-10 relative rounded-3xl overflow-hidden">
              <img src={studioImg} alt="Premium studio interior" className="w-full h-[380px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {pains.map((p, i) => (
              <div key={p.title} className="p-8 rounded-2xl flex gap-6" style={{ background: CARBON, border: `1px solid ${LINE}` }}>
                <div className="font-serif text-4xl italic shrink-0" style={{ color: GOLD }}>0{i + 1}</div>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{p.title}</h3>
                  <p className="font-light leading-relaxed" style={{ color: MUTE }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden">
              <img src={athleteImg} alt="Athlete in a luxury training club" className="w-full h-[520px] object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-8" style={{ background: "linear-gradient(180deg, transparent, rgba(10,10,12,0.85))" }}>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: AMBER }}>Intake · Live</p>
                <p className="font-serif text-2xl mt-2">VIP trial locked · Thursday 6:30am</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Automated Intake & Trial Pass</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5">
              From DM to first sweat <span className="italic" style={{ color: AMBER }}>in under a minute.</span>
            </h2>
            <div className="mt-10 space-y-3">
              {solutions.map((s, i) => (
                <div key={s.title} className="p-6 md:p-8 rounded-2xl" style={{ background: GRAPHITE, border: `1px solid ${LINE}` }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ border: `1px solid ${LINE}` }}>
                      <s.Icon className="w-5 h-5" style={{ color: GOLD }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>0{i + 1}</span>
                      <h3 className="font-serif text-xl md:text-2xl mt-1 mb-2">{s.title}</h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: MUTE }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="/#contact"><LuxeButton>Activate Trial Pass Automation</LuxeButton></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: GRAPHITE }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>From the Floor</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">
            Trusted by <span className="italic" style={{ color: AMBER }}>performance clubs.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.author} className="p-8 rounded-2xl flex flex-col" style={{ background: CARBON, border: `1px solid ${LINE}` }}>
              <div className="flex gap-1 mb-5" style={{ color: GOLD }}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="font-serif text-lg leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
                <div className="font-medium text-sm">{t.author}</div>
                <div className="text-xs mt-1" style={{ color: MUTE }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Local Authority</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 mb-6">
              Own <span className="italic" style={{ color: AMBER }}>your city</span> on the map.
            </h2>
            <p className="font-light leading-relaxed mb-8" style={{ color: MUTE }}>
              Hyper-local studio pages, automated Google reviews after every PR, and geo-targeted nurture — so “best gym near me” points to your door.
            </p>
            <a href="/#contact"><LuxeButton>Claim Your Region</LuxeButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: GRAPHITE, border: `1px solid ${LINE}` }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: GOLD }} strokeWidth={1.5} />
                <span className="text-sm">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: GRAPHITE }}>
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>Locker Room Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">Frequently <span className="italic" style={{ color: AMBER }}>asked.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 md:p-8 rounded-2xl" style={{ background: CARBON, border: `1px solid ${LINE}` }}>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-serif text-lg md:text-xl">{f.q}</span>
                <span className="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-45" style={{ background: STEEL, color: GOLD }}>+</span>
              </summary>
              <p className="mt-4 font-light leading-relaxed" style={{ color: MUTE }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: `linear-gradient(135deg, ${CARBON} 0%, ${STEEL} 100%)` }}>
      <div className="container text-center max-w-3xl">
        <Activity className="w-6 h-6 mx-auto mb-6" style={{ color: AMBER }} strokeWidth={1.3} />
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Fill the floor. <span className="italic" style={{ color: AMBER }}>Close the member.</span>
        </h2>
        <p className="mt-6 font-light text-lg max-w-xl mx-auto" style={{ color: MUTE }}>
          Join performance clubs already converting trials around the clock with NavAura’s Gym Membership Closer — from $1,497/mo.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
          <Link to="/demo-dashboard">
            <button className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm tracking-wider" style={{ border: `1px solid ${LINE}`, color: IVORY }}>
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

export default Gym;
