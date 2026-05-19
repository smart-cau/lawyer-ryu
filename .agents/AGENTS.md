# 작업 가이드

This file provides guidance to coding agents such as Claude Code and Codex when working with code in this repository.

## Project Overview

`lawyer-ryu` is the homepage project for **법무법인 인유 창원사무소 / 대표변호사 류남경 (Attorney Ryu Nam-kyung)** — a Korean-language law firm site. The current state is a 1차 시안 (v1 working draft). 코드에 들어 있는 카피·IA·구조 결정은 모두 **작업 가설(working hypothesis)**이며, 확정된 콘텐츠가 아니다. `docs/` 디렉터리는 작업을 위한 **자료조사 메모(research notes)** 모음이지 확정된 카피·IA 원천이 아니다 — 발췌해서 그대로 페이지에 박을 수 있는 권위를 가지지 않는다. 카피·IA 변경은 사용자 확인을 거쳐 결정한다.

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

A bundled Payload reference skill lives at `.agents/skills/payload/`. **Read `.agents/skills/payload/SKILL.md` before doing non-trivial Payload work** (collections, fields, hooks, access control, queries, plugins). Detailed docs are under `.agents/skills/payload/reference/`.

## 자료조사 메모 (`docs/`)

`docs/`는 홈페이지 개발에 필요한 **자료조사·참고 메모** 모음이다. 카피·IA·브랜딩의 *권위 있는 원천(SoT)이 아니다* — 내용 퀄리티와 확정도가 들쭉날쭉하며, 발췌해서 그대로 페이지에 박을 수 없다. 참조 시 다음을 지킨다.

- 카피·IA·메타데이터 결정에서 `docs/`를 *그대로 발췌*하지 말 것. 참고 자료로 읽고, 실제 문구·구조는 사용자 확인을 거쳐 결정한다.
- 일부 문서(예: services IA v1.4 `docs/02-services/01-services-ia-v1.md`)는 사용자와 합의가 끝난 *locked* 상태일 수 있으나, **개별 문서 머리말에 명시된 경우에 한해** 그렇게 취급한다. 명시가 없으면 draft·메모로 본다.
- 입문 진입점:
  1. `docs/03-firm/brand-positioning.md` — 메시지·USP·연락처 초안
  2. `docs/01-profile/profile.md` — 변호사 약력 초안

Full index: `docs/INDEX.md`. 원본 Payload template README는 `docs/05-references/payload-template-README.md`에 보존.

## 1차 개발 범위 (Scope v1)

The contracted v1 scope is **4 page groups**, each anchored to a top-level route. **Detailed composition within each group (sections, sub-pages, layout) is not yet finalized** — treat this section as a high-level map, not a finalized spec. Stay inside this scope unless the user explicitly expands it.

- **main (랜딩)** — `/`. Single landing page. Section composition **pending**; placeholder skeleton currently lives in `src/app/(frontend)/page.tsx`.
- **about/lawyer (변호사 소개)** — `/about/lawyer`. Attorney intro page (greeting + career). Internal composition **pending** — depends on the lawyer's story interview, the only outstanding interview item. Reserved for future expansion: `/about/firm` (법무법인 소개) when needed.
- **services (업무분야)** — `/services/<criminal|non-criminal>/<slug>`. Practice area hub + leaves. **IA locked** (10 leaf · 44 분류, header label "업무분야") in `docs/02-services/01-services-ia-v1.md`.
- **cases (성공사례)** — `/cases` (list) + `/cases/[slug]` (detail) + admin CMS. Backed by the `Cases` collection. Detailed page composition **pending**.

## Common commands

Standard scripts (`dev`, `build`, `start`, `lint(:fix)`, `test(:int|:e2e)`) live in `package.json`. Project-specific commands worth memorizing:

