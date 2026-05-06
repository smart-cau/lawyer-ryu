# 류남경 변호사 홈페이지 자료조사 문서

법무법인 인유 창원사무소 대표변호사 **류남경** 홈페이지 기획을 위한 자료조사 디렉토리.

- 사무소: 경남 창원시 성산구 창이대로689번길 4-24, 5층 504호
- 상담: 010-7552-0301
- 공식 블로그: https://blog.naver.com/inyou2025

## 디렉토리 구조

```
docs/
├── 01-profile/        # 변호사 프로필 (학력·경력·인적사항)
├── 02-expertise/      # 전문분야·취급분야 분석
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
| 전문분야 (공식 4분류 기준) | `01-profile/expertise-from-career.md` | ✅ 공식 분류로 재정렬 |
| **계약 범위 IA (SoT)** | `02-expertise/scope-v1-contract.md` | ✅ 옵션 D 6분야 + About 통합 임시안 반영 (12단위) |
| **1차 IA 제안 (변호사 검토용)** | `02-expertise/ia-v1-proposal.md` | ✅ 옵션 D 6분야 + About 단일 long-form 임시안 |
| **키워드 리서치 보고서** | `02-expertise/keyword-research-report.md` | ✅ 옵션 D 결정 근거 |
| 키워드 검색량 (실측 CSV) | `02-expertise/keyword-volumes-2026-05-05.csv` | ✅ 1,212 unique |
| 키워드 분야 분류 (JSON) | `02-expertise/keyword-classified-2026-05-05.json` | ✅ 분야별 집계 |
| SEO 키워드 풀 | `02-expertise/seo-keywords.md` | ✅ 실측 검색량 컬럼 추가 |
| JSON-LD 스펙 | `02-expertise/structured-data-spec.md` | ✅ 옵션 D 매핑 |
| 공식 브랜드 포지셔닝 (SoT) | `03-firm/brand-positioning.md` | ✅ 작성 |
| 언론기사 메타스키마 | `04-cases/media/SCHEMA.md` | ✅ 작성 |
| 언론기사 머신리더블 | `04-cases/media/articles.json` | ✅ 9건 수집 |
| 언론기사 인덱스 | `04-cases/media/articles.md` | ✅ 작성 |
| 검색 로그 | `04-cases/media/search-log.md` | ✅ 작성 |
| 원본 자료 | `assets/{blog-banner,profile-card,contract-page-scope}.png` | ✅ 보존 |
| **인터뷰 사전 브리프** | `06-interview/pre-brief.md` | ✅ 변호사 송부용 |
| **인터뷰 질문지** | `06-interview/interview-script.md` | ✅ 현장용 |
| **사무직원 자료요청** | `06-interview/office-staff-asset-request.md` | ✅ 사무직원 송부용 |

## 단일 진실 원천 (Source of Truth)

홈페이지 카피·디자인 결정 시 우선 참조 순서:

1. **`docs/02-expertise/scope-v1-contract.md`** — 페이지 IA·메타·JSON-LD 매핑 (계약서 F/P/S/M, 옵션 D 6분야 임시안)
2. **`docs/02-expertise/keyword-research-report.md`** — 옵션 D 결정 근거 (실측 검색량 1,212개)
3. **`docs/03-firm/brand-positioning.md`** — 공식 메시지·USP·연락처
4. **`docs/02-expertise/seo-keywords.md`** — 13개 핵심 키워드 + 실측 검색량
5. **`docs/02-expertise/structured-data-spec.md`** — JSON-LD 템플릿
6. **`docs/04-cases/media/articles.json`** — 검증된 기사 메타데이터
7. **`docs/01-profile/profile.md`** — 통합 프로필
8. **`docs/assets/blog-banner.png`** — 공식 브랜드 비주얼
9. **`docs/assets/contract-page-scope.png`** — 계약서 페이지 범위 원본

> ⚠ **옵션 D 6분야 + About 단일 페이지는 임시안**. 변호사 인터뷰 후 단일 PR로 SoT 정정 예정.

## 참고

- 1차 자료(이미지 캡처본)는 `assets/` 에 보관.
- 추가 자료를 받을 때마다 해당 영역 파일에 누적·업데이트한다.
