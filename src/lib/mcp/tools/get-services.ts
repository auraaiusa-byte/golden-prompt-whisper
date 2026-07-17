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
          name: "AI Automation",
          startingPrice: "$1,997/mo",
          description:
            "SOPs, lead generation, voice agents, and 24/7 follow-up sequences. Replaces a full sales team.",
        },
        {
          name: "Technical SEO",
          startingPrice: "$1,497/mo",
          description:
            "Audits, schema, Core Web Vitals, backlinking, and content engine for page-1 rankings.",
        },
        {
          name: "Full-Stack Development",
          startingPrice: "Custom quote",
          description:
            "Next.js + Supabase conversion-optimized sites, dashboards, and custom AI integrations.",
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
