import { Badge } from "@/components/ui/badge";
import type { Business } from "@/lib/sanity/types";

type BusinessTagsProps = {
  business: Business;
};

export function BusinessTags({ business }: BusinessTagsProps) {
  const tags = business.tags ?? [];
  if (tags.length === 0) return null;

  return (
    <section className="flex flex-wrap items-center gap-4 px-5 pt-11 md:px-12 md:pt-16">
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-background/50">Tagged</span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.href} asChild variant="outline" className="border-background/26 px-4 py-1.5 text-[13px] font-semibold text-background hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <a href={tag.href}>{tag.label}</a>
          </Badge>
        ))}
      </div>
    </section>
  );
}
