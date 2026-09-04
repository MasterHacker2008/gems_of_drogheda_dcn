import Image from "next/image";

import { EventCountdown } from "@/components/events/event-countdown";
import { PillButton } from "@/components/ui/pill-button";
import { urlForImage } from "@/lib/sanity/image";
import type { Event } from "@/lib/sanity/types";

type EventHeroProps = {
  event: Event;
};

function highlightHeadline(headline: string, highlight?: string) {
  if (!highlight) return headline;
  const index = headline.indexOf(highlight);
  if (index === -1) return headline;
  return (
    <>
      {headline.slice(0, index)}
      <span className="text-secondary">{highlight}</span>
      {headline.slice(index + highlight.length)}
    </>
  );
}

export function EventHero({ event }: EventHeroProps) {
  const heroImageUrl = event.heroImage
    ? urlForImage(event.heroImage).width(1400).height(1050).fit("crop").url()
    : null;

  const headline = event.heroHeadline ?? event.title;
  const subtitle = event.subtitle ?? event.detail;
  const kicker =
    event.kicker ??
    new Date(event.date).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] animate-halo-breathe rounded-full"
        style={{ background: "radial-gradient(circle at 40% 40%, hsl(var(--secondary) / .18), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-20 h-[360px] w-[360px] animate-halo-breathe rounded-full [animation-delay:1.5s]"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / .16), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-10 px-5 py-12 md:px-10 md:py-20">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground">
              {kicker}
            </span>
            {event.feeLabel ? (
              <span className="inline-flex items-center whitespace-nowrap rounded-full border border-border bg-muted px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                {event.feeLabel}
              </span>
            ) : null}
          </div>

          <h1 className="m-0 max-w-[12em] text-balance font-heading text-[clamp(2.625rem,6.8vw,5.5rem)] font-semibold leading-[1] tracking-tight text-foreground">
            {highlightHeadline(headline, event.heroHighlight)}
          </h1>

          {subtitle ? (
            <p className="max-w-[31em] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            {event.registerUrl && event.registerCtaLabel ? (
              <PillButton href={event.registerUrl} variant="gold" size="lg">
                {event.registerCtaLabel}
              </PillButton>
            ) : null}
            {event.secondaryCta ? (
              <PillButton href={event.secondaryCta.href} variant="outline" size="md">
                {event.secondaryCta.label}
              </PillButton>
            ) : null}
          </div>

          {event.countdownEnabled ? <EventCountdown targetIso={event.date} /> : null}
        </div>

        {heroImageUrl ? (
          <div className="relative">
            <div aria-hidden className="absolute -bottom-3.5 -right-3.5 h-full w-full rounded-[1.875rem] bg-secondary" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.875rem] shadow-[0_30px_54px_-26px_rgba(34,31,26,0.4)]">
              <Image
                src={heroImageUrl}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover [filter:saturate(1.1)_contrast(1.02)]"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(34,31,26,.5), transparent 56%)" }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
