import Image from "next/image";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import { urlForImage } from "@/lib/sanity/image";
import type { PersonPlace, SanityImage } from "@/lib/sanity/types";

type PersonCtaProps = {
  image?: SanityImage;
  imageAlt: string;
  placesHeading?: string;
  places?: PersonPlace[];
  ctaHeading?: string;
  ctaBody?: string;
  nominateHref?: string;
  moreHref?: string;
};

export function PersonCta({ image, imageAlt, placesHeading, places, ctaHeading, ctaBody, nominateHref, moreHref }: PersonCtaProps) {
  if (!image && !ctaHeading) return null;

  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-wrap items-stretch gap-6 px-5 py-16 md:gap-12 md:px-12 md:py-24">
      <div className="relative min-h-[360px] flex-1 basis-[420px] overflow-hidden rounded-[2rem] bg-[#15707F]">
        {image ? (
          <Image
            src={urlForImage(image).width(1200).height(900).fit("crop").url()}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0)_35%,hsl(var(--foreground)/0.85))]" />
        <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 text-background md:inset-x-8 md:bottom-8">
          {placesHeading ? (
            <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#F5BC60]">
              {placesHeading}
            </span>
          ) : null}
          {places?.map((place) => (
            <div
              key={place.name}
              className="flex flex-wrap justify-between gap-4 border-t border-background/16 pt-3"
            >
              <span className="font-heading text-lg font-bold">{place.name}</span>
              <span className="text-[15px] text-background/85">{place.when}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 basis-[340px] flex-col justify-between gap-5 overflow-hidden rounded-[2rem] bg-secondary p-7 text-secondary-foreground md:p-12">
        <GemIcon
          fillClassName="text-background"
          size={200}
          className="pointer-events-none absolute -right-8 -top-5 animate-gem-turn opacity-20 [animation-duration:40s]"
        />
        {ctaHeading ? (
          <h2 className="relative m-0 font-heading text-[clamp(2.125rem,4.4vw,3.375rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            {ctaHeading}
          </h2>
        ) : null}
        {ctaBody ? <p className="relative m-0 max-w-[24em] text-lg leading-relaxed">{ctaBody}</p> : null}
        <div className="relative flex flex-wrap gap-3">
          {nominateHref ? (
            <PillButton href={nominateHref} variant="dark">
              Nominate someone
            </PillButton>
          ) : null}
          {moreHref ? (
            <PillButton href={moreHref} variant="outline-on-gold">
              More people
            </PillButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
