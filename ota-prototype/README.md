# Travel Decision Prototype (Mobile-first)

A frontend-only, mobile-first prototype that helps travelers choose between a managed journey (we take responsibility for delays) or the absolute cheapest option.

## Getting started

```bash
cd ota-prototype
npm install
npm run dev
```

## Available routes
- `/` landing
- `/search` form
- `/results` flight list
- `/decision/:id` decision mode
- `/payment` responsibility fee (managed only)
- `/handoff` booking handoff simulation
- `/confirm` link booking
- `/tracking` delay simulation
- `/payout` automatic outcome when delay ≥ 90 minutes

Analytics events are logged to the console for demo purposes.
