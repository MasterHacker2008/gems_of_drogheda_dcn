import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PersonCta } from "@/components/person/person-cta";
import { PersonHero } from "@/components/person/person-hero";
import { PersonMarqueeBanner } from "@/components/person/person-marquee-banner";
import { PersonPhotoGrid } from "@/components/person/person-photo-grid";
import { PersonQaStrip } from "@/components/person/person-qa-strip";
import { PersonStory } from "@/components/person/person-story";
import { PersonTimeline } from "@/components/person/person-timeline";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { personBySlugQuery, personSlugsQuery } from "@/lib/sanity/queries";
import type { PersonBySlugResult } from "@/lib/sanity/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPerson(slug: string) {
  return client.fetch<PersonBySlugResult>(personBySlugQuery, { slug }, { next: { revalidate } });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(personSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { person, siteSettings } = await getPerson(slug);

  if (!person) return {};

  const title = person.seo?.metaTitle ?? person.name;
  const description = person.seo?.metaDescription ?? person.tagline ?? siteSettings?.defaultSeo?.metaDescription;
  const shareImage = person.seo?.shareImage ?? person.portraitImage ?? siteSettings?.defaultSeo?.shareImage;
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

export default async function PersonFeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const { person } = await getPerson(slug);

  if (!person) notFound();

  return (
    <div className="w-full">
      <PersonHero
        eyebrow={person.eyebrow ?? "Featured person"}
        area={person.area ?? ""}
        firstName={person.heroFirstName}
        lastName={person.heroLastName}
        tagline={person.tagline ?? ""}
        portraitImage={person.portraitImage}
        portraitAlt={`Portrait of ${person.name}`}
      />
      <PersonMarqueeBanner items={person.marqueeTags} />
      <PersonStory
        statValue={person.statValue}
        statCaption={person.statCaption}
        facts={person.facts}
        lead={person.leadIn}
        leadHighlight={person.leadHighlight}
        paragraphs={person.storyParagraphs}
      />
      <PersonPhotoGrid
        mainImage={person.galleryMainImage}
        mainImageAlt={person.galleryMainCaption ?? person.name}
        mainCaption={person.galleryMainCaption}
        quote={person.quote}
        sideImage={person.gallerySideImage}
        sideImageAlt={person.name}
      />
      <PersonQaStrip heading={person.qaHeading} items={person.qaItems} />
      <PersonTimeline
        headingLine1={person.timelineHeadingLine1}
        headingLine2={person.timelineHeadingLine2}
        entries={person.timelineEntries}
      />
      <PersonCta
        image={person.ctaImage}
        imageAlt={person.name}
        placesHeading={person.placesHeading}
        places={person.places}
        ctaHeading={person.ctaHeading}
        ctaBody={person.ctaBody}
        nominateHref={person.nominateHref}
        moreHref={person.moreHref}
      />
    </div>
  );
}
