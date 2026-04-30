// Centralized webhook dispatcher for NavAura AI lead capture.
// Configure your Make.com webhook URL via VITE_NAVAURA_WEBHOOK_URL.
// All payloads are also routed to aura.usa@gmail.com via the Make.com scenario.

export type LeadSource = "contact" | "exit-intent" | "vapi-call" | "chat";

export interface LeadPayload {
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
  meta?: Record<string, unknown>;
  submittedAt: string;
  pageUrl: string;
}

const WEBHOOK_URL =
  (import.meta.env.VITE_NAVAURA_WEBHOOK_URL as string | undefined) || "";

export async function sendLead(
  data: Omit<LeadPayload, "submittedAt" | "pageUrl">
): Promise<{ ok: boolean; skipped?: boolean }> {
  const payload: LeadPayload = {
    ...data,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
  };

  if (!WEBHOOK_URL) {
    // Webhook not yet configured — fail silently so mailto fallback still runs.
    if (typeof window !== "undefined") {
      console.info("[NavAura] Webhook not configured. Payload:", payload);
    }
    return { ok: false, skipped: true };
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch (err) {
    console.warn("[NavAura] Webhook delivery failed:", err);
    return { ok: false };
  }
}
