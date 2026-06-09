// 성공사례 핵심 결과(처분·판결) 표준 옵션.
// value는 영문(DB enum 안정성), label은 의뢰인 노출용 한글.
// 1차 가설 목록 — 변호사 확인 후 조정 예정.
export const CASE_RESULT_CUSTOM = 'custom'

export const CASE_RESULT_OPTIONS = [
  // 형사 — 수사·재판 단계 결과
  { label: '무혐의', value: 'no-charge' },
  { label: '혐의없음', value: 'no-suspicion' },
  { label: '불송치', value: 'no-referral' },
  { label: '기소유예', value: 'suspended-indictment' },
  { label: '무죄', value: 'not-guilty' },
  { label: '선고유예', value: 'suspended-sentence' },
  { label: '집행유예', value: 'probation' },
  { label: '구속영장 기각', value: 'warrant-dismissed' },
  // 민사·가사·행정 — 청구 결과
  { label: '(전부)승소', value: 'full-win' },
  { label: '일부 승소', value: 'partial-win' },
  { label: '청구 기각(방어 승소)', value: 'claim-dismissed' },
  { label: '조정 성립', value: 'mediation' },
  // 자유 입력
  { label: '기타(직접 입력)', value: CASE_RESULT_CUSTOM },
] as const

const labelByValue = new Map<string, string>(
  CASE_RESULT_OPTIONS.map((opt) => [opt.value, opt.label]),
)

/** 결과 select 값 + 자유입력 값을 받아 카드/페이지에 노출할 라벨로 변환 */
export const resolveCaseResultLabel = (
  result?: string | null,
  resultCustom?: string | null,
): string | null => {
  if (!result) return null
  if (result === CASE_RESULT_CUSTOM) return resultCustom?.trim() || null
  return labelByValue.get(result) ?? result
}
