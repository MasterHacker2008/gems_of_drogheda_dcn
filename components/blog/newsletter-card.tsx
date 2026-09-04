import { PillButton } from "@/components/ui/pill-button";
import type { BlogSettings } from "@/lib/sanity/types";

type NewsletterCardProps = {
  blogSettings: BlogSettings;
};

export function NewsletterCard({ blogSettings }: NewsletterCardProps) {
  if (!blogSettings.newsletterTitle || !blogSettings.newsletterUrl) return null;

  return (
    <div className="flex flex-col gap-3 rounded-[1.375rem] bg-foreground p-5">
      <span className="font-heading text-lg font-semibold leading-tight text-background">
        {blogSettings.newsletterTitle}
      </span>
      {blogSettings.newsletterBody ? (
        <p className="m-0 text-[13px] leading-relaxed text-background/66">{blogSettings.newsletterBody}</p>
      ) : null}
      <div className="flex gap-2">
        {blogSettings.newsletterPlaceholder ? (
          <span className="flex-1 truncate rounded-full border border-background/18 bg-background/[.08] px-3.5 py-2.5 text-[13px] text-background/45">
            {blogSettings.newsletterPlaceholder}
          </span>
        ) : null}
        <PillButton href={blogSettings.newsletterUrl} variant="gold" size="sm" className="flex-none">
          {blogSettings.newsletterCtaLabel ?? "Join"}
        </PillButton>
      </div>
    </div>
  );
}
