import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import type { SiteSettings } from "@/lib/sanity/types";

type SiteFooterProps = {
  settings: SiteSettings;
};

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="w-full bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 px-5 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2.5">
            <GemIcon twoTone={{ top: "fill-secondary", side: "fill-background" }} size={22} />
            <span className="font-heading text-lg font-bold tracking-tight">{settings.siteTitle}</span>
          </div>
          <p className="max-w-[26em] text-sm leading-relaxed text-background/62">{settings.footerBlurb}</p>
        </div>

        {settings.footerColumns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-background/44">
              {col.title}
            </span>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-background/82 hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-3.5">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-background/44">Follow</span>
          <div className="flex gap-2.5">
            {settings.socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/24 font-heading text-[13px] font-bold text-background hover:border-secondary hover:bg-background/10 hover:text-secondary"
              >
                {social.initial}
              </Link>
            ))}
          </div>
          <PillButton href={settings.registerUrl} variant="gold" size="sm" className="mt-1 self-start">
            Register for the Quest
          </PillButton>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-background/14 px-5 py-6 md:px-10">
        <span className="text-[13.5px] text-background/50">
          An initiative by Drogheda City Now. Placeholder photography from{" "}
          <a href="https://unsplash.com" className="text-background/72">
            Unsplash
          </a>
          .
        </span>
        <span className="text-[13.5px] text-background/50">{settings.copyrightLine}</span>
      </div>
    </footer>
  );
}
