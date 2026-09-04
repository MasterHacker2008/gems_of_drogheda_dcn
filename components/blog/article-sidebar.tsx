import Link from "next/link";

import { ArticleToc } from "@/components/blog/article-toc";
import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import { daysUntil } from "@/lib/date";
import type { Article, BlogSettings, NearbyBusiness } from "@/lib/sanity/types";

type ArticleSidebarProps = {
  article: Article;
  blogSettings: BlogSettings | null;
  registerUrl?: string;
  nearbyBusinesses: NearbyBusiness[];
};

export function ArticleSidebar({ article, blogSettings, registerUrl, nearbyBusinesses }: ArticleSidebarProps) {
  const countdown =
    blogSettings?.questCountdownEnabled && registerUrl ? daysUntil(blogSettings.questCountdownTargetDate) : null;

  return (
    <aside className="sticky top-[104px] flex flex-1 basis-[260px] max-w-full flex-col gap-4 sm:max-w-[320px]">
      <ArticleToc body={article.body} />

      {countdown && countdown.days >= 0 ? (
        <div className="flex flex-col gap-2.5 rounded-[1.5rem] border border-[#C9B994] bg-[#E8F1F0] p-5">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Quest weekend</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-[2.125rem] font-semibold leading-none tracking-tight text-foreground">
              {countdown.days}
            </span>
            <span className="text-[13px] text-muted-foreground">
              days to {countdown.target.toLocaleDateString("en-IE", { day: "numeric", month: "short" })}
            </span>
          </div>
          <div className="h-px bg-[#C9B994]" />
          <span className="text-[13px] leading-relaxed text-muted-foreground">
            Teams of 3–6. Captains register before the day, per team.
          </span>
          {registerUrl && blogSettings?.questCountdownCtaLabel ? (
            <PillButton href={registerUrl} variant="primary" size="sm" className="w-full justify-center">
              {blogSettings.questCountdownCtaLabel}
            </PillButton>
          ) : null}
        </div>
      ) : null}

      {nearbyBusinesses.length > 0 ? (
        <div className="flex flex-col gap-2.5 rounded-[1.5rem] border border-dashed border-[#C9B994] bg-muted p-5">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Nearby on the trail
          </span>
          {nearbyBusinesses.map((business) => (
            <Link
              key={business.slug}
              href={`/business-directory/${business.slug}`}
              className="flex items-center gap-2.5 text-foreground hover:text-primary"
            >
              <GemIcon size={16} fillClassName="text-secondary" />
              <span className="font-heading text-sm font-semibold">{business.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{business.trade}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
