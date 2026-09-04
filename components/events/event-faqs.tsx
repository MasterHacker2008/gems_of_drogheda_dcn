import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq._key} value={faq._key} className="border-b border-border">
            <AccordionTrigger className="py-5 text-left font-heading text-lg font-semibold tracking-tight text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
