# services hub 페이지 IA v0.1

> **목적**: services 카탈로그 hub `/services` 페이지 섹션 구성의 합의된 IA.
> **상태**: 합의 완료.
> **관련 자료**: `docs/02-services/01-services-ia-v1.md` (routing IA, 합의 완료 · 1순위 참조) · `docs/03-firm/main-ia-v0.1.md` (M-04 outbound) · `docs/03-firm/usp.md`
> **연결 코드**: `src/app/(frontend)/services/page.tsx`
> **본 IA 범위**: services hub `/services` 1개 페이지. 대분류(형사전문 / 민사·가사·행정)는 **URL 자체 없음** (UI 그루핑만, 2026-05-13 결정) — 본 services hub가 catalog 역할 단독 수행.

> ⚠ **표현 규약**: 본 IA의 "그리드", "카드 N개" 등 layout 표현은 **콘텐츠 인벤토리 shorthand**일 뿐 배치 형식 약속이 아님. 실제 layout(card grid / 번호 매긴 editorial list / asymmetric / vertical stacked rows 등)은 wireframe 단계 5(배치)에서 옵션 enumerate 후 결정.

---

## 1. 1차 페르소나·정서 전제

- **1차 청자**: main M-04 "업무분야" 그리드를 클릭해 진입한 의뢰인 — main에서 변호사 USP를 이미 수신, 분야 catalog 풀버전을 확인하러 옴
- **외부 SEO 직접 진입자 비중**: 낮다고 가정. 본 페이지로 첫 유입되는 의뢰인이 그리 많지 않을 것 — 따라서 본 페이지 안에서 변호사 USP·시급성·Contact를 다시 풀어내는 책임을 두지 않음. 글로벌 헤더·푸터·main 페이지가 그 역할 담당
- **핵심 정서**: "내 사건 유형이 여기 있나" 확인. main의 "억울함" 정서는 한 단계 뒤로 — catalog 페이지는 *분류 식별*이 1차
- **출입구 동선 성격**: 본 페이지는 leaf 페이지(10개)로 가는 bridge. 사용자가 leaf로 빠르게 빠질 수 있어야 함 — 본 페이지 자체의 체류 시간은 짧게 보고, *leaf 진입률*을 1차 지표로 가정
- **시급성 페르소나 처리**: 본 페이지 안 별도 슬롯 X. 글로벌 헤더의 "조사·구속 대응" leaf 진입 + SH-02 그리드의 "조사·구속 대응" 카드로 도달. 외부 SEO 진입자에게 시급성 후크가 노출되지 않는 점은 §4 보류로 명시

## 2. 슬롯 구조

| # | 슬롯 ID | 라벨 | 핵심 콘텐츠 | 톤·역할 |
|---|---|---|---|---|
| SH-01 | `hero` | Hero | 페이지 H1 "업무분야" + 1줄 카탈로그 안내 (compact) | 식별·맥락 설정 |
| SH-02 | `leaf-catalog` | leaf 카탈로그 | 10 leaf (형사 8 + 비형사 2), 그루핑 헤더로 형사·비형사 구분 | catalog 본문 |

## 3. 슬롯별 디테일

### SH-01 Hero

- **H1**: "업무분야" (services IA §10.1 메뉴 라벨 합의 그대로)
- **부카피**: 1줄 카탈로그 안내. 후보 — "검사 19년의 형사 전문을 중심으로, 의뢰인이 만나는 민사·가사·행정까지" (카피 단계에서 확정)
- **자격 노출**: **노출하지 않음** — main Hero·헤더에서 흡수. 외부 SEO 진입자 비중이 낮다는 가정 위에서 중복 회피
- **CTA**: 없음 (헤더의 055-719-0302 의존)
- **분량**: compact — main Hero 대비 짧게. catalog 진입자가 본문을 빨리 만나도록

### SH-02 leaf 카탈로그 (10 leaf)

- **인벤토리**: services IA §3·§4의 10 leaf 전체
  - 형사 8 leaf: `sex-crime / corporate-crime / property-crime / traffic-crime / school-violence / general-criminal / anti-corruption / investigation`
  - 비형사 2 leaf: `civil-family / administrative`
- **그루핑**: 형사 8 + 비형사 2를 한 인벤토리 안에서 **그루핑 헤더로 시각 구분** (구체 처리 형태는 §4 보류 — wireframe 단계 5에서 결정)
- **그루핑 톤 의도**: services IA §2.2 결정 ("형사 전문의 *보조 영역*")을 유지 — 비형사는 형사 다음 위치, 시각적으로 보조 영역임이 드러나야 함
- **카드 정보 단위**: 라벨 + leaf 페이지 진입 (필수). 키워드 칩·1~2줄 설명 노출 여부는 §4 보류 (services IA §3 표 칼럼 보류 결정과 연동)
- **카드 클릭 진입 경로**: `/services/<group>/<slug>` **leaf 페이지 직접 진입**. 대분류 hub 경유 없음
- **균질성**: 형사 8 leaf는 균질 노출. "조사·구속 대응" 시각 강조 X (services IA §6.1 leaf hub 자체에서 USP·시급성 풀버전 노출하므로 catalog에서 별도 강조 불필요)
- **leaf 정렬 순서**: services IA §3 기존 순서 따름 (성범죄→기업→재산→교통→학교→일반→반부패→조사·구속, 비형사는 민사·가사→행정). **운영 후 수임 빈도·페르소나 우선 등 재검토 가능**

## 4. 보류·후속 결정 항목

- [ ] **SH-02 그루핑 헤더의 시각 처리** — 형사·비형사 분리 표지 (텍스트 헤더 / 섹션 구분선 / 카드 톤 차이 / 간격 점프). wireframe 단계 5에서 옵션 enumerate
- [ ] **SH-02 leaf 카드의 정보 단위** — 라벨만 / 라벨+키워드 칩 / 라벨+1~2줄 설명. services IA §3 표 칼럼 보류 결정과 동기
- [ ] **외부 SEO 진입자가 본 페이지로 직접 들어왔을 때 변호사 USP·시급성·Contact를 만나지 못하는 시나리오 대응** — 글로벌 헤더·푸터 디자인이 그 책임을 충분히 지는지 헤더·푸터 IA 검증 시점에 재검토
- [x] ~~**`/services/criminal` · `/services/non-criminal` URL 처리**~~ — **2026-05-13 결정**: URL segment 자체 제거 (옵션 (d) 신규). leaf URL을 `/services/<leaf-slug>` flat 구조로 변경. services IA §10.2·§10.3 갱신 완료
- [x] ~~**글로벌 헤더 2단계 대분류 메뉴 동작**~~ — **2026-05-13 결정**: (a) 그루핑 라벨만 (클릭 불가) 채택. nav-data·DesktopNav·MobileNav 반영 완료
