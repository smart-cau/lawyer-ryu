# 홈페이지 1차 시안 구축 전략 — "가로 → 세로" 접근

> **상태**: 합의 (Phase 1 착수 대기)
> **작성일**: 2026-05-10
> **갱신일**: 2026-05-11 (사용자 피드백 반영 — 전제 3개 수정)
> **맥락**: main IA v0.1 합의, Hero 구현 진행 중, 나머지 main 6섹션·하위 페이지는 placeholder. 변호사 1차 인터뷰 완료. 디자인 토큰 1차 완성.

## 1. 풀려는 문제

현재 시점에서 어떤 순서로 작업해야 효율적인가?

1. **세로 우선** — main의 각 섹션을 Hero 수준으로 끝까지 다듬으며 진행
2. **계획 우선** — 4개 page group(main, about/lawyer, services, cases) 기획을 모두 마친 뒤 구현
3. **혼합형** — 다른 방식

## 2. 결정: "가로 → 세로" 2-pass

> **한 줄**: 4개 페이지 그룹을 **디자인 토큰을 입힌 wireframe 골격(themed skeleton)** 수준으로 한 번 가로로 훑은 다음, 디자인 폴리싱과 마감으로 세로로 들어간다.

### Phase 0 — 완료된 것 (현재 상태)

이미 깔려 있는 기반 — Phase 1을 처음부터 짓는 게 아님을 명시.

- **디자인 토큰 1차 완성** — `src/app/(frontend)/globals.css`
  - 색: brand-deep navy + brand-gold + shadcn primary/secondary/accent/muted 톤
  - 타이포: `--text-display/h1/h2/h3/h4`, `--text-body/body-lg/caption/overline` (한국어 가독성 line-height 1.7)
  - Section rhythm: `--spacing-section`, `--spacing-section-inner` (clamp 기반 반응형)
  - Shadow scale, radius, breakpoint, container max
- **shadcn primitive 20종 설치** — `src/components/ui/` (button, card, dialog, navigation-menu, sheet, tabs 등)
- **변호사 1차 인터뷰 완료** — 결과가 자료조사 메모·합의 완료 IA에 반영됨
  - 운영·행동 USP → `docs/03-firm/usp.md` (자료조사 메모)
  - services IA v1.4 (10 leaf · 44 분류) → `docs/02-services/01-services-ia-v1.md` (합의 완료)
- **메인 IA v0.1 합의** → `docs/03-firm/main-ia-v0.1.md` (M-01~M-07)
- **라우트·컴포넌트 자리** — main 7섹션 컴포넌트, v1 scope 14 페이지 placeholder

### Phase 1a — IA 보강 (다른 페이지를 main 수준으로)

**목표**: main IA v0.1과 동일한 깊이로 나머지 page group의 섹션 IA 합의.

**작성할 IA 문서 (5개)**:

| # | 파일 | 페이지 | 1차 청자 가설 |
|---|------|--------|----------------|
| 1 | `docs/02-services/services-hub-ia-v0.1.md` | `/services` (카탈로그 hub) | 분야 진입 SEO 검색자 |
| 2 | `docs/02-services/services-leaf-ia-v0.1.md` | `/services/<group>/<slug>` (10 leaf 템플릿) | 사건 유형이 명확한 의뢰인 |
| 3 | `docs/01-profile/about-lawyer-ia-v0.1.md` | `/about/lawyer` | main에서 확신을 얻고 디테일 확인 차 진입 |
| 4 | `docs/04-cases/cases-list-ia-v0.1.md` | `/cases` (리스트) | 결과 신호를 찾는 의뢰인 |
| 5 | `docs/04-cases/cases-detail-ia-v0.1.md` | `/cases/[slug]` (디테일 템플릿) | 분야·결과 매칭으로 신뢰 검증 |

**main IA가 다른 페이지에 거는 outbound 약속 (IA 작성 입력)**:

