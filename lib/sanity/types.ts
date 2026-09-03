export type SanityImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type Link = {
  label: string;
  href: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: SanityImage;
};

export type Stat = {
  value: string;
  label: string;
};

export type Benefit = {
  title: string;
  body: string;
};

export type FooterColumn = {
  title: string;
  links: Link[];
};

export type SocialLink = {
  label: string;
  initial: string;
  href: string;
};

export type SiteSettings = {
  siteTitle: string;
  defaultSeo?: Seo;
  primaryNav: Link[];
  joinCtaLabel: string;
  joinCtaHref: string;
  registerUrl: string;
  footerBlurb: string;
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
  copyrightLine: string;
};

export type HomePage = {
  seo?: Seo;
  heroKicker?: string;
  heroHeading: string;
  heroSubheading?: string;
  heroImage?: SanityImage;
  heroPrimaryCta?: Link;
  heroSecondaryCta?: Link;
  showCategories: boolean;
  categoriesHeading?: string;
  categoriesLink?: Link;
  questKicker?: string;
  questTitle?: string;
  questDescription?: string;
  questStats: Stat[];
  questPrimaryCtaLabel?: string;
  questSecondaryCta?: Link;
  eventsHeading?: string;
  eventsLink?: Link;
  joinKicker?: string;
  joinTitle?: string;
  joinBody?: string;
  joinPrimaryCta?: Link;
  joinSecondaryCta?: Link;
  joinBenefits: Benefit[];
  blogHeading?: string;
  blogLink?: Link;
  marqueeNames: string[];
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  count?: number;
};

export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  detail?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImage;
  excerpt: string;
  category?: string;
  readTimeMinutes?: number;
  publishedAt: string;
};

export type HomeQueryResult = {
  siteSettings: SiteSettings | null;
  homePage: HomePage | null;
  categories: Category[];
  events: EventItem[];
  posts: Post[];
};
