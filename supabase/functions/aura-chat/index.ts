// Aura AI hybrid agent — answers custom questions using Lovable AI Gateway (Gemini)
// grounded in the NavAura services knowledge base.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are Nav, the AI Sales Assistant for NavAura AI (also called Aura AI).
Speak with a confident, premium, concise tone. Keep answers under 90 words.

NavAura AI services & pricing:
1. AI Automation — From $1,997/mo. SOPs, lead generation, voice agents, 24/7 follow-up sequences. Replaces a full sales team.
2. Technical SEO — From $1,497/mo. Audits, schema, Core Web Vitals, backlinking, content engine. Page-1 rankings.
3. Full-Stack Development — Custom quote. Next.js + Supabase, conversion-optimized sites, dashboards, custom AI integrations.

Industries we specialize in: Med Spas, Law Firms, Fitness Studios.

RULES:
- Answer the user's question directly using the knowledge above.
- If the question is outside scope, briefly redirect to how NavAura can help.
- ALWAYS end your reply with a single line break followed by exactly:
  "Would you like to see how I can do this for your business? Book a strategy call below."
- Do not invent prices, features, or guarantees beyond the list above.
- Use plain text, no markdown headings.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, history = [] } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m: { role: string; text: string }) => ({
        role: m.role === "aura" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit. Try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI request failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aura-chat error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
