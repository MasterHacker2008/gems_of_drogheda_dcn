import { Badge } from "@/components/ui/badge";
import type { Business } from "@/lib/sanity/types";

type BusinessHeroProps = {
  business: Business;
};

function formatListedDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long" });
}

export function BusinessHero({ business }: BusinessHeroProps) {
  const eyebrow = [business.trade, ...(business.areaLinks?.map((a) => a.label) ?? [])].filter(Boolean).join(" · ");
  const listedDate = formatListedDate(business.listedDate);

  return (
    <section className="flex flex-col items-center gap-6 px-5 pt-12 text-center md:px-12 md:pt-20">
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">{eyebrow}</span>
      ) : null}

      <h1 className="m-0 font-heading text-[clamp(3.6rem,11vw,8.75rem)] font-semibold uppercase leading-[0.9] tracking-tight">
        {business.displayName}
      </h1>

      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-background/28 md:w-24" />
        <span className="font-heading text-[clamp(0.95rem,2.2vw,1.625rem)] font-medium uppercase tracking-[0.32em]">
          {business.trade}
        </span>
        <span className="h-px w-10 bg-background/28 md:w-24" />
      </div>

      {business.tagline ? (
        <p className="max-w-[30em] text-pretty text-lg leading-relaxed text-background/78">{business.tagline}</p>
      ) : null}

      <div className="flex flex-wrap justify-center gap-2.5 pt-1">
        {business.isMember ? (
          <Badge
            className="border-transparent px-4 py-1.5 text-[13px] font-bold"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            DCN Member
          </Badge>
        ) : null}
        {business.badges?.map((badge) => (
          <Badge
            key={badge}
            variant="outline"
            className="border-background/26 px-4 py-1.5 text-[13px] font-semibold text-background"
          >
            {badge}
          </Badge>
        ))}
      </div>

      {listedDate || business.author ? (
        <span className="pt-0.5 text-[13px] text-background/50">
          {listedDate ? `Listed ${listedDate}` : null}
          {listedDate && business.author ? " · " : null}
          {business.author ? <>Written by <span className="text-background/72">{business.author.name}</span></> : null}
        </span>
      ) : null}
    </section>
  );
}
