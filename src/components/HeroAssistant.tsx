import {
  ArrowDown,
  BrainCircuit,
  CalendarCheck2,
  Check,
  Radio,
  ShieldCheck,
} from "lucide-react";

export type PipelineIndustryConfig = {
  label: string;
  triggerTitle: string;
  channels: string[];
  intent: string;
  qualification: string;
  actionTitle: string;
  actionDetail: string;
  integrations: string[];
  activity: string;
};

const PipelineBeam = () => (
  <div aria-hidden className="relative flex h-12 items-center justify-center overflow-hidden">
    <div className="h-full w-px bg-gradient-to-b from-pipeline-cyan/20 via-pipeline-cyan/70 to-pipeline-violet/30" />
    <span className="pipeline-beam absolute top-0 h-5 w-px bg-pipeline-cyan shadow-pipeline-cyan" />
    <ArrowDown className="absolute bottom-0 h-3.5 w-3.5 text-pipeline-cyan" />
  </div>
);

export const HeroAssistant = ({ config }: { config: PipelineIndustryConfig }) => (
  <div className="reveal reveal-delay-2 md:col-span-6 lg:col-span-6 w-full min-w-0">
    <div className="pipeline-shell relative overflow-hidden rounded-2xl border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5 lg:p-6">
      <div aria-hidden className="pipeline-grid absolute inset-0 opacity-30" />
      <div aria-hidden className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-pipeline-cyan/10 blur-3xl" />
      <div aria-hidden className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pipeline-violet/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-pipeline-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-agent-online opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-agent-online" />
              </span>
              Live autonomous pipeline
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{config.label} workflow · processing now</p>
          </div>
          <div className="rounded-md border border-pipeline-violet/30 bg-pipeline-violet/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-pipeline-violet">
            System online
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-pipeline-cyan/30 bg-background/70 p-4 transition-colors duration-300 hover:border-pipeline-cyan/60">
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pipeline-cyan/30 bg-pipeline-cyan/10 text-pipeline-cyan">
                <Radio className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-agent-online ring-4 ring-agent-online/15" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pipeline-cyan">01 · Trigger</span>
                  <span className="text-[10px] text-muted-foreground">0.0s</span>
                </div>
                <h3 className="mt-1 font-sans text-sm font-semibold text-foreground sm:text-base">{config.triggerTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {config.channels.map((channel) => <span key={channel} className="rounded-md border border-border bg-secondary/80 px-2 py-1 text-[10px] text-muted-foreground">{channel}</span>)}
                </div>
              </div>
            </div>
          </div>

          <PipelineBeam />

          <div className="relative overflow-hidden rounded-xl border border-pipeline-violet/40 bg-background/80 p-4 transition-colors duration-300 hover:border-pipeline-violet/70">
            <div aria-hidden className="pipeline-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-pipeline-violet to-transparent" />
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-pipeline-violet/30 bg-pipeline-violet/10 text-pipeline-violet">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pipeline-violet">02 · AI processing engine</span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-pipeline-violet/30 bg-pipeline-violet/10 px-2 py-1 text-[9px] font-semibold text-pipeline-violet"><ShieldCheck className="h-3 w-3" />Aura Autonomous Core v2.4</span>
                </div>
                <p className="mt-2 text-sm text-foreground">{config.intent}</p>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/70 pt-3 text-[10px]">
                  <span className="text-muted-foreground">Qualifying high-intent inquiry…</span>
                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.12em] text-agent-online"><Check className="h-3 w-3" />{config.qualification}</span>
                </div>
              </div>
            </div>
          </div>

          <PipelineBeam />

          <div className="rounded-xl border border-agent-online/30 bg-background/70 p-4 transition-colors duration-300 hover:border-agent-online/60">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-agent-online/30 bg-agent-online/10 text-agent-online">
                <CalendarCheck2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-agent-online">03 · Action taken</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-agent-online"><Check className="h-3 w-3" />Verified</span>
                </div>
                <h3 className="mt-1 font-sans text-sm font-semibold text-foreground sm:text-base">{config.actionTitle}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{config.actionDetail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {config.integrations.map((integration) => <span key={integration} className="inline-flex items-center gap-1 rounded-md border border-agent-online/20 bg-agent-online/10 px-2 py-1 text-[10px] text-agent-online"><Check className="h-2.5 w-2.5" />{integration}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/80 pt-4 text-[10px] text-muted-foreground">
          <span>{config.activity}</span>
          <span className="font-semibold uppercase tracking-[0.16em] text-agent-online">Completed in 2.1s</span>
        </div>
      </div>
    </div>
  </div>
);