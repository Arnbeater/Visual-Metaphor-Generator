# Visual Metaphor Generator

A clean MVP web app for creative professionals to generate structured **visual metaphor ideas** from a theme or concept.

## What it does

- Accepts a theme/concept (e.g. `stress`, `hope`, `public transport`, `change`, `control`)
- Lets you pick optional generation filters:
  - tone (`editorial`, `poetic`, `corporate`, `dark`, `playful`, `public-sector`, `luxury`)
  - medium (`campaign`, `poster`, `film`, `social`, `brand identity`, `presentation`)
  - number of outputs (`6`, `12`, `20`)
- Generates polished metaphor cards with:
  - title
  - one-line concept
  - why it works
  - visual execution
  - headline angle
  - tags
- Save favorite cards in local state
- Copy one card, all results, or all favorites
- Responsive layout for desktop/mobile

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

## OpenAI API integration (via Next.js route)

Generation now runs through `POST /api/generate`.

- If `OPENAI_API_KEY` is configured, the route uses OpenAI and returns fresh metaphor ideas.
- If the key is missing or the API call fails, the route gracefully falls back to deterministic mock generation.

Create a `.env.local` file:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

### Vercel setup

In Vercel project settings, add environment variables:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)

Then deploy normally; no client-side key exposure is needed because the key is only used in the server route handler.

## Architecture

```text
app/
  layout.tsx            # App shell + metadata
  page.tsx              # Main orchestration/state for generator UI
  globals.css           # Tailwind and base styles
  api/generate/route.ts # Server-side generation route (OpenAI + fallback)
components/
  GeneratorForm.tsx     # Input + dropdown controls + validation/error surface
  ResultsGrid.tsx       # Metaphor card grid
  MetaphorCard.tsx      # Reusable card presentation + save/copy actions
  FavoritesSection.tsx  # Saved cards summary + bulk copy
services/
  metaphorGenerator.ts  # Client service + deterministic mock generator
data/
  mockMetaphors.ts      # Theme seed dataset (>=5 themes)
types/
  metaphor.ts           # Shared domain types
```

## UX notes

- Empty state before first generation
- Loading state while generating
- Graceful error message for invalid/empty input or generation issues
- Editorial, neutral visual style with card-based hierarchy

