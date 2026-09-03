import Link from "next/link";

import type { BusinessNeighbor } from "@/lib/sanity/types";

type BusinessPrevNextProps = {
  prev: BusinessNeighbor | null;
  next: BusinessNeighbor | null;
};

export function BusinessPrevNext({ prev, next }: BusinessPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <section className="px-5 pb-16 pt-9 md:px-12 md:pb-20 md:pt-14">
      <div className="flex flex-wrap justify-between gap-6 border-t border-background/14 pt-7 md:pt-9">
        {prev ? (
          <Link href={`/business-directory/${prev.slug}`} className="flex flex-col gap-1.5 text-background hover:text-[var(--accent)]">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-background/50">Previous</span>
            <span className="font-heading text-xl font-semibold tracking-tight">← {prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/business-directory/${next.slug}`}
            className="flex flex-col items-end gap-1.5 text-right text-background hover:text-[var(--accent)]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-background/50">Next</span>
            <span className="font-heading text-xl font-semibold tracking-tight">{next.name} →</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
