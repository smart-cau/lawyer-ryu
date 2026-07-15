---
name: service-leaf-copy-planner
description: Plan, audit, write, or implement Korean law-firm `/services` leaf content for lawyer-ryu. Use for service-page search intent, profile-grounded positioning, page metadata and internal links, subcategory/FAQ/attorney copy, Korean naturalness review, legal-source verification, advertising compliance, or renderer changes. Also use when reviewing or expanding existing service leaf copy; do not use only for new `sub-categories.ts` files.
---

# Service Leaf Copy Planner

Produce useful, distinct service pages for search visitors. Treat every existing sentence, `docs/` note, and page composition as a working hypothesis unless its own source says it is locked.

## Non-negotiable order

Prioritize in this order:

1. factual and legal accuracy,
2. visitor usefulness and search-intent fit,
3. profile claim support and advertising compliance,
4. natural Korean,
5. technical SEO completeness.

Never improve fluency or keyword coverage by weakening a higher-priority item.

## Read before drafting

Always read:

- `docs/02-services/01-services-ia-v1.md` for the locked leaf inventory, labels, mapping keywords, and cross-links;
- `docs/02-services/02-services-seo-keyword-map.md` for the user-approved keyword roles, regional-claim rules, and per-leaf approval status;
- `docs/02-services/services-leaf-ia-v01.md` for section intent;
- `docs/00-compliance/lawyer-ad-regulations.md` for advertising constraints;
- the target route, its data files, shared renderer, and metadata implementation;
- `references/content-model.md` and `references/quality-gates.md`.

For profile-based positioning, also read:

- `docs/01-profile/profile.md`;
- `docs/01-profile/services-from-career.md`;
- `docs/03-firm/brand-positioning.md`;
- `references/profile-grounding.md`.

These profile documents can conflict or contain inference. Build a claim ledger; do not silently choose one value.

For substantial user-facing Korean, read `references/korean-copy.md`, then apply the project `humanizer`, `grammar-checker`, and `style-guide` skills in the order specified there.

## Workflow

### 1. Audit the page before writing

Record:

- route and implementation status;
- locked IA labels and mapping terms;
- current title, H1, description, canonical behavior, visible sections, breadcrumbs, and internal links;
- primary audience and urgent question;
- duplicated or formulaic copy shared with sibling leaves;
- unsupported legal, profile, outcome, or regional claims.

Do not start from a generic template when an implemented sibling page exists. Use siblings to learn the component contract, not to copy their prose.

### 2. Write a one-page intent brief

Define before drafting:

- one primary intent: the main problem this URL answers;
- two to five supporting intents;
- primary audience and, when necessary, a separately signposted secondary audience;
- the page's unique value compared with sibling leaves;
- evidence types, procedural risks, and immediate mistakes specific to this leaf;
- profile claims permitted by the claim ledger;
- proposed title, H1, meta description, and internal-link targets.

If the page cannot state a distinct intent and unique value, stop expanding it. Do not create a thin search doorway.

### 3. Verify facts and claims

Use current official sources for statutes, elements, sanctions, procedure, administrative consequences, victim-protection routes, or other changeable legal facts. Prefer `law.go.kr`, `easylaw.go.kr`, courts, police, prosecutors, and relevant agencies. Read `references/legal-source-and-compliance.md`.

Classify every profile claim as `verified`, `approval-needed`, `inferred`, or `conflicted`. Publish only verified claims already approved for public use; otherwise flag them for user confirmation. Never convert career adjacency into subject-matter specialization.

### 4. Draft for the visitor

For each subcategory, answer:

- Is this my situation?
- Which facts and evidence will matter?
- What should I preserve or avoid now?
- What can counsel concretely do at this stage?

Use the model in `references/content-model.md`. Vary evidence, procedure, mistake risk, and attorney work by case type. Do not merely rotate nouns inside the same sentence frame.

At page level, make the visible introduction, subcategories, attorney section, FAQ, CTA, title, and description tell the same story. Profile proof belongs where it explains a relevant capability; it must not be pasted into every section.

#### Footer CTA direction

Treat `footerCta` as the visitor's next-action section, not as a final summary of the page.

- Write the title as a recognizable case or procedural moment followed by one direct, calm action cue.
- Use the lead to state that the representative attorney consults directly and, when useful, name one page-specific item to review such as the investigation date, notice date, documents, or evidence.
- Keep this conversion grammar consistent across sibling leaves while varying the situation, urgency, and review object. Do not reuse one sentence mechanically.
- Calibrate urgency to the matter. Investigation-stage criminal pages may say `조사 전에 상담하세요` or `혼자 대응하지 마세요`; civil, family, corporate, and administrative pages should name the actual deadline or decision point without manufacturing fear.
- Keep credentials, regional keywords, legal explanations, and repeated body summaries out of the CTA unless they are necessary for the immediate decision.
- Make the button label describe the actual action. Do not imply a free consultation, guaranteed result, or compulsory retention of counsel.

### 5. Apply SEO as a coherence check

Read `references/seo-page-quality.md`. Require:

- a unique, concise title and description that accurately summarize the page;
- one clear visible H1 aligned with the title and primary intent;
- primary terms in natural, useful contexts, not in repeated lists;
- descriptive internal links to the lawyer profile, relevant cases when available, and genuinely adjacent service leaves;
- valid canonical behavior and indexability using the project's existing pattern;
- structured data only when it matches visible content and an established site pattern.

Do not add `meta keywords`, invent nearby-city coverage, manufacture exact-match paragraphs, promise rankings, or add schema solely to chase a rich result.

### 6. Run Korean review in separate passes

Do not combine drafting and proofreading into one pass. Run:

1. full-page repetition and voice review;
2. `humanizer` for AI patterns and legal-domain wording;
3. `grammar-checker` for spelling, spacing, grammar, and punctuation;
4. `style-guide` for terminology and tone consistency;
5. a final fact-preservation diff against the pre-review draft.

Rewrite any sentence that sounds like a legal textbook, search-keyword list, generic consultancy, threat, or outcome prediction. Preserve necessary legal terms, but explain them in ordinary Korean.

### 7. Implement and verify

Make the smallest scoped code change. Preserve stable slugs, labels, and route hierarchy unless the user approves an IA change. Do not create subcategory routes without explicit approval.

Then:

- run lint/type checks for touched files;
- confirm title, description, H1, canonical, breadcrumbs, links, and visible content from the rendered page;
- inspect desktop and mobile when UI changed;
- run every gate in `references/quality-gates.md` and report unresolved approval items.

## Output expectations

When planning, return the intent brief, claim ledger, section plan, SEO fields, source needs, and approval questions. When implementing, include those decisions in code only when supported and approved; summarize source verification and remaining hypotheses in the handoff.

## Conditional references

- Read `references/sex-crime-example.md` only when a concrete structural example is needed. Never reuse its sentences.
- When current search guidance matters, verify official Google Search Central and Naver Search Advisor sources rather than relying on remembered character counts or ranking formulas.
