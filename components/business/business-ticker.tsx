type BusinessTickerProps = {
  text?: string;
};

export function BusinessTicker({ text }: BusinessTickerProps) {
  if (!text) return null;

  return (
    <div className="mt-9 overflow-hidden border-y border-background/10 py-4 md:mt-14">
      <div className="flex w-max animate-ticker">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap pr-10 font-heading text-[clamp(0.9375rem,1.5vw,1.1875rem)] font-semibold uppercase tracking-[0.06em] text-background/62"
          >
            {text}
            {"  〰️  "}
            {text}
            {"  〰️  "}
          </span>
        ))}
      </div>
    </div>
  );
}
