import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LiveTicker } from "@/components/LiveTicker";
import { AsSeenIn } from "@/components/AsSeenIn";
import { Industries } from "@/components/Industries";
import { Concierge } from "@/components/Concierge";
import { Integrations } from "@/components/Integrations";
import { Voice } from "@/components/Voice";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Results } from "@/components/Results";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AuraChat } from "@/components/AuraChat";
import { FloatingAgentWidget } from "@/components/FloatingAgentWidget";
import { ExitIntent } from "@/components/ExitIntent";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Seo />
      <Nav />
      <Hero />
      <LiveTicker />
      <AsSeenIn />
      <Industries />
      <Concierge />
      <Integrations />
      <Voice />
      <RoiCalculator />
      <Results />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
      <AuraChat hideLauncher />
      <FloatingAgentWidget industry="home" />
      <ExitIntent />
    </main>
  );
};

export default Index;
