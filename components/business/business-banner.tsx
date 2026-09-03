import Image from "next/image";

import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type BusinessBannerProps = {
  image?: SanityImage;
  alt: string;
};

export function BusinessBanner({ image, alt }: BusinessBannerProps) {
  if (!image) return null;

  return (
    <div className="px-5 pt-9 md:px-12 md:pt-16">
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl md:rounded-[1.625rem]">
        <Image
          src={urlForImage(image).width(1600).height(700).fit("crop").url()}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover [filter:saturate(.86)_contrast(.96)]"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(34,31,26,.62), rgba(34,31,26,.06) 55%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-tp-sheen"
          style={{
            background: "linear-gradient(100deg, transparent 38%, rgba(255,249,238,.14) 50%, transparent 62%)",
          }}
        />
        <svg
          viewBox="0 0 26 30"
          width={40}
          aria-hidden
          className="absolute bottom-4 left-4 opacity-90 md:bottom-8 md:left-8 md:w-[54px]"
        >
          <path d="M13 1.6 L24 12 L13 28.4 L2 12 Z" fill="none" stroke="var(--accent)" strokeWidth={1.4} />
          <path d="M2 12 H24 M13 1.6 V28.4" stroke="var(--accent)" strokeWidth={0.7} opacity={0.6} />
        </svg>
      </div>
    </div>
  );
}
