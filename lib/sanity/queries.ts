import { groq } from "next-sanity";

const seoProjection = groq`{ metaTitle, metaDescription, shareImage }`;
const linkProjection = groq`{ label, href }`;
const postProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  category,
  readTimeMinutes,
  publishedAt,
  "author": author->{name}
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteTitle,
  defaultSeo ${seoProjection},
  primaryNav[] ${linkProjection},
  joinCtaLabel,
  joinCtaHref,
  registerUrl,
  footerBlurb,
  footerColumns[]{
    title,
    links[] ${linkProjection}
  },
  socialLinks[]{ label, initial, href },
  copyrightLine
}`;

export const homeQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    defaultSeo ${seoProjection},
    primaryNav[] ${linkProjection},
    joinCtaLabel,
    joinCtaHref,
    registerUrl,
    footerBlurb,
    footerColumns[]{
      title,
      links[] ${linkProjection}
    },
    socialLinks[]{ label, initial, href },
    copyrightLine
  },
  "homePage": *[_type == "homePage"][0]{
    seo ${seoProjection},
    heroKicker,
    heroHeading,
    heroSubheading,
    heroImage,
    heroPrimaryCta ${linkProjection},
    heroSecondaryCta ${linkProjection},
    showCategories,
    categoriesHeading,
    categoriesLink ${linkProjection},
    questKicker,
    questTitle,
    questDescription,
    questStats[]{ value, label },
    questPrimaryCtaLabel,
    questSecondaryCta ${linkProjection},
    eventsHeading,
    eventsLink ${linkProjection},
    joinKicker,
    joinTitle,
    joinBody,
    joinPrimaryCta ${linkProjection},
    joinSecondaryCta ${linkProjection},
    joinBenefits[]{ title, body },
    blogHeading,
    blogLink ${linkProjection},
    marqueeNames
  },
  "categories": *[_type == "category"] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    count
  },
  "events": *[_type == "event"] | order(date asc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    date,
    detail
  },
  "posts": *[_type == "post"] | order(publishedAt desc)[0...3] ${postProjection}
}`;

