import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_lead",
  title: "Submit a lead",
  description:
    "Submit a new prospect lead to NavAura AI. Requires an email; optionally include the industry the prospect is asking about.",
  inputSchema: {
    email: z.string().email().max(255).describe("Prospect's email address."),
    industry: z
      .enum(["med_spa", "law_firm", "gym", "other"])
      .optional()
      .describe("Industry the prospect is asking about."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ email, industry }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      return {
        content: [{ type: "text", text: "Server not configured for lead submission." }],
        isError: true,
      };
    }

    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const source = industry ? `MCP:${industry}` : "MCP";
    const { data, error } = await supabase
      .from("leads")
      .insert({ email, source, lead_status: "new" })
      .select("id, email, created_at")
      .single();

    if (error) {
      return {
        content: [{ type: "text", text: `Failed to submit lead: ${error.message}` }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Lead submitted for ${email}. NavAura AI will follow up shortly. Book instantly: https://calendly.com/auraai-usa/30min`,
        },
      ],
      structuredContent: { lead: data },
    };
  },
});
