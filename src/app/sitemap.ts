import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  CRIMINAL_LEAVES,
  NON_CRIMINAL_LEAVES,
} from '@/app/(frontend)/services/_data/leaves'
import { getSitemapSiteURL } from '@/utilities/publicSiteURL'

/**
 * 코드로 관리되는 정적 페이지의 마지막 "유의미한 콘텐츠 변경일" (YYYY-MM-DD).
 *
 * 페이지의 카피·구조를 수정하면 해당 항목의 날짜도 함께 갱신한다.
 * 배포 시각이나 `new Date()`를 넣지 말 것 — 바뀌지 않은 페이지까지 매 배포마다
 * 갱신 신호를 보내면 Google이 이 사이트의 lastmod 전체를 신뢰하지 않게 된다.
 * (오래된 날짜는 "그 뒤로 안 바뀜"이라는 정확한 신호이므로 문제가 아니다.)
 */
const PAGE_UPDATED_AT = {
  '/': '2026-08-27',
  '/about/lawyer': '2026-07-20',
  '/services': '2026-07-16',
} as const

/** `/services/<slug>` leaf별 콘텐츠 변경일. 위 주석의 갱신 규칙이 동일하게 적용된다. */
const SERVICE_LEAF_UPDATED_AT: Record<string, string> = {
  'sex-crime': '2026-07-15',
  'corporate-crime': '2026-07-15',
  'property-crime': '2026-07-15',
  'traffic-crime': '2026-07-15',
  'school-violence': '2026-07-15',
  'general-criminal': '2026-07-15',
  'anti-corruption': '2026-07-15',
  investigation: '2026-07-15',
  'civil-family': '2026-07-15',
  administrative: '2026-07-15',
}

/**
 * leaf를 추가하고 날짜 등록을 잊으면 배포 전에 실패시킨다.
 * lastmod 없이 조용히 배포되면 누락을 알아챌 방법이 없다.
 */
const getServiceLeafUpdatedAt = (slug: string): string => {
  const updatedAt = SERVICE_LEAF_UPDATED_AT[slug]

  if (!updatedAt) {
    throw new Error(
      `[sitemap] '/services/${slug}'의 lastmod가 등록되지 않았습니다. SERVICE_LEAF_UPDATED_AT에 추가하세요.`,
    )
  }

  return updatedAt
}

/**
 * `/cases` 목록 페이지는 사례가 추가·수정될 때마다 실제로 내용이 바뀌므로
 * 손으로 관리하지 않고 가장 최근 발행 사례의 updatedAt을 그대로 쓴다.
 */
const getCasesListUpdatedAt = async (): Promise<string | undefined> => {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'cases',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1,
      sort: '-updatedAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        updatedAt: true,
      },
    })

    return docs[0]?.updatedAt ?? undefined
  } catch (error) {
    // 사이트맵 전체를 잃는 것보다 `/cases` 한 줄의 lastmod를 포기하는 편이 낫다.
    console.error('[sitemap] /cases lastmod 조회 실패 — 해당 항목만 lastmod 없이 생성합니다.', error)

    return undefined
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteURL = getSitemapSiteURL()

  if (!siteURL) return []

  const casesUpdatedAt = await getCasesListUpdatedAt()

  const routes = [
    { path: '/', changeFrequency: 'weekly', priority: 1, lastModified: PAGE_UPDATED_AT['/'] },
    {
      path: '/about/lawyer',
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: PAGE_UPDATED_AT['/about/lawyer'],
    },
    {
      path: '/services',
      changeFrequency: 'monthly',
      priority: 0.9,
      lastModified: PAGE_UPDATED_AT['/services'],
    },
    ...[...CRIMINAL_LEAVES, ...NON_CRIMINAL_LEAVES].map(({ slug }) => ({
      path: `/services/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      lastModified: getServiceLeafUpdatedAt(slug),
    })),
    { path: '/cases', changeFrequency: 'weekly', priority: 0.8, lastModified: casesUpdatedAt },
  ] as const satisfies ReadonlyArray<{
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
    lastModified: string | undefined
  }>

  return routes.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: new URL(path, siteURL).toString(),
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }))
}
