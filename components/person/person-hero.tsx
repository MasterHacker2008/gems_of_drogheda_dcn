import Image from "next/image";

import { GemIcon } from "@/components/ui/gem-icon";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type PersonHeroProps = {
  eyebrow: string;
  area: string;
  firstName: string;
  lastName: string;
  tagline: string;
  portraitImage?: SanityImage;
  portraitAlt: string;
};

export function PersonHero({ eyebrow, area, firstName, lastName, tagline, portraitImage, portraitAlt }: PersonHeroProps) {
  return (
    <header className="relative w-full overflow-hidden bg-primary px-5 py-9 text-background md:px-12 md:py-16 md:pb-24">
      <div className="pointer-events-none absolute -right-36 -top-40 h-[520px] w-[520px] animate-halo-breathe rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.55),hsl(var(--secondary)/0)_65%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] animate-halo-breathe rounded-full bg-[radial-gradient(circle,hsl(var(--background)/0.22),hsl(var(--background)/0)_65%)] [animation-delay:1s]" />

      <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center gap-9 md:gap-16">
        <div className="flex min-w-0 flex-1 basis-[480px] flex-col gap-5 animate-fade-up">
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-3.5 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-secondary-foreground">
              {eyebrow}
            </span>
            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-background/40 px-3.5 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-background">
              {area}
            </span>
          </div>

          <h1 className="m-0 font-heading text-[clamp(4rem,12vw,10.5rem)] font-extrabold leading-[0.84] tracking-[-0.055em]">
            {firstName}
            <br />
            <span className="text-secondary">{lastName}</span>
          </h1>

          <p className="m-0 max-w-[24em] text-pretty text-[clamp(1.125rem,2.1vw,1.375rem)] leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="relative mx-auto max-w-[480px] flex-1 basis-[360px]">
          <div className="relative aspect-[1/1.12] overflow-hidden bg-[#15707F] [clip-path:polygon(50%_0,100%_34%,50%_100%,0_34%)]">
            {portraitImage ? (
              <Image
                src={urlForImage(portraitImage).width(900).height(1008).fit("crop").url()}
                alt={portraitAlt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 animate-sheen bg-[linear-gradient(100deg,transparent_38%,hsl(var(--background)/0.35)_50%,transparent_62%)] [animation-delay:1.5s]" />
          </div>

          <div className="absolute bottom-[6%] right-[-6px] z-[1] h-[clamp(120px,14vw,150px)] w-[clamp(120px,14vw,150px)]">
            <svg viewBox="0 0 150 150" className="h-full w-full animate-tp-turn [animation-duration:18s]" aria-hidden="true">
              <defs>
                <path id="pf-ring" d="M75 75 m-56 0 a56 56 0 1 1 112 0 a56 56 0 1 1 -112 0" />
              </defs>
              <circle cx="75" cy="75" r="74" className="fill-foreground" />
              <text className="fill-[#F5BC60]" fontFamily="var(--font-public-sans)" fontWeight={700} fontSize={12.5} letterSpacing={3.4}>
                <textPath href="#pf-ring">FEATURED · PEOPLE OF DROGHEDA · </textPath>
              </text>
            </svg>
            <div className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2">
              <GemIcon twoTone={{ top: "fill-secondary", side: "fill-[#F5BC60]" }} size={40} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
