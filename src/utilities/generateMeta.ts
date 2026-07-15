import type { Metadata } from 'next'

import type { Media, Case, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// meta.image가 있을 때만 절대 URL을 만든다. 없으면 undefined를 반환해
// mergeOpenGraph의 사무소 기본 OG 이미지가 적용되도록 한다.
const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (!image || typeof image !== 'object' || !('url' in image)) return undefined

  const serverUrl = getServerSideURL()
  const ogUrl = image.sizes?.og?.url

  return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
}

export const generateMeta = async (args: {
  doc: Partial<Case> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

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
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      // 사례 slug는 문자열이므로 사례 상세의 OG URL을 정확히 만든다.
      url: doc?.slug ? `${getServerSideURL()}/cases/${doc.slug}` : getServerSideURL(),
    }),
    title,
  }
}
