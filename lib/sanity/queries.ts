import { groq } from "next-sanity";

const seoProjection = groq`{ metaTitle, metaDescription, shareImage }`;
const linkProjection = groq`{ label, href }`;

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
  "posts": *[_type == "post"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    excerpt,
    category,
    readTimeMinutes,
    publishedAt
  }
}`;
