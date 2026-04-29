const brands = ["VOGUE", "HARPER'S BAZAAR", "ROBB REPORT", "TATLER", "FORBES", "ARCHITECTURAL DIGEST"];

export const AsSeenIn = () => (
  <section aria-label="Press features" className="border-y border-border py-12 bg-background">
    <div className="container">
      <p className="text-center text-[10px] uppercase tracking-luxe text-muted-foreground mb-8">
        As Seen In
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
        {brands.map((b) => (
          <span
            key={b}
            className="font-serif italic text-lg md:text-xl text-muted-foreground tracking-wide grayscale hover:opacity-100 hover:text-foreground transition-all duration-500"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  </section>
);
