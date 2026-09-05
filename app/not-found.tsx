import type { Metadata } from "next";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";

export const metadata: Metadata = {
  title: "Gem not found",
};

export default function NotFound() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <GemIcon
        twoTone={{ top: "fill-primary", side: "fill-secondary" }}
        size={56}
        className="animate-gem-turn opacity-90"
      />
      <span className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">404</span>
      <h1 className="mt-3 max-w-lg text-balance font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
        This gem hasn&apos;t been uncovered yet
      </h1>
      <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
        The page you&apos;re looking for has moved, closed up shop, or never existed. Let&apos;s get you back on the trail.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PillButton href="/" variant="primary" size="md">
          Back to the homepage
        </PillButton>
        <PillButton href="/business-directory" variant="outline" size="md">
          Browse the directory
        </PillButton>
        <PillButton href="/blog" variant="outline" size="md">
          Read the Journal
        </PillButton>
      </div>
    </div>
  );
}
