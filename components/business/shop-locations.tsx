"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BusinessLocation } from "@/lib/sanity/types";

type ShopLocationsProps = {
  locations: BusinessLocation[];
};

export function ShopLocations({ locations }: ShopLocationsProps) {
  if (locations.length === 0) return null;

  return (
    <Tabs defaultValue={locations[0]._key} className="flex flex-col gap-4">
      <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
        {locations.map((location) => (
          <TabsTrigger
            key={location._key}
            value={location._key}
            className="rounded-full border border-background/26 bg-transparent px-4 py-2.5 font-heading text-[13px] font-bold tracking-[0.02em] text-background shadow-none transition-colors data-[state=active]:border-transparent data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] data-[state=active]:shadow-none"
          >
            {location.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {locations.map((location) => (
        <TabsContent key={location._key} value={location._key} className="mt-0">
          <Card className="gap-3 rounded-[1.375rem] border-background/16 bg-background/[.04] py-7">
            <CardContent className="flex flex-col gap-3 px-6">
              <span className="font-heading text-[22px] font-semibold tracking-tight text-background">
                {location.name}
              </span>
              <span className="text-[15px] leading-relaxed text-background/70">{location.address}</span>
              <a
                href={location.tel}
                className="font-heading text-xl font-bold tabular-nums text-[var(--accent)] hover:opacity-80"
              >
                {location.phone}
              </a>
              {location.openingHours && location.openingHours.length > 0 ? (
                <>
                  <Separator className="my-1 bg-background/14" />
                  <div className="flex flex-col gap-1">
                    {location.openingHours.map((line) => (
                      <span key={line} className="text-sm tabular-nums text-background/70">
                        {line}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
