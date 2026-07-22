import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

export const BRAND_OPEN_GRAPH_IMAGE = {
  url: `${getServerSideURL()}/brand/open-graph.png`,
  width: 1200,
  height: 630,
  alt: '법무법인 인유 창원분사무소',
} as const

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    '창원·부산 형사사건을 상담하는 법무법인 인유 창원분사무소입니다. 검사 출신 류남경 대표변호사가 직접 상담하고 변론합니다.',
  images: [
    BRAND_OPEN_GRAPH_IMAGE,
  ],
  locale: 'ko_KR',
  siteName: '법무법인 인유 창원분사무소',
  title: '법무법인 인유 창원분사무소 | 류남경 대표변호사',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
