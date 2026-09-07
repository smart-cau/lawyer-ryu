---
name: cases-seo-optimizer
description: lawyer-ryu 성공사례(/cases) 글을 PayloadLive MCP로 점검하고 SEO 최적화 콘텐츠로 재작성하는 워크플로우. 네이버 블로그 복붙 초안의 slug 정상화, meta title/description 작성, 본문 Lexical 재구성(h2 구조·줄바꿈 병합·특수문자 제거), 사실관계를 보존한 문장 재작성, 이미지 alt 보강, 변호사 광고규정 점검에 사용. "성공사례 SEO 개선", "cases 글 최적화", "블로그에서 복사한 글 정리", "성공사례 점검" 등의 요청에 트리거.
---

# Cases SEO Optimizer

성공사례 글은 사무실이 네이버 블로그 대행 업체의 글을 admin에 복사 붙여넣기 해서 올린다. 이 업무방식 자체는 바꿀 수 없다는 것이 확정된 전제다. 이 skill은 그렇게 올라온 초안을 받아 SEO에 맞는 콘텐츠로 개선한다.

## 고정 결정 (사용자 승인 완료, 재질문 금지)

- **문장 재작성 허용.** 구조 재편뿐 아니라 문장 자체를 다시 쓴다. 네이버 블로그 원문과 표현이 달라야 중복 콘텐츠 판정을 피한다. 단, 사실관계(죄명·처분·판결·기관·날짜·금액·합의 여부)는 한 글자도 창작·변경하지 않는다.
- **published 글은 바로 published로 재반영한다.** 별도 draft 검토 단계를 두지 않는다.
- **원래 draft였던 글은 개선 후에도 draft로 저장**하고, 게시 여부는 사용자에게 맡긴다. 미완성 초안을 skill이 임의로 공개하지 않는다.
- OG 이미지 폴백·Article JSON-LD 등 코드 레벨 이슈는 이 skill의 범위 밖이다. 발견해도 고치지 말고 보고만 한다.

## 도구

PayloadLive MCP를 사용한다. 필요한 도구를 ToolSearch 한 번으로 로드:
`select:mcp__PayloadLive__findCases,mcp__PayloadLive__updateCases,mcp__PayloadLive__findCategories,mcp__PayloadLive__findMedia,mcp__PayloadLive__updateMedia`

- 본문 전체 조회는 결과가 커서 파일로 persist될 수 있다. persist되면 그 파일을 Read로 읽는다.
- Cases 삭제 도구는 없다. 빈 문서·불완전 초안은 개선 대상에서 제외하고 목록으로 보고만 한다.

## 워크플로우

### 0. 준비

1. `docs/00-compliance/lawyer-ad-regulations.md`를 읽는다 (광고규정 가드에 필요).
2. `findCases`로 전체 목록을 조회한다 (`draft: true`, select로 title/slug/meta/result/resultCustom/categories/heroImage/publishedAt/_status만).
3. 대상이 지정되지 않았으면 결함 요약표(slug 깨짐 / meta 비어 있음 / 분류 미지정)를 보여주고 대상을 확정한다. 여러 건이면 **한 건씩 순차 처리**하고 건마다 결과를 요약한다.

### 1. 원문 정독과 사실 대장

대상 글의 content 전체를 조회해 끝까지 읽는다. 그리고 **사실 대장(fact ledger)** 을 만든다:

- 죄명·혐의 (적용 법조 포함)
- 처분·판결 결과 (심급별로)
- 수사·재판 기관명, 처분 일자
- 금액, 합의·변제·처벌불원 여부
- 의뢰인 상황 중 결과에 영향을 준 사정

재작성이 끝난 뒤 이 대장과 새 본문을 대조한다. 대장에 없는 사실을 새로 만들어 넣는 것도, 대장에 있는 사실을 빠뜨리거나 바꾸는 것도 금지다.

**개인정보 플래그:** 원 단위까지 적힌 정확한 금액, 구체적 날짜+지청명 조합 등 의뢰인이 특정될 수 있는 정보가 원문에 있으면 그대로 유지하되 사용자에게 명시적으로 알린다(뭉갤지 여부는 사용자 판단). 원문에 없는 식별 정보를 새로 추가하는 것은 금지.

### 2. 메타 설계

`references/meta-rules.md`의 규격을 따른다. 핵심:

- **title**: `[죄명·사건 유형] [결과]` 중심. 잠재 의뢰인의 검색어와 매칭되게. "이끌어내다" 같은 블로그식 낚시 동사 금지.
- **slug**: 영문 kebab-case 3~6단어. 한글·공백·슬래시 절대 금지. `findCases`의 where로 중복 확인.
- **meta.title / meta.description**: 규격은 reference 파일 참조. meta.title에 사무소명을 넣지 말 것(프론트가 자동으로 붙임).

### 3. 본문 재작성

