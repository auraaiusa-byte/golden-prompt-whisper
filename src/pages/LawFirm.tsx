import { Link } from "react-router-dom";
import {
  Scale,
  Briefcase,
  Gavel,
  Shield,
  FileText,
  Clock,
  Star,
  Check,
  MapPin,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuraChat } from "@/components/AuraChat";
import { Seo } from "@/components/Seo";
import { LuxeButton } from "@/components/LuxeButton";

const NAVY = "#0C121C";
const SLATE = "#121A26";
const MARBLE = "#1A2332";
const BRASS = "#C5A059";
const GOLD = "#D4AF37";
const IVORY = "#F3EFE6";
const MUTE = "#9AA3B2";
const LINE = "rgba(197,160,89,0.28)";

const heroImg =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80";
const libraryImg =
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80";
const counselImg =
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80";

const practices = [
  {
    Icon: Briefcase,
    title: "Corporate",
    desc: "Entity formation, contracts, and counsel inquiries — qualified by urgency, jurisdiction, and deal size before a partner is engaged.",
  },
  {
    Icon: Gavel,
    title: "Litigation",
    desc: "Civil and commercial disputes triaged by statute, venue, and exposure so high-stakes matters reach the right chair immediately.",
  },
  {
    Icon: Shield,
    title: "Personal Injury",
    desc: "After-hours accident and negligence leads captured with a confidential intake memo — never left on voicemail.",
  },
];

const intakeCards = [
  {
    Icon: Clock,
    title: "24/7 Confidential Triage",
    desc: "Arthur qualifies matter type, jurisdiction, and urgency — then routes high-value cases to the partner with a full briefing.",
  },
  {
    Icon: FileText,
    title: "Practice-Area Qualification",
    desc: "Corporate, litigation, and personal injury scripts preserve privilege language while collecting only what counsel needs to decide.",
  },
  {
    Icon: Scale,
    title: "Attorney Scheduling",
    desc: "Consultation calendars stay full. Conflict flags surface before a billable hour is spent. The prospect never waits 48 hours.",
  },
];

const stats = [
  { n: "60s", l: "Intake Triage" },
  { n: "24/7", l: "Confidential Desk" },
  { n: "15h", l: "Saved / Week" },
  { n: "80%", l: "After-Hours Recovered" },
];

const testimonials = [
  { quote: "Intake used to consume my paralegal’s entire morning. Arthur now triages every inquiry and routes qualified matters directly to me.", author: "Helen Voss, Esq.", role: "Managing Partner, Voss & Lang · Manhattan" },
  { quote: "After-hours PI leads were walking to the firm that answered first. We recaptured that window without hiring another intake clerk.", author: "Marcus Ellison, Esq.", role: "Principal, Ellison Trial Group · Houston" },
  { quote: "The gravitas is intact. Clients assume they are speaking with chambers — not a chatbot.", author: "Priya Shah, Esq.", role: "Partner, Shah Corporate · Washington, DC" },
];

const faqs = [
  { q: "Is client communication confidential?", a: "Intake is designed for preliminary, non-privileged screening with encrypted forms and secure routing. Your counsel remains attorney of record." },
  { q: "Does this integrate with our practice stack?", a: "Clio, MyCase, PracticePanther, and custom calendars via API. Conflict lists can be referenced during qualification." },
  { q: "How long is deployment?", a: "Most firms are live in 7–10 business days, including practice-area scripts and consultation calendars." },
  { q: "Will the voice match our firm?", a: "Arthur is trained on your practice areas, intake questions, and the measured tone of a white-shoe desk — never casual, never salesy." },
];

const cities = ["Manhattan, NY", "Washington, DC", "Chicago, IL", "Houston, TX", "Atlanta, GA", "San Francisco, CA"];

