import Image from "next/image";
import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";
import { urlForImage } from "@/lib/sanity/image";
import type { DirectoryPerson } from "@/lib/sanity/types";

type PersonSpotlightCardProps = {
  person: DirectoryPerson;
};

function formatMonth(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IE", { month: "long" }).toUpperCase();
}

export function PersonSpotlightCard({ person }: PersonSpotlightCardProps) {
  const cover = person.cardCoverImage ?? person.portraitImage;
  const month = formatMonth(person.featuredDate);
  const line = person.cardLine ?? person.tagline;

  return (
    <Link
      href={`/people/${person.slug}`}
      className="flex flex-wrap overflow-hidden rounded-[2rem] bg-foreground text-background shadow-[0_22px_44px_-24px_rgba(34,31,26,0.6)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative min-h-[280px] flex-1 basis-[380px] overflow-hidden bg-[#15707F]">
        {cover ? (
          <Image
            src={urlForImage(cover).width(1000).height(750).fit("crop").url()}
            alt={person.name}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-3.5 py-2 font-heading text-xs font-extrabold uppercase tracking-[0.12em] text-[#F5BC60]">
          <GemIcon fillClassName="text-secondary" size={12} />
          Featured{month ? ` · ${month}` : ""}
        </span>
      </div>

      <div className="flex flex-1 basis-[420px] flex-col justify-center gap-3.5 p-7 md:p-12">
        <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#F5BC60]">
          This month&rsquo;s person
        </span>
        <h2 className="m-0 font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          {person.name}
        </h2>
        <span className="text-sm text-background/70">
          {[person.handle, person.role, person.area].filter(Boolean).join(" · ")}
        </span>
        {line ? <p className="m-0 max-w-[28em] text-lg leading-relaxed text-background/88">{line}</p> : null}
        <span className="mt-1 inline-flex w-fit items-center whitespace-nowrap rounded-full bg-secondary px-6 py-3 font-heading text-sm font-bold text-secondary-foreground">
          Read the story →
        </span>
      </div>
    </Link>
  );
}