`references/lexical-template.md`의 노드 템플릿과 골격을 따른다. 핵심 원칙:

- 섹션 제목은 quote+bold가 아니라 **h2 heading 노드**로. 표준 골격: 사건 개요 → 변호 전략(쟁점) → 결과 → 시사점(한마디).
- 네이버식 강제 줄바꿈(한 문장이 여러 문단으로 쪼개진 것)을 자연스러운 문단으로 병합. 가운데 정렬 제거(format `""`).
- zero-width space(U+200B, `​`) 문단 전부 제거.
- 기존 mediaBlock의 media id를 보존해 적절한 위치에 재배치. 이미지를 빼먹지 말 것.
- 문장은 새로 쓰되 **`references/korean-style.md`의 문체 기준을 따른다** (기준 문체 = id 5 글, 금지 패턴 7종과 대안 수록). 분량이 크면 프로젝트의 `humanizer` skill을 실제로 호출해 교차 검수한다.

### 4. 부속 데이터 정합성

- `result`가 `custom`인데 기존 옵션(무혐의·무죄·집행유예·벌금 등 13종)으로 표현 가능하면 옵션으로 교체. `custom`을 유지할 때만 `resultCustom` 채움.
- `categories` 미지정이면 본문 내용으로 판단해 지정 (`findCategories`로 id 확인).
- `meta.image`가 비어 있으면 `heroImage`와 같은 media id로 채운다.
- 본문·대표 이미지로 쓰인 media의 `alt`가 null이면 `updateMedia`로 글 내용에 맞는 한국어 alt를 채운다.

### 5. 품질 게이트 (반영 전 전부 통과)

1. **사실 대조**: 사실 대장의 모든 항목이 새 본문에 정확히 존재하는가.
2. **광고규정**: 결과 보장·암시 표현 없음("반드시", "100%", "~하면 무죄"). "전문" 표기는 등록 분야(형사법 전문)에만. 최상급 표현("최고", "제일") 없음.
3. **중복 회피**: 원문 문장이 그대로 남은 문단이 없는가 (사실 명칭·법률 용어 제외).
4. **한국어 자연스러움**: 소리 내어 읽어 어색한 문장이 없는가.
5. **기술 점검**: slug 규격, meta 글자수, h2 구조, U+200B 부재, mediaBlock 보존.

### 6. 반영 — updateCases 주의점

- **`generateSlug: false`를 반드시 넣는다.** 빠뜨리면 저장 시 한글 title에서 slug가 재생성되어 깨진 slug가 재발할 수 있다.
- 기존 `publishedAt`을 보존한다 (null이었고 published로 저장한다면 현재 시각 대신 그대로 두면 훅이 채움).
- `_status`: 원래 published였으면 `"published"`, 원래 draft였으면 `draft: true`로 저장.
- content는 root 전체 교체다 — 부분 patch가 아니므로 전체 문서를 완성해서 보낸다.

### 7. 검증

1. `findCases`로 재조회해 slug·meta·content가 의도대로 저장됐는지 확인. **저장 여부의 기준은 DB 재조회다** — 렌더된 페이지가 아니다.
2. 로컬 dev 서버가 떠 있으면 (CLAUDE.md의 서버 재사용 규칙 준수) `/cases/<new-slug>`가 200으로 열리는지 확인. 서버가 없으면 이 단계는 생략하고 보고에 명시.
3. **프로덕션 캐시 함정 (2026-07-20 확인):** MCP 경유 update는 `revalidateCase` 훅의 `revalidatePath`가 프로덕션(Vercel) 페이지 캐시를 purge하지 못한다. slug가 바뀐 글은 새 URL이라 첫 요청에서 최신으로 렌더되지만, **같은 slug로 본문만 고친 글은 이전 캐시가 계속 서빙된다** (`age` 헤더가 리셋되지 않으면 이 상태). 재시도하지 말고 사용자에게 보고할 것 — 반영은 redeploy 또는 원인 수정(코드 세션 과제) 후에 이뤄진다.
4. 건별 결과 요약: 바뀐 필드, 이전→이후 slug, 플래그된 개인정보, 남은 이슈.

## 하드 규칙

- 사실관계 창작·변경·누락 금지. 애매하면 원문 표현을 유지하고 사용자에게 질문.
- 존재하지 않는 검색 키워드를 위해 사실을 비틀지 않는다 (예: 진주지청 사건을 "창원" 사건으로 서술 금지 — 사무소 소재지는 창원이지만 사건 관할은 사실대로).
- 깨진 slug(`---------`, 슬래시 포함 등)의 교체는 redirect 불필요 (어차피 접근 불가). **정상 slug를 바꾸는 경우**는 기존 URL이 색인됐을 수 있으므로 사용자에게 redirect 필요 여부를 알린다.
- 빈 문서·본문 없는 초안은 건드리지 않는다.
- 코드 파일 수정 금지 (이 skill은 CMS 데이터만 다룬다).
