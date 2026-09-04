import { BusinessProfileCard } from "@/components/directory/business-profile-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { DirectoryBusiness } from "@/lib/sanity/types";

type FeaturedBusinessesProps = {
  businesses: DirectoryBusiness[];
  joinCtaHref?: string;
};

export function FeaturedBusinesses({ businesses, joinCtaHref }: FeaturedBusinessesProps) {
  if (businesses.length === 0) return null;

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:px-10">
        <SectionHeading
          title="Meet the gems"
          link={{ label: "Browse the directory", href: "/business-directory" }}
          size="sm"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {businesses.map((business) => (
            <BusinessProfileCard key={business.slug} business={business} joinCtaHref={joinCtaHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
