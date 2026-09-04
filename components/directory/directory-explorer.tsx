"use client";

import { useMemo, useState } from "react";

import { BusinessProfileCard } from "@/components/directory/business-profile-card";
import { SearchBar } from "@/components/ui/search-bar";
import type { DirectoryBusiness, DirectoryCategory, DirectorySettings } from "@/lib/sanity/types";

type DirectoryExplorerProps = {
  directorySettings: DirectorySettings | null;
  businesses: DirectoryBusiness[];
  categories: DirectoryCategory[];
  joinCtaHref?: string;
  featureCtaLabel?: string;
};

const TRAIL_STOPS_FILTER = "__trail-stops__";

export function DirectoryExplorer({
  directorySettings,
  businesses,
  categories,
  joinCtaHref,
  featureCtaLabel,
}: DirectoryExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const badgeFilters = useMemo(() => {
    const set = new Set<string>();
    for (const business of businesses) {
      business.badges?.forEach((b) => set.add(b));
    }
    return Array.from(set).sort();
  }, [businesses]);

  const onTrailCount = businesses.filter((b) => b.tier !== "directory-listed").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((business) => {
      if (q) {
        const haystack = `${business.name} ${business.trade} ${business.areaLinks?.label ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (activeCategory && !business.categories?.some((c) => c.slug === activeCategory)) return false;
      for (const filter of activeFilters) {
        if (filter === TRAIL_STOPS_FILTER) {
          if (business.tier === "directory-listed") return false;
        } else if (!business.badges?.includes(filter)) {
          return false;
        }
      }
      return true;
    });
  }, [businesses, query, activeCategory, activeFilters]);

  function toggleFilter(key: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="flex w-full flex-col items-center">
      <section className="w-full bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-9 md:px-12 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div className="flex max-w-[32em] flex-col gap-2.5">
              {directorySettings?.kicker ? (
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5BC60]">
                  {directorySettings.kicker}
                </span>
              ) : null}
              {directorySettings?.headline ? (
                <h1 className="m-0 font-heading text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
                  {directorySettings.headline}
                </h1>
              ) : null}
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl font-semibold leading-none text-secondary">
                  {businesses.length}
                </span>
                <span className="text-xs text-background/60">listed</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl font-semibold leading-none">{onTrailCount}</span>
                <span className="text-xs text-background/60">on the trail</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={directorySettings?.searchPlaceholder ?? "Search by name, street or trade"}
              ariaLabel="Search the directory"
            />
            {joinCtaHref && featureCtaLabel ? (
              <a
                href={joinCtaHref}
                className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full bg-secondary px-6 py-3.5 font-heading text-sm font-bold text-secondary-foreground hover:bg-[#F5BC60]"
              >
                {featureCtaLabel}
              </a>
            ) : null}
          </div>

          {categories.length > 0 ? (
            <div className="-mb-9 flex gap-1 overflow-x-auto pt-2 [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`flex-none whitespace-nowrap rounded-t-xl px-4 py-2.5 font-heading text-[13px] font-bold transition-colors ${
                  activeCategory === null ? "bg-muted text-foreground" : "text-background/66 hover:text-background"
                }`}
              >
                All {businesses.length}
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  className={`flex-none whitespace-nowrap rounded-t-xl px-4 py-2.5 font-heading text-[13px] font-semibold transition-colors ${
                    activeCategory === category.slug
                      ? "bg-muted text-foreground"
                      : "text-background/66 hover:text-background"
                  }`}
                >
                  {category.name} {category.count}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 pb-16 pt-9 md:px-12 md:pt-11">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleFilter(TRAIL_STOPS_FILTER)}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors ${
              activeFilters.has(TRAIL_STOPS_FILTER)
                ? "bg-foreground text-background"
                : "border border-border bg-background text-muted-foreground hover:border-[#C9B994]"
            }`}
          >
            Trail stops
          </button>
          {badgeFilters.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => toggleFilter(badge)}
              className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 font-heading text-xs font-semibold transition-colors ${
                activeFilters.has(badge)
                  ? "bg-foreground text-background"
                  : "border border-border bg-background text-muted-foreground hover:border-[#C9B994]"
              }`}
            >
              {badge}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {filtered.map((business) => (
              <BusinessProfileCard key={business.slug} business={business} joinCtaHref={joinCtaHref} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">No businesses match those filters yet.</p>
        )}

        {directorySettings?.registerInterestText ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.375rem] border border-dashed border-[#C9B994] bg-[#E8F1F0] px-5 py-4">
            <span className="text-pretty text-sm text-muted-foreground">{directorySettings.registerInterestText}</span>
            {joinCtaHref && directorySettings.registerInterestCtaLabel ? (
              <a
                href={joinCtaHref}
                className="inline-flex flex-none items-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 font-heading text-[13px] font-bold text-primary-foreground hover:bg-[#15707F]"
              >
                {directorySettings.registerInterestCtaLabel}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
