---
paths: src/**/*.{tsx,css}
---

# Design System

이 프로젝트의 디자인 토큰 현황과 사용 규칙. 컴포넌트 작성 / 스타일 결정 시 참조.

토큰 정의는 `src/app/(frontend)/globals.css` 한 곳에 모여 있다 (`:root` + `@theme inline`).

---

## 현재 토큰 상태

### 컬러 (이전부터 존재)
- shadcn 표준 토큰: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- 브랜드 네임스페이스 분리: `bg-brand-deep`, `text-brand-gold` (히어로·풋터·핵심 강조 영역 전용)
- 사이드바 별도 토큰 (네이비 배경 + 골드 활성색)
- Status: `success` / `warning` / `error` (Banner 블록 호환)
- Chart 5색

### Radius / Shadow (이전부터 존재)
- `--radius: 0.5rem` → `rounded-sm/md/lg/xl` 자동 도출
- shadow 8단계 (`shadow-2xs` ~ `shadow-2xl`), 네이비 톤 일관

### Typography — semantic (2026-05-14 개편)

한국형 typo 시스템으로 개편 — 토스/네이버 컨벤션. 고정 px size + px line-height + em letter-spacing. 큰 글자일수록 음수 자간, 작은 글자일수록 양수 자간으로 자연 변화.

#### 사용 가이드 (역할별)

| Role | 언제 쓰는가 |
|---|---|
| **Display** | 텍스트를 *가장 주요하게* 나타낼 때 (히어로 메인 카피 등) |
| **Title** | 텍스트를 *주요하게* 나타낼 때 (페이지 제목·랜딩 섹션 헤더) |
| **Heading** | 섹션에서 *주제*를 나타낼 때 (서브섹션 제목·카드 제목) |
| **Headline** | *본문 상위*로 내용을 강조해야 할 때 (리드 카피·강조 단락) |
| **Body** | *기준 크기*로 사용 (본문) |
| **Label** | *참고 내용*을 나타낼 때 (메타·UI 라벨) |
| **Caption** | *부가적인 내용*을 나타낼 때 (출처·각주·미세 helper) |

같은 role 안의 숫자(1/2/3)는 위계 — 1이 가장 큼.

#### 스케일

| 클래스 | size (mobile → desktop) | line-height | letter-spacing |
|---|---|---|---|
| `text-display-1` | **32 → 56px** (clamp) | 1.286 | -0.0319em |
| `text-display-2` | **28 → 40px** (clamp) | 1.3 | -0.0282em |
| `text-display-3` | **26 → 36px** (clamp) | 1.334 | -0.027em |
| `text-title-1` | 32px | 44 (1.375) | -0.0253em |
| `text-title-2` | 28px | 38 (1.358) | -0.0236em |
| `text-title-3` | 24px | 32 (1.334) | -0.023em |
| `text-heading-1` | 22px | 30 (1.364) | -0.0194em |
| `text-heading-2` | 20px | 28 (1.4) | -0.012em |
| `text-headline-1` | 18px | 26 (1.445) | -0.002em |
| `text-headline-2` | 17px | 24 (1.412) | 0em |
| `text-body-1` | 16px | 24 (1.5) | 0.0057em |
| `text-body-1-reading` | 16px | 26 (1.625) | 0.0057em |
| `text-body-2` | 15px | 22 (1.467) | 0.0096em |
| `text-body-2-reading` | 15px | 24 (1.6) | 0.0096em |
| `text-label-1` | 14px | 20 (1.429) | 0.0145em |
| `text-label-1-reading` | 14px | 22 (1.571) | 0.0145em |
| `text-label-2` | 13px | 18 (1.385) | 0.0194em |
| `text-caption-1` | 12px | 16 (1.334) | 0.0252em |
| `text-caption-2` | 11px | 14 (1.273) | 0.0311em |

**Display 만 clamp 적용** — 모바일에서 줄바꿈 위험이 큰 사이즈대. Title 이하(≤32px)는 모바일 viewport(375px)에서도 안전한 사이즈라 고정.
- Display의 line-height는 *ratio*로 표기 — size가 viewport 따라 변하므로 lh도 자동 비례
- transition 구간: Display 1은 ~1400px에서 max hit / Display 2는 ~1430px / Display 3은 ~1440px (각 vw 계수에서 도출)

**Body·Label의 Normal vs Reading**:
- Normal — UI 본문, 짧은 단락, 리스트 (조밀한 줄간격)
- Reading — 긴 호흡(에세이·기사) 본문 (여유 있는 줄간격)

#### weight 정책

