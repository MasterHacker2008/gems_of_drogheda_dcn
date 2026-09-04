import { GemIcon } from "@/components/ui/gem-icon";
import type { EventReason } from "@/lib/sanity/types";

type EventReasonsProps = {
  reasons?: EventReason[];
};

export function EventReasons({ reasons }: EventReasonsProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className="mt-14 w-full bg-primary px-5 py-12 text-primary-foreground md:mt-20 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {reasons.map((reason) => (
          <div
            key={reason._key}
            className="flex flex-col gap-2.5 rounded-3xl border border-secondary/45 bg-background/[.08] p-6 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-1.5 hover:border-secondary hover:bg-background/[.16]"
          >
            <GemIcon size={24} fillClassName="text-secondary" />
            <span className="font-heading text-xl font-semibold tracking-tight">{reason.title}</span>
            <span className="text-[15px] leading-relaxed text-primary-foreground/78">{reason.body}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
