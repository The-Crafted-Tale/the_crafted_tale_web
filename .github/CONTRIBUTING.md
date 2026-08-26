# Contributing

Thanks for taking the time to contribute! This guide covers everything you need
to get set up and land a change.

The Crafted Tale storefront is **proprietary software** (see [LICENSE](../LICENSE)).
Contributions are accepted from team members and invited collaborators. If you
have spotted a bug or have an idea and you are not on the team, please open an
issue rather than a pull request.

By participating in this project, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md).

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3`
- A Supabase project (products, contact submissions and subscribers live there)

## Local Setup

```bash
# Clone the repo
git clone https://github.com/The-Crafted-Tale/the_crafted_tale_web.git
cd the_crafted_tale_web

# Install dependencies (also installs the commitguard git hooks)
bun install

# Copy the environment template and fill in your Supabase credentials
cp .env.example .env

# Start the development server
bun dev
```

The app runs at `http://localhost:3000`.

See [Environment Variables](../README.md#environment-variables) in the README for
what each key does.

---

## Branching

We follow the strategy documented in [`BRANCHING.md`](BRANCHING.md). In short:

- Branch off `develop` — never off `main`
- Name branches `type/short-description` (e.g. `feat/product-filters`, `fix/contact-validation`)
- Open pull requests against `develop`; `develop` merges to `main` for release
- Never push directly to `main` or `develop`

---

## Commit Messages

Commit messages **must** follow [Conventional Commits](https://www.conventionalcommits.org/).
This is enforced by commitguard on every commit.

```
type(optional-scope): short summary

[optional body]
```

Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `perf`, `test`.

Examples:

```
feat(products): add category filter to the listing page
fix: prevent duplicate contact form submission
docs: update setup instructions
```

Commit type drives the release version — see [Releases](../README.md#releases).

---

## Code Style

Linting and typechecking run automatically on every commit via commitguard
(see [`commitguard.yaml`](../commitguard.yaml)). To run them yourself:

```bash
bun lint       # Stylelint + ESLint
bun lint:fix   # auto-fix where possible
bun typecheck  # vue-tsc
```

- **ESLint** enforces TypeScript and Vue rules, and all formatting — there is
  no Prettier in this project
- **Stylelint** enforces SCSS rules, including BEM class naming
- SCSS variables live in `app/assets/scss/_variables.scss` and are auto-imported
  into every block — never hardcode a brand colour
- No `console.log` or `debugger` statements in committed code
- No hardcoded secrets or API keys — use environment variables (see `.env.example`)

---

## Tests

```bash
bun run test
```

Vitest runs two projects: `unit` (plain Node, for pure helpers under `server/utils`
and `app/utils`) and `nuxt` (real Nuxt runtime, for components and composables).
Put a new test in the one that matches what it needs — see the
[Testing](../README.md#testing) section of the README.

---

## Opening a Pull Request

1. Make sure `bun lint`, `bun typecheck` and `bun run test` pass, and the app
   builds (`bun run build`).
2. Push your branch and open a PR against `develop`.
3. Fill out the [pull request template](pull_request_template.md) completely —
   include screenshots for any UI change.
4. Link any related issues.
5. A maintainer (see [CODEOWNERS](CODEOWNERS)) will be requested for review automatically.

Keep PRs focused — one logical change per PR is easier to review and merge.

---

## Reporting Bugs & Requesting Features

Use the issue templates:

- 🐛 [Bug report](ISSUE_TEMPLATE/bug_report.md)
- ✨ [Feature request](ISSUE_TEMPLATE/feature_request.md)
- 🧹 [Chore](ISSUE_TEMPLATE/chore.md)

For security issues, please **do not** open a public issue — see our
[Security Policy](SECURITY.md).

---

Thanks again for contributing! 🎉
