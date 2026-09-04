import { Badge } from "@/components/ui/badge";
import type { Link as LinkType } from "@/lib/sanity/types";

type ArticleTagsProps = {
  tags?: LinkType[];
};

export function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Filed under</span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.href} asChild variant="outline" className="border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-[#C9B994] hover:text-foreground">
            <a href={tag.href}>{tag.label}</a>
          </Badge>
        ))}
      </div>
    </div>
  );
}
