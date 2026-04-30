import { useEffect } from "react";

const SCHEMA_ID = "navaura-jsonld";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://navaura.ai/#organization",
      name: "NavAura AI",
      alternateName: "NavAura",
      description:
        "NavAura AI is a luxury AI agency deploying specialized agents for medical spas, law firms, and gyms — automating lead capture, appointment booking, intake, and client retention 24/7.",
      url: "https://navaura.ai/",
      email: "aura.usa@gmail.com",
      areaServed: "US",
      slogan: "The Unified Intelligence for Modern Business",
      knowsAbout: [
        "Medical Spa AI Automation",
        "Automated Patient Intake",
        "Legal Workflow AI",
        "AI Law Firm Efficiency",
        "Gym Lead Management",
        "AI Voice Concierge",
        "24/7 AI Booking",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "aura.usa@gmail.com",
        contactType: "sales",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "Service",
      name: "Medical Spa AI Automation",
      provider: { "@id": "https://navaura.ai/#organization" },
      serviceType: "Automated Patient Intake & Booking",
      areaServed: "US",
      description:
        "AI lead capture, instant DM-to-booking, and automated patient intake engineered for med spas and aesthetic clinics.",
    },
    {
      "@type": "Service",
      name: "Legal Workflow AI",
      provider: { "@id": "https://navaura.ai/#organization" },
      serviceType: "AI Law Firm Efficiency",
      areaServed: "US",
      description:
        "24/7 case intake triage, conflict checks, and document classification for boutique and multi-partner law firms.",
    },
    {
      "@type": "Service",
      name: "Gym Lead Management",
      provider: { "@id": "https://navaura.ai/#organization" },
      serviceType: "Fitness AI Lead Conversion",
      areaServed: "US",
      description:
        "Trial-to-member nurture, lapsed member reactivation, and class booking automation for boutique fitness studios.",
    },
    {
      "@type": "WebSite",
      "@id": "https://navaura.ai/#website",
      url: "https://navaura.ai/",
      name: "NavAura AI",
      publisher: { "@id": "https://navaura.ai/#organization" },
    },
  ],
};

export const Seo = () => {
  useEffect(() => {
    document.title =
      "NavAura AI · AI Agency for Med Spas, Law Firms & Gyms";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      "NavAura AI deploys specialized AI agents for medical spas, law firms, and gyms — automated patient intake, AI law firm efficiency, and gym lead management. 24/7 booking accuracy.",
    );
    setMeta(
      "keywords",
      "NavAura AI, AI agency, Medical Spa AI Automation, Automated Patient Intake, Legal Workflow AI, AI Law Firm Efficiency, Gym Lead Management, AI voice concierge, 24/7 AI booking",
    );
    setMeta("og:title", "NavAura AI · Unified Intelligence for Modern Business", "property");
    setMeta(
      "og:description",
      "Specialized AI agents for med spas, law firms, and gyms. Automated intake, 24/7 booking, intelligent lead conversion.",
      "property",
    );
    setMeta("og:type", "website", "property");

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/";

    // JSON-LD
    let script = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCHEMA_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
};
