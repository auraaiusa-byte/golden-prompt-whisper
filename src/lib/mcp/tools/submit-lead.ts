import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_lead",
  title: "Submit a lead",
  description:
    "Submit a new prospect lead to NavAura AI. Captures email (required), optional name, phone, industry, and a message.",
  inputSchema: {
    email: z.string().email().max(255).describe("Prospect's email address."),
    name: z.string().trim().max(120).optional().describe("Prospect's full name."),
    phone: z.string().trim().max(40).optional().describe("Prospect's phone number."),
    industry: z
      .enum(["med_spa", "law_firm", "gym", "other"])
      .optional()
      .describe("Industry of the prospect."),
    message: z.string().trim().max(2000).optional().describe("Free-form message or context."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ email, name, phone, industry, message }) => {
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

    const { data, error } = await supabase
      .from("leads")
      .insert({
        email,
        name: name ?? null,
        phone: phone ?? null,
        industry: industry ?? null,
        message: message ?? null,
        source: "MCP",
        lead_status: "new",
      })
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
          text: `Lead submitted. NavAura AI will follow up at ${email}. Book instantly: https://calendly.com/auraai-usa/30min`,
        },
      ],
      structuredContent: { lead: data },
    };
  },
});
