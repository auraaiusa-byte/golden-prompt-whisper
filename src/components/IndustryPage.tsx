import { Link } from "react-router-dom";
import { LucideIcon, MapPin, Check, AlertTriangle } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AuraChat } from "./AuraChat";
import { Seo } from "./Seo";
import { LuxeButton } from "./LuxeButton";

export interface IndustryPageProps {
  slug: string;
  industry: string;            // "Med Spas"
  industrySingular: string;    // "Med Spa"
  heroImg: string;
  Icon: LucideIcon;
  tagline: string;
  intro: string;
  pains: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  cities: string[];
  localCopy: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  chatGreeting: string;
  chatSuggestions: string[];
}

export const IndustryPage = (p: IndustryPageProps) => (
  <main className="min-h-screen bg-background">
    <Seo title={p.seoTitle} description={p.seoDescription} path={`/${p.slug}`} keywords={p.seoKeywords} />
    <Nav />

    {/* Hero */}
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={p.heroImg}
          alt={`Premium ${p.industrySingular.toLowerCase()} interior — NavAura AI automation for ${p.industry.toLowerCase()}`}
          className="w-full h-full object-cover opacity-70"
          width={1920}
          height={1080}
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="container relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <p.Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-luxe text-gold">{p.industry}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 text-white text-shadow-luxe">
            AI Automation for <span className="gradient-gold-text italic">{p.industry}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-4 text-shadow-soft">
            {p.tagline}
          </p>
          <p className="text-base text-white/80 font-light max-w-2xl mb-10 text-shadow-soft">
            {p.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/#contact"><LuxeButton>Request Private Access</LuxeButton></a>
            <Link to="/demo-dashboard"><LuxeButton variant="ghost">View Live Demo</LuxeButton></Link>
          </div>
        </div>
      </div>
    </section>

    {/* Pain Points */}
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-luxe text-gold">The Hidden Leaks</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">
            Where {p.industrySingular.toLowerCase()} owners quietly lose revenue.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {p.pains.map((pain) => (
            <div key={pain.title} className="luxe-card p-8 rounded-sm">
              <AlertTriangle className="w-5 h-5 text-gold mb-5" strokeWidth={1.5} />
              <h3 className="font-serif text-xl mb-3">{pain.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AI Solutions */}
    <section className="py-24 md:py-32 bg-secondary/30 border-t border-border">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-luxe text-gold">The NavAura Solution</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-4">
            Three AI agents. <span className="italic">One unified system.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {p.solutions.map((sol, i) => (
            <div key={sol.title} className="glass p-8 rounded-sm">
              <div className="text-gold text-xs tracking-luxe uppercase mb-4">0{i + 1}</div>
              <Check className="w-5 h-5 text-gold mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-xl mb-3">{sol.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Local Authority */}
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-luxe text-gold">Local Authority</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-4 mb-6">
              Rank #1 in your <span className="italic">city</span>.
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              {p.localCopy}
            </p>
            <a href="/#contact"><LuxeButton>Claim Your Region</LuxeButton></a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {p.cities.map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 rounded-sm border border-gold/20 bg-card">
                <MapPin className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-foreground/85">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <Footer />
    <AuraChat greeting={p.chatGreeting} />
  </main>
);
