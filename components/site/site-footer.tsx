import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import type { SiteSettings } from "@/lib/sanity/types";

type IconProps = { className?: string };

const socialIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  facebook: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3h-3v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.7 5.7 0 1 0 4.8 5.6V9.1a7 7 0 0 0 4 1.3V7.3A4.2 4.2 0 0 1 16.6 3z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 8.5h3V19H5V8.5zM6.5 4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10.5 8.5h2.9v1.4c.4-.8 1.4-1.6 3-1.6 3 0 3.6 2 3.6 4.6V19h-3v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V19h-3V8.5z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.8 3h3.1l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21H2.3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
    </svg>
  ),
};

function SocialIcon({ label, initial }: { label: string; initial: string }) {
  const key = label.toLowerCase().replace(/\s+/g, "");
  const match = key === "twitter" ? "x" : Object.keys(socialIcons).find((name) => key.includes(name));
  const Icon = match ? socialIcons[match] : null;
  return Icon ? <Icon className="h-[18px] w-[18px]" /> : <>{initial}</>;
}

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
                <SocialIcon label={social.label} initial={social.initial} />
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
          An initiative by Drogheda City Now.
        </span>
        <span className="text-[13.5px] text-background/50">{settings.copyrightLine}</span>
      </div>
    </footer>
  );
}
