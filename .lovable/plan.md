# One design framework across every page

The homepage was rebuilt in the new "instrument" design language (warm-white atmosphere, Space Grotesk display type, mono micro-labels, 1px borders, spring motion). Every other page still uses the older sidebar shell with a different card style. This unifies them.

## Chrome: top nav everywhere

- All pages get the same header (`SiteNav`) and `SiteFooter` as the homepage — the left sidebar is retired.
- `PageShell` is rewritten to render: atmospheric background layer → `SiteNav` → page hero (mono eyebrow, display title, supporting line) → content → `SiteFooter`, on the same `max-w-6xl` measure and section rhythm as the homepage.
- `SiteNav` gains the full destination set the sidebar carried (Practice, Command Center, 108-Point Map, Common Mistakes, FRQ Library, Topic Rundowns, Question Navigator, Exam Strategy, Formula Sheet) grouped into the existing dropdown, plus a mobile menu. Sign-out and the theme toggle move into the header.
- Practice and Command Center switch to the same shell so the app pages match the rest of the site.

## Restyle (visual only — no content or logic changes)

Applied page by page: 108-Point Map, Common Mistakes, FRQ Library, Topic Rundowns (index + unit), Question Navigator (index, unit, topic), Exam Strategy, Formula Sheet, Auth, Practice, Command Center.

- Cards move to the homepage panel treatment: `rounded-3xl border border-border bg-card shadow-card`, consistent internal padding.
- Labels use the shared `micro-label` utility; numbers and values use the `num` mono class.
- Headings use the homepage type scale; body copy settles at 13–14px with the same muted tone.
- Reuse `Reveal`, `MicroLabel`, `Section`, `SectionHeading`, and `MasteryBar` from `src/components/home/primitives.tsx` instead of one-off markup.
- Tables, tabs, and empty states get one shared look (mono headers, hairline row dividers, dashed-border empty state).
- Every color comes from existing tokens — no new palette, no hardcoded hex.

## UI/UX fixes found while reviewing

- Theme toggle causes a hydration mismatch (server renders the light icon, client swaps immediately). Render it hydration-safe so the console error disappears.
- Mobile bottom nav overlapped content and only exposed 5 of 9 destinations; replaced by the header menu.
- Header rows with text plus fixed widgets get the grid + `min-w-0` + `shrink-0` treatment so nothing clips at 375–500px.
- Long unit/topic titles truncate instead of breaking layout; tap targets raised to 44px minimum.
- Focus-visible rings standardized on interactive elements; existing reduced-motion handling preserved.

## Technical notes

- Files touched: `src/components/PageShell.tsx`, `src/components/SiteNav.tsx`, `src/components/ThemeToggle.tsx`, all route files under `src/routes/` listed above, and `src/components/AppShell.tsx` (removed once nothing imports it).
- No data, query, server-function, or schema changes. Existing `head()` metadata on each route is left as is.
- Verification: typecheck plus a mobile-width and desktop-width pass over each page in the preview browser.
