import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/types";

type LeadStoryProps = {
  post: Post;
};

function formatMeta(post: Post) {
  const parts = [
    post.readTimeMinutes ? `${post.readTimeMinutes} min read` : null,
    new Date(post.publishedAt).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" }),
  ].filter(Boolean);
  return parts.join(" · ");
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function LeadStory({ post }: LeadStoryProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-background p-2.5 pb-6 text-foreground shadow-card transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.375rem] bg-muted md:aspect-[16/9]">
        <Image
          src={urlForImage(post.mainImage).width(1200).height(675).fit("crop").url()}
          alt=""
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover [filter:saturate(.86)_contrast(.96)]"
          priority
        />
        <span className="absolute left-4 top-4 inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-3.5 py-2 font-heading text-xs font-bold uppercase tracking-[0.1em] text-secondary-foreground">
          Lead story
        </span>
      </div>
      <div className="flex flex-col gap-3 px-2">
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
          {post.category ? (
            <span className="font-heading font-bold uppercase tracking-[0.1em] text-primary">{post.category}</span>
          ) : null}
          {post.category ? <span>·</span> : null}
          <span>{formatMeta(post)}</span>
        </div>
        <h2 className="m-0 text-balance font-heading text-[clamp(1.5rem,2.6vw,1.875rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
          {post.title}
        </h2>
        <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
        {post.author ? (
          <div className="flex items-center gap-3 pt-1">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border bg-[#E8F1F0] font-heading text-[13px] font-bold text-primary">
              {initials(post.author.name)}
            </span>
            <span className="text-[13px] text-muted-foreground">{post.author.name}, DCN Journal</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
