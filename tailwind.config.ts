import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Drogheda City Now — "Market & Quest" design system
 * Tailwind theme extension, built to sit under shadcn/ui.
 * Pair with globals.css (CSS variables) and README.md (component recipes).
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        // Heading: Public Sans (trustworthy, civic-grade — USWDS's own typeface — distinct at 700/800)
        heading: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Body/UI: Figtree (warm humanist sans)
        body: ["var(--font-figtree)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          // Boyne Teal — nav, links, wayfinding, directory accents
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          // Quest Gold — reserved for Gems of Drogheda / event CTAs
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          // Stamp Pink — badges only (Member / New / Featured)
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        // shadcn's calc-from-base pattern — change --radius once, everything follows
        sm: "calc(var(--radius) - 6px)",   // chips, inputs
        md: "calc(var(--radius) - 2px)",   // buttons, small cards
        lg: "var(--radius)",               // default cards, dialogs  (14px)
        xl: "calc(var(--radius) + 8px)",   // hero panels, quest banner
        "2xl": "calc(var(--radius) + 14px)", // feature/marketing blocks
        stamp: "0.375rem",                 // fixed — badge corner, not scaled
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px hsl(var(--foreground) / 0.06)",                                              // inputs, hairline separators
        card: "0 1px 2px hsl(var(--foreground) / 0.05), 0 8px 20px -12px hsl(var(--foreground) / 0.18)",       // resting card
        "card-hover": "0 4px 10px -2px hsl(var(--foreground) / 0.12), 0 16px 32px -16px hsl(var(--foreground) / 0.28)", // hovered/lifted card
        cta: "0 6px 16px -6px hsl(var(--secondary) / 0.55)",                                         // gold register button
        popover: "0 12px 32px -8px hsl(var(--foreground) / 0.35)",                                   // dialog / sheet / dropdown
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "stamp-pop": {
          "0%": { opacity: "0", transform: "scale(.5) rotate(-14deg)" },
          "70%": { opacity: "1", transform: "scale(1.08) rotate(7deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(6deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--secondary) / 0.45)" },
          "50%": { boxShadow: "0 0 0 10px hsl(var(--secondary) / 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-tick": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gem-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(6px,-16px,0) rotate(5deg)" },
          "66%": { transform: "translate3d(-7px,-8px,0) rotate(-4deg)" },
        },
        "gem-turn": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.04)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "halo-breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: ".5" },
          "50%": { transform: "scale(1.12)", opacity: ".85" },
        },
        sheen: {
          "0%": { transform: "translateX(-140%) skewX(-16deg)" },
          "100%": { transform: "translateX(280%) skewX(-16deg)" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "stamp-pop": "stamp-pop .45s cubic-bezier(.34,1.56,.64,1) both",
        "pulse-gold": "pulse-gold 2.4s cubic-bezier(.4,0,.6,1) infinite",
        "fade-up": "fade-up .5s ease-out both",
        "gem-drift": "gem-drift 11s ease-in-out infinite",
        "gem-turn": "gem-turn 60s linear infinite",
        "halo-breathe": "halo-breathe 12s ease-in-out infinite",
        sheen: "sheen 11s ease-in-out 1s infinite",
        ticker: "ticker 42s linear infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
