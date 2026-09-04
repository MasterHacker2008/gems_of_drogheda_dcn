import type { Metadata } from "next";

import { BlogExplorer } from "@/components/blog/blog-explorer";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { blogPageQuery } from "@/lib/sanity/queries";
import type { BlogPageResult, Topic } from "@/lib/sanity/types";

export const revalidate = 60;

async function getBlogData() {
  return client.fetch<BlogPageResult>(blogPageQuery, {}, { next: { revalidate } });
}

function computeTopics(posts: BlogPageResult["posts"]): Topic[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (!post.category) continue;
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export async function generateMetadata(): Promise<Metadata> {
  const { blogSettings, siteSettings } = await getBlogData();
  const seo = blogSettings?.seo?.metaTitle ? blogSettings.seo : siteSettings?.defaultSeo;
  const title = seo?.metaTitle ?? blogSettings?.headline ?? "The Journal";
  const description = seo?.metaDescription ?? blogSettings?.intro;
  const shareImageUrl = seo?.shareImage ? urlForImage(seo.shareImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: shareImageUrl ? [{ url: shareImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImageUrl ? [shareImageUrl] : undefined,
    },
  };
}

export default async function BlogPage() {
  const { siteSettings, blogSettings, posts, editorsPicks } = await getBlogData();

  if (posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24 text-center text-muted-foreground">
        Add some blog posts and a &ldquo;Blog settings&rdquo; document in the Sanity Studio to populate this page.
      </div>
    );
  }

  const topics = computeTopics(posts);

  return (
    <BlogExplorer
      blogSettings={blogSettings}
      registerUrl={siteSettings?.registerUrl}
      posts={posts}
      editorsPicks={editorsPicks}
      topics={topics}
    />
  );
}
