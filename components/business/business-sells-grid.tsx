import type { Business } from "@/lib/sanity/types";

type BusinessSellsGridProps = {
  business: Business;
};

export function BusinessSellsGrid({ business }: BusinessSellsGridProps) {
  const sells = business.sells ?? [];
  if (sells.length === 0) return null;

  return (
    <section className="flex flex-col gap-7 px-5 pt-12 md:gap-8 md:px-12 md:pt-20">
      <div className="flex flex-wrap items-baseline gap-4 border-t border-background/14 pt-8 md:pt-12">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
          {business.sellsHeading ?? "What they sell"}
        </span>
        {business.sellsSubheading ? (
          <span className="text-[15px] text-background/55">{business.sellsSubheading}</span>
        ) : null}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-[1.375rem] border border-background/14 bg-foreground">
        {sells.map((item, i) => (
          <div
            key={item._key}
            className="flex min-h-[150px] flex-col gap-2 bg-foreground p-6 shadow-[0_0_0_1px_rgba(255,249,238,.14)] transition-colors hover:bg-background/[.06]"
          >
            <span className="font-heading text-xs font-bold tabular-nums tracking-[0.1em] text-[var(--accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight text-background">{item.title}</span>
            <span className="text-pretty text-[15px] leading-relaxed text-background/62">{item.body}</span>
          </div>
        ))}
        {business.sellsFooterTitle ? (
          <div
            className="flex min-h-[150px] flex-col justify-center gap-2.5 p-6 shadow-[0_0_0_1px_rgba(255,249,238,.14)]"
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)" }}
          >
            <span className="font-heading text-lg font-semibold" style={{ color: "var(--accent-light)" }}>
              {business.sellsFooterTitle}
            </span>
            {business.sellsFooterBody ? (
              <span className="text-[15px] leading-relaxed text-background/72">{business.sellsFooterBody}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
