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
  author?: { name: string };
};

export type HomeQueryResult = {
  siteSettings: SiteSettings | null;
  homePage: HomePage | null;
  categories: Category[];
  events: EventItem[];
  posts: Post[];
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  [key: string]: unknown;
};

export type BusinessLocation = {
  _key: string;
  label: string;
  name: string;
  address: string;
  phone: string;
  tel: string;
  openingHours?: string[];
};

export type SellItem = {
  _key: string;
  title: string;
  body: string;
};

export type BusinessCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type BusinessAuthor = {
  name: string;
};

export type BusinessTier = "gem-verified" | "campaign-sponsor" | "directory-listed";

export type Business = {
  name: string;
  displayName: string;
  slug: string;
  trade: string;
  order: number;
  accentColor: string;
  tagline?: string;
  cardBlurb?: string;
  isMember?: boolean;
  tier: BusinessTier;
  avatarImage?: SanityImage;
  followerCount?: number;
  questVisitCount?: number;
  journalFeatureCount?: number;
  badges?: string[];
  listedDate?: string;
  author?: BusinessAuthor;
  heroImage?: SanityImage;
  categories?: BusinessCategory[];
  areaLinks?: Link[];
  locations?: BusinessLocation[];
  aboutTitle?: string;
  aboutBody?: PortableTextBlock[];
  sellsHeading?: string;
  sellsSubheading?: string;
  sells?: SellItem[];
  sellsFooterTitle?: string;
  sellsFooterBody?: string;
  galleryImages?: SanityImage[];
  whyItMattersEyebrow?: string;
  whyItMattersTitle?: string;
  whyItMattersBody?: PortableTextBlock[];
  whyItMattersClosingBold?: string;
  whyItMattersClosingText?: string;
  tickerText?: string;
  tags?: Link[];
  seo?: Seo;
};

export type BusinessNeighbor = {
  name: string;
  slug: string;
};

export type BusinessBySlugResult = {
  business: Business | null;
  prevBusiness: BusinessNeighbor | null;
  nextBusiness: BusinessNeighbor | null;
};

export type BlogSettings = {
  issueLabel?: string;
  headline?: string;
  intro?: string;
  questCountdownEnabled?: boolean;
  questCountdownTargetDate?: string;
  questCountdownCtaLabel?: string;
  topicsHeading?: string;
  editorsPicksHeading?: string;
  newsletterTitle?: string;
  newsletterBody?: string;
  newsletterPlaceholder?: string;
  newsletterCtaLabel?: string;
  newsletterUrl?: string;
  seo?: Seo;
};

export type Topic = {
  label: string;
  count: number;
};

export type BlogPageResult = {
  siteSettings: SiteSettings | null;
  blogSettings: BlogSettings | null;
  posts: Post[];
  editorsPicks: Post[];
};

export type PostAuthor = {
  name: string;
  bio?: string;
  avatar?: SanityImage;
};

export type CalloutBoxBlock = {
  _type: "calloutBox";
  _key: string;
  eyebrow?: string;
  text: string;
  footerText?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type StatGridBlock = {
  _type: "statGrid";
  _key: string;
  stats: Stat[];
};

export type ArticleBodyBlock = PortableTextBlock | CalloutBoxBlock | StatGridBlock;

export type ArticleRelatedBusiness = {
  name: string;
  slug: string;
  trade: string;
  order: number;
  avatarImage?: SanityImage;
  heroImage?: SanityImage;
  areaLinks?: Link;
  followerCount?: number;
  questVisitCount?: number;
  categories?: BusinessCategory[];
};

export type NearbyBusiness = {
  name: string;
  slug: string;
  trade: string;
};

export type Article = {
  title: string;
  slug: string;
  mainImage: SanityImage;
  excerpt: string;
  category?: string;
  readTimeMinutes?: number;
  publishedAt: string;
  author?: PostAuthor;
  relatedBusiness?: ArticleRelatedBusiness;
  tags?: Link[];
  body?: ArticleBodyBlock[];
  seo?: Seo;
};

export type ArticlePageResult = {
  siteSettings: SiteSettings | null;
  blogSettings: BlogSettings | null;
  post: Article | null;
  nearbyBusinesses: NearbyBusiness[];
  moreStories: Post[];
  totalPostCount: number;
  authorPostCount: number;
};

export type EventFactCard = {
  _key: string;
  label: string;
  value: string;
  note?: string;
};

export type EventStep = {
  _key: string;
  title: string;
  body: string;
  meta?: string;
};

export type EventReason = {
  _key: string;
  title: string;
  body: string;
};

export type EventFaqItem = {
  _key: string;
  q: string;
  a: string;
};

export type EventClue = {
  _key: string;
  tag: string;
  text: string;
  answer: string;
};

export type EventCheckpoint = {
  _key: string;
  title: string;
  body: string;
};

export type EventPrize = {
  _key: string;
  name: string;
  prize: string;
};

export type EventFeaturedBusiness = {
  name: string;
  slug: string;
  trade: string;
  cardBlurb?: string;
  tagline?: string;
  heroImage?: SanityImage;
  categories?: BusinessCategory[];
};

export type Event = {
  title: string;
  slug: string;
  date: string;
  detail?: string;
  kicker?: string;
  feeLabel?: string;
  heroHeadline?: string;
  heroHighlight?: string;
  subtitle?: string;
  heroImage?: SanityImage;
  registerUrl?: string;
  registerCtaLabel?: string;
  secondaryCta?: Link;
  countdownEnabled?: boolean;
  poweredByLabel?: string;
  poweredByPartners?: string[];
  essentials?: EventFactCard[];
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutBody?: PortableTextBlock[];
  aboutImage?: SanityImage;
  aboutTags?: string[];
  stepsHeading?: string;
  stepsSubheading?: string;
  steps?: EventStep[];
  practiceCluesEnabled?: boolean;
  practiceClues?: EventClue[];
  featuredBusinessesHeading?: string;
  featuredBusinesses?: EventFeaturedBusiness[];
  reasons?: EventReason[];
  prizesHeading?: string;
  prizeTally?: string;
  prizesIntro?: string;
  prizes?: EventPrize[];
  trailEnabled?: boolean;
  checkpoints?: EventCheckpoint[];
  registrationEnabled?: boolean;
  registrationCategories?: string[];
  pricePerTeam?: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  faqs?: EventFaqItem[];
  closingMarqueeText?: string;
  seo?: Seo;
};

export type EventPageResult = {
  siteSettings: SiteSettings | null;
  event: Event | null;
};

export type DirectorySettings = {
  kicker?: string;
  headline?: string;
  searchPlaceholder?: string;
  featureCtaLabel?: string;
  registerInterestText?: string;
  registerInterestCtaLabel?: string;
  seo?: Seo;
};

export type DirectoryCategory = {
  _id: string;
  name: string;
  slug: string;
  count: number;
};

export type DirectoryBusiness = {
  name: string;
  slug: string;
  trade: string;
  tier: BusinessTier;
  order: number;
  tagline?: string;
  cardBlurb?: string;
  avatarImage?: SanityImage;
  heroImage?: SanityImage;
  areaLinks?: Link;
  categories?: BusinessCategory[];
  badges?: string[];
  followerCount?: number;
  questVisitCount?: number;
  journalFeatureCount?: number;
};

export type DirectoryPageResult = {
  siteSettings: SiteSettings | null;
  directorySettings: DirectorySettings | null;
  businesses: DirectoryBusiness[];
  categories: DirectoryCategory[];
};
