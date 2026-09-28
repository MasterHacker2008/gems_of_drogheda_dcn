import Image from "next/image";
import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";
import { urlForImage } from "@/lib/sanity/image";
import type { DirectoryPerson } from "@/lib/sanity/types";

type PersonListingCardProps = {
  person: DirectoryPerson;
};

const TIER_CONFIG = {
  featured: {
    badge: "Featured",
    badgeClass: "bg-foreground text-secondary",
    gem: { top: "fill-secondary", side: "fill-[#DE9019]" },
    cta: "Read story",
    ctaClass: "bg-secondary text-secondary-foreground",
  },
  journal: {
    badge: "In the journal",
    badgeClass: "bg-foreground text-background",
    gem: { top: "fill-primary", side: "fill-[#15707F]" },
    cta: "Read story",
    ctaClass: "bg-primary text-primary-foreground",
  },
  nominated: {
    badge: "Nominated",
    badgeClass: "bg-background text-muted-foreground",
    gem: { top: "fill-transparent", side: "fill-transparent" },
    cta: "Profile",
    ctaClass: "border border-[#C9B994] bg-background text-foreground",
  },
} as const;

export function PersonListingCard({ person }: PersonListingCardProps) {
  const config = TIER_CONFIG[person.tier];
  const cover = person.cardCoverImage ?? person.portraitImage;
  const line = person.cardLine ?? person.tagline;

  return (
    <Link
      href={`/people/${person.slug}`}
      className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background text-foreground shadow-[0_14px_30px_-22px_rgba(34,31,26,0.55)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative h-32 overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={urlForImage(cover).width(700).height(300).fit("crop").url()}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(var(--foreground)/0.35))]" />
        <span
          className={`absolute right-3.5 top-3.5 inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 font-heading text-[11px] font-extrabold uppercase tracking-[0.1em] ${config.badgeClass}`}
        >
          {config.badge}
        </span>
      </div>

      <div className="relative z-[1] -mt-[46px] flex items-end justify-between gap-3 px-5">
        <span className="h-[92px] w-[92px] flex-none overflow-hidden rounded-full border-4 border-background bg-muted">
          {person.portraitImage ? (
            <Image
              src={urlForImage(person.portraitImage).width(200).height(200).fit("crop").url()}
              alt={person.name}
              width={92}
              height={92}
              className="h-full w-full object-cover"
            />
          ) : null}
        </span>
        <span
          className={`inline-flex flex-none items-center whitespace-nowrap rounded-full px-4 py-2 font-heading text-xs font-bold ${config.ctaClass}`}
        >
          {config.cta}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 pb-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="font-heading text-[21px] font-bold tracking-tight text-foreground">{person.name}</span>
          <GemIcon twoTone={config.gem} size={16} />
        </div>
        <span className="text-sm text-muted-foreground">
          {[person.handle, person.role, person.area].filter(Boolean).join(" · ")}
        </span>
        {line ? <p className="m-0 text-pretty text-[15px] leading-relaxed text-muted-foreground">{line}</p> : null}
        <div className="flex-1" />
        {person.cardTags && person.cardTags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
            {person.cardTags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
