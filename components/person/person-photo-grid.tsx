import Image from "next/image";

import { GemIcon } from "@/components/ui/gem-icon";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type PersonPhotoGridProps = {
  mainImage?: SanityImage;
  mainImageAlt: string;
  mainCaption?: string;
  quote?: string;
  sideImage?: SanityImage;
  sideImageAlt: string;
};

export function PersonPhotoGrid({
  mainImage,
  mainImageAlt,
  mainCaption,
  quote,
  sideImage,
  sideImageAlt,
}: PersonPhotoGridProps) {
  if (!mainImage && !quote && !sideImage) return null;

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 pt-16 md:px-12 md:pt-24">
      <div className="flex flex-wrap gap-3 md:gap-4">
        <div className="relative min-h-[300px] flex-[7_1_420px] overflow-hidden rounded-[1.75rem] bg-[#15707F] md:min-h-[500px]">
          {mainImage ? (
            <Image
              src={urlForImage(mainImage).width(1200).height(900).fit("crop").url()}
              alt={mainImageAlt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          ) : null}
          {mainCaption ? (
            <span className="absolute bottom-4 left-4 inline-flex items-center whitespace-nowrap rounded-full bg-background px-3.5 py-1.5 font-heading text-xs font-bold text-foreground">
              {mainCaption}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 basis-[300px] flex-col gap-3 md:gap-4">
          {quote ? (
            <div className="flex flex-1 flex-col justify-between gap-3.5 rounded-[1.75rem] bg-foreground p-6 text-background md:p-8">
              <span className="font-heading text-[clamp(4.375rem,8vw,7.5rem)] font-extrabold leading-[0.6] text-secondary">
                &ldquo;
              </span>
              <p className="m-0 font-heading text-[clamp(1.125rem,2.1vw,1.625rem)] font-semibold leading-[1.3] tracking-[-0.015em]">
                {quote}
              </p>
            </div>
          ) : null}

          <div className="flex min-h-[160px] gap-3 md:gap-4">
            <div className="relative flex-[3_1_0] overflow-hidden rounded-[1.375rem] bg-[#E8F1F0]">
              {sideImage ? (
                <Image
                  src={urlForImage(sideImage).width(700).height(700).fit("crop").url()}
                  alt={sideImageAlt}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-[2_1_0] items-center justify-center rounded-[1.375rem] bg-secondary">
              <GemIcon twoTone={{ top: "fill-background", side: "fill-muted" }} size={48} className="animate-gem-drift" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
