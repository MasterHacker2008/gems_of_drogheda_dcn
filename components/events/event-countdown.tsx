"use client";

import { useEffect, useState } from "react";

type EventCountdownProps = {
  targetIso: string;
};

function computeParts(targetIso: string) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const days = Math.floor(diff / 864e5);
  const hours = Math.floor(diff / 36e5) % 24;
  const minutes = Math.floor(diff / 6e4) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  return [
    { value: String(days), label: "days" },
    { value: String(hours).padStart(2, "0"), label: "hrs" },
    { value: String(minutes).padStart(2, "0"), label: "min" },
    { value: String(seconds).padStart(2, "0"), label: "sec" },
  ];
}

export function EventCountdown({ targetIso }: EventCountdownProps) {
  // Starts null so the server-rendered markup has no time-dependent text —
  // avoids a hydration mismatch, since the real value is only ever computed client-side.
  const [parts, setParts] = useState<ReturnType<typeof computeParts> | null>(null);

  useEffect(() => {
    // Genuinely client-only, clock-driven state (Date.now()) — the initial call here
    // (not just the interval callback) is what keeps SSR/hydration markup in sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParts(computeParts(targetIso));
    const id = setInterval(() => setParts(computeParts(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!parts) return null;

  return (
    <div className="flex flex-wrap gap-2.5 pt-2">
      {parts.map((part) => (
        <div
          key={part.label}
          className="flex min-w-[74px] flex-col items-center gap-0.5 rounded-2xl border border-border bg-muted px-4 py-3"
        >
          <span className="font-heading text-[1.75rem] font-semibold tracking-tight tabular-nums text-primary">
            {part.value}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  );
}
