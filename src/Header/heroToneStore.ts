// 헤더 tone override 스토어.
// 기본 Header는 스크롤 여부로만 tone을 정하므로, 페이지 최상단(미스크롤)에서는
// 어두운 히어로를 전제한 흰색 네비/로고를 쓴다. about/lawyer 처럼 최상단이 밝은
// 배경 히어로인 페이지에서 헤더를 light tone(불투명·어두운 글자)으로 강제하기 위해
// 사용한다 (HeaderLightTone 컴포넌트).

type HeaderTone = 'light' | 'dark'

let forcedTone: HeaderTone | null = null
const listeners = new Set<() => void>()

export function setForcedHeaderTone(tone: HeaderTone | null) {
  if (tone === forcedTone) return
  forcedTone = tone
  listeners.forEach((listener) => listener())
}

export function subscribeForcedHeaderTone(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getForcedHeaderToneSnapshot() {
  return forcedTone
}

export function getForcedHeaderToneServerSnapshot(): HeaderTone | null {
  return null
}
