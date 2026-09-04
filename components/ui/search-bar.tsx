"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
};

export function SearchBar({ value, onChange, placeholder, ariaLabel, className }: SearchBarProps) {
  return (
    <div
      className={`flex min-w-[260px] flex-1 items-center gap-3 whitespace-nowrap rounded-full border border-background/20 bg-background/[.08] px-5 py-3.5 ${className ?? ""}`}
    >
      <svg
        width={17}
        height={17}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F5BC60"
        strokeWidth={2.75}
        strokeLinecap="round"
        aria-hidden
        className="flex-none"
      >
        <circle cx={11} cy={11} r={7} />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="flex-1 border-0 bg-transparent text-[15px] text-background placeholder:text-background/45 focus:outline-none"
      />
    </div>
  );
}
