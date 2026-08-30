import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services",
  title: "Get NavAura services",
  description:
    "Return NavAura AI's public service offerings, pricing tiers, and industry specializations.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const services = {
      company: "NavAura AI",
      tagline: "The Unified Intelligence for Modern Business",
      contact: "aura.usa@gmail.com",
      calendly: "https://calendly.com/auraai-usa/30min",
      services: [
        {
          name: "Med-Spa AI Receptionist",
          startingPrice: "$1,997/mo",
          description:
            "24/7 lead intake, treatment FAQ qualification (Botox/Laser/Skin), and instant calendar booking.",
        },
        {
          name: "Gym Membership Closer",
          startingPrice: "$1,497/mo",
          description:
            "Automated trial pass booking, membership qualification, and cold lead reactivation.",
        },
        {
          name: "Law Firm Intake Agent",
          startingPrice: "$2,497/mo",
          description:
            "24/7 confidential case triage, practice-area qualification, and consultation scheduling.",
        },
      ],
      industries: ["Med Spas", "Law Firms", "Fitness Studios"],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
      structuredContent: services,
    };
  },
});
