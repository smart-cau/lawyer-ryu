# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`lawyer-ryu` is the homepage project for **법무법인 인유 창원사무소 / 대표변호사 류남경 (Attorney Ryu Nam-kyung)** — a Korean-language law firm site. The current state is a 1차 시안 (v1 working draft) being built **ahead of the lawyer's content interview**, so concrete copy and structural decisions in the codebase represent a working hypothesis grounded in the SoT docs (`docs/`), not finalized content. Expect text and IA to shift after the interview.

Project facts:
- 사무소: 법무법인 인유 창원사무소 (LAWFIRM IN-YOU, Changwon office)
- 대표변호사: 류남경 (사법시험 44회 / 사법연수원 35기 / 검사 19년 / 부부장 출신 / 대한변협 등록 형사법 전문 변호사)
- 주소: 경남 창원시 성산구 창이대로689번길 4-24, 5층 504호
- 상담문의: 010-7552-0301
- 공식 블로그: https://blog.naver.com/inyou2025
- 배포: Vercel (예정) — 공식 도메인 미정. 배포 시 `VERCEL_PROJECT_PRODUCTION_URL`이 `NEXT_PUBLIC_SERVER_URL`을 자동으로 덮어씀.

Technically, it's a Payload CMS 3 + Next.js 16 (App Router) site. The Payload admin panel and the public-facing Next.js site run in the same process — both live under `src/app/`, and Payload itself is mounted as a set of route groups inside the Next.js app.

Database is **Postgres** via `@payloadcms/db-vercel-postgres` — *not* MongoDB. A `docker-compose.yml` at the repo root spins up a local Postgres container (`lawyer-ryu-pg`); `.env.local` / `.env.development.local` configure connection strings (Vercel/Neon Postgres for cloud, local container for dev).

## Reference skill

A bundled Payload reference skill lives at `.claude/skills/payload/`. **Read `.claude/skills/payload/SKILL.md` before doing non-trivial Payload work** (collections, fields, hooks, access control, queries, plugins). Detailed docs are under `.claude/skills/payload/reference/`.

## Source-of-truth docs

Korean research and content SoT lives under `docs/`. When making copy, IA, metadata, or branding decisions, consult these in order:

1. `docs/02-expertise/scope-v1-contract.md` — page IA, meta templates, JSON-LD plan (1차 계약 범위 사양)
2. `docs/03-firm/brand-positioning.md` — official messaging, USP, contact info (블로그 배너 1차 출처)
3. `docs/02-expertise/seo-keywords.md` — 13 priority keywords, intent tagging
4. `docs/01-profile/profile.md` — attorney bio (career, credentials, expertise)

Full index: `docs/README.md`. The original Payload template README is preserved verbatim at `docs/05-references/payload-template-README.md`.

## 1차 개발 범위 (Scope v1)

The contracted v1 scope is **13 page units** in 4 groups. Stay inside this scope unless the user explicitly expands it; the SoT spec is `docs/02-expertise/scope-v1-contract.md`.

- **F-01 ~ F-07** — Single landing page, 7 sections (Hero · About summary · Practice cards · Trust signals · Cases highlight · Process · Contact). Currently a placeholder skeleton in `src/app/(frontend)/page.tsx`.
- **P-01 ~ P-03** — Attorney intro pages (profile, career timeline, message). Implement as static routes under `src/app/(frontend)/profile/`.
- **S-01 ~ S-05** — Practice area hub pages (1순위: 성범죄 / 특수 / 강력 / 형사 일반 / 기업 재산범죄). Implement as static routes under `src/app/(frontend)/expertise/<slug>/`.
- **M-01 ~ M-04** — Success cases front (list + detail) + admin CMS. Backed by the `Posts` collection.

## Common commands

```bash
# Local development (Next.js dev server + Payload admin at /admin)
pnpm dev

# Start Postgres locally (uses .env DATABASE_URL)
docker-compose up -d

# Production build (also runs next-sitemap as a postbuild)
pnpm build && pnpm start

# Lint / autofix (ESLint flat config + sonarjs)
pnpm lint
pnpm lint:fix

# Regenerate src/payload-types.ts after editing collections/fields/globals
pnpm generate:types

# Regenerate the Payload admin import map after adding custom admin components
pnpm generate:importmap

# Postgres schema migrations (required for production deploys; dev uses push: true)
pnpm payload migrate:create   # locally generate migration files
pnpm payload migrate          # apply pending migrations on the server

# Tests
pnpm test          # runs int + e2e
pnpm test:int      # Vitest, jsdom; matches tests/int/**/*.int.spec.ts
pnpm test:e2e      # Playwright; spec files under tests/e2e (auto-runs `pnpm dev`)

# Run a single Vitest spec
pnpm test:int -- tests/int/some-feature.int.spec.ts

# Run a single Playwright spec
pnpm test:e2e -- tests/e2e/some-flow.e2e.spec.ts
```

