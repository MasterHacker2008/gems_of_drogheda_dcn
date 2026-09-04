import type { Topic } from "@/lib/sanity/types";

type TopicsCardProps = {
  heading?: string;
  topics: Topic[];
  activeTopic?: string | null;
  onToggle?: (label: string) => void;
};

export function TopicsCard({ heading = "Topics", topics, activeTopic, onToggle }: TopicsCardProps) {
  if (topics.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-[1.375rem] border border-[#C9B994] bg-[#E8F1F0] p-5">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{heading}</span>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const isActive = activeTopic === topic.label;
          return (
            <button
              key={topic.label}
              type="button"
              onClick={() => onToggle?.(topic.label)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-[#C9B994] bg-background text-foreground hover:border-primary"
              }`}
            >
              {topic.label}
              <span className={isActive ? "text-background/70" : "text-muted-foreground"}>{topic.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
