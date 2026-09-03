import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import type { HomePage } from "@/lib/sanity/types";

type JoinBandProps = {
  homePage: HomePage;
};

export function JoinBand({ homePage }: JoinBandProps) {
  return (
    <section id="join" className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-10 overflow-hidden rounded-[2rem] bg-secondary p-8 md:p-14">
        <svg
          width={300}
          height={345}
          viewBox="0 0 26 30"
          aria-hidden
          className="absolute -bottom-24 -right-12 animate-gem-turn opacity-20 [animation-duration:80s]"
        >
          <path
            d="M13 1.6 L24 12 L13 28.4 L2 12 Z"
            fill="none"
            stroke="hsl(var(--secondary-foreground))"
            strokeWidth={0.6}
          />
        </svg>

        <div className="relative flex flex-col gap-4">
          {homePage.joinKicker ? (
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground">
              {homePage.joinKicker}
            </span>
          ) : null}
          {homePage.joinTitle ? (
            <h2 className="font-heading text-[clamp(1.75rem,3.8vw,3.125rem)] font-semibold leading-[1.02] tracking-tight text-secondary-foreground">
              {homePage.joinTitle}
            </h2>
          ) : null}
          {homePage.joinBody ? (
            <p className="max-w-[30em] text-pretty text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              {homePage.joinBody}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-1.5">
            {homePage.joinPrimaryCta ? (
              <PillButton href={homePage.joinPrimaryCta.href} variant="dark" size="md">
                {homePage.joinPrimaryCta.label}
              </PillButton>
            ) : null}
            {homePage.joinSecondaryCta ? (
              <PillButton href={homePage.joinSecondaryCta.href} variant="outline-on-gold" size="md">
                {homePage.joinSecondaryCta.label}
              </PillButton>
            ) : null}
          </div>
        </div>

        <div className="relative flex flex-col">
          {homePage.joinBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-3 border-b border-secondary-foreground/18 py-3.5 last:border-b-0"
            >
              <GemIcon size={14} fillClassName="text-secondary-foreground" className="mt-1" />
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-[16.5px] font-bold text-secondary-foreground">
                  {benefit.title}
                </span>
                <span className="text-sm leading-relaxed text-secondary-foreground/80">{benefit.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
