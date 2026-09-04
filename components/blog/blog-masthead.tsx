import { PillButton } from "@/components/ui/pill-button";
import { daysUntil } from "@/lib/date";
import type { BlogSettings } from "@/lib/sanity/types";

type BlogMastheadProps = {
  blogSettings: BlogSettings | null;
  registerUrl?: string;
};

export function BlogMasthead({ blogSettings, registerUrl }: BlogMastheadProps) {
  if (!blogSettings) return null;

  const countdown =
    blogSettings.questCountdownEnabled && registerUrl
      ? daysUntil(blogSettings.questCountdownTargetDate)
      : null;

  return (
    <section className="w-full bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:gap-8 md:px-12 md:py-14">
        <div className="flex max-w-[35em] flex-col gap-3.5">
          {blogSettings.issueLabel ? (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5BC60]">
              The Journal · {blogSettings.issueLabel}
            </span>
          ) : null}
          {blogSettings.headline ? (
            <h1 className="m-0 font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.02] tracking-tight">
              {blogSettings.headline}
            </h1>
          ) : null}
          {blogSettings.intro ? (
            <p className="text-pretty text-[15px] leading-relaxed text-background/70">{blogSettings.intro}</p>
          ) : null}
        </div>

        {countdown && countdown.days >= 0 ? (
          <div className="flex min-w-[240px] flex-col gap-2.5 rounded-[1.375rem] border border-background/14 bg-background/[.06] px-5 py-[1.125rem]">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-background/55">
              Quest countdown
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl font-semibold tracking-tight text-secondary">
                {countdown.days}
              </span>
              <span className="text-[13px] text-background/70">
                days to {countdown.target.toLocaleDateString("en-IE", { day: "numeric", month: "short" })}
              </span>
            </div>
            <div className="h-px bg-background/14" />
            {registerUrl && blogSettings.questCountdownCtaLabel ? (
              <PillButton
                href={registerUrl}
                variant="link"
                size="sm"
                className="justify-start p-0 text-[13px] text-[#F5BC60] hover:text-secondary"
              >
                {blogSettings.questCountdownCtaLabel} →
              </PillButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
