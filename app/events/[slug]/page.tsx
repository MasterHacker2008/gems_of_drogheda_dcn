import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventAbout } from "@/components/events/event-about";
import { EventEssentials } from "@/components/events/event-essentials";
import { EventFaqs } from "@/components/events/event-faqs";
import { EventFeaturedBusinesses } from "@/components/events/event-featured-businesses";
import { EventHero } from "@/components/events/event-hero";
import { EventMarquee } from "@/components/events/event-marquee";
import { EventPoweredBy } from "@/components/events/event-powered-by";
import { EventPracticeClues } from "@/components/events/event-practice-clues";
import { EventPrizes } from "@/components/events/event-prizes";
import { EventReasons } from "@/components/events/event-reasons";
import { EventRegistration } from "@/components/events/event-registration";
import { EventSteps } from "@/components/events/event-steps";
import { EventTrail } from "@/components/events/event-trail";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { eventBySlugQuery, eventSlugsQuery } from "@/lib/sanity/queries";
import type { EventPageResult } from "@/lib/sanity/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getEvent(slug: string) {
  return client.fetch<EventPageResult>(eventBySlugQuery, { slug }, { next: { revalidate } });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(eventSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { event, siteSettings } = await getEvent(slug);

  if (!event) return {};

  const title = event.seo?.metaTitle ?? event.heroHeadline ?? event.title;
  const description = event.seo?.metaDescription ?? event.subtitle ?? siteSettings?.defaultSeo?.metaDescription;
  const shareImage = event.seo?.shareImage ?? event.heroImage ?? siteSettings?.defaultSeo?.shareImage;
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

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const { event } = await getEvent(slug);

  if (!event) notFound();

  return (
    <div className="flex w-full flex-col items-center">
      <EventHero event={event} />
      <EventMarquee text={event.closingMarqueeText} tone="gold" />
      <EventPoweredBy label={event.poweredByLabel} partners={event.poweredByPartners} />
      <EventEssentials essentials={event.essentials} />
      <EventAbout event={event} />
      <EventSteps heading={event.stepsHeading} subheading={event.stepsSubheading} steps={event.steps} />
      <EventPracticeClues clues={event.practiceCluesEnabled ? event.practiceClues : undefined} />
      <EventFeaturedBusinesses heading={event.featuredBusinessesHeading} businesses={event.featuredBusinesses} />
      <EventReasons reasons={event.reasons} />
      <EventPrizes
        heading={event.prizesHeading}
        tally={event.prizeTally}
        intro={event.prizesIntro}
        prizes={event.prizes}
        joinCtaHref={event.secondaryCta?.href}
      />
      {event.trailEnabled ? <EventTrail checkpoints={event.checkpoints} /> : null}
      <EventRegistration event={event} />
      <EventFaqs faqs={event.faqs} />
      <div className="h-14 md:h-20" />
    </div>
  );
}
