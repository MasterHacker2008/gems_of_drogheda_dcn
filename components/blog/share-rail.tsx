"use client";

import { useState } from "react";

type ShareRailProps = {
  title: string;
};

export function ShareRail({ title }: ShareRailProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access denied — nothing to fall back to safely, just no-op.
    }
  }

  const mailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : "",
  )}`;

  return (
    <div className="sticky top-[104px] hidden w-[68px] flex-none flex-col items-center gap-2.5 md:flex">
      <span className="pb-1 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground" style={{ writingMode: "vertical-rl" }}>
        Share
      </span>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        title={copied ? "Copied!" : "Copy link"}
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:border-[#C9B994] hover:text-foreground"
      >
        {copied ? (
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.75} strokeLinecap="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <path d="M12 16V4" />
            <path d="m8 8 4-4 4 4" />
          </svg>
        )}
      </button>
      <a
        href={mailHref}
        aria-label="Share by email"
        title="Share by email"
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:border-[#C9B994] hover:text-foreground"
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h16v13H8l-4 4Z" />
        </svg>
      </a>
    </div>
  );
}
