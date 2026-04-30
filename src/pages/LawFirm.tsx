import { Scale } from "lucide-react";
import { IndustryPage } from "@/components/IndustryPage";
import heroImg from "@/assets/industry-law.jpg";

const LawFirm = () => (
  <IndustryPage
    slug="legal-automation"
    industry="Law Firms"
    industrySingular="Law Firm"
    heroImg={heroImg}
    Icon={Scale}
    tagline="Triage every new case in 60 seconds, run conflict checks instantly, and never let a qualified lead slip past your intake team again."
    intro="NavAura AI deploys a discreet, compliance-aware intake agent for boutique and multi-partner firms — capturing matters 24/7 while preserving the gravitas your clients expect."
    pains={[
      { title: "After-Hours Lost Cases", desc: "62% of qualified personal injury and family law leads contact firms outside business hours — and 80% never call back if they reach voicemail." },
      { title: "Slow Conflict Checks", desc: "Manual conflict screening delays intake by 24-48 hours. By then, the prospect has signed with the firm that responded first." },
      { title: "Paralegal Burnout", desc: "Senior staff spend 15+ hours per week on document classification, intake forms, and follow-ups instead of billable case work." },
    ]}
    solutions={[
      { title: "24/7 Case Intake Triage", desc: "Qualifies prospective clients by matter type, jurisdiction, and urgency — instantly routes high-value cases to the right partner with a full briefing memo." },
      { title: "Automated Conflict Checks", desc: "Cross-references new intakes against your full client database in seconds — flags potential conflicts before any attorney time is invested." },
      { title: "Document Classification AI", desc: "Reads, tags, and files incoming PDFs, contracts, and discovery materials — secure, encrypted, and integrated with Clio, MyCase, or PracticePanther." },
    ]}
    cities={["Manhattan, NY", "Washington, DC", "Chicago, IL", "Houston, TX", "Atlanta, GA", "San Francisco, CA"]}
    localCopy="We build city-specific practice-area pages with structured legal schema, optimize Google Business Profile signals, and automate review collection from won cases — so when locals search 'best [practice area] attorney,' your firm dominates the map pack."
    seoTitle="Legal Workflow AI · AI Law Firm Efficiency · NavAura AI"
    seoDescription="NavAura AI delivers 24/7 case intake triage, automated conflict checks, and document classification AI for boutique and multi-partner law firms. Discreet. Compliant. Always on."
    seoKeywords="Legal Workflow AI, AI Law Firm Efficiency, law firm automation, 24/7 legal intake, conflict check AI, attorney AI assistant, NavAura AI"
    chatGreeting="Hi! I am NavAura AI. Want to see how we triage legal intakes 24/7?"
    chatSuggestions={[
      "⚖️ Capture after-hours cases",
      "📑 Automate conflict checks",
      "🗂️ Classify case documents",
    ]}
  />
);

export default LawFirm;
