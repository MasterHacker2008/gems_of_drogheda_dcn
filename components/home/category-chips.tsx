import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Category, HomePage } from "@/lib/sanity/types";

type CategoryChipsProps = {
  homePage: HomePage;
  categories: Category[];
};

export function CategoryChips({ homePage, categories }: CategoryChipsProps) {
  if (!homePage.showCategories || categories.length === 0) return null;

  return (
    <section className="w-full border-y border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:px-10">
        <SectionHeading
          title={homePage.categoriesHeading ?? "Browse by category"}
          link={homePage.categoriesLink}
          size="sm"
        />
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <Chip
              key={category._id}
              href={`/directory?category=${category.slug}`}
              label={category.name}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
