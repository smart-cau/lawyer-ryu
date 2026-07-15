import type { Metadata } from 'next'

import type { Case } from '../payload-types'

import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from './mergeOpenGraph'
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

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      title,
      // 사례 slug는 문자열이므로 사례 상세의 OG URL을 정확히 만든다.
      url: doc?.slug ? `${getServerSideURL()}/cases/${doc.slug}` : getServerSideURL(),
    }),
    twitter: {
      card: 'summary_large_image',
      description: doc?.meta?.description,
      images: [BRAND_OPEN_GRAPH_IMAGE.url],
      title,
    },
    title,
  }
}
