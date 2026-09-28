import type { PersonFact } from "@/lib/sanity/types";

type PersonStoryProps = {
  statValue?: string;
  statCaption?: string;
  facts?: PersonFact[];
  lead?: string;
  leadHighlight?: string;
  paragraphs?: string[];
};

export function PersonStory({ statValue, statCaption, facts, lead, leadHighlight, paragraphs }: PersonStoryProps) {
  const hasLeftColumn = statValue || statCaption || (facts && facts.length > 0);
  const hasRightColumn = lead || leadHighlight || (paragraphs && paragraphs.length > 0);
  if (!hasLeftColumn && !hasRightColumn) return null;

  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-wrap items-start gap-10 px-5 pt-16 md:gap-16 md:px-12 md:pt-24">
      {hasLeftColumn ? (
        <div className="flex flex-1 basis-[280px] flex-col gap-4 md:sticky md:top-6">
          {statValue ? (
            <span className="font-heading text-[clamp(5.5rem,13vw,10.5rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-primary">
              {statValue}
            </span>
          ) : null}
          {statCaption ? <span className="font-heading text-lg font-bold leading-snug">{statCaption}</span> : null}
          {facts && facts.length > 0 ? (
            <dl className="mt-2 flex flex-col border-t-2 border-foreground">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-3 border-b border-border py-3 text-sm">
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="m-0 text-right font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      {hasRightColumn ? (
        <div className="flex flex-1 basis-[480px] flex-col gap-6">
          {lead || leadHighlight ? (
            <p className="m-0 text-pretty font-heading text-[clamp(1.625rem,3.4vw,2.5rem)] font-semibold leading-[1.18] tracking-[-0.025em]">
              {lead} <span className="text-primary">{leadHighlight}</span>
            </p>
          ) : null}
          {paragraphs?.map((paragraph) => (
            <p key={paragraph} className="m-0 max-w-[36em] text-pretty text-lg leading-[1.75] text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
