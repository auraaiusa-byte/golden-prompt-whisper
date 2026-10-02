import { useState } from "react";
import { ArrowDown, ArrowRight, CalendarCheck2, Check, ClipboardList, MessageCircleMore, ShieldCheck, UserRoundCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export type Industry = "medspa" | "gym" | "law";

export type Challenge = {
  pain: string;
  detail: string;
  solution: string;
  outcome: string;
};

export type JourneyStep = {
  title: string;
  label: string;
  detail: string;
};

const industryNames: Record<Industry, string> = {
  medspa: "aesthetic practice",
  gym: "fitness club",
  law: "law firm",
};

const accents: Record<Industry, { text: string; border: string; surface: string; ring: string }> = {
  medspa: { text: "text-agent-medspa", border: "border-agent-medspa/35", surface: "bg-agent-medspa/10", ring: "ring-agent-medspa/30" },
  gym: { text: "text-agent-gym", border: "border-agent-gym/35", surface: "bg-agent-gym/10", ring: "ring-agent-gym/30" },
  law: { text: "text-agent-law", border: "border-agent-law/35", surface: "bg-agent-law/10", ring: "ring-agent-law/30" },
};

export function IndustryChallengeSection({
  industry,
  eyebrow,
  title,
  description,
  items,
}: {
  industry: Industry;
  eyebrow: string;
  title: string;
  description: string;
  items: Challenge[];
}) {
  const accent = accents[industry];

  return (
    <section className="bg-secondary/45 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className={`text-[10px] uppercase tracking-[0.35em] ${accent.text}`}>{eyebrow}</span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl font-light leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <details key={item.pain} className={`group border bg-card p-7 transition-all open:ring-2 ${accent.border} ${accent.ring}`}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div>
                  <span className={`text-[10px] uppercase tracking-[0.25em] ${accent.text}`}>Opportunity 0{index + 1}</span>
                  <h3 className="mt-3 font-serif text-xl leading-snug">{item.pain}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
                <ArrowDown aria-hidden className={`mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-180 ${accent.text}`} />
              </summary>
              <div className="mt-6 border-t border-border pt-5">
                <p className={`text-[10px] uppercase tracking-[0.25em] ${accent.text}`}>Aura solution</p>
                <h4 className="mt-2 font-serif text-lg">{item.solution}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.outcome}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

type MetricInput = {
  key: "volume" | "conversion" | "value" | "hours";
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  format: (value: number) => string;
};

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const calculatorInputs: Record<Industry, MetricInput[]> = {
  medspa: [
    { key: "volume", label: "Unanswered inquiries each month", min: 2, max: 80, step: 1, initial: 24, format: (value) => `${value} inquiries` },
    { key: "conversion", label: "Inquiry-to-visit conversion", min: 5, max: 80, step: 1, initial: 32, format: (value) => `${value}%` },
    { key: "value", label: "Average first visit", min: 100, max: 2000, step: 50, initial: 420, format: money },
  ],
  gym: [
    { key: "volume", label: "Unanswered trial inquiries each month", min: 2, max: 120, step: 1, initial: 28, format: (value) => `${value} inquiries` },
    { key: "conversion", label: "Trial-to-membership conversion", min: 5, max: 80, step: 1, initial: 30, format: (value) => `${value}%` },
    { key: "value", label: "Average monthly membership dues", min: 40, max: 1000, step: 10, initial: 189, format: money },
  ],
  law: [
    { key: "volume", label: "Unanswered suitable-case inquiries each month", min: 1, max: 80, step: 1, initial: 16, format: (value) => `${value} inquiries` },
    { key: "conversion", label: "Qualified inquiry-to-client conversion", min: 5, max: 80, step: 1, initial: 28, format: (value) => `${value}%` },
    { key: "value", label: "Average initial retainer", min: 1000, max: 50000, step: 500, initial: 8500, format: money },
    { key: "hours", label: "Intake hours returned to billable work per new matter", min: 0.5, max: 12, step: 0.5, initial: 3, format: (value) => `${value} hours` },
  ],
};

export function IndustryROICalculator({ industry }: { industry: Industry }) {
  const accent = accents[industry];
  const [inputs, setInputs] = useState(() => Object.fromEntries(calculatorInputs[industry].map((input) => [input.key, input.initial])) as Record<MetricInput["key"], number>);
  const estimatedCustomers = inputs.volume * inputs.conversion / 100;
  const estimatedValue = estimatedCustomers * inputs.value;
  const billableHoursReturned = estimatedCustomers * (inputs.hours ?? 0);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className={`text-[10px] uppercase tracking-[0.35em] ${accent.text}`}>Growth calculator</span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">Put the missed calls in perspective.</h2>
          <p className="mt-5 font-light leading-relaxed text-muted-foreground">Adjust the estimates to reflect your {industryNames[industry]}; the result updates as you go.</p>
        </div>
        <div className="mx-auto grid max-w-5xl overflow-hidden border border-border bg-card lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 p-6 md:p-10">
            {calculatorInputs[industry].map((input) => (
              <div key={input.key}>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <label className="text-sm text-foreground">{input.label}</label>
                  <output className={`font-serif text-lg ${accent.text}`}>{input.format(inputs[input.key])}</output>
                </div>
                <Slider
                  aria-label={input.label}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={[inputs[input.key]]}
                  onValueChange={(values) => {
                    const next = values[0];
                    if (next !== undefined) setInputs((current) => ({ ...current, [input.key]: next }));
                  }}
                  className={accent.text}
                />
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>{input.format(input.min)}</span><span>{input.format(input.max)}</span></div>
              </div>
            ))}
          </div>
          <div className={`flex flex-col justify-between border-t border-border p-7 md:p-10 lg:border-l lg:border-t-0 ${accent.surface}`}>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground"><Zap className={`h-4 w-4 ${accent.text}`} /> Potential monthly impact</div>
              <div className={`mt-5 font-serif text-5xl md:text-6xl ${accent.text}`}>{money(estimatedValue)}</div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Estimated {industry === "gym" ? "recurring dues from" : industry === "law" ? "initial retainer potential from" : "value from"} about {estimatedCustomers.toFixed(1)} recovered {industry === "gym" ? "members" : industry === "law" ? "new matters" : "visits"} per month.</p>
              {industry === "law" && <div className={`mt-6 border-t border-border/70 pt-5 ${accent.text}`}><div className="font-serif text-2xl">{billableHoursReturned.toFixed(1)} hours</div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">of intake capacity returned to billable work each month.</p></div>}
            </div>
            <p className="mt-8 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">Illustrative estimate based only on the inputs shown. Actual results vary; this is not a revenue guarantee.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const flowIcons = [MessageCircleMore, UserRoundCheck, ShieldCheck, CalendarCheck2];

export function IntakeJourneyShowcase({ industry, eyebrow, title, description, steps }: {
  industry: Industry;
  eyebrow: string;
  title: string;
  description: string;
  steps: JourneyStep[];
}) {
  const accent = accents[industry];
  const [activeStep, setActiveStep] = useState(0);
  const selected = steps[activeStep] ?? steps[0];

  return (
    <section className="bg-secondary/45 py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className={`text-[10px] uppercase tracking-[0.35em] ${accent.text}`}>{eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">{title}</h2>
            <p className="mt-6 max-w-xl font-light leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-8 flex items-start gap-3 border-t border-border pt-6">
              <ClipboardList className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
              <div><p className="font-serif text-lg">{selected?.title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected?.detail}</p></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-border bg-card p-5 md:p-8">
              <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
                <div><p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Live intake journey</p><p className="mt-1 font-serif text-xl">From first message to confirmed next step</p></div>
                <span className={`inline-flex items-center gap-2 text-xs ${accent.text}`}><span className="h-2 w-2 animate-pulse rounded-full bg-current" /> Active</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {steps.map((step, index) => {
                  const Icon = flowIcons[index % flowIcons.length] ?? Check;
                  const active = activeStep === index;
                  return (
                    <Button key={step.label} type="button" variant="outline" aria-pressed={active} onClick={() => setActiveStep(index)} className={`h-auto min-h-24 justify-start gap-4 whitespace-normal border p-4 text-left ${active ? `${accent.border} ${accent.surface}` : "border-border bg-background"}`}>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center border ${active ? `${accent.border} ${accent.surface} ${accent.text}` : "border-border text-muted-foreground"}`}><Icon className="h-4 w-4" /></span>
                      <span className="min-w-0"><span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">0{index + 1} · {step.label}</span><span className="mt-1 block font-serif text-base leading-snug">{step.title}</span></span>
                    </Button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-xs text-muted-foreground"><Check className={`h-4 w-4 shrink-0 ${accent.text}`} /><span>Qualified context travels with the booking into your CRM and calendar workflow.</span><ArrowRight className={`ml-auto h-4 w-4 shrink-0 ${accent.text}`} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}