"use client";

import { useMemo, useState } from "react";

import { BlogMasthead } from "@/components/blog/blog-masthead";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { LeadStory } from "@/components/blog/lead-story";
import { StoryGrid } from "@/components/blog/story-grid";
import type { BlogSettings, Post, Topic } from "@/lib/sanity/types";

type BlogExplorerProps = {
  blogSettings: BlogSettings | null;
  registerUrl?: string;
  posts: Post[];
  editorsPicks: Post[];
  topics: Topic[];
};

export function BlogExplorer({ blogSettings, registerUrl, posts, editorsPicks, topics }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTopic && post.category !== activeTopic) return false;
      if (q) {
        const haystack = `${post.title} ${post.excerpt} ${post.category ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [posts, query, activeTopic]);

  const [lead, ...rest] = filtered;
  const secondary = rest.slice(0, 2);

  function toggleTopic(label: string) {
    setActiveTopic((prev) => (prev === label ? null : label));
  }

  return (
    <div className="flex w-full flex-col items-center">
      <BlogMasthead
        blogSettings={blogSettings}
        registerUrl={registerUrl}
        searchQuery={query}
        onSearchChange={setQuery}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-[1.55fr_1fr] md:px-12 md:py-14">
        <div className="flex flex-col gap-6">
          {lead ? (
            <>
              <LeadStory post={lead} />
              <StoryGrid posts={secondary} />
            </>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              No stories match that search yet.
            </p>
          )}
        </div>

        <BlogSidebar
          blogSettings={blogSettings}
          posts={posts}
          editorsPicks={editorsPicks}
          topics={topics}
          activeTopic={activeTopic}
          onTopicToggle={toggleTopic}
        />
      </div>
    </div>
  );
}
