# Gems of Drogheda — brief for Claude Design

Everything needed to start a design session on the Gems of Drogheda pages:
project context, the existing design system to match, live references, real
content to design from, and the visual direction we've discussed but not
built yet. Point a fresh `/design` session at this doc first.

## 1. What this project is

**Drogheda City Now** is a community campaign site for Drogheda achieving
official city status. **Gems of Drogheda** is a full local-business
directory, blog, and events platform being built as its **own standalone
site**, separate from the campaign site. Full rationale and the build
checklist: project doc `gems-of-drogheda-site-split.md`.

**Objective, corrected**: the primary goal is **SEO visibility and
discoverability for the listed businesses** — not the Quest. The Quest
clue-hunt (teams solve a trail across ~15 participating businesses for
prizes) is a flagship feature living inside the site, not the reason the
site exists. This is a real correction to how this brief framed things
earlier — category and business pages carrying indexable, server-rendered
content are the backbone; the Quest/gem identity work is downstream of
that, not the starting point.

**Scope of the new site** — the full sitemap (directory, category and
business pages, Quest hub, non-Quest events, blog, join/pricing, about,
search, and a Phase 2 people directory) is confirmed in
`gems-of-drogheda-site-split.md`. Out of scope (stays on Drogheda City Now
only): city-status mission, funding-gap stats, membership, partner/volunteer
pages, general civic news. A quiet footer credit is the only connection back
to the parent site.

**Registration & gameplay**: **ActionBound** is the app used both for
registration and for the actual clue-solving during a Quest edition — the
site links out to it, it doesn't run the game or host a form. (An earlier
pass at this brief named Eventbrite for registration; confirm with the
client whether Eventbrite still sits ahead of ActionBound in the funnel, or
whether ActionBound covers registration too.) So the site's actual job for
the Quest is discovery, marketing, and information — featuring the
businesses, explaining how to play, and sending people out to ActionBound —
not hosting a form or any live gameplay/tracking itself. Anything
"gamified" on the site (the Gem Case, a shard puzzle, etc.) is an
illustration or a light marketing widget, never a live tracker of real
progress, since the site has no visibility into what's happening in the
app. The event page needs **two separate participant lists** — "Visit
in person" vs. "Solve online" — per the confirmed content model.

**Latest revision — the Quest is a once-off event, not a section.** Drop
the dedicated `/quest` hub and `/quest/past` archive entirely. The Quest
lives as a single entry at `/events/[quest-slug]`, using the same event
detail template every other event uses — with quest-specific modules
(ActionBound CTA, prize pool, the two participant lists, the illustrative
trail map, and a recap module once status = Past) layered on top of that
shared template rather than a bespoke page. This supersedes the earlier
"own top-level section, deliberately not under /events" framing.

## 2. Design system already locked in — match this pixel-perfectly

Codename **Market & Quest**. Do not reinvent these; extend them.

**Colour tokens** (light theme; dark theme is in the files below):

| Token | Hex | Role |
|---|---|---|
| Boyne Teal | `#1C8CA1` | Primary — nav, links, wayfinding, trust |
| Quest Gold | `#F2A429` | Event/CTA colour — register, quest actions |
| Gem Pink | `#E31C6D` | Status badge only ("Verified"/"Drogheda Gem") — never a background |
| Market Ivory | `#FFF9EE` | Page background |
| Surface | `#FFFFFF` | Card background |
| Coal Ink | `#221F1A` | Body text |
| Fog Sand | `#8C7F6C` | Secondary text |
| Border | `#EEE3CF` | Hairlines |

Colours were deliberately **brightened** from an earlier, muddier pass — if
anything drifts, brighter/more saturated is the correct direction, not
softer.

**Typography** — two sans-serifs, both warm, no serif anywhere:
- **Public Sans** — headings/display. Chosen specifically to read as
  *trustworthy and civic-grade* (it's the U.S. Web Design System's own
  typeface) rather than playful — we moved off Fredoka for exactly this
  reason, so don't reach for a rounded/bubbly display face again.
- **Figtree** — body/UI text.

**Radius / shadow / spacing** — full scale with exact values (`rounded-sm`
through `rounded-2xl`, `shadow-card` / `shadow-card-hover` / `shadow-cta`,
padding/gap rules per component) is documented in the README below — treat
it as the source of truth rather than eyeballing new values.

**Stack**: Tailwind CSS + shadcn/ui components, Sanity as the CMS backend,
Next.js frontend. Full architecture: project doc
`redesign-design-audit-and-sanity-architecture.md`.

## 3. Live references — open these first

| What | Link |
|---|---|
| Market & Quest — palette & type specimen | https://claude.ai/code/artifact/d4b94fc1-8f32-4694-87ed-004fd9a06d4a |
| Market & Quest — component reference (buttons, cards, badges, tabs, accordion, live) | https://claude.ai/code/artifact/94dd8b54-3dca-4e23-b73d-4813b1c098ef |
| Drogheda City Now — homepage canvas | https://claude.ai/code/artifact/88db7074-a167-4412-a83a-375dfb9421a2 |
| Featured Business — three layout directions (not yet picked) | https://claude.ai/code/artifact/851a576f-6906-477d-8328-c9a7021fed2c |
| Gems Launch Checklist — full build checklist, interactive | https://claude.ai/code/artifact/b10f568c-2652-44f7-89fc-4486eda31483 |

Code files (`tailwind.config.ts`, `globals.css`, `README.md`) are in
`Drogheda city now/design-system/` on your machine — hand these directly to
a coding session; a design session should treat the two artifacts above as
the visual source of truth.

