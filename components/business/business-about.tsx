import { PillButton } from "@/components/ui/pill-button";
import { BusinessPortableText } from "@/components/business/business-portable-text";
import { ShopLocations } from "@/components/business/shop-locations";
import type { Business } from "@/lib/sanity/types";

type BusinessAboutProps = {
  business: Business;
};

export function BusinessAbout({ business }: BusinessAboutProps) {
  const primaryLocation = business.locations?.[0];

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-9 px-5 pt-12 md:gap-16 md:px-12 md:pt-20">
      <div className="flex flex-col gap-5">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
          About {business.name}
        </span>
        {business.aboutTitle ? (
          <h2 className="m-0 max-w-[16em] text-balance font-heading text-[clamp(1.625rem,3vw,2.375rem)] font-semibold leading-[1.15] tracking-tight">
            {business.aboutTitle}
          </h2>
        ) : null}
        <BusinessPortableText value={business.aboutBody} className="flex flex-col gap-5" />
      </div>

      <aside className="flex flex-col gap-4">
        {business.locations && business.locations.length > 0 ? (
          <>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              Visit their shop{business.locations.length > 1 ? "s" : ""}
            </span>
            <ShopLocations locations={business.locations} />
          </>
        ) : null}

        {(business.categories && business.categories.length > 0) || (business.areaLinks && business.areaLinks.length > 0) ? (
          <div className="flex flex-col gap-3.5 rounded-[1.375rem] border border-background/16 px-6 py-6">
            {business.categories && business.categories.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-background/50">Categories</span>
                <span className="text-[15px] leading-relaxed text-background/86">
                  {business.categories.map((c, i) => (
                    <span key={c._id}>
                      {i > 0 ? " · " : null}
                      <a href={`/business-directory/${c.slug}`} className="hover:text-[var(--accent)]">
                        {c.name}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
            {business.categories && business.categories.length > 0 && business.areaLinks && business.areaLinks.length > 0 ? (
              <div className="h-px bg-background/14" />
            ) : null}
            {business.areaLinks && business.areaLinks.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-background/50">Areas</span>
                <span className="text-[15px] leading-relaxed text-background/86">
                  {business.areaLinks.map((a, i) => (
                    <span key={a.href}>
                      {i > 0 ? " · " : null}
                      <a href={a.href} className="hover:text-[var(--accent)]">
                        {a.label}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {primaryLocation ? (
          <PillButton
            href={primaryLocation.tel}
            variant="dark"
            size="md"
            className="w-full justify-center border border-background/16 bg-background text-foreground hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
          >
            Call the shop
          </PillButton>
        ) : null}
      </aside>
    </section>
  );
}
