import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleAuthorBand } from "@/components/blog/article-author-band";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticlePortableText } from "@/components/blog/article-portable-text";
import { ArticleSidebar } from "@/components/blog/article-sidebar";
import { ArticleTags } from "@/components/blog/article-tags";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareRail } from "@/components/blog/share-rail";
import { StoryGrid } from "@/components/blog/story-grid";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { postBySlugQuery, postSlugsQuery } from "@/lib/sanity/queries";
import type { ArticlePageResult } from "@/lib/sanity/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getArticle(slug: string) {
  return client.fetch<ArticlePageResult>(postBySlugQuery, { slug }, { next: { revalidate } });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post, blogSettings, siteSettings } = await getArticle(slug);

  if (!post) return {};

  const title = post.seo?.metaTitle ?? post.title;
  const description =
    post.seo?.metaDescription ?? post.excerpt ?? blogSettings?.seo?.metaDescription ?? siteSettings?.defaultSeo?.metaDescription;
  const shareImage = post.seo?.shareImage ?? post.mainImage ?? blogSettings?.seo?.shareImage ?? siteSettings?.defaultSeo?.shareImage;
  const shareImageUrl = shareImage ? urlForImage(shareImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const { post, blogSettings, siteSettings, nearbyBusinesses, moreStories, authorPostCount } = await getArticle(slug);

  if (!post) notFound();

  return (
    <div className="flex w-full flex-col items-center">
      <ReadingProgress />

      <article className="mx-auto w-full max-w-7xl px-5 md:px-12">
        <ArticleHeader article={post} />

        <figure className="m-0 mb-9 md:mb-14">
          <div className="relative h-[280px] w-full overflow-hidden rounded-[1.875rem] bg-muted md:h-[420px]">
            <Image
              src={urlForImage(post.mainImage).width(1800).height(900).fit("crop").url()}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover [filter:saturate(.88)_contrast(.96)]"
              priority
            />
          </div>
        </figure>

        <div className="flex flex-wrap items-start gap-6 pb-12 md:gap-9 md:pb-20">
          <ShareRail title={post.title} />

          <div className="flex min-w-0 flex-1 basis-[560px] flex-col gap-6">
            <ArticlePortableText value={post.body} className="flex flex-col gap-6" />
            <ArticleTags tags={post.tags} />
          </div>

          <ArticleSidebar
            article={post}
            blogSettings={blogSettings}
            registerUrl={siteSettings?.registerUrl}
            nearbyBusinesses={nearbyBusinesses}
          />
        </div>
      </article>

      <ArticleAuthorBand article={post} blogSettings={blogSettings} authorPostCount={authorPostCount} />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-11 md:px-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="m-0 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight text-foreground">
            More from the Journal
          </h2>
          <Link href="/blog" className="font-heading text-[13px] font-bold text-primary hover:text-[#1C8CA1]">
            All posts →
          </Link>
        </div>
        <StoryGrid posts={moreStories} />
      </section>
    </div>
  );
}
