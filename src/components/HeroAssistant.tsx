import { useState, useEffect } from "react";
import {
  Radio,
  Zap,
  Check,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowDown,
  ShieldCheck,
  CalendarCheck2,
  Sparkles,
  Layers,
} from "lucide-react";
import auraAvatar from "@/assets/aura-avatar.jpg";
import elenaAvatar from "@/assets/elena-avatar.jpg";
import marcusAvatar from "@/assets/marcus-avatar.jpg";

export type PipelineIndustryConfig = {
  key: "medspa" | "law" | "gym";
  label: string;
  assignedAgent: {
    id: "aura" | "elena" | "marcus";
    name: string;
    role: string;
    specialty: string;
  };
  triggerTitle: string;
  channels: string[];
  intent: string;
  qualification: string;
  actionTitle: string;
  actionDetail: string;
  integrations: string[];
  activity: string;
  inboundEvents: string[];
  statusLogs: {
    duration: string;
    action: string;
    tag: string;
  }[];
  metricsTicker: string;
};

const AGENT_NODES = [
  {
    id: "aura" as const,
    name: "Aura",
    industry: "medspa",
    role: "Aesthetic Concierge",
    avatar: auraAvatar,
    accent: "text-rose-400",
    borderActive: "border-rose-400/80 shadow-[0_0_18px_rgba(244,114,182,0.35)]",
    badgeActive: "bg-rose-500/20 text-rose-300 border-rose-400/40",
  },
  {
    id: "elena" as const,
    name: "Elena",
    industry: "law",
    role: "Legal Triage",
    avatar: elenaAvatar,
    accent: "text-amber-400",
    borderActive: "border-amber-400/80 shadow-[0_0_18px_rgba(212,175,55,0.35)]",
    badgeActive: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  },
  {
    id: "marcus" as const,
    name: "Marcus",
    industry: "gym",
    role: "Membership Closer",
    avatar: marcusAvatar,
    accent: "text-emerald-400",
    borderActive: "border-emerald-400/80 shadow-[0_0_18px_rgba(34,197,94,0.35)]",
    badgeActive: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  },
];

const PipelineConnector = ({ label }: { label?: string }) => (
  <div aria-hidden className="relative flex h-8 items-center justify-center my-0.5">
    <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 32" fill="none">
      <path
        d="M 100 0 L 100 32"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />
      <path
        d="M 100 0 L 100 32"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        className="animate-dash-flow"
      />
      <circle cx="100" cy="16" r="2.5" fill="hsl(var(--primary))" />
    </svg>
    {label && (
      <span className="absolute bg-[#0E0E12] px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider text-muted-foreground border border-white/10">
        {label}
      </span>
    )}
  </div>
);

