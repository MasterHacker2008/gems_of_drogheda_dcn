import type { EventStep } from "@/lib/sanity/types";

type EventStepsProps = {
  heading?: string;
  subheading?: string;
  steps?: EventStep[];
};

export function EventSteps({ heading, subheading, steps }: EventStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="mt-14 w-full bg-foreground px-5 py-14 text-background md:mt-20 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-9">
        <div className="flex flex-wrap items-baseline gap-4">
          <h2 className="m-0 font-heading text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-tight">
            {heading ?? "How it works"}
          </h2>
          {subheading ? <span className="text-base text-secondary">{subheading}</span> : null}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
          {steps.map((step, i) => (
            <div key={step._key} className="flex flex-col gap-3.5">
              <div className="flex h-[4.875rem] w-[4.875rem] items-center justify-center rounded-full bg-secondary font-heading text-3xl font-semibold text-secondary-foreground shadow-[0_12px_26px_-12px_rgba(242,164,41,0.8)]">
                {i + 1}
              </div>
              <span className="font-heading text-xl font-semibold tracking-tight">{step.title}</span>
              <span className="text-[15px] leading-relaxed text-background/74">{step.body}</span>
              {step.meta ? (
                <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-bold text-primary-foreground">
                  {step.meta}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