- M-01 Hero → "상세 경력은 `/about/lawyer`에서" → about/lawyer는 경력 깊이를 다뤄야 함
- M-04 → services IA 10 leaf 그리드 → services hub는 같은 10 leaf 단위 잇대어 받음
- M-06 시급성 후크 → services leaf "조사·구속 대응" 연계 (보류 결정 #6)
- M-03 → Cases 컬렉션 데이터 → cases list/detail의 콘텐츠 구조와 정합
- USP-B(M-02)/Process(M-05) 톤 분리 → leaf에서도 같은 톤 분리 적용 여부 결정

**왜 wireframe 직진이 아닌가**: main 외 page group은 섹션 IA가 없어서 wireframe에 들어가면 즉흥적으로 IA를 만들게 됨. wireframe이 IA 합의 도구가 아니라 IA 우회 도구로 변질됨.

**진행 방식 (사용자 합의 2026-05-11)**: 5 IA 일괄 작성 → 검토·합의 → Phase 1b 진입.

### Phase 1b — Themed Wireframe Sweep (가로)

**목표**: 4 page group 골격을 디자인 토큰을 입힌 wireframe 수준까지 끌어올림. 폴리싱은 의도적으로 절제.

**main (7섹션)** — Hero 외 6섹션을 wireframe 수준으로

- `Usp` — USP 카드 그리드 자리 (`docs/03-firm/usp.md` 기반 가설 카피)
- `Services` — 8개 분류 카드 그리드 자리 + leaf 페이지로의 CTA
- `Investigation` — 검사 19년 강점 섹션 골격
- `Cases` — 3~4장 캐러셀 자리 (cases collection 스키마 미정이면 정적 더미)
- `Process` — 단계 번호 박스 + 짧은 설명
- `Contact` — 전화·블로그·사무실 위치 블록

**하위 page group**

- `/about/lawyer` — 인사말 + 경력 타임라인 + 자격증 wireframe (콘텐츠 자료조사 메모는 `docs/01-profile/`, `docs/03-firm/usp.md`)
- `/services/<criminal|non-criminal>/<slug>` — IA locked 상태. hub + leaf 페이지 wireframe (단순 그리드 → 리스트 → 상세 골격)
- `/cases` (list), `/cases/[slug]` (detail) — UI placeholder만. **CMS 스키마는 Phase 2에서**

### Phase 2 — Cases CMS 골격 + 콘텐츠 입력

**목표**: 콘텐츠 구조가 코드보다 먼저 정해져야 하는 부분 처리

- `Cases` collection 필드 설계 + `pnpm generate:types`
- 어드민 입력 흐름 검증 (사무직원이 입력 가능한 상태)
- 리스트/디테일 페이지를 wireframe → 실데이터 기반으로 끌어올림

### Phase 3 — 디자인 폴리싱 + 섹션 마감 (세로)

**목표**: wireframe sweep에서 검증된 IA·토큰을 기반으로 본격 디자인 들어가기

- main 섹션 카피 가설 → 인터뷰 결과 기반 실제 카피로 교체
- 마이크로 인터랙션, scroll-triggered 애니메이션
- 이미지 자산 교체 (`06-interview/office-staff-asset-request.md` 회신 후)
- 타이포 미세 위계, 자간/행간 조정
- breakpoint별 미세 튜닝
- 토큰 1차 가설 검토 회의 — wireframe sweep에서 드러난 어색함 반영

## 3. 근거

### 3.1 디자인 시스템 검증의 부수 효과

토큰은 Phase 0에서 만들어졌지만 **Hero 하나에만 적용된 상태**다. wireframe sweep으로 7섹션 + 3 page group에 깔아봐야 — "Heading scale이 너무 좁다", "section padding이 모바일에서 답답하다", "brand-gold가 본문에 들어갔을 때 가독성이 떨어진다" 같은 게 드러난다. Hero를 100%까지 끌어올리고 나서 깨달으면 비싸다.

### 3.2 콘텐츠 의존성 (인터뷰 완료 후)

| 페이지 | 콘텐츠 자료조사 메모 | Phase 1 작업 가능성 |
|--------|------------|---------------------|
| main | `03-firm/main-ia-v0.1.md`, `03-firm/usp.md` | ✅ wireframe 가능 |
| about/lawyer | `01-profile/profile.md`, `01-profile/career-timeline.md`, `03-firm/usp.md` | ✅ wireframe 가능 (이전 가정과 달리 인터뷰 완료) |
| services | `02-services/01-services-ia-v1.md` (locked) | ✅ wireframe 가능 |
| cases | `04-cases/media/articles.json` | 부분 — CMS 스키마는 Phase 2 |

이전 문서 버전에서 "about/lawyer는 인터뷰까지 carcass만"으로 보류했던 가정은 **무효**. 인터뷰가 끝났으므로 Phase 1에서 다른 페이지와 동등하게 wireframe 가능.

### 3.3 main 자체도 하위 페이지 골격이 보여야 정확해진다

main의 `Services`, `Cases` 섹션은 결국 하위 페이지 진입 hook이다. 하위 페이지 wireframe을 같이 깔아봐야 — 카드 몇 개 / 캐러셀 몇 장 / 어떤 메타데이터를 미리보기로 띄울지 — main 섹션 디자인이 흔들림 없이 마감된다.

## 4. "Themed Wireframe"의 정의

각 섹션·페이지에 대해 — Phase 1에서 채우는 것과 Phase 3로 미루는 것을 명확히 구분.

### Phase 1에 들어가는 것

- 디자인 토큰 적용 (이미 `globals.css`에 있음 — `bg-brand-deep`, `text-h1`, `py-section` 등 그대로 사용)
- shadcn primitive 조합으로 만든 골격 — 신규 컴포넌트는 shadcn skill 참고
- 섹션 컨테이너 + 제목/부제 (자료조사 메모 카피 후보 직접 인용, 사용자 확인 거친 후 사용)
- 핵심 레이아웃 — 카드 그리드, 캐러셀 자리, 단계 박스, CTA 위치
- 섹션 간 vertical rhythm (`space-y-section` 등)
- 큰 깨짐만 막는 수준의 반응형

### Phase 3로 미루는 것

- 마이크로 인터랙션, scroll-triggered 애니메이션
- 실제 이미지 (placeholder div + aspect ratio만)
- 정확한 타이포 위계, 자간/행간 미세 조정
- breakpoint별 미세 튜닝
- 카피 폴리싱 (Phase 1에서는 자료조사 메모 카피 후보 인용, Phase 3에서 톤·길이 다듬기)

비유 — 그림에서 한 부분부터 채색하지 않고 전체에 옅은 underpainting을 까는 것. 단, 이 프로젝트에선 underpainting의 **색 팔레트는 이미 정해져 있다** (Phase 0).

## 5. 가로 sweep에서 얻는 신호 3가지

1. **IA 검증**: main 7섹션 순서가 실제로 스크롤해보면 어색한지 (예: Investigation이 Services보다 앞이 나은가?) — 컴포넌트 깊이 만들기 전에만 싸게 바꿀 수 있음
2. **연결 섹션 사이즈 감각**: Services 미리보기 / Cases 캐러셀의 적정 개수·크기는 하위 페이지를 같이 깔아야 결정됨
3. **디자인 토큰 1차 가설 검증**: Hero만 봐서는 안 보이는 토큰 한계가 7섹션 + 3 page group을 깔면 드러남

## 6. 트레이드오프 / 리스크

| 항목 | 내용 | 완화 |
|------|------|------|
| placeholder가 그대로 굳을 위험 | "자료조사 메모 카피 후보 직접 인용 + placeholder 이미지"가 Phase 3에서 교체 안 되고 release될 위험 | Phase 1에서 만든 placeholder는 `// TODO(polish)` 마커 + Phase 3 시작 시 sweeping replace |
| 디자인 토큰을 너무 일찍 못박을 위험 | Phase 0에서 정한 토큰이 Phase 1 sweep에서 안 맞는 부분 발견될 수 있음 | 토큰은 "확정"이 아니라 "1차 가설" — Phase 1 sweep 후 검토 회의 (필요 시 globals.css 수정) |
| services hub 페이지의 IA 깊이 | leaf 44분류는 lock됐지만 hub 페이지의 시각 구성은 미정 | Phase 1에서는 단순 그리드/리스트로 시작, Phase 3에서 디자인 강화 |
| Cases collection 스키마와 main Cases 섹션의 결합도 | main의 Cases 캐러셀 디자인은 collection 필드에 묶여있음 | Phase 1 main Cases는 정적 더미로, Phase 2에서 schema 확정 후 연결 |

## 7. 의도적으로 보류하는 것

- **모든 마이크로 인터랙션** — wireframe 단계에서 애니메이션 작업은 sunk cost
- **이미지 자산 제작** — 사무직원 자료요청(`06-interview/office-staff-asset-request.md`) 회신 후
- **`components.json` style/baseColor 변경** — CLAUDE.md 정책에 따라 별도 디자인 세션에서만
- **카피 톤 폴리싱** — Phase 1에선 자료조사 메모 후보를 사용자 확인 거쳐 그대로 사용, 길이·톤은 Phase 3

## 8. 합의된 결정 사항 (2026-05-11)

사용자 피드백으로 확정.

| # | 항목 | 결정 |
|---|------|------|
| 1 | 가로 → 세로 접근 | ✅ 채택 |
| 2 | Phase 1 범위 | 4 page group 모두 wireframe (cases는 UI만, CMS는 Phase 2) |
| 3 | 인터뷰 일정 | 1차 인터뷰 완료 — Phase 3의 "인터뷰 후" 게이트 제거 |
| 4 | 클라이언트 데모 | 압박 없음 — Hero 우선 폴리싱 변형 불필요 |
| 5 | 디자인 시스템 책임 | 1차 완성 (`globals.css`). Phase 1b sweep 후 검토 |
| 6 | Phase 1 분리 (2026-05-11 추가) | Phase 1a IA 보강 + Phase 1b wireframe sweep로 분리 |
| 7 | IA 작성 순서 (2026-05-11 추가) | 5 IA 일괄 작성 후 wireframe (사용자 선택) |

## 9. 다음 액션 — Phase 1a 착수 (IA 5문서)

**작성 순서** (main과 결합도 큰 영역부터 — 일관성 검증 가성비 최대):

1. `docs/02-services/services-hub-ia-v0.1.md` — main M-04와 직접 결합
2. `docs/02-services/services-leaf-ia-v0.1.md` — M-06 leaf 연계 결정 항목 처리
3. `docs/01-profile/about-lawyer-ia-v0.1.md` — M-01 Hero outbound 약속 수신
4. `docs/04-cases/cases-list-ia-v0.1.md` — M-03 사례 슬롯 데이터 구조 정합
5. `docs/04-cases/cases-detail-ia-v0.1.md`

**작성 룰**:
- main IA v0.1 (`docs/03-firm/main-ia-v0.1.md`) 형식·깊이 일치 — 페르소나·정서 전제 / 슬롯 표 / 슬롯별 디테일 / 변경 사항 / 보류 항목 / 변경 이력
- leaf·detail은 *템플릿 페이지*이므로 "이 카피가 들어간다"가 아니라 "이 슬롯에 어떤 데이터 바인딩이 들어간다" 관점
- 보류·후속 결정 항목은 IA에 명시 — 즉흥 결정 금지

**검토 사이클**: 첫 IA(services hub) 초안 작성 → 형식·깊이 합의 → 나머지 4개 일괄 또는 묶음 작성 → 5개 모두 합의되면 Phase 1b 진입.

각 IA 문서 추가/변경은 개별 commit. GitHub Issue에 IA 작성 task를 별도 등록.

## 10. Phase 1b 다음 액션 (예고)

Phase 1a 합의 완료 시 진입:

1. **main 6섹션 wireframe** — Hero 외 (`Usp → Services → Investigation → Cases → Process → Contact`). Hero는 wireframe 수준에서 일단 보조 맞춤
2. **services hub + leaf wireframe**
3. **about/lawyer wireframe**
4. **cases UI placeholder**
5. **Phase 1 회고** — 토큰 검토, IA 어색함, 섹션 간 흐름 → Phase 2/3 항목 도출

---

## 부록 A — 현재 상태 스냅샷 (2026-05-11)

- 라우트
  - `(home)` 7섹션 컴포넌트 자리잡힘 (`Hero, Usp, Services, Investigation, Cases, Process, Contact`)
  - `Hero.tsx` 구현 진행 중 (uncommitted)
  - v1 scope 14 페이지 placeholder (cd87ec0)
- 디자인 시스템
  - `src/app/(frontend)/globals.css` — 토큰 1차 완성
  - `src/components/ui/` — shadcn 20종 설치
- 콘텐츠 자료조사·합의 IA
  - services IA v1.4 — locked (합의 완료)
  - main IA v0.1 — 합의
  - 운영·행동 USP — 변호사 본인 구술 1차 정리 (자료조사 메모)
  - 변호사 1차 인터뷰 — 완료
- 인프라
  - Payload 3 + Next.js 16 + Postgres
  - Vercel 배포 예정, 도메인 미정