export const HeroAssistant = ({ config }: { config: PipelineIndustryConfig }) => {
  const [eventIndex, setEventIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Rotate inbound trigger events
  useEffect(() => {
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % config.inboundEvents.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [config.inboundEvents.length]);

  // Rotate dynamic status feed highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % config.statusLogs.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [config.statusLogs.length]);

  const activeInboundEvent = config.inboundEvents[eventIndex] || config.inboundEvents[0];

  return (
    <div className="reveal reveal-delay-2 md:col-span-6 lg:col-span-6 w-full min-w-0 relative">
      {/* Background Visual Depth: Radial Glow */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 w-80 h-80 bg-pipeline-violet/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Dark Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-xl shadow-2xl p-4 sm:p-5 lg:p-6 transition-all duration-500">
        {/* Architectural SVG Dot-Grid Matrix */}
        <div aria-hidden className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Top Bar: Engine Status & Active Pipeline */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-white/90">
                  Agent Orchestration Pipeline
                </span>
                <p className="text-[10px] text-muted-foreground">
                  {config.label} Core · Live Autonomous Routing
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.15em] text-primary">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              12ms latency
            </div>
          </div>

          {/* Node 1: Inbound Trigger with Animated Live Event Badge */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-primary/40">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-pipeline-cyan font-semibold">
                <Radio className="w-3 h-3 text-pipeline-cyan animate-pulse" />
                01 · Inbound Gateway
              </span>
              <span className="text-[9px] font-mono text-muted-foreground">Ingesting live</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {/* Pulsing Animated Inbound Trigger Badge */}
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-medium text-white tracking-wide">
                  {activeInboundEvent}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {config.channels.map((channel) => (
                  <span
                    key={channel}
                    className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-muted-foreground"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Connecting Beam */}
          <PipelineConnector label="Neural Dispatch" />

          {/* Node 2: Live Agent Routing Nodes (Aura, Elena, Marcus) */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-pipeline-violet font-semibold">
                <ShieldCheck className="w-3 h-3 text-pipeline-violet" />
                02 · Live Agent Routing Nodes
              </span>
              <span className="text-[9px] font-mono text-primary font-medium">
                Active Node: {config.assignedAgent.name}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {AGENT_NODES.map((agent) => {
                const isActive = agent.id === config.assignedAgent.id;
                return (
                  <div
                    key={agent.id}
                    className={`relative rounded-xl border p-2.5 transition-all duration-300 flex flex-col items-center text-center ${
                      isActive
                        ? `${agent.borderActive} bg-[#181820]`
                        : "border-white/10 bg-white/[0.02] opacity-50 hover:opacity-75"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full text-[8px] font-mono uppercase tracking-wider font-semibold border bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
                        ROUTED
                      </span>
                    )}
                    <div className="relative mt-1">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className={`w-9 h-9 rounded-full object-cover border-2 ${
                          isActive ? "border-primary" : "border-white/20"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#181820]" />
                      )}
                    </div>
                    <div className="mt-1.5 font-semibold text-xs text-white">{agent.name}</div>
                    <div className="text-[9px] text-muted-foreground truncate w-full">
                      {agent.role}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Neural intent qualification bar */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[10px]">
              <span className="text-muted-foreground truncate">{config.intent}</span>
              <span className="inline-flex items-center gap-1 font-mono font-medium text-emerald-400 shrink-0">
                <Check className="w-3 h-3" />
                {config.qualification}
              </span>
            </div>
          </div>

          {/* Animated Connecting Beam */}
          <PipelineConnector label="Action Executed" />

          {/* Node 3: Autonomous Action Engine & CRM Synchronization */}
          <div className="rounded-xl border border-agent-online/30 bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-agent-online/60">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-agent-online font-semibold">
                <CalendarCheck2 className="w-3.5 h-3.5 text-agent-online" />
                03 · Autonomous Execution
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-medium text-agent-online border border-agent-online/30 bg-agent-online/10 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="font-sans text-xs sm:text-sm font-semibold text-white">
              {config.actionTitle}
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              {config.actionDetail}
            </p>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {config.integrations.map((integration) => (
                <span
                  key={integration}
                  className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-white/80"
                >
                  <Zap className="w-2.5 h-2.5 text-primary" />
                  {integration}
                </span>
              ))}
            </div>
          </div>

          {/* Dynamic Status Feed: Real-time Looping Activity Log */}
          <div className="rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-[10px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-white/60">
                <Terminal className="w-3 h-3 text-primary" />
                <span className="text-[9px] tracking-wider uppercase">autonomous-stream.log</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                STREAMING
              </div>
            </div>

            <div className="space-y-1.5">
              {config.statusLogs.map((log, idx) => {
                const isCurrent = idx === logIndex;
                return (
                  <div
                    key={log.action}
                    className={`flex items-center justify-between gap-2 px-2 py-1 rounded transition-colors duration-300 ${
                      isCurrent
                        ? "bg-white/[0.08] text-white border-l-2 border-primary"
                        : "text-white/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={isCurrent ? "text-primary" : "text-white/40"}>&gt;</span>
                      <span className="truncate">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="rounded bg-white/5 px-1.5 py-0.2 text-[8px] text-white/50 border border-white/5">
                        {log.tag}
                      </span>
                      <span className={isCurrent ? "text-emerald-400 font-semibold" : "text-white/40"}>
                        {log.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Performance Counter (Metrics Ticker) */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {config.metricsTicker}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-white/70">1.2s avg resolution</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-primary font-medium">99.9% uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
};