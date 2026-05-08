# Task 시스템과 라우트 구조

- **일자**: 2026-05-08
- **상태**: accepted
- **참여자**: @smartcow

## 결정 (한 줄)

GitHub Issues + Projects로 task를 운영하고 결정 이력만 markdown으로 남긴다. 페이지는 4 대분류(`/`, `/about/lawyer`, `/services/...`, `/cases`)로 운영하며, about은 `/about/lawyer` hub 구조로 시작해 미래 `/about/firm` 분기를 예약한다.

## 맥락

1차 시안을 시작하면서 `CLAUDE.md`에 적혀 있던 임의 코드(F-01~M-04, "13 page units")가 마치 명세인 것처럼 행세하고 있었다. 실제로는 페이지 대분류 4개(main, about, services, cases) 외에는 세부 기획이 미정이었고, 임의 코드는 *가짜 정밀도*를 만들어 task 분해의 단위를 왜곡할 위험이 있었다.

또한 task 진행률을 markdown 단일 파일로 추적하려는 초기 시도는 다음 이유로 sub-optimal로 판명됨:
- 진행률·상태가 자주 바뀌는데 markdown은 보드/필터/이력 추적이 약하다.
- 미래 세션의 Claude가 stale 문서를 진실로 다룰 위험.
- 13×6 매트릭스 같은 정교한 표는 유지비가 크다.

## 옵션 검토

### Task 추적 도구
- A. Markdown 단일 파일 (`docs/07-development/STATUS.md` 등)
- B. **GitHub Issues + Projects ← 선택**
- C. Linear/Notion 등 외부 SaaS
- D. Hybrid (Issues + ADR)

B 채택. 1인 + 단기 프로젝트라도 의존성·병렬성 시각화·PR 연동·이력 추적이 무료로 자연. AI 협업도 `gh` CLI로 가능. ADR 보강(D의 일부)은 본 디렉토리 decision log로 흡수.

### 페이지 단위
- A. 임의 코드 유지 (F-01~M-04)
- B. **4 대분류만 영구 단위로 두고, 세부 sub-task는 *지금 알고 있는 만큼만* 점진 분해 ← 선택**
- C. 모든 페이지를 미리 분해

B 채택. 점진적 task 분해는 가짜 정밀도를 막는 정석. 모르는 영역은 "기획 결정" task(`planning` 라벨)로 잡아두고, 결정이 끝난 시점에 sub-task가 자라게 한다.

### About 라우트
- A. `/about` 단일 (지금=변호사, 미래에 의미 충돌)
- B. **`/about/lawyer` + `/about/firm` (hub 구조) ← 선택**
- C. `/lawyer` + `/firm` (평면)
- D. `/profile` (변호사) + `/about` (로펌) — 비대칭 안티패턴

B 채택. 향후 변호사·로펌 소개가 분기될 가능성을 사용자가 명시. hub 구조가 확장에도 의미가 흔들리지 않는다(`/about/lawyer/[name]`까지도 자연).

## 결과

- `CLAUDE.md`의 "1차 개발 범위" 섹션을 4 대분류 기반으로 재작성 (commit 예정).
- GitHub 라벨 7개: `area:main`, `area:about`, `area:services`, `area:cases`, `epic`, `planning`, `blocked:interview`.
- Epic issue 4개: #1 main, #2 about, #3 services, #4 cases.
- Sub-task issue 9개: #5(main), #6·#7(about), #8·#9·#10(services), #11·#12·#13(cases).
- Project 보드 `lawyer-ryu v1`은 권한 갱신 후 사용자가 생성 (gh CLI에 `project,read:project` scope 추가 필요).

## 후속 트리거 (재검토 시점)

- 변호사 추가 시 → `/about/lawyer/[name]` 분기 검토
- 로펌 본사 정보 페이지 추가 시 → `/about/firm` 라우트 활성화
- task 수가 30+로 늘면 → epic 분할·라벨 추가 검토
- markdown 결정 이력이 너무 길어지면 → archive 디렉토리 도입
- services leaf hub 카드 UI 디자인 시점 → IA §3 노트의 "leaf 표 칼럼 구조" 재검토
