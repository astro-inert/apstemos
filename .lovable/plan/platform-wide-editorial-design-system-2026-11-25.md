# Platform-wide editorial design system

Visual-only pass. Every word of copy, every feature, all question data, scoring and workflows stay exactly as they are.

## 1. Typography
- Headlines: Manrope (weights 500–700, no 800/900). Body: DM Sans. Numbers and technical labels: IBM Plex Mono. Nunito and JetBrains Mono are removed.
- One type scale used everywhere: display / h1 / h2 / h3 / body / small / label, each with a fixed size, weight, line height and letter spacing. Nothing under 12px. Headings get tighter tracking and lighter weights. Labels get wider tracking.
- Numbers use tabular figures so values line up in columns.

## 2. Layout grid and spacing
- A single 12-column grid with fixed content widths: wide (1200px), standard (1040px) and reading (720px). Gutters and page margins step up at each screen size.
- A spacing scale used for section padding: compact for dense sections, open for statement sections. The two alternate so the page has a rhythm.
- Headings share one alignment line across sections.

## 3. Homepage composition (marketing, more expressive)
- Opening section: headline and actions sit left on desktop, with the line drawing on the right. The Score Command Center preview starts in the same grid and overlaps the section edge, so it reads as part of the page rather than a floating card. On phones, everything stacks in a single column.
- The sections alternate between heading-left/preview-right, full-width statement, and preview-left/heading-right, instead of repeating the same stacked block.
- Fewer cards nested inside cards: inner groupings become ruled rows and columns with thin dividers.
- Dense preview sections alternate with open, airy sections.

## 4. Visual identity
- The pastel palette per subject stays the same. Gradients appear only in the opening section and on primary buttons.
- Surfaces: thin 1px borders, a 6–8px corner radius at most, no diffuse shadows, and squared tags instead of pills, except where a control needs a pill shape.
- The subtle math-grid texture and the very faint paper grain stay. Line illustrations (curve with tangent, Riemann sum, slope field) are used sparingly, one per marketing section at most and never behind content.

## 5. Navigation
- Desktop: logo, course selector and links align to the grid, with a consistent gap and a clear active state.
- Phone: a full-width menu panel with grouped links, large tap targets and a mono group label. The course selector stays visible. No overlap from 320 to 767px.

## 6. Rest of the platform (clarity first)
- Practice, Score Command Center, Answer Log, Common Mistakes, Question Type Navigator, Topic Rundown, FRQs by Type, Formula & Strategy Guide, Exam Strategy, 108-point breakdown, sign-in, and the AB/BC track pages all move to the same type scale, widths, borders and radius.
- No decorative illustrations on practice or dashboard screens. Only a faint grid behind page headings.
- The page heading block (`study-page-heading`) becomes a ruled editorial header instead of a gradient card.

## Technical details
- Change the font link in `__root.tsx`. Set `--font-display`, `--font-sans` and `--font-mono`, plus type-scale, container and spacing tokens, in `src/styles.css`.
- Add `container-wide/standard/reading` and `section-compact/open` utilities, and apply them in the `home/*` sections, `SiteNav`, `AppShell` and the page routes.
- Restyle only through classes. No changes to text, props, data or logic.
- Check with Playwright at 320, 390, 768, 1024 and 1280px on all six homepages plus Practice, Command Center, Navigator and the Formula Guide: no overflow, no console errors, and copy text unchanged (a DOM text diff before and after).
