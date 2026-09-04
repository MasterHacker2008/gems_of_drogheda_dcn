import Image from "next/image";

import { BusinessPortableText } from "@/components/business/business-portable-text";
import { urlForImage } from "@/lib/sanity/image";
import type { Event } from "@/lib/sanity/types";

type EventAboutProps = {
  event: Event;
};

export function EventAbout({ event }: EventAboutProps) {
  if (!event.aboutTitle && (!event.aboutBody || event.aboutBody.length === 0)) return null;

  const aboutImageUrl = event.aboutImage
    ? urlForImage(event.aboutImage).width(1200).height(960).fit("crop").url()
    : null;

  return (
    <section className="mx-auto mt-14 w-full max-w-7xl bg-secondary px-5 py-12 md:mt-20 md:rounded-[2rem] md:px-14 md:py-16">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-10 md:gap-14">
        <div className="flex flex-col gap-5">
          {event.aboutEyebrow ? (
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-foreground">
              {event.aboutEyebrow}
            </span>
          ) : null}
          {event.aboutTitle ? (
            <h2 className="m-0 max-w-[14em] text-balance font-heading text-[clamp(1.75rem,3.6vw,2.875rem)] font-semibold leading-[1.08] tracking-tight text-secondary-foreground">
              {event.aboutTitle}
            </h2>
          ) : null}
          <BusinessPortableText
            value={event.aboutBody}
            className="flex flex-col gap-4 text-secondary-foreground/[.86] [&_p]:text-secondary-foreground/[.86]"
          />
          {event.aboutTags && event.aboutTags.length > 0 ? (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {event.aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center whitespace-nowrap rounded-full bg-background px-4 py-2 text-[13px] font-bold text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {aboutImageUrl ? (
          <div className="relative">
            <div aria-hidden className="absolute -inset-3.5 -z-10 rounded-[1.875rem] bg-primary" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.875rem] shadow-[0_30px_54px_-26px_rgba(61,38,6,0.5)]">
              <Image
                src={aboutImageUrl}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover [filter:saturate(1.14)_contrast(1.03)]"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
