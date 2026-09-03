import { cn } from "@/lib/utils";

type GemIconProps = {
  className?: string;
  /** Single-fill variant (bullets, chip markers). Tailwind color class, e.g. "text-primary". */
  fillClassName?: string;
  /** Two-tone variant (logo mark) — top-left facet / top-right facet classes. */
  twoTone?: { top: string; side: string };
  size?: number;
};

/** The faceted-diamond brand mark used throughout the site as a bullet, logo, and decorative motif. */
export function GemIcon({ className, fillClassName = "text-foreground", twoTone, size = 16 }: GemIconProps) {
  const height = Math.round(size * (30 / 26));

  if (twoTone) {
    return (
      <svg
        width={size}
        height={height}
        viewBox="0 0 26 30"
        aria-hidden="true"
        className={cn("flex-none", className)}
      >
        <path d="M13 1.6 L24 12 L13 28.4 L2 12 Z" className={twoTone.top} />
        <path d="M13 1.6 L24 12 L13 12 Z" className={twoTone.side} />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 26 30"
      aria-hidden="true"
      className={cn("flex-none", fillClassName, className)}
    >
      <path d="M13 1.6 L24 12 L13 28.4 L2 12 Z" fill="currentColor" />
    </svg>
  );
}
