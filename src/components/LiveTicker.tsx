const items = [
  "NavAura just booked a lead for a Med Spa in Beverly Hills",
  "Processing intake documents for a Manhattan law firm",
  "Reactivated 12 lapsed members at a boutique gym",
  "Confirmed a HydraFacial appointment in 2.1 seconds",
  "Triaged a personal-injury case inquiry · routed to senior counsel",
  "Sent personalized trial offer to 47 fitness leads",
  "Synced 8 calendar events across 3 medspa locations",
  "Drafted follow-up email for a corporate law inquiry",
];

export const LiveTicker = () => (
  <div className="relative border-y border-gold/20 bg-background/60 backdrop-blur-md py-3 overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    <div className="flex gap-12 whitespace-nowrap animate-[ticker_45s_linear_infinite]">
      {[...items, ...items].map((t, i) => (
        <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-luxe text-foreground/70 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span>{t}</span>
          <span className="text-gold/40">◆</span>
        </div>
      ))}
    </div>
    <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
  </div>
);
