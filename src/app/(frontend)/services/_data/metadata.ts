import type { Metadata } from 'next'

import { BRAND_OPEN_GRAPH_IMAGE } from '@/utilities/mergeOpenGraph'

type ServiceMetadataArgs = {
  slug: string
  title: string
  description: string
}

export function createServiceHubMetadata(): Metadata {
  const title = '창원·부산 변호사 업무분야 | 법무법인 인유 창원분사무소'
  const description =
    '형사·기업범죄·재산범죄·교통범죄와 민사·가사·행정 분야의 주요 쟁점과 대응 방향을 안내합니다. 법무법인 인유 창원분사무소 류남경 대표변호사가 직접 상담합니다.'

  return {
    title,
    description,
    alternates: {
      canonical: '/services',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: '법무법인 인유 창원분사무소',
      locale: 'ko_KR',
      url: '/services',
      images: [BRAND_OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [BRAND_OPEN_GRAPH_IMAGE.url],
    },
  }
}

export function createServiceMetadata({
  slug,
  title,
  description,
}: ServiceMetadataArgs): Metadata {
  const path = `/services/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: '법무법인 인유 창원분사무소',
      locale: 'ko_KR',
      url: path,
      images: [BRAND_OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [BRAND_OPEN_GRAPH_IMAGE.url],
    },
  }
}
