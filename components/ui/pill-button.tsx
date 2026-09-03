import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

export type PillButtonVariant = NonNullable<ButtonProps["variant"]>;
export type PillButtonSize = Exclude<NonNullable<ButtonProps["size"]>, "icon">;

type PillButtonProps = {
  href: string;
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

/** The repeated pill CTA (hero, quest band, join band, header, footer) — a shadcn Button rendered as a Link via `asChild`. */
export function PillButton({ href, variant = "primary", size = "md", children, className, ...props }: PillButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}
