import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/types";

type StoryGridProps = {
  posts: Post[];
};

function formatMeta(post: Post) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-IE", { day: "numeric", month: "short" });
  return post.readTimeMinutes ? `${post.readTimeMinutes} min · ${date}` : date;
}

export function StoryGrid({ posts }: StoryGridProps) {
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="flex flex-col gap-2.5 rounded-[1.375rem] border border-border bg-background p-2 pb-4 text-foreground transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[#C9B994]"
        >
          <div className="relative h-[118px] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={urlForImage(post.mainImage).width(600).height(360).fit("crop").url()}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover [filter:saturate(.86)]"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3">
            {post.category ? (
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                {post.category}
              </span>
            ) : null}
            <h3 className="m-0 font-heading text-[17px] font-semibold leading-tight text-foreground">{post.title}</h3>
            <span className="text-xs text-muted-foreground">{formatMeta(post)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
