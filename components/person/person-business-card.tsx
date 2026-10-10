import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import type { PersonBusiness } from "@/lib/sanity/types";

type PersonBusinessCardProps = {
  business?: PersonBusiness | null;
  personName: string;
  role?: string;
};

export function PersonBusinessCard({ business, personName, role }: PersonBusinessCardProps) {
  if (!business) return null;

  const blurb = business.cardBlurb ?? business.tagline;
  const meta = [business.trade, business.area].filter(Boolean).join(" · ");

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 pt-16 md:px-12 md:pt-24">
      <div className="relative flex flex-col gap-5 overflow-hidden rounded-[2rem] bg-primary p-7 text-background md:p-12">
        <GemIcon
          fillClassName="text-secondary"
          size={200}
          className="pointer-events-none absolute -right-8 -top-5 animate-gem-turn opacity-20 [animation-duration:40s]"
        />
        <span className="relative font-heading text-xs font-bold uppercase tracking-[0.12em]">
          {role ? `${personName} · ${role}` : `Part of the team`}
        </span>
        <h2 className="relative m-0 font-heading text-[clamp(2.125rem,4.4vw,3.375rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          {business.name}
        </h2>
        {meta ? <span className="relative text-sm font-semibold opacity-80">{meta}</span> : null}
        {blurb ? <p className="relative m-0 max-w-[30em] text-lg leading-relaxed">{blurb}</p> : null}
        <div className="relative flex flex-wrap gap-3">
          <PillButton href={`/business-directory/${business.slug}`} variant="gold">
            Visit {business.name}
          </PillButton>
          <PillButton href="/business-directory" variant="outline-on-dark">
            Browse the directory
          </PillButton>
        </div>
      </div>
    </section>
  );
}
