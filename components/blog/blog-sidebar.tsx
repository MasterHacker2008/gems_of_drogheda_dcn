import { LatestPicksTabs } from "@/components/blog/latest-picks-tabs";
import { NewsletterCard } from "@/components/blog/newsletter-card";
import { TopicsCard } from "@/components/blog/topics-card";
import type { BlogSettings, Post, Topic } from "@/lib/sanity/types";

type BlogSidebarProps = {
  blogSettings: BlogSettings | null;
  posts: Post[];
  editorsPicks: Post[];
  topics: Topic[];
  activeTopic?: string | null;
  onTopicToggle?: (label: string) => void;
};

export function BlogSidebar({
  blogSettings,
  posts,
  editorsPicks,
  topics,
  activeTopic,
  onTopicToggle,
}: BlogSidebarProps) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-[1.375rem] border border-border bg-background p-5">
        <LatestPicksTabs
          latest={posts}
          picks={editorsPicks}
          picksLabel={blogSettings?.editorsPicksHeading ?? "Most read"}
        />
      </div>

      <TopicsCard
        heading={blogSettings?.topicsHeading}
        topics={topics}
        activeTopic={activeTopic}
        onToggle={onTopicToggle}
      />

      {blogSettings ? <NewsletterCard blogSettings={blogSettings} /> : null}
    </aside>
  );
}