신규 토큰엔 **font-weight를 박지 않는다** (한국 컨벤션). 사용처에서 `font-medium`(500) / `font-semibold`(600) / `font-bold`(700) 등으로 결정.

```tsx
<h1 className="text-display-1 font-semibold">히어로 카피</h1>
<h2 className="text-title-2 font-semibold">섹션 제목</h2>
<p className="text-body-1">본문</p>
```

#### 폰트 패밀리

- **sans** (`--font-sans`, `font-sans`): Pretendard → Apple SD Gothic Neo → Malgun Gothic. body·전체 기본값.
- **serif-kr** (`--font-serif-kr`, `font-serif-kr`): Noto Serif KR (next/font/google, weight 400~700) → Nanum Myeongjo → 시스템 serif.

토큰에는 font-family를 박지 않는다. 기본은 sans. serif가 필요한 곳에서만 `font-serif-kr` utility 명시.

```tsx
<h2 className="text-title-2 font-semibold">섹션 제목</h2>                  // sans (기본)
<h2 className="text-title-2 font-semibold font-serif-kr">섹션 제목</h2>    // serif-kr (선택)
```

> **현 상태: wireframe 단계** (2026-05-14). serif 적용 범위는 컴포넌트 단위로 검토하며 확정. 패턴이 굳으면(예: "모든 페이지 타이틀은 serif") 토큰에 박아 자동 적용으로 승격.

#### 라벨 통일 정책

섹션 카테고리(예: "원칙", "분야"), M-XX 식별자(M-05/M-06), 브랜드 라벨(법무법인 인유 창원사무소) 등 *오버라인 성격* 라벨은 모두 `text-label-1`을 사용한다. 시각 강조가 필요하면 color 토큰(`text-brand-gold` / `text-muted-foreground` 등)이나 `font-medium`으로 분화 — 별도 사이즈/tracking 토큰은 두지 않는다.

#### Legacy 토큰

2026-05-14 모든 사용처(약 74곳)를 신규 토큰으로 마이그레이션 완료. legacy alias 9개(`text-display`/`text-h1`~`text-h4`/`text-body-lg`/`text-body`/`text-caption`/`text-overline`) 모두 globals.css에서 제거됨. 신규 컴포넌트·기존 컴포넌트 모두 신규 토큰만 사용한다.

### Spacing Scale — 4px base (2026-05-14 명문화)

Tailwind v4 base scale `--spacing: 0.25rem` (4px). 모든 spacing 정수 utility(`p-{n}`, `m-{n}`, `gap-{n}`, `space-y-{n}` 등)는 `n × 4px`로 자동 생성된다.

**권장 단계** — 디자인 일관성을 위해 spacing은 아래 9개 단계 안에서 고른다. 그 사이 값(`p-5`=20px, `p-7`=28px 등)은 *의식적 결정*이 필요한 예외 케이스에만.

| Tailwind | px | 용도 |
|---|---|---|
| `1` | 4 | 아이콘과 라벨 간 미세 gap |
| `2` | 8 | 인접한 small UI 요소 간 |
| `3` | 12 | 카드 내 텍스트 줄 간격, list item 내부 |
| `4` | 16 | 카드 padding, 일반 컴포넌트 내부 gap |
| `6` | 24 | 카드 간 gap (grid·flex), 문단 간격 |
| `8` | 32 | 작은 섹션 내부 vertical rhythm |
| `12` | 48 | section-inner의 작은 단위 |
| `16` | 64 | 섹션 vertical padding (`--spacing-section` min) |
| `32` | 128 | 큰 섹션 사이 호흡 (drastic break) |

**원칙**:
- micro spacing은 토큰화하지 않는다 — 위 단계 안에서 자유롭게 Tailwind utility 사용
- 페이지·섹션 단위 rhythm은 semantic 토큰(`section` / `section-inner`)을 우선 사용 — 아래 표 참조

### Section Rhythm — spacing semantic (2026-05-10 추가)

| 클래스 (auto-generated) | 모바일 → 데스크톱 | 용도 |
|---|---|---|
| `py-section` / `space-y-section` / `gap-section` | 64 → 96px (clamp) | 메인 페이지 위아래 padding + 섹션 간 gap |
| `py-section-inner` / `gap-section-inner` | 48 → 80px (clamp) | 자체 배경을 가진 섹션의 내부 위아래 padding (Footer / 강조 섹션) |