`NODE_OPTIONS=--no-deprecation` is prefixed onto every script via `cross-env` — keep that pattern when adding new scripts that touch Payload/Next CLIs.

## Architecture

### Two route groups, one Next.js app
- `src/app/(frontend)/` — public site (layout, root `page.tsx` placeholder skeleton, `posts/`, `search/`, `(sitemaps)/`, `not-found`).
- `src/app/(payload)/` — Payload admin (`admin/[[...segments]]`) and Payload's REST/GraphQL/media routes under `api/`.
  Both groups share the same Next.js runtime and the same Payload instance.

### Payload config: `src/payload.config.ts`
Wires together collections (`Posts`, `Media`, `Categories`, `Users`), the Vercel Postgres adapter, and the plugin stack. **There are no Payload globals** — `src/Header/Component.tsx` and `src/Footer/Component.tsx` are static React components, not CMS-driven. Cron jobs are gated by `CRON_SECRET` (Bearer header) when no user is logged in.

### Plugin stack: `src/plugins/index.ts`
A single `plugins` array exported to `payload.config.ts`. Order and overrides matter:
- `redirectsPlugin` on `posts` with `revalidateRedirects` afterChange hook.
- `nestedDocsPlugin` for `categories` (URL composed from slugs).
- `seoPlugin` with `generateTitle` / `generateURL` typed for `Post` only, based on `getServerSideURL()`.
- `searchPlugin` over `posts` with `beforeSyncWithSearch` and `searchFields` from `src/search/`.

### Posts content blocks
The `Posts` collection's rich-text body uses Lexical's `BlocksFeature` to enable inline blocks: `Banner`, `Code`, `MediaBlock`. Each block has matching pieces:
- `src/blocks/<Name>/config.ts` — Payload field config.
- `src/blocks/<Name>/Component.tsx` — frontend rendering, dispatched from `src/components/RichText/index.tsx`.
- `src/blocks/RelatedPosts/Component.tsx` — used directly in `posts/[slug]/page.tsx`, not registered as a Lexical block.
- `src/heros/PostHero/` — used directly in `posts/[slug]/page.tsx` to render the post header.

When adding a new inline block: create the config + component, register it in the Posts `BlocksFeature` array and `src/components/RichText/index.tsx` converters, then run `pnpm generate:types`.

### Access control: `src/access/`
Three reusable helpers — `anyone`, `authenticated`, `authenticatedOrPublished`. The last one is the standard pattern for draft-aware collections: logged-in users see everything; anonymous users get a `where: { _status: { equals: 'published' } }` constraint.

