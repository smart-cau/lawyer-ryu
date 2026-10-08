/**
 * 코드로 관리되는 정적 페이지의 마지막 "유의미한 콘텐츠 변경일" (YYYY-MM-DD).
 *
 * 사이트맵의 lastmod와 페이지 구조화 데이터의 dateModified(예: /about/lawyer의 ProfilePage)가
 * 같은 값을 쓴다. 페이지의 카피·구조·구조화 데이터를 수정하면 해당 항목의 날짜도 함께 갱신한다.
 *
 * 배포 시각이나 `new Date()`를 넣지 말 것 — 바뀌지 않은 페이지까지 매 배포마다
 * 갱신 신호를 보내면 Google이 이 사이트의 lastmod 전체를 신뢰하지 않게 된다.
 * (오래된 날짜는 "그 뒤로 안 바뀜"이라는 정확한 신호이므로 문제가 아니다.)
 */
export const PAGE_UPDATED_AT = {
  '/': '2026-10-08',
  '/about/lawyer': '2026-10-08',
  '/services': '2026-07-16',
} as const
