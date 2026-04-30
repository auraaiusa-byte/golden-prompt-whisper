import medspaImg from "@/assets/industry-medspa.jpg";
import lawImg from "@/assets/industry-law.jpg";
import gymImg from "@/assets/industry-gym.jpg";
import { Cross, Scale, Dumbbell } from "lucide-react";

const industries = [
  {
    id: "medspa",
    img: medspaImg,
    Icon: Cross,
    label: "Medical Spas",
    title: "Effortless bookings. Lifelong clients.",
    desc: "AI lead capture and retention engineered for aesthetic clinics — from HydraFacial inquiries to VIP rebooking flows.",
    features: ["Instant DM-to-booking", "Pre/post-care automation", "Loyalty re-engagement"],
  },
  {
    id: "law",
    img: lawImg,
    Icon: Scale,
    label: "Law Firms",
    title: "Discerning intake. Discreet intelligence.",
    desc: "Automated client intake, conflict checks, and document categorization — confidential, compliant, and always on.",
    features: ["24/7 case intake triage", "Document classification", "Secure client routing"],
  },
  {
    id: "gym",
    img: gymImg,
    Icon: Dumbbell,
    label: "Gyms & Studios",
    title: "Lead follow-up that closes.",
    desc: "Boutique fitness leads converted into members — and lapsed members reactivated through personalized AI outreach.",
    features: ["Trial-to-member nurture", "Member reactivation", "Class booking automation"],
  },
];

export const Industries = () => (
  <section id="industries" className="relative py-32 md:py-48 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-luxe text-gold">Multi-Industry Intelligence</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-6 mb-6">
          Specialized AI agents, <span className="italic">tailored</span> to your craft.
        </h2>
        <p className="text-muted-foreground font-light text-lg">
          NavAura deploys industry-trained agents that understand the language, nuance,
          and rituals of your business — never generic, always exquisite.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {industries.map(({ id, img, Icon, label, title, desc, features }) => (
          <a
            key={id}
            id={id}
            href="#invitation"
            className="group relative overflow-hidden rounded-sm luxe-card transition-all duration-700 hover:-translate-y-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={img}
                alt={`${label} environment`}
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
          </a>
        ))}
      </div>
    </div>
  </section>
);
