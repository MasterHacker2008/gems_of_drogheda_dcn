import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { EventFeaturedBusiness } from "@/lib/sanity/types";

type EventFeaturedBusinessesProps = {
  heading?: string;
  businesses?: EventFeaturedBusiness[];
};

export function EventFeaturedBusinesses({ heading, businesses }: EventFeaturedBusinessesProps) {
  if (!businesses || businesses.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-14 md:px-10 md:pt-20">
      <div className="flex flex-wrap items-baseline gap-4">
        <h2 className="m-0 font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-tight text-foreground">
          {heading ?? "Meet the gems"}
        </h2>
        <Link href="/business-directory" className="ml-auto font-heading text-sm font-bold text-primary hover:text-[#1C8CA1]">
          All businesses →
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {businesses.map((business) => (
          <Link
            key={business.slug}
            href={`/business-directory/${business.slug}`}
            className="flex flex-col overflow-hidden rounded-3xl border-2 border-border bg-background text-foreground transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-2 hover:border-secondary hover:shadow-[0_26px_44px_-20px_rgba(34,31,26,0.46)]"
          >
            <div className="relative aspect-[16/10] bg-muted">
              {business.heroImage ? (
                <Image
                  src={urlForImage(business.heroImage).width(700).height(440).fit("crop").url()}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover [filter:saturate(1.16)_contrast(1.04)]"
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-2 p-6">
              {business.categories?.[0] ? (
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  {business.categories[0].name}
                </span>
              ) : null}
              <span className="font-heading text-xl font-semibold tracking-tight">{business.name}</span>
              <span className="text-[15px] leading-relaxed text-muted-foreground">
                {business.cardBlurb ?? business.tagline}
              </span>
              <span className="pt-1 text-sm font-bold text-primary">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
