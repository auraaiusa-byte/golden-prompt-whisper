import { useState } from "react";
import { Phone, PhoneCall } from "lucide-react";
import { LuxeButton } from "./LuxeButton";
import { sendLead } from "@/lib/webhook";

// Vapi-ready outbound call request. The webhook receiver (Make.com)
// can forward this payload to a Vapi.ai outbound call endpoint.
export const CallMe = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "queued" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/[^\d+]/g, "");
    if (cleaned.length < 7) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await sendLead({
      source: "vapi-call",
      name: name || undefined,
      phone: cleaned,
      message: "Outbound NavAura AI voice call requested",
      meta: { vapi: { action: "outbound_call", assistant: "navaura-voice" } },
    });
    setStatus(res.ok || res.skipped ? "queued" : "error");
  };

  return (
    <div id="call-me" className="luxe-card rounded-sm p-6 sm:p-8 mt-12 max-w-xl mx-auto md:mx-0">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex w-10 h-10 rounded-full border border-gold/40 items-center justify-center">
          <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="font-serif text-xl">Experience Live AI Voice</h3>
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            NavAura AI will call you in under 30 seconds
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={80}
          className="w-full bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 123-4567"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          className="w-full bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold"
        />
        <LuxeButton
          type="submit"
          className="w-full animate-gold-pulse min-h-[48px] flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          {status === "sending" ? "Connecting…" : "Call Me Now"}
        </LuxeButton>
        {status === "queued" && (
          <p className="text-xs text-gold text-center">
            ✓ Queued — NavAura AI will dial you shortly. A copy was routed to aura.usa@gmail.com.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-destructive text-center">
            Please enter a valid phone number.
          </p>
        )}
      </form>
    </div>
  );
};
