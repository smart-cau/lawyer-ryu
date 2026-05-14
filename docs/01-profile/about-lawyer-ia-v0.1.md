# about/lawyer 페이지 IA v0.1

> **목적**: 법무법인 인유 창원사무소 / 류남경 변호사 홈페이지 `/about/lawyer` 섹션 구성의 1차 합의 IA.
> **상태**: 1차 합의 (2026-05-13). 슬롯 구조(L-01~L-04) + L-04 layout 형식 확정. 슬롯별 카피·USP 흡수 위치 등 디테일은 wireframe 구현 보고 결정.
> **관련 자료조사 메모**: `docs/03-firm/usp.md` · `docs/01-profile/profile.md` · `docs/01-profile/career-timeline.md` · `docs/03-firm/brand-positioning.md`
> **연결 코드**: `src/app/(frontend)/about/lawyer/page.tsx` · (예정) `src/app/(frontend)/about/lawyer/_components/`
> **메인 IA와의 관계**: 메인(`docs/03-firm/main-ia-v0.1.md`) M-01 Hero가 "상세 경력은 /about/lawyer에서 처리"로 위임함. 이 문서가 그 위임을 받음.

---

## 1. 1차 페르소나·정서 전제

- **1차 청자**: 메인 또는 services 페이지에서 류 변호사 *개인 자체*에 대한 신뢰를 더 확인하고 싶어 진입한 의뢰인
  - 검사 경력의 *깊이*와 *지역적 정합*을 보고 싶음
  - "왜 이 변호사여야 하는가"의 답을 *인물* 차원에서 받고 싶음
- **메인과의 layer 분리**:
  - 메인 = **원칙·행동** (USP가 "왜 가능한가/원칙", Process가 "어떻게 진행되는가/행동")
  - about/lawyer = **인물·근거** (USP의 능력이 *왜* 가능한지를 검찰 경력으로 *입증*)
- **인터뷰 narrative 의존도**: `usp.md`(변호사 본인 구술 1차 정리 완료) + `career-timeline.md`(객관 사실)로 wireframe 1차 가능. 후속 인터뷰 narrative는 *문구 갱신*에만 영향, 슬롯 구조에는 영향 없음.

## 2. 컨셉·정신

> **narrative가 렌즈를 깔고, 경력이 그 입증 자료로 읽히게 한다.**

- 약력을 단순 시계열로 나열하면 의뢰인은 detail로 읽는다.
- 그 앞에 narrative 두 줄기를 깔면, 같은 경력이 *스토리*이자 *강점*으로 재해석된다.
- **narrative 1**: USP의 능력이 *왜* 가능한가 — 검찰 경력과 엮인 풀이
- **narrative 2**: 왜 창원·부산인가 — 타겟 지역 특화의 자연스러움

이 컨셉은 2026-05-13 합의. (이전 가설은 narrative와 이력을 분리된 슬롯으로 봤으나 폐기)

## 3. 슬롯 구조

| # | 슬롯 ID | 라벨 | 핵심 콘텐츠 | 톤·역할 |
|---|---|---|---|---|
| L-01 | `hero` | Hero | 인물 식별 + 한 줄 포지션 + 핵심 자격 흡수 | 1차 식별 |
| L-02 | `narrative-capability` | Narrative 1 — 왜 가능한가 | `usp.md` USP-B·C·E를 검사 19년 경력과 엮어 풀이 | 능력 입증 narrative |
| L-03 | `narrative-region` | Narrative 2 — 왜 창원·부산인가 | 영남권 13년 → 창원 정착의 자연스러움 | 지역 특화 narrative |
| L-04 | `career` | 검사 19년 경력 상세 | 압축 헤드 numbers + 시계열 표 | narrative의 입증 자료 |

- **Contact 슬롯 없음** (2026-05-13 결정) — 글로벌 Footer가 Contact 채널을 책임지므로 leaf 페이지에서 별도 Contact 슬롯 불필요. 의뢰인이 행동으로 넘어갈 시점이면 Footer로 도달.

## 4. 슬롯별 디테일

### L-01 Hero

- **인물 식별**: 사진 + 이름 + 직책 ("법무법인 인유 창원사무소 대표변호사 / 류남경")
- **한 줄 포지션**: 메인 헤드라인 답습 vs. about 전용 톤 — wireframe 보고 결정
- **자격 흡수**: 메인 Hero와 같은 항목들을 다시 노출할지, 정렬·강조를 다르게 갈지 — wireframe 보고 결정
- **CTA 버튼**: 메인 Hero에는 즉시상담 CTA가 있으나 about leaf에서는 보류. 글로벌 Footer가 책임

### L-02 Narrative 1 — 왜 가능한가

