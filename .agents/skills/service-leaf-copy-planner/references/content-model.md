# Content Model

Use this model for each service leaf subcategory unless the existing codebase has a stronger local pattern.

```ts
export type ServiceLeafSubCategory = {
  slug: string
  label: string
  keywords: string[]
  definition: string
  commonSituations: string[]
  keyIssues: string[]
  firstResponse: string[]
  attorneyRole: string[]
  relatedKeywords?: string[]
}
```

## Field Rules

- `slug`: stable English identifier. Prefer short, route-safe nouns.
- `label`: user-facing Korean label from `docs/02-services/01-services-ia-v1.md`.
- `keywords`: mapping keywords from IA. These define scope; they are not a stuffing list.
- `definition`: one sentence, ideally 70-130 Korean characters. It should answer “what is this case type?”
- `commonSituations`: usually 2 items. Use concrete scenes the visitor recognizes.
- `keyIssues`: usually 2 items. Focus on evidence, intent, procedure, agency/court concerns, and cross-linked consequences.
- `firstResponse`: usually 2 items. Tell the visitor what to preserve, avoid, or prepare before first contact/investigation.
- `attorneyRole`: usually 2 items. Use concrete work: 진술 정리, 증거 선별, 의견서, 합의 조건, 행정절차 병행, 조사 동행.
- `relatedKeywords`: optional. Use for planning/search-intent coverage; render only if the component has a clear place for it.

## Copy Quality Bar

Each subcategory should help the visitor:

- classify their case without reading a law textbook,
- understand what fact pattern or evidence will matter,
- avoid a harmful immediate action,
- see why lawyer involvement changes the process.

Avoid:

- generic “초기 대응이 중요합니다” without saying what response,
- repeated “전문적인 조력이 필요합니다” without naming the work,
- outcome claims such as “불기소 가능”, “구속을 피할 수 있습니다”,
- fear-heavy lists of penalties unless the user asks and official sources are checked,
- copying the same rhythm across every subcategory.

## Renderer Pattern

For this project, prefer a restrained service-page row layout:

- Keep `ol` + divided rows when already present.
- Left column: `label` and compact “포함 사건” / scope keywords.
- Right column: bold `definition`, then four small labeled groups.
- Avoid nested cards. Do not make a landing-page-like section.
- If content is too long, consider accordion only after keeping label and definition visible.

