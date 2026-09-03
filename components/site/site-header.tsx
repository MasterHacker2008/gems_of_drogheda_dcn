import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import type { SiteSettings } from "@/lib/sanity/types";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 md:px-10">
        <Link href="#top" className="flex flex-none items-center gap-2.5 text-foreground">
          <GemIcon twoTone={{ top: "fill-primary", side: "fill-secondary" }} size={22} />
          <span className="whitespace-nowrap font-heading text-base font-bold tracking-tight">
            {settings.siteTitle}
          </span>
        </Link>

        <nav className="ml-2 flex flex-wrap items-center gap-4 md:gap-5">
          {settings.primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <PillButton href={settings.joinCtaHref} variant="primary" size="sm">
          {settings.joinCtaLabel}
        </PillButton>
      </div>
    </header>
  );
}
