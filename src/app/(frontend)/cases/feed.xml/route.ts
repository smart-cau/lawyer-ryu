import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getSitemapSiteURL } from '@/utilities/publicSiteURL'

/**
 * 성공사례 RSS 2.0 피드.
 *
 * 네이버 서치어드바이저의 RSS 제출용이다 — 새 글 수집 경로를 하나 더 두는 것이 목적이며
 * 순위와는 무관하다. 본문 전문은 싣지 않는다. 스크래퍼가 그대로 복제하면 그 사본이
 * 네이버 블로그 사본과 함께 원문 판정을 흐리므로 `meta.description` 요약만 내보낸다.
 */
const FEED_TITLE = '법무법인 인유 창원분사무소 성공사례'
const FEED_DESCRIPTION =
  '창원 형사전문변호사 류남경 대표변호사가 직접 수행한 형사·민사·행정 사건의 성공사례입니다.'
const FEED_ITEM_LIMIT = 50

const escapeXML = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

// RSS 2.0의 pubDate는 RFC 822 형식이다. toUTCString이 정확히 그 형식을 낸다.
const toRFC822 = (iso: string) => new Date(iso).toUTCString()

type FeedItem = {
  title: string
  link: string
  description?: string
  pubDate: string
  categories: string[]
}

type Feed = {
  siteURL: string
  feedURL: string
  lastBuildDate?: string
  items: FeedItem[]
}

const renderFeed = ({ siteURL, feedURL, lastBuildDate, items }: Feed) => {
  const channelLink = new URL('/cases', siteURL).toString()

  const itemsXML = items
    .map((item) => {
      const categories = item.categories
        .map((category) => `<category>${escapeXML(category)}</category>`)
        .join('')
      const description = item.description
        ? `<description>${escapeXML(item.description)}</description>`
        : ''

      return (
        `<item>` +
        `<title>${escapeXML(item.title)}</title>` +
        `<link>${escapeXML(item.link)}</link>` +
        `<guid isPermaLink="true">${escapeXML(item.link)}</guid>` +
        `<pubDate>${toRFC822(item.pubDate)}</pubDate>` +
        description +
        categories +
        `</item>`
      )
    })
    .join('')

  const lastBuild = lastBuildDate ? `<lastBuildDate>${toRFC822(lastBuildDate)}</lastBuildDate>` : ''

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">` +
    `<channel>` +
    `<title>${escapeXML(FEED_TITLE)}</title>` +
    `<link>${escapeXML(channelLink)}</link>` +
    `<description>${escapeXML(FEED_DESCRIPTION)}</description>` +
    `<language>ko</language>` +
    `<atom:link href="${escapeXML(feedURL)}" rel="self" type="application/rss+xml"/>` +
    lastBuild +
    itemsXML +
    `</channel>` +
    `</rss>`
  )
}

const getCasesFeed = unstable_cache(
  async (): Promise<Feed | null> => {
    const siteURL = getSitemapSiteURL()

    if (!siteURL) return null

    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'cases',
      overrideAccess: false,
      draft: false,
      depth: 1,
      limit: FEED_ITEM_LIMIT,
      sort: '-publishedAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        title: true,
        slug: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        meta: true,
        categories: true,
      },
    })

    const items: FeedItem[] = results.docs
      .filter((c) => Boolean(c.slug) && Boolean(c.title))
      .map((c) => ({
        title: c.title,
        link: new URL(`/cases/${c.slug}`, siteURL).toString(),
        description: c.meta?.description || undefined,
        // publishedAt은 게시 시점에 채워지지만 옛 글은 비어 있을 수 있다.
        pubDate: c.publishedAt || c.createdAt,
        categories: (c.categories ?? [])
          .map((category) =>
            typeof category === 'object' && category !== null ? category.title : null,
          )
          .filter((title): title is string => Boolean(title)),
      }))

    const lastBuildDate = results.docs
      .map((c) => c.updatedAt)
      .filter(Boolean)
      .sort()
      .at(-1)

    return {
      siteURL: siteURL.toString(),
      feedURL: new URL('/cases/feed.xml', siteURL).toString(),
      lastBuildDate,
      items,
    }
  },
  ['cases-feed'],
  {
    // 사례가 바뀌면 revalidateCase 훅이 이 태그를 지운다 — 사이트맵과 같은 시점에 갱신된다.
    tags: ['cases-sitemap'],
  },
)

export async function GET() {
  const feed = await getCasesFeed()

  // 공개 URL이 없는 환경(Preview 배포 등)에서는 피드를 내보내지 않는다.
  if (!feed) return new Response(null, { status: 404 })

  return new Response(renderFeed(feed), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
