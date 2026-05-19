## Update FRQs by Type page

Replace the current "six archetypes" content on `/frqs-by-type` with the structure you want.

### Intro block
- Heading: **FRQs by Type**
- Body text (verbatim):
  > Good news: AP Calc FRQs are one of the most predictable. Master FRQs #1–6 by using this detailed rundown of the question types asked for each one, including past examples from 2010–2026, whether you're taking AB or BC.

### Six FRQ sections (FRQ #1 through FRQ #6)
Each section is a card with the same structure, using placeholders so you can fill them in later:

- **FRQ #N** — section heading
- **Description** — short placeholder paragraph
- **AB notes** — placeholder line
- **BC notes** — placeholder line
- **Past examples (2010–2026)** — placeholder list of years

### Styling
- Reuses existing `PageShell` layout and the black/blue theme already in place.
- No new colors, no extra sections, no other content added.

### Files touched
- `src/routes/frqs-by-type.tsx` — full rewrite of the page body.

No other pages or components change.