- **흡수 USP**: USP-B(직접 수사) · USP-C(수사 흐름 예측) · USP-E(구성요건 한 점)
- **풀이 logic**: 각 USP가 *어떤 검찰 경력*에서 가능해진 것인지 1:1 매핑
  - USP-B → `usp.md` §2의 **6대 직접 수사 활동**을 검사 시절 어떻게 수행했는지 (참고인 조사·디지털 증거·현장 검증 등)
  - USP-C → 수사관 시점에서 신문을 *직접 해본* 19년의 누적
  - USP-E → 구성요건 분해·약점 식별을 검사 시절 *기소 결정* 단계에서 일상으로 했던 경험
- **USP-A 흡수**: narrative 1 결말부에 자연스럽게 ("그래서 재판까지 가지 않고 수사단계에서 끝낼 가능성을 높인다") 가설. 별도 슬롯 X. wireframe 보고 재확인.
- **USP-D 미흡수**: 메인 M-06이 USP-D를 시급성·전환 후크로 다룸. about에서는 중복이라 미노출 가설. wireframe 보고 재확인.
- **톤**: 자기 자랑 회피, 사실 기반 풀이 (`usp.md` §6 가드레일 적용 — "보장" 카피 금지, 직접 비교 금지)
- **본문 길이·문단 수**: wireframe 보고 결정. 카피 후보는 `usp.md` §2 발췌 + 1인칭 변환

### L-03 Narrative 2 — 왜 창원·부산인가

- **메시지 축**: 영남권 13년 검사 경력 → 창원 사무소 개설은 *지역 자산의 자연스러운 정착*
- **근거 데이터**: `career-timeline.md` 정성 분석
  - 창원지검 2회(2010-12, 2019-21) — 약 4년
  - 부산지검 본청·서부지청 합쳐 4회(2015-17, 2017-19, 2021-22, 2022-23) — 약 8년
  - 후반 13년 대부분이 창원·부산 권역
  - 광주 출신·전남대 학부에서 시작해 영남으로 옮긴 흐름
- **타겟 지역 메시지**: 의뢰인이 "이 변호사가 창원·부산 형사사건에 *왜* 강한가"의 의심을 지움
- **본문 길이**: wireframe 보고 결정

### L-04 검사 19년 경력 상세

- **Layout (2026-05-13 합의)**: **(가) 압축 헤드 numbers + 시계열 표**
  - 헤드: "검사 19년 · 8개 검찰청 · 영남권 13년" 류 numbers
  - 표: 최근 → 과거 역순. 컬럼 = 연도 / 소속 / 담당 분야
  - 표 끝에 사법시험·연수원 1줄
- **데이터 원천**: `career-timeline.md` JSON 그대로
- **별도 카피 없음**: narrative 1·2가 메시지를 풀었으면 L-04에는 데이터만 노출. "지역 자산"·"신뢰" 카피를 또 박지 않음 — narrative 입증 구조 정합
- **시각 디테일**: spacing·typography·hover 등은 wireframe 단계에서 결정
- **공백 기간(2013-2014)**: `profile.md` Open Item. 표에 어떻게 표기할지(공백 행 / 생략 / "확인 중") wireframe 단계에서 결정

## 5. 보류·후속 결정 항목

- [ ] **L-01 한 줄 포지션 톤** — 메인 답습 vs. about 전용
- [ ] **L-01 자격 흡수 — 메인과의 중복 처리** — 같은 자격을 다시 노출할지, 정렬·강조를 다르게 갈지
- [ ] **L-02 USP-A 결말부 흡수 카피·위치**
- [ ] **L-02 USP-D 미흡수 결정 재검토** — wireframe에서 자리 부족·과잉 여부 확인 후
- [ ] **L-02·L-03 narrative 본문 카피** — `usp.md` 후보 기반으로 카피 단계에서 1인칭 변환 + 변호사 본인 톤 확인
- [ ] **L-04 공백 기간(2013-2014) 표기 방식**
- [ ] **L-04 표 모바일 collapse** — desktop 표가 mobile에서 어떻게 변하는지 (wireframe 5-A-g)
- [ ] **사진 자산** — 메인과 같은 `ryu-profile` 시리즈 활용. about 전용 추가 사진 필요 여부는 사무직원 자료요청 회신 후

## 6. 관련 자료조사 메모

- `docs/03-firm/usp.md` — narrative 1 풀이의 1차 카피 후보 추출원
- `docs/01-profile/profile.md` — Hero 자격·인적사항
- `docs/01-profile/career-timeline.md` — L-04 표 데이터 + 정성 분석 (narrative 2 근거)
- `docs/03-firm/brand-positioning.md` — 한 줄 포지션 후보
- `docs/03-firm/main-ia-v0.1.md` — 메인 IA와 layer 분리 정합성 참조
