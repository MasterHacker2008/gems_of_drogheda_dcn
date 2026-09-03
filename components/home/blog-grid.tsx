import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { urlForImage } from "@/lib/sanity/image";
import type { HomePage, Post } from "@/lib/sanity/types";

type BlogGridProps = {
  homePage: HomePage;
  posts: Post[];
};

function formatPostMeta(post: Post) {
  const parts = [post.category, post.readTimeMinutes ? `${post.readTimeMinutes} min read` : null].filter(Boolean);
  return parts.join(" · ");
}

export function BlogGrid({ homePage, posts }: BlogGridProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-12 md:px-10">
      <SectionHeading title={homePage.blogHeading ?? "From the blog"} link={homePage.blogLink} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="flex flex-col gap-3.5 text-foreground hover:text-primary">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EFE3C9]">
              <Image
                src={urlForImage(post.mainImage).width(760).height(475).fit("crop").url()}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover [filter:saturate(.94)_contrast(.97)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">
                {formatPostMeta(post)}
              </span>
              <span className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground">
                {post.title}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
