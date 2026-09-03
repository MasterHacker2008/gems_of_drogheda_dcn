import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GemIcon } from "@/components/ui/gem-icon";
import { PillButton } from "@/components/ui/pill-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { SiteSettings } from "@/lib/sanity/types";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 md:px-10">
        <Link href="#top" className="flex flex-none items-center gap-2.5 text-foreground">
          <GemIcon twoTone={{ top: "fill-primary", side: "fill-secondary" }} size={22} />
          <span className="whitespace-nowrap font-heading text-base font-bold tracking-tight">
            {settings.siteTitle}
          </span>
        </Link>

        <nav className="ml-2 hidden flex-wrap items-center gap-5 md:flex">
          {settings.primaryNav.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-semibold text-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <PillButton href={settings.joinCtaHref} variant="primary" size="sm" className="hidden md:inline-flex">
          {settings.joinCtaLabel}
        </PillButton>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[80%] max-w-sm flex-col gap-8 bg-background shadow-popover sm:max-w-sm">
            <SheetHeader className="text-left">
              <SheetClose asChild>
                <Link href="#top" className="flex items-center gap-2.5 text-foreground">
                  <GemIcon twoTone={{ top: "fill-primary", side: "fill-secondary" }} size={22} />
                  <SheetTitle className="font-heading text-base font-bold tracking-tight text-foreground">
                    {settings.siteTitle}
                  </SheetTitle>
                </Link>
              </SheetClose>
            </SheetHeader>

            <nav className="flex flex-col gap-1">
              {settings.primaryNav.map((item) => (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-2.5 font-heading text-base font-semibold text-foreground hover:bg-muted hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <SheetClose asChild>
              <PillButton href={settings.joinCtaHref} variant="primary" size="md" className="w-full justify-center">
                {settings.joinCtaLabel}
              </PillButton>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
