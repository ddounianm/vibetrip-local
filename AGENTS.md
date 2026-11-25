## Project rules

- Site content (destinations, questions, outings, prices) lives in `src/data/vibetrip.ts`; pages read from it so content edits stay in one place.
- Outing price math lives in `src/lib/plan.ts` with tests in `src/lib/plan.test.ts`; UI must call it rather than compute totals inline.
- Favorites are stored per device in browser storage via `src/hooks/use-favorites.ts`, read after mount to avoid hydration mismatches.
