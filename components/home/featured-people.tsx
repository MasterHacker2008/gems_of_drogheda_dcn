import { PersonListingCard } from "@/components/directory/person-listing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { DirectoryPerson } from "@/lib/sanity/types";

type FeaturedPeopleProps = {
  people: DirectoryPerson[];
};

export function FeaturedPeople({ people }: FeaturedPeopleProps) {
  if (!people || people.length === 0) return null;

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:px-10">
        <SectionHeading title="Meet the people" link={{ label: "See all people", href: "/people" }} size="sm" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {people.map((person) => (
            <PersonListingCard key={person.slug} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
