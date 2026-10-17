# Git Branching Strategy

This document defines the branch and pull-request workflow for KrishiDrishti. It keeps feature work isolated, promotes changes through development and QA, and requires review before production changes reach `main`.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Production-ready code. Changes land here only after QA approval. |
| `development` | Integration branch for developer testing. A merge may deploy to the Dev environment when deployment automation is configured. |
| `QA` | QA validation branch. A merge may deploy to the QA environment when deployment automation is configured. |
| `feature/*` | New features and improvements, created from the latest `main`. |
| `bugfix/*` | Bug fixes, created from the latest `main`. |

`UAT`, if used by the team, is a protected environment branch and should be added to the promotion path only when a UAT stage is configured. It is not part of the standard flow below.

## Naming branches

Use a ticket identifier and a short, lowercase, hyphen-separated description:

```text
feature/<ticket-id>-<short-description>
bugfix/<ticket-id>-<short-description>
```

Examples:

```text
feature/TD-105-add-login-api
bugfix/TD-120-fix-user-pagination
```

Use the ticket ID in commit subjects as well:

```text
TD-105: Add login API
TD-120: Fix user pagination
```

Keep each branch focused on one ticket. Do not commit directly to protected branches.

## Standard workflow

### 1. Create a branch from the latest `main`

Fetch the latest remote refs, update local `main`, and create the ticket branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/TD-105-add-login-api
```

For a bug fix, use the `bugfix/` prefix instead. If `main` cannot be updated with a fast-forward, stop and resolve the local branch state rather than overwriting it.

### 2. Develop and push

Implement the change on the feature branch. Add or update unit tests and relevant documentation, then run the checks appropriate to the change before requesting review.

```bash
git add <files>
git commit -m "TD-105: Add login API"
git push -u origin feature/TD-105-add-login-api
```

Push subsequent commits to the same branch. Do not use `git add .` by default; stage the intended files so unrelated changes are not included.

### 3. Open a pull request to `development`

Create a PR with:

```text
Source: feature/TD-105-add-login-api
Target: development
```

Include the ticket link, a concise description, test results, and any configuration or deployment notes. Address review feedback on the same feature branch. Merge only after required reviews and CI checks pass.

After the merge, validate the change in the Dev environment when it is available. A deployment following a merge requires a configured CI/CD workflow; creating a branch or PR does not deploy the application by itself.

### 4. Promote the feature to `QA`

Once developer testing passes, open a second PR:

```text
Source: feature/TD-105-add-login-api
Target: QA
```

Keep the feature branch as the source so the same reviewed change is promoted. Resolve conflicts and rerun relevant checks before merging. QA tests the deployed change against the ticket's acceptance criteria.

If QA reports a defect, fix it on the existing feature branch, add or update tests, and push the fix. First promote the update through a PR to `development` and verify it in Dev; then open or update the PR from the feature branch to `QA` for retesting.

Repeat this cycle until QA approves the change.

### 5. Merge the approved change to `main`

After QA approval, open the final PR:

```text
Source: feature/TD-105-add-login-api
Target: main
```

Require the applicable reviews and checks, and confirm the PR contains the intended ticket changes. Merge only after approval. Release or production deployment occurs according to the repository's configured CI/CD and release process.

After the production merge and any required release verification, delete the remote feature branch and remove the local branch:

```bash
git push origin --delete feature/TD-105-add-login-api
git switch main
git pull --ff-only origin main
git branch -d feature/TD-105-add-login-api
```

## Promotion flow

```text
latest main
    |
    +-- feature/<ticket-id>-<description>
              |
              +-- PR -> development -> Dev testing
              |
              +-- PR -> QA -> QA testing and approval
              |
              +-- PR -> main -> production release/deployment
```

Bug fixes follow the same flow using `bugfix/` branches. Fixes discovered during Dev or QA stay on the original ticket branch; do not create a separate branch for the same ticket unless the team explicitly splits the work.

## Pull request and branch protection expectations

Configure repository settings and CI/CD to enforce these expectations; they are process requirements, not guarantees provided by this document:

- Protect `main`, `development`, and `QA` from direct pushes and force pushes.
- Require at least one reviewer and passing required CI checks before merging.
- Keep PRs small, focused, and linked to their ticket.
- Run relevant tests and checks before review and again through CI.
- Use an agreed merge strategy consistently. Do not rewrite shared branch history.
- Ensure deployment workflows are explicitly configured for the intended branches and environments, with appropriate access controls and environment approvals.
- Keep secrets out of source code and use the repository's approved secret-management mechanism.

## Keeping branches current and resolving conflicts

Create new work from the latest `main`. If the feature branch needs updates, fetch and integrate the latest `main` using the team's agreed method, then rerun tests and push the updated feature branch. Avoid merging environment branches (`development` or `QA`) back into the feature branch as a routine promotion step; resolve conflicts with the feature's base and coordinate any integration changes with the team.

Do not force-push a branch that has an open PR unless the team has agreed to that workflow and reviewers are aware.

## Quick checklist

- [ ] Branch created from the latest `main` with the correct ticket-based name.
- [ ] Change is focused on one ticket; commits reference the ticket ID.
- [ ] Tests and relevant checks pass; documentation is updated where needed.
- [ ] PR to `development` is reviewed and Dev testing passes.
- [ ] PR to `QA` is reviewed and QA acceptance criteria pass.
- [ ] Final PR to `main` is approved and required checks pass.
- [ ] Release/deployment is verified and the completed feature branch is deleted.
