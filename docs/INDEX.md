# 류남경 변호사 홈페이지 자료조사 문서

법무법인 인유 창원사무소 대표변호사 **류남경** 홈페이지 기획을 위한 자료조사 디렉토리.

- 사무소: 경남 창원시 성산구 창이대로689번길 4-24, 5층 504호
- 상담: 010-7552-0301
- 공식 블로그: https://blog.naver.com/inyou2025

## 디렉토리 구조

```
docs/
├── 01-profile/        # 변호사 프로필 (학력·경력·인적사항)
├── 02-services/       # 업무분야 IA·원문 보존·가공물
├── 03-firm/           # 소속 법무법인(인유) 정보
├── 04-cases/          # 주요 사건·실적·언론보도
├── 05-references/     # 벤치마킹 사이트·기획 참고자료
├── 06-interview/      # 변호사 본인 인터뷰 준비·결과
└── assets/            # 이미지·로고·기타 원본 자료
```

## 작업 진행 현황

| 영역 | 파일 | 상태 |
|------|------|------|
| 기본 프로필 | `01-profile/profile.md` | ✅ 공식 포지셔닝 반영 |
| 경력 타임라인 | `01-profile/career-timeline.md` | ✅ 작성 |
| 전문분야 (공식 4분류 기준) | `01-profile/services-from-career.md` | ✅ 공식 분류로 재정렬 |
| **services 설계 원문 보존** | `02-services/services-source-2026-05-07.md` | ✅ 변호사 1차 청취 + 결정 트래킹 완료 (A1~A12) |
| **services IA v1.4 (합의 완료)** | `02-services/01-services-ia-v1.md` | ✅ 변호사 1차 피드백 반영 + 메뉴·URL 정책 (10 leaf · 44 분류, 메뉴 라벨 "업무분야", `/services/<criminal\|non-criminal>/<slug>`) |
| 공식 브랜드 포지셔닝 (자료조사) | `03-firm/brand-positioning.md` | ✅ 작성 |
| **운영·행동 USP (자료조사)** | `03-firm/usp.md` | ✅ 변호사 본인 구술 1차 정리 |
| 운영·행동 USP 원문 보존 | `03-firm/usp-source-2026-05-06.md` | ✅ 1차 출처 원문 (가공 전) |
| **메인 페이지 IA v0.1 (1차 합의)** | `03-firm/main-ia-v0.1.md` | ✅ 1차 합의 (M-01~M-07, 인터뷰 전 시안) |
| 언론기사 메타스키마 | `04-cases/media/SCHEMA.md` | ✅ 작성 |
| 언론기사 머신리더블 | `04-cases/media/articles.json` | ✅ 9건 수집 |
| 언론기사 인덱스 | `04-cases/media/articles.md` | ✅ 작성 |
| 검색 로그 | `04-cases/media/search-log.md` | ✅ 작성 |
| 원본 자료 | `assets/{blog-banner,profile-card,contract-page-scope}.png` | ✅ 보존 |
| **인터뷰 사전 브리프** | `06-interview/pre-brief.md` | ✅ 변호사 송부용 |
| **인터뷰 질문지** | `06-interview/interview-script.md` | ✅ 현장용 |
| **사무직원 자료요청** | `06-interview/office-staff-asset-request.md` | ✅ 사무직원 송부용 |

## 참조 우선순위

> ⚠ 본 디렉토리는 홈페이지 개발을 위한 **자료조사·참고 메모** 모음이다. 카피·IA·브랜딩의 권위 있는 원천(SoT)이 아니다 — 그대로 발췌해 페이지에 박지 말 것. 카피·문구는 후보로 추출하고 사용자 확인을 거쳐 확정한다. 예외: 머리말에 *locked* 또는 *합의 완료*가 명시된 항목(예: services IA v1.4의 분류 체계, 메인 IA v0.1 슬롯 구조)만 합의된 단계로 취급한다.

홈페이지 카피·디자인 결정 시 참조 우선순위:

1. **`docs/03-firm/brand-positioning.md`** — 공식 메시지·USP·연락처 자료조사 (블로그 배너 1차 출처)
2. **`docs/03-firm/usp.md`** — 변호사 본인 구술 기반 **운영·행동 USP 자료조사** (Practice·Process 카피 후보 추출용)
3. **`docs/02-services/01-services-ia-v1.md`** — **services IA (합의 완료)** (10 leaf · 44 분류, 라우팅·SEO 결정 기준)
4. **`docs/03-firm/main-ia-v0.1.md`** — **메인 페이지 IA (1차 합의)** (M-01~M-07 슬롯 구조)
5. **`docs/04-cases/media/articles.json`** — 검증된 기사 메타데이터
6. **`docs/01-profile/profile.md`** — 통합 프로필 자료조사
7. **`docs/assets/blog-banner.png`** — 공식 브랜드 비주얼
8. **`docs/assets/contract-page-scope.png`** — 계약서 페이지 범위 원본

## 참고

- 1차 자료(이미지 캡처본)는 `assets/` 에 보관.
- 추가 자료를 받을 때마다 해당 영역 파일에 누적·업데이트한다.
