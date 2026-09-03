import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-primary-foreground shadow-cta hover:bg-[#15707F]",
  dark: "bg-foreground text-background hover:bg-[#3A342C]",
  gold: "bg-secondary text-secondary-foreground hover:bg-[#F5BC60]",
  outline:
    "border border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background",
  "outline-on-dark":
    "border border-background/30 text-background bg-transparent hover:bg-background/10",
  "outline-on-gold":
    "border border-secondary-foreground/40 text-secondary-foreground bg-transparent hover:bg-secondary-foreground/10",
} as const;

const SIZE_CLASSES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-[15px]",
  lg: "px-7 py-4 text-base",
} as const;

export type PillButtonVariant = keyof typeof VARIANT_CLASSES;
export type PillButtonSize = keyof typeof SIZE_CLASSES;

type PillButtonProps = {
  href: string;
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function PillButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-bold transition-[transform,background-color,color] duration-150 ease-out hover:-translate-y-0.5",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
