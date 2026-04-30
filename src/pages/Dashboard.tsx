import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, Users, BarChart3, Settings as SettingsIcon, ArrowUpRight,
  TrendingUp, Phone, Calendar, DollarSign, CheckCircle2, Clock,
} from "lucide-react";
import { Seo } from "@/components/Seo";

type View = "leads" | "analytics" | "settings";

const navItems: { id: View; label: string; icon: typeof Users }[] = [
  { id: "leads", label: "Leads", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const leads = [
  { name: "Sarah Mitchell", source: "Instagram DM", industry: "Med Spa", stage: "Booked", value: "$1,240", time: "2m ago", status: "won" },
  { name: "James O'Connor", source: "Google Ads", industry: "Law Firm", stage: "Qualified", value: "$8,500", time: "12m ago", status: "active" },
  { name: "Priya Patel", source: "Website Form", industry: "Gym", stage: "Trial Booked", value: "$199", time: "34m ago", status: "active" },
  { name: "Marcus Lee", source: "Voice Call", industry: "Med Spa", stage: "Consultation", value: "$3,400", time: "1h ago", status: "active" },
  { name: "Elena Rodriguez", source: "Instagram DM", industry: "Gym", stage: "Member", value: "$1,788", time: "2h ago", status: "won" },
  { name: "David Chen", source: "Referral", industry: "Law Firm", stage: "Intake", value: "$12,000", time: "3h ago", status: "active" },
  { name: "Olivia Brooks", source: "Facebook", industry: "Med Spa", stage: "Booked", value: "$890", time: "5h ago", status: "won" },
];

const revenueChart = [
  { week: "W1", value: 24 }, { week: "W2", value: 38 }, { week: "W3", value: 45 },
  { week: "W4", value: 52 }, { week: "W5", value: 61 }, { week: "W6", value: 78 },
  { week: "W7", value: 84 }, { week: "W8", value: 96 },
];

const Dashboard = () => {
  const [view, setView] = useState<View>("leads");
  const max = Math.max(...revenueChart.map((d) => d.value));

  return (
    <>
      <Seo
        title="NavAura AI · Live Demo Dashboard"
        description="Experience the NavAura AI client dashboard — lead pipeline, revenue saved, and 24/7 AI performance metrics in one premium SaaS interface."
        path="/demo-dashboard"
        keywords="NavAura AI dashboard, AI lead pipeline, AI performance metrics, SaaS demo, business automation dashboard"
      />
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-card/40 md:sticky md:top-0">
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-xl">NavAura</span>
              <span className="text-gold text-[10px] tracking-luxe uppercase pt-1">AI</span>
            </Link>
            <div className="text-[10px] uppercase tracking-luxe text-muted-foreground mt-2">Client Dashboard</div>
          </div>
          <nav className="p-4 flex md:flex-col gap-1 overflow-x-auto">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors whitespace-nowrap ${
                  view === id
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block p-4 mt-auto">
            <Link
              to="/"
              className="text-xs uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors"
            >
              ← Back to site
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-10">
            <div className="px-6 md:px-10 py-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-luxe text-gold">Live Preview</div>
                <h1 className="font-serif text-xl md:text-2xl mt-1 capitalize">{view}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  All systems operational
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 md:p-10 space-y-8">
            {/* Stat row (always visible) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat icon={Activity} label="AI Response Rate" value="98%" delta="+2.1%" tone="gold" />
              <Stat icon={DollarSign} label="Revenue Saved" value="$84,210" delta="+18%" tone="emerald" />
              <Stat icon={Phone} label="Calls Handled" value="1,247" delta="24/7" tone="muted" />
              <Stat icon={Calendar} label="Bookings This Week" value="312" delta="+24%" tone="gold" />
            </div>

            {view === "leads" && <LeadsView />}
            {view === "analytics" && <AnalyticsView chart={revenueChart} max={max} />}
            {view === "settings" && <SettingsView />}
          </div>
        </div>
      </div>
    </>
  );

  function LeadsView() {
    return (
      <div className="luxe-card rounded-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg">Lead Pipeline</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time leads captured by your NavAura AI agents</p>
          </div>
          <span className="text-xs text-gold uppercase tracking-luxe">Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-luxe text-muted-foreground">
                <th className="px-6 py-4 font-normal">Lead</th>
                <th className="px-6 py-4 font-normal">Source</th>
                <th className="px-6 py-4 font-normal hidden md:table-cell">Industry</th>
                <th className="px-6 py-4 font-normal">Stage</th>
                <th className="px-6 py-4 font-normal text-right">Value</th>
                <th className="px-6 py-4 font-normal text-right hidden sm:table-cell">When</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{l.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.source}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{l.industry}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${
                      l.status === "won"
                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                        : "border-gold/40 text-gold bg-gold/10"
                    }`}>
                      {l.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-foreground/90">{l.value}</td>
                  <td className="px-6 py-4 text-right text-xs text-muted-foreground hidden sm:table-cell">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

const Stat = ({
  icon: Icon, label, value, delta, tone,
}: { icon: typeof Users; label: string; value: string; delta: string; tone: "gold" | "emerald" | "muted" }) => (
  <div className="luxe-card rounded-sm p-6">
    <div className="flex items-center justify-between mb-5">
      <Icon className={`w-5 h-5 ${tone === "gold" ? "text-gold" : tone === "emerald" ? "text-emerald-400" : "text-muted-foreground"}`} strokeWidth={1.5} />
      <span className={`text-[10px] uppercase tracking-luxe flex items-center gap-1 ${
        tone === "emerald" ? "text-emerald-400" : tone === "gold" ? "text-gold" : "text-muted-foreground"
      }`}>
        {tone !== "muted" && <ArrowUpRight className="w-3 h-3" />} {delta}
      </span>
    </div>
    <div className="font-serif text-3xl mb-1">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const AnalyticsView = ({ chart, max }: { chart: { week: string; value: number }[]; max: number }) => (
  <div className="grid lg:grid-cols-3 gap-6">
    <div className="luxe-card rounded-sm p-6 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg">Revenue Saved</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Hours automated × your hourly rate (last 8 weeks)</p>
        </div>
        <TrendingUp className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <div className="flex items-end justify-between gap-2 h-56">
        {chart.map((d) => (
          <div key={d.week} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-sm bg-gradient-to-t from-gold/20 to-gold transition-all hover:from-gold/40 hover:to-gold-soft"
                 style={{ height: `${(d.value / max) * 100}%` }} />
            <span className="text-[10px] text-muted-foreground">{d.week}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="luxe-card rounded-sm p-6 space-y-5">
      <div>
        <h2 className="font-serif text-lg">AI Performance</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
      </div>
      <PerfRow icon={CheckCircle2} label="Response Rate" value="98%" />
      <PerfRow icon={Clock} label="Avg Reply Time" value="14s" />
      <PerfRow icon={Calendar} label="Booking Conversion" value="62%" />
      <PerfRow icon={Phone} label="Calls Answered" value="100%" />
    </div>
  </div>
);

const PerfRow = ({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) => (
  <div className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
      <span className="text-sm text-foreground/80">{label}</span>
    </div>
    <span className="font-serif text-lg text-gold">{value}</span>
  </div>
);

const SettingsView = () => (
  <div className="luxe-card rounded-sm p-8 max-w-2xl">
    <h2 className="font-serif text-xl mb-1">Workspace Settings</h2>
    <p className="text-xs text-muted-foreground mb-8">Demo preview — full controls unlock for members.</p>
    <div className="space-y-5">
      {[
        { label: "Workspace name", value: "NavAura · Demo" },
        { label: "Primary contact", value: "aura.usa@gmail.com" },
        { label: "Active AI agents", value: "Med Spa, Law, Gym" },
        { label: "Webhook integration", value: "Make.com · Connected" },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
          <span className="text-sm text-muted-foreground">{row.label}</span>
          <span className="text-sm text-foreground/90">{row.value}</span>
        </div>
      ))}
    </div>
    <a href="/#contact" className="inline-block mt-8 text-xs uppercase tracking-luxe text-gold border-b border-gold/40 pb-1 hover:border-gold">
      Request Private Access →
    </a>
  </div>
);

export default Dashboard;
