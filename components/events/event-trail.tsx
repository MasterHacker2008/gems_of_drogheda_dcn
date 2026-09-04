"use client";

import { useEffect, useRef, useState } from "react";

import type { EventCheckpoint } from "@/lib/sanity/types";

type EventTrailProps = {
  checkpoints?: EventCheckpoint[];
};

const TRAIL_PATH = "M40 240 C 120 120, 180 250, 250 150 S 400 60, 480 120";

export function EventTrail({ checkpoints }: EventTrailProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [active, setActive] = useState(0);

  const count = checkpoints?.length ?? 0;

  useEffect(() => {
    const path = pathRef.current;
    if (!path || count === 0) return;
    const total = path.getTotalLength();
    const next = Array.from({ length: count }, (_, i) => {
      // Spread evenly, inset from the very ends so pins don't sit on the path's tips.
      const t = count === 1 ? 0.5 : 0.08 + (0.84 * i) / (count - 1);
      const point = path.getPointAtLength(total * t);
      return { x: point.x, y: point.y };
    });
    setPoints(next);
  }, [count]);

  if (!checkpoints || checkpoints.length === 0) return null;

  const activeCheckpoint = checkpoints[active];

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
      <div className="flex flex-col gap-7 rounded-[2rem] border-2 border-border bg-background p-7 md:p-12">
        <div className="flex flex-wrap items-baseline gap-4">
          <h2 className="m-0 font-heading text-[clamp(1.625rem,3vw,2.5rem)] font-semibold tracking-tight text-foreground">
            The trail
          </h2>
          <span className="text-base text-muted-foreground">Select a checkpoint to see where the clue lands.</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-9">
          <div className="rounded-3xl bg-[#E8F1F0] p-3.5">
            <svg viewBox="0 0 520 300" className="block h-auto w-full" role="img" aria-label="Illustrative quest trail across the town">
              <path ref={pathRef} d={TRAIL_PATH} fill="none" stroke="#1C8CA1" strokeWidth={3} strokeDasharray="10 10" />
              {points.map((point, i) => (
                <g key={i} onClick={() => setActive(i)} className="cursor-pointer">
                  <circle cx={point.x} cy={point.y} r={26} fill={i === active ? "rgba(242,164,41,.24)" : "rgba(28,140,161,.12)"} />
                  <circle cx={point.x} cy={point.y} r={20} fill={i === active ? "#F2A429" : "#1C8CA1"} />
                  <text
                    x={point.x}
                    y={point.y + 5}
                    textAnchor="middle"
                    fontFamily="Figtree"
                    fontSize={12}
                    fontWeight={700}
                    fill={i === active ? "#3D2606" : "#FFF9EE"}
                  >
                    {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
              Checkpoint {active + 1}
            </span>
            <span className="font-heading text-[clamp(1.5rem,2.8vw,2.125rem)] font-semibold tracking-tight text-foreground">
              {activeCheckpoint.title}
            </span>
            <span className="text-lg leading-relaxed text-muted-foreground">{activeCheckpoint.body}</span>
            <div className="flex flex-wrap gap-2 pt-1.5">
              {checkpoints.map((checkpoint, i) => (
                <button
                  key={checkpoint._key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center whitespace-nowrap rounded-full border-[1.5px] px-4 py-2.5 font-heading text-[13px] font-bold transition-colors duration-150 ${
                    i === active
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-[#C9B994] bg-background text-primary hover:border-secondary"
                  }`}
                >
                  {i + 1} · {checkpoint.title}
                </button>
              ))}
            </div>
            <span className="pt-1.5 text-sm text-muted-foreground">
              Illustrative — the real route is in your clue pack on the day.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
