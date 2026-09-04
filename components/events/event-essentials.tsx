import { SectionHeading } from "@/components/ui/section-heading";
import type { EventFactCard } from "@/lib/sanity/types";

type EventEssentialsProps = {
  essentials?: EventFactCard[];
};

const TONES = [
  { card: "border-primary/40 bg-[#E8F1F0] text-foreground", label: "text-primary", note: "text-muted-foreground" },
  { card: "border-foreground bg-foreground text-background", label: "text-secondary", note: "text-background/70" },
  { card: "border-secondary bg-secondary/[.16] text-foreground", label: "text-[#DE9019]", note: "text-muted-foreground" },
];

export function EventEssentials({ essentials }: EventEssentialsProps) {
  if (!essentials || essentials.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-14 md:px-10 md:pt-20">
      <SectionHeading title="Quest essentials" size="lg" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        {essentials.map((fact, i) => {
          const tone = TONES[i % TONES.length];
          return (
            <div
              key={fact._key}
              className={`flex flex-col gap-2 rounded-[1.375rem] border-2 p-6 transition-transform duration-200 hover:-translate-y-1.5 ${tone.card}`}
            >
              <span className={`text-xs font-bold uppercase tracking-[0.12em] ${tone.label}`}>{fact.label}</span>
              <span className="font-heading text-2xl font-semibold leading-tight tracking-tight">{fact.value}</span>
              {fact.note ? <span className={`text-[15px] leading-relaxed ${tone.note}`}>{fact.note}</span> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
