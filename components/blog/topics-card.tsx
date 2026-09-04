import { Badge } from "@/components/ui/badge";
import type { Topic } from "@/lib/sanity/types";

type TopicsCardProps = {
  heading?: string;
  topics: Topic[];
};

export function TopicsCard({ heading = "Topics", topics }: TopicsCardProps) {
  if (topics.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-[1.375rem] border border-[#C9B994] bg-[#E8F1F0] p-5">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{heading}</span>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge
            key={topic.label}
            variant="outline"
            className="gap-1.5 border-[#C9B994] bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
          >
            {topic.label}
            <span className="text-muted-foreground">{topic.count}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
