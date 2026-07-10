---
emoji: 🏷️
description: Automatically triage new issues with labels and concise follow-up guidance.
on:
  issues:
    types: [opened, reopened]
  roles: all
  skip-bots: [dependabot, renovate]
permissions:
  contents: read
  issues: read
strict: true
tools:
  github:
    mode: gh-proxy
    toolsets: [issues]
steps:
  - name: Prefetch compact issue triage context
    env:
      GH_TOKEN: ${{ github.token }}
      REPO: ${{ github.repository }}
      ISSUE_NUMBER: ${{ github.event.issue.number }}
    run: |
      mkdir -p /tmp/gh-aw/data
      cp README.md /tmp/gh-aw/data/readme.md
      gh issue view "$ISSUE_NUMBER" --repo "$REPO" \
        --json number,title,body,author,labels,assignees,url,createdAt,updatedAt,state \
        > /tmp/gh-aw/data/issue.json
      gh issue list --repo "$REPO" --state open --limit 40 \
        --json number,title,labels,url,createdAt \
        > /tmp/gh-aw/data/open-issues.json
      gh label list --repo "$REPO" --limit 100 \
        --json name,description,color \
        > /tmp/gh-aw/data/labels.json
safe-outputs:
  add-labels:
    allowed: [bug, documentation, duplicate, enhancement, invalid, question]
    max: 2
  add-comment:
    max: 1
network:
  allowed: [defaults, github]
---

# Issue Triage

## Task

Triage the triggering issue using the pre-fetched files:

- `/tmp/gh-aw/data/readme.md`
- `/tmp/gh-aw/data/issue.json`
- `/tmp/gh-aw/data/open-issues.json`
- `/tmp/gh-aw/data/labels.json`

Classify the issue using this repository's existing labels only: `bug`, `documentation`, `duplicate`, `enhancement`, `invalid`, and `question`.

## Rules

1. Read the pre-fetched files first and avoid broad re-fetching unless you need one small follow-up lookup.
2. Add the smallest useful set of labels:
   - choose one primary category label when the issue is clear
   - also add `duplicate` only when there is a high-confidence existing open issue that overlaps substantially
   - do not add labels that would conflict with labels already present
   - prefer `question`, `bug`, `documentation`, or `enhancement` over `invalid` unless the report is clearly spam, empty, unrelated, or not actionable
3. Use `add-comment` only when it helps:
   - for likely bugs with missing details, ask only for the minimum needed: reproduction steps, expected result, actual result, and browser or device details when the problem is UI-related
   - for vague enhancement requests, ask for the user problem or use case only when it is missing
   - for documentation issues, ask for the exact page, section, or broken instruction only when unclear
   - explain briefly why the issue looks invalid or out of scope
   - point to the likely duplicate issue by number and link
   - answer a simple support question directly only when the answer is clearly supported by `readme.md` or obvious repository facts
4. Optimize for low noise:
   - do not comment when a clear label is enough
   - do not comment on clear `enhancement` or `documentation` issues unless needed to request one missing detail
   - if the issue was reopened and is already clearly triaged with no materially new context, use `noop`
5. Keep comments short, specific, and friendly. Do not thank the user excessively or add boilerplate.
6. Do not create, close, edit, or assign issues. Do not suggest code changes.
7. Call `noop` with a brief explanation when no visible action is needed, including when the issue is already clearly triaged.

## Safe Outputs

- Use `add-labels` for label changes.
- Use `add-comment` for one concise triage response when needed.
- Use `noop` when the best result is no visible change.
