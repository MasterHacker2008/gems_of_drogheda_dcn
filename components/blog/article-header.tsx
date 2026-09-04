import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/sanity/types";

type ArticleHeaderProps = {
  article: Article;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatMeta(article: Article) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return article.readTimeMinutes ? `${date} · ${article.readTimeMinutes} min read` : date;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const business = article.relatedBusiness;

  return (
    <header className="flex flex-wrap items-end gap-8 pb-8 pt-9 md:pt-14">
      <div className="flex min-w-0 max-w-[45em] flex-1 basis-[480px] flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {article.category ? (
            <Badge className="border-[#C9B994] bg-[#E8F1F0] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              {article.category}
            </Badge>
          ) : null}
          {business ? (
            <Badge className="gap-1.5 border-transparent bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-foreground">
              <GemIcon size={12} fillClassName="text-secondary-foreground" />
              Gem {String(business.order).padStart(2, "0")}
            </Badge>
          ) : null}
          <span className="text-[13px] text-muted-foreground">{formatMeta(article)}</span>
        </div>

        <h1 className="m-0 text-balance font-heading text-[clamp(2.375rem,5.2vw,3.875rem)] font-semibold leading-[1.02] tracking-tight text-foreground">
          {article.title}
        </h1>

        <p className="text-pretty text-lg leading-[1.55] text-muted-foreground md:text-xl">{article.excerpt}</p>

        {article.author ? (
          <div className="flex items-center gap-3.5 pt-1.5">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#C9B994] bg-[#E8F1F0] font-heading text-[15px] font-bold text-primary">
              {initials(article.author.name)}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-heading text-[15px] font-semibold text-foreground">{article.author.name}</span>
              <span className="text-[13px] text-muted-foreground">Writing the Journal for DCN</span>
            </div>
          </div>
        ) : null}
      </div>

      {business ? (
        <aside className="flex flex-1 basis-[280px] flex-col gap-3.5 rounded-[1.625rem] bg-foreground p-5 max-w-full sm:max-w-[340px]">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5BC60]">This gem</span>
          <div className="flex items-center gap-3">
            <span className="h-12 w-12 flex-none overflow-hidden rounded-[0.9375rem] bg-muted">
              {business.avatarImage || business.heroImage ? (
                <Image
                  src={urlForImage(business.avatarImage ?? business.heroImage!)
                    .width(150)
                    .height(150)
                    .fit("crop")
                    .url()}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="flex items-center gap-1.5 font-heading text-base font-semibold leading-tight text-background">
                {business.name}
                <GemIcon size={15} twoTone={{ top: "fill-secondary", side: "fill-[#3D2606]" }} />
              </span>
              <span className="text-xs text-background/60">
                @{business.slug}
                {business.areaLinks ? ` · ${business.areaLinks.label}` : ""}
              </span>
            </div>
          </div>
          {business.followerCount != null || business.questVisitCount != null ? (
            <>
              <div className="h-px bg-background/14" />
              <div className="flex gap-5">
                {business.followerCount != null ? (
                  <span className="flex flex-col">
                    <strong className="font-heading text-base text-background">
                      {business.followerCount >= 1000
                        ? `${(business.followerCount / 1000).toFixed(1)}k`
                        : business.followerCount}
                    </strong>
                    <span className="text-[11px] text-background/55">followers</span>
                  </span>
                ) : null}
                {business.questVisitCount != null ? (
                  <span className="flex flex-col">
                    <strong className="font-heading text-base text-background">{business.questVisitCount}</strong>
                    <span className="text-[11px] text-background/55">riddle solves</span>
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
          <PillButton href={`/business-directory/${business.slug}`} variant="gold" size="sm" className="w-full justify-center">
            View the trade plate
          </PillButton>
        </aside>
      ) : null}
    </header>
  );
}
