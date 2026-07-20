import type { Case, Media } from '@/payload-types'

import { getServerSideURL } from './getURL'

/**
 * 성공사례 한 건을 외부에 공유할 때 대표로 내보낼 이미지.
 * OG·트위터 카드·구조화 데이터가 같은 결정을 공유하도록 한 곳에 모아 둔다.
 */
export type CaseShareImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

/**
 * 화면 렌더용 `getMediaUrl`은 Next 이미지 최적화를 태우려고 경로를 상대로 남긴다.
 * 반면 OG·구조화 데이터는 외부 크롤러가 읽으므로 절대 URL이어야 한다 — 그래서 별도 변환.
 */
const toAbsoluteURL = (url: string): string => {
  if (/^https?:\/\//i.test(url)) return url
  return `${getServerSideURL()}${url.startsWith('/') ? '' : '/'}${url}`
}

const toShareImage = (value: Media | number | null | undefined): CaseShareImage | null => {
  // relation이 채워지지 않으면 id(number)만 들어온다 — 이 경우 URL을 만들 수 없다.
  if (!value || typeof value !== 'object' || !value.url) return null

  // 파생 사이즈(`sizes.og` 등)는 쓰지 않고 원본을 그대로 내보낸다.
  // 성공사례 썸네일은 정사각 도안이라, 1200×630 센터 크롭을 태우면
  // 위아래의 로고·전화번호가 잘려 나간다.
  return {
    url: toAbsoluteURL(value.url),
    width: value.width ?? undefined,
    height: value.height ?? undefined,
    alt: value.alt ?? undefined,
  }
}

/**
 * SEO 탭의 meta 이미지 → 대표 이미지(heroImage) 순으로 폴백한다.
 * 둘 다 없으면 null — 호출부가 브랜드 기본 이미지를 쓰도록 남겨 둔다.
 */
export const resolveCaseShareImage = (doc?: Partial<Case> | null): CaseShareImage | null => {
  return toShareImage(doc?.meta?.image) ?? toShareImage(doc?.heroImage)
}
