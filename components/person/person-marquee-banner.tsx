import { GemIcon } from "@/components/ui/gem-icon";

type PersonMarqueeBannerProps = {
  items?: string[];
};

export function PersonMarqueeBanner({ items }: PersonMarqueeBannerProps) {
  if (!items || items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="relative z-[1] -mt-8 -rotate-2 overflow-hidden bg-secondary py-4 shadow-[0_12px_30px_-12px_hsl(var(--foreground)/0.45)]">
      <div className="flex w-max animate-ticker">
        {[0, 1].map((i) => (
          <span key={i} className="flex whitespace-nowrap">
            {loop.map((item, j) => (
              <span
                key={`${i}-${j}`}
                className="flex items-center gap-7 pr-7 font-heading text-[clamp(1.375rem,3vw,2.125rem)] font-extrabold tracking-[-0.02em] text-secondary-foreground"
              >
                {item}
                <GemIcon fillClassName="text-secondary-foreground" size={18} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