### Drafts, live preview, on-demand revalidation
- `Posts` use `versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true } }`.
- Frontend post routes call `payload.find(...)` inside a React `cache()` wrapper and pass `draft` from `next/headers`' `draftMode()`. They also use `overrideAccess: draft` so anonymous draft URLs still respect access rules.
- `Posts` has `afterChange` + `afterDelete` hooks (`revalidatePost`, `revalidateDelete`) that call `revalidatePath`/`revalidateTag` to keep the static frontend in sync. Always pass `req` through to nested operations in those hooks (see Payload skill's "Transaction Failures in Hooks" section).

### Path aliases (tsconfig.json)
- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`

Use these aliases in new code; relative-deep paths (`../../../...`) are not the convention.

### Generated files — do not hand-edit
- `src/payload-types.ts` — regenerated by `pnpm generate:types`.
- `src/payload-generated-schema.ts` (when present) — Postgres schema mirror.
- `src/app/(payload)/admin/importMap.js` (when present) — regenerated by `pnpm generate:importmap`.
ESLint already ignores the first two.

## Environment

Env files live alongside the repo: `.env.example` (template), `.env.local` (cloud Postgres / Vercel-style vars), `.env.development.local` (local Postgres + dev `PAYLOAD_SECRET`). Next.js production builds (`next build`) only load `.env.local` / `.env.production.local` / `.env`, so any var needed at build time must be in one of those, not `.env.development.local`. Required vars:

- `POSTGRES_URL` (and Vercel Postgres relatives like `DATABASE_URL`, `POSTGRES_URL_NON_POOLING`) — Postgres connection string. The bundled `docker-compose` uses `postgres://postgres:postgres@127.0.0.1:5432/lawyer-ryu`.
- `PAYLOAD_SECRET` — JWT signing secret.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token used by `vercelBlobStorage` for the `media` collection.
- `NEXT_PUBLIC_SERVER_URL` — used for CORS, SEO URLs, image `remotePatterns`. No trailing slash.
- `CRON_SECRET` — required for cron-triggered job runs without an authenticated user.
- `PREVIEW_SECRET` — gates draft preview URLs.

On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` overrides `NEXT_PUBLIC_SERVER_URL` (handled in `next.config.ts`).

## Postgres-specific gotchas

- Dev uses `push: true` (default in the postgres adapter) — schema syncs on the fly. **Do not point a dev process at a production database**, or you risk drift / data loss.
- Production deploys must run `pnpm payload migrate` after build and before `pnpm start`. Generate migration files locally with `pnpm payload migrate:create` whenever you change collection schemas.
- Point fields are not supported (the Payload skill's "Common Gotchas" §10 lists this — it applies in SQLite *and* when behavior diverges from MongoDB; this template is Postgres so it's fine, but if you copy patterns from Payload examples that use point fields, double-check).

## shadcn/ui

This project uses **shadcn/ui as the default UI primitive layer**. New interactive UI must reach for shadcn first; bespoke `<button>` / `<input>` / `<div className="rounded border ...">` patterns are an anti-pattern and should be replaced when touched. style/baseColor decisions are intentionally **out of scope for routine work** — they are revisited only in dedicated design sessions; do not change `style` or `baseColor` in `components.json` without explicit user approval.

### Setup snapshot
- `components.json`: `style: default`, `baseColor: slate`, `rsc: true`, `tsx: true`, `cssVariables: true`.
- Aliases: `components: "@/components"`, `utils: "@/utilities/ui"`. The `ui` alias is implicit (`@/components/ui`).
- Tailwind v4 via `@tailwindcss/postcss`, CSS variables in `src/app/(frontend)/globals.css`, `tw-animate-css` available.
- Radix primitives are imported per-package (`@radix-ui/react-*`). Do **not** migrate to the unified `radix-ui` package without coordination — `style: default` does not require it.
- Already installed under `src/components/ui/`: `button`, `card`, `checkbox`, `input`, `label`, `pagination`, `select`, `textarea`.

### Adding a new component
1. Run `pnpm dlx shadcn@latest add <name>` (always pass an explicit name; never `--all`). Examples: `pnpm dlx shadcn@latest add separator badge tabs`.
2. The CLI writes to `src/components/ui/<name>.tsx` and installs any missing Radix peers — commit both.
3. Before writing your own primitive, search `npx shadcn@latest search <keyword>` and `npx shadcn@latest docs <name>` to confirm one doesn't already exist.

### Tooling — shadcn MCP + vercel:shadcn skill
- **`shadcn` MCP** is registered in `.mcp.json` (server name `shadcn`). After a Claude Code session restart it surfaces `mcp__shadcn__*` tools — prefer them for component lookup, registry browsing, and fetching component source so you don't guess APIs.
- **`vercel:shadcn` skill** holds the canonical CLI/flag/composition reference. Invoke it (or read its output) before any non-trivial shadcn work — especially `init` flags, registry items, theming tokens, and composition recipes.
- Order of preference when you need shadcn knowledge: MCP tool → `vercel:shadcn` skill output → `npx shadcn@latest docs <name>` → official site. Don't rely on training-data memory of the shadcn API.

### Composition rules (project-specific)
- **Use design tokens, not raw palette classes**: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`. Avoid `bg-slate-900` / `text-zinc-500` style ad-hoc colors in product UI.
- **`AlertDialog` for destructive/irreversible confirmations**, `Dialog` for everything else. Never use a plain `Dialog` with a "정말 삭제하시겠습니까?" pattern.
- Icons: **Lucide only**, sized at `h-4 w-4` or `h-5 w-5`. Don't mix icon libraries.
- The shared `cn()` helper lives at `@/utilities/ui` (not `@/lib/utils`) — always import from there.
- Existing custom wrappers (`src/components/Card/index.tsx`, `src/components/Link/index.tsx`, etc.) **predate this policy** — when you touch them, prefer composing them on top of shadcn primitives rather than re-implementing styling from scratch.

### Forms
- `react-hook-form` is already installed. If `shadcn add form` is run later, it will introduce `zod` as a peer — discuss before adding to keep dependency surface intentional.
