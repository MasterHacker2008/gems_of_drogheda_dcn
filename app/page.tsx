import type { Metadata } from "next";

import { BlogGrid } from "@/components/home/blog-grid";
import { CategoryChips } from "@/components/home/category-chips";
import { EventsList } from "@/components/home/events-list";
import { Hero } from "@/components/home/hero";
import { JoinBand } from "@/components/home/join-band";
import { Marquee } from "@/components/home/marquee";
import { QuestBand } from "@/components/home/quest-band";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { homeQuery } from "@/lib/sanity/queries";
import type { HomeQueryResult } from "@/lib/sanity/types";

export const revalidate = 60;

async function getHomeData() {
  return client.fetch<HomeQueryResult>(homeQuery, {}, { next: { revalidate } });
}

export async function generateMetadata(): Promise<Metadata> {
  const { homePage, siteSettings } = await getHomeData();
  const seo = homePage?.seo?.metaTitle ? homePage.seo : siteSettings?.defaultSeo;
  const title = seo?.metaTitle ?? homePage?.heroHeading ?? "Gems of Drogheda";
  const description = seo?.metaDescription;
  const shareImage = seo?.shareImage ? urlForImage(seo.shareImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: shareImage ? [{ url: shareImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default async function Home() {
  const { siteSettings, homePage, categories, events, posts } = await getHomeData();

  if (!homePage || !siteSettings) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24 text-center text-muted-foreground">
        Add a &ldquo;Site settings&rdquo; and &ldquo;Homepage&rdquo; document in the Sanity Studio to populate this page.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Hero homePage={homePage} />
      <CategoryChips homePage={homePage} categories={categories} />
      <QuestBand homePage={homePage} registerUrl={siteSettings.registerUrl} />
      <EventsList homePage={homePage} events={events} />
      <JoinBand homePage={homePage} />
      <BlogGrid homePage={homePage} posts={posts} />
      <Marquee homePage={homePage} />
    </div>
  );
}
