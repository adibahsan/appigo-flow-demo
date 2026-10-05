# appigo-flow-demo

A cut-down event-ticketing core used to demo the agentic coding flow (grill, spec, tickets, implement, review, ship). Local only; never pushed.

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

## Replay the flow

1. Open this repo in Claude Code. Skills are committed under `.claude/skills/` and pinned by `skills-lock.json`, so nothing needs installing at user level. (`npx skills experimental_install` restores them from the lockfile.)
2. Start from a clean `main` (no `GLOSSARY.md`, `docs/adr/` or `.scratch/` yet).
3. Run `/grill-with-docs` on the feature you want. It writes `GLOSSARY.md` and ADRs.
4. `/to-spec`, then `/to-tickets`. Specs and tickets land in `.scratch/<feature>/` (see `docs/agents/issue-tracker.md`).
5. `/implement` the tickets. Each one is built test-first with `/tdd`, at the `priceOrder` seam.
6. Review and ship with the review commands, then `/retro`.

Issue tracker, labels and domain-doc layout are configured in `docs/agents/`.
