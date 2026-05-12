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

### Typography — semantic (2026-05-10 추가)

| 클래스 | 모바일 → 데스크톱 | line-height | weight | 용도 |
|---|---|---|---|---|
| `text-display` | 32 → 56px (clamp) | 1.15 | 600 | 홈 히어로 메인 카피 |
| `text-h1` | 28 → 40px (clamp) | 1.2 | 600 | 페이지 제목 |
| `text-h2` | 22 → 28px (clamp) | 1.3 | 600 | 섹션 제목 |
| `text-h3` | 18 → 20px (clamp) | 1.4 | 600 | 서브섹션·카드 제목 |
| `text-h4` | 16px (고정) | 1.5 | 600 | 작은 제목 |
| `text-body-lg` | 17 → 18px (clamp) | 1.7 | — | 강조 리드 |
| `text-body` | 16px (고정) | 1.7 | — | 기본 본문 |
| `text-caption` | 14px (고정) | 1.5 | — | 캡션·메타·helper text |
| `text-overline` | 12px (tracking 0.1em) | 1.5 | 500 | uppercase 라벨 (M-04 류) |

폰트 패밀리: Pretendard → Apple SD Gothic Neo → Malgun Gothic 한글 fallback 체인.

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
| body line-height **1.7** (영문 표준 1.5보다 +0.2) | 한국어는 받침·자모 밀도가 영문보다 높아 줄간격 보정 필요 |
| heading weight **600** (700+ 배제) | 법무 도메인 — 보수·신뢰감 우선, 무거운 weight는 톤 깨뜨림 |
| heading clamp() 반응형 | 모바일~데스크톱 부드럽게 이어짐, breakpoint 점프 회피 |
| body 이하 **고정 사이즈** | 본문 크기가 뷰포트마다 흔들리면 가독성 손해 |
| display 32→56px, h1 28→40px | corporate/professional 사이트 평균대 (Stripe, LinkedIn, 국내 enterprise) |
| overline tracking **0.1em** + weight 500 | Material Design / iOS HIG overline 컨벤션 |
| overline에 `uppercase` 미포함 | 한국어엔 대문자 개념이 없음 — 사용처에서 영문 라벨에만 별도 추가 |
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

---

## 정의 / 수정 원칙

- 이 문서를 수정해야 한다고 느낀 변경(토큰 추가, 사용 원칙 변경, 신규 결정)은 **반드시 이 파일도 함께 업데이트**한다
- 토큰 *값*만 미세조정하는 경우는 git 이력으로 충분, 이 문서 수정 불필요
- 토큰 *이름·구조*가 바뀌면 이 문서 + `globals.css` + 사용처를 모두 함께 변경 (PR 단위로 묶기)
