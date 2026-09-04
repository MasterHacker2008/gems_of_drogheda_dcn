import type { Metadata } from "next";

import { DirectoryExplorer } from "@/components/directory/directory-explorer";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { directoryPageQuery } from "@/lib/sanity/queries";
import type { DirectoryPageResult } from "@/lib/sanity/types";

export const revalidate = 60;

async function getDirectoryData() {
  return client.fetch<DirectoryPageResult>(directoryPageQuery, {}, { next: { revalidate } });
}

export async function generateMetadata(): Promise<Metadata> {
  const { directorySettings, siteSettings } = await getDirectoryData();
  const seo = directorySettings?.seo?.metaTitle ? directorySettings.seo : siteSettings?.defaultSeo;
  const title = seo?.metaTitle ?? directorySettings?.headline ?? "Business Directory";
  const description = seo?.metaDescription;
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

export default async function BusinessDirectoryPage() {
  const { siteSettings, directorySettings, businesses, categories } = await getDirectoryData();

  if (businesses.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24 text-center text-muted-foreground">
        Add some businesses and a &ldquo;Directory settings&rdquo; document in the Sanity Studio to populate this page.
      </div>
    );
  }

  return (
    <DirectoryExplorer
      directorySettings={directorySettings}
      businesses={businesses}
      categories={categories}
      joinCtaHref={siteSettings?.joinCtaHref}
      featureCtaLabel={directorySettings?.featureCtaLabel}
    />
  );
}
