import { Link } from "react-router-dom";
import medspaImg from "@/assets/medspa-hero-luxe.jpg";
import { Cross, Scale, Dumbbell } from "lucide-react";

const lawImg =
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1280&q=80";
const gymImg =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1280&q=80";

const industries = [
  {
    id: "medspa",
    to: "/med-spa",
    img: medspaImg,
    Icon: Cross,
    label: "Medical Spas",
    title: "Med-Spa AI Receptionist",
    desc: "24/7 lead intake, treatment FAQ qualification (Botox/Laser/Skin), and instant calendar booking — from $1,997/mo.",
    features: ["Instant DM-to-booking", "Treatment FAQ qualification", "Calendar booking"],
  },
  {
    id: "law",
    to: "/law",
    img: lawImg,
    Icon: Scale,
    label: "Law Firms",
    title: "Law Firm Intake Agent",
    desc: "24/7 confidential case triage, practice-area qualification, and consultation scheduling — from $2,497/mo.",
    features: ["Confidential case triage", "Practice-area qualification", "Attorney scheduling"],
  },
  {
    id: "gym",
    to: "/gym",
    img: gymImg,
    Icon: Dumbbell,
    label: "Gyms & Studios",
    title: "Gym Membership Closer",
    desc: "Automated trial pass booking, membership qualification, and cold lead reactivation — from $1,497/mo.",
    features: ["VIP trial pass booking", "Membership qualification", "Lapsed-member win-back"],
  },
];

export const Industries = () => (
  <section id="industries" className="relative py-32 md:py-48 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">Core Services</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          Three autonomous packages, <span className="italic">tailored</span> to your craft.
        </h2>
        <p className="text-muted-foreground font-light text-lg">
          NavAura deploys industry-trained agents that understand the language, nuance,
          and rituals of your business — never generic, always exquisite.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {industries.map(({ id, to, img, Icon, label, title, desc, features }) => (
          <Link
            key={id}
            id={id}
            to={to}
            className="group relative overflow-hidden rounded-sm luxe-card transition-all duration-700 hover:-translate-y-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={img}
                alt={`NavAura AI ${label} environment — automated lead capture and booking`}
                loading="lazy"
                width={1280}
                height={1600}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
              <div className="absolute top-6 left-6 glass rounded-full p-3">
                <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] uppercase tracking-luxe text-gold">{label}</span>
                <h3 className="font-serif text-2xl md:text-3xl mt-3 mb-4 text-foreground leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground font-light mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs text-foreground/75">
                      <span className="text-gold">◆</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[10px] uppercase tracking-luxe text-gold border-b border-gold/40 pb-1 inline-block group-hover:border-gold transition-colors">
                  Explore →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
