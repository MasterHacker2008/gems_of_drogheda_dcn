import { GemIcon } from "@/components/ui/gem-icon";
import type { HomePage } from "@/lib/sanity/types";

type MarqueeProps = {
  homePage: HomePage;
};

export function Marquee({ homePage }: MarqueeProps) {
  if (homePage.marqueeNames.length === 0) return null;

  const names = [...homePage.marqueeNames, ...homePage.marqueeNames];

  return (
    <section id="about" className="w-full overflow-hidden border-t border-border bg-background">
      <div className="flex w-max animate-ticker gap-16 py-4">
        {names.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-3.5 whitespace-nowrap font-heading text-[15px] font-semibold tracking-tight text-muted-foreground"
          >
            <GemIcon size={11} fillClassName="text-[#C9B994]" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
