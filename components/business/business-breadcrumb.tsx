import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Business } from "@/lib/sanity/types";

type BusinessBreadcrumbProps = {
  business: Business;
};

export function BusinessBreadcrumb({ business }: BusinessBreadcrumbProps) {
  const primaryCategory = business.categories?.[0];

  return (
    <div className="flex flex-wrap items-center gap-3.5 border-b border-background/10 px-5 py-3.5 md:px-12">
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex-nowrap gap-2 overflow-x-auto text-[13px] text-background/55 [&::-webkit-scrollbar]:hidden">
          <BreadcrumbItem>
            <BreadcrumbLink href="/business-directory" className="whitespace-nowrap text-background/72 hover:text-[var(--accent)]">
              Business Directory
            </BreadcrumbLink>
          </BreadcrumbItem>
          {primaryCategory ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/business-directory/${primaryCategory.slug}`}
                  className="whitespace-nowrap text-background/72 hover:text-[var(--accent)]"
                >
                  {primaryCategory.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : null}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="whitespace-nowrap text-background">{business.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="hidden flex-none whitespace-nowrap text-xs font-bold uppercase tracking-[0.1em] text-background/50 sm:inline-flex">
        No. {String(business.order).padStart(2, "0")} of the trades
      </span>
    </div>
  );
}
