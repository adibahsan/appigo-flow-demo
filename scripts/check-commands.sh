#!/usr/bin/env bash
# Checks the team commands in .claude/commands/ (markdown, so a scripted check stands in for tests).
set -u
cd "$(dirname "$0")/.."
fail=0
bad() { echo "FAIL: $*"; fail=1; }
ok() { echo "ok:   $*"; }

CMDS=(review release hms-review)
for c in "${CMDS[@]}"; do
  f=".claude/commands/$c.md"
  [ -f "$f" ] && ok "$f exists" || bad "$f missing"
done

rel=.claude/commands/release.md
if [ -f "$rel" ]; then
  # No GitLab token / wiki / tag-push path: none of these operational strings may appear.
  if grep -nE 'PRIVATE-TOKEN|GITLAB_TOKEN|\.zshrc|curl |/wikis|git push|git tag' "$rel"; then
    bad "release.md contains a token/wiki/tag/push path"
  else ok "release.md has no token, wiki, tag or push path"; fi
  grep -qi 'no GitLab token, wiki, tag or push path' "$rel" && ok "release.md states it has no such path" || bad "release.md must state: no GitLab token, wiki, tag or push path"
  grep -qi 'stops at approval' "$rel" && ok "release.md states it stops at approval" || bad "release.md must state it stops at approval"
fi

# No command may read .env: every mention must be a prohibition.
for c in "${CMDS[@]}"; do
  f=".claude/commands/$c.md"; [ -f "$f" ] || continue
  while IFS= read -r line; do
    echo "$line" | grep -qiE 'never|do not|don.t|exclude|must not' || bad "$f mentions .env without prohibiting it: $line"
  done < <(grep -nE '\.env|cat .*env|source .*env' "$f")
done
ok ".env mentions checked"

# Every skill a command references must exist in the repo.
for c in "${CMDS[@]}"; do
  f=".claude/commands/$c.md"; [ -f "$f" ] || continue
  for s in $(grep -oE '\.claude/skills/[A-Za-z0-9_-]+' "$f" | sort -u); do
    [ -f "$s/SKILL.md" ] && ok "$f -> $s" || bad "$f references missing skill $s"
  done
done

[ $fail -eq 0 ] && echo "ALL CHECKS PASSED" || echo "CHECKS FAILED"
exit $fail
