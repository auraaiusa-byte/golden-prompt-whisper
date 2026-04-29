import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Concierge } from "@/components/Concierge";
import { Voice } from "@/components/Voice";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Aura · The Silent Partner for Elite Med Spas";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Aura is the discreet AI concierge for America's most distinguished med spas — instant bookings, signature-voice DM replies, $299/mo all-inclusive.");
  }, []);

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Concierge />
      <Voice />
      <Pricing />
      <Footer />
    </main>
  );
};

export default Index;
