import { BusinessPortableText } from "@/components/business/business-portable-text";
import type { Business } from "@/lib/sanity/types";

type BusinessWhyItMattersProps = {
  business: Business;
};

export function BusinessWhyItMatters({ business }: BusinessWhyItMattersProps) {
  if (!business.whyItMattersTitle && (!business.whyItMattersBody || business.whyItMattersBody.length === 0)) {
    return null;
  }

  return (
    <section className="px-5 pt-12 md:px-12 md:pt-20">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-8 overflow-hidden rounded-[1.75rem] border border-background/16 p-7 md:gap-14 md:rounded-[2rem] md:p-14">
        <svg
          viewBox="0 0 26 30"
          width={240}
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 animate-tp-turn opacity-[.06]"
        >
          <path d="M13 1.6 L24 12 L13 28.4 L2 12 Z" fill="none" stroke="var(--accent)" strokeWidth={1} />
          <path d="M2 12 H24 M13 1.6 V28.4 M2 12 L13 12 L24 12" stroke="var(--accent)" strokeWidth={0.5} />
        </svg>

        <div className="flex flex-col gap-5">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            {business.whyItMattersEyebrow ?? "Why it matters for Drogheda"}
          </span>
          {business.whyItMattersTitle ? (
            <h2 className="m-0 max-w-[18em] text-pretty font-heading text-[clamp(1.5rem,2.8vw,2.125rem)] font-medium leading-[1.25] tracking-tight">
              {business.whyItMattersTitle}
            </h2>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <BusinessPortableText value={business.whyItMattersBody} className="flex flex-col gap-4" />
          {business.whyItMattersClosingBold || business.whyItMattersClosingText ? (
            <>
              <div className="my-1 h-px bg-background/14" />
              <p className="m-0 text-pretty text-base leading-[1.75] text-background/62">
                {business.whyItMattersClosingBold ? (
                  <strong className="font-semibold text-background">{business.whyItMattersClosingBold} </strong>
                ) : null}
                {business.whyItMattersClosingText}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
