<div align="center">

<img src="app/assets/images/logo.svg" alt="" width="96" height="96">

# The Crafted Tale

**Bespoke handmade gifts for every occasion — custom, semi-custom and ready-made creations, crafted with love and delivered with care across India.**

The storefront: a Nuxt 4 site backed by Supabase, with orders and enquiries handled over WhatsApp and email.

[**thecraftedtale.com**](https://thecraftedtale.com) · [Contributing](.github/CONTRIBUTING.md) · [Releases](https://github.com/The-Crafted-Tale/the_crafted_tale_web/releases) · [GTM strategy](GTM_STRATEGY.md)

[![CI](https://img.shields.io/github/actions/workflow/status/The-Crafted-Tale/the_crafted_tale_web/ci.yml?branch=main&label=CI&style=flat-square)](https://github.com/The-Crafted-Tale/the_crafted_tale_web/actions/workflows/ci.yml) [![Release](https://img.shields.io/github/v/release/The-Crafted-Tale/the_crafted_tale_web?style=flat-square&label=release)](https://github.com/The-Crafted-Tale/the_crafted_tale_web/releases/latest) [![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt&logoColor=white)](https://nuxt.com) [![Bun](https://img.shields.io/badge/Bun-1.3-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh) [![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

## Features

| Route | What it is |
| --- | --- |
| `/` | Hero, featured products, how it works, the studio story, testimonials |
| `/products` | The full catalogue, filterable by Ready Made / Semi Custom / Custom |
| `/products/[slug]` | A product page — gallery, price, and a prefilled WhatsApp enquiry |
| `/about` | The story behind the studio |
| `/contact` | Contact form (rate-limited), WhatsApp, email and social links |
| `/privacy`, `/terms` | Legal pages |

Products, contact enquiries and newsletter subscribers live in Supabase
(`supabase/migrations/`). The catalogue routes are ISR-cached for 60 seconds, so
a price change is live within a minute without a redeploy.

There is no checkout: every product page opens WhatsApp with the product name
already in the message. That is deliberate — a handmade order starts as a
conversation about sizes, colours and dates.

---

## Tech Stack

- **[Nuxt 4](https://nuxt.com)** (Vue 3, `<script setup>`, TypeScript) on **[Bun](https://bun.sh)**
- **[Supabase](https://supabase.com)** — Postgres for products, enquiries and subscribers
- **SCSS** with BEM class naming; brand tokens in `app/assets/scss/_variables.scss`
- **[@nuxtjs/seo](https://nuxtseo.com)** — robots, sitemap, OG images, schema.org, link checker
- **[@nuxt/fonts](https://fonts.nuxt.com)** and **[@nuxt/image](https://image.nuxt.com)** — self-hosted fonts, optimized imagery
- **Vercel** — hosting, Analytics and Speed Insights
- **ESLint + Stylelint** (no Prettier), **Vitest**, **semantic-release**, **commitguard**

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3`
- A [Supabase](https://supabase.com) project with `supabase/migrations/001_products_and_contacts.sql` applied

## Getting Started

```bash
git clone https://github.com/The-Crafted-Tale/the_crafted_tale_web.git
cd the_crafted_tale_web

# Install dependencies (also installs the commitguard git hooks)
bun install

# Fill in your Supabase credentials
cp .env.example .env

bun dev
```

The app runs at `http://localhost:3000`.

---

## Available Scripts

| Script | What it does |
| --- | --- |
| `bun dev` | Development server with HMR |
| `bun run build` | Production build into `.output/` |
| `bun run preview` | Serve the production build locally |
| `bun generate` | Static prerender |
| `bun lint` | Stylelint + ESLint |
| `bun lint:style` | Stylelint only |
| `bun lint:fix` | Auto-fix both where possible |
| `bun typecheck` | `nuxt typecheck` (vue-tsc) |
| `bun run test` | Vitest, once |
| `bun test:watch` | Vitest, watching |
| `bun clean` | Remove `.nuxt`, `.output`, `dist` |
| `bun clean:all` | `clean` plus `bun.lock` and `node_modules` |

---

## Project Structure

```
app/
  assets/scss/      brand tokens (_variables), global styles, section mixins
  components/       App/* shell · home/* landing sections · shared UI
  components/OgImage/  social card templates (nuxt-og-image)
  composables/      useProductStore, useContactInfo
  pages/            file-based routes
  types/            Product, ContactSubmission, …
  utils/            framework-free helpers (auto-imported)
server/
  api/              /api/products, /api/contact, /api/subscribe, sitemap URLs
  middleware/       rate limiting
  utils/            Supabase client, category mapping, rate limiter
supabase/migrations/  SQL schema
test/
  unit/             plain Node — pure helpers
  nuxt/             Nuxt runtime — components and composables
docs/               design notes and plans
```

---

## Testing

```bash
bun run test
```

Vitest runs two projects:

- **`unit`** — plain Node, for pure helpers (`server/utils`, `app/utils`). These
  import their subject relatively, so nothing here needs the `~` alias.
- **`nuxt`** — the real Nuxt runtime, for components and composables. Resolve
  components through `#components` rather than a `.vue` path, so `bun typecheck`
  can type the import.

`test/unit/pages-seo.test.ts` is an invariant, not a unit test: it fails if any
page ships without a title and description, re-adds the brand name to its own
title (that belongs to `titleTemplate`), or hand-rolls a JSON-LD `<script>`
instead of going through `useSchemaOrg`.

---

## SEO

Everything is module-driven; there is no hand-maintained markup to keep in sync.

- **Titles** — a page sets only its own title; `app.head.titleTemplate` appends
  the brand. Descriptions over ~160 characters are trimmed by
  `toMetaDescription` (`app/utils/seo.ts`) before they reach the meta tag.
- **Structured data** — the Organization / Store identity is declared once in
  `schemaOrg.identity`; pages add only `defineProduct`, `defineBreadcrumb`,
  `defineItemList` and their page type on top of it.
- **Sitemap** — static routes are listed in `nuxt.config.ts`; product URLs come
  from Supabase at request time via `server/api/__sitemap__/urls.ts`.
- **robots.txt** — generated. Only the production deploy is indexable:
  `site.indexable` is keyed off `VERCEL_ENV`, so preview URLs return
  `Disallow: /` and never compete with the canonical domain. `/api/**` stays
  crawlable (pages fetch it client-side) but carries `X-Robots-Tag: noindex`.
- **Social cards** — products share their own photograph; every other page gets
  a card rendered from `app/components/OgImage/Default.takumi.vue`.
- **Performance** — fonts are self-hosted and subset at build time, product
  imagery is served as sized webp, and the product gallery's first image is
  preloaded as the LCP element.

Check the output on a production-mode build:

```bash
bun run build && VERCEL_ENV=production PORT=3100 node .output/server/index.mjs
```

Then look at `/robots.txt`, `/sitemap.xml`, and the `<title>`, canonical and
`application/ld+json` of any page.

---

## Git Workflow

Trunk-based — see [`.github/BRANCHING.md`](.github/BRANCHING.md). `main` is the
only long-lived branch and is protected; branch off it as
`type/short-description`, open a PR back into it, and delete the branch after
merging. Every PR gets its own Vercel preview deploy, which is what an
integration branch would otherwise be for.

## Code Style

ESLint owns formatting (there is no Prettier) and Stylelint owns SCSS, including
BEM naming. Both run — along with `typecheck` — on every commit via
[commitguard](commitguard.yaml), which also enforces
[Conventional Commits](https://www.conventionalcommits.org/).

## Releases

[semantic-release](release.config.mjs) reads the commit log on every push to
`main`: `feat` bumps the minor version, `fix`/`perf`/`refactor` the patch, and a
`BREAKING CHANGE` footer the major. It
writes `CHANGELOG.md`, bumps `package.json`, and publishes the GitHub release.

---

## Environment Variables

Copy `.env.example` to `.env`. All are read server-side except where noted.

| Variable | Required | What it is |
| --- | --- | --- |
| `NUXT_SUPABASE_URL` | yes | Supabase project URL. Also whitelists the storage host for image optimization. |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | yes | Service role key. Server-only — never expose it to the client. |
| `NUXT_PUBLIC_SITE_URL` | no | Canonical origin for canonicals, sitemap and OG URLs. Defaults to `https://thecraftedtale.com`. |
| `NUXT_PUBLIC_GTAG_ID` | no | GA4 measurement ID. |

`VERCEL_ENV` is set by Vercel itself and decides whether the deploy is indexable.

## Deployment

Deployed on Vercel from `main`. Set the environment variables above in the
project settings; preview deploys inherit them and are automatically
non-indexable. Lighthouse (desktop and mobile) runs against every successful
deployment via [`.github/workflows/lighthouse.yml`](.github/workflows/lighthouse.yml).

---

## License

Proprietary — © 2026 The Crafted Tale. All rights reserved. The source is public
for transparency and collaboration; it is not licensed for reuse. See
[LICENSE](LICENSE).
