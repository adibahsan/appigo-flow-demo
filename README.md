# appigo-flow-demo

A cut-down event-ticketing core used to demo the agentic coding flow (grill, spec, tickets, implement, review, ship). A practice repo for the appiGo Agentic Coding Session.

## Domain

Event, Ticket (a ticket type with a unit price), Account, and Order (an Account buying ticket quantities for one Event). All money is integer cents.

## Public API

```ts
priceOrder(order: Order): PricedOrder   // { lines: PricedLine[], total: Cents }
```

Base pricing is quantity x unit price per line, summed. Source is in `src/`, tests in `test/`. Every test goes through `priceOrder`.

## Run the tests

```sh
npm install
npm test            # vitest
npm run typecheck   # tsc --noEmit
npm start           # print a receipt for one sample order
```

## Practise the flow

The practice feature is the **Rush Discount**. Its raw business brief is `docs/briefs/rush-discount.md`, and it has gaps on purpose.

1. Open this repo in Claude Code. Skills are committed under `.claude/skills/` and pinned by `skills-lock.json`, so nothing needs installing at user level. (`npx skills experimental_install` restores them from the lockfile.)
2. Start from a clean `main` (no `GLOSSARY.md`, `docs/adr/` or `.scratch/` yet). Run `npm start` to see today's price.
3. Keep steps 3 to 5 in one context window. Grill the brief: `/grill-with-docs docs/briefs/rush-discount.md`. You make the decisions; it writes `GLOSSARY.md` and an ADR.
4. `/to-spec`.
5. `/to-tickets`. The spec and tickets land in `.scratch/rush-discount/`.
6. `/clear`, then `/implement .scratch/rush-discount/issues/01-...md`, one ticket per fresh window. Or let `/implement-spec .scratch/rush-discount` build them all on one integration branch. Each ticket is built test-first with `/tdd`, at the `priceOrder` seam. Run `npm start` again to see the discount.
7. Review and ship: `/review main` and `/release`. (`/hms-review main` needs appiGo's internal hms skills.) Then `/retro`.

Stuck? Branch `rush-discount-backup` holds a finished run, with a tag at each stage: `stage-1-grill`, `stage-2-spec`, `stage-3-tickets`, `stage-4-t1-red`, `stage-5-t1-green`, `stage-6-done`. Run `git checkout stage-3-tickets` (for example) to see that point.

Issue tracker, labels and domain-doc layout are configured in `docs/agents/`.
