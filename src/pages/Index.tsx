import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LiveTicker } from "@/components/LiveTicker";
import { AsSeenIn } from "@/components/AsSeenIn";
import { Industries } from "@/components/Industries";
import { Concierge } from "@/components/Concierge";
import { Voice } from "@/components/Voice";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Results } from "@/components/Results";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AuraChat } from "@/components/AuraChat";
import { ExitIntent } from "@/components/ExitIntent";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "NavAura AI · Unified Intelligence for Modern Business";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "NavAura AI deploys specialized agents for med spas, law firms, and gyms — managing leads, appointments, and client relations 24/7. Request private access.");
  }, []);

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <LiveTicker />
      <AsSeenIn />
      <Industries />
      <Concierge />
      <Voice />
      <RoiCalculator />
      <Results />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
      <AuraChat />
      <ExitIntent />
    </main>
  );
};

export default Index;
