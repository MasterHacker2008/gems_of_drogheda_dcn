import { PillButton } from "@/components/ui/pill-button";
import type { EventPrize } from "@/lib/sanity/types";

type EventPrizesProps = {
  heading?: string;
  tally?: string;
  intro?: string;
  prizes?: EventPrize[];
  joinCtaHref?: string;
};

export function EventPrizes({ heading, tally, intro, prizes, joinCtaHref }: EventPrizesProps) {
  if (!prizes || prizes.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-10 md:gap-14">
        <div className="flex flex-col gap-4">
          {heading ? (
            <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-[#F5BC60] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3D2606]">
              {heading}
            </span>
          ) : null}
          {tally ? (
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-[clamp(3.75rem,8.6vw,7.25rem)] font-semibold leading-[0.88] tracking-tight tabular-nums text-[#DE9019]">
                {tally}
              </span>
              <span className="font-heading text-3xl font-semibold text-primary">+</span>
            </div>
          ) : null}
          {intro ? (
            <p className="max-w-[26em] text-pretty text-lg leading-[1.78] text-muted-foreground">{intro}</p>
          ) : null}
          {joinCtaHref ? (
            <PillButton href={joinCtaHref} variant="primary" size="md" className="w-fit">
              Pledge a prize
            </PillButton>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-[#C9B994] bg-background">
          {prizes.map((prize) => (
            <div
              key={prize._key}
              className="flex items-center justify-between gap-4 border-b border-[#EEE3CF] px-6 py-4 transition-[background-color,padding-left] duration-150 last:border-b-0 hover:bg-[#E8F1F0] hover:pl-8"
            >
              <span className="font-heading text-lg font-semibold text-foreground">{prize.name}</span>
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#F5BC60] px-3.5 py-1.5 text-sm font-bold tabular-nums text-[#3D2606]">
                {prize.prize}
              </span>
            </div>
          ))}
          <div className="bg-muted px-6 py-4 text-sm text-muted-foreground">
            Pool still growing — check back as more partners join.
          </div>
        </div>
      </div>
    </section>
  );
}
