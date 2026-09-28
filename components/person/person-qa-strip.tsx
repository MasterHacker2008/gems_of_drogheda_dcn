import type { PersonQa } from "@/lib/sanity/types";

type PersonQaStripProps = {
  heading?: string;
  items?: PersonQa[];
};

const TONES = [
  "bg-primary text-background",
  "bg-secondary text-secondary-foreground",
  "bg-background text-foreground",
  "bg-foreground text-background",
  "bg-[#E8F1F0] text-[#15707F]",
  "bg-[#F5BC60] text-secondary-foreground",
];

export function PersonQaStrip({ heading, items }: PersonQaStripProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="pt-16 md:pt-24">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end gap-4 px-5 pb-6 md:px-12">
        <h2 className="m-0 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          {heading}
        </h2>
        <div className="flex-1" />
        <span className="text-sm text-muted-foreground">Scroll sideways →</span>
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 pb-10 pt-2 [scroll-snap-type:x_mandatory] md:px-12 [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <div
            key={item.question}
            className={`flex min-h-[300px] flex-[0_0_clamp(250px,26vw,300px)] flex-col gap-4 rounded-[1.75rem] p-7 shadow-[0_18px_34px_-20px_hsl(var(--foreground)/0.5)] [scroll-snap-align:start] ${TONES[i % TONES.length]}`}
          >
            <span className="font-heading text-[44px] font-extrabold leading-none tracking-[-0.04em] opacity-55">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading text-xl font-bold leading-[1.2] tracking-[-0.015em]">{item.question}</span>
            <div className="flex-1" />
            <span className="text-base leading-relaxed">{item.answer}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