- Tailwind v4 spacing 토큰이라 `p-`, `m-`, `gap-`, `space-y-` 모든 prefix에 사용 가능
- Header는 sticky 특수성이 있어 별도 — `py-6` 유지
- micro spacing(`gap-3`, `mt-6` 등 컴포넌트 내부 디테일)은 토큰화 X — 자유롭게 Tailwind 정수 utility 사용

> Note: `--spacing: 0.25rem` (`globals.css:216`)은 dead variable이 아니라 Tailwind v4의 base scale이다 (`py-16` = `16 × 0.25rem` = 4rem). 변경하면 모든 Tailwind 정수 spacing이 영향받으므로 그대로 둔다.

### Container / Breakpoints (2026-05-10 의미 분리)

**Breakpoint (미디어 쿼리 분기점)** — Tailwind 표준 컨벤션 일치

| 토큰 | 값 | 픽셀 |
|---|---|---|
| `--breakpoint-sm` | 40rem | 640 |
| `--breakpoint-md` | 48rem | 768 |
| `--breakpoint-lg` | 64rem | 1024 |
| `--breakpoint-xl` | 80rem | 1280 |
| `--breakpoint-2xl` | 96rem | 1536 |
| `--breakpoint-3xl` | 120rem | 1920 |

→ `sm:`, `md:`, `lg:`, `xl:`, `2xl:`, `3xl:` 변형이 위 분기점에서 발동.

**Container max (콘텐츠 폭 상한)** — breakpoint와 별개 토큰

| 토큰 | 값 | 픽셀 | 적용 |
|---|---|---|---|
| `--container-max` | 86rem | 1376 | `.container`의 2xl 이상 max-width |

→ 1280px 이하: viewport 따라 step-up. 1280~1535px: 1280px 유지. 1536px 이상: **1376px 캡** (좌우 여백 자연 형성).
→ 법무 사이트 본문 가독성 위해 표준(1536px)보다 좁게 캡.

**관련 파일 sync** — `src/cssVariables.js`는 ImageMedia가 sizes hint 자동 생성에 사용. Tailwind 표준값(2xl=1536, 3xl=1920) 그대로 유지 → globals.css 의미 분리 후 자동 sync.

---

## 사용 원칙

### Typography: prose vs semantic 분리

| 영역 | 도구 | 적용 위치 |
|---|---|---|
| 사용자/CMS 생성 긴 본문 (Posts·Cases 본문, 변호사 인사말 등) | `prose` (`@tailwindcss/typography`) | RichText 렌더 wrapper |
| 개발자 작성 UI (Hero, 섹션, 카드, 네비, 푸터) | semantic class (`text-h1` 등) | 컴포넌트 내부 |

prose 안에 UI 컴포넌트(Banner, MediaBlock 등)가 들어가면 `not-prose` wrapper로 prose 스타일을 차단한다.

### Typography: ad-hoc 유틸리티 지양
- ❌ `text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight`
- ✅ `text-display`

새 컴포넌트 작성 / 기존 컴포넌트 수정 시 semantic class 우선. Tailwind 기본 사이즈(`text-xs`~`text-5xl`)는 토큰화 불가능한 예외 케이스에만.

### Section rhythm: 사용 패턴

```tsx
// 메인 페이지 — 섹션 간 호흡 통일
<main className="container py-section space-y-section">
  <HeroSection />
  <ServicesSection />
  ...
</main>

// 자체 배경을 가진 섹션 (Footer 등)
<footer className="bg-brand-deep">
  <div className="container py-section-inner">...</div>
</footer>
```

ad-hoc `py-16 space-y-16` / `py-12` 직접 사용은 지양. 섹션 호흡을 페이지마다 통일하기 위함.

### 토큰 값 변경 워크플로
- **이름은 contract, 값은 implementation** — 토큰 이름은 유지, 값만 바꾼다
- 디자인 피드백("h1이 좀 작아 보여") → `globals.css` 한 줄 수정 → 14페이지 자동 반영
- 토큰 이름 자체를 바꿔야 한다고 느껴지면 그건 디자인 시스템의 구조적 변경 — 별도 논의

### 카드
- shadcn `Card` (`src/components/ui/card.tsx`)를 기본 primitive로 사용
- 위에 도메인 변형(사례 카드, 업무분야 카드 등) 합성 — `Card` 자체를 재정의하지 않음

---

## 결정 근거 (왜 이 값인가)

Typography 값은 **도메인 best practice + 한국어 가독성**에서 나왔다.

