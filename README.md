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

## Architecture

```text
app/
  layout.tsx          # App shell + metadata
  page.tsx            # Main orchestration/state for generator UI
  globals.css         # Tailwind and base styles
components/
  GeneratorForm.tsx   # Input + dropdown controls + validation/error surface
  ResultsGrid.tsx     # Metaphor card grid
  MetaphorCard.tsx    # Reusable card presentation + save/copy actions
  FavoritesSection.tsx# Saved cards summary + bulk copy
services/
  metaphorGenerator.ts# Deterministic generator service layer (mock mode)
data/
  mockMetaphors.ts    # Theme seed dataset (>=5 themes)
types/
  metaphor.ts         # Shared domain types
```

### Generator service design

The app uses a deterministic mock generator in `services/metaphorGenerator.ts`.

- Matches known themes from `data/mockMetaphors.ts`
- Builds variants using deterministic hashing + option-aware modifiers
- Adds tone and medium specific framing to each result
- Falls back to structured placeholders for unknown themes

This keeps the UI production-ready while making it easy to swap in a live OpenAI integration later (replace only the service implementation and keep component contracts).

## UX notes

- Empty state before first generation
- Loading state while generating
- Graceful error message for invalid/empty input or generation issues
- Editorial, neutral visual style with card-based hierarchy

