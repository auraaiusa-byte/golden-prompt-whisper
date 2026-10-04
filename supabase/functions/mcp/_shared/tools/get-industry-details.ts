import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_industry_details",
  title: "Get industry details",
  description:
    "Return NavAura AI's pain points and AI solutions for a specific industry (med_spa, law_firm, or gym).",
  inputSchema: {
    industry: z
      .enum(["med_spa", "law_firm", "gym"])
      .describe("Industry key: med_spa, law_firm, or gym."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ industry }) => {
    const catalog = {
      med_spa: {
        title: "AI Automation for Med Spas",
        painPoints: [
          "Missed patient calls after hours",
          "No-shows and abandoned bookings",
          "Manual follow-up on consultations",
        ],
        aiSolutions: [
          "24/7 AI voice concierge that books appointments in real time",
          "Automated reminders and re-engagement sequences",
          "Lead qualification with instant CRM sync",
        ],
        proofPoint: "+40% Bookings, 98% Booking Accuracy",
      },
      law_firm: {
        title: "AI Automation for Law Firms",
        painPoints: [
          "Intake bottlenecks losing qualified cases",
          "Paralegal hours spent on repetitive triage",
          "Slow response killing high-intent leads",
        ],
        aiSolutions: [
          "AI intake agent that qualifies and schedules consultations",
          "Automated case-type routing and document requests",
          "2-second response SLA on inbound inquiries",
        ],
        proofPoint: "15 hours/week saved per firm",
      },
      gym: {
        title: "AI Automation for Fitness Studios",
        painPoints: [
          "Cold leads never convert to trial sessions",
          "Manual member retention and churn tracking",
          "No system for reactivating lapsed members",
        ],
        aiSolutions: [
          "AI SMS/voice concierge that books free trials automatically",
          "Retention flows triggered by attendance drops",
          "Win-back campaigns for lapsed members",
        ],
        proofPoint: "2x Lead Conversion",
      },
    } as const;
    const data = catalog[industry];
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