const LawFirm = () => (
  <main className="min-h-screen" style={{ background: NAVY, color: IVORY }}>
    <Seo
      title="Law Firm Intake AI & Confidential Case Triage · NavAura"
      description="NavAura AI delivers 24/7 confidential case triage, practice-area qualification, and attorney consultation scheduling for modern law firms. Request access."
      path="/law"
      keywords="Legal Workflow AI, AI Law Firm Efficiency, law firm automation, 24/7 legal intake, conflict check AI, attorney AI assistant, NavAura AI"
    />
    <Nav />

    <section className="relative pt-28 md:pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Prestigious law library and chambers" className="w-full h-full object-cover opacity-35" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY}D9 0%, ${NAVY}F5 100%)` }} />
      </div>
      <div className="pointer-events-none absolute top-0 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-20" style={{ background: BRASS }} />

      <div className="container relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: `${SLATE}CC`, border: `1px solid ${LINE}` }}>
            <Landmark className="w-3.5 h-3.5" style={{ color: BRASS }} />
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MUTE }}>White-Shoe Practice · Confidential Intake</span>
          </div>
          <h1 className="font-serif leading-[1.05] text-5xl md:text-6xl lg:text-7xl tracking-tight">
            Counsel of record.
            <br />
            Intelligence that <span className="italic" style={{ color: GOLD }}>never sleeps.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl font-light max-w-2xl leading-relaxed" style={{ color: MUTE }}>
            A discreet, compliance-aware intake associate for boutique and multi-partner firms — capturing matters 24/7 while preserving the gravitas your clients expect.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="/#contact"><LuxeButton>Schedule Attorney Consultation</LuxeButton></a>
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
      </div>
    </section>

    <section className="py-14" style={{ background: SLATE, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-serif text-4xl md:text-5xl italic" style={{ color: GOLD }}>{s.n}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: MUTE }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>Practice Areas</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">
            Matters qualified with <span className="italic" style={{ color: GOLD }}>precision.</span>
          </h2>
          <p className="mt-5 font-light text-lg" style={{ color: MUTE }}>
            Arthur understands corporate, litigation, and personal injury — and routes each inquiry to the correct chamber.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {practices.map(({ Icon, title, desc }) => (
            <div key={title} className="p-8 rounded-sm transition-transform hover:-translate-y-1" style={{ background: SLATE, border: `1px solid ${LINE}` }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ border: `1px solid ${LINE}` }}>
                <Icon className="w-6 h-6" style={{ color: BRASS }} strokeWidth={1.4} />
              </div>
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: MUTE }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: SLATE }}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
              <img src={libraryImg} alt="Dark marble law library" className="w-full h-[480px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>Confidential AI Intake</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5">
              Preliminary assessment, <span className="italic" style={{ color: GOLD }}>without the wait.</span>
            </h2>
            <p className="mt-6 font-light" style={{ color: MUTE }}>
              Sixty-two percent of qualified leads contact firms after hours. Eighty percent never call back if they reach voicemail. Arthur holds the line.
            </p>
            <div className="mt-10 space-y-4">
              {intakeCards.map(({ Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-sm flex gap-5" style={{ background: NAVY, border: `1px solid ${LINE}` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ border: `1px solid ${LINE}` }}>
                    <Icon className="w-5 h-5" style={{ color: BRASS }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: MUTE }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="rounded-sm p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center" style={{ background: MARBLE, border: `1px solid ${LINE}` }}>
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>Attorney Calendar</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5">
              Consultation booked. <span className="italic" style={{ color: GOLD }}>Conflict flagged.</span>
            </h2>
            <p className="mt-6 font-light" style={{ color: MUTE }}>
              High-intent prospects receive a measured confirmation and a calendar hold. Your partners walk into the first meeting briefed — not guessing.
            </p>
            <div className="mt-8">
              <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden">
            <img src={counselImg} alt="Counsel in session" className="w-full h-[360px] object-cover" loading="lazy" />
            <div className="absolute bottom-4 left-4 right-4 p-4" style={{ background: `${NAVY}E6`, border: `1px solid ${LINE}` }}>
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: BRASS }}>Next available</p>
              <p className="font-serif text-lg mt-1">Partner consult · Thursday 9:15 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: SLATE }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>From Chambers</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">
            Trusted by <span className="italic" style={{ color: GOLD }}>counsel.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.author} className="p-8 rounded-sm flex flex-col" style={{ background: NAVY, border: `1px solid ${LINE}` }}>
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
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>Local Authority</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-5 mb-6">
              First in the <span className="italic" style={{ color: GOLD }}>map pack.</span>
            </h2>
            <p className="font-light leading-relaxed mb-8" style={{ color: MUTE }}>
              City-specific practice-area pages, structured legal schema, and review collection from closed matters — so local searches for counsel find your firm.
            </p>
            <a href="/#contact"><LuxeButton>Claim Your Region</LuxeButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-sm" style={{ background: SLATE, border: `1px solid ${LINE}` }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: BRASS }} strokeWidth={1.5} />
                <span className="text-sm">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: SLATE }}>
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>Quiet Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-5">Frequently <span className="italic" style={{ color: GOLD }}>asked.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 md:p-8 rounded-sm" style={{ background: NAVY, border: `1px solid ${LINE}` }}>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-serif text-lg md:text-xl">{f.q}</span>
                <span className="ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-45" style={{ background: MARBLE, color: BRASS }}>+</span>
              </summary>
              <p className="mt-4 font-light leading-relaxed" style={{ color: MUTE }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${MARBLE} 100%)` }}>
      <div className="container text-center max-w-3xl">
        <Scale className="w-6 h-6 mx-auto mb-6" style={{ color: GOLD }} strokeWidth={1.3} />
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Every qualified matter. <span className="italic" style={{ color: GOLD }}>Captured.</span>
        </h2>
        <p className="mt-6 font-light text-lg max-w-xl mx-auto" style={{ color: MUTE }}>
          Deploy the Law Firm Intake Agent — from $2,497/mo — and never let a confidential inquiry go unanswered.
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

export default LawFirm;
