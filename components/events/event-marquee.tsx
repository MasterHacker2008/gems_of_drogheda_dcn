type EventMarqueeProps = {
  text?: string;
  tone?: "gold" | "teal";
};

export function EventMarquee({ text, tone = "gold" }: EventMarqueeProps) {
  if (!text) return null;

  const toneClasses = tone === "gold" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground";

  return (
    <div className={`w-full overflow-hidden py-3.5 ${toneClasses}`}>
      <div className="flex w-max animate-ticker gap-11">
        {[0, 1].map((i) => (
          <span key={i} className="font-heading text-base font-bold uppercase tracking-[0.08em] whitespace-nowrap">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
