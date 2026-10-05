# appigo-flow-demo

A cut-down event-ticketing core (Event, Ticket, Account, Order) behind one public pricing function, `priceOrder(order)`. It exists to demo the agentic coding flow. TypeScript + vitest, no database, network, framework or UI. Money is integer cents.

## Commands

- `npm test`: run the vitest suite
- `npm run typecheck`: `tsc --noEmit`

## Testing

Every test calls `priceOrder` and asserts on the returned `lines` and `total`. Never test internal helpers. New behaviour is written test-first (`/tdd`). Do not change the existing call shape of `priceOrder`.

## Skills

Matt Pocock's skills are committed in `.claude/skills/` and pinned by `skills-lock.json`. Repo-specific commands live in `.claude/commands/`.

Three skills are not managed by `skills-lock.json`: the adapted hms skills (`application-config-secret-management`, `input-validation-and-sanitization`, `owasp-broken-access-control`). They are committed, locally maintained copies: they were adapted for this TypeScript demo, so a lockfile pin to an upstream source would not describe what is in the repo. Update them by editing the committed files, not with the skills installer. Every other skill, including `pr`, comes from `mattpocock/skills` and is pinned in the lockfile; update those with `npx skills add mattpocock/skills -a claude-code --copy`.

## Agent skills

### Issue tracker

Issues and specs are local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix), recorded as a `Status:` line. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
