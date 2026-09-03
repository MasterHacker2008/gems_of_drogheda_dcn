import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import type { EventItem, HomePage } from "@/lib/sanity/types";

type EventsListProps = {
  homePage: HomePage;
  events: EventItem[];
};

function formatDayMonth(iso: string) {
  const date = new Date(iso);
  return {
    day: date.toLocaleDateString("en-IE", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IE", { month: "short" }),
  };
}

export function EventsList({ homePage, events }: EventsListProps) {
  if (events.length === 0) return null;

  return (
    <section id="events" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-12 md:px-10">
      <SectionHeading title={homePage.eventsHeading ?? "What's on"} link={homePage.eventsLink} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {events.map((event) => {
          const { day, month } = formatDayMonth(event.date);
          return (
            <Link
              key={event._id}
              href={`/events/${event.slug}`}
              className="flex items-start gap-4 rounded-[1.375rem] border border-[#EEE3CF] bg-background p-5 text-foreground transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 hover:border-primary"
            >
              <div className="flex w-14 flex-none flex-col items-center gap-0.5 rounded-2xl bg-[#E8F1F0] py-2.5">
                <span className="font-heading text-xl font-bold leading-none text-primary tabular-nums">{day}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary">{month}</span>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-heading text-lg font-semibold leading-tight tracking-tight">
                  {event.title}
                </span>
                {event.detail ? (
                  <span className="text-sm leading-relaxed text-muted-foreground">{event.detail}</span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
