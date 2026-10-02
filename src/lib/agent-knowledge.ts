import elenaAvatar from "@/assets/elena-avatar.jpg";
import marcusAvatar from "@/assets/marcus-avatar.jpg";
import arthurAvatar from "@/assets/arthur-avatar.jpg";
import navRobot from "@/assets/nav-robot.png";

export type RouteKey = "gym" | "medspa" | "law" | "home";

export type ThemeColor = "electric" | "rose" | "gold";

export interface ServiceActionCard {
  id: string;
  title: string;
  badge: string;
  description: string;
  actionPrompt: string;
  ctaLabel: string;
  actionType: "book" | "prompt" | "lead";
}

export interface KnowledgeItem {
  topic: string;
  keywords: string[];
  response: string;
  cta: {
    label: string;
    action: "book" | "prompt" | "lead";
    prompt?: string;
  };
}

export interface RouteAgentConfig {
  id: RouteKey;
  routePath: string;
  persona: string;
  agentName: string;
  tagline: string;
  role: string;
  firstName: string;
  avatarUrl: string;
  welcomeMessage: string;
  themeColor: ThemeColor;
  actionCards: ServiceActionCard[];
  suggestionChips: string[];
  knowledgeBase: KnowledgeItem[];
  defaultCta: {
    label: string;
    action: "book" | "prompt" | "lead";
  };
  bookingTitle: string;
}

