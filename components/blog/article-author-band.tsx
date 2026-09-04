import { NewsletterCard } from "@/components/blog/newsletter-card";
import type { Article, BlogSettings } from "@/lib/sanity/types";

type ArticleAuthorBandProps = {
  article: Article;
  blogSettings: BlogSettings | null;
  authorPostCount: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ArticleAuthorBand({ article, blogSettings, authorPostCount }: ArticleAuthorBandProps) {
  if (!article.author) return null;

  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-8 px-5 py-9 md:px-12 md:py-11">
        <div className="flex min-w-0 flex-1 basis-[360px] items-start gap-4">
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-[#C9B994] bg-[#E8F1F0] font-heading text-xl font-bold text-primary">
            {initials(article.author.name)}
          </span>
          <div className="flex flex-col gap-2">
            <span className="font-heading text-xl font-semibold text-foreground">{article.author.name}</span>
            {article.author.bio ? (
              <p className="m-0 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {article.author.bio}
              </p>
            ) : null}
            <span className="text-[13px] text-muted-foreground">
              {authorPostCount} {authorPostCount === 1 ? "piece" : "pieces"} this year
            </span>
          </div>
        </div>

        {blogSettings ? (
          <div className="min-w-0 flex-1 basis-[320px]">
            <NewsletterCard blogSettings={blogSettings} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
