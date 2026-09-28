import type { Metadata } from "next";

import { PeopleExplorer } from "@/components/directory/people-explorer";
import { client } from "@/lib/sanity/client";
import { peopleDirectoryQuery } from "@/lib/sanity/queries";
import type { PeopleDirectoryPageResult } from "@/lib/sanity/types";

export const revalidate = 60;

async function getPeopleDirectory() {
  return client.fetch<PeopleDirectoryPageResult>(peopleDirectoryQuery, {}, { next: { revalidate } });
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getPeopleDirectory();
  const title = "People of Drogheda";
  const description =
    "The tailors, coaches, bakers and neighbours who keep Drogheda running. A new person is featured each month.";

  return {
    title,
    description: siteSettings?.defaultSeo?.metaDescription ?? description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PeoplePage() {
  const { siteSettings, people } = await getPeopleDirectory();

  if (people.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24 text-center text-muted-foreground">
        Add some people in the Sanity Studio to populate this page.
      </div>
    );
  }

  return <PeopleExplorer people={people} joinCtaHref={siteSettings?.joinCtaHref} />;
}