export const blogPageQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    defaultSeo ${seoProjection},
    registerUrl
  },
  "blogSettings": *[_type == "blogSettings"][0]{
    issueLabel,
    headline,
    intro,
    questCountdownEnabled,
    questCountdownTargetDate,
    questCountdownCtaLabel,
    topicsHeading,
    editorsPicksHeading,
    newsletterTitle,
    newsletterBody,
    newsletterPlaceholder,
    newsletterCtaLabel,
    newsletterUrl,
    seo ${seoProjection}
  },
  "posts": *[_type == "post"] | order(publishedAt desc) ${postProjection},
  "editorsPicks": *[_type == "blogSettings"][0].editorsPicks[]-> ${postProjection}
}`;

export const businessSlugsQuery = groq`*[_type == "business" && defined(slug.current)].slug.current`;

export const businessBySlugQuery = groq`{
  "business": *[_type == "business" && slug.current == $slug][0]{
    name,
    displayName,
    "slug": slug.current,
    trade,
    order,
    accentColor,
    tagline,
    cardBlurb,
    isMember,
    tier,
    avatarImage,
    followerCount,
    questVisitCount,
    journalFeatureCount,
    badges,
    listedDate,
    "author": author->{name},
    heroImage,
    "categories": categories[]->{_id, name, "slug": slug.current},
    areaLinks[] ${linkProjection},
    locations[]{_key, label, name, address, phone, tel, openingHours},
    aboutTitle,
    aboutBody,
    sellsHeading,
    sellsSubheading,
    sells[]{_key, title, body},
    sellsFooterTitle,
    sellsFooterBody,
    galleryImages,
    whyItMattersEyebrow,
    whyItMattersTitle,
    whyItMattersBody,
    whyItMattersClosingBold,
    whyItMattersClosingText,
    tickerText,
    tags[] ${linkProjection},
    seo ${seoProjection}
  },
  "prevBusiness": *[_type == "business" && order < *[_type == "business" && slug.current == $slug][0].order] | order(order desc)[0]{
    name,
    "slug": slug.current
  },
  "nextBusiness": *[_type == "business" && order > *[_type == "business" && slug.current == $slug][0].order] | order(order asc)[0]{
    name,
    "slug": slug.current
  }
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const postBySlugQuery = groq`{
  "post": *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    category,
    readTimeMinutes,
    publishedAt,
    "author": author->{name, bio, avatar},
    "relatedBusiness": relatedBusiness->{
      name,
      "slug": slug.current,
      trade,
      order,
      avatarImage,
      heroImage,
      areaLinks[0] ${linkProjection},
      followerCount,
      questVisitCount,
      "categories": categories[]->{_id, name, "slug": slug.current}
    },
    tags[] ${linkProjection},
    body[]{
      ...,
      _type == "calloutBox" => {eyebrow, text, footerText, ctaLabel, ctaHref},
      _type == "statGrid" => {stats[]{value, label}}
    },
    seo ${seoProjection}
  },
  "blogSettings": *[_type == "blogSettings"][0]{
    issueLabel,
    headline,
    intro,
    questCountdownEnabled,
    questCountdownTargetDate,
    questCountdownCtaLabel,
    newsletterTitle,
    newsletterBody,
    newsletterPlaceholder,
    newsletterCtaLabel,
    newsletterUrl,
    seo ${seoProjection}
  },
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    defaultSeo ${seoProjection},
    registerUrl
  },
  "nearbyBusinesses": *[
    _type == "business"
    && _id != *[_type == "post" && slug.current == $slug][0].relatedBusiness._ref
    && count((categories[]._ref)[@ in *[_type == "post" && slug.current == $slug][0].relatedBusiness->categories[]._ref]) > 0
  ][0...2]{
    name,
    "slug": slug.current,
    trade
  },
  "moreStories": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] ${postProjection},
  "totalPostCount": count(*[_type == "post"]),
  "authorPostCount": count(*[_type == "post" && author._ref == *[_type == "post" && slug.current == $slug][0].author._ref])
}`;

export const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)].slug.current`;

export const eventBySlugQuery = groq`{
  "event": *[_type == "event" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    date,
    detail,
    kicker,
    feeLabel,
    heroHeadline,
    heroHighlight,
    subtitle,
    heroImage,
    registerUrl,
    registerCtaLabel,
    secondaryCta ${linkProjection},
    countdownEnabled,
    poweredByLabel,
    poweredByPartners,
    essentials[]{_key, label, value, note},
    aboutEyebrow,
    aboutTitle,
    aboutBody,
    aboutImage,
    aboutTags,
    stepsHeading,
    stepsSubheading,
    steps[]{_key, title, body, meta},
    practiceCluesEnabled,
    practiceClues[]{_key, tag, text, answer},
    featuredBusinessesHeading,
    "featuredBusinesses": featuredBusinesses[]->{
      name,
      "slug": slug.current,
      trade,
      cardBlurb,
      tagline,
      heroImage,
      "categories": categories[]->{_id, name, "slug": slug.current}
    },
    reasons[]{_key, title, body},
    prizesHeading,
    prizeTally,
    prizesIntro,
    prizes[]{_key, name, prize},
    trailEnabled,
    checkpoints[]{_key, title, body},
    registrationEnabled,
    registrationCategories,
    pricePerTeam,
    minTeamSize,
    maxTeamSize,
    faqs[]{_key, q, a},
    closingMarqueeText,
    seo ${seoProjection}
  },
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    defaultSeo ${seoProjection}
  }
}`;

export const directoryPageQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    defaultSeo ${seoProjection},
    joinCtaHref
  },
  "directorySettings": *[_type == "directorySettings"][0]{
    kicker,
    headline,
    searchPlaceholder,
    featureCtaLabel,
    registerInterestText,
    registerInterestCtaLabel,
    seo ${seoProjection}
  },
  "businesses": *[_type == "business"] | order(order asc){
    name,
    "slug": slug.current,
    trade,
    tier,
    order,
    tagline,
    cardBlurb,
    avatarImage,
    heroImage,
    areaLinks[0] ${linkProjection},
    "categories": categories[]->{_id, name, "slug": slug.current},
    badges,
    followerCount,
    questVisitCount,
    journalFeatureCount
  },
  "categories": *[_type == "category"] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    "count": count(*[_type == "business" && references(^._id)])
  }
}`;
