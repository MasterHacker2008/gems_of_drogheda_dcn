# Market & Quest — design system for Drogheda City Now

Tailwind + shadcn/ui implementation of the palette and type system agreed on
in the "Market & Quest" artifact. Two files carry the whole system —
`tailwind.config.ts` and `globals.css` — everything below is how to use them.

## Setup

1. `npx shadcn@latest init` (choose CSS variables: yes, base colour: neutral —
   we override every value below anyway).
2. Replace the generated `tailwind.config.ts` and `app/globals.css` with the
   two files alongside this README.
3. `npm i tailwindcss-animate` (the config's `plugins` array depends on it).
4. Load the two typefaces as CSS variables so `font-heading` / `font-body`
   resolve — with `next/font`:

   ```ts
   import { Fredoka, Figtree } from "next/font/google";

   const fredoka = Fredoka({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-fredoka" });
   const figtree = Figtree({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-figtree" });

   // on <html className={`${fredoka.variable} ${figtree.variable}`}>
   ```
5. Every `npx shadcn add <component>` from here on inherits the palette
   automatically — the generated component code reads `bg-primary`,
   `text-muted-foreground`, `rounded-lg`, etc., which now resolve to Market &
   Quest values instead of shadcn's defaults. You should not need to hand-edit
   colour classes inside generated components — only the variant additions
   noted below.

## Spacing — padding, margin, gap

One scale, used the same way everywhere, so nothing on the site is "close
enough":

| Context | Value | Tailwind |
|---|---|---|
| Card padding (directory / event / blog) | 20px mobile → 24px md+ | `p-5 md:p-6` |
| Button padding, default | 10px / 20px | `px-5 py-2.5` |
| Button padding, large / CTA (Register) | 12px / 24px | `px-6 py-3` |
| Badge / stamp padding | 4px / 10px | `px-2.5 py-1` |
| Icon + label cluster gap | 8–10px | `gap-2` / `gap-2.5` |
| Form field gap | 16px | `gap-4` |
| Card grid gap | 20–24px | `gap-5 md:gap-6` |
| Section internal stack | 40–48px | `gap-10 md:gap-12` |
| Section vertical padding | 64px mobile → 96px lg+ | `py-16 lg:py-24` |
| Page/container side padding | 20px → 40px | handled by the `container` config (`padding: 1.25rem` → `2.5rem` at `lg`) |

Rule of thumb: **4/8px steps inside a component, 16px steps between
components, 32–48px steps between sections.** Don't introduce one-off values
outside `tailwind.config.ts`'s `spacing` extension.

## Radius scale

`--radius` is set once (`0.875rem` / 14px) in `globals.css`; every other
step is calculated from it in `tailwind.config.ts`, shadcn-style, so a single
edit re-tunes the whole UI:

| Token | Resolves to | Use on |
|---|---|---|
| `rounded-sm` | 8px | inputs, small chips |
| `rounded-md` | 12px | buttons, small cards |
| `rounded-lg` | **14px (base)** | directory/event/blog cards, dialogs |
| `rounded-xl` | 22px | hero panels, the Gems of Drogheda banner |
| `rounded-2xl` | 28px | large marketing/feature blocks |
| `rounded-stamp` | 6px fixed | the rotated "Member/New" badge — deliberately *not* on the scaling scale, so it always reads as a stamped corner, not a soft chip |
| `rounded-full` | pill | tag/category chips, avatar, the pulse-gold register button on mobile |

## Shadow / elevation scale

| Token | Use |
|---|---|
| `shadow-xs` | inputs, hairline card edges |
| `shadow-card` | resting state for every card |
| `shadow-card-hover` | hover/focus state — paired with `hover:-translate-y-1` |
| `shadow-cta` | gold Register button only — a warm glow, not a grey drop shadow |
| `shadow-popover` | Dialog, Sheet, DropdownMenu, Popover |

Never stack `shadow-card` and a border of equal weight on the same element —
pick one to say "this is a separate surface."

## Typography — named text styles

Defined as utility classes in `globals.css` `@layer utilities`, so a screen
reaches for `text-h2` the same way it reaches for `flex` — no re-deriving
size/weight/tracking per instance.

| Class | Face | Role |
|---|---|---|
| `.text-display` | Fredoka 600 | Hero headline only |
| `.text-h1` | Fredoka 600 | Page / major section title |
| `.text-h2` | Fredoka 500 | Subsection title |
| `.text-h3` | Fredoka 500 | Card title (business name, post title) |
| `.text-lead` | Figtree 400 | Intro paragraph under a heading |
| `.text-body` | Figtree 400 | Default running text |
| `.text-small` | Figtree 400 | Metadata — dates, byline, counts |
| `.text-caption` | Figtree 400 | Fine print, form hints |
| `.text-overline` | Figtree 700 | Uppercase eyebrow label above a heading |
| `.text-stat` | Fredoka 600 | Big numbers (team count, prize pot) — always `tabular-nums` |
| `.text-button` | Fredoka 600 | Button/CTA label text |

## shadcn component recipes

- **Button** (`components/ui/button.tsx`) — add two variants to the existing
  `cva` config:
  - `secondary` (already shadcn-default, just re-themed) → the **only**
    variant styled `bg-secondary text-secondary-foreground shadow-cta
    hover:shadow-cta hover:brightness-105`, reserved for Register / RSVP /
    "Join the quest" actions. Add `animate-pulse-gold` to the *first* CTA
    above the fold only — never more than one pulsing element on screen.
  - `default` (primary) stays `bg-primary text-primary-foreground` — every
    other action: "View listing", "Read more", "Partner with us".
  - `outline` / `ghost` unchanged from shadcn, they already inherit
    `border-border` / `text-foreground` correctly.

- **Badge** (`components/ui/badge.tsx`) — add a `stamp` variant: `bg-accent
  text-accent-foreground rounded-stamp px-2.5 py-1 rotate-6
  animate-stamp-pop shadow-xs`. Use only for "Member", "New", "Featured" —
  one per card, top-right corner, never as a section background.

- **Card** — `rounded-lg border border-border bg-card shadow-card
  transition-[transform,box-shadow] duration-200 hover:shadow-card-hover
  hover:-translate-y-1`. Directory, event and blog cards all share this
  exact recipe so the grid reads as one system.

- **Tabs** — category filter on `/business-directory` (Food & Drink,
  Retail, Entertainment…). Style the active trigger with `text-primary
  border-b-2 border-primary`, inactive with `text-muted-foreground`; the
  underline transitions with `transition-colors duration-150`.

- **Accordion** — FAQ, quest rules, "Why city status matters" detail
  sections. Ships with `animate-accordion-down` / `-up` already wired in the
  config — no extra work needed beyond `npx shadcn add accordion`.

- **Dialog / Sheet** — Sheet for the mobile nav (slides from the right,
  `shadow-popover`); Dialog for the Gems of Drogheda team-registration form
  and any "quick view" business card expansion. Header inside uses
  `.text-h2`, body copy `.text-body`.

- **Avatar** — post authors (e.g. "Anthony Murphy") and campaign partner
  logos — `rounded-full border border-border`.

- **Skeleton** — directory/blog loading states, sized to the exact card
  dimensions (`h-[132px] rounded-t-lg` for the photo block, three lines at
  decreasing width beneath) so layout doesn't jump on load.

- **Sonner (toast)** — registration confirmation: `"You're in — see you on
  the trail."` Style the success toast border-left with `border-l-4
  border-secondary`, icon in `text-secondary`.

## Animation catalogue

Every animation is registered in `tailwind.config.ts`'s `keyframes` /
`animation`, respects `prefers-reduced-motion` globally (see the media query
at the bottom of `globals.css`), and exists for a specific reason — none are
decorative-only:

| Name | Class | Duration | Trigger | Why |
|---|---|---|---|---|
| Stamp pop | `animate-stamp-pop` | 0.45s spring | badge mount | "Member"/"New" badges land with a stamped-down feel, not a fade |
| Card lift | `hover:-translate-y-1 hover:shadow-card-hover` | 0.2s ease-out | hover/focus | every card in the directory/blog grid, signals "clickable" without a border colour change |
| Gold pulse | `animate-pulse-gold` | 2.4s loop | first-viewport Register CTA only | draws the eye to the one action that matters most (event sign-up) without being applied everywhere |
| Fade up | `animate-fade-up` | 0.5s ease-out | scroll-into-view (IntersectionObserver), staggered ~60ms per sibling | directory grids and stat rows arrive as a set, not a jump-cut |
| Accordion expand | `animate-accordion-down/up` | 0.2s ease-out | shadcn default, height-driven | quest rules, FAQ |

## Responsive rules

Tailwind's default breakpoints (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280),
mobile-first throughout:

- **Nav**: inline links `md:flex`, collapses into the shadcn `Sheet` drawer
  below `md`.
- **Hero**: centered, stacked text under `md`; two-column asymmetric
  (copy + stat panel) from `lg`. Use `clamp()`-driven `text-display` sizing
  (already `text-5xl md:text-6xl`) rather than a fixed px hero size.
- **Business directory grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  xl:grid-cols-4`, `gap-5 md:gap-6`.
- **Gems of Drogheda banner**: stats (`teams / businesses / prize pot`) wrap
  onto two lines below `sm`, sit in one row from `md`; Register button goes
  full-width below `sm`, auto width above.
- **Tables/wide content** (e.g. a future leaderboard): wrap in
  `overflow-x-auto` on its own container — the page body itself never
  scrolls horizontally.

## Files in this folder

- `tailwind.config.ts` — theme extension (colours, radius, shadow, keyframes)
- `globals.css` — shadcn CSS variables (light + dark) and the named text
  style utilities
- `README.md` — this file