## 4. Real content to design from — no placeholder copy needed

Quest facts (current round): **14 teams entered, 15 businesses on the
trail, €4,000 in prizes.**

Confirmed business data so far (use these verbatim rather than inventing
new ones — the remaining ~9 of the 15 properties still need photo/story/clue
briefs collected, per the checklist):

| Business | Category | Copy on file |
|---|---|---|
| Tuites Butchers | Butchers | "100% traceable Irish beef, pork & lamb. Home-cured bacon & ham. Three locations, generations in the trade." Verified May 2026. |
| The Coffee Box | Café | "Ariosa coffee, toasties & sweet treats. Three locations: George's Square, Newtown Blues, LIDL Donore." Founded 2018. |
| Escape Rooms Drogheda | Entertainment | "Real-life puzzle rooms + VR adventures. Team building, family fun, birthday parties." Verified Apr 2026. |
| Curtis & Dunne | Menswear | "Premium brands: Hugo Boss, Barbour, Ralph Lauren, Gant. Expert styling advice. 12 Dyer Street." |
| Tribe Restaurant | Restaurant (Duleek) | "Wood-fired sourdough pizza, fresh pasta, seasonal Irish produce. Family-owned since 2019." |
| Ariosa Coffee | Café | Listed as of 21 June 2026 — no further copy on file yet. |

No real photography exists for any of these yet — every mockup so far uses
a flat gradient placeholder in the card's photo slot. That's the one thing
still missing before pages can go to final polish.

## 5. New visual direction to design into — not yet built

This is the open creative territory for the Gems of Drogheda identity
specifically (distinct from, but consistent with, Market & Quest):

**Logo** — build around a faceted diamond/gem shape. Directions discussed:
- Gem silhouette doubling as the map pin used everywhere (nav, trail map,
  footer) — one shape, two jobs.
- A gem built from facet lines that read as **15 shards** of one whole —
  "collect them all" logic built into the mark itself.
- A hidden detail inside one facet (magnifying glass, keyhole, compass
  needle) — a quiet nod to "clue hunt" without a second icon.
- Negative-space monogram (a "G" implied between facet lines) — needs to
  work at favicon size and without colour.
- Avoid anything cartoonish (jewel + shine sticker) — geometric/faceted
  keeps it closer to trustworthy-civic than kids'-app, consistent with the
  Public Sans decision above.

**Vector system** — one facet-line vocabulary reused everywhere: the
verified/status mark, section dividers, bullets, a faint faceted background
texture on the trail map/hero (sparingly — the one place a repeating
pattern is earned here). Each of the 15 Gem profiles gets its own small
unique emblem from the same system, tinted per category, so the set reads
like matched trading cards.

**Animation** — a few well-chosen moments, not motion everywhere. Note: none
of these track real state (the app does that) — they're all illustration
or marketing polish:
- Soft diagonal "catches the light" shine sweep on hover (cards, primary
  CTA) — one element at a time.
- The **Gem Case** (a passport/inventory of 15 slots) shown as a static or
  gently-animated illustration explaining the concept — e.g. slots
  animating in on scroll for visual appeal — not a live per-team tracker.
- Trail map's dashed path draws itself on scroll/load, connecting the 15
  pins in sequence (reuses the dashed-trail motif already in the DCN hero).
- Faceted-gem loading spinner instead of a generic one.

**Game / interactive ideas** — pre-event engagement and marketing only,
since actual clue-hunting happens in the companion app during the event:
- Clickable trail map — tapping a pin reveals a teaser riddle (not the
  answer), useful even for visitors not yet playing.
- Shard-assembly puzzle on the homepage — a gem image split into facets a
  visitor drags into place, echoing "solve the trail" in miniature.
- "Reveal a mystery gem" randomizer — spotlights one of the 15 businesses,
  works outside the live event window too.

Dropped from the original brainstorm: an animated leaderboard and a live
Gem Case tracker — both assumed the site had visibility into real game
state, which it doesn't. A leaderboard is only worth building if the app or
Eventbrite exposes standings data somewhere embeddable; otherwise the
Prizes page stays informational (what's up for grabs, no live standings).

## 6. What to actually build, in order

Reprioritized against the final structure brief — the SEO-backbone pages
come first, the Quest/gem identity work is concentrated in step 4:

1. **Business profile (`/gems/[slug]`)** — highest leverage: the SEO
   backbone, reused for every listing (~15 now, more as the directory
   grows). Builds directly on the Featured Business layout directions
   already drafted (section 3 above) — pick a direction and this becomes
   its full-page expansion.
2. **Directory + category landing (`/gems`, `/gems/[category]`)** — grid,
   filters, and the category intro-copy pattern; proves the card system at
   real scale rather than a hand-picked set of four.
3. **Homepage** — now buildable from real pieces (dual hero, Quest strip,
   featured grid, blog preview) instead of mocked in isolation. The
   existing homepage canvas (link above) is a first pass worth revisiting
   once 1–2 exist, not a final.
4. **Event / Quest template (`/events/[slug]`)** — one shared event detail
   template, with quest-specific modules toggled on for the Quest event
   itself: ActionBound CTA, prize pool, the two-list (in-person/online)
   pattern, the illustrative trail map, and a recap module for once it's
   Past. This is where the gem/diamond logo, vector system, and trail map
   (section 5) actually earn their keep — build the identity work here, not
   earlier, and not as a bespoke page (there's no separate Quest hub).
5. **Join (`/join`)** — pricing tiers table + signup form. A new page type;
   nothing to reuse from DCN's campaign pages, which never carried pricing.
