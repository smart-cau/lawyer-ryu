# 언론기사 메타데이터 스키마

> `articles.json` 의 각 항목 구조. 홈페이지의 **언론보도(Media)** 섹션 컴포넌트에 그대로 바인딩 가능하도록 설계.

## 항목 스키마 (TypeScript)

```ts
interface MediaArticle {
  id: string;                  // 슬러그형 ID (예: "2024-08-yonhap-tech-leak")
  title: string;               // 기사 원제목
  url: string;                 // 정식 기사 URL (가능하면 원본 매체)
  publisher: string;           // 매체명 (예: "연합뉴스", "법률신문")
  publishedAt: string;         // ISO date "YYYY-MM-DD"
  lang?: "ko" | "en";          // 기본 ko
  category: ArticleCategory;
  mention: MentionType;        // 류남경의 등장 형태
  description: string;         // 1~3줄 요약 (한국어)
  quote?: string;              // 기사 내 류남경 직접 인용 (있을 때)
  practiceTags?: string[];     // 분야 태그 — profile/services와 매핑
  verified: "verified" | "unverified" | "secondary";
  notes?: string;              // 검증 메모 (출처 신뢰도, 동명이인 가능성 등)
}

type ArticleCategory =
  | "appointment"      // 검사 인사·발령
  | "case-report"      // 담당 사건 보도
  | "interview"        // 인터뷰·기고
  | "firm-news"        // 로펌(인유) 관련
  | "expert-comment"   // 전문가 코멘트
  | "etc";

type MentionType =
  | "primary"     // 본인이 주된 등장(인터뷰·기고)
  | "named"       // 이름 명시 등장 (담당 검사·변호사로 호명)
  | "implied"     // 사건 보도에서 소속만 표기
  | "list-only";  // 인사 명단·목록형 노출
```

## verified 값 가이드

| 값 | 정의 |
|---|---|
| `verified` | 1차 출처(원본 기사 URL) 직접 확인 + 동명이인 가능성 배제 |
| `unverified` | 검색 결과만 확인, 본문 내 본인 동일성 미확인 |
| `secondary` | 2차 출처(블로그·요약) 또는 캐시만 확인 |

## 동명이인 주의

- "류남경"은 일반 인명. 검색 결과에 다른 직역(의사·교수 등)이 섞일 수 있음.
- **검증 기준 키워드** (이 중 1개 이상 함께 등장 시 동일인으로 추정):
  - "검사" + 근무지(창원지검·부산지검·부산서부지검·대구지검·광주지검·순천지청·전주지검 중 하나)
  - "사법연수원 35기"
  - "법무법인 인유" / "인유 창원"
  - "사법시험 44회"

## 파일 구성

```
04-cases/media/
├── SCHEMA.md          ← 이 문서
├── articles.json      ← 머신 리더블 1차 데이터
├── articles.md        ← 사람 가독 인덱스(연도·카테고리별 표)
└── search-log.md      ← 어떤 키워드로 무엇을 찾았는지 검색 로그
```
