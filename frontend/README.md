# Campus Find — Frontend (Phase 1)

A campus-exclusive Lost & Found platform. This is the Phase 1 frontend only —
polished UI, mock data, working search/filter, no backend yet.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- lucide-react icons
- Framer Motion for small interactions

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```text
frontend/
├── app/                # routes (home, /lost, /found, /report, /item/[id], /dashboard)
├── components/          # reusable UI (Navbar, ItemCard, MatchCard, ReportForm, ...)
├── data/                 # mockItems.ts + shared types
├── lib/                  # small helpers (formatting, constants)
└── public/
```

## Notes

- All item/match/notification data is mock data from `data/mockItems.ts`.
- Submitting the Report form saves to `localStorage` on your device only — there is
  no backend/database yet, so nothing is shared across users or devices.
- "This Is Mine" / "I Found This" on item detail pages open an explainer modal;
  real claim/verification logic comes in a later phase.
- Backend, auth, database, and real AI matching are intentionally not built yet
  (Phase 2+).
