import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import { businessSlugsQuery, eventSlugsQuery, postSlugsQuery } from "@/lib/sanity/queries";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

async function getSlugs(query: string) {
  return client.fetch<string[]>(query, {}, { next: { revalidate } });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [businessSlugs, postSlugs, eventSlugs] = await Promise.all([
    getSlugs(businessSlugsQuery),
    getSlugs(postSlugsQuery),
    getSlugs(eventSlugsQuery),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/business-directory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
  ];

  const businessRoutes: MetadataRoute.Sitemap = businessSlugs.map((slug) => ({
    url: `${siteUrl}/business-directory/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${siteUrl}/events/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...businessRoutes, ...postRoutes, ...eventRoutes];
}
