# Branching Strategy

This project follows **trunk-based development**: `main` is the only long-lived
branch, and everything else is short-lived.

## Branch Structure

```
main          → the trunk. Always deployable. Never commit directly.
feat/*        → new features.        e.g. feat/product-filters
fix/*         → bug fixes.           e.g. fix/contact-validation
chore/*       → tooling/config.      e.g. chore/update-dependencies
docs/*        → documentation only.  e.g. docs/update-readme
refactor/*    → code restructuring.  e.g. refactor/product-store
perf/*        → performance work.    e.g. perf/lazy-load-gallery
test/*        → tests only.          e.g. test/rate-limiter
```

## Flow

```
feat/my-feature ──► main ──► production
```

1. Branch off `main`
2. Work on your branch, keeping it small
3. Open a PR → `main`
4. Vercel builds a preview deploy and CI runs lint, typecheck, tests and build
5. Merge, and delete the branch

## Why there is no `develop`

An integration branch earns its keep when a team needs somewhere to combine work
before production, or when releases are batched and cut on a schedule. Neither
applies here:

- **Every PR gets its own Vercel preview deploy** — a real build at a real URL.
  That is the staging environment, and it is per-change rather than a pile of
  changes sharing one deployment.
- **[semantic-release](../release.config.mjs) versions from commit messages**, not
  from a branch position. A `feat:` merged to `main` cuts its own release. There
  is nothing to batch.

The trade: a half-finished feature cannot sit on a shared branch for weeks. It
stays in your own branch, or lands in small, safe pieces.

## Rules

- `main` is protected — no direct pushes, PRs only
- Branch names must follow the `type/short-description` pattern, using the same
  types as [Conventional Commits](https://www.conventionalcommits.org/)
- Delete branches after merging
- Keep branches short-lived — the longer a branch lives, the harder the merge
