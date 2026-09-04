import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { PillButton } from "@/components/ui/pill-button";
import type { ArticleBodyBlock } from "@/lib/sanity/types";

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blockPlainText(block: unknown): string {
  const children = (block as { children?: unknown[] })?.children;
  if (!Array.isArray(children)) return "";
  return children.map((span) => (typeof span === "object" && span && "text" in span ? String(span.text) : "")).join("");
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-pretty text-lg leading-[1.72] text-foreground">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={slugifyHeading(blockPlainText(value))}
        className="m-0 mt-2 font-heading text-[clamp(1.625rem,2.8vw,2.125rem)] font-semibold leading-[1.12] tracking-tight text-foreground"
      >
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="m-0 flex flex-col gap-3.5 rounded-[1.625rem] border border-[#C9B994] bg-background px-7 py-6">
        <p className="m-0 text-pretty font-heading text-[clamp(1.375rem,2.4vw,1.75rem)] font-semibold leading-[1.28] tracking-tight text-foreground">
          {children}
        </p>
      </blockquote>
    ),
  },
  types: {
    calloutBox: ({ value }) => (
      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-foreground px-7 py-7">
        {value.eyebrow ? (
          <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-secondary/[.16] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5BC60]">
            {value.eyebrow}
          </span>
        ) : null}
        <p className="m-0 text-pretty font-heading text-[clamp(1.3125rem,2.2vw,1.625rem)] font-semibold leading-[1.32] text-background">
          {value.text}
        </p>
        {value.footerText || value.ctaLabel ? (
          <>
            <div className="h-px bg-background/14" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              {value.footerText ? (
                <span className="text-sm text-background/66">{value.footerText}</span>
              ) : null}
              {value.ctaLabel && value.ctaHref ? (
                <PillButton href={value.ctaHref} variant="dark" size="sm" className="border border-background/16 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground">
                  {value.ctaLabel}
                </PillButton>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    ),
    statGrid: ({ value }) => (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5 rounded-[1.625rem] border border-dashed border-[#C9B994] bg-muted p-6">
        {value.stats.map((stat: { value: string; label: string }) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-heading text-3xl font-semibold leading-none text-[#DE9019]">{stat.value}</span>
            <span className="text-[13px] text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    ),
  },
};

type ArticlePortableTextProps = {
  value?: ArticleBodyBlock[];
  className?: string;
};

export function ArticlePortableText({ value, className }: ArticlePortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={className}>
      <PortableText value={value as never} components={components} />
    </div>
  );
}
