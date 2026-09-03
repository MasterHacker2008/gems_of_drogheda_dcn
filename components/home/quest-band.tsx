import { PillButton } from "@/components/ui/pill-button";
import type { HomePage, SiteSettings } from "@/lib/sanity/types";

type QuestBandProps = {
  homePage: HomePage;
  registerUrl: SiteSettings["registerUrl"];
};

export function QuestBand({ homePage, registerUrl }: QuestBandProps) {
  return (
    <section id="quest" className="relative w-full overflow-hidden bg-foreground text-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-sheen"
        style={{
          background:
            "linear-gradient(100deg, transparent 36%, hsl(var(--secondary) / .1) 50%, transparent 64%)",
        }}
      />
      <svg
        width={230}
        height={265}
        viewBox="0 0 26 30"
        aria-hidden
        className="absolute -right-8 -top-10 animate-gem-turn opacity-[.13]"
      >
        <path d="M13 1.6 L24 12 L13 28.4 L2 12 Z" fill="none" stroke="hsl(var(--secondary))" strokeWidth={0.7} />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-5 py-14 md:px-10">
        <div className="flex flex-col gap-3.5">
          {homePage.questKicker ? (
            <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.13em] text-secondary-foreground">
              {homePage.questKicker}
            </span>
          ) : null}
          {homePage.questTitle ? (
            <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.9rem)] font-semibold leading-[1.03] tracking-tight">
              {homePage.questTitle}
            </h2>
          ) : null}
          {homePage.questDescription ? (
            <p className="max-w-[32em] text-pretty text-base leading-relaxed text-background/72 md:text-lg">
              {homePage.questDescription}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            {homePage.questPrimaryCtaLabel ? (
              <PillButton href={registerUrl} variant="gold" size="md">
                {homePage.questPrimaryCtaLabel}
              </PillButton>
            ) : null}
            {homePage.questSecondaryCta ? (
              <PillButton href={homePage.questSecondaryCta.href} variant="outline-on-dark" size="md">
                {homePage.questSecondaryCta.label}
              </PillButton>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
          {homePage.questStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 rounded-[1.375rem] border border-background/16 bg-background/[.04] p-5"
            >
              <span className="font-heading text-[clamp(1.875rem,3.4vw,2.625rem)] font-bold leading-none tracking-tight text-secondary tabular-nums">
                {stat.value}
              </span>
              <span className="text-[13.5px] leading-snug text-background/66">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
