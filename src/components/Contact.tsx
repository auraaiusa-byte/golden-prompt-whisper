import { useState } from "react";
import { LuxeButton } from "./LuxeButton";
import { sendLead } from "@/lib/webhook";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const industry = fd.get("industry") as string;
    const message = (fd.get("message") as string)?.trim();

    // 1) Save to Supabase leads
    await supabase.from("leads").insert({
      email,
      source: `Contact · ${industry}`,
      lead_status: "new",
    });

    // 2) Send structured JSON to Make.com webhook
    await sendLead({ source: "contact", name, email, industry, message });

    // 3) Mailto fallback
    const subject = encodeURIComponent(`NavAura AI Inquiry — ${name} (${industry})`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nIndustry: ${industry}\n\n${message}`);
    window.location.href = `mailto:aura.usa@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-luxe text-gold">05 — Private Inquiry</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-6 mb-4">Begin the conversation.</h2>
          <p className="text-muted-foreground font-light">
            All inquiries are routed directly to <span className="text-gold">aura.usa@gmail.com</span>.
          </p>
        </div>

        <form onSubmit={onSubmit} className="luxe-card p-10 rounded-sm space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input required name="name" placeholder="Full name" className="bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold" />
            <input required type="email" name="email" placeholder="Email" className="bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold" />
          </div>
          <select required name="industry" defaultValue="" className="w-full bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold">
            <option value="" disabled>Select your industry</option>
            <option>Medical Spa</option>
            <option>Law Firm</option>
            <option>Gym / Fitness Studio</option>
            <option>Other</option>
          </select>
          <textarea required name="message" rows={5} placeholder="Tell us about your business…" className="w-full bg-secondary/60 border border-gold/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold" />
          <LuxeButton className="w-full animate-gold-pulse">Request Private Access</LuxeButton>
          {sent && <p className="text-xs text-gold text-center">Opening your email client to deliver this inquiry to aura.usa@gmail.com…</p>}
        </form>
      </div>
    </section>
  );
};
