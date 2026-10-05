---
description: Draft release notes for a range of commits and stop at approval (never publishes)
---

# Release Note Drafter

You are drafting release notes for appigo-flow-demo. This command **stops at approval**. It has no GitLab token, wiki, tag or push path: this repo has no remote, so it never publishes, tags or pushes anything, and it never reads credentials. The only thing it writes is the draft file in step 5.

## Steps

### 1. Identify release range and gather inputs

```bash
git describe --tags --abbrev=0   # errors if the repo has no tags yet; that is expected, use the fallback below
git branch --show-current
git config user.name
```

Ask the user for these inputs, suggesting defaults:

- **Base ref**: what to diff from. Default: the latest tag if any, otherwise `main` when on another branch, otherwise the first commit.
- **Version number**: e.g. `0.1.0`. Suggest the next minor bump from `package.json`. The version is a label in the draft only; it is not applied anywhere.
- **Short description**: one line summarising the release.
- **Released by**: default to `git config user.name`.

### 2. Analyze changes

```bash
git diff --stat <base>..HEAD -- ':(exclude).scratch' ':(exclude)package-lock.json' ':(exclude).claude'
git log --oneline <base>..HEAD
```

Launch 2 Explore agents in parallel over the diff:

**Agent 1 - Features and fixes (`src/`):** new behaviour of `priceOrder` (rules, discounts, new fields), bug fixes, behavioural changes visible to callers, grouped by area.

**Agent 2 - Tests and config:** new or changed tests (`test/`), `package.json` dependency or script changes, `tsconfig.json` changes.

### 3. Assemble the draft

Generate this document and show it in full to the user:

```markdown
# Release {version}

* Released By: {released-by}
* Date: {DD-Month-YYYY}
* Base: {base-ref} -> HEAD
* Summary: {short-description}

## Released Features

- **{Feature Name}** - {one-line description}

## Bug Fixes

- {fix description}

## Dependency and Config Changes

- {package or config change} (omit this section if none)

## Areas to be tested

- {specific scenario a QA engineer can execute, e.g. "order of 3 general tickets totals 7500 cents"}
```

Feature descriptions are concise: bold name, then one line. Exclude tooling changes (`.claude`, `.scratch`) from the notes.

### 4. Ask for approval

Ask: **"Approve this release draft? (yes / edit / cancel)"**

- **yes**: write the draft to `docs/RELEASE_NOTES_{version}.md` (step 5), then stop.
- **edit**: ask what to change, regenerate, show the draft again.
- **cancel**: abort without writing anything.

### 5. Stop

On approval, write the approved draft to `docs/RELEASE_NOTES_{version}.md` and print its path. That is the end of the command. Anything beyond it (publishing the notes, creating a release marker, sending anything to a remote) is a separate human action outside this command.

## Important Notes

- Never read `.env` files, shell profiles or any token.
- Test areas must be specific enough to execute, not vague.
- Money in examples is integer cents.

$ARGUMENTS
