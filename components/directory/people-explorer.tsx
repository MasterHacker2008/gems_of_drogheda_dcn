"use client";

import { useMemo, useState } from "react";

import { PersonListingCard } from "@/components/directory/person-listing-card";
import { PersonSpotlightCard } from "@/components/directory/person-spotlight-card";
import { PersonMarqueeBanner } from "@/components/person/person-marquee-banner";
import { SearchBar } from "@/components/ui/search-bar";
import type { DirectoryPerson } from "@/lib/sanity/types";

type PeopleExplorerProps = {
  people: DirectoryPerson[];
  joinCtaHref?: string;
};

const FEATURED_FILTER = "Featured";
const ALL_FILTER = "All";

export function PeopleExplorer({ people, joinCtaHref }: PeopleExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const spotlight = useMemo(() => people.find((p) => p.tier === "featured") ?? people[0], [people]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const person of people) set.add(person.category);
    return Array.from(set).sort();
  }, [people]);

  const marqueeItems = useMemo(() => Array.from(new Set(people.map((p) => p.role))), [people]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people.filter((person) => {
      if (q) {
        const haystack = [person.name, person.handle, person.role, person.area].filter(Boolean).join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (activeFilter === FEATURED_FILTER) return person.tier === "featured";
      if (activeFilter !== ALL_FILTER) return person.category === activeFilter;
      return true;
    });
  }, [people, query, activeFilter]);

  return (
    <div className="flex w-full flex-col items-center">
      <section className="w-full bg-primary text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:px-12 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div className="flex max-w-[34em] flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5BC60]">People</span>
              <h1 className="m-0 font-heading text-[clamp(2rem,4.6vw,3.375rem)] font-extrabold leading-[0.92] tracking-tight">
                The people of Drogheda.
              </h1>
              <p className="m-0 max-w-[28em] text-pretty text-base leading-relaxed text-background/85">
                The tailors, coaches, bakers and neighbours who keep the town running. A new person is featured each
                month.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl font-semibold leading-none text-secondary">{people.length}</span>
                <span className="text-xs text-background/60">people</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl font-semibold leading-none">{categories.length}</span>
                <span className="text-xs text-background/60">categories</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search people, streets or @handles"
              ariaLabel="Search people of Drogheda"
            />
            {joinCtaHref ? (
              <a
                href={joinCtaHref}
                className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full bg-secondary px-6 py-3.5 font-heading text-sm font-bold text-secondary-foreground hover:bg-[#F5BC60]"
              >
                Nominate someone
              </a>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {[ALL_FILTER, FEATURED_FILTER, ...categories].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 font-heading text-[13px] font-bold transition-colors ${
                  activeFilter === filter
                    ? "bg-secondary text-secondary-foreground"
                    : "border border-background/40 text-background hover:bg-background/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <PersonMarqueeBanner items={marqueeItems} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pb-16 pt-12 md:px-12 md:pt-16">
        {spotlight ? <PersonSpotlightCard person={spotlight} /> : null}

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="m-0 font-heading text-2xl font-extrabold tracking-tight text-foreground md:text-[2rem]">
              Everyone
            </h2>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "person" : "people"}
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              {filtered.map((person) => (
                <PersonListingCard key={person.slug} person={person} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-[1.75rem] border border-border bg-background px-8 py-10">
              <span className="font-heading text-xl font-extrabold text-foreground">Nobody matches that yet.</span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter(ALL_FILTER);
                }}
                className="inline-flex items-center whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 font-heading text-[13px] font-bold text-background"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {joinCtaHref ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.375rem] border border-dashed border-[#C9B994] bg-[#E8F1F0] px-5 py-4">
            <span className="text-pretty text-sm text-muted-foreground">
              Know someone who belongs here? Tell us who keeps your corner of Drogheda running.
            </span>
            <a
              href={joinCtaHref}
              className="inline-flex flex-none items-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 font-heading text-[13px] font-bold text-primary-foreground hover:bg-[#15707F]"
            >
              Nominate someone
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
