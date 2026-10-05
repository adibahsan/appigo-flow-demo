---
description: Security review of the current changes, applying the hms security skills (secrets/config, input validation, access control)
---

# Security Review (skill-driven)

You are running a **security-focused** review of the appigo-flow-demo codebase (TypeScript, vitest; a pure pricing function with no database, network, framework or UI). This review applies the hms security skills committed under `.claude/skills/`:

| Skill | Concern |
|-------|---------|
| `.claude/skills/application-config-secret-management` | Secrets, env vars, config, safe logging |
| `.claude/skills/input-validation-and-sanitization` | Server-side validation of input at boundaries, injection/XSS, output encoding |
| `.claude/skills/owasp-broken-access-control` | Authz, IDOR, ownership scoping |

Each skill contains rules and a checklist; those are the rubric. The hms skills also cover database configuration and file upload/download; those are not adapted here because the demo has no database or upload surface.

**Known TS-variant gap:** the hms skills are framework-agnostic but their implementation sections are written for Spring Boot (Java/Kotlin). Ignore the Spring-specific sections and apply the principle sections to TypeScript (for example: validate `Order` input in `priceOrder` or at whatever boundary calls it, such as a schema check, instead of Jakarta bean validation). Fixing the hms rules is out of scope for this command.

## Steps

### 1. Determine review scope

`$ARGUMENTS` may specify a base ref (tag, branch or commit), for example `/hms-review main`, a path filter, or `staged`. Use the base ref as `<base>`; with no argument, default `<base>` to `main`.

```bash
git branch --show-current
git merge-base HEAD <base>
git diff --stat <base>...HEAD -- ':(exclude).scratch' ':(exclude)package-lock.json'
git status --short
git diff --stat
```

- No args: review the branch changes vs the `main` merge-base plus uncommitted changes.
- `staged`: review only `git diff --staged`.
- A ref (`<base>`): diff `<base>...HEAD`. A path: restrict the diff to that path.

Print the resolved scope (base, file count, changed files) before proceeding.

### 2. Route changed files to the relevant skills

Only run the skills whose surface changed:

| If the diff touches... | Run skill |
|------------------------|-----------|
| Environment-variable lookups, config files, logging calls, CI config, any hard-coded key, token or password | `.claude/skills/application-config-secret-management` |
| `src/` code that accepts external input (`Order`, quantities, prices, ids), parsing, HTML or string building | `.claude/skills/input-validation-and-sanitization` |
| Any code that looks up or acts on an account, order or ticket by id, or checks who may do what | `.claude/skills/owasp-broken-access-control` |

Always run `input-validation-and-sanitization` when `src/` changed. If a diff touches none of the surfaces, say so and do not invent findings.

### 3. Fan out - one review agent per relevant skill (parallel)

Launch the relevant reviews as parallel Explore agents. Give each agent:
- the resolved diff scope and the changed files it should focus on;
- an instruction to **read `.claude/skills/<skill-name>/SKILL.md` first** and use its rules as the rubric, skipping the Spring Boot sections;
- the changed files to read (not the whole repo).

Each agent returns findings with: **severity** (see step 4), **skill** and the rule it violates, **file:line**, a one-line concrete risk, and a **suggested fix** in TypeScript terms. Distinguish **new problems introduced by this diff** from **pre-existing gaps**.

### 4. Severity classification

- **Critical:** exploitable now: a committed live secret, injection, an id-based lookup with no ownership check on a user-facing path
- **High:** missing server-side validation at a real input boundary (for example negative or fractional quantity or price accepted into a total), unknown fields silently accepted, a secret logged
- **Medium:** defense-in-depth gaps, error messages leaking internals
- **Low:** hardening and hygiene, missing negative tests

### 5. Write the report

Write findings to `docs/SECURITY_REVIEW_<BRANCH_NAME>.md` (replace `/` in the branch name with `-`):

```markdown
# Security Review: `<base>` -> `<branch>`

**Date:** YYYY-MM-DD
**Reviewer:** Claude Code (hms-review)
**Scope:** <base>..HEAD (+ uncommitted, if any)
**Skills applied:** <skills actually run>

## Summary
(Table: Skill | Findings | Highest severity)

## Critical
## High
## Medium
## Low

## Pre-existing gaps (informational, not introduced by this diff)

## Recommended actions
(numbered, priority order)

## Verification
(which test to run for each fix, e.g. a priceOrder test that rejects a negative quantity)
```

Finding block format:

```markdown
### [SEVERITY] <short title>
- **Skill:** <skill-name> - <rule>
- **Location:** `path/to/file.ts:line`
- **Risk:** <concrete failure scenario>
- **Fix:** <specific change>
```

### 6. Report back

Print a concise summary (severity counts per skill) and the report path. If nothing was found, say so explicitly. Do not modify source code: this command reviews only. Never open or print `.env` files or tokens; exclude them from any search.

$ARGUMENTS
