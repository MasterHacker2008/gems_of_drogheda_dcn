import type { EventFaqItem } from "@/lib/sanity/types";

type EventFaqsProps = {
  faqs?: EventFaqItem[];
};

export function EventFaqs({ faqs }: EventFaqsProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pt-14 md:px-10 md:pt-20">
      <div className="flex flex-wrap items-baseline gap-4">
        <h2 className="m-0 font-heading text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold tracking-tight text-foreground">
          Good to know
        </h2>
        <span className="text-base text-muted-foreground">The questions we get asked most</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {faqs.map((faq, i) => (
          <div
            key={faq._key}
            className={`flex flex-col gap-2 rounded-2xl border p-6 transition-colors duration-150 hover:border-primary ${
              i % 2 ? "border-[#C9DEDD] bg-[#E8F1F0]" : "border-border bg-background"
            }`}
          >
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">{faq.q}</span>
            <span className="text-[15px] leading-relaxed text-muted-foreground">{faq.a}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