export const ROUTE_AGENT_CONFIGS: Record<RouteKey, RouteAgentConfig> = {
  gym: {
    id: "gym",
    routePath: "/gym",
    persona: "Marcus | Performance Concierge",
    agentName: "Marcus",
    tagline: "Elite Facility & Membership Advisor",
    role: "Elite Facility & Membership Advisor · Online 24/7",
    firstName: "Marcus",
    avatarUrl: marcusAvatar,
    themeColor: "electric",
    welcomeMessage:
      "Welcome to the club. I can set you up with a 3-Day VIP Pass, break down our membership tiers, or answer questions regarding personal coaching and class schedules.",
    actionCards: [
      {
        id: "vip-pass",
        title: "3-Day VIP Pass",
        badge: "Free",
        description: "Full floor, recovery zone & locker access",
        actionPrompt: "I want to claim the free 3-Day VIP Pass",
        ctaLabel: "Claim 3-Day Pass",
        actionType: "book",
      },
      {
        id: "standard-all-access",
        title: "Standard All-Access",
        badge: "$79/mo",
        description: "Floor, sauna & mobile workout tracking",
        actionPrompt: "Tell me about the Standard All-Access membership tier",
        ctaLabel: "Explore Standard",
        actionType: "prompt",
      },
      {
        id: "black-vip-tier",
        title: "Black VIP Tier",
        badge: "$149/mo",
        description: "Unlimited HIIT/Yoga/Spin, cold plunge, guest privileges",
        actionPrompt: "Tell me about the Black VIP Tier perks",
        ctaLabel: "Explore Black VIP",
        actionType: "prompt",
      },
      {
        id: "coaching",
        title: "1-on-1 Performance Coaching",
        badge: "From $60/session",
        description: "Custom training & nutrition roadmap",
        actionPrompt: "Tell me about 1-on-1 performance coaching options",
        ctaLabel: "Book Coaching",
        actionType: "book",
      },
    ],
    suggestionChips: [
      "Claim 3-day pass",
      "Peak floor hours?",
      "Sauna & Cold plunge?",
      "Class schedule",
      "Cancel/Freeze policy",
    ],
    knowledgeBase: [
      {
        topic: "Operating Hours",
        keywords: [
          "hours",
          "operating hours",
          "open",
          "opening",
          "close",
          "closing",
          "schedule",
          "times",
          "24/7",
          "keycard",
          "staffed",
          "staff hours",
          "when are you open",
          "what time",
        ],
        response:
          "We offer 24/7 keycard access 365 days a year for all active members. Our front desk, recovery bar, and coaching team are on site daily from 5:00 AM to 11:00 PM to assist you.",
        cta: {
          label: "Claim 3-Day Pass",
          action: "book",
        },
      },
      {
        topic: "Peak Hours vs Quiet Times",
        keywords: [
          "peak",
          "peak hours",
          "peak floor hours",
          "busy",
          "quiet",
          "quiet times",
          "best time",
          "crowd",
          "crowded",
          "traffic",
          "rush",
          "floor hours",
          "when is it quiet",
        ],
        response:
          "Our peak training windows run from 6:00 AM to 8:30 AM and 5:30 PM to 8:00 PM on weekdays. For uninterrupted equipment access and a tranquil recovery lounge, visit between 11:00 AM and 3:30 PM.",
        cta: {
          label: "Plan Your Visit",
          action: "book",
        },
      },
      {
        topic: "Recovery Amenities",
        keywords: [
          "recovery",
          "sauna",
          "cold plunge",
          "infrared",
          "temperature",
          "plunge",
          "amenities",
          "locker",
          "lockers",
          "pin locker",
          "towel",
          "towels",
          "steam",
          "infrared sauna",
          "sauna & cold plunge",
        ],
        response:
          "Our recovery suite features an authentic infrared sauna, a 45°F cold plunge tub for rapid inflammation reduction, secure digital PIN lockers, and complimentary chilled eucalyptus towel service.",
        cta: {
          label: "Reserve Recovery Pass",
          action: "book",
        },
      },
      {
        topic: "Membership Policies & Cancellation",
        keywords: [
          "cancel",
          "cancellation",
          "freeze",
          "pause",
          "hold",
          "policy",
          "policies",
          "contract",
          "hidden fee",
          "hidden fees",
          "month to month",
          "cancel/freeze policy",
          "freeze policy",
          "cancellation policy",
        ],
        response:
          "All memberships feature flexible month-to-month options with zero hidden cancellation fees. Every member receives a complimentary 60-day freeze per calendar year with simple one-click notice.",
        cta: {
          label: "View Membership Tiers",
          action: "prompt",
          prompt: "What are the membership tiers and pricing?",
        },
      },
      {
        topic: "3-Day VIP Pass",
        keywords: [
          "3-day",
          "3 day",
          "vip pass",
          "free pass",
          "pass",
          "trial",
          "free trial",
          "guest pass",
          "claim 3-day pass",
          "claim pass",
          "try the gym",
        ],
        response:
          "Our 3-Day VIP Pass is 100% complimentary and unlocks unrestricted access to the training floor, recovery zone (infrared sauna and cold plunge), and locker amenities. We'll issue your digital keycard instantly.",
        cta: {
          label: "Claim Free Pass",
          action: "book",
        },
      },
      {
        topic: "Class Schedule & Group Training",
        keywords: [
          "class",
          "classes",
          "class schedule",
          "hiit",
          "yoga",
          "spin",
          "pilates",
          "group fitness",
          "group training",
          "schedule",
          "timetable",
        ],
        response:
          "We offer daily coach-led HIIT, power yoga, and rhythm spin sessions starting at 5:30 AM with evening classes through 7:30 PM. Black VIP Tier members enjoy unlimited class bookings via our member app.",
        cta: {
          label: "Reserve Class Pass",
          action: "book",
        },
      },
      {
        topic: "1-on-1 Performance Coaching",
        keywords: [
          "coach",
          "coaching",
          "personal training",
          "personal trainer",
          "1-on-1",
          "1 on 1",
          "trainer",
          "nutrition",
          "roadmap",
          "body scan",
        ],
        response:
          "1-on-1 Performance Coaching starts at $60 per session and includes bi-weekly body composition scans, tailored lifting programs, and a dedicated nutritional roadmap built for your athletic goals.",
        cta: {
          label: "Book Coaching Session",
          action: "book",
        },
      },
    ],
    defaultCta: {
      label: "Claim Free Pass",
      action: "book",
    },
    bookingTitle: "Claim Your 3-Day VIP Pass",
  },

  medspa: {
    id: "medspa",
    routePath: "/med-spa",
    persona: "Elena | Aesthetic Patient Concierge",
    agentName: "Elena",
    tagline: "24/7 Clinical & Treatment Concierge",
    role: "24/7 Clinical & Treatment Concierge · Online",
    firstName: "Elena",
    avatarUrl: elenaAvatar,
    themeColor: "rose",
    welcomeMessage:
      "Welcome to our aesthetics practice. I can guide you through our clinical treatment options, downtime expectations, or reserve your private consultation.",
    actionCards: [
      {
        id: "hydrafacial-md",
        title: "HydraFacial MD",
        badge: "From $199",
        description: "Deep extraction, hydration & instant glow",
        actionPrompt: "Tell me about HydraFacial MD treatments and pricing",
        ctaLabel: "Reserve HydraFacial",
        actionType: "book",
      },
      {
        id: "botox-dysport",
        title: "Botox & Dysport",
        badge: "$12-$14/unit",
        description: "Natural wrinkle softening by licensed injectors",
        actionPrompt: "Tell me about Botox vs Dysport options and pricing",
        ctaLabel: "Book Injectable Consult",
        actionType: "book",
      },
      {
        id: "morpheus8",
        title: "Morpheus8 RF Microneedling",
        badge: "$850/area",
        description: "Deep collagen renewal & skin tightening",
        actionPrompt: "Tell me about Morpheus8 RF Microneedling and downtime",
        ctaLabel: "Explore Morpheus8",
        actionType: "prompt",
      },
      {
        id: "skin-club",
        title: "VIP Skin Club",
        badge: "$149/mo",
        description: "Monthly custom peel/facial + 15% off all injectables",
        actionPrompt: "Tell me about the VIP Skin Club membership perks",
        ctaLabel: "Join Skin Club",
        actionType: "prompt",
      },
    ],
    suggestionChips: [
      "Downtime for Morpheus8?",
      "Botox vs Dysport",
      "Skin Club perks",
      "Prep before injectables",
      "Book consultation",
    ],
    knowledgeBase: [
      {
        topic: "Downtime & Recovery",
        keywords: [
          "downtime",
          "recovery",
          "healing",
          "pinkness",
          "red",
          "redness",
          "peeling",
          "swelling",
          "swollen",
          "bruising",
          "bruise",
          "aftercare",
          "downtime for morpheus8",
          "morpheus8 downtime",
          "botox downtime",
        ],
        response:
          "Downtime is minimal across our treatments: Botox and Dysport have zero downtime; HydraFacial MD leaves you event-ready immediately; Morpheus8 RF requires only 24 to 48 hours of mild pinkness and no makeup.",
        cta: {
          label: "Schedule Consultation",
          action: "book",
        },
      },
      {
        topic: "Comfort & Numbing",
        keywords: [
          "pain",
          "hurt",
          "comfort",
          "numbing",
          "needle",
          "needles",
          "blt",
          "blt numbing",
          "topical",
          "painful",
          "anesthesia",
          "sensitive",
          "does it hurt",
        ],
        response:
          "Patient comfort is our top clinical priority. For RF microneedling and laser treatments, we apply our signature 30-minute prescription topical BLT numbing cream, ensuring your session feels gentle and manageable.",
        cta: {
          label: "Reserve Consultation",
          action: "book",
        },
      },
      {
        topic: "Pre-Care Instructions",
        keywords: [
          "prep",
          "preparation",
          "pre-care",
          "before",
          "avoid",
          "alcohol",
          "ibuprofen",
          "aspirin",
          "blood thinners",
          "bruising",
          "instructions",
          "rules",
          "prep before injectables",
          "how to prep",
        ],
        response:
          "To prevent bruising and achieve optimal results, please avoid alcohol, ibuprofen, aspirin, and blood thinners for 48 hours before any injectable treatment. Arrive with clean, bare skin if possible.",
        cta: {
          label: "Book Consultation",
          action: "book",
        },
      },
      {
        topic: "Same-Day Treatment Eligibility",
        keywords: [
          "same day",
          "same-day",
          "today",
          "walk in",
          "immediate",
          "consultation",
          "right away",
          "treat today",
          "can i do it today",
        ],
        response:
          "Yes! You are eligible for same-day treatment immediately following your clinical consultation upon provider approval. We deliberately allocate procedure time for all booked consultation appointments.",
        cta: {
          label: "Reserve Same-Day Slot",
          action: "book",
        },
      },
      {
        topic: "HydraFacial MD",
        keywords: [
          "hydrafacial",
          "hydrafacial md",
          "facial",
          "extraction",
          "glow",
          "blackheads",
          "pores",
          "hydration",
          "199",
          "deep extraction",
        ],
        response:
          "HydraFacial MD starts at $199 and utilizes patented vortex-fusion technology to deeply cleanse, extract congested pores, and saturate the skin with antioxidant peptides for an immediate luminous glow with zero peeling.",
        cta: {
          label: "Reserve HydraFacial",
          action: "book",
        },
      },
      {
        topic: "Botox vs Dysport",
        keywords: [
          "botox",
          "dysport",
          "botox vs dysport",
          "units",
          "wrinkle",
          "wrinkles",
          "forehead",
          "crow's feet",
          "frown lines",
          "12",
          "14",
          "unit price",
          "injectors",
        ],
        response:
          "We offer authentic Botox ($14/unit) and Dysport ($12/unit) administered exclusively by licensed medical injectors. Dysport sets in slightly faster (2-3 days), while Botox offers precise control for forehead lines and crow's feet, both lasting 3-4 months.",
        cta: {
          label: "Book Botox Evaluation",
          action: "book",
        },
      },
      {
        topic: "Morpheus8 RF Microneedling",
        keywords: [
          "morpheus",
          "morpheus8",
          "rf",
          "microneedling",
          "tightening",
          "collagen",
          "jowls",
          "neck",
          "850",
          "radiofrequency",
        ],
        response:
          "Morpheus8 combines fractional radiofrequency with medical microneedling at $850 per area to remodel sub-dermal adipose tissue, trigger deep collagen synthesis, and tighten sagging skin across the face, jawline, and neck.",
        cta: {
          label: "Consult on Morpheus8",
          action: "book",
        },
      },
      {
        topic: "VIP Skin Club Perks",
        keywords: [
          "skin club",
          "vip skin club",
          "membership",
          "perks",
          "149",
          "monthly",
          "discounts",
          "skin club perks",
          "peel",
        ],
        response:
          "Our VIP Skin Club is $149/month and includes one complimentary medical-grade custom peel or facial each month (up to $220 value), plus an ongoing 15% discount on all neurotoxins, dermal fillers, and laser sessions.",
        cta: {
          label: "Join VIP Skin Club",
          action: "prompt",
          prompt: "How do I enroll in the VIP Skin Club?",
        },
      },
    ],
    defaultCta: {
      label: "Book Consultation",
      action: "book",
    },
    bookingTitle: "Reserve Private Aesthetic Consultation",
  },

  law: {
    id: "law",
    routePath: "/law",
    persona: "Arthur | Legal Intake Associate",
    agentName: "Arthur",
    tagline: "Confidential Case Intake & Scheduling",
    role: "Confidential Case Intake & Scheduling · Online",
    firstName: "Arthur",
    avatarUrl: arthurAvatar,
    themeColor: "gold",
    welcomeMessage:
      "Welcome. Our office prioritizes rapid, discreet case triage. All details shared here are protected by strict attorney-client confidentiality.",
    actionCards: [
      {
        id: "personal-injury",
        title: "Personal Injury Triage",
        badge: "Contingency basis",
        description: "Zero upfront fees unless we recover damages",
        actionPrompt: "I want to evaluate a personal injury claim",
        ctaLabel: "Evaluate Injury Claim",
        actionType: "book",
      },
      {
        id: "corporate-counsel",
        title: "Corporate Counsel Retainer",
        badge: "From $1,500/mo",
        description: "Commercial contracts, compliance & entity setup",
        actionPrompt: "Tell me about the Corporate Counsel Retainer program",
        ctaLabel: "Discuss Retainer",
        actionType: "prompt",
      },
      {
        id: "employment-dispute",
        title: "Employment Dispute Review",
        badge: "Case-readiness audit",
        description: "For wage, discrimination & severance issues",
        actionPrompt: "Tell me about Employment Dispute Review and severance audits",
        ctaLabel: "Audit Employment Case",
        actionType: "book",
      },
      {
        id: "estate-planning",
        title: "Estate & Trust Planning",
        badge: "From $1,800 flat-fee",
        description: "Asset protection & living wills",
        actionPrompt: "Tell me about Estate and Trust Planning packages",
        ctaLabel: "Plan Estate & Will",
        actionType: "book",
      },
    ],
    suggestionChips: [
      "Is this confidential?",
      "Fee structure?",
      "What documents to bring?",
      "Review timeline",
      "Speak with an attorney",
    ],
    knowledgeBase: [
      {
        topic: "Attorney-Client Confidentiality",
        keywords: [
          "confidential",
          "confidentiality",
          "is this confidential",
          "privacy",
          "secure",
          "safe",
          "attorney client",
          "attorney-client",
          "privilege",
          "nda",
          "protected",
          "private",
          "secret",
        ],
        response:
          "Your disclosures are legally protected. All case facts, timelines, and personal information entered into this intake portal are guarded under strict attorney-client privilege and protected from third-party disclosure.",
        cta: {
          label: "Start Confidential Intake",
          action: "prompt",
          prompt: "I am ready to share my case details confidentially",
        },
      },
      {
        topic: "Review Timeline",
        keywords: [
          "timeline",
          "review timeline",
          "how long",
          "review",
          "turnaround",
          "when",
          "fast",
          "response time",
          "hours",
          "how fast",
          "when will i hear",
        ],
        response:
          "Our senior legal team reviews all qualified intake memos within 2 to 4 business hours. If your matter involves an impending statute of limitations or court hearing, our on-call partners are notified immediately.",
        cta: {
          label: "Submit Intake Memo",
          action: "book",
        },
      },
      {
        topic: "What Documents to Gather",
        keywords: [
          "documents",
          "what documents to bring",
          "papers",
          "evidence",
          "bring",
          "gather",
          "records",
          "police report",
          "medical bills",
          "contract",
          "what do i need",
          "documentation",
        ],
        response:
          "To expedite your review, gather any relevant incident or police reports, medical billing summaries, written correspondence (emails/texts), and executed contracts or severance paperwork. You can provide these during intake.",
        cta: {
          label: "Schedule Case Evaluation",
          action: "book",
        },
      },
      {
        topic: "Legal Advice Boundary",
        keywords: [
          "legal advice",
          "formal advice",
          "lawyer",
          "opinion",
          "legal opinion",
          "representation",
          "guarantee",
          "retain",
          "retainer",
          "are you a lawyer",
          "speak with an attorney",
        ],
        response:
          "I am an autonomous legal intake associate authorized to qualify and triage factual details without issuing formal legal opinions prior to retainer. Formal representation begins once our attorneys review your intake memo and execute an agreement.",
        cta: {
          label: "Speak with an Attorney",
          action: "book",
        },
      },
      {
        topic: "Fee Structure & Personal Injury Contingency",
        keywords: [
          "fee",
          "fees",
          "fee structure",
          "cost",
          "costs",
          "how much",
          "contingency",
          "contingency basis",
          "pricing",
          "rates",
          "hourly",
          "upfront fee",
        ],
        response:
          "Our fee structure is transparent: Personal Injury cases operate on a pure contingency basis (zero upfront fees unless we recover damages); Estate Planning is an accessible $1,800 flat fee; and Corporate Retainers start at $1,500/month.",
        cta: {
          label: "Request Case Evaluation",
          action: "book",
        },
      },
      {
        topic: "Corporate Counsel Retainer",
        keywords: [
          "corporate",
          "corporate counsel",
          "business",
          "company",
          "general counsel",
          "commercial",
          "contract",
          "compliance",
          "startup",
          "1500",
        ],
        response:
          "Our Corporate Counsel Retainer starts at $1,500/month, providing dedicated ongoing support for commercial contract drafting, vendor negotiations, regulatory compliance, and corporate governance for growing enterprises.",
        cta: {
          label: "Discuss Retainer",
          action: "book",
        },
      },
      {
        topic: "Employment Dispute Review",
        keywords: [
          "employment",
          "employment dispute",
          "employee",
          "fired",
          "wrongful termination",
          "severance",
          "wage",
          "overtime",
          "discrimination",
          "harassment",
        ],
        response:
          "Our employment litigation team provides a thorough case-readiness audit covering unpaid wages, wrongful termination, non-compete enforceability, and severance negotiations to maximize your legal standing.",
        cta: {
          label: "Audit Employment Case",
          action: "book",
        },
      },
      {
        topic: "Estate & Trust Planning",
        keywords: [
          "estate",
          "estate planning",
          "trust",
          "will",
          "living will",
          "probate",
          "asset protection",
          "inheritance",
          "1800",
        ],
        response:
          "Our estate planning packages start at a $1,800 flat fee, encompassing comprehensive revocable living trusts, pour-over wills, healthcare directives, and strategic asset protection structures.",
        cta: {
          label: "Plan Estate & Will",
          action: "book",
        },
      },
    ],
    defaultCta: {
      label: "Schedule Evaluation",
      action: "book",
    },
    bookingTitle: "Schedule Confidential Legal Evaluation",
  },

  home: {
    id: "home",
    routePath: "/",
    persona: "Nav | AI Automation Specialist",
    agentName: "Nav",
    tagline: "The Unified Intelligence for Modern Business",
    role: "AI Automation Specialist · Online 24/7",
    firstName: "Nav",
    avatarUrl: navRobot,
    themeColor: "gold",
    welcomeMessage:
      "Welcome to NavAura AI. We deploy autonomous conversational agents that qualify leads, handle bookings, and triage inquiries 24/7 for Med Spas, Gyms, and Law Firms.",
    actionCards: [
      {
        id: "agency-medspa",
        title: "Med-Spa AI Receptionist",
        badge: "From $1,997/mo",
        description: "24/7 patient intake, treatment FAQ management & instant Calendly booking",
        actionPrompt: "Tell me about the Med-Spa AI Receptionist solution",
        ctaLabel: "Explore Med-Spa Agent",
        actionType: "prompt",
      },
      {
        id: "agency-gym",
        title: "Gym Membership Closer",
        badge: "From $1,497/mo",
        description: "Automated trial pass scheduling, qualification & lost-lead recovery",
        actionPrompt: "Tell me about the Gym Membership Closer solution",
        ctaLabel: "Explore Gym Closer",
        actionType: "prompt",
      },
      {
        id: "agency-law",
        title: "Law Firm Intake Agent",
        badge: "From $2,497/mo",
        description: "24/7 confidential case triage, conflict checks & consultation booking",
        actionPrompt: "Tell me about the Law Firm Intake Agent solution",
        ctaLabel: "Explore Law Intake",
        actionType: "prompt",
      },
      {
        id: "agency-enterprise",
        title: "Custom Enterprise Suite",
        badge: "Custom SLA",
        description: "Full bi-directional sync with Mindbody, Clio, Zenoti, HubSpot & CRMs",
        actionPrompt: "Tell me about enterprise integrations and custom deployments",
        ctaLabel: "Book Strategy Call",
        actionType: "book",
      },
    ],
    suggestionChips: [
      "How does NavAura work?",
      "Med-Spa Agent demo",
      "Gym Closer pricing",
      "Law Intake compliance",
      "Book a Strategy Call",
    ],
    knowledgeBase: [
      {
        topic: "How NavAura Works",
        keywords: [
          "how does navaura work",
          "how it works",
          "overview",
          "what is navaura",
          "agents",
          "automation",
          "platform",
          "features",
        ],
        response:
          "NavAura deploys specialized autonomous AI agents tailored for Med Spas, Gyms, and Law Firms. Our agents respond in 2.1 seconds across Web, SMS, and WhatsApp to qualify intent, answer operational questions, and book calendar appointments directly into your CRM.",
        cta: {
          label: "Book a Strategy Call",
          action: "book",
        },
      },
      {
        topic: "Med-Spa AI Receptionist",
        keywords: [
          "medspa agent",
          "med-spa agent demo",
          "med-spa",
          "spa",
          "patient intake",
          "aesthetic receptionist",
          "treatment booking",
          "1997",
        ],
        response:
          "Our Med-Spa AI Receptionist ($1,997/mo) delivers 24/7 patient intake, answers clinical questions regarding downtime and injectables, and schedules consultations directly into Mindbody or Zenoti.",
        cta: {
          label: "Explore Med-Spa Solution",
          action: "prompt",
          prompt: "What features are included in the Med-Spa AI Receptionist?",
        },
      },
      {
        topic: "Gym Membership Closer",
        keywords: [
          "gym closer",
          "gym closer pricing",
          "gym",
          "fitness",
          "membership bot",
          "trial passes",
          "lead closer",
          "1497",
        ],
        response:
          "The Gym Membership Closer ($1,497/mo) automates 3-day pass issuance, follows up instantly with trial visitors, and reactivates cold leads to boost membership conversions by up to 2.8x.",
        cta: {
          label: "Explore Gym Closer",
          action: "prompt",
          prompt: "How does the Gym Closer convert trial members?",
        },
      },
      {
        topic: "Law Firm Intake Agent",
        keywords: [
          "law intake",
          "law intake compliance",
          "law firm",
          "legal",
          "confidential triage",
          "conflict check",
          "2497",
          "compliance",
        ],
        response:
          "Our Law Firm Intake Agent ($2,497/mo) conducts 24/7 confidential case triage, evaluates matter fit against jurisdiction rules, and delivers formatted intake memos directly to Clio or MyCase.",
        cta: {
          label: "Explore Legal Solution",
          action: "prompt",
          prompt: "How does NavAura handle attorney-client confidentiality?",
        },
      },
      {
        topic: "CRM Integrations",
        keywords: [
          "crm",
          "integrations",
          "integrate",
          "mindbody",
          "clio",
          "zenoti",
          "mycase",
          "hubspot",
          "zapier",
          "gohighlevel",
          "sync",
        ],
        response:
          "NavAura natively integrates with major vertical CRMs including Mindbody, Zenoti, Clio, MyCase, HubSpot, and Zapier. All client details, intake memos, and appointment slots sync bi-directionally in real time.",
        cta: {
          label: "Book Strategy Call",
          action: "book",
        },
      },
    ],
    defaultCta: {
      label: "Book Strategy Call",
      action: "book",
    },
    bookingTitle: "Book a NavAura Strategy Call",
  },
};

