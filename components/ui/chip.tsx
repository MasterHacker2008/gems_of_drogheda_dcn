import Link from "next/link";

import { GemIcon } from "@/components/ui/gem-icon";

type ChipProps = {
  href: string;
  label: string;
  count?: number;
};

export function Chip({ href, label, count }: ChipProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-muted px-4 py-2.5 font-heading text-sm font-semibold text-foreground transition-[background-color,border-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-primary hover:bg-[#E8F1F0] hover:text-primary"
    >
      <GemIcon size={11} fillClassName="text-primary" />
      {label}
      {typeof count === "number" ? (
        <span className="text-xs font-bold text-muted-foreground tabular-nums">{count}</span>
      ) : null}
    </Link>
  );
}