- `docker-compose up -d` — start the local Postgres container before `pnpm dev`.
- `pnpm generate:types` — regenerate `src/payload-types.ts` after editing collections/fields/globals.
- `pnpm generate:importmap` — regenerate the admin import map after adding custom admin components.
- `pnpm payload migrate:create` / `pnpm payload migrate` — required Postgres migration flow for production deploys (dev uses `push: true`, no migration step).
- Single test: `pnpm test:int -- tests/int/foo.int.spec.ts` / `pnpm test:e2e -- tests/e2e/foo.e2e.spec.ts`.

`NODE_OPTIONS=--no-deprecation` is prefixed onto every script via `cross-env` — keep that pattern when adding new scripts that touch Payload/Next CLIs.

## Architecture

### Two route groups, one Next.js app
- `src/app/(frontend)/` — public site (layout, root `page.tsx` placeholder skeleton, `posts/`, `search/`, `(sitemaps)/`, `not-found`).
- `src/app/(payload)/` — Payload admin (`admin/[[...segments]]`) and Payload's REST/GraphQL/media routes under `api/`.
  Both groups share the same Next.js runtime and the same Payload instance.

### Payload config: `src/payload.config.ts`
Wires together collections (`Posts`, `Media`, `Categories`, `Users`), the Vercel Postgres adapter, and the plugin stack. **There are no Payload globals** — `src/Header/Component.tsx` and `src/Footer/Component.tsx` are static React components, not CMS-driven. Cron jobs are gated by `CRON_SECRET` (Bearer header) when no user is logged in.

### Plugin stack: `src/plugins/index.ts`
Single `plugins` array — names are visible in the file; order matters. Non-obvious wiring: `seoPlugin`'s `generateTitle` / `generateURL` are typed for `Post` only (based on `getServerSideURL()`); `redirectsPlugin` adds a `revalidateRedirects` afterChange hook on `posts`; `searchPlugin` reads `beforeSyncWithSearch` / `searchFields` from `src/search/`.

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

Required env vars are documented in `.env.example`. Beyond that file:

- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token used by `vercelBlobStorage` for the `media` collection (not in `.env.example`).
- File split: `.env.local` (cloud Postgres / Vercel-style vars), `.env.development.local` (local Postgres + dev `PAYLOAD_SECRET`).
- **Gotcha**: `next build` only loads `.env.local` / `.env.production.local` / `.env` — anything needed at build time must not live only in `.env.development.local`.
- **Gotcha**: On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` overrides `NEXT_PUBLIC_SERVER_URL` (handled in `next.config.ts`).

## Postgres-specific gotchas

- Dev uses `push: true` (default in the postgres adapter) — schema syncs on the fly. **Never point a dev process at a production database** (drift / data loss risk).
- Production deploys must run `pnpm payload migrate` after build and before `pnpm start`; generate migration files locally with `pnpm payload migrate:create` whenever collection schemas change.
- Point fields: see the Payload skill's "Common Gotchas" §10 before copying patterns from Payload examples.

## shadcn/ui

This project uses **shadcn/ui as the default UI primitive layer** — new interactive UI must reach for shadcn first; bespoke `<button>` / `<input>` / `<div className="rounded border ...">` patterns are an anti-pattern. For workflow (CLI, composition, theming, anti-patterns), use the **`shadcn` skill**. Don't rely on training-data memory for the shadcn API.

Project-specific decisions (not covered by the skill):

- **`style` / `baseColor` are out of scope for routine work** — revisited only in dedicated design sessions. Do not change `components.json` without explicit user approval.
- `cn()` lives at `@/utilities/ui` (not the default `@/lib/utils`); this is set as the `utils` alias in `components.json`.
- `src/components/ui/button.tsx` has a project-specific `size: 'clear'` variant that `CMSLink` depends on — do **not** let `shadcn add` overwrite it.
- Existing custom wrappers (`src/components/Card`, `src/components/Link`) **predate this policy** — when you touch them, compose on top of shadcn primitives rather than re-styling from scratch.
