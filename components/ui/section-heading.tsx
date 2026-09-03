import Link from "next/link";
import type { ReactNode } from "react";

import type { Link as LinkType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  link?: LinkType;
  align?: "baseline" | "end";
  size?: "sm" | "lg";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  link,
  align = "baseline",
  size = "lg",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4",
        align === "baseline" ? "items-baseline" : "items-end justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-2.5">
        {eyebrow ? (
          <span className="text-xs font-bold uppercase tracking-[0.11em] text-primary">{eyebrow}</span>
        ) : null}
        <h2 className={size === "lg" ? "text-h1 font-heading" : "text-h2 font-heading"}>{title}</h2>
      </div>
      {children}
      {link ? (
        <Link href={link.href} className="text-sm font-semibold text-foreground hover:text-primary">
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}
