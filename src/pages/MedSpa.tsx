import { Cross } from "lucide-react";
import { IndustryPage } from "@/components/IndustryPage";
import heroImg from "@/assets/industry-medspa.jpg";

const MedSpa = () => (
  <IndustryPage
    slug="med-spa"
    industry="Med Spas"
    industrySingular="Med Spa"
    heroImg={heroImg}
    Icon={Cross}
    tagline="Turn every Instagram DM, missed call, and after-hours inquiry into a confirmed HydraFacial, Botox, or laser appointment — automatically."
    intro="NavAura AI deploys a 24/7 aesthetic concierge that mirrors your front-desk's voice — booking consults, qualifying VIP clients, and reactivating lapsed patients while you focus on results."
    pains={[
      { title: "Missed Patient Calls", desc: "73% of after-hours aesthetic inquiries never get a callback. Every missed call is a $400+ treatment walking to your competitor." },
      { title: "DM Inbox Overflow", desc: "Instagram DMs pile up faster than your team can respond. Hot leads cool in 5 minutes — and book elsewhere." },
      { title: "No-Show Cancellations", desc: "Empty chairs cost $1,200/week per provider. Manual reminders slip through, and rebooking takes hours of staff time." },
    ]}
    solutions={[
      { title: "Instant DM-to-Booking Agent", desc: "Replies to every Instagram, Facebook, and website inquiry in under 30 seconds — qualifies the lead, books the consult, syncs your calendar." },
      { title: "Automated Patient Intake", desc: "Sends pre-care forms, contraindication checks, and consent documents the moment a booking lands — fully HIPAA-aware and signed before they arrive." },
      { title: "VIP Retention & Rebook Engine", desc: "Re-engages lapsed clients with personalized offers, triggers post-treatment follow-ups, and rebooks loyalty appointments at the perfect cadence." },
    ]}
    cities={["Beverly Hills, CA", "Miami, FL", "Scottsdale, AZ", "Manhattan, NY", "Dallas, TX", "Austin, TX"]}
    localCopy="We engineer city-specific landing pages, automated Google review flows, and geo-targeted ad funnels — so when someone searches 'best med spa near me,' your clinic is the only answer that appears."
    seoTitle="Med Spa AI Automation & 24/7 Booking · NavAura AI"
    seoDescription="NavAura AI deploys 24/7 booking agents, automated patient intake, and VIP retention for medical spas. Stop losing DMs — request private access today."
    seoKeywords="Med Spa AI Automation, automated patient intake, med spa booking AI, aesthetic clinic AI, HydraFacial booking, Botox lead capture, NavAura AI"
    chatGreeting="Hi! I am NavAura AI. Curious how we automate Med Spa bookings 24/7?"
    chatSuggestions={[
      "💉 Reduce no-shows for my clinic",
      "📲 Auto-reply to Instagram DMs",
      "✨ Reactivate lapsed VIP clients",
    ]}
  />
);

export default MedSpa;
