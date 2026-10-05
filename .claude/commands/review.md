---
description: Code review of a branch against its base (default main), producing a severity-classified report
---

# Code Review: Base-to-Branch

You are reviewing the appigo-flow-demo codebase (TypeScript, vitest, integer-cent money). Follow `AGENTS.md`, `GLOSSARY.md` (if present) and `docs/agents/` strictly. This review is read-only for source code.

## Steps

### 1. Identify the review range

`$ARGUMENTS` may name a base (branch, tag or SHA). Default base is `main`. This repo has no release tags and no remote, so do not look for one.

```bash
git branch --show-current
git merge-base HEAD main
git log --oneline --first-parent main..HEAD
```

If the current branch is `main`, ask the user which branch or ref to review instead.

### 2. Measure the scope

```bash
git diff --stat main...HEAD -- ':(exclude).scratch' ':(exclude)package-lock.json' ':(exclude).claude'
```

### 3. Launch parallel exploration agents

Use 2 Explore agents in parallel over the changed files only:

**Agent 1 - Pricing logic (`src/`):**
- `priceOrder` and any helper it uses; types in `src/types.ts`
- Check: money stays integer cents (no floats, rounding is explicit), totals equal the sum of lines, discounts cannot push a line or total below zero, input is not mutated, the call shape of `priceOrder` is unchanged, exports go through `src/index.ts`

**Agent 2 - Tests and conventions (`test/`, docs):**
- Every test calls `priceOrder` and asserts on `lines` and `total` (never internal helpers); new behaviour has a test written first; edge cases (zero quantity, empty order, rounding)
- Check: `.scratch` ticket/spec acceptance criteria are met by the diff, no unused exports or dead code

### 4. Apply the verification gates

Run these and record the result in the report. Do not skip a failing gate:

- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] Never open or print `.env` files or tokens; flag (by file name only) if one is committed

### 5. Generate the review report

Write findings to `docs/CODE_REVIEW_<BRANCH_NAME>.md` (replace `/` in the branch name with `-`):

```markdown
# Code Review: `<base>` -> `<branch>`

**Date:** YYYY-MM-DD
**Reviewer:** Claude Code
**Branch:** `<branch>`
**Base:** `<base>`

## Context
(What the branch introduces, scope of changes)

## Review Summary
(Table: Area | Rating /10 | Key Concerns)

## Critical Issues
(Wrong money totals charged to customers, data loss, secrets committed)

## High Priority Issues
(Bugs, missing validation, behaviour with no test)

## Medium Priority Issues
(Inconsistencies, code quality, missing types)

## Low Priority Issues
(Style, minor test gaps)

## Positive Observations
(What was done well)

## Recommended Actions
(Numbered list, priority order)

## Verification
(Test commands, manual checks)
```

### 6. Severity classification

- **Critical:** a pricing path that charges the wrong amount, float/rounding errors that change a total, committed secrets, data loss
- **High:** bugs in `priceOrder`, missing validation of quantities or prices, changed call shape of `priceOrder`, behaviour without a test
- **Medium:** type safety issues (`any`, unchecked casts), inconsistent line or total shapes, large functions, missing edge-case tests
- **Low:** unused imports, naming, style, minor test gaps

Print a short summary (counts per severity) and the report path when done.

$ARGUMENTS
