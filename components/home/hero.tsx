import Image from "next/image";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import { urlForImage } from "@/lib/sanity/image";
import type { HomePage } from "@/lib/sanity/types";

type HeroProps = {
  homePage: HomePage;
};

const DRIFTING_GEMS: Array<{ className: string; size: number; twoTone?: { top: string; side: string } }> = [
  { className: "top-[6%] left-[2%]", size: 42, twoTone: { top: "fill-primary", side: "fill-secondary" } },
  { className: "bottom-[10%] right-[1%]", size: 28 },
  { className: "top-[22%] right-[6%]", size: 20 },
  { className: "bottom-[22%] left-[8%]", size: 16 },
];

export function Hero({ homePage }: HeroProps) {
  const heroImageUrl = homePage.heroImage
    ? urlForImage(homePage.heroImage).width(1100).height(1300).fit("crop").url()
    : null;

  return (
    <section id="top" className="relative w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-36 h-[520px] w-[520px] animate-halo-breathe rounded-full"
        style={{ background: "radial-gradient(circle at 40% 40%, hsl(var(--primary) / .16), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-28 h-[380px] w-[380px] animate-halo-breathe rounded-full [animation-delay:2s]"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(var(--secondary) / .18), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(330px,1fr))] items-center gap-12 px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-5">
          {homePage.heroKicker ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F1F0] px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] text-primary">
              {homePage.heroKicker}
            </span>
          ) : null}

          <h1 className="text-balance font-heading text-[clamp(2.6rem,6.4vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
            {homePage.heroHeading}
          </h1>

          {homePage.heroSubheading ? (
            <p className="max-w-[33em] text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {homePage.heroSubheading}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            {homePage.heroPrimaryCta ? (
              <PillButton href={homePage.heroPrimaryCta.href} variant="primary" size="lg">
                {homePage.heroPrimaryCta.label}
              </PillButton>
            ) : null}
            {homePage.heroSecondaryCta ? (
              <PillButton href={homePage.heroSecondaryCta.href} variant="outline" size="md">
                <GemIcon size={13} fillClassName="text-secondary" />
                {homePage.heroSecondaryCta.label}
              </PillButton>
            ) : null}
          </div>
        </div>

        <div className="relative flex min-h-[340px] items-center justify-center md:min-h-[480px]">
          <div
            aria-hidden
            className="absolute aspect-square w-[74%] max-w-[380px] animate-halo-breathe rounded-full [animation-duration:9s]"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / .14), transparent 68%)" }}
          />

          {heroImageUrl ? (
            <div
              className="relative aspect-[1/1.18] w-[78%] max-w-[400px] overflow-hidden shadow-[0_26px_60px_-30px_rgba(34,31,26,0.6)]"
              style={{ clipPath: "polygon(50% 0%, 100% 36%, 50% 100%, 0% 36%)" }}
            >
              <Image
                src={heroImageUrl}
                alt="A row of Drogheda town-centre shopfronts"
                fill
                sizes="(min-width: 768px) 400px, 78vw"
                className="object-cover [filter:saturate(.92)_contrast(.96)]"
                priority
              />
            </div>
          ) : null}

          <svg
            viewBox="0 0 400 472"
            aria-hidden
            className="pointer-events-none absolute w-[78%] max-w-[400px]"
          >
            <path
              d="M200 0 L400 170 L200 472 L0 170 Z"
              fill="none"
              stroke="hsl(var(--secondary) / .75)"
              strokeWidth={3}
            />
          </svg>

          {DRIFTING_GEMS.map((gem, i) => (
            <GemIcon
              key={i}
              size={gem.size}
              twoTone={gem.twoTone}
              fillClassName={gem.twoTone ? undefined : "text-secondary"}
              className={`absolute animate-gem-drift ${gem.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
