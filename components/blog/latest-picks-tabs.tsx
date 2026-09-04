"use client";

import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post } from "@/lib/sanity/types";

type LatestPicksTabsProps = {
  latest: Post[];
  picks: Post[];
  picksLabel: string;
};

function NumberedList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      {posts.map((post, i) => (
        <div key={post._id}>
          <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 text-foreground hover:text-primary">
            <span className="font-heading text-xl font-semibold leading-none text-[#C9B994]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-heading text-[15px] font-semibold leading-tight">{post.title}</span>
              <span className="text-xs text-muted-foreground">
                {post.category ?? "Journal"} · {post.readTimeMinutes ?? 3} min
              </span>
            </div>
          </Link>
          {i < posts.length - 1 ? <div className="mt-3.5 h-px bg-border" /> : null}
        </div>
      ))}
    </div>
  );
}

export function LatestPicksTabs({ latest, picks, picksLabel }: LatestPicksTabsProps) {
  const showPicksTab = picks.length > 0;

  return (
    <Tabs defaultValue="latest">
      <TabsList className="mb-4 h-auto w-full gap-1.5 rounded-full bg-muted p-1">
        <TabsTrigger
          value="latest"
          className="flex-1 rounded-full font-heading text-xs font-bold shadow-none data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
        >
          Latest
        </TabsTrigger>
        {showPicksTab ? (
          <TabsTrigger
            value="picks"
            className="flex-1 rounded-full font-heading text-xs font-bold shadow-none data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
          >
            {picksLabel}
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContent value="latest" className="mt-0">
        <NumberedList posts={latest.slice(0, 3)} />
      </TabsContent>
      {showPicksTab ? (
        <TabsContent value="picks" className="mt-0">
          <NumberedList posts={picks.slice(0, 3)} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
