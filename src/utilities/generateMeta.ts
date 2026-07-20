import type { Metadata } from 'next'

import type { Case } from '../payload-types'

import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from './mergeOpenGraph'
import { resolveCaseShareImage } from './caseShareImage'
import { getServerSideURL } from './getURL'

export const generateMeta = async (args: {
  doc: Partial<Case> | null
}): Promise<Metadata> => {
  const { doc } = args

  // SEO 제목이 비어 있으면 사례 문서 제목으로 폴백해 사례마다 고유 제목을
  // 유지한다. 둘 다 없을 때만 사무소 기본 제목을 사용한다.
  const docTitle = doc?.meta?.title || doc?.title
  const title = docTitle
    ? docTitle + ' | 법무법인 인유 창원분사무소'
    : '법무법인 인유 창원분사무소 | 대표변호사 류남경'

  // 글별 대표 이미지가 있으면 공유 미리보기를 그 이미지로 띄운다.
  // 없을 때만 브랜드 기본 이미지로 돌아간다.
  const shareImage = resolveCaseShareImage(doc)
  const ogImage = shareImage
    ? { ...shareImage, alt: shareImage.alt || docTitle || BRAND_OPEN_GRAPH_IMAGE.alt }
    : BRAND_OPEN_GRAPH_IMAGE

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: [ogImage],
      title,
      // 사례 slug는 문자열이므로 사례 상세의 OG URL을 정확히 만든다.
      url: doc?.slug ? `${getServerSideURL()}/cases/${doc.slug}` : getServerSideURL(),
    }),
    twitter: {
      card: 'summary_large_image',
      description: doc?.meta?.description,
      images: [ogImage.url],
      title,
    },
    title,
  }
}
