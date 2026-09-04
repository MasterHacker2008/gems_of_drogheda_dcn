import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GemIcon } from "@/components/ui/gem-icon";
import { urlForImage } from "@/lib/sanity/image";
import type { DirectoryBusiness } from "@/lib/sanity/types";

type BusinessProfileCardProps = {
  business: DirectoryBusiness;
  joinCtaHref?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const TIER_CONFIG = {
  "gem-verified": {
    cornerLabel: (order: number) => `Gem ${String(order).padStart(2, "0")}`,
    ring: "border-[#C9B994]",
    tick: { top: "fill-secondary", side: "fill-[#3D2606]" },
    followVariant: "bg-secondary text-secondary-foreground",
  },
  "campaign-sponsor": {
    cornerLabel: (order: number) => `Gem ${String(order).padStart(2, "0")} · Sponsor`,
    ring: "border-[#C9B994]",
    tick: { top: "fill-primary", side: "fill-background" },
    followVariant: "bg-secondary text-secondary-foreground",
  },
  "directory-listed": {
    cornerLabel: null,
    ring: "border-dashed border-[#C9B994]",
    tick: null,
    followVariant: "border border-[#C9B994] bg-background text-foreground",
  },
} as const;

export function BusinessProfileCard({ business, joinCtaHref }: BusinessProfileCardProps) {
  const config = TIER_CONFIG[business.tier];
  const street = business.areaLinks?.label;
  const blurb = business.cardBlurb ?? business.tagline;
  const hasStats =
    business.followerCount != null || business.questVisitCount != null || business.journalFeatureCount != null;
  const showUpsell = business.tier === "directory-listed";

  return (
    <article className={`flex flex-col overflow-hidden rounded-[1.625rem] border bg-background ${config.ring} ${business.tier === "directory-listed" ? "" : "shadow-[0_14px_34px_-26px_rgba(34,31,26,0.5)]"}`}>
      <div className="relative h-24 bg-muted">
        {business.heroImage ? (
          <Image
            src={urlForImage(business.heroImage).width(700).height(200).fit("crop").url()}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover saturate-[.86]"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, #EEE3CF 0 10px, #F5EEDD 10px 20px)",
            }}
          />
        )}
        {config.cornerLabel ? (
          <span className="absolute right-3 top-3 inline-flex items-center whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#F5BC60]">
            {config.cornerLabel(business.order)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 px-5 pb-5">
        <div className="-mt-[30px] flex items-end justify-between gap-3">
          <span className="relative z-[1] h-[66px] w-[66px] flex-none overflow-hidden rounded-[1.25rem] border-[3px] border-background bg-muted">
            {business.avatarImage ? (
              <Image
                src={urlForImage(business.avatarImage).width(200).height(200).fit("crop").url()}
                alt=""
                fill
                sizes="66px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-[#E8F1F0] font-heading text-lg font-bold text-primary">
                {initials(business.name)}
              </span>
            )}
          </span>
          <span
            className={`inline-flex flex-none items-center whitespace-nowrap rounded-full px-4 py-2 font-heading text-xs font-bold ${config.followVariant}`}
          >
            Follow
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Link
            href={`/business-directory/${business.slug}`}
            className="flex items-center gap-1.5 font-heading text-[19px] font-semibold text-foreground hover:text-primary"
          >
            {business.name}
            {config.tick ? (
              <GemIcon size={19} twoTone={config.tick} />
            ) : (
              <svg width={18} height={21} viewBox="0 0 24 24" aria-hidden className="flex-none">
                <path d="M12 3.2 19.6 9 12 20.4 4.4 9Z" fill="none" stroke="#8C7F6C" strokeWidth={1.8} />
              </svg>
            )}
          </Link>
          <span className="text-[13px] text-muted-foreground">
            @{business.slug} · {business.trade}
            {street ? ` · ${street}` : ""}
          </span>
        </div>

        {blurb ? <p className="m-0 text-pretty text-sm leading-relaxed text-muted-foreground">{blurb}</p> : null}

        {showUpsell ? (
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted p-3.5">
            <span className="font-heading text-sm font-semibold text-foreground">Want the gem beside your name?</span>
            <span className="text-[13px] leading-snug text-muted-foreground">
              Featuring adds a riddle, a video spotlight and a month of promotion.
            </span>
            {joinCtaHref ? (
              <Link
                href={joinCtaHref}
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-primary px-4 py-2 font-heading text-xs font-bold text-primary-foreground hover:bg-[#15707F]"
              >
                Feature your business
              </Link>
            ) : null}
          </div>
        ) : (
          <>
            {hasStats ? (
              <div className="flex gap-4 border-y border-border py-2.5">
                {business.followerCount != null ? (
                  <span className="flex flex-col">
                    <strong className="font-heading text-base text-foreground">
                      {business.followerCount >= 1000 ? `${(business.followerCount / 1000).toFixed(1)}k` : business.followerCount}
                    </strong>
                    <span className="text-[11px] text-muted-foreground">followers</span>
                  </span>
                ) : null}
                {business.questVisitCount != null ? (
                  <span className="flex flex-col">
                    <strong className="font-heading text-base text-foreground">{business.questVisitCount}</strong>
                    <span className="text-[11px] text-muted-foreground">quest visits</span>
                  </span>
                ) : null}
                {business.journalFeatureCount != null ? (
                  <span className="flex flex-col">
                    <strong className="font-heading text-base text-foreground">{business.journalFeatureCount}</strong>
                    <span className="text-[11px] text-muted-foreground">journal features</span>
                  </span>
                ) : null}
              </div>
            ) : null}
            {business.badges && business.badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {business.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="border-[#C9B994] bg-muted text-[11px] font-semibold text-muted-foreground"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}