| 결정 | 근거 |
|---|---|
| 한국형 스케일 (Display/Title/Heading/Headline/Body/Label/Caption) | 토스·네이버 컨벤션. 7개 role × 위계 숫자 — 의미 분리 명료. 변호사 사이트의 보수·신뢰 톤과 정합 |
| Display 만 clamp, Title 이하 고정 | Display(36~56px)는 모바일에서 한 줄에 6~10글자라 줄바꿈 위험 — clamp으로 모바일 26~32px로 축소. Title 이하(≤32px)는 모바일 375px 뷰포트에서도 안전한 사이즈라 고정 유지 |
| Display의 line-height: ratio | size가 viewport 따라 변하므로 lh도 비례해야 시각 균형 유지. Title 이하 고정 토큰은 첨부 자료의 px-lh 그대로 |
| Body·Label에 Normal / Reading 분리 | UI(조밀한 줄간격)와 긴 호흡 본문(여유)의 needs 다름 — 한 토큰으로 묶으면 양보 발생 |
| line-height는 px (비율 아님) | 한국형 시스템 컨벤션. 자모 밀도가 높은 한국어는 px 고정이 시각 일관성 안정 |
| 자간: 큰 글자 음수 → 작은 글자 양수로 자연 변화 | 큰 사이즈는 글자가 떠보여 조여주고, 작은 사이즈는 가독성을 위해 살짝 벌림 — typographic best practice |
| 토큰에 weight 미포함 | 한국 컨벤션. 사용처에서 `font-medium/semibold/bold`로 결정 — 같은 size에 weight만 바꿔 강조 위계 다양화 |
| 오버라인 라벨도 label-1로 통일 (별도 overline 토큰 폐기) | 시스템 단순화 — 사이즈/tracking 차이로 분화하지 않고 color·weight·context로 분화. 오버라인 의미는 사용처에서 `text-brand-gold` 또는 `text-muted-foreground` color로 신호 |
| section 64→96px / section-inner 48→80px | corporate 표준 (Stripe·Linear·Vercel 데스크톱 96-128px) — 권위감·여백 신호 |
| section clamp() 반응형 | 모바일에서 호흡 압축, 데스크톱에서 확장 — 같은 컴포넌트로 자연 스케일 |
| breakpoint Tailwind 표준 (2xl=1536, 3xl=1920) + container-max 별도 (1376) | breakpoint(미디어 쿼리 분기점)와 콘텐츠 폭 상한이 의미가 다름 — 한 토큰으로 묶으면 둘 중 하나는 양보해야 함. 분리해서 둘 다 만족 |

→ 위 값은 **"법무 사이트로 무난한 출발점"** 이지 **"이 사이트의 정답"** 이 아니다. 류 변호사 피드백 + 시안 확정 후 미세조정한다.

---

## 보류 / 다음 단계

- [x] ~~Section rhythm 토큰~~ — 2026-05-10 추가됨 (`--spacing-section`, `--spacing-section-inner`)
- [x] ~~`--spacing` dead variable 검증~~ — Tailwind v4 base scale로 확인됨, 그대로 유지
- [ ] **z-index 스케일** (`--z-header`, `--z-dropdown`, `--z-modal`) — Header `z-30` 하드코딩 중. shadcn Sheet/Dialog 도입 시 충돌 위험
- [x] ~~3xl 브레이크포인트 정합 + 의미 분리~~ — 2026-05-10 완료 (`--breakpoint-3xl` 추가, `--container-max` 분리, cssVariables.js 자동 sync)
- [ ] **Card 합성 패턴 정립** — 인터뷰 후 사례·업무분야 카드 디자인 결정되면 shadcn Card 위에 변형 컴포넌트 작성
- [ ] **기존 컴포넌트 마이그레이션** — Hero / Footer / Header / home placeholder들의 ad-hoc Tailwind utility를 semantic class로 일괄 교체
- [x] ~~Legacy alias 점진 제거~~ — 2026-05-14 완료. 모든 사용처 신규 토큰으로 마이그레이션 후 globals.css의 9개 토큰(`text-display`/`text-h1`~`text-h4`/`text-body-lg`/`text-body`/`text-caption`/`text-overline`) 일괄 제거. 오버라인 라벨은 `text-label-1`로 통일

---

## 정의 / 수정 원칙

- 이 문서를 수정해야 한다고 느낀 변경(토큰 추가, 사용 원칙 변경, 신규 결정)은 **반드시 이 파일도 함께 업데이트**한다
- 토큰 *값*만 미세조정하는 경우는 git 이력으로 충분, 이 문서 수정 불필요
- 토큰 *이름·구조*가 바뀌면 이 문서 + `globals.css` + 사용처를 모두 함께 변경 (PR 단위로 묶기)
