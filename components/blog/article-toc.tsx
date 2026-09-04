import Link from "next/link";

import { slugifyHeading } from "@/components/blog/article-portable-text";
import type { ArticleBodyBlock } from "@/lib/sanity/types";

type ArticleTocProps = {
  body?: ArticleBodyBlock[];
};

function isH2Block(block: ArticleBodyBlock): block is ArticleBodyBlock & { style: string; children: { text?: string }[] } {
  return (
    (block as { _type?: string })._type === "block" &&
    (block as { style?: string }).style === "h2" &&
    Array.isArray((block as { children?: unknown[] }).children)
  );
}

export function ArticleToc({ body }: ArticleTocProps) {
  const headings = (body ?? [])
    .filter(isH2Block)
    .map((block) => block.children.map((span) => span.text ?? "").join(""))
    .filter(Boolean);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border bg-background p-5">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">In this piece</span>
      <nav className="flex flex-col">
        {headings.map((heading, i) => (
          <Link
            key={heading}
            href={`#${slugifyHeading(heading)}`}
            className={`py-1.5 pl-3 font-heading text-sm leading-snug ${
              i === 0
                ? "border-l-2 border-primary font-semibold text-primary"
                : "border-l-2 border-border font-medium text-muted-foreground hover:text-foreground"
            }`}
          >
            {heading}
          </Link>
        ))}
      </nav>
    </div>
  );
}
