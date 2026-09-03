import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BusinessAbout } from "@/components/business/business-about";
import { BusinessBanner } from "@/components/business/business-banner";
import { BusinessBreadcrumb } from "@/components/business/business-breadcrumb";
import { BusinessHero } from "@/components/business/business-hero";
import { BusinessPrevNext } from "@/components/business/business-prev-next";
import { BusinessSellsGrid } from "@/components/business/business-sells-grid";
import { BusinessTags } from "@/components/business/business-tags";
import { BusinessTicker } from "@/components/business/business-ticker";
import { BusinessWhyItMatters } from "@/components/business/business-why-it-matters";
import { BusinessGallery } from "@/components/business/business-gallery";
import { getAccentStyle } from "@/lib/business-accent";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { businessBySlugQuery, businessSlugsQuery, siteSettingsQuery } from "@/lib/sanity/queries";
import type { BusinessBySlugResult, SiteSettings } from "@/lib/sanity/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBusiness(slug: string) {
  return client.fetch<BusinessBySlugResult>(businessBySlugQuery, { slug }, { next: { revalidate } });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(businessSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [{ business }, siteSettings] = await Promise.all([
    getBusiness(slug),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  if (!business) return {};

  const seo = business.seo?.metaTitle ? business.seo : siteSettings?.defaultSeo;
  const title = seo?.metaTitle ?? `${business.name} · Business Directory`;
  const description = seo?.metaDescription ?? business.tagline;
  const shareImage = seo?.shareImage ?? business.heroImage;
  const shareImageUrl = shareImage ? urlForImage(shareImage).width(1200).height(630).url() : undefined;

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

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const { business, prevBusiness, nextBusiness } = await getBusiness(slug);

  if (!business) notFound();

  return (
    <div
      className="w-full bg-foreground text-background"
      style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", ...getAccentStyle(business.accentColor) }}
    >
      <BusinessBreadcrumb business={business} />
      <BusinessHero business={business} />
      <BusinessBanner image={business.heroImage} alt={business.name} />
      <BusinessTicker text={business.tickerText} />
      <BusinessAbout business={business} />
      <BusinessSellsGrid business={business} />
      <BusinessGallery images={business.galleryImages} alt={business.name} />
      <BusinessWhyItMatters business={business} />
      <BusinessTags business={business} />
      <BusinessPrevNext prev={prevBusiness} next={nextBusiness} />
    </div>
  );
}
