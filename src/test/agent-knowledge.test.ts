import { describe, it, expect } from "vitest";
import {
  matchKnowledgeIntent,
  getAgentConfigForPath,
} from "../lib/agent-knowledge";

describe("Route Knowledge Base & Intent Matching Engine", () => {
  it("resolves route configs properly", () => {
    const gym = getAgentConfigForPath("/gym");
    const medspa = getAgentConfigForPath("/med-spa");
    const law = getAgentConfigForPath("/law");
    const home = getAgentConfigForPath("/");

    expect(gym.persona).toBe("Marcus | Performance Concierge");
    expect(gym.tagline).toBe("Elite Facility & Membership Advisor");
    expect(medspa.persona).toBe("Elena | Aesthetic Patient Concierge");
    expect(medspa.tagline).toBe("24/7 Clinical & Treatment Concierge");
    expect(law.persona).toBe("Arthur | Legal Intake Associate");
    expect(law.tagline).toBe("Confidential Case Intake & Scheduling");
    expect(home.persona).toBe("Nav | AI Automation Specialist");
  });

  describe("Route /gym Knowledge", () => {
    const gym = getAgentConfigForPath("/gym");

    it("has all 4 quick service action cards", () => {
      expect(gym.actionCards.length).toBe(4);
      expect(gym.actionCards[0].title).toBe("3-Day VIP Pass");
      expect(gym.actionCards[0].badge).toBe("Free");
      expect(gym.actionCards[1].title).toBe("Standard All-Access");
      expect(gym.actionCards[1].badge).toBe("$79/mo");
      expect(gym.actionCards[2].title).toBe("Black VIP Tier");
      expect(gym.actionCards[2].badge).toBe("$149/mo");
      expect(gym.actionCards[3].title).toBe("1-on-1 Performance Coaching");
      expect(gym.actionCards[3].badge).toBe("From $60/session");
    });

    it("has all 5 suggestion chips", () => {
      expect(gym.suggestionChips).toEqual([
        "Claim 3-day pass",
        "Peak floor hours?",
        "Sauna & Cold plunge?",
        "Class schedule",
        "Cancel/Freeze policy",
      ]);
    });

    it("answers operating hours accurately with 24/7 and staffed times", () => {
      const res = matchKnowledgeIntent("What are your operating hours?", gym);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("24/7");
      expect(res.response).toContain("5:00 AM");
      expect(res.response).toContain("11:00 PM");
      expect(res.cta.label).toBeDefined();
    });

    it("answers peak hours vs quiet times", () => {
      const res = matchKnowledgeIntent("Peak floor hours?", gym);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("6:00 AM");
      expect(res.response).toContain("8:30 AM");
      expect(res.response).toContain("11:00 AM");
      expect(res.response).toContain("3:30 PM");
    });

    it("answers recovery amenities with sauna and cold plunge details", () => {
      const res = matchKnowledgeIntent("Sauna & Cold plunge?", gym);
      expect(res.matched).toBe(true);
      expect(res.response.toLowerCase()).toContain("infrared sauna");
      expect(res.response).toContain("45°F");
      expect(res.response.toLowerCase()).toContain("cold plunge");
      expect(res.response).toContain("PIN lockers");
    });

    it("answers cancel / freeze policy", () => {
      const res = matchKnowledgeIntent("Cancel/Freeze policy", gym);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("60-day");
      expect(res.response).toContain("month-to-month");
      expect(res.response).toContain("zero hidden");
    });
  });

  describe("Route /med-spa Knowledge", () => {
    const medspa = getAgentConfigForPath("/med-spa");

    it("has all 4 quick service action cards", () => {
      expect(medspa.actionCards.length).toBe(4);
      expect(medspa.actionCards[0].title).toBe("HydraFacial MD");
      expect(medspa.actionCards[0].badge).toBe("From $199");
      expect(medspa.actionCards[1].title).toBe("Botox & Dysport");
      expect(medspa.actionCards[1].badge).toBe("$12-$14/unit");
      expect(medspa.actionCards[2].title).toBe("Morpheus8 RF Microneedling");
      expect(medspa.actionCards[2].badge).toBe("$850/area");
      expect(medspa.actionCards[3].title).toBe("VIP Skin Club");
      expect(medspa.actionCards[3].badge).toBe("$149/mo");
    });

    it("has all 5 suggestion chips", () => {
      expect(medspa.suggestionChips).toEqual([
        "Downtime for Morpheus8?",
        "Botox vs Dysport",
        "Skin Club perks",
        "Prep before injectables",
        "Book consultation",
      ]);
    });

    it("answers downtime for Morpheus8, Botox, and HydraFacial", () => {
      const res = matchKnowledgeIntent("Downtime for Morpheus8?", medspa);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("24 to 48 hours");
      expect(res.response).toContain("zero downtime");
      expect(res.response).toContain("pinkness");
    });

    it("answers Botox vs Dysport specifics", () => {
      const res = matchKnowledgeIntent("Botox vs Dysport", medspa);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("$14/unit");
      expect(res.response).toContain("$12/unit");
      expect(res.response).toContain("licensed medical injectors");
    });

    it("answers comfort and numbing protocol", () => {
      const res = matchKnowledgeIntent("Does it hurt or do you use numbing?", medspa);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("30-minute");
      expect(res.response).toContain("BLT numbing");
    });

    it("answers pre-care instructions", () => {
      const res = matchKnowledgeIntent("Prep before injectables", medspa);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("48 hours");
      expect(res.response).toContain("alcohol");
      expect(res.response).toContain("blood thinners");
    });

    it("answers same-day treatment eligibility", () => {
      const res = matchKnowledgeIntent("Can I get treatment the same day as consult?", medspa);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("same-day");
    });
  });

  describe("Route /law Knowledge", () => {
    const law = getAgentConfigForPath("/law");

    it("has all 4 quick service action cards", () => {
      expect(law.actionCards.length).toBe(4);
      expect(law.actionCards[0].title).toBe("Personal Injury Triage");
      expect(law.actionCards[0].badge).toBe("Contingency basis");
      expect(law.actionCards[1].title).toBe("Corporate Counsel Retainer");
      expect(law.actionCards[1].badge).toBe("From $1,500/mo");
      expect(law.actionCards[2].title).toBe("Employment Dispute Review");
      expect(law.actionCards[2].badge).toBe("Case-readiness audit");
      expect(law.actionCards[3].title).toBe("Estate & Trust Planning");
      expect(law.actionCards[3].badge).toBe("From $1,800 flat-fee");
    });

    it("has all 5 suggestion chips", () => {
      expect(law.suggestionChips).toEqual([
        "Is this confidential?",
        "Fee structure?",
        "What documents to bring?",
        "Review timeline",
        "Speak with an attorney",
      ]);
    });

    it("answers confidentiality protection", () => {
      const res = matchKnowledgeIntent("Is this confidential?", law);
      expect(res.matched).toBe(true);
      expect(res.response.toLowerCase()).toContain("attorney-client");
    });

    it("answers review timeline", () => {
      const res = matchKnowledgeIntent("Review timeline", law);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("2 to 4 business hours");
    });

    it("answers documents to gather", () => {
      const res = matchKnowledgeIntent("What documents to bring?", law);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("police");
      expect(res.response).toContain("medical");
      expect(res.response).toContain("contracts");
    });

    it("answers legal advice boundary", () => {
      const res = matchKnowledgeIntent("Can you give me legal advice?", law);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("formal legal opinions");
      expect(res.response).toContain("retainer");
    });

    it("answers fee structure with contingency basis", () => {
      const res = matchKnowledgeIntent("Fee structure?", law);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("contingency");
      expect(res.response).toContain("zero upfront");
      expect(res.response).toContain("$1,800");
      expect(res.response).toContain("$1,500");
    });
  });

  describe("Route / (Home) Agency Knowledge", () => {
    const home = getAgentConfigForPath("/");

    it("explains how NavAura works", () => {
      const res = matchKnowledgeIntent("How does NavAura work?", home);
      expect(res.matched).toBe(true);
      expect(res.response).toContain("2.1");
      expect(res.response).toContain("autonomous");
      expect(res.response).toContain("Med Spas, Gyms, and Law Firms");
    });
  });
});
