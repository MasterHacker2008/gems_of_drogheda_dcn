"use client";

import { useState } from "react";

import { PillButton } from "@/components/ui/pill-button";
import type { Event } from "@/lib/sanity/types";

type EventRegistrationProps = {
  event: Event;
};

export function EventRegistration({ event }: EventRegistrationProps) {
  const min = event.minTeamSize ?? 3;
  const max = event.maxTeamSize ?? 6;
  const price = event.pricePerTeam ?? 0;
  const categories = event.registrationCategories ?? [];

  const [size, setSize] = useState(min);
  const [category, setCategory] = useState(0);

  if (!event.registrationEnabled) return null;

  const perPlayer = size > 0 ? (price / size).toFixed(2) : "0.00";
  const seats = Array.from({ length: max }, (_, i) => i < size);

  return (
    <section id="register" className="mx-auto w-full max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 overflow-hidden rounded-[2rem] bg-foreground p-7 text-background md:gap-14 md:p-14">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground">
            Register your team
          </span>
          <h2 className="m-0 max-w-[13em] text-balance font-heading text-[clamp(1.875rem,3.8vw,3.125rem)] font-semibold leading-[1.06] tracking-tight">
            One ticket. One team.{" "}
            <span className="text-secondary">One weekend of Drogheda.</span>
          </h2>
          <p className="max-w-[30em] text-pretty text-lg leading-[1.78] text-background/80">
            A single captain registers the whole group.
          </p>
          {event.registerUrl && event.registerCtaLabel ? (
            <PillButton href={event.registerUrl} variant="gold" size="lg" className="w-fit">
              {event.registerCtaLabel}
            </PillButton>
          ) : null}
        </div>

        <div className="relative flex flex-col gap-5 rounded-[1.625rem] border border-secondary/40 bg-background/[.06] p-7">
          {categories.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Category</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCategory(i)}
                    className={`inline-flex items-center whitespace-nowrap rounded-full border-[1.5px] px-4 py-2.5 font-heading text-[13px] font-bold transition-colors duration-150 ${
                      i === category
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-background/30 bg-transparent text-background hover:border-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">Team size</span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setSize((s) => Math.max(min, s - 1))}
                aria-label="Decrease team size"
                className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-background/30 text-xl leading-none text-background hover:border-secondary hover:bg-secondary/[.12] hover:text-secondary"
              >
                −
              </button>
              <span className="min-w-[1.4em] text-center font-heading text-[2.875rem] font-semibold tracking-tight tabular-nums text-secondary">
                {size}
              </span>
              <button
                type="button"
                onClick={() => setSize((s) => Math.min(max, s + 1))}
                aria-label="Increase team size"
                className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-background/30 text-xl leading-none text-background hover:border-secondary hover:bg-secondary/[.12] hover:text-secondary"
              >
                +
              </button>
              <span className="text-[15px] text-background/62">
                players ({min}–{max})
              </span>
            </div>
          </div>

          <div className="flex gap-1.5">
            {seats.map((filled, i) => (
              <div key={i} className={`h-2.5 flex-1 rounded-full transition-colors duration-200 ${filled ? "bg-secondary" : "bg-background/18"}`} />
            ))}
          </div>

          <div className="h-px bg-background/16" />

          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="text-base text-background/74">€{perPlayer} each</span>
            <span className="font-heading text-3xl font-semibold tracking-tight text-secondary">€{price} total</span>
          </div>
        </div>
      </div>
    </section>
  );
}
