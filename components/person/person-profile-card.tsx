import Image from "next/image";

import { PillButton } from "@/components/ui/pill-button";
import { urlForImage } from "@/lib/sanity/image";
import type { Link, SanityImage } from "@/lib/sanity/types";

type PersonProfileCardProps = {
  name: string;
  handle?: string;
  role?: string;
  area?: string;
  bio?: string;
  avatar?: SanityImage;
  website?: string;
  socialLinks?: Link[];
};

export function PersonProfileCard({ name, handle, role, area, bio, avatar, website, socialLinks }: PersonProfileCardProps) {
  const links = socialLinks ?? [];
  if (!bio && !website && links.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 pt-16 md:px-12 md:pt-24">
      <div className="flex flex-wrap items-center gap-6 rounded-[2rem] border border-border bg-background p-7 shadow-[0_14px_30px_-22px_rgba(34,31,26,0.55)] md:gap-10 md:p-10">
        <span className="relative h-[120px] w-[120px] flex-none overflow-hidden rounded-full border-4 border-secondary bg-muted">
          {avatar ? (
            <Image
              src={urlForImage(avatar).width(300).height(300).fit("crop").url()}
              alt={name}
              fill
              sizes="120px"
              className="object-cover"
            />
          ) : null}
        </span>

        <div className="flex min-w-0 flex-1 basis-[280px] flex-col gap-2.5">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-primary">Get to know</span>
          <h2 className="m-0 font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {name}
          </h2>
          <span className="text-sm text-muted-foreground">
            {[handle, role, area].filter(Boolean).join(" · ")}
          </span>
          {bio ? <p className="m-0 max-w-[36em] text-pretty text-base leading-relaxed text-muted-foreground">{bio}</p> : null}
        </div>

        <div className="flex flex-1 basis-[220px] flex-wrap gap-2.5 md:justify-end">
          {website ? (
            <PillButton href={website} variant="primary" size="sm" target="_blank" rel="noopener noreferrer">
              Visit website
            </PillButton>
          ) : null}
          {links.map((link) => (
            <PillButton key={link.href} href={link.href} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
              {link.label}
            </PillButton>
          ))}
        </div>
      </div>
    </section>
  );
}
