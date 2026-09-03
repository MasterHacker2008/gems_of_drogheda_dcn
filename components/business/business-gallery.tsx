import Image from "next/image";

import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type BusinessGalleryProps = {
  images?: SanityImage[];
  alt: string;
};

export function BusinessGallery({ images, alt }: BusinessGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="px-5 pt-12 md:px-12 md:pt-20">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {images.map((image, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-[1.5rem]">
            <Image
              src={urlForImage(image).width(900).height(675).fit("crop").url()}
              alt={`${alt} — photo ${i + 1}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover [filter:saturate(.86)_contrast(.96)]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
