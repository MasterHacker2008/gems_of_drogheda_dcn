"use client";

import { useState } from "react";

import type { EventClue } from "@/lib/sanity/types";

type EventPracticeCluesProps = {
  clues?: EventClue[];
};

export function EventPracticeClues({ clues }: EventPracticeCluesProps) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  if (!clues || clues.length === 0) return null;

  function toggle(key: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <div className="flex flex-col gap-7 rounded-[2rem] border-2 border-primary bg-[#E8F1F0] p-7 md:p-12">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground">
            Warm-up
          </span>
          <h2 className="m-0 font-heading text-[clamp(1.625rem,3vw,2.5rem)] font-semibold tracking-tight text-primary">
            Crack a practice clue
          </h2>
          <span className="text-base text-muted-foreground">Tap a card to turn it over — the real ones are harder.</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {clues.map((clue) => {
            const open = flipped.has(clue._key);
            return (
              <button
                key={clue._key}
                type="button"
                onClick={() => toggle(clue._key)}
                className={`flex min-h-[200px] flex-col gap-3.5 rounded-[1.375rem] border-2 p-6 text-left transition-colors duration-200 ${
                  open
                    ? "border-[#DE9019] bg-[#F5BC60] text-[#3D2606]"
                    : "border-foreground bg-foreground text-background"
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    open ? "bg-secondary text-secondary-foreground" : "bg-primary text-background"
                  }`}
                >
                  {open ? "Solved" : clue.tag}
                </span>
                <span className="font-heading text-lg font-medium leading-snug tracking-tight text-pretty">
                  {open ? clue.answer : clue.text}
                </span>
                <span className="mt-auto text-sm font-bold opacity-70">
                  {open ? "Tap to see the clue again" : "Tap to reveal"}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-[15px] font-semibold text-primary">
          Solved {flipped.size} of {clues.length}. On quest day each gem gives you a stamp or a code — collect the lot and you finish.
        </span>
      </div>
    </section>
  );
}
