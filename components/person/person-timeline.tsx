import { GemIcon } from "@/components/ui/gem-icon";
import type { PersonTimelineEntry } from "@/lib/sanity/types";

type PersonTimelineProps = {
  headingLine1?: string;
  headingLine2?: string;
  entries?: PersonTimelineEntry[];
};

export function PersonTimeline({ headingLine1, headingLine2, entries }: PersonTimelineProps) {
  if (!entries || entries.length === 0) return null;

  return (
    <section className="mt-16 bg-foreground px-5 py-14 text-background md:mt-24 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <h2 className="m-0 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          {headingLine1}
          <br />
          <span className="text-secondary">{headingLine2}</span>
        </h2>

        <div className="relative">
          <svg
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-10 w-full md:block"
            aria-hidden="true"
          >
            <path
              d="M0 20 C 125 0, 250 40, 375 20 S 625 0, 750 20 S 900 40, 1000 20"
              fill="none"
              className="stroke-secondary"
              strokeWidth={3}
              strokeDasharray="14 12"
            />
          </svg>

          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-7">
            {entries.map((entry) => (
              <div key={entry.year} className="flex flex-col gap-3.5">
                <div className="relative flex h-[84px] w-[84px] items-center justify-center">
                  <div className="absolute inset-3.5 animate-halo-breathe rounded-full bg-secondary/35" />
                  <GemIcon twoTone={{ top: "fill-secondary", side: "fill-[#F5BC60]" }} size={34} className="relative" />
                </div>
                <span className="font-heading text-4xl font-extrabold tracking-[-0.03em] text-[#F5BC60]">
                  {entry.year}
                </span>
                <span className="text-base leading-relaxed text-background/80">{entry.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