export function getAgentConfigForPath(pathname: string): RouteAgentConfig {
  const clean = pathname.toLowerCase();
  if (clean.startsWith("/med-spa")) return ROUTE_AGENT_CONFIGS.medspa;
  if (clean.startsWith("/gym") || clean.startsWith("/gym-growth")) return ROUTE_AGENT_CONFIGS.gym;
  if (clean.startsWith("/law") || clean.startsWith("/law-firm") || clean.startsWith("/legal")) {
    return ROUTE_AGENT_CONFIGS.law;
  }
  return ROUTE_AGENT_CONFIGS.home;
}

export function getAgentConfigById(id: RouteKey | "med_spa" | "law_firm"): RouteAgentConfig {
  if (id === "gym") return ROUTE_AGENT_CONFIGS.gym;
  if (id === "medspa" || id === "med_spa") return ROUTE_AGENT_CONFIGS.medspa;
  if (id === "law" || id === "law_firm") return ROUTE_AGENT_CONFIGS.law;
  return ROUTE_AGENT_CONFIGS.home;
}

export interface IntentMatchResult {
  matched: boolean;
  topic?: string;
  response: string;
  cta: {
    label: string;
    action: "book" | "prompt" | "lead";
    prompt?: string;
  };
}

export function matchKnowledgeIntent(
  rawQuery: string,
  config: RouteAgentConfig
): IntentMatchResult {
  const query = rawQuery.toLowerCase().trim();
  const tokens = query.replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);

  // 1. Direct match on action cards
  // 1. Score match against knowledge base first for specific answers
  let bestItem: KnowledgeItem | null = null;
  let bestScore = 0;

  for (const item of config.knowledgeBase) {
    let score = 0;

    for (const keyword of item.keywords) {
      const kw = keyword.toLowerCase();
      // Exact substring match
      if (query.includes(kw)) {
        score += kw.length > 5 ? 10 : 6;
      } else {
        // Token match
        const kwTokens = kw.split(/\s+/);
        const allPresent = kwTokens.every((t) => tokens.includes(t));
        if (allPresent) {
          score += 5;
        } else {
          const overlap = kwTokens.filter((t) => tokens.includes(t)).length;
          score += overlap * 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && bestScore >= 4) {
    return {
      matched: true,
      topic: bestItem.topic,
      response: bestItem.response,
      cta: bestItem.cta,
    };
  }

  // 2. Direct match on action cards if no specific knowledge item matched
  for (const card of config.actionCards) {
    const cardTitle = card.title.toLowerCase();
    const cardPrompt = card.actionPrompt.toLowerCase();
    if (
      query.includes(cardTitle) ||
      cardTitle.includes(query) ||
      query.includes(card.id) ||
      (cardPrompt && query.includes(cardPrompt))
    ) {
      return {
        matched: true,
        topic: card.title,
        response: `${card.title} (${card.badge}) provides ${card.description.toLowerCase()}. Would you like to reserve your spot or learn more?`,
        cta: {
          label: card.ctaLabel,
          action: card.actionType,
          prompt: card.actionPrompt,
        },
      };
    }
  }

  // 3. Fallback heuristics for common general intents
  // A. Booking request
  if (
    query.includes("book") ||
    query.includes("schedule") ||
    query.includes("appointment") ||
    query.includes("reserve") ||
    query.includes("consultation") ||
    query.includes("pass") ||
    query.includes("sign up")
  ) {
    const responses: Record<RouteKey, string> = {
      gym: "I can set up your complimentary 3-Day VIP Pass right now so you can experience our full facility and recovery zone.",
      medspa: "I would be delighted to reserve your private clinical consultation with our licensed medical aesthetic team.",
      law: "Our team prioritizes rapid case triage. We can arrange your confidential initial evaluation immediately.",
      home: "Let's schedule a dedicated strategy consultation with our automation team to map out your autonomous AI agents.",
    };
    return {
      matched: true,
      topic: "Booking Request",
      response: responses[config.id],
      cta: config.defaultCta,
    };
  }

  // B. Pricing inquiry
  if (
    query.includes("price") ||
    query.includes("cost") ||
    query.includes("how much") ||
    query.includes("rates") ||
    query.includes("pricing") ||
    query.includes("membership")
  ) {
    const cardSummaries = config.actionCards
      .map((c) => `${c.title} (${c.badge})`)
      .join(", ");
    return {
      matched: true,
      topic: "Pricing & Services",
      response: `Our core options include: ${cardSummaries}. Which option would you like to explore further?`,
      cta: {
        label: config.actionCards[0]?.ctaLabel || config.defaultCta.label,
        action: config.actionCards[0]?.actionType || config.defaultCta.action,
        prompt: config.actionCards[0]?.actionPrompt,
      },
    };
  }

  // C. General greeting
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query.startsWith("hi ") ||
    query.startsWith("hello ")
  ) {
    return {
      matched: true,
      topic: "Greeting",
      response: config.welcomeMessage,
      cta: config.defaultCta,
    };
  }

  // D. Fallback with route grounding
  const fallbacks: Record<RouteKey, { response: string; cta: { label: string; action: "book" | "prompt"; prompt?: string } }> = {
    gym: {
      response:
        "We are an elite 24/7 fitness and recovery club featuring an authentic infrared sauna, 45°F cold plunge, and private coaching. Feel free to claim a 3-Day VIP Pass or ask about our class schedules.",
      cta: { label: "Claim 3-Day Pass", action: "book" },
    },
    medspa: {
      response:
        "Our luxury clinical practice specializes in HydraFacial MD, Botox & Dysport by licensed injectors, and Morpheus8 RF microneedling. I can guide you through downtime expectations or reserve your private consult.",
      cta: { label: "Schedule Consultation", action: "book" },
    },
    law: {
      response:
        "All factual disclosures shared here are held under strict attorney-client confidentiality. Our attorneys review qualified intakes within 2 to 4 business hours with zero upfront fees on injury cases.",
      cta: { label: "Schedule Case Evaluation", action: "book" },
    },
    home: {
      response:
        "NavAura builds autonomous AI concierge agents for Med Spas, Gyms, and Law Firms with an average 2.1s response SLA and native CRM integration. Let's discuss your automation roadmap.",
      cta: { label: "Book Strategy Call", action: "book" },
    },
  };

  return {
    matched: false,
    response: fallbacks[config.id].response,
    cta: fallbacks[config.id].cta,
  };
}
