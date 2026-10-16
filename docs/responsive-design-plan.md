# Responsive design plan

Status: in progress, 2026-10-15

## Goal

Ship the chosen redesign on both screen shapes from one set of page content:

- **Desktop:** "Route Map" travel notebook. Two-page spread, page flip, leather cover, flat cream dot-grid paper, dashed route between map pins.
- **Mobile and portrait tablets:** "Scroll the route". The pages are laid end to end as one scrolling sheet, and the route draws itself as you scroll.

Mockups: [all directions](https://claude.ai/artifact/RvJntYu2u1jBzT87BAek9e) (desktop is "4A Route Map, bujo paper"), [mobile](https://claude.ai/artifact/GLV8TXDzApTiZa3HKfocSu) (option B).

## Principle

Each page's content is written once, and two shells present it:

- `Book`, the existing page-flip spread, on wide landscape screens
- `ScrollSheet`, a new single scrolling sheet, everywhere else

Faces never ask what device they are on. They only ask:

1. **Am I visible?** A shared visibility context that each shell implements in its own way.
2. **What shape is my page?** CSS container queries on the face's own box.

## Changes

### 1. Shell controls live in the shells

`FlipPageButton` currently renders inside `AboutMePage` and `UnderConstructionPage`, and `EmptyPage` exists only so the book's pages pair up. Move the flip arrows into `Book`'s `Page` as siblings of the face content. Rendering them as siblings, never as a wrapper, keeps rough-notation positioning intact. Mark filler faces so `ScrollSheet` can skip them.

### 2. Page visibility is an interface

`BookStateContext` mixes book mechanics (`currentPage`, `animationLock`) with the one thing faces need, `isFaceVisible(faceKey)`. Split out a `FaceVisibilityContext`:

- `Book` implements it with today's logic, which depends on `currentPage` and the flip lock.
- `ScrollSheet` implements it with one `IntersectionObserver` per face.

Faces use only `useFaceVisibility()`. Highlights and route drawing then fire correctly in either shell.

### 3. Size relative to the page, not the viewport

`html { font-size: 1.125vmin }` and percentage-positioned cards tie layout to the viewport and to one page shape. Book pages are about 0.71 wide-to-tall; mobile sheets are taller. Changes:

- Each face root sets `container-type: size`, and sizes use `cqw`/`cqh`.
- Layout switches on page shape (`@container (aspect-ratio < 0.6)`), not device.
- Content blocks (titles, entries, lists) use flex/grid flow. Only decoration (tape, pins, stamps, polaroid tilt) is absolutely positioned.

### 4. The route is drawn per face

Each face draws its own route segment with a masked SVG path (`pathLength="1"`, animated `stroke-dashoffset`). Drawing progress comes from that face's visibility, so it works under both page flips and scrolling.

### 5. Shell choice is CSS; only the visible shell runs

A static export can't detect devices on the server, and choosing the shell in JavaScript at render time either flashes or causes a hydration mismatch. Instead:

- Render both shells into the static HTML, and hide the inactive one with a single media query (`LAYOUT_QUERY`).
- A `useActiveShell()` hook built on `matchMedia` makes only the visible shell attach keyboard and swipe listeners and run animations.
- SVG ids come from `useId()` so the duplicated DOM stays valid.

### 6. Shared primitives and tokens

- **Primitives:** `Polaroid`, `Tape`, `Pin`, `Stamp`, `Entry`, `RouteSegment` and `LineIcon`. The blog uses the same set (see `blog-plan.md`, Phase 2).
- **Tokens:** paper, dots, ink and rust as CSS variables mapped into Tailwind's theme. Generated textures (leather, crepe, grain) are CSS variables too.
- **Fonts:** Amatic SC, Kalam and Courier Prime via `next/font`, downloaded at build time and served from the site itself.

### 7. Deep links (later)

Give each content face a slug (`#about`). `Book` flips to that spread; `ScrollSheet` scrolls to it.

## Steps

Each step ends with `npm run build` (output served from `out/`) and a manual check on desktop and phone widths.

1. **Primitives, tokens, fonts.** No visible change.
2. **Visibility interface; arrows and fillers moved into the shell.** No visible change.
3. **Route Map faces.** Rebuild Welcome and About with the primitives and container units; new desk, cover and paper.
4. **`ScrollSheet`, CSS shell switching, per-face route drawing.**
5. **Deep links.**

## Risks

- **rough-notation:** positioning breaks if a positioned wrapper is added between `.front-page`/`.back-page` and the face. Check every face after changing `Page.tsx`.
- **Dev server:** `npm run build` while `next dev` runs empties the dev server's CSS. Stop it first, or verify against the static `out/` build instead.
