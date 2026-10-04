import { defineMcp } from "@lovable.dev/mcp-js";
import getServices from "./tools/get-services";
import getIndustryDetails from "./tools/get-industry-details";
import submitLead from "./tools/submit-lead";

export default defineMcp({
  name: "navaura-ai-mcp",
  title: "NavAura AI",
  version: "0.1.0",
  instructions:
    "Public MCP server for NavAura AI. Use `get_services` for pricing and service info, `get_industry_details` for pain points and AI solutions per industry (med_spa, law_firm, gym), and `submit_lead` to register a new prospect. No authentication required.",
  tools: [getServices, getIndustryDetails, submitLead],
});
