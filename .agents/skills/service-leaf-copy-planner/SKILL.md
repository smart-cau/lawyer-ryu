---
name: service-leaf-copy-planner
description: Use when planning, writing, or implementing Korean law-firm service leaf subcategory copy for this project, including creating a new sub-categories.ts from docs/02-services/01-services-ia-v1.md, expanding dummy copy into helpful SEO-aware client-facing content, checking official legal/living-law sources, and updating the service leaf renderer.
---

# Service Leaf Copy Planner

Use this skill for service leaf copy work in the lawyer-ryu project: sex-crime, property-crime, corporate-crime, traffic-crime, school-violence, general-criminal, anti-corruption, investigation, civil-family, and administrative.

The target result is not generic SEO text. It is structured content that helps a search visitor answer:

- Is this my situation?
- What will investigators, agencies, or courts look at?
- What should I avoid doing now?
- Where does a lawyer materially help?

## Required Sources

Start with local project sources:

- `docs/02-services/01-services-ia-v1.md`: canonical leaf inventory, labels, mapping keywords, persona notes, and cross-links.
- `docs/02-services/services-leaf-ia-v01.md`: content model and section intent.
- `docs/00-compliance/lawyer-ad-regulations.md`: advertising guardrails.
- Existing implementation near `src/app/(frontend)/services/<leaf-slug>/` when present.

For legal terminology, current laws, sanctions, or procedural details, verify with official/current sources. Prefer:

- 국가법령정보센터: `law.go.kr`
- 찾기쉬운 생활법령정보: `easylaw.go.kr`
- Relevant government or court sites

Avoid relying on competitor law-firm blogs for legal facts. If using web sources, cite the official pages in the final answer.

## Workflow

1. Identify the leaf slug and page status.
   - If `sub-categories.ts` exists, read it and preserve stable `slug`, `label`, and mapping intent unless the user asks otherwise.
   - If it does not exist, extract the leaf’s subcategory labels and mapping keywords from `docs/02-services/01-services-ia-v1.md`.

2. Read the renderer before writing data.
   - Check whether the page can render expanded fields.
   - If not, update the component in the smallest local way that fits the existing page rhythm.
   - Do not create separate subcategory routes unless the user explicitly changes IA.

3. Verify legal vocabulary.
   - Browse official sources when law, procedures, penalties, administrative measures, or recently changing terms matter.
   - Use legal facts conservatively. Prefer “문제 될 수 있습니다”, “검토해야 합니다”, “사안에 따라 달라집니다” over definitive outcome claims.

4. Draft each subcategory using the standard content model.
   - `definition`: one sentence answering the search intent.
   - `commonSituations`: concrete situations that help a visitor self-classify.
   - `keyIssues`: evidence, intent, legal elements, procedure, agency/court concerns.
   - `firstResponse`: immediate precautions and materials to preserve.
   - `attorneyRole`: concrete lawyer actions, not abstract “전문성”.
   - `relatedKeywords`: search-intent and scope keywords; do not render by default unless useful.

5. Apply compliance and Korean copy review.
   - No result guarantees, success-rate claims, “무료 상담”, sensational fear copy, competitor comparisons, or unsupported superlatives.
   - Use `humanizer` and `grammar-checker` when Korean copy is substantial or user-facing.

6. Implement and verify.
   - Edit data and renderer with the smallest scoped changes.
   - Run lint/type checks for touched files where possible.
   - If UI changed, run the local page and inspect desktop/mobile layout.

7. Use subagents only when allowed.
   - If the user explicitly allows collaboration/subagents and current instructions permit it, delegate a bounded side task such as component-pattern review or legal-source spot check.
   - Do not delegate the main blocking writing task.

## References

- For the reusable TypeScript model, field rules, and copy length guidance, read `references/content-model.md`.
- For source-checking prompts and legal/compliance wording patterns, read `references/legal-source-and-compliance.md`.
- For the example created from the 성범죄 leaf, read `references/sex-crime-example.md` only when an example is needed.

